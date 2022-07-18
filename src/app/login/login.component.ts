import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  username!: string;
  password!: string;

  throwError!: string;
  errorSub: Subscription

  constructor(private dataService: DataService) {
    this.errorSub = dataService.error$.subscribe(errorMsg => {
      this.throwError = errorMsg
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe()
  }

  onLogin(): void {
    this.throwError = ''

    if (this.username && this.password) {
      this.dataService.login(this.username, this.password)
    }

    else {
      this.throwError = 'Must enter a character in Username and Password'
    }
  }

}
