import Phaser from 'phaser';

export const centerGameObjects = (objects) => {
  objects.forEach((object) => {
    object.anchor.setTo(0.5);
  });
};

export const getRandomPoint = (game, x, y, minDistance, maxDistance, angle = null) => {
  const randomDistance = game.rnd.integerInRange(minDistance, maxDistance);
  const randomAngle = angle || game.rnd.realInRange(-Math.PI, Math.PI);
  const randomX = x + ((Math.cos(randomAngle) * randomDistance));
  const randomY = y + ((Math.sin(randomAngle) * randomDistance));
  return new Phaser.Point(randomX, randomY);
};

export const getRandomPointInDirection = (game, x, y, minDistance, maxDistance, angle, offset) => {
  const randomAngle = game.rnd.realInRange(angle - offset, angle + offset);
  return getRandomPoint(game, x, y, minDistance, maxDistance, randomAngle);
};
