import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LoginComponent } from './components/login/login.component';
import { RoomComponent } from './components/room/room.component';
import { MockRoomComponent } from './components/mock-room/mock-room.component';

const routes: Routes = [
  //{ path: "**", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "room/:roomId", component: RoomComponent },
  { path: "mockRoom", component: MockRoomComponent },
  { path: "lobby", component: LobbyComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
