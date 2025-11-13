import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { YoutubeService } from '../service/Youtube.service';
import { YoutubeVideo } from '../entity/YoutubeVideo.entity';
import { YoutubeComments } from '../entity/YoutubeComments.entity';
import { YoutubeCommentsScore } from '../entity/YoutubeCommentsScore.entity';

@ApiTags('YouTube')
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