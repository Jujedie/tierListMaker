import request from 'supertest';
import app from '../src/app';
// @ts-ignore
import { connectTestDB, disconnectTestDB, generateTestToken } from './app';

describe('Item API', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it('should create a new item', async () => {
    const token = await generateTestToken();
    const response = await request(app)
      .post('/api/item')
      .send({ text: 'Test Item' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should update an existing item', async () => {
    const token = await generateTestToken();
    let response = await request(app)
      .post('/api/item')
      .send({ text: 'Test Item' })
      .set('Authorization', `Bearer ${token}`);
    const itemId = response.body._id;

    response = await request(app)
      .put(`/api/item/${itemId}`)
      .send({ text: 'Updated Item' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.text).toBe('Updated Item');
  });

  it('should delete a item', async () => {
    const token = await generateTestToken();
    const responsePost = await request(app)
      .post('/api/item')
      .send({ text: 'Deleted Item' })
      .set('Authorization', `Bearer ${token}`);
    const id = responsePost.body._id;
    const responseDelete = await request(app)
      .delete(`/api/item/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(responseDelete.status).toBe(200);
    const responseGet = await request(app)
      .get(`/api/item/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(responseGet.status).toBe(404);
  });
});
