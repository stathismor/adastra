import Phaser from 'phaser';

import Behaviour from './Behaviour';

export default class extends Behaviour {

  constructor(game, owner, target) {
    super(game, owner);
    this.target = target;

    this.intersectionResult = new Phaser.Point(0.0);
    this.marker = new Phaser.Sprite(this.game, 0, 0, 'marker');
    this.marker.anchor.setTo(0.5);
    this.marker.visible = false;
    this.game.add.existing(this.marker);

    owner.events.onKilled.addOnce(() => { console.log(this.marker.visible); this.marker.visible = false; }, this);
  }

  update() {
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

    // TODO: This visible check seems a bit hacky. The bug was that if an enemy is killed off the
    // screen, the marker still remains.
    console.log('here?');
    if (intersects && this.owner.visible) {
      console.log('here???');
      this.marker.x = this.intersectionResult.x;
      this.marker.y = this.intersectionResult.y;
      this.marker.visible = true;
    } else {
      this.marker.visible = false;
    }
  }
}
