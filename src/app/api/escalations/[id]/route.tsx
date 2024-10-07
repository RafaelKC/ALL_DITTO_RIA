import {initializeDataSource} from "@/db/DataSource";
import {Escalation} from "@/entities/Entities";

export async function GET(request: Request): Promise<Response> {
    const escalationId = request.url.split('/').pop();
    const dataSource = await initializeDataSource();
    const escalationRepository = dataSource.getRepository(Escalation);
    const escalation = await escalationRepository.findOneBy({
        id: escalationId
    });

    if (!escalationId) {
        return new Response('', { status: 404 });
    }
    return new Response(JSON.stringify(escalation), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function DELETE(request: Request): Promise<Response> {
    const escalationId = request.url.split('/').pop() ?? '';

    const dataSource = await initializeDataSource();
    const escalationRepository = dataSource.getRepository(Escalation);
    const result = await escalationRepository.delete(escalationId)

    return new Response('', {
        status: Number(result.affected) > 0 ?  200: 404,
        headers: {'Content-Type': 'application/json'},
    });
}