process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let List = require("./fakeDb");

let milk = { name: "milk", price: "5.95" };

beforeEach(function() {
    console.log('before:', milk);
  List.push(milk);
});

afterEach(function() {
  // make sure this *mutates*, not redefines, `cats`
  List.length = 0;
});

/** GET /items - returns `[{ name: 'milk' }]` */

describe("GET /items", function() {
    test("Gets an item list", async function() {
      const resp = await request(app).get(`/items`);
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual([milk]);
    });
  });

  /** POST /items - create item from data; return `new item` */

describe("POST /items", function() {
    test("Creates a new item", async function() {
      const resp = await request(app)
        .post(`/items?name=bread&price=2.99`);
      expect(resp.statusCode).toBe(201);
      expect(resp.body).toEqual({ added: {
        name: "bread",
        price: "2.99"
      }
      });
    });
  });

  describe("GET /items/:name", function() {
    test("Gets an item", async function() {
      const resp = await request(app).get(`/items/milk`);
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual(milk);
    });
  });

  describe("PATCH /items/:name", function() {
    test("Edits an existing item", async function() {
      const resp = await request(app)
        .patch(`/items/milk?name=jam&price=2.99`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({
        name: "jam",
        price: "2.99"
      });
    });
  });

  describe("DELETE /items/:name", function() {
    test("Deletes an item", async function() {
      const resp = await request(app)
      .delete(`/items/jam`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({message: 'deleted'});
      expect(List.length).toEqual(0);
    });
  });