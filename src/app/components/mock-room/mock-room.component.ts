import { Component } from '@angular/core';
import { Card } from 'src/app/model/Card';
import { GameInfo } from 'src/app/model/GameInfo';
import { Gamestate } from 'src/app/model/Gamestate';
import { Hand } from 'src/app/model/Hand';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { action, discardStructure, hintStructure, playStructure } from 'src/app/model/action';
import { color } from 'src/app/model/colors';
import { FormatterService } from 'src/app/service/formatter.service';

@Component({
  selector: 'app-mock-room',
  templateUrl: './mock-room.component.html',
  styleUrls: ['./mock-room.component.scss']
})
export class MockRoomComponent {
  private static readonly PLAYER1 = 'Player1'
  private static readonly PLAYER2 = 'Player2'
  private static readonly PLAYER3 = 'Player3'

  private static ROOM_INFO : RoomInfo = {
    id : 124,
    playerCount : 3,
    players: [
        MockRoomComponent.PLAYER1, 
        MockRoomComponent.PLAYER2, 
        MockRoomComponent.PLAYER3
    ],
    isPublic : true,
  }
  private static GAME_INFO : GameInfo = {
    maxHints: 8,
    handSize: 5,
    numberOfPlayers: 3,
    setOfColors: new Array<color>(color.RED, color.GREEN, color.BLUE, color.YELLOW, color.WHITE),
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

  colorsEnum = [color.RED, color.GREEN, color.BLUE, color.YELLOW, color.WHITE]
  ranks = [1, 2, 3, 4, 5]

  public constructor(
    private readonly formatterService: FormatterService
    ) {
    this.playerName = MockRoomComponent.PLAYER1
    this.roomInfo = MockRoomComponent.ROOM_INFO
    this.roomId = 124
    this.playerHand = this.getHands().get(this.playerName)
    let playAction: playStructure = {
      player: MockRoomComponent.PLAYER2,
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
          playAction,
          playAction,
          playAction
        ],
        end_of_game: false,
        score: 0,
    }
    const lastAction = this.gameState.history[this.gameState.history.length - 1]
    this.lastActionMessage = this.getActionMessage(lastAction)
  }

  private getHands(): Map<string, Hand> {
    let hands = new Map<string, Hand>()
    hands.set(MockRoomComponent.PLAYER1, { cards : this.getCards("") })
    hands.set(MockRoomComponent.PLAYER2, { cards : this.getCards("") })
    hands.set(MockRoomComponent.PLAYER3, { cards : this.getCards("") })
    return hands
  }

  getCards(player: string): Array<Card> {
    console.log("getCards", player)
    return [
      {
        color: this.colorsEnum[this.getRandom() - 1],
        rank: this.getRandom(),
        colorKnowledge: [color.RED, color.GREEN, color.BLUE, color.YELLOW],
        rankKnowledge: [this.getRandom(),this.getRandom(),this.getRandom()],
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
        rankKnowledge: [1,2,3,4,5],
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

  private getRandom(): number {
    return Math.floor(Math.random()*5+1)
  }

  public playCard(card: Card): void {
    let cardIdx = this.playerHand?.cards.indexOf(card)
    let arg: playStructure = {
        player: this.playerName,
        position: cardIdx,
        card: card, 
        actionType: "play"
    }
    console.log('playCard', this.playerName, cardIdx, this.roomId)
    console.log(this.getActionMessage(arg))
  }

  public discardCard(card: Card): void {
    if (this.playerHand === undefined) {
      return;
    }
    let arg: discardStructure = {
        player: this.playerName,
        position: 2,
        card: card, 
        actionType: "discard"
    }
    let cardIdx = this.playerHand?.cards.indexOf(card)
    console.log('discardCard', this.playerName, cardIdx, this.roomId);
    console.log(this.getActionMessage(arg))
  }

  public hintCard(receiver: string, hintType: ("rank" | "color"), hintValue: number): void {
    let arg: hintStructure = {
        player: this.playerName,
        receiver: receiver,
        type: hintType,
        value: hintValue,
        actionType: "hint"
    }
    console.log('hintCard', this.playerName, receiver, hintType, hintValue, this.roomId)
    console.log(this.getActionMessage(arg))
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

  public startGame(): void {

  }
}
