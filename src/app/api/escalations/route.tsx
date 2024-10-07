import {Escalation} from "@/entities/Entities";
import {initializeDataSource} from "@/db/DataSource";
import {PagedResultDto} from "@/PagedResultDto";

export async function POST(request: Request): Promise<Response> {
    const escalation = (await request.json()) as Escalation;
    const dataSource = await initializeDataSource();
    const escalationRepository = dataSource.getRepository(Escalation);

    const newEscalation = escalationRepository.create(escalation);
    await escalationRepository.save(newEscalation);

    return new Response(JSON.stringify(newEscalation), {
        status: 201,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function GET(request: Request): Promise<Response> {
    const dataSource = await initializeDataSource();
    const escalationRepository = dataSource.getRepository(Escalation);

    const escalations = await escalationRepository.findAndCount({
        order: {
            date: 'ASC'
        }
    });

    return new Response(JSON.stringify(new PagedResultDto<Escalation>(escalations[1], escalations[0])), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}