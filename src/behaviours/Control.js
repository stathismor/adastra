import Phaser from 'phaser';

import Behaviour from './Behaviour';

const SIDEWAYS_FRICTION = 0.987;
const IMMOBILISE_LERP = 0.007;
const STOP_OFFSET = 1.5;
const ROTATION_THRUST_FRICTION = 0.45;

export default class extends Behaviour {

  constructor(game, owner) {
    super(game, owner);

    this.turnLeftAnimation = owner.animations.add('turn', [0, 2], 10.0, false);
    this.turnRightAnimation = owner.animations.add('turn', [0, 1], 10.0, false);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.initKeyboard(this.game, this.turnLeftAnimation, this.turnRightAnimation);

    this.thrust = new Phaser.Sprite(game, 0, 0, 'thrust');
    this.thrust.x = -owner.offsetX - this.thrust.width;
    this.thrust.y = -owner.offsetY;
    this.thrustAnim = this.thrust.animations.add('thrusting', null, 10, true);
    this.thrustAnim.play();
    owner.addChild(this.thrust);
  }

  initKeyboard(game, turnLeftAnimation, turnRightAnimation) {
    this.key_left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.key_right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.key_thrust = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.key_reverse = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    this.key_left.onDown.add(this.animate, {animation: turnLeftAnimation});
    this.key_right.onDown.add(this.animate, {animation: turnRightAnimation});
    this.key_left.onUp.add(this.resetAnimation, {animation: turnLeftAnimation});
    this.key_right.onUp.add(this.resetAnimation, {animation: turnRightAnimation});
  }

  animate() {
    if (this.animation.isReversed) {
      this.animation.reverse();
    }
    this.animation.play();
  }

  resetAnimation() {
      this.animation.reverse();
      this.animation.play();
  }

  update() {
    // Move
    if (this.key_left.isDown || this.key_right.isDown) {
      let rotationSpeed = this.owner.movement.rotationSpeed;
      if (this.key_thrust.isDown || this.key_reverse.isDown) {
        rotationSpeed *= ROTATION_THRUST_FRICTION;
      }
      if (this.key_left.isDown) {
        this.owner.body.angularVelocity = -rotationSpeed;
      } else {
        this.owner.body.angularVelocity = rotationSpeed;
      }
    } else {
      this.owner.body.angularVelocity = 0;
    }

    if (this.key_thrust.isDown) {
      const magnitude = this.owner.body.velocity.getMagnitude();
      this.game.physics.arcade.accelerationFromRotation(this.owner.rotation,
                                                        this.owner.movement.acceleration,
                                                        this.owner.body.acceleration);
      this.owner.body.velocity.setMagnitude(Math.min(this.owner.movement.maxVelocity,
                                                     magnitude));

      this.thrust.visible = true;
    } else if (this.key_reverse.isDown) {
      this.game.physics.arcade.accelerationFromRotation(this.owner.rotation,
                                                        -this.owner.movement.acceleration,
                                                        this.owner.body.acceleration);
      this.owner.body.velocity.setMagnitude(Math.min(this.owner.movement.maxVelocity,
                                                     this.owner.body.velocity.getMagnitude()));
    } else {
      this.thrust.visible = false;
      this.owner.body.acceleration.set(0);

      // Immobilise
      if (Math.abs(this.owner.body.velocity.x) < STOP_OFFSET &&
          Math.abs(this.owner.body.velocity.y) < STOP_OFFSET) {
        this.owner.body.velocity.set(0, 0);
      } else if (this.owner.body.velocity.x !== 0 || this.owner.body.velocity.y !== 0) {
        this.owner.body.velocity.set(this.game.math.linear(this.owner.body.velocity.x,
                                                           0, IMMOBILISE_LERP),
                                     this.game.math.linear(this.owner.body.velocity.y,
                                                           0, IMMOBILISE_LERP));
      }
    }
  }
}
