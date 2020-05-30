import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  mode ='create';
  postId:string;
  post:Post;
  isLoading = false ;

  constructor(public postsService: PostsService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((map:ParamMap)=>{
      if(map.has('id')){
        this.mode='edit';
        this.postId = map.get('id');
        this.isLoading= true;
        this.postsService.getPost(this.postId).subscribe(post=>{
          this.isLoading = false;
          this.post = {id:post._id,title:post.title,content:post.content};
        });
      }else {
        this.mode = 'create';
        this.postId = null ;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode=="create"){
      this.postsService.addPost(form.value.title, form.value.content);
    }else {
      this.postsService.updatePost(this.postId,form.value.title, form.value.content);
    }
   
    form.resetForm();
  }
}
