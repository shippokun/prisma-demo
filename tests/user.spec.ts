import request from "supertest";
import { app, prisma } from "../src/app";

afterAll(async (done) => {
  await prisma.$disconnect();
  done();
});

const user = {
  name: "user 1",
  email: "user1@mail.com",
};

test("a user is added successfully", async () => {
  const response = await request(app)
    .post("/user")
    .send(user)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  expect(response.body.id).toBeDefined();
});
