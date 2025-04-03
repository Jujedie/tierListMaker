import request from 'supertest';
import app from '../src/app';
// @ts-ignore
import { connectTestDB, disconnectTestDB } from './app';

describe('User API', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ name: 'John', email: 'john@doe.fr', password: 'password123' });
    expect(response.status).toBe(201);
  });

  it('should login an existing user', async () => {
    await request(app)
      .post('/api/users/register')
      .send({ name: 'John', email: 'john@doe.fr', password: 'password123' });
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'john@doe.fr', password: 'password123' });
    expect(response.status).toBe(200);
  });
});
