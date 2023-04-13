import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent {
  createRoomText = "Create room";
  debugText = "---";
  userName = "";
  state? : any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state
    this.userName = this.state["playerName"]
  }

  ngOnInit() {
  }
}
