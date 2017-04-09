import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor(game, x, y, asset) {
    super(game, x, y, asset);

    this.behaviours = [];
    this.events.onDestroy.addOnce(this.removeAllBehaviours, this);
  }

  update() {
    // NOTE: Maybe I can optimise this
    this.behaviours.forEach((behaviour) => {
      if (this.alive || behaviour.persists) {
        behaviour.update();
      }
    });
    if (this.alive) {
      super.update();
    }
  }

  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);
  }

  removeAllBehaviours() {
    this.behaviours = [];
  }

  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);
    if (index === -1) {
      return;
    }
    this.behaviours.splice(index, 1);
  }
}
