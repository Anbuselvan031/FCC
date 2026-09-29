import rawPlayers from './players.js';

/**
 * User-analyzed official jersey numbers extracted from verified team records:
 * Deduplicated so each unique player has their single canonical jersey number.
 */
export const jerseyMapping = {
  // Image 1
  'adhithyan': '5',
  'caleb stanly': '21',
  'dhamo': '333',
  'dhamodaran': '333',
  'guna': '33',
  'jawahar': '77',
  'moulee': '23',
  'mouleeshvar': '23',
  'nitheesh': '16',
  'pavithran': '8',
  'prabu a': '45',
  'prabu': '45',
  'revanth': '19',
  'yogesh': '55',
  'yogaeswaran': '55',
  'anbu 24': '24',
  'anbalagan': '24',
  'anbu': '31',
  'hari': '222',
  'hariprasath': '222',
  'lalith': '17',
  'praveen': '4',
  'prithvi': '25',
  'prithvijai': '25',
  'riyaz': '2',

  // Image 2
  'saravanan': '48',
  'sibi': '27',
  'gowtham': '31',
  'hariselvam': '18',
  'karthik': '33',
  'nidhish': '14',
  'pg': '--',
  'rishwanth': '6',
  'saajan': '12',
  'selvam': '0',
  'yousuf': '9',
  'yoshuwa': '9',
  'cladson': '3',
  'sam': '3',
  'jeevesh': '8',
  'kiruthik': '1',
  'nikhil': '18',

  // Image 3
  'sabi': '1',
  'gugu': '28',
  'gugan': '28',
  'hanshi': '4',
  'sena': '17',
  'sri-hn': '10',
  'sivamani': '10',
  'surendar': '21',
  'ranju': '16',
  'raja': '16',
  'vicky': '7',
  'nandha': '11'
};

function resolveJersey(p) {
  const name = (p.name || '').toLowerCase();
  if (name === 'vicky') return '7';
  if (name.includes('anbu 24') || name.includes('anbalagan')) return '24';
  if (name.includes('anbu') && !name.includes('anbu 24')) return '31';
  if (name.includes('sabi')) return '1';
  if (name === 'sibi' || name.startsWith('sibi ')) return '27';
  if (name.includes('hariselvam')) return '18';
  if (name.includes('selvam') && !name.includes('hariselvam')) return '0';
  if (name.includes('sam cladson') || name.includes('cladson')) return '3';
  if (name.includes('gugan') || name.includes('gugu')) return '28';
  if (name.includes('hanshi')) return '4';
  if (name.includes('sivamani') || name.includes('sri-hn')) return '10';

  for (const [key, val] of Object.entries(jerseyMapping)) {
    if (name.includes(key)) return val;
  }
  return p.jerseyNumber && p.jerseyNumber !== '--' ? p.jerseyNumber : '--';
}

// Deduplicate players so each name appears only a single time
const seen = new Set();
export const playersData = [];

rawPlayers.forEach((player) => {
  let normKey = player.name.trim().toLowerCase();
  // Group duplicate variations like Jawahar BA -> Jawahar
  if (normKey.startsWith('jawahar')) normKey = 'jawahar';

  if (!seen.has(normKey)) {
    seen.add(normKey);
    playersData.push({
      ...player,
      jerseyNumber: resolveJersey(player)
    });
  }
});

// Also include verified members SENA (17) and G.Pavithran Dass (8) from team records if not already in roster
if (!seen.has('*s e n a*') && !seen.has('sena')) {
  seen.add('sena');
  playersData.push({
    id: 44357008,
    cricHeroesId: 44357008,
    name: 'SENA',
    photo: 'https://media.cricheroes.in/user_profile/1789112248993_JgVmVRyBYf3E.jpg',
    role: 'Batsman',
    bowlingStyle: 'Right-arm medium',
    bowlingSpeed: '114 KMPH',
    jerseyNumber: '17',
    isCaptain: false,
    tags: ['Hard Hitter', 'Economist'],
    stats: { matches: 42, runs: 680, wickets: 28, highestScore: '64*', strikeRate: 135.2, average: 22.4 }
  });
}

if (!seen.has('g.pavithran dass') && !seen.has('pavithran')) {
  seen.add('pavithran');
  playersData.push({
    id: 4995615,
    cricHeroesId: 4995615,
    name: 'G.Pavithran Dass',
    photo: 'https://media.cricheroes.in/default/user_profile.png',
    role: 'Wicket Keeper',
    bowlingStyle: '--',
    bowlingSpeed: '85 KMPH',
    jerseyNumber: '8',
    isCaptain: false,
    tags: ['Classicist', 'Aspirant'],
    stats: { matches: 28, runs: 410, wickets: 0, highestScore: '48', strikeRate: 110.5, average: 18.2 }
  });
}

export default playersData;
