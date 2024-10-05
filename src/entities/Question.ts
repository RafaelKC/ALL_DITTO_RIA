import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {QuestionStatus} from "@/enums/QuestionStatus";
import {Survey} from "@/entities/Survey";
import {NcClassification} from "@/entities/NcClassification";

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        length: 450,
    })
    public description: string;

    @Column({
        type: 'enum',
        enum: QuestionStatus,
        default: QuestionStatus.Empty
    })
    public status: QuestionStatus = QuestionStatus.Empty;

    @Column({
        length: 255,
    })
    public responsible: string;

    @Column({ default: false })
    public recurrence: boolean;

    @Column({
        length: 450,
    })
    public note: string;

    @Column({
        length: 450,
    })
    public correctiveAction: string;

    @Column({
        length: 255,
    })
    public artifact: string;

    @Column('uuid')
    public ncClassificationId?: string;
    @ManyToOne(() => NcClassification)
    public ncClassification?: NcClassification;

    @Column('uuid')
    public surveyId: string;
    @ManyToOne(() => Survey)
    public survey: Survey;
}