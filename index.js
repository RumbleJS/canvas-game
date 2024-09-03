alert(`
- Fixed some bugs
- Added double firing of weapons at large planes.
`)
window.onload = () => {
const canvas = document.getElementById('can')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let leftPlanes = []
let rightPlanes  = []
let score = 0
let bullets = []
let enemies = []
let smallEnemies = setInterval(() => {
  enemies.push(new Enemy())
}, 500)
let double = false
let triple = false
let quadra = false
let penta = false
count = true
let heart = '❤ ❤ ❤'
let startFrames
let over = false
let weaponType = 'single'

let startingPoint = {
  startX: canvas.width / 2, 
  startY: canvas.height - 80
}

let ship = {
  color: 'red',
  move() {
    let {startX, startY} = startingPoint
    if(startX <= 50) startX = 50
    if(startX >= canvas.width - 50) startX = canvas.width - 50
    if(startY >= canvas.height - 50) startY = canvas.height - 50
    if(startY <= canvas.height / 2 + 50) startY = canvas.height / 2 + 50
    ctx.beginPath()
    ctx.moveTo(startX - 40, startY)
    ctx.lineTo(startX - 10, startY)
    ctx.lineTo(startX - 2, startY + 30)
    ctx.lineTo(startX - 15, startY + 35)
    ctx.lineTo(startX + 15, startY + 35)
    ctx.lineTo(startX + 2, startY + 30)
    ctx.lineTo(startX + 10, startY)
    ctx.lineTo(startX + 40, startY)
    ctx.quadraticCurveTo( 
      startX + 45,
      startY + 20,
      startX + 45,
      startY
    )
    ctx.quadraticCurveTo( 
      startX + 45, 
      startY - 5, 
      startX + 40,
      startY - 10
    )
    ctx.lineTo(startX + 8, startY - 30) 
    ctx.arcTo(
      startX, 
      startY - 50,
      startX - 8,
      startY - 30,
      4
    )
    ctx.lineTo(startX - 8, startY - 30)
    ctx.lineTo(startX - 40, startY - 10)
      
    ctx.quadraticCurveTo(
      startX - 45, 
      startY - 5, 
      startX - 45,
      startY
    )
    ctx.quadraticCurveTo(
      startX - 45, 
      startY + 20, 
      startX - 40,
      startY
    )
    ctx.fillStyle = this.color
    ctx.fill()
  }   
}

//NEW PLAINS HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!
class WarPlane {
    constructor() {
      this.xAxisLeftPlain = -20
      this.yAxisLeftPlain = -20
      this.xAxisRightPlain = canvas.width
      this.yAxisRightPlain = -20
      this.accelerateX = 1
      this.accelerateY = 0.3
      this.fireLeft = 0
      this.fireRight = 0
      this.leftBullets = []
      this.rightBullets = []
      this.enemyArea = [3000, 3000, 3000, 3000]
      this.hp = 6
      this.drawLeft = true
      this.drawRight = true
    }
    drawPlaneLeft() {
      if(this.drawLeft === true) {
          ctx.beginPath()

          ctx.moveTo(this.xAxisLeftPlain, this.yAxisLeftPlain)
          ctx.lineTo(this.xAxisLeftPlain - 3, this.yAxisLeftPlain + 8)
          ctx.lineTo(this.xAxisLeftPlain + 5, this.yAxisLeftPlain + 12)
          ctx.lineTo(this.xAxisLeftPlain + 13, this.yAxisLeftPlain + 14)
          ctx.lineTo(this.xAxisLeftPlain + 13, this.yAxisLeftPlain + 25)
          ctx.lineTo(this.xAxisLeftPlain - 10, this.yAxisLeftPlain + 25)
          ctx.lineTo(this.xAxisLeftPlain - 12, this.yAxisLeftPlain + 33)
          ctx.lineTo(this.xAxisLeftPlain + 13, this.yAxisLeftPlain + 45)
          ctx.lineTo(this.xAxisLeftPlain + 18, this.yAxisLeftPlain + 70)
          ctx.lineTo(this.xAxisLeftPlain + 23, this.yAxisLeftPlain + 45)
          ctx.lineTo(this.xAxisLeftPlain + 50, this.yAxisLeftPlain + 33)
          ctx.lineTo(this.xAxisLeftPlain + 48, this.yAxisLeftPlain + 25)
          ctx.lineTo(this.xAxisLeftPlain + 23, this.yAxisLeftPlain + 25)
          ctx.lineTo(this.xAxisLeftPlain + 23, this.yAxisLeftPlain + 14)
          ctx.lineTo(this.xAxisLeftPlain + 31, this.yAxisLeftPlain + 12)
          ctx.lineTo(this.xAxisLeftPlain + 39, this.yAxisLeftPlain + 8)
          ctx.lineTo(this.xAxisLeftPlain + 37, this.yAxisLeftPlain)
          
          ctx.closePath()
          ctx.fillStyle = 'rgb(212, 25, 103)'
          ctx.fill()
          this.enemyArea = [this.xAxisLeftPlain - 12, this.xAxisLeftPlain + 50, this.yAxisLeftPlain + 8, this.yAxisLeftPlain + 70]
      }
    }
    drawPlaneRight() {
      if(this.drawRight === true) {
          ctx.beginPath()
          ctx.moveTo(this.xAxisRightPlain, this.yAxisRightPlain)
          ctx.lineTo(this.xAxisRightPlain - 3, this.yAxisRightPlain + 8)
          ctx.lineTo(this.xAxisRightPlain + 5, this.yAxisRightPlain + 12)
          ctx.lineTo(this.xAxisRightPlain + 13, this.yAxisRightPlain + 14)
          ctx.lineTo(this.xAxisRightPlain + 13, this.yAxisRightPlain + 25)
          ctx.lineTo(this.xAxisRightPlain - 10, this.yAxisRightPlain + 25)
          ctx.lineTo(this.xAxisRightPlain - 12, this.yAxisRightPlain + 33)
          ctx.lineTo(this.xAxisRightPlain + 13, this.yAxisRightPlain + 45)
          ctx.lineTo(this.xAxisRightPlain + 18, this.yAxisRightPlain + 70)
          ctx.lineTo(this.xAxisRightPlain + 23, this.yAxisRightPlain + 45)
          ctx.lineTo(this.xAxisRightPlain + 50, this.yAxisRightPlain + 33)
          ctx.lineTo(this.xAxisRightPlain + 48, this.yAxisRightPlain + 25)
          ctx.lineTo(this.xAxisRightPlain + 23, this.yAxisRightPlain + 25)
          ctx.lineTo(this.xAxisRightPlain + 23, this.yAxisRightPlain + 14)
          ctx.lineTo(this.xAxisRightPlain + 31, this.yAxisRightPlain + 12)
          ctx.lineTo(this.xAxisRightPlain + 39, this.yAxisRightPlain + 8)
          ctx.lineTo(this.xAxisRightPlain + 37, this.yAxisRightPlain)
          
          ctx.closePath()
          ctx.fillStyle = 'rgb(164, 240, 0)'
          ctx.fill()
          this.enemyArea = [this.xAxisRightPlain - 12, this.xAxisRightPlain + 50, this.yAxisRightPlain + 8, this.yAxisRightPlain + 70]
      }
    }
    addL() {
      if(this.drawLeft === true) {
        this.leftBullets.push({x:0, bCenter: []})  //!!!!NEW ADDED BCENTER INTO OBJ LATEST CHANGE
      }
    }
    addR() {
      if(this.drawRight === true) {
        this.rightBullets.push({x:0, bCenter: []})
      }
    }
    shootLeft() {
        this.leftBullets.forEach(i => {
        ctx.beginPath()
        ctx.moveTo(this.xAxisLeftPlain + 15, this.yAxisLeftPlain + 75 + i.x)
        ctx.lineTo(this.xAxisLeftPlain + 15, this.yAxisLeftPlain + 85 + i.x)
        ctx.lineTo(this.xAxisLeftPlain + 21, this.yAxisLeftPlain + 85 + i.x)
        ctx.lineTo(this.xAxisLeftPlain + 21, this.yAxisLeftPlain + 75 + i.x)
        i.bCenter = [this.xAxisLeftPlain + 18, this.yAxisLeftPlain + 80 + i.x] //!!!!NEW ADDED ARRAY INTO OBJ LATEST CHANGE
        ctx.fillStyle = 'rgb(0, 255, 191)'
        ctx.fill()
      })
    }
    shootRight() {
      this.rightBullets.forEach(i => {
      ctx.beginPath()
      ctx.moveTo(this.xAxisRightPlain + 15, this.yAxisRightPlain + 75 + i.x)
      ctx.lineTo(this.xAxisRightPlain + 15, this.yAxisRightPlain + 85 + i.x)
      ctx.lineTo(this.xAxisRightPlain + 21, this.yAxisRightPlain + 85 + i.x)
      ctx.lineTo(this.xAxisRightPlain + 21, this.yAxisRightPlain + 75 + i.x)
      i.bCenter = [this.xAxisRightPlain + 18, this.yAxisRightPlain + 80 + i.x]
      ctx.fillStyle = 'rgb(0, 255, 191)'
      ctx.fill()
      })
    }
    accelerate() {
      this.xAxisLeftPlain += this.accelerateX
      this.yAxisLeftPlain += this.accelerateY
      this.xAxisRightPlain -= this.accelerateX
      this.yAxisRightPlain += this.accelerateY
      this.fireLeft += 2
      this.fireRight += 2
    }
  }

class Enemy {
  constructor() {
    this.horisontal = (canvas.width - 100) * Math.random() + 30
    this.vertical = - 10
    this.acceleration = 2
    this.enemyArea = []
  }
  drawEnemy() {
    ctx.beginPath()
    ctx.moveTo(this.horisontal, this.vertical)
    ctx.rect(this.horisontal, this.vertical, 15, 5)
    ctx.rect(this.horisontal + 5, this.vertical + 5, 5, 10)
    ctx.rect(this.horisontal - 10, this.vertical + 15, 35, 7)
    ctx.rect(this.horisontal - 1, this.vertical + 35, 3, 0)
    ctx.rect(this.horisontal + 22, this.vertical + 35, 3, 0)
    ctx.rect(this.horisontal + 5, this.vertical + 22, 5, 4)
    
    ctx.fillStyle = 'gold'
    ctx.closePath()
    ctx.fill()
    this.enemyArea = [this.horisontal - 10, this.vertical, this.horisontal + 22, this.vertical + 35]
  }
  acc() {
    this.vertical += this.acceleration
  }
}

let gradeToDouble = {
    horisontal: (canvas.width - 60) * Math.random() + 30,
    vertical: - 10,
    doubleWeapon() {
      let ren = new Path2D()
        ren.arc(this.horisontal, this.vertical, 10, 0, Math.PI * 2)
      let te = new Path2D(ren)
        te.moveTo(this.horisontal + 3, this.vertical)
        te.lineTo(this.horisontal + 3, this.vertical - 5)
        te.arcTo(this.horisontal - 5, this.vertical - 10, 
                 this.horisontal - 5, this.vertical - 5, 5)
        te.moveTo(this.horisontal + 3, this.vertical)
        te.lineTo(this.horisontal - 5, this.vertical + 6)
        te.lineTo(this.horisontal + 5, this.vertical + 6)
        ctx.strokeStyle = 'yellow'
        ctx.lineWidth = 2
        ctx.stroke(te)
    },
    blowout() {
        this.vertical += 2
    }
}

let gradeToTriple = {
    horisontal: (canvas.width - 60) * Math.random() + 30,
    vertical: - 10,
    tripleWeapon() {
      let ren = new Path2D()
        ren.arc(this.horisontal, this.vertical, 10, 0, Math.PI * 2)
      let te = new Path2D(ren)
        te.moveTo(this.horisontal - 4, this.vertical - 6)
        te.lineTo(this.horisontal + 4, this.vertical - 6)
        te.lineTo(this.horisontal + 4, this.vertical + 6)
        te.lineTo(this.horisontal - 4, this.vertical + 6)
        te.moveTo(this.horisontal - 4, this.vertical)
        te.lineTo(this.horisontal + 4, this.vertical)
        ctx.strokeStyle = 'lightgreen'
        ctx.lineWidth = 2
        ctx.stroke(te)
    },
    blowout() {
        this.vertical += 4
    }
}

let gradeToQuadra = {
    horisontal: (canvas.width - 60) * Math.random() + 30,
    vertical: - 10,
    quadraWeapon() {
      let ren = new Path2D()
        ren.arc(this.horisontal, this.vertical, 10, 0, Math.PI * 2)
      let te = new Path2D(ren)
        te.moveTo(this.horisontal - 4, this.vertical - 6)
        te.lineTo(this.horisontal - 4, this.vertical)
        te.lineTo(this.horisontal + 4, this.vertical)
        te.lineTo(this.horisontal + 4, this.vertical - 6)
        te.lineTo(this.horisontal + 4, this.vertical + 6)
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 2
        ctx.stroke(te)
    },
    blowout() {
        this.vertical += 6
    }
}

let gradeToPenta = {
    horisontal: (canvas.width - 60) * Math.random() + 30,
    vertical: - 10,
    pentaWeapon() {
      let ren = new Path2D()
        ren.arc(this.horisontal, this.vertical, 10, 0, Math.PI * 2)
      let te = new Path2D(ren)
        te.moveTo(this.horisontal + 4, this.vertical - 6)
        te.lineTo(this.horisontal - 4, this.vertical - 6)
        te.lineTo(this.horisontal - 4, this.vertical)
        te.lineTo(this.horisontal + 5, this.vertical)
        te.lineTo(this.horisontal + 5, this.vertical + 6)
        te.lineTo(this.horisontal - 5, this.vertical + 6)
        ctx.strokeStyle = '#ff66ff'
        ctx.lineWidth = 2
        ctx.stroke(te)
    },
    blowout() {
        this.vertical += 8
    }
}

//   setTimeout(() => {
//       quadra = true
//   }, 180000)

//   setTimeout(() => {
//       penta = true
//   }, 240000)
//THE END OF WEAPON UPGRADING CIRCLES HERE!

class Missile {
    constructor(weapon) {
      this.fireY = 0
      this.fireX = 0
      this.innerFireX = 0
      this.accelerateFireY = 15
      this.accelerateFireX = 2
      this.accelerateInnerFireX = 1
      this.xCoord = startingPoint.startX
      this.yCoord = startingPoint.startY
      this.bulletType = weapon
      this.doubleLeft = true
      this.doubleRight = true
      this.tripleLeft = true
      this.tripleMiddle = true
      this.tripleRight = true
      this.bulletCenterD = []
      this.bulletCenterT = []
    }
    defineShot() {
        if(this.bulletType === 'single') {
              ctx.beginPath()
              ctx.moveTo(this.xCoord - 3, this.yCoord - 50 - this.fireY)
              ctx.lineTo(this.xCoord - 3, this.yCoord - 60 - this.fireY)
              ctx.lineTo(this.xCoord + 3, this.yCoord - 60 - this.fireY)
              ctx.lineTo(this.xCoord + 3, this.yCoord - 50 - this.fireY)
              ctx.lineTo(this.xCoord - 3, this.yCoord - 50 - this.fireY)
              ctx.closePath()
              ctx.fillStyle = ship.color
              ctx.fill()
              this.bulletCenter = [this.xCoord, this.yCoord - 55 - this.fireY]
        }

        if(this.bulletType === 'double') {
          if(this.doubleLeft === true) {
            ctx.beginPath()
            ctx.moveTo(this.xCoord - 30, this.yCoord - 50 - this.fireY)
            ctx.lineTo(this.xCoord - 30, this.yCoord - 60 - this.fireY)
            ctx.lineTo(this.xCoord - 24, this.yCoord - 60 - this.fireY)
            ctx.lineTo(this.xCoord - 24, this.yCoord - 50 - this.fireY)
            ctx.lineTo(this.xCoord - 30, this.yCoord - 50 - this.fireY)
            ctx.closePath()
            ctx.fillStyle = ship.color
            ctx.fill()
            this.bulletCenterD[0] = this.xCoord - 27
            this.bulletCenterD[1] = this.yCoord - 55 - this.fireY
        }
          if(this.doubleRight === true) {
            ctx.beginPath()
            ctx.moveTo(this.xCoord + 30, this.yCoord - 50 - this.fireY)
            ctx.lineTo(this.xCoord + 30, this.yCoord - 60 - this.fireY)
            ctx.lineTo(this.xCoord + 24, this.yCoord - 60 - this.fireY)
            ctx.lineTo(this.xCoord + 24, this.yCoord - 50 - this.fireY)
            ctx.lineTo(this.xCoord + 30, this.yCoord - 50 - this.fireY)
            ctx.closePath()
            ctx.fillStyle = ship.color
            ctx.fill()
            this.bulletCenterD[2] = this.xCoord + 27
            this.bulletCenterD[3] = this.yCoord - 55 - this.fireY
        }
        }
        
        if(this.bulletType === 'triple') {
            if(this.tripleMiddle === true) {
            ctx.beginPath()
            ctx.moveTo(this.xCoord - 3, this.yCoord - 50 - this.fireY)
            ctx.lineTo(this.xCoord - 3, this.yCoord - 60 - this.fireY)
            ctx.lineTo(this.xCoord + 3, this.yCoord - 60 - this.fireY)
            ctx.lineTo(this.xCoord + 3, this.yCoord - 50 - this.fireY)
            ctx.lineTo(this.xCoord - 3, this.yCoord - 50 - this.fireY)
            ctx.closePath()
            ctx.fillStyle = ship.color
            ctx.fill()
            this.bulletCenterT[0] = this.xCoord
            this.bulletCenterT[1] = this.yCoord - 55 - this.fireY
        }
          if(this.tripleLeft === true) {
            ctx.beginPath()
            ctx.moveTo(this.xCoord - 30 - this.fireX, this.yCoord - 40 - this.fireY)
            ctx.lineTo(this.xCoord - 24 - this.fireX, this.yCoord - 40.4 - this.fireY)
            ctx.lineTo(this.xCoord - 26 - this.fireX, this.yCoord - 51 - this.fireY)
            ctx.lineTo(this.xCoord - 32 - this.fireX, this.yCoord - 50.6 - this.fireY)
            ctx.closePath()
            ctx.fillStyle = ship.color
            ctx.fill()
            this.bulletCenterT[2] = this.xCoord - 28 - this.fireX
            this.bulletCenterT[3] = this.yCoord - 45.5 - this.fireY
        }
          if(this.tripleRight === true) {
            ctx.beginPath()
            ctx.moveTo(this.xCoord + 30 + this.fireX, this.yCoord - 40 - this.fireY)
            ctx.lineTo(this.xCoord + 24 + this.fireX, this.yCoord - 40.4 - this.fireY)
            ctx.lineTo(this.xCoord + 26 + this.fireX, this.yCoord - 51 - this.fireY)
            ctx.lineTo(this.xCoord + 32 + this.fireX, this.yCoord - 50.6 - this.fireY)
            ctx.closePath()
            ctx.fillStyle = ship.color
            ctx.fill()
            this.bulletCenterT[4] = this.xCoord + 28 + this.fireX
            this.bulletCenterT[5] = this.yCoord - 45.5 - this.fireY
        }
        }
//************* need to be completed ***************/
      //   if(this.bulletType === 'quadra') {
      //       ctx.beginPath()

      //       ctx.moveTo(this.xCoord - 30 - this.fireX, this.yCoord - 40 - this.fireY)
      //       ctx.lineTo(this.xCoord - 24 - this.fireX, this.yCoord - 40.4 - this.fireY)
      //       ctx.lineTo(this.xCoord - 26 - this.fireX, this.yCoord - 51 - this.fireY)
      //       ctx.lineTo(this.xCoord - 32 - this.fireX, this.yCoord - 50.6 - this.fireY)

      //       ctx.moveTo(this.xCoord + 30 + this.fireX, this.yCoord - 40 - this.fireY)
      //       ctx.lineTo(this.xCoord + 24 + this.fireX, this.yCoord - 40.4 - this.fireY)
      //       ctx.lineTo(this.xCoord + 26 + this.fireX, this.yCoord - 51 - this.fireY)
      //       ctx.lineTo(this.xCoord + 32 + this.fireX, this.yCoord - 50.6 - this.fireY)

      //       ctx.moveTo(this.xCoord - 20, this.yCoord - 50 - this.fireY)
      //       ctx.lineTo(this.xCoord - 20, this.yCoord - 60 - this.fireY)
      //       ctx.lineTo(this.xCoord - 14, this.yCoord - 60 - this.fireY)
      //       ctx.lineTo(this.xCoord - 14, this.yCoord - 50 - this.fireY)
      //       ctx.lineTo(this.xCoord - 20, this.yCoord - 50 - this.fireY)

      //       ctx.moveTo(this.xCoord + 20, this.yCoord - 50 - this.fireY)
      //       ctx.lineTo(this.xCoord + 20, this.yCoord - 60 - this.fireY)
      //       ctx.lineTo(this.xCoord + 14, this.yCoord - 60 - this.fireY)
      //       ctx.lineTo(this.xCoord + 14, this.yCoord - 50 - this.fireY)
      //       ctx.lineTo(this.xCoord + 20, this.yCoord - 50 - this.fireY)

      //       ctx.closePath()
      //       ctx.fillStyle = ship.color
      //       ctx.fill()
      //   }
      //   if(this.bulletType === 'penta') {
      //       ctx.beginPath()

      //       ctx.moveTo(this.xCoord - 3, this.yCoord - 50 - this.fireY)
      //       ctx.lineTo(this.xCoord - 3, this.yCoord - 60 - this.fireY)
      //       ctx.lineTo(this.xCoord + 3, this.yCoord - 60 - this.fireY)
      //       ctx.lineTo(this.xCoord + 3, this.yCoord - 50 - this.fireY)
      //       ctx.lineTo(this.xCoord - 3, this.yCoord - 50 - this.fireY)
            
      //       ctx.moveTo(this.xCoord - 30 - this.fireX, this.yCoord - 40 - this.fireY)
      //       ctx.lineTo(this.xCoord - 24 - this.fireX, this.yCoord - 40.4 - this.fireY)
      //       ctx.lineTo(this.xCoord - 26 - this.fireX, this.yCoord - 51 - this.fireY)
      //       ctx.lineTo(this.xCoord - 32 - this.fireX, this.yCoord - 50.6 - this.fireY)

      //       ctx.moveTo(this.xCoord + 30 + this.fireX, this.yCoord - 40 - this.fireY)
      //       ctx.lineTo(this.xCoord + 24 + this.fireX, this.yCoord - 40.4 - this.fireY)
      //       ctx.lineTo(this.xCoord + 26 + this.fireX, this.yCoord - 51 - this.fireY)
      //       ctx.lineTo(this.xCoord + 32 + this.fireX, this.yCoord - 50.6 - this.fireY)

      //       ctx.moveTo(this.xCoord - 17 - this.innerFireX, this.yCoord - 45 - this.fireY)
      //       ctx.lineTo(this.xCoord - 11 - this.innerFireX, this.yCoord - 45.2 - this.fireY)
      //       ctx.lineTo(this.xCoord - 12 - this.innerFireX, this.yCoord - 55 - this.fireY)
      //       ctx.lineTo(this.xCoord - 18 - this.innerFireX, this.yCoord - 54.6 - this.fireY)

      //       ctx.moveTo(this.xCoord + 17 + this.innerFireX, this.yCoord - 45 - this.fireY)
      //       ctx.lineTo(this.xCoord + 11 + this.innerFireX, this.yCoord - 45.2 - this.fireY)
      //       ctx.lineTo(this.xCoord + 12 + this.innerFireX, this.yCoord - 55 - this.fireY)
      //       ctx.lineTo(this.xCoord + 18 + this.innerFireX, this.yCoord - 54.6 - this.fireY)

      //       ctx.closePath()
      //       ctx.fillStyle = ship.color
      //       ctx.fill()
      //   }
    }
    
    increase() {
        this.fireY += this.accelerateFireY
        this.fireX += this.accelerateFireX
        this.innerFireX += this.accelerateInnerFireX
    }
}

setTimeout(() => {
  triple = true
}, 60000)

setTimeout(() => {
  double = true
}, 30000)

window.setTimeout(() => {
  window.setInterval(function drawPlane() {
  
    leftPlanes.push(new WarPlane())
    rightPlanes.push(new WarPlane())
    
    leftPlanes.forEach(i => {
      i.addL()
    })
    
    rightPlanes.forEach(i => {
      i.addR()
    })
    }, 3000)
    
  window.clearInterval(smallEnemies)
}, 30000)

setInterval(function clearBullets() {
  bullets.shift()
}, 1000)

canvas.addEventListener('touchmove', (event) => {
  event.preventDefault()
  let {startX, startY} = startingPoint
  if(event.touches[0].pageX >= startX - 100 &&
      event.touches[0].pageX <= startX + 100 &&
      event.touches[0].pageY >= startY - 100 &&
      event.touches[0].pageY <= startY + 100) {
          startX = event.touches[0].pageX
          startY = event.touches[0].pageY
          startingPoint = {startX, startY}
      }
})

canvas.addEventListener('touchstart', (event) => {
  event.preventDefault()
  bullets.push(new Missile(weaponType))
})

function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = '25px serif'
  ctx.fillStyle = 'red'
  ctx.shadowColor = 'yellow'
  ctx.shadowBlur = 15
  ctx.textAlign = "center"
  ctx.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2)
  
  ctx.font = '25px serif'
  ctx.fillStyle = 'white'
  ctx.shadowColor = 'black'
  ctx.textAlign = "center"
  ctx.shadowBlur = 15
  ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 25)
  
  let again = document.getElementById("ta")
  //again.style.display = "block"
  // again.addEventListener("click", () => {
  //     over = false
  //     window.cancelAnimationFrame(ga)
  //     window.requestAnimationFrame(draw)
  // })
  
  
  let ga = window.requestAnimationFrame(gameOver)
}

