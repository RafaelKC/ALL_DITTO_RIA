import {initializeDataSource} from "@/db/DataSource";
import {PagedResultDto} from "@/PagedResultDto";
import {Survey} from "@/entities/Entities";

export async function POST(request: Request): Promise<Response> {
    const survey = (await request.json()) as Survey;
    const dataSource = await initializeDataSource();
    const surveyRepository = dataSource.getRepository(Survey);

    const newSurvey = surveyRepository.create(survey);
    await surveyRepository.save(newSurvey);

    return new Response(JSON.stringify(newSurvey), {
        status: 201,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const params = url.searchParams;

    const filterTemplates = params.has('template');
    let mustBeTemplate = false;
    if (filterTemplates) {
        mustBeTemplate = Boolean(Number(params.get('template')));
    }


    const dataSource = await initializeDataSource();
    const surveyRepository = dataSource.getRepository(Survey);

    const surveys = await surveyRepository.findAndCount({
        order: {
            date: 'ASC',
            name: 'ASC'
        },
        where: {
            template: filterTemplates ? mustBeTemplate : undefined
        }
    });

    return new Response(JSON.stringify(new PagedResultDto<Survey>(surveys[1], surveys[0])), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}