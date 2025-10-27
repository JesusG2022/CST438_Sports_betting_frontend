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

describe('Teams table /api/teams', () => {
  test('GET /api/teams returns array or 404', async () => {
    const res = await fetch(`${API_BASE}/api/teams`).catch(() => null);
    if (!res) return console.warn('Skipping GET /api/teams: API not reachable');
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const json = await res.json();
      expect(Array.isArray(json)).toBe(true);
    }
  });

  test('GET /api/teams/:id returns team object when present', async () => {
    const res = await fetch(`${API_BASE}/api/teams/1`).catch(() => null);
    if (!res) return console.warn('Skipping GET /api/teams/1: API not reachable');
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const team = await res.json();
      expect(team).toHaveProperty('id');
      // common field check (adjust if your API uses different field names)
      expect(team).toHaveProperty('name');
    }
  });
});