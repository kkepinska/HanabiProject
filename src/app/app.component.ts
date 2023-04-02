import { Component, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Hanabi';

  joinRoom() : void{
    const socket = io('http://localhost:8080');
    socket.emit("join", "hello :)", (response:Response) => {
      console.log(response); // "got it"
    });
    console.log("clicked!\n")
  }

}
