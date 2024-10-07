import {Question} from "@/entities/Entities";
import {initializeDataSource} from "@/db/DataSource";
import {PagedResultDto} from "@/PagedResultDto";

export async function POST(request: Request): Promise<Response> {
    const question = (await request.json()) as Question;
    const dataSource = await initializeDataSource();
    const questionRepository = dataSource.getRepository(Question);

    const newQuestion = questionRepository.create(question);
    await questionRepository.save(newQuestion);

    return new Response(JSON.stringify(newQuestion), {
        status: 201,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function GET(request: Request): Promise<Response> {
    const dataSource = await initializeDataSource();
    const questionRepository = dataSource.getRepository(Question);

    const questions = await questionRepository.findAndCount({
        order: {
            order: "ASC"
        },
        relations: ['ncClassification']
    });

    return new Response(JSON.stringify(new PagedResultDto<Question>(questions[1], questions[0])), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}