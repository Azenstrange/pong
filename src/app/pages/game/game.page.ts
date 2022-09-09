import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  gameStatus: any;
  response = {
    p1Y: 50,
    p2Y: 50,
    ball: {
      x: 50,
      y: 50
    },
    collision : false
  };
  bar1: any;
  bar2: any;
  ball: any;
  gameWindow: any;
  width: number;
  height: number;
  userName = 'Player';
  roomName = '';
  reason = '';
  constructor(
    private route: ActivatedRoute,
    private socket: Socket
  ) { }

  ngOnInit() {

    this.userName = this.route.snapshot.paramMap.get('userName');
    this.roomName = this.route.snapshot.paramMap.get('roomName');
    this.reason =  this.route.snapshot.paramMap.get('reason');
    console.log(this.userName, this.roomName);
    this.socket.connect();

    if (this.reason === 'create') {
      this.socket.emit('createRoom', this.roomName, this.userName);
    } else {
      this.socket.emit('joinRoom', this.roomName, this.userName);
    }


    this.socket.on('invalid-room-name', () => {
      console.log('invalid room name');
    });

    this.socket.on('room-created', roomName => {
      console.log(roomName.roomName);
      console.log(`room ${roomName.roomName} created !`);
    });

    this.socket.on('full-room', () => {
      console.log('Room is full');
    });

    this.socket.on('room-joined', (roomName, users) => {
      console.log(roomName);
      console.log(`room ${roomName.roomName} is joined !`);
      console.log('connected user : ');
      users.forEach(user => {
          console.log(user.name);
      });
    });

    this.bar1 = document.querySelector('#bar1');
    this.bar2 = document.querySelector('#bar2');
    this.ball = document.querySelector('#ball');
    this.gameWindow = document.querySelector('.pong_main_game');
    this.width = this.gameWindow.width * devicePixelRatio;
    this.height = this.gameWindow.height * devicePixelRatio;

    this.defineValues();
  }

  defineValues() {

  }

}



