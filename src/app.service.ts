import { Injectable, HttpService } from '@nestjs/common';
import { Post, PostComment, TopPost } from './view-models';
import { reduce, max, min, pipe, prop, map, pluck, sum, groupBy } from 'ramda';

@Injectable()
export class AppService {
  posts: Post[];
  comments: PostComment[];
  
  constructor(private http: HttpService) {
    http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res) => {
        this.posts = res.data;
      });
    
    http.get<PostComment[]>('https://jsonplaceholder.typicode.com/comments')
      .subscribe((res) => {
        this.comments = res.data;
      })
  }

  getTopPosts() {
    const posts = this.posts.map<TopPost>(post => {
      return {
        post_id: post.id,
        post_body: post.body,
        post_title: post.title,
        total_number_of_comments: this.comments.filter(c => c.postId === post.id).length
      }
    });

    const highestCommentCount = reduce(max, -Infinity, posts.map(p => p.total_number_of_comments));
    return posts.filter(p => p.total_number_of_comments === highestCommentCount);
  }

  searchComments(filter: PostComment) {
    var comments = this.comments;

    if (!filter) {
      return comments;
    }

    const { body, email, id, postId, name } = filter;
    if (body && body !== '') {
      comments = comments.filter(c => c.body === body);
    }

    if (email && email !== '') {
      comments = comments.filter(c => c.email === email);
    }

    if (id) {
      comments = comments.filter(c => c.id === id);
    }

    if (postId) {
      comments = comments.filter(c => c.postId === postId);
    }

    if (name && name !== '') {
      comments = comments.filter(c => c.name === name);
    }

    return comments;
  }
}
