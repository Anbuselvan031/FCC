import mongoose from 'mongoose';
import Player from '../models/Player.js';

export function addOvers(currentOversStr, additionalOversStr) {
  if (!currentOversStr || currentOversStr === '--') return String(additionalOversStr);
  if (!additionalOversStr || additionalOversStr === '--') return String(currentOversStr);

  const parseToBalls = (str) => {
    const clean = String(str).replace(/,/g, '').trim();
    const parts = clean.split('.');
    const overs = parseInt(parts[0], 10) || 0;
    const balls = parseInt(parts[1], 10) || 0;
    return overs * 6 + balls;
  };

  const totalBalls = parseToBalls(currentOversStr) + parseToBalls(additionalOversStr);
  const newOvers = Math.floor(totalBalls / 6);
  const remBalls = totalBalls % 6;
  const formattedOvers = newOvers >= 1000 ? newOvers.toLocaleString('en-US') : String(newOvers);
  return `${formattedOvers}.${remBalls}`;
}

export function oversToBalls(str) {
  if (!str || str === '--') return 0;
  const clean = String(str).replace(/,/g, '').trim();
  const parts = clean.split('.');
  const overs = parseInt(parts[0], 10) || 0;
  const balls = parseInt(parts[1], 10) || 0;
  return overs * 6 + balls;
}

function cleanPlayerName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/\s*\(c\s*&\s*wk\)/, '')
    .replace(/\s*\(wk\)/, '')
    .replace(/\s*\(c\)/, '')
    .trim();
}

/**
 * Synchronizes player individual statistics from a completed match's scorecard
 */
