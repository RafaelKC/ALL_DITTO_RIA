import {Survey} from "@/entities/Entities";

export async function getSurveyById(id: string): Promise<Survey | null> {
   return await fetch(`http://localhost:3000/api/surveys/${id}`)
       .then(res =>  res.ok ? res.json() as unknown as Survey : null);
}

export async function updateSurvey(id: string, survey: Survey): Promise<Survey | null> {
   return await fetch(`http://localhost:3000/api/surveys/${id}`, { method: 'PUT', body: JSON.stringify(survey) })
       .then(res =>  res.ok ? res.json() as unknown as Survey : null);
}

export async function createSurvey(survey: Survey): Promise<Survey | null> {
   return await fetch(`http://localhost:3000/api/surveys`, { method: 'POST', body: JSON.stringify(survey) })
       .then(res =>  res.ok ? res.json() as unknown as Survey : null);
}