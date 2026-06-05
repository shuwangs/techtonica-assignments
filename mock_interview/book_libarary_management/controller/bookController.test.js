import request from "supertest";
import app from "../server.js";
describe("Book API", () => {

    test("GET /books should return all books", async () => {

        const response = await request(app)
            .get("/api/books");

        expect(response.statusCode).toBe(200);

    })
})
