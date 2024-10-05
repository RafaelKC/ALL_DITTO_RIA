import {NcClassification} from "@/entities/NcClassification";
import {initializeDataSource} from "@/db/data-source";

export async function POST(request: Request) {
    console.log(`adas`)
    const classification = (await request.json()) as NcClassification;
    const dataSource = await initializeDataSource();
    const classificationRepository = dataSource.getRepository(NcClassification);

    const newClassification = classificationRepository.create(classification);
    await classificationRepository.save(newClassification);

    return new Response(JSON.stringify(newClassification), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    });
}