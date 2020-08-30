import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'app/services/post.service';
import { AppError } from 'app/common/app-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  posts: any[];
  constructor(private service: PostService) { 
    
  }

  ngOnInit(){
    this.service.get()
    .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
    let post = {title: input.value};
    this.posts.splice(0, 0, post);

    input.value = '';

    this.service.create(JSON.stringify(post))
        .subscribe(response => {
          post['id'] = response.json().id;
        },
        (error: AppError) => {
          this.posts.splice(0, 1);
          
          if (error instanceof AppError) {
            
          } else throw error;
        });
  }

  updatePost(post){
    this.service.put(post)
    .subscribe(response => {
      console.log(response.json());
    })
  }

  deletePost(post){
    this.service.remove(400)
      .subscribe(
        response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error: Response) => {
        if (error instanceof AppError)
        alert('this post deleted');
        else{
          throw error;
        }
      }
      )
  }

}
