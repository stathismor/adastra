import Phaser from 'phaser';

const WORLD_LENGTH_RATIO_WIDTH = 1.7;
const WORLD_LENGTH_RATIO_HEIGHT = 1.35;
const CAMERA_LERP = 0.05;
const CAMERA_DISTANCE_RATE = 100;
const CAMERA_DISTANCE_FIXED = 50;
const CAMERA_TO_PLAYER_VELOCITY_RATE = 0.007;
const FACE_TO_VELOCITY_RATIO = 0.05;
const BG_DENOMINATOR = 0.5;

export default class {

  constructor(game, player, backgrounds) {
  /**
   * Constructor.
   * @param {Game} game - The game.
   * @param {Sprite} player - The target sprite of the camera.
   * @param {Sprite[]} backgrounds - The backgrounds of the level, from front to back.
   */
    this.game = game;
    this.player = player;
    this.backgrounds = backgrounds;
    this.cameraPos = new Phaser.Point(player.body.x, player.body.y);
    this.oldPos = new Phaser.Point(this.cameraPos.x, this.cameraPos.y);
    this.velocity = new Phaser.Point(this.cameraPos.x, this.cameraPos.y);

    // Init camera. Extra bounds are needed for follow interpolation to work.
    this.initWidth = game.world.width;
    this.initHeight = game.world.height;
    this.aspectRatio = this.initWidth / this.initHeight;
    this.game.world.setBounds(this.player.body.x - (this.initWidth / 2),
                              this.player.body.y - (this.initHeight / 2),
                              this.initWidth * WORLD_LENGTH_RATIO_WIDTH,
                              this.initHeight * WORLD_LENGTH_RATIO_HEIGHT);
    backgrounds.forEach((background) => {
      const bg = background;
      bg.fixedToCamera = true;
    });
  }

  update() {
    this.oldPos.set(this.cameraPos.x, this.cameraPos.y);

    this.setBounds();
    // Camera is facing the direction of the player. Move it by a fixed distance, increase
    // the distance when speeding (so as to leave more view space in front). Finally,
    // interpolate to the new position.
    let distanceX = CAMERA_DISTANCE_FIXED +
                    (CAMERA_DISTANCE_RATE * (Math.abs(this.player.body.velocity.x *
                                                      CAMERA_TO_PLAYER_VELOCITY_RATE)));
    let distanceY = CAMERA_DISTANCE_FIXED +
                    (CAMERA_DISTANCE_RATE * (Math.abs(this.player.body.velocity.y *
                                                      CAMERA_TO_PLAYER_VELOCITY_RATE)));

    // Decrease distance proportionally when ship is facing opposite direction from velocity
    const faceToVelocity = this.getFaceToVelocity();
    distanceX = (FACE_TO_VELOCITY_RATIO * distanceX) +
      ((1 - FACE_TO_VELOCITY_RATIO) * faceToVelocity * distanceX);
    distanceY = (FACE_TO_VELOCITY_RATIO * distanceY) +
      ((1 - FACE_TO_VELOCITY_RATIO) * faceToVelocity * distanceY);

    const targetX = this.player.body.x + (Math.cos(this.player.rotation) * distanceX);
    const targetY = this.player.body.y + (Math.sin(this.player.rotation) * distanceY);

    this.cameraPos.set(this.game.math.linear(this.cameraPos.x, targetX, CAMERA_LERP),
                       this.game.math.linear(this.cameraPos.y, targetY, CAMERA_LERP));
    this.game.camera.focusOnXY(this.cameraPos.x, this.cameraPos.y);

    // Update velocity
    this.velocity.set(this.cameraPos.x - this.oldPos.x, this.cameraPos.y - this.oldPos.y);
  }

  // Set camera bounds on viewport bounds and update background's position (infinite scrolling).
  setBounds() {
    this.game.world.bounds.centerOn(this.player.body.x, this.player.body.y);
    this.game.camera.setBoundsToWorld();

    // We loop in opposite order, to process the last on (in front) first
    let denominator = 1.0;
    for (let i = this.backgrounds.length - 1; i >= 0; i -= 1) {
      const bg = this.backgrounds[i];
      bg.tilePosition.x = -this.game.camera.x * denominator;
      bg.tilePosition.y = -this.game.camera.y * denominator;
      denominator *= BG_DENOMINATOR;
    }
  }

  getFaceToVelocity() {
    const face = new Phaser.Point(Math.cos(this.player.rotation),
                                  Math.sin(this.player.rotation));
    const normVelocity = new Phaser.Point(this.player.body.velocity.x,
                                          this.player.body.velocity.y).normalize();
    let faceToVelocity = normVelocity.dot(face);
    faceToVelocity = ((faceToVelocity - (-1)) / (1 - (-1))); // Normalise (-1,1) to (0,1)
    return faceToVelocity;
  }

}
