const request = require("supertest");
const app = require("../app");

const Titre = require("../models/Titre");
const { connectTestDb, clearTestDb, disconnectTestDb } = require("./setup");

describe("Public endpoints", () => {
  beforeAll(async () => {
    await connectTestDb();
  });

  beforeEach(async () => {
    await clearTestDb();
    await Titre.create({
      titre: "Titre I",
      description: "Test",
      orderIndex: 0,
      statut: "publié",
    });
  });

  afterAll(async () => {
    await disconnectTestDb();
  });

  it("GET /api/v1/public/meta should return counts", async () => {
    const res = await request(app).get("/api/v1/public/meta");
    expect(res.statusCode).toBe(200);
    expect(res.body.counts).toBeTruthy();
    expect(res.body.counts.titres).toBe(1);
  });

  it("GET /api/v1/public/titres should return published titres", async () => {
    const res = await request(app).get("/api/v1/public/titres");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].titre).toBe("Titre I");
  });
});
