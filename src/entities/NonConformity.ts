import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Question} from "@/entities/Question";

@Entity()
export class NonConformity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column('date')
    public finalResolutionDate?: Date;

    @Column('date')
    public lastResolutionDate?: Date;

    @Column({ default: false })
    public resolved: boolean;

    @Column('uuid')
    public questionId: string;
    @OneToOne(type => Question)
    public question: Question;
}