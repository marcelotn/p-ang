export module Pagination {

    export interface IPaginatedResult<T> {
        rows: T[],
        totalElements: number,
        totalPages: number,
        itemsPerPage: number
    }
    
}