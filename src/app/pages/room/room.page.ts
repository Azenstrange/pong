import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  presentingElement = undefined;
  roomsList = [
    {},{},{},{},{},{},{},{},{},{}
  ];
  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async createRoom() {
    const alert = await this.alertController.create({
      header: 'Create a Room',
      buttons: [
        {
          text: 'Create',
          handler: data => {
            console.log(data[0]);
          }
        }
      ],
      inputs: [
        {
          placeholder: 'Room Name'
        }
      ]
    });

    await alert.present();
  }
  openRoom(roomName: string) {
    //
  }
}
