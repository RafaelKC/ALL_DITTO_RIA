import {initializeDataSource} from "@/db/DataSource";
import {Question} from "@/entities/Entities";

export async function GET(request: Request): Promise<Response> {
    const questionId = request.url.split('/').pop();
    const dataSource = await initializeDataSource();
    const questionRepository = dataSource.getRepository(Question);
    const question = await questionRepository.findOne({
        where: {
            id: questionId,
        },
        relations: ['ncClassification']
    });

    if (!questionId) {
        return new Response('', { status: 404 });
    }
    return new Response(JSON.stringify(question), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function PUT(request: Request): Promise<Response> {
    const questionId = request.url.split('/').pop();
    let question = (await request.json()) as Question;

    const dataSource = await initializeDataSource();
    const questionRepository = dataSource.getRepository(Question);
    const dbQuestion = await questionRepository.findOneBy({
        id: questionId
    });
    if (!dbQuestion) {
        return new Response('', { status: 404 });
    }

    dbQuestion.update(question);
    question = await questionRepository.save(dbQuestion);

    return new Response(JSON.stringify(question), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function DELETE(request: Request): Promise<Response> {
    const questionId = request.url.split('/').pop() ?? '';

    const dataSource = await initializeDataSource();
    const questionRepository = dataSource.getRepository(Question);
    const result = await questionRepository.delete(questionId)


    return new Response('', {
        status: Number(result.affected) > 0 ?  200: 404,
        headers: {'Content-Type': 'application/json'},
    });
}