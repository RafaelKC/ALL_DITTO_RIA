import {Question} from "@/entities/Entities";
import {PagedResultDto} from "@/PagedResultDto";

export async function getQuestions(surveyId: string | undefined = undefined): Promise<PagedResultDto<Question>> {
   let route = 'http://localhost:3000/api/questions';
   if (surveyId) {
      route += `?survey=${surveyId}`;
   }

   return await fetch(route)
       .then((res) => res.json() as unknown as PagedResultDto<Question>);
}
//
// export async function updateSurvey(id: string, survey: Survey): Promise<Survey | null> {
//    return await fetch(`http://localhost:3000/api/surveys/${id}`, { method: 'PUT', body: JSON.stringify(survey) })
//        .then(res =>  res.ok ? res.json() as unknown as Survey : null);
// }
//
// export async function createSurvey(survey: Survey): Promise<Survey | null> {
//    return await fetch(`http://localhost:3000/api/surveys`, { method: 'POST', body: JSON.stringify(survey) })
//        .then(res =>  res.ok ? res.json() as unknown as Survey : null);
// }