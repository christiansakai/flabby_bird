/**
 * Class representing Menu state.
 * This is the game menu.
 * @extends Phaser.State
 */
class Menu extends Phaser.State {

  /**
   * Create objects for this state.
   * Automatically called by the Game.
   */
  create() {
    this.createBackground();
    this.createGround();
    this.createTitle();
    this.createStartButton();
  }

  /**
   * Create background sprite by adding a sprite 
   * from the asset "background", anchored at 
   * upper left corner of the screen (0, 0).
   * Automatically add to World's children.
   * Save the reference at `this.background`
   */
  createBackground() {
    // `this.game.add` automatically adds the created object
    // to the World's children
    this.background = this.game.add.sprite(0, 0, "background");
  }

  /**
   * Create ground sprite by adding a sprite 
   * from the asset "ground" anchored near 
   * bottom of the screen and scroll it to -x axis.
   */
  createGround() {
    // `this.game.add` automatically adds the created object
    // to the World's children
    // x = 0, y = 400, width = 335, height = 112
    this.ground = this.game.add.tileSprite(0, 
                                           400, 
                                           335, 
                                           112, 
                                           "ground");
    this.ground.autoScroll(-200, 0);
  }

  /**
   * Create title by adding a group to put
   * the title assets so they can be manipulated
   * as a whole.
   */
  createTitle() {
    // `this.game.add` automatically adds the created object
    // to the World's children
    this.titleGroup = this.game.add.group();

    // Create the title sprite and
    // add it to the group, otherwise
    // `this.game.add will automatically
    // add it as the World's children
    const title = this.add.sprite(0, 0, "title");
    this.titleGroup.add(title);

    // Create the bird sprite and
    // add it to the group
    // otherwise `this.game.add` will automatically
    // add it as the World's children
    const bird = this.add.sprite(200, 5, "bird");

    // Add animation to the bird sprite.
    // Without specifying the frame, it will
    // use all the available frames on the asset.
    bird.animations.add("flap");
    // Begin the animation with
    // 12 FPS framerate, and loop = true
    bird.animations.play("flap", 12, true);

    this.titleGroup.add(bird);

    // Set the originating location 
    // of the group center up the screen
    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

    // Create an oscilating animation 
    // tween for the group.
    // Tween is different than animation.
    // Animation is obtained from the frames of the sprites,
    // while Tween is animation created by manipulating
    // Phaser object.
    // Unlike other objects, `this.game.add` does not add
    // Group objects automatically to the World's children.
    const titleTween = this.game.add.tween(this.titleGroup);
    titleTween.to({ y: 115 }, 
                  350, 
                  Phaser.Easing.Linear.NONE, 
                  true, 
                  0, 
                  -1, 
                  true);
  }

  /**
   * Create a button to start the Game from
   * the static asset "startButton".
   * This button will call `this.goToPlay` method
   * of this state.
   */
  createStartButton() {
    // `this.game.add` automatically adds it to World's children
    this.startButton = this.game.add.button(this.game.width / 2, 
                                            300, 
                                            "startButton", 
                                            this.goToPlay, 
                                            this);
    // Anchor is a PIXI API.
    // This sets the anchor of this button
    // right at the center of itself.
    this.startButton.anchor.setTo(0.5, 0.5);
  }

  /**
   * Go to Play state.
   */
  goToPlay() {
    this.game.state.start("Play");
  }

  /**
   * This method is called automatically
   * by the game before the Game transitions 
   * to another state (including restarting 
   * to its current state).
   * Destroys all created assets here.
   */
  shutdown() {
    this.background.destroy();
    this.ground.destroy();
    this.titleGroup.destroy();
    this.startButton.destroy();
  }

}

export default Menu;
