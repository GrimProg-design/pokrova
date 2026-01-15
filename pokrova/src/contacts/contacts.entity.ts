import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contacts')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  position: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text', nullable: true })
  bio: string; // Тут будут все данные: Сан, Даты, Образование
}