import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text : string = "";
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  onClick() {
    this.clicked.emit(null);
  }
}
