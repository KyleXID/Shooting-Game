class Bullet {
  constructor() {
    this.radius = 4;
    this.drawX = 0;
    this.drawY = 0;
    this.isFlying = false;

    this.width = this.radius;
    this.height = this.radius;

    //속도
    this.xVel = 0;
    this.yVel = 0;
    this.speed = 6;
  }

  /**
   * 매 프레임마다 실행되는 함수, 총알을 (this.drawX, this.drawY) 위치에 그려준다.
   */
  draw() {

    // 캔버스 위에 하얀 원의 총알을 그리는 작업입니다.
    // canvas 영역이니 다음에 함께 다루도록 하겠습니다.

    ctxEntities.fillStyle = 'white';
    ctxEntities.beginPath();
    ctxEntities.arc(this.drawX, this.drawY, this.radius, 0, Math.PI * 2, false);
    ctxEntities.closePath();
    ctxEntities.fill();
  };

  /**
   * (this.drawX, this.drawY) 갱신하는 함수
   */
  update() {

    this.drawX += this.xVel;
    this.drawY += this.yVel;

    if(this.drawX > 800 || this.drawY > 600) {
      this.isFlying = false;
    }
    // [1-4] 구현해주세요.


    this.checkHitEnemy();
  };


  /**
   *  Player 클래스에서 스페이스 눌렀을 때 호출함.
   *  (startX, startY) 위치에서 총알이 시작된다.
   *  player1의 direction에 따라 this.xVel, this.yVel 이 갱신된다.
   */
  fire(startX, startY) {
    const soundEffect = new Audio('audio/shooting.wav');
    soundEffect.play();
    
    this.drawX = startX;
    this.drawY = startY;
    this.xVel = 0;
    this.yVel = 0;
   
    if(player1.direction ==='북서') { 
      this.isFlying = true;
      this.xVel = -this.speed;
      this.yVel = -this.speed;
    } else if(player1.direction ==='남서') { 
      this.isFlying = true;
      this.xVel = -this.speed;
      this.yVel = +this.speed;
    } else if(player1.direction ==='남동') {
      this.isFlying = true;
      this.xVel = +this.speed;
      this.yVel = +this.speed;
    } else if(player1.direction ==='동북') {
      this.isFlying = true;
      this.xVel = +this.speed;
      this.yVel = -this.speed;
    } else if(player1.direction ==='동') {
      this.isFlying = true;
      this.xVel = +this.speed;
    } else if(player1.direction ==='서') {
      this.isFlying = true;
      this.xVel = -this.speed;
    } else if(player1.direction ==='남') {
      this.isFlying = true;
      this.yVel = +this.speed;
    } else if(player1.direction ==='북') {
      this.isFlying = true;
      this.yVel = -this.speed;
    }
    // [1-5] 구현해주세요.
  };

  /**
   *  isflying인 동안, 매 frame마다 돌아감
   */
  checkHitEnemy() {

    for(let i = 0; i < numEnemies; i++) {
      if (collision(this,enemies[i]) && !enemies[i].isDead) {
        this.isFlying = false;
        enemies[i].die();
      }
    }

    // [2-3] 구현해 주세요.

  };
}