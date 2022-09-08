import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  gameStatus:any
  response = {
    p1Y: 50,
    p2Y: 50,
    ball: {
      x: 50,
      y: 50
    },
    collision : false
  }
  bar1:any
  bar2:any
  ball:any
  gameWindow:any
  width:number
  height:number

  constructor() { }

  ngOnInit() {
    this.bar1 = document.querySelector("#bar1")
    this.bar2 = document.querySelector("#bar2")
    this.ball = document.querySelector("#ball")
    this.gameWindow = document.querySelector(".pong_main_game")
    this.width = this.gameWindow.width * devicePixelRatio
    this.height = this.gameWindow.height * devicePixelRatio

    this.defineValues()
  }

  defineValues() {

  }
  
}



