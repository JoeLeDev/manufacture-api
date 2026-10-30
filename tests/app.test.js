const request = require('supertest');
const app = require('../src/app');

test('GET /health repond ok', async () => {
  const res = await request(app).get('/health');
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('ok');
});

test('GET /prix calcule le prix TTC', async () => {
  const res = await request(app).get('/prix?ht=50');
  expect(res.body.ttc).toBe(60);
});

test('GET /prix refuse un prix invalide', async () => {
  const res = await request(app).get('/prix?ht=abc');
  expect(res.status).toBe(400);
});

test('GET /prix calcule le prix TTC avec un taux reduit', async () => {
  const res = await request(app).get('/prix?ht=-1');
  expect(res.status).toBe(400);
});

describe('GET /remise', () => {
  test('applique une remise de 25 %', async () => {
    const res = await request(app)
      .get('/remise?prix=200&pourcentage=25');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      prix: 200,
      pourcentage: 25,
      prixRemise: 150
    });
  });

  test('applique une remise de 10 %', async () => {
    const res = await request(app)
      .get('/remise?prix=100&pourcentage=10');

    expect(res.status).toBe(200);
    expect(res.body.prixRemise).toBe(90);
  });

  test('refuse une remise supérieure à 100 %', async () => {
    const res = await request(app)
      .get('/remise?prix=200&pourcentage=120');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      erreur: 'Remise invalide'
    });
  });

  test('refuse les paramètres manquants', async () => {
    const res = await request(app)
      .get('/remise?prix=200');

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      erreur: 'Paramètres manquants'
    });
  });
});