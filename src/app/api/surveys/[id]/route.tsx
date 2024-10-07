import {initializeDataSource} from "@/db/DataSource";
import {Survey} from "@/entities/Entities";

export async function GET(request: Request): Promise<Response> {
    const surveyId = request.url.split('/').pop();
    const dataSource = await initializeDataSource();
    const surveyRepository = dataSource.getRepository(Survey);
    const survey = await surveyRepository.findOneBy({
        id: surveyId
    });

    if (!surveyId) {
        return new Response('', { status: 404 });
    }
    return new Response(JSON.stringify(survey), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function PUT(request: Request): Promise<Response> {
    const surveyId = request.url.split('/').pop();
    let survey = (await request.json()) as Survey;

    const dataSource = await initializeDataSource();
    const surveyRepository = dataSource.getRepository(Survey);
    const dbSurvey = await surveyRepository.findOneBy({
        id: surveyId
    });
    if (!dbSurvey) {
        return new Response('', { status: 404 });
    }

    dbSurvey.update(survey);
    survey = await surveyRepository.save(dbSurvey);

    return new Response(JSON.stringify(survey), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function DELETE(request: Request): Promise<Response> {
    const surveyId = request.url.split('/').pop() ?? '';

    const dataSource = await initializeDataSource();
    const surveyRepository = dataSource.getRepository(Survey);
    const result = await surveyRepository.delete(surveyId)


    return new Response('', {
        status: Number(result.affected) > 0 ?  200: 404,
        headers: {'Content-Type': 'application/json'},
    });
}