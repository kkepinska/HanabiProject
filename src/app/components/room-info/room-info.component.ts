import { Component, Input } from '@angular/core';
import { RoomInfo } from 'src/app/model/RoomInfo';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent {
  joinRoomText = "join room"
  @Input() room?: RoomInfo;
}
