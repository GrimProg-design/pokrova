import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getHello() {
    const newPost = this.postRepository.create({
      title: `Пост №${Math.floor(Math.random() * 1000)}`,
    });
    await this.postRepository.save(newPost);
    return newPost;
  }
}
