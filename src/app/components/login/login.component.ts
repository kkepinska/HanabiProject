import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msg = ""
  login = "";
  errorMessage = ""

  isValid = false;
  
  constructor(
    private readonly clientService: ClientService,
    private readonly router: Router
  ) {}
  
  ngOnInit() {
    this.clientService.onLoginResponse().subscribe(msg => {
      console.log('got a msg: ' + msg);
      this.msg = msg[0]
      this.isValid = (this.msg == 'VALID')
      if (this.isValid){
        //this.router.navigate(["./../lobby", msg[1]])
        this.router.navigateByUrl('/lobby', {
          state: { playerName: msg[1]}} )
      } else {
        this.errorMessage = "Name " + this.login + " is already used"
      }
    });
  }

  onSubmit() : void {
    if (this.validate(this.login)){
      this.clientService.login(this.login)
    } else {
      this.errorMessage = "Name " + this.login + " is invalid"
    }
  }

  private validate(login : string) : boolean {
    return true
  }

  joinMockRoom() {
    this.router.navigateByUrl('/mockRoom') 
  }
}
