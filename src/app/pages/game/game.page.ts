/* eslint-disable max-len */
import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, AfterViewChecked {
  gameStatus: any;
  response = {
    p1Y: 50,
    p2Y: 50,
    ball: {
      x: 50,
      y: 50
    },
    collision : false,
    score: {
      p1: 0,
      p2: 0
    },
    pong: 0
  };
  bar1: any;
  bar2: any;
  ball: any;
  gameWindow: any;
  width: number;
  height: number;
  barHeight: number;
  barWidth: number;
  ballHeight: number;
  minBarTravel: number;
  maxBarTravel: number;
  minBallTravelVertical: number;
  maxBallTravelVertical: number;
  minBallTravelHorizontal: number;
  maxBallTravelHorizontal: number;
  userName = 'Player';
  userName2 = 'Player';
  roomName = '';
  reason = '';

  constructor(
    private route: ActivatedRoute,
    private socket: Socket,
    private router: Router
  ) { }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key  === 'ArrowUp') {
      this.socket.emit('movePaddleUp');
    }

    if (event.code === 'ArrowDown') {
      this.socket.emit('movePaddleDown');
    }
  }

  ngOnInit() {

    this.userName = this.route.snapshot.paramMap.get('userName');
    this.roomName = this.route.snapshot.paramMap.get('roomName');
    this.reason =  this.route.snapshot.paramMap.get('reason');
    this.socket.connect();

    if (this.reason === 'create') {
      this.socket.emit('createRoom', this.roomName, this.userName);
    } else {
      this.socket.emit('joinRoom', this.roomName, this.userName);
    }

    this.socket.on('invalid-room-name', () => {
      this.router.navigate(['/room']);
    });

    this.socket.on('room-created', roomName => {
      // console.log(`room ${roomName.roomName} created !`);
      this.calculation();
    });

    this.socket.on('full-room', () => {
      // console.log('Room is full');
      // this.calculation();
      this.router.navigate(['/room']);
    });

    this.socket.fromEvent('room-joined').subscribe((data: any) => {
      this.userName = data.users[0].name;
      this.userName2 = data.users[1].name;
    });

    this.socket.fromEvent('game-update').subscribe((data: any) => {
      this.response.p1Y = data.p1Paddle.y;
      this.response.p2Y = data.p2Paddle.y;
      this.response.score = data.score;
      this.response.pong = data.pong;
      this.response.ball.x = data.ball.x;
      this.response.ball.y = data.ball.y;
      this.calculation();
    });

  }

  ngAfterViewChecked() {
    this.declareElements();
    this.defineValues();
    window.addEventListener('resize', () => {
      this.defineValues();
    });

    this.calculation();
  }


  sendCustomEvent() {
    this.socket.emit('movePaddleUp');
  }

  declareElements(){
    this.bar1 = document.getElementsByClassName('bar1');
    this.bar2 = document.getElementsByClassName('bar2');
    this.ball = document.getElementsByClassName('ball');
    this.gameWindow = document.getElementsByClassName('pong_main_game');
  }

  defineValues() {
    this.width = this.gameWindow[this.gameWindow.length-1].clientWidth * devicePixelRatio;
    this.height = this.gameWindow[this.gameWindow.length-1].clientHeight * devicePixelRatio;
    this.barHeight = this.bar1[this.bar1.length-1].clientHeight * devicePixelRatio;
    this.barWidth = this.bar1[this.bar1.length-1].clientWidth * devicePixelRatio;
    this.ballHeight = this.ball[this.ball.length-1].clientHeight * devicePixelRatio;

    this.minBarTravel = this.barHeight/2;
    this.maxBarTravel = this.height - this.barHeight;
    this.minBallTravelVertical = this.ballHeight/2;
    this.maxBallTravelVertical = this.height - this.ballHeight;
    this.minBallTravelHorizontal = this.barWidth + this.ballHeight/2;
    this.maxBallTravelHorizontal = this.width - this.barWidth*2 - this.ballHeight;
    // console.log(this.maxBallTravelHorizontal)
  }

  calculation(){
    this.bar1[this.bar1.length-1].style.top = this.minBarTravel + this.maxBarTravel/100 * this.response.p1Y + 'px';
    this.bar2[this.bar2.length-1].style.top = this.minBarTravel + this.maxBarTravel/100 * this.response.p2Y + 'px';
    this.ball[this.ball.length-1].style.top = this.minBallTravelVertical + this.maxBallTravelVertical/100 * this.response.ball.y + 'px';
    this.ball[this.ball.length-1].style.left = this.minBallTravelHorizontal + this.maxBallTravelHorizontal/100 * this.response.ball.x + 'px';
  }

}



