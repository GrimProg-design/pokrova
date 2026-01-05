import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('directions')
export class DirectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  imagePath: string;

  @Column()
  category: string;
}