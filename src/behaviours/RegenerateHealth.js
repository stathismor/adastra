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
  }

  update() {}

  damage(target, damageValue) {
    this.game.camera.shake(SHAKE_INTENSITY, SHAKE_DURATION, true, Phaser.Camera.SHAKE_BOTH, false);

    this.regenerationTween.stop();
    const t = target;

    // If target is dead, the onKilled will be fired.
    t.damage(damageValue);

    this.regenerationTween = new Tweenable().tween({
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
