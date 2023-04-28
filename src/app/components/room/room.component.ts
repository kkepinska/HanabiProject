import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/model/Card';
import { Gamestate } from 'src/app/model/Gamestate';
import { Hand } from 'src/app/model/Hand';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit{
  readonly roomInfo?: RoomInfo;
  readonly roomId: number;
  readonly playerName?: string;
  gameState?: Gamestate; 

  constructor(
    private readonly router: Router,
    private readonly clientService: ClientService,
  ) {
    var state: any = this.router.getCurrentNavigation()?.extras.state
    this.playerName = state["playerName"]
    this.roomInfo = state["roomInfo"]
    this.roomId = this.roomInfo?.id !== undefined? this.roomInfo.id : 0
  }

  ngOnInit() {
    if (this.playerName !== undefined) {
      this.clientService.joinRoom(this.roomId, this.playerName)
    }
    this.recieveStartGame();
    this.receiveUpdate();
  }

  startGame() {
    this.clientService.startGame(this.roomId);
  }

  recieveStartGame() {
    this.clientService.recieveStartGame().subscribe((gameState: Gamestate) => {
      this.gameState = gameState;
    });
  }

  playCard(hand: Hand, card: Card) {
    let pl = 0
    if(this.gameState != undefined)
      pl = this.gameState.hands.indexOf(hand)
    let pos = hand.cards.indexOf(card)
    this.clientService.playCard(pl, pos, this.roomId);
  }

  receiveUpdate() {
    this.clientService.recieveUpdate().subscribe((gameState: Gamestate) => {
      this.gameState = gameState;
    });
  }

}
