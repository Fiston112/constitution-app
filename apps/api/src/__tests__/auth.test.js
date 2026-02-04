const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");

const Admin = require("../models/Admin");
const { connectTestDb, clearTestDb, disconnectTestDb } = require("./setup");

describe("Auth flow", () => {
  beforeAll(async () => {
    await connectTestDb();
  });

  beforeEach(async () => {
    await clearTestDb();

    const hash = await bcrypt.hash("admin123", 10);
    await Admin.create({
      email: "admin@constitution.cd",
      password: hash,
      nom: "Super Admin",
      role: "superadmin",
      actif: true,
    });
  });

  afterAll(async () => {
    await disconnectTestDb();
  });

  it("POST /api/v1/auth/login should return accessToken", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@constitution.cd", password: "admin123" });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeTruthy();

    // Cookie refreshToken doit exister (set-cookie)
    const setCookie = res.headers["set-cookie"] || [];
    expect(setCookie.join(";")).toMatch(/refreshToken=/);
  });

  it("GET /api/v1/admin/me should return 401 without token", async () => {
    const res = await request(app).get("/api/v1/admin/me");
    expect(res.statusCode).toBe(401);
  });

  it("GET /api/v1/admin/me should work with Bearer token", async () => {
    const login = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "admin@constitution.cd", password: "admin123" });

    const token = login.body.accessToken;

    const res = await request(app)
      .get("/api/v1/admin/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.admin).toBeTruthy();
    expect(res.body.admin.email).toBe("admin@constitution.cd");
  });
});
