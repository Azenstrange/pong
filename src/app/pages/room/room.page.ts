import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';


@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  presentingElement = undefined;
  roomsList = [];
  userName = 'Player';
  constructor(
    private alertController: AlertController,
    private socket: Socket,
    private router: Router
    ) { }

  ngOnInit() {
    this.socket.connect();
    this.socket.emit('getRooms');
    this.socket.on('getRooms', rooms => {
      console.log('hi');
      this.roomsList = rooms;
      console.log(this.roomsList);
    });
  }

  async createRoom() {
    const alert = await this.alertController.create({
      header: 'Create a Room',
      buttons: [
        {
          text: 'Create',
          handler: async (data) => {
            if (data[0]) {
              this.userName = data[0];
            }
            if (this.userName && data[1]) {
              await alert.dismiss();
              await this.openRoom(data[1], true);
            }
          }
        }
      ],
      inputs: [
        {
          placeholder: 'Username'
        },
        {
          placeholder: 'Room Name'
        }
      ]
    });

    await alert.present();
  }

  async openRoom(roomName: string, create?: boolean) {
    const reason = create ? 'create' : 'join';
    await this.router.navigate([`game/${this.userName}/${roomName}/${reason}`]);
  }
}