function draw() {
let {startX, startY} = startingPoint
ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.save()
ship.move()

enemies.forEach(i => {
    i.drawEnemy()
    i.acc()
    if(i.enemyArea[0]  >= startX - 60 && i.enemyArea[0] <= startX + 60 &&
    i.enemyArea[2] >= startX - 60 && i.enemyArea[2] <= startX + 60 &&
    i.enemyArea[3] >= startY - 20 && i.enemyArea[1] < startY - 40) {
        enemies = enemies.filter(j => j != i)
        if(heart) {
              heart = heart.split(' ')
              heart.pop()
              heart = heart.join(' ')
          } else {
              window.cancelAnimationFrame(startFrames)
              over = true
              gameOver()
          }
    }

    if (i.enemyArea[1] > canvas.height) {  //Удалить объекты, покинувшие область канвы из массива enemies[]
      enemies = enemies.filter(j => j != i)
    }
})


bullets.forEach((elem, ind) => {
    elem.defineShot()
    elem.increase()
    if(elem.bulletType === 'single') {
      enemies.find((bo, index) => {
      if(
        elem.bulletCenter[0] >= bo.enemyArea[0] && 
        elem.bulletCenter[0] <= bo.enemyArea[2]  &&
        elem.bulletCenter[1] >= bo.enemyArea[1] &&
        elem.bulletCenter[1] <= bo.enemyArea[3]
      ) {
          enemies = enemies.filter(i => i != bo)
          bullets = bullets.filter(i => i != elem)
          score++
      }
    })

    leftPlanes.find(el => {
      if(
        elem.bulletCenter[0] >= el.enemyArea[0] &&
        elem.bulletCenter[0] <= el.enemyArea[1] &&
        elem.bulletCenter[1] >= el.enemyArea[2] &&
        elem.bulletCenter[1] <= el.enemyArea[3]
      ) {
          if(el.hp === 0) {
          el.drawLeft = false
          el.enemyArea = [3000, 3000, 3000, 3000]
          bullets = bullets.filter(i => i != elem)
          score += 2 
          } else {
            bullets = bullets.filter(i => i != elem)
            el.hp -= 1
            }
        }
    })

    rightPlanes.find(el => {
      if(
          elem.bulletCenter[0] >= el.enemyArea[0] &&
          elem.bulletCenter[0] <= el.enemyArea[1] &&
          elem.bulletCenter[1] >= el.enemyArea[2] &&
          elem.bulletCenter[1] <= el.enemyArea[3]
      ) {
          if(el.hp === 0) {
            el.drawRight = false
            el.enemyArea = [3000, 3000, 3000, 3000]
           // rightPlanes = rightPlanes.filter(i => i != el)
            bullets = bullets.filter(i => i != elem)
            score += 2 
          } else {
              bullets = bullets.filter(i => i != elem)
              el.hp -= 1
          }
      }
    })
    }

    else if(elem.bulletType === 'double') {
        enemies.find((bo, index) => {
            if(
              elem.bulletCenterD[0] >= bo.enemyArea[0] &&
              elem.bulletCenterD[0] <= bo.enemyArea[2] &&
              elem.bulletCenterD[1] >= bo.enemyArea[1] &&
              elem.bulletCenterD[1] <= bo.enemyArea[3]) {
                  elem.doubleLeft = false
                  elem.bulletCenterD[1] = 5000
                  enemies = enemies.filter(i => i != bo)
                  score++
              }
            if(
              elem.bulletCenterD[2] >= bo.enemyArea[0] &&
              elem.bulletCenterD[2] <= bo.enemyArea[2] &&
              elem.bulletCenterD[3] >= bo.enemyArea[1] &&
              elem.bulletCenterD[3] <= bo.enemyArea[3]) {
                elem.doubleRight = false
                elem.bulletCenterD[3] = 5000
                enemies = enemies.filter(i => i != bo)
                score++
            }
        })

        leftPlanes.find(el => {
          if(
            elem.bulletCenterD[0] >= el.enemyArea[0] &&
            elem.bulletCenterD[0] <= el.enemyArea[1] &&
            elem.bulletCenterD[1] >= el.enemyArea[2] &&
            elem.bulletCenterD[1] <= el.enemyArea[3]
          ) {
              elem.doubleLeft = false
              elem.bulletCenterD[1] = 5000

              if(el.hp === 0) {
                el.drawLeft = false
                el.enemyArea = [3000, 3000, 3000, 3000]
                score += 2 
              } else {
                el.hp -= 1
                }
            }

            if(
              elem.bulletCenterD[2] >= el.enemyArea[0] &&
              elem.bulletCenterD[2] <= el.enemyArea[1] &&
              elem.bulletCenterD[3] >= el.enemyArea[2] &&
              elem.bulletCenterD[3] <= el.enemyArea[3]
            ) {
                elem.doubleRight = false
                elem.bulletCenterD[3] = 5000

                if(el.hp === 0) {
                  el.drawLeft = false
                  el.enemyArea = [3000, 3000, 3000, 3000]
                  score += 2 
                } else {
                  el.hp -= 1
                  }
              }
        })

        rightPlanes.find(el => {
          if(
            elem.bulletCenterD[0] >= el.enemyArea[0] &&
            elem.bulletCenterD[0] <= el.enemyArea[1] &&
            elem.bulletCenterD[1] >= el.enemyArea[2] &&
            elem.bulletCenterD[1] <= el.enemyArea[3]
          ) {
              elem.doubleLeft = false
              elem.bulletCenterD[1] = 5000

              if(el.hp === 0) {
                el.drawRight = false
                el.enemyArea = [3000, 3000, 3000, 3000]
                score += 2 
              } else {
                el.hp -= 1
                }
            }

            if(
              elem.bulletCenterD[2] >= el.enemyArea[0] &&
              elem.bulletCenterD[2] <= el.enemyArea[1] &&
              elem.bulletCenterD[3] >= el.enemyArea[2] &&
              elem.bulletCenterD[3] <= el.enemyArea[3]
            ) {
                elem.doubleRight = false
                elem.bulletCenterD[3] = 5000

                if(el.hp === 0) {
                  el.drawRight = false
                  el.enemyArea = [3000, 3000, 3000, 3000]
                  score += 2 
                } else {
                  el.hp -= 1
                  }
              }
        })
    }

    else if(elem.bulletType === 'triple') {
        enemies.find((bo, index) => {
            if(
              elem.bulletCenterT[0] >= bo.enemyArea[0] &&
              elem.bulletCenterT[0] <= bo.enemyArea[2] &&
              elem.bulletCenterT[1] >= bo.enemyArea[1] &&
              elem.bulletCenterT[1] <= bo.enemyArea[3]) {
                  elem.tripleMiddle = false
                  elem.bulletCenterT[1] = 5000
                  enemies = enemies.filter(i => i != bo)
                  score++
              }
            if(
              elem.bulletCenterT[2] >= bo.enemyArea[0] &&
              elem.bulletCenterT[2] <= bo.enemyArea[2] &&
              elem.bulletCenterT[3] >= bo.enemyArea[1] &&
              elem.bulletCenterT[3] <= bo.enemyArea[3]) {
                  elem.tripleLeft = false
                  elem.bulletCenterT[3] = 5000
                  enemies = enemies.filter(i => i != bo)
                  score++
              }
            if(
              elem.bulletCenterT[4] >= bo.enemyArea[0] &&
              elem.bulletCenterT[4] <= bo.enemyArea[2] &&
              elem.bulletCenterT[5] >= bo.enemyArea[1] &&
              elem.bulletCenterT[5] <= bo.enemyArea[3]) {
                  elem.tripleRight = false
                  elem.bulletCenterT[5] = 5000
                  enemies = enemies.filter(i => i != bo)
                  score++
            }
        })
    }
})

ctx.restore()

//circles for upgrading weapon
if(double) {
    gradeToDouble.doubleWeapon()
    gradeToDouble.blowout()
  }
if(triple) {
    gradeToTriple.tripleWeapon()
    gradeToTriple.blowout()
}
if(quadra) {
    gradeToQuadra.quadraWeapon()
    gradeToQuadra.blowout()
}
if(penta) {
    gradeToPenta.pentaWeapon()
    gradeToPenta.blowout()
}

if(gradeToDouble.horisontal >= startX - 40 &&
      gradeToDouble.horisontal <= startX + 40 &&
      gradeToDouble.vertical >= startY - 40 &&
      gradeToDouble.vertical <= startY + 40) {
          double = false
          ship.color = 'yellow'
          weaponType = 'double'
          gradeToDouble.vertical = - 50
      }
if(gradeToTriple.horisontal >= startX - 40 &&
      gradeToTriple.horisontal <= startX + 40 &&
      gradeToTriple.vertical >= startY - 40 &&
      gradeToTriple.vertical <= startY + 40) {
          triple = false
          ship.color = 'lightgreen'
          weaponType = 'triple'
          gradeToTriple.vertical = - 50
      }
if(gradeToQuadra.horisontal >= startX - 40 &&
      gradeToQuadra.horisontal <= startX + 40 &&
      gradeToQuadra.vertical >= startY - 40 &&
      gradeToQuadra.vertical <= startY + 40) {
          quadra = false
          ship.color = 'white'
          weaponType = 'quadra'
          gradeToQuadra.vertical = - 50
      }
if(gradeToPenta.horisontal >= startX - 40 &&
      gradeToPenta.horisontal <= startX + 40 &&
      gradeToPenta.vertical >= startY - 40 &&
      gradeToPenta.vertical <= startY + 40) {
          penta = false
          ship.color = '#ff66ff'
          weaponType = 'penta'
          gradeToPenta.vertical = - 50
      }
ctx.font = '15px serif';
ctx.fillStyle = 'white'
ctx.fillText(`score: ${score}`, canvas.width - 80, canvas.height - 10);

ctx.font = '15px serif';
ctx.fillStyle = 'red'
ctx.fillText(`${heart}`, canvas.width - 81, canvas.height - 25);

leftPlanes.forEach(i => {
    i.drawPlaneLeft()
    i.accelerate()

    i.leftBullets.forEach(j => {
      if(
        j.bCenter[0] >= startX - 30 &&
        j.bCenter[0] <= startX + 30 &&
        j.bCenter[1] >= startY - 30 &&
        j.bCenter[1] <= startY + 30
      ) {
          i.leftBullets = i.leftBullets.filter(i => {
              i != j
          })
          if(heart) {
              heart = heart.split(' ')
              heart.pop()
              heart = heart.join(' ')
          } else {
              window.cancelAnimationFrame(startFrames)
              over = true
              gameOver()
          }
      }
      if(j.bCenter[1] >= canvas.height) {
                i.leftBullets = i.leftBullets.filter(k => k != j)
      }
      j.x += 2.5
    })

    i.shootLeft()

    if(i.xAxisLeftPlain >= canvas.width + 100) {
      leftPlanes.filter(q => q != i)
    }
})

rightPlanes.forEach(i => {
    i.drawPlaneRight()
    i.accelerate()
    i.rightBullets.forEach(j => {
      if(
        j.bCenter[0] >= startX - 30 &&
        j.bCenter[0] <= startX + 30 &&
        j.bCenter[1] >= startY - 30 &&
        j.bCenter[1] <= startY + 30
      ) {
          i.rightBullets = i.rightBullets.filter(i => {
              i != j
          })
          if(heart) {
              heart = heart.split(' ')
              heart.pop()
              heart = heart.join(' ')
          } else {
              window.cancelAnimationFrame(startFrames)
              over = true
              gameOver()
          }
      }
      if(j.bCenter[1] >= canvas.height) {
                i.rightBullets = i.rightBullets.filter(k => k != j)
      }
      j.x += 2.5
    })
    i.shootRight()
    if(i.xAxisRightPlain <= - 100) {
          //rightPlanes.shift()
          rightPlanes.filter(q => q != i)
      }
})

if(!over) {   
  startFrames = window.requestAnimationFrame(draw)
}
}
draw()
}
