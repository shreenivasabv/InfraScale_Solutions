const request = require("supertest");
const app = require("../index");

test("Member login success", async () => {
 const res = await request(app)
 .post("/api/member-auth/login")
 .send({
   email:"test@mail.com",
   password:"123456"
 });

 expect(res.statusCode).toBe(200);
});