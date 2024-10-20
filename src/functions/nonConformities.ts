import { NonConformity } from "@/entities/Entities";
import { PagedResultDto } from "@/PagedResultDto";

export async function getNonConfirmities(surveyId: string | undefined = undefined): Promise<PagedResultDto<NonConformity>> {
    let route = 'http://localhost:3000/api/non-conformities';
    if (surveyId) {
       route += `?surveyId=${surveyId}`;
    }
 
    return await fetch(route)
        .then((res) => res.json() as unknown as PagedResultDto<NonConformity>);
 }