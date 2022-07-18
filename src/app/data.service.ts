import { Injectable } from '@angular/core';
import {v4 as uuidv4} from "uuid";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {IUser} from "./interfaces/IUser";
import {IComment, IPost} from "./interfaces/IPost";
import USERS_DATA from "../assets/users.json"
import POSTS_DATA from "../assets/posts.json"
import {IMessage, IConversation} from "./interfaces/IMessages";


@Injectable({
  providedIn: 'root'
})

export class DataService {

  user!: IUser | null;

  user$ = new Subject<IUser | null>()
  posts$ = new Subject<Array<IPost>>()

  error$ = new Subject<string>()

  loggedIn: boolean = false;

  userList: Array<IUser> = USERS_DATA.users

  posts: Array<IPost> = POSTS_DATA.posts

  constructor(private router: Router) {

  }

  login(username: string, password: string) {

    let userInfo = this.userList.find(user => user.username.toLowerCase() === username.toLowerCase())

    if (userInfo && userInfo.password === password) {
      this.loggedIn = true
      this.user = userInfo
      this.user$.next(this.user)
      this.router.navigate([''])
    }

    else {
      this.error$.next('Invalid Username or Password')
    }

  }

  signUp(username: string, password: string) {


    let userInfo = this.userList.find(user => user.username.toLowerCase() === username.toLowerCase())

    if (!userInfo) {
      let newUser = {
        id: uuidv4(),
        username: username,
        password: password,
        messages: []
      }

      this.userList.push(newUser)


      setTimeout(() => {this.router.navigate([''])}, 1000)
    }

    else {
      this.error$.next('Username Taken')
    }
  }

  logOut() {
    this.user = null
    this.user$.next(this.user)
    this.router.navigate(['login'])
  }

  createPost(title: string, description: string) {

    let newPost = {
      id: uuidv4(),
      date: (new Date).toISOString(),
      author: this.user!.username,
      title: title,
      description: description,
      comments: []
    }

    this.posts.unshift(newPost)

  }

  updatePost(title: string, description: string, postId: string) {
    let findPost = this.posts.find(post => post.id === postId)

    findPost!.title = title
    findPost!.description = description
    findPost!.date = (new Date).toISOString()
  }

  deletePost(postId: string) {

    this.posts = this.posts.filter(post => post.id !== postId)
    this.posts$.next(this.posts)
  }

  addComment(comment: string, id: string) {

    let newComment: IComment = {
      id: uuidv4(),
      date: (new Date).toISOString(),
      user: this.user!.username,
      text: comment
    }

    let post = this.posts.find(post => post.id === id)

    if (post) {
      post.comments.unshift(newComment)
    }
  }

  updateComment(editText: string, commentId: string, postId: string) {

    let findPost = this.posts.find(post => post.id === postId)
    let findComment = findPost!.comments.find(comment => comment.id === commentId)

    findComment!.date = new Date().toISOString()
    findComment!.text = editText

  }

  deleteComment(commentId: string, postId: string) {
    let findPost = this.posts.find(post => post.id === postId)

    findPost!.comments = findPost!.comments.filter(comment => comment.id !== commentId)
  }

  sendMessage(username: string, message: string) {

    let convoExist = this.user!.messages.find((msg: IConversation) => msg.users.includes(username))

    if (convoExist) {
      let newMessage: IMessage = {
        date: (new Date).toISOString(),
        user: this.user!.username,
        text: message
      }

      convoExist.conversation.unshift(newMessage)

      console.log(convoExist)
    }

    else {
      let newConvo: IConversation = {
        id: uuidv4(),
        users: [this.user!.username, username],
        conversation: [{
          date: (new Date).toISOString(),
          user: this.user!.username,
          text: message
        }],
        readBy: [this.user!.username]
      }

      this.user!.messages = [...this.user!.messages, newConvo]

      console.log(this.user!.messages)
    }

  }

}
