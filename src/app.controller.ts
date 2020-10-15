import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PostComment } from './view-models'

@Controller('posts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/top')
  getTopPosts(){
    return this.appService.getTopPosts();
  }

  @Post('/comments')
  searchComments(@Body() filter: PostComment) {
    return this.appService.searchComments(filter);
  }
}
