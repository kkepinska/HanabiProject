import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/model/Card';
import { Gamestate } from 'src/app/model/Gamestate';
import { Hand } from 'src/app/model/Hand';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { action, playStructure, discardStructure, hintStructure } from 'src/app/model/action';
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

  lastActionMessage = "The game has not started yet"

  colors = ['red', 'green', 'white', 'blue', 'yellow']
  ranks = [1, 2, 3, 4, 5]

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
      currentPlayer: gameState.currentPlayer,
      history: gameState.history
    }
    console.log(this.gameState.hands)
    console.log("History: \n", this.gameState.history)

    let allHands = this.gameState.hands
    this.playerHand = allHands.get(this.playerName)
    this.hands = allHands

    this.lastActionMessage = this.getActionMessage(this.gameState.history[this.gameState.history.length - 1])
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
    console.log('playCard', this.playerName, cardIdx, this.roomId)
    this.clientService.playCard(this.playerName, cardIdx, this.roomId);
  }

  discardCard(card: Card) {
    if (this.playerHand === undefined) {
      return;
    }
    let cardIdx = this.playerHand?.cards.indexOf(card)
    console.log('discardCard', this.playerName, cardIdx, this.roomId);
    this.clientService.discardCard(this.playerName, cardIdx, this.roomId);
  }

  hintCard(receiver: string, hintType: ("rank" | "color"), hintValue: number) {
    console.log('hintCard', this.playerName, receiver, hintType, hintValue, this.roomId)
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

  getColorNames(colorNumbers: Array<number>) : Array<string> {
    return colorNumbers.map(c => this.getColorName(c))
  }

  getColorName(colorNumber: number): string {
    return this.colors[colorNumber - 1]
  }

  getClassName(colorName: string): string {
    return 'card-' + colorName
  }

  getLgClassName(colorName: string): string {
    return 'card-' + colorName + '-lg'
  }

  getActionMessage(arg: action): string {
    console.log('Get action message')
    if (arg.actionType === 'play') {
      console.log('playStructure')
      let playAction = <playStructure> arg
      let colorName = this.getColorName(<number>playAction.card?.color)
      return playAction.player + ' played card ' + colorName + ' ' + playAction.card?.rank
    } else if (arg.actionType === 'discard') {
      console.log('discardStructure')
      let discardAction = <discardStructure> arg
      let colorName = this.getColorName(<number>discardAction.card?.color)
      return discardAction.player + ' discarded card ' + colorName + ' ' + discardAction.card?.rank
    } else if (arg.actionType === 'hint') {
      console.log('hintStructure')
      let hintAction = <hintStructure> arg
      let hintValue = (hintAction.type === 'rank')? hintAction.value : this.getColorName(<number>hintAction.value)
      return hintAction.player + ' gave ' + hintAction.receiver + ' a hint about ' + hintAction.type + ' ' + hintValue
    }
    console.log('no matching class of action')
    return ''
  }
}
