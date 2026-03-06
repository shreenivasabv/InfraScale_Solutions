const request = require("supertest");
const app = require("../index");

describe("Admin Login API", () => {

  test("should login admin successfully", async () => {

    const res = await request(app)
      .post("/api/admin/login")
      .send({
        email: "admin@infrascale.com",
        password: "admin123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

  });

});