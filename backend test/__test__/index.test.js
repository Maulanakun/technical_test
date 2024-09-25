const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

beforeAll(async () => {
  const dataMember = require("../data/members.json");

  const dataMembers = dataMember.map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    el.penalty = false;
    return el;
  });
  await queryInterface.bulkInsert("Members", dataMembers, {});

  const dataBook = require("../data/books.json");

  const dataBooks = dataBook.map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    return el;
  });
  await queryInterface.bulkInsert("Books", dataBooks, {});
});

describe("GET", () => {
  it("should be return array of object all members", async () => {
    const response = await request(app).get("/api/readMember");
    expect(response.status).toBe(201);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("code");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("penalty");
    expect(response.body[0]).toHaveProperty("limitPenalty");
    expect(response.body[0]).toHaveProperty("createdAt");
    expect(response.body[0]).toHaveProperty("updatedAt");
    expect(response.body[0]).toHaveProperty("Borrows");
  });
  it("should be return array of object all books", async () => {
    const response = await request(app).get("/api/readBook");
    expect(response.status).toBe(201);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("code");
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0]).toHaveProperty("author");
    expect(response.body[0]).toHaveProperty("stock");
    expect(response.body[0]).toHaveProperty("createdAt");
    expect(response.body[0]).toHaveProperty("updatedAt");
    expect(response.body[0]).toHaveProperty("Borrows");
  });
});

describe("POST", () => {
  it("sould be return a message", async () => {
    const response = await request(app)
      .post("/api/borrow/5")
      .set("sessionid", "1");
    console.log(response.status, response);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  });
});

describe("DELETE", () => {
  it("sould be return a message", async () => {
    const response = await request(app)
      .delete("/api/returnBook/5")
      .set("sessionid", "1");
    console.log(response.status, response, "111112q131231111324124");
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
  });
});
afterAll(async () => {
  await queryInterface.bulkDelete("Members", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  console.log("Selesai menghapus data Members.");

  await queryInterface.bulkDelete("Books", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  console.log("Selesai menghapus data Books.");
});
