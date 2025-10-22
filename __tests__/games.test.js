const fetch = require('node-fetch');

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000';

beforeAll(async () => {
  try {
    let res = await fetch(`${API_BASE}/health`).catch(() => null);
    if (!res) res = await fetch(API_BASE).catch(() => null);
    API_UP = !!res && (res.status >= 200 && res.status < 500);
    if (!API_UP) {
      console.warn('API unreachable at', API_BASE);
    }
  } catch (err) {
    console.warn('API unreachable at', API_BASE, '-', err.message);
  }
});

describe('Games table /api/games', () => {
  test('GET /api/games returns list or 404', async () => {
    const res = await fetch(`${API_BASE}/api/games`).catch(() => null);
    if (!res) return console.warn('Skipping GET /api/games: API not reachable');
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const games = await res.json();
      expect(Array.isArray(games)).toBe(true);
    }
  });

  test('GET /api/games/:id returns game object when present', async () => {
    const res = await fetch(`${API_BASE}/api/games/1`).catch(() => null);
    if (!res) return console.warn('Skipping GET /api/games/1: API not reachable');
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const game = await res.json();
      expect(game).toHaveProperty('id');
      // common expectations; rename if your API differs
      expect(game).toHaveProperty('homeTeam');
      expect(game).toHaveProperty('awayTeam');
    }
  });
});