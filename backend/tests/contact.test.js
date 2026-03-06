const request = require("supertest");
const app = require("../index");

test("Submit contact form", async () => {

 const res = await request(app)
 .post("/api/contact")
 .send({
   name:"John",
   email:"john@mail.com",
   message:"Test message"
 });

 expect(res.statusCode).toBe(201);

});