const { appliquerRemise } = require('../src/remise');

describe('appliquerRemise', () => {
  test('25 % de remise sur 200 euros donnent 150 euros', () => {
    expect(appliquerRemise(200, 25)).toBe(150);
  });

  test('10 % de remise sur 100 euros donnent 90 euros', () => {
    expect(appliquerRemise(100, 10)).toBe(90);
  });

  test('0 % de remise laisse le prix inchangé', () => {
    expect(appliquerRemise(100, 0)).toBe(100);
  });

  test('100 % de remise donne 0', () => {
    expect(appliquerRemise(100, 100)).toBe(0);
  });

  test('une remise supérieure à 100 % est refusée', () => {
    expect(() => appliquerRemise(200, 120))
      .toThrow('Remise invalide');
  });

  test('une remise négative est refusée', () => {
    expect(() => appliquerRemise(100, -10))
      .toThrow('Remise invalide');
  });

  test('un prix négatif est refusé', () => {
    expect(() => appliquerRemise(-100, 20))
      .toThrow('Prix invalide');
  });

  test('un prix non numérique est refusé', () => {
    expect(() => appliquerRemise('100', 10))
      .toThrow('Prix invalide');
  });

  test('un prix non fini est refusé', () => {
    expect(() => appliquerRemise(Infinity, 10))
      .toThrow('Prix invalide');
    expect(() => appliquerRemise(NaN, 10))
      .toThrow('Prix invalide');
  });

  test('un pourcentage non numérique est refusé', () => {
    expect(() => appliquerRemise(100, '10'))
      .toThrow('Remise invalide');
  });

  test('un pourcentage non fini est refusé', () => {
    expect(() => appliquerRemise(100, Infinity))
      .toThrow('Remise invalide');
    expect(() => appliquerRemise(100, NaN))
      .toThrow('Remise invalide');
  });
});
