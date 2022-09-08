import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { IonicModule } from '@ionic/angular';
import { BarComponent } from './bar/bar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    BarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NavbarComponent,
    BarComponent
  ]
})
export class ComponentsModule { }
