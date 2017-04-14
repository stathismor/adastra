export default class {

  constructor(game, player) {
    this.player = player;

    // Add some fixed instructions about how to play the game
    const instructions = game.add.text(10,
                                       game.camera.view.height - 60,
                                      'Arrow keys to move\nZ key to shoot',
      {
        font: '16px Arial',
        fill: '#e5d7db',
        align: 'left',
      });
    instructions.fixedToCamera = true;
    instructions.alpha = 0.5;

    // Add health
    this.health = game.add.text(game.camera.view.width - 120,
                                20,
                                `health: ${player.health}`,
      {
        font: '20px Arial',
        fill: '#00ff00',
        align: 'left',
      });
    this.health.fixedToCamera = true;
    this.previousHealth = player.health;
  }

  update() {
    if (this.player.health !== this.previousHealth) {
      this.health.setText(`health: ${this.player.health}`);
      this.previousHealth = this.player.health;
    }
  }
}
