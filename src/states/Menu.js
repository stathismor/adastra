import Phaser from 'phaser';

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#EDEEC9';
  }

  preload() {
    const text = this.add.text(this.world.centerX,
                               this.world.centerY,
                               'START',
                               { font: '48px Arial', fill: '#222523', align: 'center' });
    text.inputEnabled = true;
    text.anchor.setTo(0.5, 0.5);
    text.events.onInputDown.add((item) => this.state.start('Game'), this);
    text.events.onInputOver.add((item) => { item.fill = "#ed3333"; }, this);
    text.events.onInputOut.add((item) => { item.fill = "#222523"; }, this);
  }
}
