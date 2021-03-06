// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


  @property(cc.Node)
  bg: cc.Node = null;

  @property(cc.Node)
  bird: cc.Node = null;

  @property(cc.Node)
  obstacles: cc.Node = null;

  @property(cc.Label)
  lbScore: cc.Label = null;

  onLoad () {
    console.log(this.lbScore);
  }

  pastTime: number = 0;
  speed: number = 0;
  score: number = 0;
  isPlaying: boolean = false;

  start() {

  }

  play(event) {
    event.currentTarget.active = false;
    this.isPlaying = true;
  }

  gameOver() {
    this.isPlaying = false;
  }

  update (dt) {
    this.pastTime += dt;
    this.changeBirdSprite();
    if (!this.isPlaying) return;
    this.birdGravity();
    this.moveBg();
    this.movePipe();
  }

  collision(pipe: cc.Node) {
    if (this.bird.x + 8.5 < pipe.x - 26) {
      return;
    }
    if (this.bird.x - 8.5 > pipe.x + 26) {
      return;
    }
    // const pipeUp:cc.Node = pipe.getChildByName('pipe_up');
    // const pipeDown:cc.Node = pipe.getChildByName('pipe_down');
    if (this.bird.y + 12 < pipe.y + 60 && this.bird.y - 12 > pipe.y - 60) {
      return;
    }
    console.log('game over!!');
    this.gameOver();
  }

  birdGravity() {
    this.speed -= 0.1;
    this.bird.rotation = -this.speed * 10;
    this.bird.y += this.speed;
  }

  flyUp() {
    this.speed = 2.5;
  }

  moveBg() {
    this.bg.x -= 1;
    if (this.bg.x <= -288) {
      this.bg.x = 0;
    }
  }

  movePipe() {
    const [pipe_0, pipe_1, pipe_2] = this.obstacles.children;
    pipe_0.x -= 2;
    pipe_1.x -= 2;
    pipe_2.x -= 2;
    if (pipe_0.x <= -144 ) {
      pipe_0.x = 340;
      pipe_0.y = Math.floor(Math.random() * 118);
      this.score += 1;
      this.lbScore.string =this.score.toString();
    }
    if (pipe_1.x <= -144 ) {
      pipe_1.x = 340;
      pipe_1.y = Math.floor(Math.random() * 118);
      this.score += 1;
      this.lbScore.string =this.score.toString();
    }
    if (pipe_2.x <= -144 ) {
      pipe_2.x = 340;
      pipe_2.y = Math.floor(Math.random() * 118);
      this.score += 1;
      this.lbScore.string =this.score.toString();
    }

    this.collision(pipe_0);
    this.collision(pipe_1);
    this.collision(pipe_2);
  }

  changeBirdSprite() {
    const tmp = this.pastTime % 0.6;
    const [bird_0, bird_1, bird_2] = this.bird.children;
    if (tmp >= 0 && tmp < 0.2) {
      bird_0.active = true;
      bird_1.active = false;
      bird_2.active = false;
    }
    if (tmp >= 0.2 && tmp < 0.4) {
      bird_0.active = false;
      bird_1.active = true;
      bird_2.active = false;
    }
    if (tmp >= 0.4 && tmp < 0.6) {
      bird_0.active = false;
      bird_1.active = false;
      bird_2.active = true;
    }
  }
}
