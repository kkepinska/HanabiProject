import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  readonly createRoomText = "Create room";
  readonly userName = "";
  readonly state? : any;

  constructor(
    private readonly router: Router
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state
    this.userName = this.state["playerName"]
  }
}
