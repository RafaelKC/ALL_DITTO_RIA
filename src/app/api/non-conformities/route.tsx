import {NonConformity} from "@/entities/Entities";
import {initializeDataSource} from "@/db/DataSource";
import {PagedResultDto} from "@/PagedResultDto";

export async function POST(request: Request): Promise<Response> {
    const nonConformity = (await request.json()) as NonConformity;
    const dataSource = await initializeDataSource();
    const nonConformityRepository = dataSource.getRepository(NonConformity);

    const newNonConformity = nonConformityRepository.create(nonConformity);
    await nonConformityRepository.save(newNonConformity);

    return new Response(JSON.stringify(newNonConformity), {
        status: 201,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function GET(request: Request): Promise<Response> {
    const dataSource = await initializeDataSource();
    const nonConformityRepository = dataSource.getRepository(NonConformity);

    const nonConformities = await nonConformityRepository.findAndCount({
        relations: ['question', 'escalations'],
        order: {
            question: {
                order: "ASC"
            }
        }
    });

    return new Response(JSON.stringify(new PagedResultDto<NonConformity>(nonConformities[1], nonConformities[0])), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}