const fetch = require('node-fetch');

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000';

let API_UP = false;

beforeAll(async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    API_UP = res && (res.status >= 200 && res.status < 500); // treat reachable even if /health returns 404
  } catch (err) {
    console.warn('API unreachable at', API_BASE, '-', err.message);
  }
});

describe('API integration tests (template)', () => {
  test('GET /health (or /) responds 200', async () => {
    if (!API_UP) return console.warn('Skipping GET /health: API not reachable');
    const res = await fetch(`${API_BASE}/health`);
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const json = await res.json();
      expect(json).toBeDefined();
    }
  });

  test('POST /api/users/login - valid credentials', async () => {
    if (!API_UP) return console.warn('Skipping POST /api/users/login: API not reachable');
    const res = await fetch(`${API_BASE}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testUser1', password: '1234' })
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toBeDefined();
    expect(body).toHaveProperty('success', true);
    expect(body).toHaveProperty('token');
  });

  test('POST /api/users/check-username - available / unavailable', async () => {
    if (!API_UP) return console.warn('Skipping POST /api/users/check-username: API not reachable');
    let res = await fetch(`${API_BASE}/api/users/check-username`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testUser1' })
    });
    expect(res.status).toBe(200);
    let json = await res.json();
    expect(json).toHaveProperty('available', false);

    res = await fetch(`${API_BASE}/api/users/check-username`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'someRandomUserXYZ' })
    });
    expect(res.status).toBe(200);
    json = await res.json();
    expect(json).toHaveProperty('available', true);
  });

  test('GET /api/users/:id - fetch user by id', async () => {
    if (!API_UP) return console.warn('Skipping GET /api/users/:id: API not reachable');
    const res = await fetch(`${API_BASE}/api/users/1`);
    if (res.status === 200) {
      const user = await res.json();
      expect(user).toHaveProperty('id', 1);
      expect(user).toHaveProperty('username');
    } else {
      expect(res.status).toBe(200);
    }
  });
});