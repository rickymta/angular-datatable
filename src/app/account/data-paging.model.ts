export class DataPagingModel<T> {
  paginationCount: number;
  data: T[];

  constructor(paginationCount: number, data: T[]) {
    this.paginationCount = paginationCount;
    this.data = data;
  }
}
