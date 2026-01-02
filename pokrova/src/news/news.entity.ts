import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum NewsType {
  MAIN = 'main',
  COSSACK = 'cossack',
  CONSTRUCTION = 'construction',
}

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  data: string;

  @Column({ nullable: true })
  imagePath?: string;

  @Column({ nullable: true })
  videoPath?: string;

  @Column({ type: 'enum', enum: NewsType })
  type: NewsType;

  @CreateDateColumn()
  createdAt: Date;
}
