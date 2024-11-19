import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {DatatableComponent} from "./shared/datatable/datatable.component";
import {SortModel} from "./shared/datatable/models/sort.model";
import {ColumnModel} from "./shared/datatable/models/column.model";
import {AccountFilterModel} from "./account/models/account-filter.model";
import {DataPagingModel} from "./account/data-paging.model";
import {AccountModel} from "./account/models/account.model";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatatableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-data-table';

  data: any[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 20;
  columns: ColumnModel[] = [];
  pageSizeOptions: number[] = [20, 50, 100];

  constructor(private http: HttpClient) {
    this.columns = [
      new ColumnModel('id', 'Id', true),
      new ColumnModel('fullname', 'Name', true),
      new ColumnModel('email', 'Email', true),
      new ColumnModel('phoneNumber', 'Phone Number', true),
      new ColumnModel('avatar', 'Avatar', false, true),
      new ColumnModel('gender', 'Gender', true),
    ];
    this.loadData();
  }

  loadData(): void {
    const params: AccountFilterModel =  {
      page: this.currentPage,
      limit: this.pageSize,
      email: null,
      fullName: null,
      avatar: null,
      gender: null,
      phoneNumber: null,
    };

    this.http.post<DataPagingModel<AccountModel>>('http://localhost:5274/api/account', params)
      .subscribe((response) => {
        this.totalItems = response.paginationCount;
        this.data = response.data;
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  onSearch(search: string): void {
    console.log(search);
  }

  onSort(sort: SortModel): void {
    console.log(sort);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.loadData();
  }
}
