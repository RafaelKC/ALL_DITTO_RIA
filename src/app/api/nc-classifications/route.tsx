import {NcClassification} from "@/entities/NcClassification";
import {initializeDataSource} from "@/db/DataSource";
import {PagedResultDto} from "@/PagedResultDto";

export async function POST(request: Request): Promise<Response> {
    const classification = (await request.json()) as NcClassification;
    const dataSource = await initializeDataSource();
    const classificationRepository = dataSource.getRepository(NcClassification);

    const newClassification = classificationRepository.create(classification);
    await classificationRepository.save(newClassification);

    return new Response(JSON.stringify(newClassification), {
        status: 201,
        headers: {'Content-Type': 'application/json'},
    });
}

export async function GET(request: Request): Promise<Response> {
    const dataSource = await initializeDataSource();
    const classificationRepository = dataSource.getRepository(NcClassification);

    const classifications = await classificationRepository.findAndCount({
        order: {
            order: 'ASC'
        }
    });

    return new Response(JSON.stringify(new PagedResultDto<NcClassification>(classifications[1], classifications[0])), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}