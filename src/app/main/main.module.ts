import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './pages/main.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SharedModule } from '../shared';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    SettingsComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,

  ]
})
export class MainModule { }
