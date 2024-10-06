import {initializeDataSource} from "@/db/DataSource";
import {NcClassification} from "@/entities/NcClassification";

export async function GET(request: Request): Promise<Response> {
    const classificationId = request.url.split('/').pop();
    const dataSource = await initializeDataSource();
    const classificationRepository = dataSource.getRepository(NcClassification);
    const classification = await classificationRepository.findOneBy({
        id: classificationId
    });

    if (!classificationId) {
        return new Response('', { status: 404 });
    }
    return new Response(JSON.stringify(classification), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function PUT(request: Request): Promise<Response> {
    const classificationId = request.url.split('/').pop();
    let classification = (await request.json()) as NcClassification;

    const dataSource = await initializeDataSource();
    const classificationRepository = dataSource.getRepository(NcClassification);
    const dbClassification = await classificationRepository.findOneBy({
        id: classificationId
    });
    if (!dbClassification) {
        return new Response('', { status: 404 });
    }

    dbClassification.update(classification);
    classification = await classificationRepository.save(dbClassification);

    return new Response(JSON.stringify(classification), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function DELETE(request: Request): Promise<Response> {
    const classificationId = request.url.split('/').pop() ?? '';
    let classification = (await request.json()) as NcClassification;

    const dataSource = await initializeDataSource();
    const classificationRepository = dataSource.getRepository(NcClassification);
    const result = await classificationRepository.delete(classificationId)


    return new Response('', {
        status: Number(result.affected) > 0 ?  200: 404,
        headers: {'Content-Type': 'application/json'},
    });
}