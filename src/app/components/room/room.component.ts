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
  roomInfo: RoomInfo;
  readonly roomId: number;
  readonly playerName: string;
  gameState?: Gamestate;
  playerHand?: Hand;
  hands?: Map<string, Hand>;
  rank = 0
  color = 0

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
    this.receiveGetPlayers();
    this.recieveStartGame();
    this.receiveUpdate();
  }

  receiveGetPlayers() {
    this.clientService.receiveUpdateRoom().subscribe((roomInfo: RoomInfo) => {
      this.roomInfo = roomInfo;
    })
  }

  startGame() {
    this.clientService.startGame(this.roomId);
  }

  recieveStartGame() {
    this.clientService.recieveStartGame().subscribe((msg: [Gamestate, Array<[string, Hand]>]) => {
      console.log("Room ", this.roomId, " received gameState in startGame")
      let gameState = msg[0]
      let handsArray = msg[1]
      this.setGameState(gameState, handsArray)
    });
  }

  private setGameState(gameState: Gamestate, handsArray: Array<[string, Hand]>) {
    console.log(gameState)
    console.log("handsArray:")
    console.log(handsArray)
    
    let hands = new Map<string, Hand>()
    for(let entry of handsArray) {
      let player = entry[0]
      let hand = entry[1]
      hands.set(player, hand)
    }
    this.gameState = {
      gameInfo: gameState.gameInfo,
      hands: hands,
      deck: gameState.deck,
      discard: gameState.discard,
      availableHints: gameState.availableHints,
      currentScore: gameState.currentScore,
      lifeTokens: gameState.lifeTokens,
      currentPlayer: gameState.currentPlayer
    }
    console.log(this.gameState.hands)
    let allHands = this.gameState.hands
    this.playerHand = allHands.get(this.playerName)
    this.hands = allHands
  }

  getCards(player: string): Array<Card> {
    if (this.gameState === undefined || this.gameState?.hands === undefined) {
      return []
    }
    let hand = this.gameState.hands.get(player)
    if (hand === undefined || hand.cards.length === 0) {
      return []
    }
    return hand.cards
  }

  playCard(card: Card) {
    if (this.playerHand === undefined) {
      return;
    }
    let cardIdx = this.playerHand?.cards.indexOf(card)
    this.clientService.playCard(this.playerName, cardIdx, this.roomId);
  }

  discardCard(card: Card) {
    if (this.playerHand === undefined) {
      return;
    }
    let cardIdx = this.playerHand?.cards.indexOf(card)
    this.clientService.discardCard(this.playerName, cardIdx, this.roomId);
  }

  hintCard(receiver: string, hintType: ("rank" | "color"), hintValue: number) {
    this.clientService.hintCard(this.playerName, receiver, hintType, hintValue, this.roomId);
  }

  receiveUpdate() {
    this.clientService.recieveUpdate().subscribe((msg: [Gamestate, Array<[string, Hand]>]) => {
      console.log("Room ", this.roomId, " received gameState in startGame")
      let gameState = msg[0]
      let handsArray = msg[1]
      this.setGameState(gameState, handsArray)
    });
  }

  onSelectedRank(rank: string) {
    this.rank = Number(rank)
  }

  onSelectedColor(color: string) {
    this.color = Number(color)
  }
}
