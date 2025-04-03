import request from 'supertest';
import app from '../src/app';
// @ts-ignore
import { connectTestDB, disconnectTestDB, generateTestToken } from './app';
import { ITier } from '../src/models/Tier';
describe('TierList API', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it('should create a new tierlist', async () => {
    const token = await generateTestToken();
    const response = await request(app)
      .post('/api/tierlist')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test TierList',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should get a specific tierlist', async () => {
    const token = await generateTestToken();
    const createdTierList = await request(app)
      .post('/api/tierlist')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'To Get',
      });

    const response = await request(app)
      .get(`/api/tierlist/${createdTierList.body._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('To Get');
  });

  it('should delete a specific tierlist', async () => {
    const token = await generateTestToken();
    const createdTierList = await request(app)
      .post('/api/tierlist')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'To Delete' });
    const response = await request(app)
      .delete(`/api/tierlist/${createdTierList.body._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should add a tier to a tierlist', async () => {
    const token = await generateTestToken();
    const createdTierList = await request(app)
      .post('/api/tierlist')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TierList with Tier' });

    const response = await request(app)
      .post(`/api/tierlist/${createdTierList.body._id}/add-tier`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'New Tier', color: '#FFFFFF' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.tiers.length).toEqual(1);
  });

  it('should add an item to a tierlist', async () => {
    const token = await generateTestToken();
    const createdTierList = await request(app)
      .post('/api/tierlist')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TierList with Item' });
    const response = await request(app)
      .post(`/api/tierlist/${createdTierList.body._id}/add-item`)
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'new Item' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.items.length).toEqual(1);
  });

  it('should move an item to another tier', async () => {
    const token = await generateTestToken();
    const createdTierList = await request(app)
      .post('/api/tierlist')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TierList for Move' });
    await request(app)
      .post(`/api/tierlist/${createdTierList.body._id}/add-tier`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Tier for Move', color: '#aaaaaa' });
    const createdItem = await request(app)
      .post(`/api/tierlist/${createdTierList.body._id}/add-item`)
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'new Item' });
    const response = await request(app)
      .put(`/api/tierlist/${createdTierList.body._id}/move-item-to-tier`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId: createdItem.body.items[0]._id,
        tierId: createdItem.body.tiers[0]._id,
      });
    expect(response.body.items.length).toBe(0);
    expect(response.body.tiers[0].items.length).toBe(1);
    expect(response.status).toBe(200);
  });

  it('should reorder tiers in a tierlist', async () => {
    const token = await generateTestToken();
    const createdTierList = await request(app)
      .post('/api/tierlist')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'TierList for Reorder' });

    // Create three tiers
    await request(app)
      .post(`/api/tierlist/${createdTierList.body._id}/add-tier`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Tier 1', color: '#123456' });

    await request(app)
      .post(`/api/tierlist/${createdTierList.body._id}/add-tier`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Tier 2', color: '#234567' });

    let updatedTierlist = await request(app)
      .post(`/api/tierlist/${createdTierList.body._id}/add-tier`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Tier 3', color: '#345678' });

    let tierOrderOriginal = updatedTierlist.body.tiers;

    let tierOrderNew = [
      tierOrderOriginal[1]._id,
      tierOrderOriginal[0]._id,
      tierOrderOriginal[2]._id,
    ];

    const response = await request(app)
      .put(`/api/tierlist/${createdTierList.body._id}/reorder-tiers`)
      .set('Authorization', `Bearer ${token}`)
      .send({ tierOrder: tierOrderNew });

    expect(response.status).toBe(200);
    expect(response.body.tiers.map((tier: ITier) => tier._id)).toEqual(
      tierOrderNew
    );
  });
});
