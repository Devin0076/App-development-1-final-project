const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const initModels = require('../models');

beforeAll(async () => {
  const models = initModels(sequelize);
  await sequelize.sync({ force: true });

  await models.Character.create({
    name: 'Test Character',
    archetype: 'test-type',
    weightClass: 'midweight'
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Characters API', () => {
  test('GET /characters should return status 200 and an array', async () => {
    const res = await request(app).get('/characters');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
