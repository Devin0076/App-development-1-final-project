const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const initModels = require('../models');

beforeAll(async () => {
  const models = initModels(sequelize);
  await sequelize.sync({ force: true });

  // Create a character because BanStage requires characterId
  const character = await models.Character.create({
    name: 'Character A',
    archetype: 'test-type',
    weightClass: 'midweight'
  });

  await models.BanStage.create({
    characterId: character.id,
    stageName: 'Test Ban Stage',
    reason: 'Testing reason',
    dangerRating: 3
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('BanStages API', () => {
  test('GET /ban-stages should return status 200 and an array', async () => {
    const res = await request(app).get('/ban-stages');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
