const request = require("supertest");
const app = require("../index");

describe("Admin API Tests", () => {

test("Admin login should succeed", async () => {
  const res = await request(app)
  .post("/api/admin/login")
  .send({
    email:"admin@infrascale.com",
    password:"admin123"
  });

  expect(res.statusCode).toBe(200);
});

test("Admin login should fail with wrong password", async () => {
  const res = await request(app)
  .post("/api/admin/login")
  .send({
    email:"admin@infrascale.com",
    password:"wrong"
  });

  expect(res.statusCode).toBe(401);
});

});