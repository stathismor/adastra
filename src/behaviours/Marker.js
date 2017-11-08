import Phaser from 'phaser';

import Behaviour from './Behaviour';

export default class extends Behaviour {

  constructor(game, owner, target, texture) {
    super(game, owner);
    this.target = target;

    this.intersectionResult = new Phaser.Point(0.0);
    this.marker = new Phaser.Sprite(this.game, 0, 0, texture);
    this.marker.anchor.setTo(0.5);
    this.marker.visible = false;
    this.game.add.existing(this.marker);

    this.owner.events.onKilled.add(() => {
      this.marker.visible = false;
    });
  }

  update() {
    // Camera bounds as lines. @TODO: This should probably be done once, per frame, not here
    const cameraLines = this.game.camera.view.sides();
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
