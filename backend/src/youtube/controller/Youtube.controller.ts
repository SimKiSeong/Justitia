import { Controller, Get } from '@nestjs/common';
import { YoutubeService } from '../service/youtube.service';
import { YoutubeVideo } from '../entity/YoutubeVideo.entity';
import { YoutubeComments } from '../entity/YoutubeComments.entity';
import { YoutubeCommentsScore } from '../entity/YoutubeCommentsScore.entity';

@Controller('youtube')
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get('videos')
  async findAllVideos(): Promise<YoutubeVideo[]> {
    return this.youtubeService.findAllVideos();
  }

  @Get('comments')
  async findAllComments(): Promise<YoutubeComments[]> {
    return this.youtubeService.findAllComments();
  }

  @Get('comments-score')
  async findAllCommentsScore(): Promise<YoutubeCommentsScore[]> {
    return this.youtubeService.findAllCommentsScore();
  }
}