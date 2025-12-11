const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const initModels = require('../models');

jest.setTimeout(20000);

let models;
let adminToken;
let userToken;

beforeAll(async () => {
  models = initModels(sequelize);
  await sequelize.sync({ force: true });

  // Create admin user
  await models.User.create({
    email: "admin@example.com",
    password: "password123",
    role: "admin"
  });

  // Create regular user
  await models.User.create({
    email: "user@example.com",
    password: "password123",
    role: "user"
  });

  // Login admin to get token
  const adminLoginRes = await request(app)
    .post('/auth/login')
    .send({
      email: "admin@example.com",
      password: "password123"
    });

  adminToken = adminLoginRes.body.token;

  // Login user to get token
  const userLoginRes = await request(app)
    .post('/auth/login')
    .send({
      email: "user@example.com",
      password: "password123"
    });

  userToken = userLoginRes.body.token;
});

afterAll(async () => {
  await sequelize.close();
});

describe("Authorization for character routes", () => {
  test("Unauthenticated user cannot create a character", async () => {
    const res = await request(app)
      .post('/characters')
      .send({
        name: "NoAuth Character",
        archetype: "test",
        weightClass: "midweight"
      });

    expect(res.statusCode).toBe(401);  // from authMiddleware (no token)
    expect(res.body).toHaveProperty("error");
  });

  test("Regular user cannot create a character (admin only)", async () => {
    const res = await request(app)
      .post('/characters')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: "User Character",
        archetype: "test",
        weightClass: "midweight"
      });

    expect(res.statusCode).toBe(403);  // from requireAdmin
    expect(res.body).toHaveProperty("error");
  });

  test("Admin user can create a character", async () => {
    const res = await request(app)
      .post('/characters')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: "Admin Character",
        archetype: "test",
        weightClass: "midweight"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Admin Character");
  });
});
