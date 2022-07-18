import { Component, OnInit } from '@angular/core';
import {IPost} from "../interfaces/IPost";
import {Subscription} from "rxjs";
import {IUser} from "../interfaces/IUser";
import {DataService} from "../data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: IUser | null
  userSub: Subscription

  userPosts: Array<IPost>


  constructor(private dataService: DataService) {
    this.user = this.dataService.user
    this.userPosts = this.dataService.posts.filter(post => post.author === this.user!.username)

    this.userSub = dataService.user$.subscribe(userUpdate => {
      this.user = userUpdate
    })

  }

  ngOnInit(): void {
  }

}
