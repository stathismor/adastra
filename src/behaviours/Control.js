import Phaser from 'phaser';

import Behaviour from './Behaviour';

const SIDEWAYS_FRICTION = 0.987;
const IMMOBILISE_LERP = 0.007;
const STOP_OFFSET = 1.5;
const ROTATION_THRUST_FRICTION = 0.45;

export default class extends Behaviour {

  constructor(game, owner) {
    super(game, owner);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.initKeyboard();

    this.turn = owner.animations.add('turn', [0, 1, 2], 7.7, false);

    this.thrust = new Phaser.Sprite(game, 0, 0, 'thrust');
    this.thrust.x = -owner.offsetX - this.thrust.width;
    this.thrust.y = -owner.offsetY;
    this.thrustAnim = this.thrust.animations.add('thrusting', null, 10, true);
    this.thrustAnim.play();
    owner.addChild(this.thrust);
  }

  initKeyboard() {
    this.key_left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.key_right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.key_thrust = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.key_reverse = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);


    this.key_left.onDown.add(this.animate, this);
    this.key_right.onDown.add(this.animate, this);
  }

  animate() {
    if (this.turn.isReversed) {
      this.turn.reverse();
      this.turn.play();
    } else {
      this.turn.play();
    }
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

      if (this.owner.frame !== 0) {
        if (!this.turn.isReversed) {
          this.turn.reverse();
        }

        if (!this.turn.isPlaying) {
          this.turn.play();
        }
      }
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
