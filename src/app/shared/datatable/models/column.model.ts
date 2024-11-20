export class ColumnModel {
  key: string;
  title: string;
  sortable?: boolean;
  isImage?: boolean;
  sortIcon?: string;
  searchable?: boolean;

  constructor(key: string, title: string, sortable?: boolean, isImage?: boolean, searchable?: boolean) {
    this.key = key;
    this.title = title;
    this.sortable = sortable;
    this.isImage = isImage;
    this.sortIcon = 'assets/icons/sort-icon.png';
    this.searchable = searchable;
  }
}
