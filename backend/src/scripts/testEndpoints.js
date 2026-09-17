// Automated endpoint testing script for Fahrenheit Cricket Club API
const BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

async function runTests() {
  console.log(`\n🧪 Testing Fahrenheit Cricket Club API endpoints at: ${BASE_URL}\n`);
  let passed = 0;
  let failed = 0;

  async function testEndpoint(name, url, options = {}) {
    try {
      const res = await fetch(`${BASE_URL}${url}`, options);
      const data = await res.json();

      if (res.ok && data.success) {
        console.log(`✅ [PASS] ${name} (${res.status})`);
        passed++;
        return data;
      } else {
        console.log(`❌ [FAIL] ${name} (${res.status}): ${data.message || res.statusText}`);
        failed++;
        return data;
      }
    } catch (err) {
      console.log(`❌ [FAIL] ${name}: Connection error (${err.message})`);
      failed++;
      return null;
    }
  }

  // 1. Health check
  await testEndpoint('Health Check', '/health');

  // 2. Team API
  await testEndpoint('Get Team Profile', '/team');

  // 3. Players API
  await testEndpoint('Get All Players', '/players');
  await testEndpoint('Search Players (Vicky)', '/players/search?name=Vicky');
  await testEndpoint('Get Player by ID (21685780)', '/players/21685780');

  // 4. Matches API
  await testEndpoint('Get All Matches', '/matches');
  await testEndpoint('Get Completed Matches', '/matches?status=completed');

  // 5. Leaderboard API
  await testEndpoint('Get All Leaderboards', '/leaderboard');
  await testEndpoint('Get Batting Leaderboard', '/leaderboard/batting');
  await testEndpoint('Get Bowling Leaderboard', '/leaderboard/bowling');
  await testEndpoint('Get Fielding Leaderboard', '/leaderboard/fielding');

  // 6. Stats API
  await testEndpoint('Get All Team Stats', '/stats');
  await testEndpoint('Get Batting Stats', '/stats/batting');
  await testEndpoint('Get Bowling Stats', '/stats/bowling');

  // 7. Gallery API
  await testEndpoint('Get Gallery Items', '/gallery');

  // 8. Auth API
  console.log('\n🔐 Testing Authentication & Protected Routes...');
  const loginRes = await testEndpoint('Admin Login', '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@fahrenheitcc.com',
      password: 'FCCAdmin@2026',
    }),
  });

  const token = loginRes?.data?.token;

  if (token) {
    await testEndpoint('Get Authenticated Admin (GET /api/auth/me)', '/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // 9. Unauthorized access test
  try {
    const unauthRes = await fetch(`${BASE_URL}/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Unauthorized Player' }),
    });
    if (unauthRes.status === 401) {
      console.log(`✅ [PASS] Protected Route correctly rejected unauthenticated request (401 Unauthorized)`);
      passed++;
    } else {
      console.log(`❌ [FAIL] Protected Route did not return 401: received ${unauthRes.status}`);
      failed++;
    }
  } catch (e) {
    console.log(`❌ [FAIL] Unauthorized test error: ${e.message}`);
    failed++;
  }

  console.log(`\n================================`);
  console.log(`Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log(`================================\n`);
}

runTests();
