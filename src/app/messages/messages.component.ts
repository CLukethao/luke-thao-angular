import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {IConversation} from "../interfaces/IMessages";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages!: Array<IConversation>

  viewMessage!: IConversation
  messageText!: string

  username: string

  throwError!: string

  constructor(private dataService: DataService, private modalService: NgbModal) {
    this.messages = dataService.user!.messages
    this.username = dataService.user!.username
  }

  ngOnInit(): void {
  }

  open(content: any, message: IConversation) {
    this.viewMessage = message
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  onSend() {

    if (this.messageText) {
      let withUser = this.viewMessage.users[0] === this.username ? this.viewMessage.users[1] : this.viewMessage.users[0]
      this.dataService.sendMessage(withUser, this.messageText)
      this.throwError = ''
    }

    else {
      this.throwError = 'Message must have 1 or more characters'
    }
  }

  reset() {
    this.messageText = ''
    this.throwError = ''
  }
}
