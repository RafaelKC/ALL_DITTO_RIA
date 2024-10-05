import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('survey')
export class Survey {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ default: false })
    public template: boolean;

    @Column({
        length: 255,
    })
    public name: string;

    @Column('date')
    public date: Date;

    @Column({
        length: 255,
    })
    public responsible: string;

    @Column({
        length: 255,
    })
    public objectName: string;

    @Column({
        length: 255,
    })
    public objectUrl: string;
}