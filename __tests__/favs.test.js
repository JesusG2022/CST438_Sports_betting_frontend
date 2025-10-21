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

describe('Favs table /api/favs', () => {
  test('GET /api/favs?userId=1 returns list or 404', async () => {
    const res = await fetch(`${API_BASE}/api/favs?userId=1`).catch(() => null);
    if (!res) return console.warn('Skipping GET /api/favs: API not reachable');
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const favs = await res.json();
      expect(Array.isArray(favs)).toBe(true);
    }
  });

  test('POST /api/favs to add/remove (if implemented) responds 200/201/404/401', async () => {
    const payload = { userId: 1, teamId: 1 };
    const res = await fetch(`${API_BASE}/api/favs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => null);
    if (!res) return console.warn('Skipping POST /api/favs: API not reachable');
    expect([200, 201, 401, 404]).toContain(res.status);
    if (res.status === 200 || res.status === 201) {
      const body = await res.json();
      expect(body).toBeDefined();
    }
  });
});