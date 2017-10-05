import Phaser from 'phaser';

const DESELECT_COLOUR = '#ffffff';
const SELECT_COLOUR = '#ed3333';
const POINTS_COLOUR = '#ede74b';

export default class extends Phaser.State {
  init(points) {
    this.points = points;
    this.stage.backgroundColor = '#222523';
  }

  preload() {
    const gameOverText = this.add.text(this.world.centerX,
                                       this.world.centerY / 2,
                                       'GAME OVER',
                                       { font: 'Press Start 2P', fill: DESELECT_COLOUR, align: 'center', fontSize: 60, fill: SELECT_COLOUR });

    const pointsText = this.add.text(this.world.centerX,
                                     this.world.centerY,
                                     `POINTS:${this.points}`,
                                     { font: 'Press Start 2P', fill: DESELECT_COLOUR, align: 'center', fontSize: 30, fill: POINTS_COLOUR });

    const playAgainText = this.add.text(this.world.centerX,
                                        this.world.centerY * 1.5,
                                        'TRY AGAIN!',
                                        { font: 'Press Start 2P', fill: DESELECT_COLOUR, align: 'center', fontSize: 40 });


    playAgainText.inputEnabled = true;

    gameOverText.anchor.setTo(0.5, 0.5);
    pointsText.anchor.setTo(0.5, 0.5);
    playAgainText.anchor.setTo(0.5, 0.5);

    playAgainText.events.onInputDown.add(() => {
      this.state.start('Game');
      this.game.input.keyboard.onPressCallback = null;
    }, this);
    playAgainText.events.onInputOver.add((item) => {
      const i = item;
      i.fill = SELECT_COLOUR;
    }, this);
    playAgainText.events.onInputOut.add((item) => {
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
