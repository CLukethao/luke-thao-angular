import { Component, OnInit, Input } from '@angular/core';
import {IPost} from "../interfaces/IPost";
import {DataService} from "../data.service";


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!: IPost;
  username!: string;

  editingPost: boolean = false
  editTitle!: string;
  editDescription!: string;

  viewComments: boolean = false;
  showSubmit: boolean = false
  comment!: string

  throwError!: string


  constructor(private dataService: DataService) {
    this.username = this.dataService.user!.username
  }

  ngOnInit(): void {
  }


  showComments() {
    this.viewComments = !this.viewComments
  }

  showSubmitBtn() {
    this.showSubmit = true
  }

  hideSubmit(event: any) {
    if (event.relatedTarget) {
    }

    else {
      this.showSubmit = false
      this.throwError = ''
    }
  }

  onSubmit() {
    if (this.comment) {
      this.dataService.addComment(this.comment, this.post.id)
      this.showSubmit = false
      this.comment = ''
    }

    else {
      this.throwError = 'Comment must have 1 or more characters'
    }

  }

  onEditPost() {
    this.editTitle = this.post.title
    this.editDescription = this.post.description
    this.editingPost = true
  }

  onDiscard() {
    this.throwError = ''
    this.editTitle = '';
    this.editDescription = ''
    this.editingPost = false
  }

  onDelete() {
    this.dataService.deletePost(this.post.id)

  }

  onSave() {
    if (this.editTitle && this.editDescription) {
      this.dataService.updatePost(this.editTitle, this.editDescription, this.post.id)

      this.onDiscard()

    }

    else {
      this.throwError = 'Title and Description must have 1 or more characters'
    }
  }

}
