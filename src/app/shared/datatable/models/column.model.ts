export class ColumnModel {
  key: string;
  title: string;
  sortable?: boolean;
  isImage?: boolean;
  sortIcon?: string;

  constructor(key: string, title: string, sortable?: boolean, isImage?: boolean) {
    this.key = key;
    this.title = title;
    this.sortable = sortable;
    this.isImage = isImage;
    this.sortIcon = 'assets/icons/sort-icon.png';
  }
}
