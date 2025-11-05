import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { YoutubeVideo } from '../entity/YoutubeVideo.entity';
import { YoutubeComments } from '../entity/YoutubeComments.entity';
import { YoutubeCommentsScore } from '../entity/YoutubeCommentsScore.entity';

@Injectable()
export class YoutubeService {
  constructor(private readonly dataSource: DataSource) {}

  async findAllVideos(): Promise<YoutubeVideo[]> {
    return this.dataSource.manager.find(YoutubeVideo);
  }

  async findAllComments(): Promise<YoutubeComments[]> {
    return this.dataSource.manager.find(YoutubeComments);
  }

  async findAllCommentsScore(): Promise<YoutubeCommentsScore[]> {
    return this.dataSource.manager.find(YoutubeCommentsScore);
  }
}