const enemyOriginImgWidth = 654;
const enemyOriginImgHeight = 534;

class Enemy {
  constructor() {

    this.width = 65;
    this.height = 53;

    //적의 x, y 좌표
    //최초에 있을 곳 랜덤하게
    this.drawX = randomRange(0, canvasWidth - this.width);
    this.drawY = randomRange(0, canvasHeight - this.height);



    //적의 중심점. player와 같은 방식의 계산
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);

    //제일 첨에 이동할지 목표지점 잡음
    this.targetX = this.centerX;
    this.targetY = this.centerY;

    //[3-1] 얼마나 자주 이동할 것인지
    this.randomMoveTime = randomRange(4000, 10000);

    //[3-2] frame마다 1초씩 움직임
    this.speed = 1;

    //[3-3] 해당 적이 죽었는지 살았는지.
    this.isDead = false;

    this.setTargetLocation();

    //[1-1] 랜덤하게 정한 randomMoveTime 시간마다 setTargetLocation 실행됨
    //randomMoveTime에 정해진 초마다 목표좌표(target X,Y)가 수정된다.
    this.moveInterval = setInterval(() => {
        this.setTargetLocation();
      },
      this.randomMoveTime
    );
  }

  update() {
    this.checkDirection();
  };

  draw() {
    //drawX, drawY 값은 매 frame마다 바뀌는 property 입니다.
    //매 frame마다 새로운 drawX, drawY값으로 적을 그려줍니다.
    if (this.isDead) {
      ctxEntities.drawImage(dieImg, 0, 100, 858, 605, this.drawX, this.drawY, 85, 60);
    } else {
      ctxEntities.drawImage(enemyImg, 0, 0, enemyOriginImgWidth, enemyOriginImgHeight, this.drawX, this.drawY, this.width, this.height);
    }
  };

  //어디로 이동할지 좌표 정함
  //정해진 때마다 한 번 호출
  setTargetLocation() {

    this.targetX = (this.drawX + randomRange(-100, 100));
    this.targetY = (this.drawY + randomRange(-100, 100));
    // [1-2] 구현해주세요.
  };

  //매 frame 계속 호출. target X,Y로 갈 때까지 움직인다.
  checkDirection() {
    if (this.isDead) return;

    let newX = this.drawX;
    let newY = this.drawY;

    if(this.drawX > this.targetX) {
      newX = this.drawX - this.speed;
    } else if(this.drawX < this.targetX) {
      newX = this.drawX + this.speed;
    } else {
      newX = this.drawX;
    }

    if(this.drawY > this.targetY) {
      newY = this.drawY - this.speed;
    } else if(this.drawY < this.targetY) {
      newY = this.drawY + this.speed;
    } else {
      newY = this.drawY;
    }

    // if (newX > canvasWidth-this.width || newX < 0) {
    //   this.targetX = 0;
    // } else {
    //   this.drawX = newX;
    // }

    // if (newY > canvasHeight-this.height || newY < 0) {
    //   this.targetY = 0;
    // } else {
    //   this.drawY = newY;
    // }
    outOfBounds(this, newX, newY);

    // [1-3] 구현해주세요.

  };

  die() {
    const soundEffect = new Audio('audio/dying.wav');
    soundEffect.play();

    // [2-1] 구현
    
    this.isDead = true;
    clearInterval(this.moveInterval);
  };
}