import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { GamePage } from './game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,
    ComponentsModule
  ],
  declarations: [GamePage]
})
export class GamePageModule {}
