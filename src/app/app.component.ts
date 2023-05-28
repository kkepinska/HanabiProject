import { Component, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  createRoomText = "Create room"
  debugText = "---"

  createRoom(arg:any) {
    this.debugText = "create room"
    console.log("clicked!\n")
  }

  joinRoom() : void{
    const socket = io('http://18.185.170.171:8080');
    socket.emit("join", "hello :)", (response:Response) => {
      console.log(response); // "got it"
    });
    console.log("clicked!\n")
  }

}
