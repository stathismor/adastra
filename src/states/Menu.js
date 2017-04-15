import Phaser from 'phaser';

const DESELECT_COLOUR = '#ffffff';
const SELECT_COLOUR = '#ed3333';

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#222523';
  }

  preload() {
    const text = this.add.text(this.world.centerX,
                               this.world.centerY,
                               'START',
                               { font: '48px Arial', fill: DESELECT_COLOUR, align: 'center' });
    text.inputEnabled = true;
    text.anchor.setTo(0.5, 0.5);
    text.events.onInputDown.add(() => {
      this.state.start('Game');
      this.game.input.keyboard.onPressCallback = null;
    }, this);
    text.events.onInputOver.add((item) => {
      const i = item;
      i.fill = SELECT_COLOUR;
    }, this);
    text.events.onInputOut.add((item) => {
      const i = item;
      i.fill = DESELECT_COLOUR;
    }, this);

    // When press any key, start the game
    // TODO: Does not really work with all keys on Chrome
    this.game.input.keyboard.onPressCallback = () => {
      this.game.input.keyboard.onPressCallback = null; // Reset this back to null
      this.state.start('Game');
    };
  }
}
