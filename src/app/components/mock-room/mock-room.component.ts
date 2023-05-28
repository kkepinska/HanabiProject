import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/model/Card';
import { GameInfo } from 'src/app/model/GameInfo';
import { Gamestate } from 'src/app/model/Gamestate';
import { Hand } from 'src/app/model/Hand';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { action, discardStructure, hintStructure, playStructure } from 'src/app/model/action';
import { color } from 'src/app/model/colors';

@Component({
  selector: 'app-mock-room',
  templateUrl: './mock-room.component.html',
  styleUrls: ['./mock-room.component.scss']
})
export class MockRoomComponent implements OnInit{
  private static ROOM_INFO : RoomInfo = {
    id : 124,
    playerCount : 3,
    players: ['Player 1', 'Player 2', 'Player 3'],
    isPublic : true,
  }
  private static GAME_INFO : GameInfo = {
    maxHints: 8,
    handSize: 5,
    numberOfPlayers: 3,
    setOfColors: new Set<color>([color.RED, color.GREEN, color.BLUE, color.YELLOW, color.WHITE]),
    raindbowCritical: false,
    blackCritical: false
  }
  
  roomInfo: RoomInfo;
  readonly roomId: number;
  readonly playerName: string;
  gameState?: Gamestate;
  playerHand?: Hand;
  hands?: Map<string, Hand>;

  lastActionMessage = "The game has not started yet"

  colors = ['red', 'green', 'white', 'blue', 'yellow']
  colorsEnum = [color.RED, color.GREEN, color.BLUE, color.YELLOW, color.WHITE]
  ranks = [1, 2, 3, 4, 5]

  constructor() {
    this.playerName = 'Player 1'
    this.roomInfo = MockRoomComponent.ROOM_INFO
    this.roomId = 124
    this.playerHand = this.getHands().get(this.playerName)
    let playAction: playStructure = {
      player: 'Player 2',
      card: { rank: 3, color: color.BLUE, colorKnowledge: [], rankKnowledge: [] },
      position: 2,
      actionType: 'play'
    } 
    this.gameState = {
        gameInfo: MockRoomComponent.GAME_INFO,
        hands: this.getHands(),
        deck: this.getCards(""),
        discard: this.getCards(""),
        availableHints: 8,
        currentScore: [
          Math.floor(Math.random()*6),
          Math.floor(Math.random()*6),
          Math.floor(Math.random()*6),
          Math.floor(Math.random()*6),
          Math.floor(Math.random()*6)
          ],
        lifeTokens: 10,
        currentPlayer: this.playerName,
        history: [
          playAction
        ]
    }
    this.lastActionMessage = this.getActionMessage(this.gameState.history[this.gameState.history.length - 1])

  }

  ngOnInit(): void {
  }

  getHands(): Map<string, Hand> {
    let hands = new Map<string, Hand>()
    hands.set('Player 1', { cards : this.getCards("") })
    hands.set('Player 2', { cards : this.getCards("") })
    hands.set('Player 3', { cards : this.getCards("") })
    return hands
  }

  getCards(player: string): Array<Card> {
    return [
      {
        color: this.colorsEnum[this.getRandom() - 1],
        rank: this.getRandom(),
        colorKnowledge: [color.RED, color.GREEN, color.BLUE, color.YELLOW],
        rankKnowledge: [3,4,5],
      },
      {
        color: this.colorsEnum[this.getRandom() - 1],
        rank: this.getRandom(),
        colorKnowledge: [color.GREEN, color.BLUE, color.WHITE],
        rankKnowledge: [1,2,3,4,5],
      },
      {
        color: this.colorsEnum[this.getRandom() - 1],
        rank: this.getRandom(),
        colorKnowledge: [color.RED, color.GREEN, color.BLUE, color.YELLOW, color.WHITE],
        rankKnowledge: [2,4,5],
      },
      {
        color: this.colorsEnum[this.getRandom() - 1],
        rank: this.getRandom(),
        colorKnowledge: [color.RED, color.YELLOW, color.WHITE],
        rankKnowledge: [3,4],
      },
      {
        color: this.colorsEnum[this.getRandom() - 1],
        rank: this.getRandom(),
        colorKnowledge: [color.BLUE, color.YELLOW,],
        rankKnowledge: [1,2,5],
      },
    ]
  }

  getRandom(): number {
    return Math.floor(Math.random()*5+1)
  }

  getClassName(colorName: string): string {
    return 'card-' + colorName
  }

  getLgClassName(colorName: string): string {
    return 'card-' + colorName + '-lg'
  }

  playCard(card: Card) {
    let cardIdx = this.playerHand?.cards.indexOf(card)
    console.log('playCard', this.playerName, cardIdx, this.roomId)
  }

  discardCard(card: Card) {
    if (this.playerHand === undefined) {
      return;
    }
    let cardIdx = this.playerHand?.cards.indexOf(card)
    console.log('discardCard', this.playerName, cardIdx, this.roomId);
  }

  hintCard(receiver: string, hintType: ("rank" | "color"), hintValue: number) {
    console.log('hintCard', this.playerName, receiver, hintType, hintValue, this.roomId)
  }

  getColorNames(colorNumbers: Array<number>) : Array<string> {
    return colorNumbers.map(c => this.getColorName(c))
  }

  getColorName(colorNumber: number): string {
    return this.colors[colorNumber - 1]
  }

  getActionMessage(arg: action): string {
    console.log('Get action message')
    if (arg.actionType === 'play') {
      console.log('playStructure')
      let playAction = <playStructure> arg
      return playAction.player + ' played card ' + playAction.card?.rank + playAction.card?.color
    } else if (arg.actionType === 'discard') {
      console.log('discardStructure')
      let discardAction = <discardStructure> arg
      return discardAction.player + ' discarded card ' + discardAction .card?.rank + discardAction .card?.color
    } else if (arg.actionType === 'hint') {
      console.log('hintStructure')
      let hintAction = <hintStructure> arg
      return hintAction.player + ' gave ' + hintAction.receiver + ' a hint about ' + hintAction.type + hintAction.value
    }
    console.log('no matching class of action')
    return ''
  }
}
