const request = require("supertest");
const app = require("../index");
test("Fetch services", async () => {
 const res = await request(app).get("/api/services");
 expect(res.statusCode).toBe(200);
});