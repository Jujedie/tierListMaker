import request from 'supertest';
import app from '../src/app';
// @ts-ignore
import { connectTestDB, disconnectTestDB, generateTestToken } from './app';
describe('TierLists API', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it('should get all tierlists for a user', async () => {
    const token = await generateTestToken();
    const response = await request(app)
      .get('/api/tierlists')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
