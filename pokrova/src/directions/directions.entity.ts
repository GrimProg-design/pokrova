import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('directions')
export class DirectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column() 
  imagePath: string;

  @Column({ nullable: true }) // Доп. фото 1
  innerImage1: string;

  @Column({ nullable: true }) // Доп. фото 2
  innerImage2: string;

  @Column()
  category: string;
}