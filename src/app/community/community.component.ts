import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  users!: Array<string>
  username: string

  msgToUsername!: string
  message!: string

  throwError!: string

  constructor(private dataService: DataService, private modalService: NgbModal) {
    this.users = dataService.userList.map(user => user.username)
    this.username = dataService.user!.username
  }

  ngOnInit(): void {
  }

  open(content: any) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  cancelMsg() {
    this.message = ''
    this.msgToUsername = ''
  }

  sendTo(username: string) {
    this.msgToUsername = username
  }

  onSend() {
    if (this.message) {
      this.dataService.sendMessage(this.msgToUsername, this.message)
      this.message = ''
      this.msgToUsername = ''
      this.throwError = ''
    }


    else {
      this.throwError = 'Message must have 1 or more characters'
    }
  }

}
