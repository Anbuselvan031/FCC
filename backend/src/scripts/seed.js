import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

// Models
import Team from '../models/Team.js';
import Player from '../models/Player.js';
import Match from '../models/Match.js';
import Leaderboard from '../models/Leaderboard.js';
import TeamStats from '../models/TeamStats.js';
import Gallery from '../models/Gallery.js';
import Admin from '../models/Admin.js';

// Load env from backend/.env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('❌ MONGO_URI is missing from backend/.env');
      process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB successfully.');

    // 1. Import source verified datasets
    const teamModule = await import('../../../src/data/teamData.js');
    const playersModule = await import('../../../src/data/players.js');
    const matchesModule = await import('../../../src/data/matches.js');
    const leaderboardModule = await import('../../../src/data/leaderboard.js');
    const statsModule = await import('../../../src/data/stats.js');
    const galleryModule = await import('../../../src/data/galleryData.js');

    const teamData = teamModule.default || teamModule.teamData;
    const players = playersModule.default || playersModule.playersData;
    const matches = matchesModule.default || matchesModule.matchesData;
    const leaderboard = leaderboardModule.default || leaderboardModule.leaderboardData;
    const stats = statsModule.default || statsModule.statsData;
    const gallery = galleryModule.default || galleryModule.galleryData;

    console.log(`📋 Source data loaded: ${players.length} players, ${matches.length} matches, ${gallery.length} gallery items.`);

    // 2. Clear existing collections
    console.log('🧹 Clearing existing collections...');
    await Promise.all([
      Team.deleteMany({}),
      Player.deleteMany({}),
      Match.deleteMany({}),
      Leaderboard.deleteMany({}),
      TeamStats.deleteMany({}),
      Gallery.deleteMany({}),
      Admin.deleteMany({ email: 'admin@fahrenheitcc.com' }),
    ]);

    // 3. Seed Team
    console.log('🌱 Seeding Team Profile...');
    await Team.create({
      name: teamData.name || 'Fahrenheit Cricket Club',
      location: teamData.location || 'Coimbatore',
      establishedDate: teamData.establishedDate || '2023-08-24',
      cricheroesTeamId: teamData.cricheroesTeamId || '4978895',
      logo: teamData.logo || '/logo.png',
      coverImage: teamData.coverImage,
      description: teamData.description || teamData.intro,
      vision: teamData.vision,
      values: teamData.values,
      socialLinks: teamData.socialLinks,
      contact: teamData.contact,
      statsSummary: teamData.statsSummary,
    });

    // 4. Seed Players
    console.log(`🌱 Seeding ${players.length} Players...`);
    const insertedPlayers = await Player.insertMany(players);
    console.log(`✅ ${insertedPlayers.length} players successfully inserted.`);

    // Map player IDs to MongoDB ObjectIds for relational references
    const playerMap = {};
    insertedPlayers.forEach((p) => {
      playerMap[p.id] = p._id;
      if (p.cricHeroesId) playerMap[p.cricHeroesId] = p._id;
    });

    // 5. Seed Matches with Player Performance References
    console.log(`🌱 Seeding ${matches.length} Matches...`);
    const matchesToInsert = matches.map((m) => {
      const perfs = (m.playerPerformances || []).map((perf) => ({
        ...perf,
        playerId: playerMap[perf.cricHeroesPlayerId || perf.playerId] || null,
      }));

      return {
        ...m,
        playerPerformances: perfs,
      };
    });
    await Match.insertMany(matchesToInsert);
    console.log(`✅ Matches successfully inserted.`);

    // 6. Seed Leaderboard Entries
    console.log('🌱 Seeding Leaderboard...');
    const lbEntries = [];

    if (leaderboard.batting && Array.isArray(leaderboard.batting)) {
      leaderboard.batting.forEach((b) => {
        lbEntries.push({
          category: 'batting',
          rank: b.rank,
          cricHeroesPlayerId: b.id,
          playerId: playerMap[b.id] || null,
          name: b.name,
          photo: b.photo,
          role: b.role,
          value: b.runs,
          stats: b,
        });
      });
    }

    if (leaderboard.bowling && Array.isArray(leaderboard.bowling)) {
      leaderboard.bowling.forEach((b) => {
        lbEntries.push({
          category: 'bowling',
          rank: b.rank,
          cricHeroesPlayerId: b.id,
          playerId: playerMap[b.id] || null,
          name: b.name,
          photo: b.photo,
          role: b.role,
          value: b.wickets,
          stats: b,
        });
      });
    }

    if (leaderboard.fielding && Array.isArray(leaderboard.fielding)) {
      leaderboard.fielding.forEach((f) => {
        lbEntries.push({
          category: 'fielding',
          rank: f.rank,
          cricHeroesPlayerId: f.id,
          playerId: playerMap[f.id] || null,
          name: f.name,
          photo: f.photo,
          role: f.role,
          value: f.dismissals,
          stats: f,
        });
      });
    }

    if (lbEntries.length > 0) {
      await Leaderboard.insertMany(lbEntries);
      console.log(`✅ ${lbEntries.length} leaderboard entries inserted.`);
    }

    // 7. Seed Team Stats
    console.log('🌱 Seeding Team Statistics...');
    await TeamStats.create(stats);
    console.log('✅ Team statistics inserted.');

    // 8. Seed Gallery Items
    console.log(`🌱 Seeding ${gallery.length} Gallery Photos...`);
    const galleryItems = gallery.map((item) => ({
      title: item.caption || item.title || 'FCC Team Moment',
      imageUrl: item.url || item.imageUrl,
      category: item.category || 'Team',
      description: item.caption || '',
      uploadedBy: item.uploadedBy || 'Fahrenheit Cricket Club Admin',
    }));
    await Gallery.insertMany(galleryItems);
    console.log(`✅ Gallery items inserted.`);

    // 9. Seed Default Admin Account
    console.log('🌱 Seeding Default Admin Account...');
    await Admin.create({
      username: 'admin',
      email: 'admin@fahrenheitcc.com',
      password: 'FCCAdmin@2026',
      role: 'admin',
    });
    console.log('✅ Default Admin created: admin@fahrenheitcc.com (Password: FCCAdmin@2026)');

    console.log('\n🎉 ALL FCC VERIFIED DATA SEEDED SUCCESSFULLY TO MONGODB!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
