import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ButtonComponent } from './components/button/button.component';
import { RoomComponent } from './components/room/room.component';
import { LoginComponent } from './components/login/login.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { RoomInfoComponent } from './components/room-info/room-info.component';
import { RoomInfoListComponent } from './components/room-info-list/room-info-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    RoomComponent,
    LoginComponent,
    LobbyComponent,
    RoomInfoComponent,
    RoomInfoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
