export class SortModel {
  column: string;
  direction: -1 | 0 | 1;

  constructor(column: string, direction: -1 | 0 | 1) {
    this.column = column;
    this.direction = direction;
  }
}
