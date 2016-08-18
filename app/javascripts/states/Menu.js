class Menu extends Phaser.State {
  create() {
    this.createBackgroundAndGround();
    this.createTitle();
    this.createStartButton();
  }

  createBackgroundAndGround() {
    // Add sprite called "background" from what we preload
    // game.add automatically add it to World's children 
    // from point 0,0 (upper-left corner) of the screen
    // save it in this.background as a reference
    this.background = this.game.add.sprite(0, 0, "background");

    // Add tileSprite called "ground" from what we preload
    // game.add automatically add it to World's children
    // save it in this.ground as a reference
    // x = 0, y = 400, width = 335, height = 112
    this.ground = this.game.add.tileSprite(0, 400, 335, 112, "ground");
    // scroll in negative direction x axis, 200 speed
    this.ground.autoScroll(-200, 0);
  }

  createTitle() {
    // Create a group to put the title assets
    // so they can be manipulated as a whole
    // game.add automatically add it to World's children
    this.titleGroup = this.game.add.group();

    // Create title sprite
    // add it to the group 
    // otherwis game.add will automatically
    // add it as the World's children
    // also save it in this.title as reference
    this.title = this.add.sprite(0, 0, "title");
    this.titleGroup.add(this.title);

    // Create bird sprite
    // add it to the group
    // otherwise game.add will automatically
    // add it as the World's children
    // also save it in this.bird as reference
    this.bird = this.add.sprite(200, 5, "bird");
    this.titleGroup.add(this.bird);
    // Add an animation to the bird
    // without specifying, it will use
    // all the available frames on the asset
    this.bird.animations.add("flap");
    // and begin the animation
    // 12 framerate, loop true
    this.bird.animations.play("flap", 12, true);

    // Set the originating location of the group
    // center up the screen
    this.titleGroup.x = 30;
    this.titleGroup.y = 100;

// up
//     this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

//     // add our start button with a callback
//     this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
//     this.startButton.anchor.setTo(0.5,0.5);



    


  }

  createStartButton() {
    // Add a start button with a callback
    // using our preloaded "startButton" asset
    // save it in this.startButton as reference
    // game.add automatically adds it to World's children
    this.startButton = this.game.add.button(this.game.width / 2, 300, "startButton", this.goToPlay, this);
    // the anchor property is a PIXI property
    // this sets the anchor of this button
    // right at the center of itself
    this.startButton.anchor.setTo(0.5, 0.5);
  }

  goToPlay() {
    this.game.state.start("Play");
  }
}

export default Menu;
