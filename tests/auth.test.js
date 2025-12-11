const request = require('supertest');
const app = require('../app');
const sequelize = require('../config/database');
const initModels = require('../models');

jest.setTimeout(20000);

let models;

beforeAll(async () => {
  models = initModels(sequelize);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth API", () => {

  test("POST /auth/register creates a new user", async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: "testuser@example.com",
        password: "password123",
        role: "user"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe("testuser@example.com");
    expect(res.body.role).toBe("user");
  });

  test("POST /auth/login returns a token for valid credentials", async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "testuser@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(typeof res.body.token).toBe("string");
  });

  test("POST /auth/login fails with wrong password", async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "testuser@example.com",
        password: "wrongPassword"
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

});