export async function syncMatchPlayerStats(match) {
  try {
    if (mongoose.connection.readyState !== 1) return;
    if (!match || !match.scorecard || !Array.isArray(match.scorecard.innings) || match.scorecard.innings.length === 0) {
      return;
    }

    const matchId = match.matchId || match.id || match._id;
    const isFCCInning1 = (match.scorecard.innings[0].teamName || '').toLowerCase().includes('fahrenheit');
    const fccBattingInn = isFCCInning1 ? match.scorecard.innings[0] : match.scorecard.innings[1];
    const oppBattingInn = isFCCInning1 ? match.scorecard.innings[1] : match.scorecard.innings[0];

    if (!fccBattingInn || !oppBattingInn) return;

    const fccBatting = fccBattingInn.batting || [];
    const fccBowling = oppBattingInn.bowling || [];
    const oppBatting = oppBattingInn.batting || [];

    const isFCCWin = match.isWonByFCC || (match.result || '').toLowerCase().includes('won');
    const oppName = match.opponent?.name || match.opponent || 'Opponent';
    const matchDate = match.date || '';
    const matchVenue = match.venue || '';

    // Collect all participating FCC player performances
    const playerContributions = new Map();

    const getOrInit = (name) => {
      const clean = cleanPlayerName(name);
      if (!playerContributions.has(clean)) {
        playerContributions.set(clean, {
          rawName: name,
          batted: false,
          runs: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          isOut: true,
          bowled: false,
          overs: '0.0',
          maidens: 0,
          runsConceded: 0,
          wickets: 0,
          catches: 0,
          stumpings: 0,
          runOuts: 0,
          caughtBehind: 0,
          isCaptain: name.toLowerCase().includes('(c)'),
        });
      }
      return playerContributions.get(clean);
    };

    // 1. Process Batting
    for (const b of fccBatting) {
      const p = getOrInit(b.player);
      p.batted = true;
      p.runs = Number(b.runs) || 0;
      p.balls = Number(b.balls) || 0;
      p.fours = Number(b.fours) || 0;
      p.sixes = Number(b.sixes) || 0;
      p.isOut = !((b.dismissal || '').toLowerCase().includes('not out'));
    }

    // 2. Process Bowling
    for (const bowl of fccBowling) {
      const p = getOrInit(bowl.bowler);
      p.bowled = true;
      p.overs = String(bowl.overs || '0.0');
      p.maidens = Number(bowl.maidens) || 0;
      p.runsConceded = Number(bowl.runs) || 0;
      p.wickets = Number(bowl.wickets) || 0;
    }

    // 3. Process Fielding (Catches, stumpings, run outs)
    for (const b of oppBatting) {
      const dismissal = b.dismissal || '';
      if (!dismissal || dismissal === 'not out') continue;

      // Catches
      const catchMatch = dismissal.match(/^c\s+([^b]+?)\s+b\s+/i);
      if (catchMatch && catchMatch[1]) {
        const fielderName = catchMatch[1].trim();
        const p = getOrInit(fielderName);
        p.catches += 1;
        if (fielderName.toLowerCase().includes('wk') || fielderName.toLowerCase().includes('rishwanth') || fielderName.toLowerCase().includes('sibi')) {
          p.caughtBehind += 1;
        }
      }

      // Stumpings
      const stMatch = dismissal.match(/^st\s+([^b]+?)\s+b\s+/i);
      if (stMatch && stMatch[1]) {
        const fielderName = stMatch[1].trim();
        const p = getOrInit(fielderName);
        p.stumpings += 1;
      }

      // Run outs
      const roMatch = dismissal.match(/run out\s+([^\/]+)(?:\/\s*([^\/]+))?/i);
      if (roMatch) {
        if (roMatch[1]) {
          const p1 = getOrInit(roMatch[1].trim());
          p1.runOuts += 1;
        }
        if (roMatch[2]) {
          const p2 = getOrInit(roMatch[2].trim());
          p2.runOuts += 1;
        }
      }
    }

    // 4. Update MongoDB Player documents
    for (const [cleanName, contrib] of playerContributions.entries()) {
      // Find player by regex
      const playerDoc = await Player.findOne({
        name: { $regex: new RegExp(`^${cleanName}`, 'i') },
      });

      if (!playerDoc) continue;

      // Check if performance is already recorded
      const alreadyHasMatch = (playerDoc.recentPerformances || []).some(
        (rp) => String(rp.matchId) === String(matchId)
      );

      if (alreadyHasMatch) continue;

      playerDoc.stats = playerDoc.stats || {};
      playerDoc.batting = playerDoc.batting || {};
      playerDoc.bowling = playerDoc.bowling || {};
      playerDoc.fielding = playerDoc.fielding || {};
      playerDoc.recentPerformances = playerDoc.recentPerformances || [];

      // Update matches
      playerDoc.stats.matches = (Number(playerDoc.stats.matches) || 0) + 1;
      playerDoc.fielding.matches = playerDoc.stats.matches;

      // Batting
      if (contrib.batted) {
        playerDoc.stats.runs = (Number(playerDoc.stats.runs) || 0) + contrib.runs;
        playerDoc.batting.runs = (Number(playerDoc.batting.runs) || 0) + contrib.runs;
        playerDoc.batting.innings = (Number(playerDoc.batting.innings) || 0) + 1;
        if (!contrib.isOut) {
          playerDoc.batting.notOut = (Number(playerDoc.batting.notOut) || 0) + 1;
        }
        playerDoc.stats.fours = (Number(playerDoc.stats.fours) || 0) + contrib.fours;
        playerDoc.batting.fours = (Number(playerDoc.batting.fours) || 0) + contrib.fours;
        playerDoc.stats.sixes = (Number(playerDoc.stats.sixes) || 0) + contrib.sixes;
        playerDoc.batting.sixes = (Number(playerDoc.batting.sixes) || 0) + contrib.sixes;

        if (contrib.runs >= 100) {
          playerDoc.stats.centuries = (Number(playerDoc.stats.centuries) || 0) + 1;
          playerDoc.batting.centuries = (Number(playerDoc.batting.centuries) || 0) + 1;
        } else if (contrib.runs >= 50) {
          playerDoc.stats.fifties = (Number(playerDoc.stats.fifties) || 0) + 1;
          playerDoc.batting.fifties = (Number(playerDoc.batting.fifties) || 0) + 1;
        }

        const hs = parseInt(String(playerDoc.stats.highestScore || '0').replace('*', ''), 10);
        if (contrib.runs > hs) {
          const hsStr = contrib.isOut ? String(contrib.runs) : `${contrib.runs}*`;
          playerDoc.stats.highestScore = hsStr;
          playerDoc.batting.highestScore = hsStr;
        }

        const dismissals = (Number(playerDoc.batting.innings) || 1) - (Number(playerDoc.batting.notOut) || 0);
        if (dismissals > 0) {
          const avg = parseFloat(((Number(playerDoc.batting.runs) || 0) / dismissals).toFixed(2));
          playerDoc.batting.average = avg;
          playerDoc.stats.average = avg;
        }
      }

      // Bowling
      if (contrib.bowled) {
        playerDoc.stats.wickets = (Number(playerDoc.stats.wickets) || 0) + contrib.wickets;
        playerDoc.bowling.wickets = (Number(playerDoc.bowling.wickets) || 0) + contrib.wickets;
        playerDoc.bowling.innings = (Number(playerDoc.bowling.innings) || 0) + 1;
        playerDoc.stats.maidens = (Number(playerDoc.stats.maidens) || 0) + contrib.maidens;
        playerDoc.bowling.maidens = (Number(playerDoc.bowling.maidens) || 0) + contrib.maidens;
        playerDoc.bowling.runsConceded = (Number(playerDoc.bowling.runsConceded) || 0) + contrib.runsConceded;

        const newOvers = addOvers(playerDoc.bowling.overs || '0.0', contrib.overs);
        playerDoc.bowling.overs = newOvers;
        playerDoc.stats.overs = newOvers;

        const totalBalls = oversToBalls(newOvers);
        const runsConc = Number(playerDoc.bowling.runsConceded) || 0;
        const wkts = Number(playerDoc.bowling.wickets) || 0;
        if (totalBalls > 0) {
          playerDoc.bowling.economy = parseFloat((runsConc / (totalBalls / 6)).toFixed(2));
          playerDoc.stats.economy = playerDoc.bowling.economy;
        }
        if (wkts > 0) {
          playerDoc.bowling.average = parseFloat((runsConc / wkts).toFixed(2));
          playerDoc.stats.bowlingAverage = playerDoc.bowling.average;
        }
      }

      // Fielding
      const totalDismissals = contrib.catches + contrib.stumpings + contrib.runOuts;
      if (totalDismissals > 0) {
        playerDoc.stats.catches = (Number(playerDoc.stats.catches) || 0) + contrib.catches;
        playerDoc.fielding.catches = (Number(playerDoc.fielding.catches) || 0) + contrib.catches;

        playerDoc.stats.stumpings = (Number(playerDoc.stats.stumpings) || 0) + contrib.stumpings;
        playerDoc.fielding.stumpings = (Number(playerDoc.fielding.stumpings) || 0) + contrib.stumpings;

        playerDoc.stats.runOuts = (Number(playerDoc.stats.runOuts) || 0) + contrib.runOuts;
        playerDoc.fielding.runOuts = (Number(playerDoc.fielding.runOuts) || 0) + contrib.runOuts;

        playerDoc.stats.dismissals = (Number(playerDoc.stats.dismissals) || 0) + totalDismissals;
        playerDoc.fielding.dismissals = (Number(playerDoc.fielding.dismissals) || 0) + totalDismissals;
      }

      // Prepend recent performance
      const isPOM =
        match.playerOfTheMatch &&
        (String(match.playerOfTheMatch.id) === String(playerDoc.id) ||
          cleanPlayerName(match.playerOfTheMatch.name) === cleanName);

      const runsStr = contrib.batted ? (contrib.isOut ? String(contrib.runs) : `${contrib.runs}*`) : 'DNB';
      const bowlStr = contrib.bowled ? `${contrib.wickets}/${contrib.runsConceded} (${contrib.overs})` : '--';
      const resStr = isFCCWin ? (isPOM ? 'Won (POTM)' : 'Won') : 'Lost';

      playerDoc.recentPerformances.unshift({
        matchId: Number(matchId) || matchId,
        opponent: oppName,
        venue: matchVenue,
        date: matchDate,
        runs: runsStr,
        bowling: bowlStr,
        result: resStr,
      });

      await playerDoc.save();
    }
  } catch (err) {
    console.error('Error in syncMatchPlayerStats:', err.message);
  }
}

export default syncMatchPlayerStats;
