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
});
