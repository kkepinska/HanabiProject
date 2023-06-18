import { Component, Input, OnInit } from '@angular/core';
import { RoomInfo } from '../../model/RoomInfo';
import { RoomInfoListComponent } from '../room-info-list/room-info-list.component';
import { FormatterService } from 'src/app/service/formatter.service';

@Component({
  selector: 'app-mock-room-info-list',
  templateUrl: './mock-room-info-list.component.html',
  styleUrls: ['./mock-room-info-list.component.scss']
})
export class MockRoomInfoListComponent {
  mode?: string = undefined
  playerCount?: number = undefined

  @Input() playerName?: string;
  roomList: RoomInfo[] = [
    {
      id : 235,
      playerCount : 3,
      players: [
        'Player 2',
        'Player 311',
        'Player with a rather long username'
      ],
      isPublic : true,
      mode: "basic"
    },
    {
      id : 4423,
      playerCount : 4,
      players: [
        'Player 2',
        'Player 311',
        'Player with a rather long username',
        'Player 8',
      ],
      isPublic : true,
      mode: "black"
    },
    {
      id : 900,
      playerCount : 3,
      players: [
        'Player 552',
        'Player 20',
        'Player 752',
      ],
      isPublic : true,
      mode: "hard_c"
    },
    {
      id : 88421,
      playerCount : 2,
      players: [
        'Player 5235',
        'Player 90',
      ],
      isPublic : true,
      mode: "rainbow"
    },
    {
      id : 10042,
      playerCount : 1,
      players: [
        'Player 346',
      ],
      isPublic : true,
      mode: "basic"
    }
  ]

  public constructor(
    private readonly formatterService: FormatterService
  ) {}
  
  createNewRoom() {
    console.log('Creating new room')
  }

  public getGameModeNames(): Array<string> {
    return this.formatterService.getGameModeNames()
  }

  public getModeName(mode: string): string | undefined {
    return this.formatterService.getModeName(mode)
  }

  public setMode(modeName: string): void {
    console.log("Setting mode", modeName)
    this.mode = this.formatterService.getMode(modeName)
  }

  public getPlayerConuts(): Array<number> {
    return RoomInfoListComponent.PLAYER_COUNTS
  }

  public setPlayerCount(playerCount: number): void {
    this.playerCount = playerCount
  }
}
