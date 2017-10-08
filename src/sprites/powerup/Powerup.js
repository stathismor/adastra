import Entity from '../Entity';
import Marker from '../../behaviours/Marker';

export default class extends Entity {

  constructor(game, owner, target, texture) {
    super(game, owner.x, owner.y, texture);
    this.owner = owner;
    this.target = target;

    game.physics.enable(this);
    this.anchor.setTo(0.5);
    this.addBehaviour(new Marker(game, this, target, 'marker_powerup'));
  }

  apply() {}
}
