import Phaser from 'phaser';

import Follow from './Follow';

const AVOID_DISTANCE = 50;

export default class extends Follow {

  constructor(game, owner, target) {
    super(game, owner, target);
    this.intersectionResult = new Phaser.Point(0.0);
    this.marker = new Phaser.Sprite(this.game, 0, 0, 'marker');
    this.marker.anchor.setTo(0.5);
    this.marker.visible = false;
    this.game.add.existing(this.marker);
  }

  update() {
    super.update();

    const targetAngle = this.getTargetAngle();
    this.owner.body.acceleration.setTo(Math.cos(targetAngle) * this.owner.movement.acceleration,
                                       Math.sin(targetAngle) * this.owner.movement.acceleration);
    this.owner.body.maxVelocity.setTo(this.owner.movement.maxVelocity,
                                      this.owner.movement.maxVelocity);

    this.setMarker();
  }

  getTargetAngle() {
    let targetAngle = this.game.physics.arcade.angleBetween(this.owner, this.target);

    // @TODO: This is taken from here: https://gamemechanicexplorer.com/#homingmissiles-6
    // Does not work perfect perfectly though, sprites can still overlap
    let avoidAngle = 0;
    this.owner.parent.forEachAlive((m) => {
      // Don't calculate anything if the other missile is me
      if (this.owner === m) {
        return;
      }

      // Already found an avoidAngle so skip the rest
      if (avoidAngle !== 0) {
        return;
      }

      // Calculate the distance between me and the other missile
      const distance = this.game.math.distance(this.owner.x, this.owner.y, m.x, m.y);

      // If the missile is too close...
      if (distance < AVOID_DISTANCE) {
        avoidAngle = Phaser.Math.random(Math.PI / 3, Math.PI / 2);
        if (Phaser.Utils.chanceRoll(50)) {
          avoidAngle *= -1; // zag
        }
      }
    }, this);

    targetAngle += avoidAngle;

    return targetAngle;
  }

  // @TODO: This could be extracted to its own Sprite class, and maybe behaviour
  setMarker() {
    // Camera bounds as lines. @TODO: This should probably be done once, per game frame, not here
    const cameraLines = [
      new Phaser.Line(this.game.camera.view.x, this.game.camera.view.y,
                      this.game.camera.view.x + this.game.camera.view.width,
                      this.game.camera.view.y),
      new Phaser.Line(this.game.camera.view.x, this.game.camera.view.y,
                      this.game.camera.view.x,
                      this.game.camera.view.y + this.game.camera.view.height),
      new Phaser.Line(this.game.camera.view.x + this.game.camera.view.width,
                      this.game.camera.view.y,
                      this.game.camera.view.x + this.game.camera.view.width,
                      this.game.camera.view.y + this.game.camera.view.height),
      new Phaser.Line(this.game.camera.view.x,
                      this.game.camera.view.y + this.game.camera.view.height,
                      this.game.camera.view.x + this.game.camera.view.width,
                      this.game.camera.view.y + this.game.camera.view.height),
    ];

    const enemyTargetRay = new Phaser.Line(this.owner.x, this.owner.y,
                                           this.target.x, this.target.y);

    // @TODO: Can use some or every for this, if I want to be cool
    let intersects = false;
    for (let i = 0; i < cameraLines.length; i += 1) {
      if (enemyTargetRay.intersects(cameraLines[i], true, this.intersectionResult)) {
        intersects = true;
        break;
      }
    }

    if (intersects) {
      this.marker.x = this.intersectionResult.x;
      this.marker.y = this.intersectionResult.y;
      this.marker.visible = true;
    } else {
      this.marker.visible = false;
    }
  }
}
