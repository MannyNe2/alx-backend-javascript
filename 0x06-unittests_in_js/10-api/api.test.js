const request = require('request');
const { expect } = require('chai');

describe("API integration test for REST endpoints", () => {
  const API_ENDPOINT = "http://localhost:7865";

  it("GET / returns correct response", (done) => {
    request.get(`${API_ENDPOINT}/`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal("Welcome to the payment system");
      done();
    });
  });

  it("GET /cart/:id returns correct response for valid :id", (done) => {
    request.get(`${API_ENDPOINT}/cart/69`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal("Payment methods for cart 47");
      done();
    });
  });

  it("GET /cart/:id returns 404 response for negative number values in :id", (done) => {
    request.get(`${API_ENDPOINT}/cart/-69`, (_err, res, _body) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });

  it("GET /cart/:id returns 404 response for non-numeric values in :id", (done) => {
    request.get(`${API_ENDPOINT}/cart/38s0-84f9-3db6`, (_err, res, _body) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });

  it("POST /login returns valid response", (done) => {
    request.post(
      `${API_ENDPOINT}/login`,
      { json: { userName: "Manny" } },
      (_err, res, body) => {
        expect(res.statusCode).to.be.equal(200);
        expect(body).to.be.equal("Welcome Manny");
        done();
      }
    );
  });

  it("GET /available_payments returns valid response", (done) => {
    request.get(`${API_ENDPOINT}/available_payments`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(JSON.parse(body)).to.be.deep.equal({
        payment_methods: { credit_cards: true, paypal: false },
      });
      done();
    });
  });
});
