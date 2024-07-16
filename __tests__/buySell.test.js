const request = require('supertest');
const app = require('../app');
const server = require('../app.js');
const initializeDatabase = require('../initializeDatabase');

beforeAll(async () => {
  await initializeDatabase();
});

describe('Trading API', () => {
    afterAll(done => {
        server.close(done);
    });

  it('should buy shares successfully', async () => {
    const response = await request(app)
      .post('/api/buy')
      .send({
        userId: 1,
        portfolioId: 1,
        symbol: 'ABC',
        quantity: 10
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.type).toBe('BUY');
    expect(response.body.quantity).toBe(10);
  });

  it('should sell shares successfully', async () => {
    const response = await request(app)
      .post('/api/sell')
      .send({
        userId: 1,
        portfolioId: 1,
        symbol: 'ABC',
        quantity: 5
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.type).toBe('SELL');
    expect(response.body.quantity).toBe(5);
  });

  it('should return an error when trying to sell more shares than available', async () => {
    const response = await request(app)
      .post('/api/sell')
      .send({
        userId: 1,
        portfolioId: 1,
        symbol: 'ABC',
        quantity: 15
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Not enough shares to sell');
  });
});