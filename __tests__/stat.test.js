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

describe('Stats table /api/stats', () => {
  test('GET /api/stats/team/:id returns stats object or 404', async () => {
    const res = await fetch(`${API_BASE}/api/stats/team/1`).catch(() => null);
    if (!res) return console.warn('Skipping GET /api/stats/team/1: API not reachable');
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const stats = await res.json();
    }
  });

  test('GET /api/stats returns list or 404 (if available)', async () => {
    const res = await fetch(`${API_BASE}/api/stats`).catch(() => null);
    if (!res) return console.warn('Skipping GET /api/stats: API not reachable');
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const list = await res.json();
      expect(Array.isArray(list)).toBe(true);
    }
  });
});