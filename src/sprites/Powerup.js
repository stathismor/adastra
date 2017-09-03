import Entity from './Entity';

export default class extends Entity {

  constructor(game, x, y) {
    super(game, x, y, 'powerup');
    game.physics.enable(this);
    this.anchor.setTo(0.5);
  }
}
