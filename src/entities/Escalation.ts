import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Escalation {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('date')
    public date: Date;

    @Column({
        length: 255
    })
    public escalatedTo: string;

    @Column('uuid')
    public ncId: string;
}