import Phaser from 'phaser';

import Follow from './Follow';

export default class extends Follow {

  constructor(game, owner, target) {
    super(game, owner, target);
    this.intersectionResult = new Phaser.Point(0.0);
    this.marker = new Phaser.Sprite(this.game,
                                    0,
                                    0,
                                    'marker');
    this.marker.anchor.setTo(0.5);
    this.marker.visible = false;
    this.game.add.existing(this.marker);
  }

  update() {
    super.update();
    this.game.physics.arcade.accelerateToObject(this.owner,
                                                this.target,
                                                this.owner.movement.acceleration,
                                                this.owner.movement.maxVelocity,
                                                this.owner.movement.maxVelocity);
    this.setMarker();
  }

  // @TODO: This could be extracted to its own Sprite class, and maybe behaviour
  setMarker(){
    // Camera bounds as lines. @TODO: This should probably be done once, per game frame, not here
    const cameraLines = [
      new Phaser.Line(this.game.camera.view.x, this.game.camera.view.y, this.game.camera.view.x + this.game.camera.view.width,
                      this.game.camera.view.y),
      new Phaser.Line(this.game.camera.view.x, this.game.camera.view.y, this.game.camera.view.x,
                      this.game.camera.view.y + this.game.camera.view.height),
      new Phaser.Line(this.game.camera.view.x + this.game.camera.view.width, this.game.camera.view.y,
        this.game.camera.view.x + this.game.camera.view.width, this.game.camera.view.y + this.game.camera.view.height),
      new Phaser.Line(this.game.camera.view.x, this.game.camera.view.y + this.game.camera.view.height,
        this.game.camera.view.x + this.game.camera.view.width, this.game.camera.view.y + this.game.camera.view.height),
    ];

    const enemyTargetRay = new Phaser.Line(this.owner.x, this.owner.y, this.target.x, this.target.y);

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
