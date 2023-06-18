import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoomInfo } from 'src/app/model/RoomInfo';
import { RoomInfoListComponent } from '../room-info-list/room-info-list.component';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent {
  joinRoomText = "join room"
  @Input() room?: RoomInfo;
  @Input() playerName?: string;

  constructor(
    private readonly router: Router
  ) {}

  joinRoom() {
    this.router.navigate(['room', this.room?.id],
    { state: { 
      playerName: this.playerName, 
      roomInfo: this.room 
    }});
  }

  public getModeName(mode: string): string | undefined {
    return RoomInfoListComponent.MODE_TO_MODE_NAME.get(mode)
  }
}
