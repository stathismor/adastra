import Phaser from 'phaser';

import Behaviour from './Behaviour';

const SIDEWAYS_FRICTION = 0.987;
const IMMOBILISE_LERP = 0.007;
const STOP_OFFSET = 1.5;
const MAX_THRUST_DELAY = 1550;
const MAX_THRUST_RATE = 0.95;

export default class extends Behaviour {

  constructor(game, owner) {
    super(game, owner);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.initKeyboard();
    this.thrustDownAt = 0;
  }

  initKeyboard() {
    this.key_left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.key_right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.key_thrust = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.key_reverse = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  }

  update() {
    // Move
    if (this.key_left.isDown) {
      this.owner.body.angularVelocity = -this.owner.movement.rotationSpeed;
    } else if (this.key_right.isDown) {
      this.owner.body.angularVelocity = this.owner.movement.rotationSpeed;
    } else {
      this.owner.body.angularVelocity = 0;
    }

    if (this.key_thrust.isDown) {
      if (this.thrustDownAt === 0) {
        this.thrustDownAt = this.game.time.now;
      }

      const magnitude = this.owner.body.velocity.getMagnitude();
      this.game.physics.arcade.accelerationFromRotation(this.owner.rotation,
                                                        this.owner.movement.acceleration,
                                                        this.owner.body.acceleration);
      this.owner.body.velocity.setMagnitude(Math.min(this.owner.movement.maxVelocity,
                                                     magnitude));

      if (((magnitude / this.owner.movement.maxVelocity) >
           MAX_THRUST_RATE) ||
          ((this.game.time.now - this.thrustDownAt) > MAX_THRUST_DELAY)) {
        this.owner.frame = 2;
      } else {
        this.owner.frame = 1;
      }
    } else if (this.key_reverse.isDown) {
      this.owner.frame = 3;
      this.game.physics.arcade.accelerationFromRotation(this.owner.rotation,
                                                        -this.owner.movement.acceleration,
                                                        this.owner.body.acceleration);
      this.owner.body.velocity.setMagnitude(Math.min(this.owner.movement.maxVelocity,
                                                     this.owner.body.velocity.getMagnitude()));
    } else {
      this.thrustDownAt = 0;
      this.owner.frame = 0;
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

  applySidewayFriction() {
    // Got this idea from https://gamedev.stackexchange.com/questions/23093/creating-sideways-friction-in-a-2d-top-down-racer
    const x = Math.cos(this.owner.rotation);
    const y = Math.sin(this.owner.rotation);

    const forwardVelocity = new Phaser.Point(x, y);
    const rightVelocity = new Phaser.Point(-y, x); // Perpendicular vector, clockwise

    const dotForward = new Phaser.Point(this.owner.body.velocity.x,
                                        this.owner.body.velocity.y).dot(forwardVelocity);
    const dotRight = new Phaser.Point(this.owner.body.velocity.x,
                                      this.owner.body.velocity.y).dot(rightVelocity);

    forwardVelocity.multiply(dotForward, dotForward);
    rightVelocity.multiply(dotRight, dotRight);
    rightVelocity.multiply(SIDEWAYS_FRICTION, SIDEWAYS_FRICTION);

    forwardVelocity.add(rightVelocity.x, rightVelocity.y);
    this.owner.body.velocity = forwardVelocity;
  }
}
