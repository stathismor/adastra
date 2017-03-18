import Phaser from 'phaser';
import Tweenable from 'shifty';

import Behaviour from './Behaviour';

const SHAKE_DURATION = 250;
const SHAKE_INTENSITY = 0.022;
const REGENERATION_MAX_DURATION = 10000;

export default class extends Behaviour {
  constructor(game, owner, target, bullets) {
    super(game, owner);
    this.target = target;
    this.bullets = bullets;
    this.regenerationTween = new Tweenable();
  }

  update() {
    // @TODO: WIll need to investigate the performance impact of this
    this.game.physics.arcade.collide(
      this.target,
      this.bullets,
      this.collisionHandler,
      null,
      {
        game: this.game,
        owner: this.owner,
        tweenable: this.regenerationTween,
      });
  }

  collisionHandler(target, bullet) {
    bullet.kill();
    this.game.camera.shake(SHAKE_INTENSITY, SHAKE_DURATION, true, Phaser.Camera.SHAKE_BOTH, false);

    this.tweenable.stop();
    const t = target;
    t.health -= 20;
    if (t.health <= 0) {
      t.kill();
      // This is needed otherwise background can be rendered out of place
      // http://www.html5gamedevs.com/topic/3359-camera-not-positioned-correctly-after-changing-start-away-from-scrolling/
      this.game.world.setBounds(0, 0, this.game.width, this.game.height);
      this.game.state.restart();
    } else {
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
}
