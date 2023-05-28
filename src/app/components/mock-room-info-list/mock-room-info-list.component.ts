import { Component, Input, OnInit } from '@angular/core';
import { RoomInfo } from '../../model/RoomInfo';

@Component({
  selector: 'app-mock-room-info-list',
  templateUrl: './mock-room-info-list.component.html',
  styleUrls: ['./mock-room-info-list.component.scss']
})
export class MockRoomInfoListComponent {
  readonly createRoomText = "create new room";

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
    },
    {
      id : 88421,
      playerCount : 2,
      players: [
        'Player 5235',
        'Player 90',
      ],
      isPublic : true,
    },
    {
      id : 10042,
      playerCount : 1,
      players: [
        'Player 346',
      ],
      isPublic : true,
    }
  ]

  createNewRoom() {
    console.log('Creating new room')
  }
}
