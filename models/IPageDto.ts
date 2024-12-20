export interface IPageDto<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
}