import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    monday: string;

    @Column()
    tuesday: string;

    @Column()
    wednesday: string;

    @Column()
    thursday: string;

    @Column()
    friday: string;

    @Column()
    saturday: string;

    @Column()
    sunday: string;
}
