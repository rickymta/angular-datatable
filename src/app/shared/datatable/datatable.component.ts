import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ColumnModel} from "./models/column.model";
import {SortModel} from "./models/sort.model";

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent {
  sortModel: SortModel = new SortModel('', 0);

  // Để lưu trữ trạng thái tìm kiếm từng cột
  columnSearch: { [key: string]: string } = {};

  // Key của cột có dropdown mở
  dropdownOpen: string | null = null;

  @Input() totalItems: number = 0;        // Tổng số bản ghi
  @Input() currentPage: number = 1;        // Trang hiện tại
  @Input() data: any[] = [];               // Dữ liệu của trang hiện tại
  @Input() columns: ColumnModel[] = [];
  @Input() pageSizeOptions: number[] = [10, 20, 50, 100]; // Các tùy chọn số lượng bản ghi mỗi trang
  @Input() pageSize: number = 10; // Số lượng bản ghi mặc định mỗi trang

  @Output() pageChange = new EventEmitter<number>();  // Event chuyển trang
  @Output() search = new EventEmitter<string>();      // Event tìm kiếm
  @Output() sort = new EventEmitter<SortModel>(); // Event sắp xếp
  @Output() pageSizeChange = new EventEmitter<number>(); // Sự kiện thay đổi số lượng bản ghi

  // Cập nhật phân trang khi thay đổi số lượng bản ghi
  onPageSizeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.pageSize = +value;
    this.pageSizeChange.emit(this.pageSize);
    this.pageChange.emit(1); // Quay lại trang đầu tiên
  }

  totalPage: number = 0;
  pages: any[] = [];

  constructor() {
    this.updatePagination();  // Cập nhật phân trang khi khởi tạo
  }

  ngOnChanges(): void {
    this.updatePagination();  // Cập nhật phân trang khi có thay đổi đầu vào
  }

  // Cập nhật phân trang dựa trên tổng số bản ghi và trang hiện tại
  updatePagination(): void {
    this.totalPage = Math.ceil(this.totalItems / this.pageSize);
    this.pages = [];

    if (this.totalPage <= 7) {
      for (let i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    } else {
      let startPage: number, endPage: number;

      if (this.currentPage === 1) {
        startPage = 1;
        endPage = Math.min(6, this.totalPage);
      } else if (this.currentPage === this.totalPage) {
        startPage = Math.max(this.totalPage - 5, 1);
        endPage = this.totalPage;
        this.pages.unshift(this.totalPage - 5);
      } else {
        startPage = Math.max(this.currentPage - 3, 1);
        endPage = Math.min(this.currentPage + 3, this.totalPage);
      }

      for (let i = startPage; i <= endPage; i++) {
        this.pages.push(i);
      }

      if (startPage > 1) {
        this.pages.unshift('...');
      }
      if (endPage < this.totalPage) {
        this.pages.push('...');
      }

      if (!this.pages.includes(1)) {
        this.pages.unshift(1);
      }
      if (!this.pages.includes(this.totalPage)) {
        this.pages.push(this.totalPage);
      }
    }
  }

  // Xử lý khi người dùng chuyển trang
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPage && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  // Xử lý sự kiện tìm kiếm
  onSearch(query: string): void {
    this.search.emit(query);
  }

  // Xử lý sự kiện sắp xếp
  onSort(column: string, direction: -1 | 0 | 1): void {
    let columnModel = this.columns.find((c) => c.key === column);

    if (direction === 0) {
      columnModel!.sortIcon = 'assets/icons/sort-icon.png';
      this.sortModel.direction = 1;
    } else if (direction === 1) {
      columnModel!.sortIcon = 'assets/icons/sort-asc.png';
      this.sortModel.direction = -1;
    } else {
      columnModel!.sortIcon = 'assets/icons/sort-desc.png';
      this.sortModel.direction = 0;
    }

    this.sort.emit({ column, direction });
  }

  // Hàm mở hoặc đóng dropdown
  toggleDropdown(columnKey: string): void {
    this.dropdownOpen = this.dropdownOpen === columnKey ? null : columnKey;
  }

  // Hàm xử lý tìm kiếm theo cột
  onColumnSearch(columnKey: string): void {
    const searchValue = this.columnSearch[columnKey];
    console.log(`Search for column: ${columnKey}, value: ${searchValue}`);
    // Gửi sự kiện hoặc gọi API tìm kiếm theo cột
    // Ví dụ: this.columnSearchEvent.emit({ column: columnKey, value: searchValue });
  }
}
