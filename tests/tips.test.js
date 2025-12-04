const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const initModels = require('../models');

beforeAll(async () => {
  const models = initModels(sequelize);
  await sequelize.sync({ force: true });

  const character = await models.Character.create({
    name: 'Character C',
    archetype: 'test-type',
    weightClass: 'midweight'
  });

  await models.Tip.create({
    characterId: character.id,
    tipTitle: 'Test Tip',
    description: 'Testing description',
    difficultyLevel: 'easy'
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Tips API', () => {
  test('GET /tips should return status 200 and an array', async () => {
    const res = await request(app).get('/tips');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
