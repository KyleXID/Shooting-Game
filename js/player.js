const heroOriginImgWidth = 560;
const heroOriginImgHeight = 600;
let bulletnum = 10;

class Player {
  constructor() {
    //용사의 x, y 좌표
    this.drawX = 400;
    this.drawY = 300;

    this.width = 50;
    this.height = 60;

    //용사이미지의 가운데 점의 좌표(x,y) - 총알 나가는 위치로 사용됨
    //tutorial/heroXY.png 참고
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);

    //한 번의 frame에 몇 픽셀씩 이동할지 speed를 할당합니다.
    this.speed = 2;

    //현재 용사가 무슨 방향으로 이동하고 있는지 할당합니다.
    this.direction = '남';

    this.isUpKey = false;
    this.isRightKey = false;
    this.isDownKey = false;
    this.isLeftKey = false;
    this.isSpacebar = false;
    this.isShooting = false;

    // [1-1] Bullet 추가
    
    this.bullets = [];
    for(let i = 0; i < bulletnum; i++) {
      this.bullets[i] = new Bullet();
    }


    // 현재 총알
    this.currentBullet = 0;
  }

  update() {
    this.checkDirection();

    // 새로 추가된 함수입니다!
    this.checkShooting();
    this.updateAllBullets();
  }

  draw() {
    //drawX, drawY 값은 매 frame마다 바뀌는 property 입니다.
    //매 frame마다 새로운 drawX, drawY값으로 hero를 그려줍니다.
    ctxEntities.drawImage(heroImg, 0, 0, heroOriginImgWidth, heroOriginImgHeight, this.drawX, this.drawY, this.width, this.height);
  }

  /**
   * 현재 방향을 확인해서 위치를 이동
   */
  checkDirection() {
    

    let newX = this.drawX;
    let newY = this.drawY;
    //[1-3] 구현
    if(this.isLeftKey === true && this.isUpKey === true) {
      this.direction = '북서';
      heroImg.src = heroImg1.src;
      newX = this.drawX - this.speed/Math.sqrt(2);
      newY = this.drawY - this.speed/Math.sqrt(2);
    } else if(this.isLeftKey === true && this.isDownKey === true) {
      this.direction = '남서';
      heroImg.src = heroImg1.src;
      newX = this.drawX - this.speed/Math.sqrt(2);
      newY = this.drawY + this.speed/Math.sqrt(2);
    } else if(this.isRightKey === true && this.isDownKey === true) {
      this.direction = '남동';
      heroImg.src = "images/hero.png";
      newX = this.drawX + this.speed/Math.sqrt(2);
      newY = this.drawY + this.speed/Math.sqrt(2);
    } else if(this.isRightKey === true && this.isUpKey === true) {
      this.direction = '동북';
      heroImg.src = "images/hero.png";
      newX = this.drawX + this.speed/Math.sqrt(2);
      newY = this.drawY - this.speed/Math.sqrt(2);
    } else if (this.isUpKey) {
      this.direction = '북';
      newY = this.drawY - this.speed;
    } else if (this.isRightKey === true) {
      this.direction = '동';
      heroImg.src = "images/hero.png";
      newX = this.drawX + this.speed;
    } else if(this.isDownKey === true) {
      this.direction = '남';
      newY = this.drawY + this.speed;
    } else if(this.isLeftKey === true) {
      this.direction = '서';
      heroImg.src = heroImg1.src;
      newX = this.drawX - this.speed;
    }

    //[1-5] 구현
    outOfBounds(this, newX, newY);
  }

  //매 frame마다 실행
  checkShooting() {
    if (this.isSpacebar && !this.isShooting) {
      this.isShooting = true;
      
      
      //용사이미지의 가운데 점의 좌표(x,y) - 총알 나가는 위치로 사용됨
    //tutorial/heroXY.png 참고
    this.centerX = this.drawX + (this.width / 2);
    this.centerY = this.drawY + (this.height / 2);

      this.bullets[this.currentBullet].fire(this.centerX, this.centerY);
      // [1-2] 구현해주세요.
      
      this.currentBullet++;
      
      if (this.currentBullet >= bulletnum) {
        this.currentBullet = 0;
      }

    } else if (!this.isSpacebar) {
      this.isShooting = false;
    }
  }

  updateAllBullets() {

    for(let i=0; i<bulletnum; i++) {
      if(this.bullets[i].isFlying) {
        this.bullets[i].update();
        this.bullets[i].draw();
      }
    }

    // [1-3] 구현해주세요.

  }
}