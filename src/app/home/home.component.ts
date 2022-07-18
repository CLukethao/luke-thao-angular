import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from "../interfaces/IUser";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";
import {IPost} from "../interfaces/IPost";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  user!: IUser | null
  userSub: Subscription

  publicPosts: Array<IPost>
  publicPostsSub: Subscription

  creatingPost: boolean = false;
  postTitle!: string;
  postDescription!: string;

  throwError!: string;


  constructor(private dataService: DataService) {
    this.user = this.dataService.user
    this.publicPosts = this.dataService.posts

    this.userSub = dataService.user$.subscribe(userUpdate => {
      this.user = userUpdate
    })

    this.publicPostsSub = dataService.posts$.subscribe(postsUpdate => {
      this.publicPosts = postsUpdate
    })

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  onNewPost() {
    this.creatingPost = true
  }

  onSubmit() {
    if (this.postTitle && this.postDescription) {
      this.dataService.createPost(this.postTitle, this.postDescription)

      this.creatingPost = false
      this.postTitle = ''
      this.postDescription = ''
    }

    else {
      this.throwError = 'Title and Description must have 1 character'
    }
  }

  onCancel() {
    this.creatingPost = false
    this.postTitle = ''
    this.postDescription = ''
    this.throwError = ''
  }
}
