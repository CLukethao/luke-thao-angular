import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {IComment} from "../interfaces/IPost";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment!: IComment;
  @Input() postId!: string;

  username!: string;

  editing: boolean = false
  editText!: string;

  throwError!: string

  constructor(private dataService: DataService) {
    this.username = dataService.user!.username
  }

  ngOnInit(): void {
  }

  onEdit() {
    this.editText = this.comment.text
    this.editing = true
  }

  onDiscard() {
    this.editing = false
  }

  onSave() {
    if (this.editText) {
      this.dataService.updateComment(this.editText, this.comment.id, this.postId)
      this.editing = false
      this.throwError = ''
    }

    else {
      this.throwError = 'Comment must have more than 1 character'
    }

  }

  onDelete() {
    this.dataService.deleteComment(this.comment.id, this.postId)
  }


}
