import {initializeDataSource} from "@/db/DataSource";
import {NonConformity} from "@/entities/Entities";

export async function GET(request: Request): Promise<Response> {
    const nonConformityId = request.url.split('/').pop();
    const dataSource = await initializeDataSource();
    const nonConformityRepository = dataSource.getRepository(NonConformity);
    const nonConformity = await nonConformityRepository.findOne({
        where: {
            id: nonConformityId,
        },
        relations: ['question', 'escalations'],
    });

    if (!nonConformityId) {
        return new Response('', { status: 404 });
    }
    return new Response(JSON.stringify(nonConformity), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function PUT(request: Request): Promise<Response> {
    const nonConformityId = request.url.split('/').pop();
    let nonConformity = (await request.json()) as NonConformity;

    const dataSource = await initializeDataSource();
    const nonConformityRepository = dataSource.getRepository(NonConformity);
    const dbNonConformity = await nonConformityRepository.findOneBy({
        id: nonConformityId
    });
    if (!dbNonConformity) {
        return new Response('', { status: 404 });
    }

    dbNonConformity.update(nonConformity);
    nonConformity = await nonConformityRepository.save(dbNonConformity);

    return new Response(JSON.stringify(nonConformity), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function DELETE(request: Request): Promise<Response> {
    const nonConformityId = request.url.split('/').pop() ?? '';

    const dataSource = await initializeDataSource();
    const nonConformityRepository = dataSource.getRepository(NonConformity);
    const result = await nonConformityRepository.delete(nonConformityId)


    return new Response('', {
        status: Number(result.affected) > 0 ?  200: 404,
        headers: {'Content-Type': 'application/json'},
    });
}