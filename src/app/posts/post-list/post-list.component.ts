import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material/paginator';
 
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;
  totalPost = 10;
  postsPerPage = 2;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1;
  constructor(public postsService: PostsService) {}
  
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage,1);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }
  onDeletePost(postId:any){
    this.postsService.deletePost(postId) ;
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onChangedPage(pageData:PageEvent){
    this.currentPage = pageData.pageIndex+1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage)
  }
}
