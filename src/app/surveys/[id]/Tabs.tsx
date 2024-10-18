import {Tab} from "@nextui-org/react";
import {Graph} from "@/app/surveys/[id]/Graph";
import React, {useEffect, useState} from "react";
import {Tabs} from "@nextui-org/tabs";
import {Question} from "@/entities/Entities";
import {getQuestions} from "@/functions/questions";
import {Loading} from "@/components/Lodding";

type TabsSurveyProps =  {
    surveysId: string;
}

export const TabsSurvey: React.FC<TabsSurveyProps> = ({ surveysId, ...props }) => {
    const [ questions, setQuestions ] = useState<Question[]>([]);
    const [ loaded, setLoaded ] = useState<boolean>(false);

    const getQuestionsFromAPI = async () => {
        const questions = await getQuestions(surveysId);
        setQuestions(questions.items);
    }

    useEffect(() => {
        getQuestionsFromAPI().then(() => setLoaded(true));
    }, []);


    return (
        <Loading loaded={loaded} >
            <Tabs aria-label="Options" {...props}>
                <Tab key="Stats" title="Stats" className="w-full">
                    <Graph questions={questions}/>
                </Tab>
                <Tab key="questions" title="Questions" className="w-full">
                </Tab>
                <Tab key="ncs" title="NCs" className="w-full">
                </Tab>
            </Tabs>
        </Loading>
    )
}