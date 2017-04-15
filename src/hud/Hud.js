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
                                `Health: ${player.health}`,
      {
        font: '20px Arial',
        fill: '#00ff00',
        align: 'left',
      });
    this.health.fixedToCamera = true;
    this.previousHealth = player.health;

    // Add Points
    this.points = game.add.text(game.camera.view.width - 360,
                                20,
                                `Points: ${player.points}`,
      {
        font: '20px Arial',
        fill: '#00ff00',
        align: 'left',
      });
    this.points.fixedToCamera = true;
    this.previousPoints = player.points;
  }

  update() {
    if (this.player.health !== this.previousHealth) {
      this.health.setText(`health: ${this.player.health}`);
      this.previousHealth = this.player.health;
    }

    if (this.player.points !== this.previousPoints) {
      this.points.setText(`Points: ${this.player.points}`);
      this.previousPoints = this.player.points;
    }
  }
}
