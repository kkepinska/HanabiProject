import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LoginComponent } from './components/login/login.component';
import { RoomComponent } from './components/room/room.component';

const routes: Routes = [
  //{ path: "**", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "room/:roomId", component: RoomComponent },
  { path: "lobby", component: LobbyComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
