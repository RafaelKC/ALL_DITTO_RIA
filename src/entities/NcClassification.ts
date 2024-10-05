import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('ncclassification')
export class NcClassification {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        length: 255,
    })
    public name: string;

    @Column({
        length: 50,
    })
    public color: string;

    @Column()
    public order: number;

    @Column()
    public daysToResolve: number;
}