import Phaser from 'phaser';
import Tweenable from 'shifty';

import Behaviour from './Behaviour';

const SHAKE_DURATION = 250;
const SHAKE_INTENSITY = 0.022;
const REGENERATION_MAX_DURATION = 10000;

export default class extends Behaviour {
  constructor(game, owner, target, weapon) {
    super(game, owner);
    this.target = target;
    this.weapon = weapon;
    this.regenerationTween = new Tweenable();
    this.persists = true;
  }

  update() {
    // @TODO: WIll need to investigate the performance impact of this
    this.game.physics.arcade.overlap(
      this.target,
      this.weapon.bullets,
      this.collisionHandler,
      null,
      {
        game: this.game,
        weapon: this.weapon,
        tweenable: this.regenerationTween,
      });
  }

  collisionHandler(target, bullet) {
    bullet.kill();
    this.game.camera.shake(SHAKE_INTENSITY, SHAKE_DURATION, true, Phaser.Camera.SHAKE_BOTH, false);

    this.tweenable.stop();
    const t = target;

    // If target is dead, the onKilled will be fired.
    t.damage(bullet.data.damage);

    this.tweenable = new Tweenable().tween({
      from: { health: t.health },
      to: { health: target.maxHealth },
      duration: REGENERATION_MAX_DURATION * ((target.maxHealth - t.health) / target.maxHealth),
      delay: 2500,
      step: (state) => {
        t.health = state.health;
      },
    });
  }
}
