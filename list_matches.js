const fs = require('fs');

const matches = JSON.parse(fs.readFileSync('cric_matches.json', 'utf8'));
console.log('Total matches:', matches.data?.length);

matches.data?.forEach((m, idx) => {
  console.log(`[${idx}] ID: ${m.match_id}, Status: ${m.status}, ${m.team_a} vs ${m.team_b}, Date: ${m.match_start_time}, Venue: ${m.ground_name}, Result: ${m.match_result}`);
  if (m.team_a_summary || m.team_b_summary) {
    console.log(`    A: ${m.team_a_summary} | B: ${m.team_b_summary}`);
  }
});
