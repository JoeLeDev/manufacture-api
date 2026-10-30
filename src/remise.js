function appliquerRemise(prix, pourcentage) {
  if (
    typeof prix !== 'number' ||
    !Number.isFinite(prix) ||
    prix < 0
  ) {
    throw new Error('Prix invalide');
  }

  if (
    typeof pourcentage !== 'number' ||
    !Number.isFinite(pourcentage) ||
    pourcentage < 0 ||
    pourcentage > 100
  ) {
    throw new Error('Remise invalide');
  }

  return Math.round(prix * (1 - pourcentage / 100) * 100) / 100;
}

module.exports = { appliquerRemise };
