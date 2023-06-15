import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/model/Card';
import { Gamestate } from 'src/app/model/Gamestate';
import { Hand } from 'src/app/model/Hand';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { action } from 'src/app/model/action';
import { ClientService } from 'src/app/service/client.service';
import { FormatterService } from 'src/app/service/formatter.service';

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


  lastActionMessage = "The game has not started yet"

  ranks = [1, 2, 3, 4, 5]

  public constructor(
    private readonly router: Router,
    private readonly clientService: ClientService,
    private readonly formatterService: FormatterService
  ) {
    var state: any = this.router.getCurrentNavigation()?.extras.state
    this.playerName = state["playerName"]
    this.roomInfo = state["roomInfo"]
    this.roomId = this.roomInfo?.id !== undefined? this.roomInfo.id : 0
  }

  public ngOnInit() {
    if (this.playerName !== undefined) {
      this.clientService.joinRoom(this.roomId, this.playerName)
    }
    this.receiveGetPlayers();
    this.recieveStartGame();
    this.receiveUpdate();
  }

  private receiveGetPlayers(): void {
    this.clientService.receiveUpdateRoom().subscribe((roomInfo: RoomInfo) => {
      this.roomInfo = roomInfo;
    })
  }

  private recieveStartGame(): void {
    this.clientService.recieveStartGame().subscribe((msg: [Gamestate, Array<[string, Hand]>]) => {
      console.log("Room ", this.roomId, " received gameState in startGame")
      let gameState = msg[0]
      let handsArray = msg[1]
      this.setGameState(gameState, handsArray)
    });
  }

  private setGameState(gameState: Gamestate, handsArray: Array<[string, Hand]>): void {
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
      currentPlayer: gameState.currentPlayer,
      history: gameState.history,
      end_of_game: gameState.end_of_game,
      score: gameState.score,
    }
    console.log(this.gameState.hands)
    console.log("History: \n", this.gameState.history)

    let allHands = this.gameState.hands
    this.playerHand = allHands.get(this.playerName)
    this.hands = allHands

    const lastAction = this.gameState.history[this.gameState.history.length - 1]
    this.lastActionMessage = this.getActionMessage(lastAction)
  }

  private receiveUpdate(): void {
    this.clientService.recieveUpdate().subscribe((msg: [Gamestate, Array<[string, Hand]>]) => {
      console.log("Room ", this.roomId, " received gameState in startGame")
      let gameState = msg[0]
      let handsArray = msg[1]
      this.setGameState(gameState, handsArray)
    });
  }

  public startGame(): void {
    this.clientService.startGame(this.roomId);
  }

  public getCards(player: string): Array<Card> {
    if (this.gameState === undefined || this.gameState?.hands === undefined) {
      return []
    }
    let hand = this.gameState.hands.get(player)
    if (hand === undefined || hand.cards.length === 0) {
      return []
    }
    return hand.cards
  }

  public playCard(card: Card): void {
    if (this.playerHand === undefined) {
      return;
    }
    let cardIdx = this.playerHand?.cards.indexOf(card)
    console.log('playCard', this.playerName, cardIdx, this.roomId)
    this.clientService.playCard(this.playerName, cardIdx, this.roomId);
  }

  public discardCard(card: Card): void {
    if (this.playerHand === undefined) {
      return;
    }
    let cardIdx = this.playerHand?.cards.indexOf(card)
    console.log('discardCard', this.playerName, cardIdx, this.roomId);
    this.clientService.discardCard(this.playerName, cardIdx, this.roomId);
  }

  public hintCard(receiver: string, hintType: ("rank" | "color"), hintValue: number): void {
    console.log('hintCard', this.playerName, receiver, hintType, hintValue, this.roomId)
    this.clientService.hintCard(this.playerName, receiver, hintType, hintValue, this.roomId);
  }

  public getActionMessage(arg: action): string {
    return this.formatterService.getActionMessage(arg)
  }

  public getColorNames(): Array<string> {
    return this.formatterService.getColorNames()
  }

  public getColorName(colorNumber: number): string {
    return this.formatterService.getColorName(colorNumber)
  }

  public getClassName(colorName: string): string {
    return this.formatterService.getClassName(colorName)
  }

  public getLgClassName(colorName: string): string {
    return this.formatterService.getLgClassName(colorName)
  }
}
