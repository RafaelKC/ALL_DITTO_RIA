import {Question} from "@/entities/Entities";
import React, {useState} from "react";

type QuestionListProps = {
    questions: Question[];
}

export const QuestionList: React.FC<QuestionListProps> = ({ questions }: QuestionListProps) => {
    const [question, setQuestion] = useState<Question[]>(questions);

    return questions.length  <= 0 ? <h1>No data here</h1> :  (<>

    </>);
}