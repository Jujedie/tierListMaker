import request from 'supertest';
import app from '../src/app';
// @ts-ignore
import { connectTestDB, disconnectTestDB, generateTestToken } from './app';

describe('Tier API', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it('should get a tier', async () => {
    const token = await generateTestToken();
    const responsePost = await request(app)
      .post('/api/tier')
      .send({ name: 'Test Tier', color: '#00000' })
      .set('Authorization', `Bearer ${token}`);
    const id = responsePost.body._id;
    const responseGet = await request(app)
      .get(`/api/tier/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toHaveProperty('_id');
  });

  it('should update a tier', async () => {
    const token = await generateTestToken();
    const responsePost = await request(app)
      .post('/api/tier')
      .send({ name: 'Test Tier', color: '#00000' })
      .set('Authorization', `Bearer ${token}`);
    const id = responsePost.body._id;
    const responsePut = await request(app)
      .put(`/api/tier/${id}`)
      .send({ name: 'Updated Tier', color: '#FFFFF' })
      .set('Authorization', `Bearer ${token}`);
    expect(responsePut.status).toBe(200);
    expect(responsePut.body).toHaveProperty('name', 'Updated Tier');
  });

  it('should delete a tier', async () => {
    const token = await generateTestToken();
    const responsePost = await request(app)
      .post('/api/tier')
      .send({ name: 'Test Tier', color: '#00000' })
      .set('Authorization', `Bearer ${token}`);
    const id = responsePost.body._id;
    const responseDelete = await request(app)
      .delete(`/api/tier/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(responseDelete.status).toBe(200);
    const responseGet = await request(app)
      .get(`/api/tier/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(responseGet.status).toBe(404);
  });

  // Ajoutez d'autres tests pour les endpoints TierList ici
});
