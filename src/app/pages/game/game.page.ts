import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  gameStatus:any
  response = {
    p1Y: 100,
    p2Y: 100,
    ball: {
      x: 100,
      y: 100
    },
    collision : false
  }
  bar1:any
  bar2:any
  ball:any
  gameWindow:any
  width:number
  height:number
  barHeight:number
  barWidth:number
  ballHeight:number
  minBarTravel:number
  maxBarTravel:number
  minBallTravelVertical:number
  maxBallTravelVertical:number
  minBallTravelHorizontal:number
  maxBallTravelHorizontal:number


  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      this.declareElements()

      this.defineValues()
      window.addEventListener('resize', () => {
        this.defineValues()
      })

      this.calculation()
      setInterval(() => {
        this.calculation()
      }, 16)

    }, 1000)
  }

  declareElements(){
    this.bar1 = document.querySelector("#bar1")
    this.bar2 = document.querySelector("#bar2")
    this.ball = document.querySelector("#ball")
    this.gameWindow = document.querySelector(".pong_main_game")
  }

  defineValues() {
    this.width = this.gameWindow.scrollWidth * devicePixelRatio
    this.height = this.gameWindow.scrollHeight * devicePixelRatio
    this.barHeight = this.bar1.scrollHeight * devicePixelRatio
    this.barWidth = this.bar1.scrollWidth * devicePixelRatio
    this.ballHeight = this.ball.scrollHeight * devicePixelRatio

    this.minBarTravel = this.barHeight/2
    this.maxBarTravel = this.height - this.barHeight
    this.minBallTravelVertical = this.ballHeight/2
    this.maxBallTravelVertical = this.height - this.ballHeight
    this.minBallTravelHorizontal = this.barWidth + this.ballHeight/2
    this.maxBallTravelHorizontal = this.width - this.barWidth*2 - this.ballHeight

    // console.log(this.maxBallTravelHorizontal)
  }

  calculation(){
    this.bar1.style.top = this.minBarTravel + this.maxBarTravel/100 * this.response.p1Y + "px"
    this.bar2.style.top = this.minBarTravel + this.maxBarTravel/100 * this.response.p2Y + "px"
    this.ball.style.top = this.minBallTravelVertical + this.maxBallTravelVertical/100 * this.response.ball.y + "px"
    this.ball.style.left = this.minBallTravelHorizontal + this.maxBallTravelHorizontal/100 * this.response.ball.x + "px"
  }
  
}



