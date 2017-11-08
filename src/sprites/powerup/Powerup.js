import Entity from '../Entity';

const LIFESPAN = 4500; // in msecs

export default class extends Entity {

  constructor(game, texture) {
    super(game, 0, 0, texture);
    this.game = game;
    game.physics.enable(this);
    this.anchor.setTo(0.5);
    this.exists = false;
    this.alive = false;
  }

  spawn(owner, target) {
    this.owner = owner;
    this.target = target;
    this.x = owner.x;
    this.y = owner.y;
    this.revive();
    this.lifespan = LIFESPAN;
  }

  apply() {}
}
