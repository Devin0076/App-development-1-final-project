jest.setTimeout(20000); // allow up to 20 seconds for DB setup


const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');

beforeAll(async () => {
  const models = require('../models')(sequelize);

  await sequelize.sync({ force: true });

  const character = await models.Character.create({
    name: 'Character B',
    archetype: 'test-type',
    weightClass: 'midweight'
  });

  await models.CounterpickStage.create({
    characterId: character.id,
    stageName: 'Test Counterpick Stage',
    benefit: 'Testing benefit',
    rating: 4
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe('CounterpickStages API', () => {
  test('GET /counterpick-stages should return status 200 and an array', async () => {
    const res = await request(app).get('/counterpick-stages');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
