export class PagedResultDto<T> {
    public totalCount: number;
    public items: T[]

    constructor(totalCount: number, items: T[]) {
        this.totalCount = totalCount;
        this.items = items;
    }
}
