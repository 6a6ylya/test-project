export interface BodyRequest {
    url: string;
    header?: {
        authorization?: string
    },
    json?: any,
    form?: any,
    qs?: any
}
