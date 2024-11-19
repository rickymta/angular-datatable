import { Component, Input, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss'
})
export class DatatableComponent implements OnInit{
  @Input() columns: string[] = [];
  @Input() data: any[] = [];

  pageSizeOptions: number[] = [20, 50, 100];
  pageSize: number = 20;
  currentPage: number = 1;
  paginatedData: any[] = [];
  totalItems: number = 0;
  totalPage: number = 0;

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  pages: any[] = [];
  searchText: string = '';
  columnSearch: { [key: string]: string } = {};

  searchColumnIndex: number | null = null;

  constructor() {}

  ngOnInit(): void {
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalItems = this.data.length;
    this.totalPage = Math.ceil(this.totalItems / this.pageSize);
    this.pages = [];

    const maxPagesToShow = 5; // Giới hạn số trang hiển thị (số lượng trang muốn hiển thị trước khi dùng dấu ba chấm)

    // Nếu số trang quá lớn, sử dụng dấu ba chấm
    if (this.totalPage <= maxPagesToShow) {
      // Nếu tổng số trang ít hơn hoặc bằng maxPagesToShow, hiển thị tất cả các trang
      for (let i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    } else {
      const halfRange = Math.floor(maxPagesToShow / 2);
      let startPage: number, endPage: number;

      // Logic khi ở giữa (không phải trang đầu và cuối)
      if (this.currentPage <= halfRange) {
        startPage = 2;
        endPage = Math.min(maxPagesToShow, this.totalPage - 1); // Tránh vượt quá tổng số trang
      } else if (this.currentPage >= this.totalPage - halfRange) {
        startPage = Math.max(this.totalPage - maxPagesToShow + 1, 2); // Đảm bảo không vượt quá trang cuối
        endPage = this.totalPage - 1;
      } else {
        startPage = this.currentPage - halfRange;
        endPage = this.currentPage + halfRange;
      }

      // Thêm các trang vào mảng
      for (let i = startPage; i <= endPage; i++) {
        this.pages.push(i);
      }

      // Thêm dấu ba chấm nếu cần thiết ở phía đầu hoặc cuối
      if (startPage > 2) {
        this.pages.unshift('...');
      }

      if (endPage < this.totalPage - 1) {
        this.pages.push('...');
      }

      // Luôn hiển thị trang đầu và trang cuối
      if (!this.pages.includes(1)) {
        this.pages.unshift(1);
      }
      if (!this.pages.includes(this.totalPage)) {
        this.pages.push(this.totalPage);
      }
    }

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.filteredData().slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  changePageSize(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.pageSize = +value; // Ép kiểu sang số nguyên
    this.currentPage = 1; // Quay lại trang đầu
    this.updatePagination();
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      // Đảo ngược hướng sắp xếp nếu click cùng một cột
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Thiết lập cột và hướng sắp xếp mới
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Sắp xếp dữ liệu
    this.data.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (valA < valB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valA > valB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.currentPage = 1; // Quay lại trang đầu
    this.updatePagination(); // Cập nhật dữ liệu phân trang
  }

  onColumnSearch(event: Event, column: string): void {
    this.columnSearch[column] = (event.target as HTMLInputElement).value;
    this.updatePagination();
  }

  filteredData(): any[] {
    return this.data.filter(row => {
      if (this.searchText) {
        return Object.values(row).some(val =>
          String(val).toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
      return Object.keys(this.columnSearch).every(key => {
        if (this.columnSearch[key]) {
          return String(row[key]).toLowerCase().includes(this.columnSearch[key].toLowerCase());
        }
        return true;
      });
    });
  }

  protected readonly Math = Math;
  protected readonly HTMLSelectElement = HTMLSelectElement;
}
