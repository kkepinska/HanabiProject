import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  //{ path: "**", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "lobby", component: LobbyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
