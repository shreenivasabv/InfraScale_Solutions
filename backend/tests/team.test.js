const request = require("supertest");
const app = require("../index");

describe("Team API Tests", () => {

test("Fetch team members", async () => {
  const res = await request(app).get("/api/team");
  expect(res.statusCode).toBe(200);
});

test("Team response should be array", async () => {
  const res = await request(app).get("/api/team");
  expect(Array.isArray(res.body)).toBe(true);
});

});