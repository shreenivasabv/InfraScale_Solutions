const request = require("supertest");
const app = require("../index");
const Team = require("../models/Team");
const Member = require("../models/Member");

describe("Member Registration", () => {

  beforeAll(async () => {
    // Create team member so registration is allowed
    await Team.create({
      name: "Test Member",
      email: "testuser@mail.com",
      designation: "Developer"
    });
  });

  afterAll(async () => {
    await Team.deleteMany({});
    await Member.deleteMany({});
  });

  test("Member registration", async () => {

    const res = await request(app)
      .post("/api/member-auth/register")
      .send({
        email: "testuser@mail.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(201);
  });

});