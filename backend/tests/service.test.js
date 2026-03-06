const request = require("supertest");
const app = require("../index");

describe("Service API", () => {

  test("should fetch services", async () => {

    const res = await request(app).get("/api/services");

    expect(res.statusCode).toBe(200);

  });

});