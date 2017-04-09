export default class {

  constructor(game, owner) {
    this.game = game;
    this.owner = owner;
    this.persists = false; // Will not be updated after sprite has died
  }

  update() {}
}
