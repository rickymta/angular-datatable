import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {DatatableComponent} from "./shared/datatable/datatable.component";
import {SortModel} from "./shared/datatable/models/sort.model";
import {ColumnModel} from "./shared/datatable/models/column.model";
import {AccountFilterModel} from "./account/models/account-filter.model";
import {DataPagingModel} from "./account/data-paging.model";
import {AccountModel} from "./account/models/account.model";
import {AccountSortModel} from "./account/models/account-sort.model";

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
      new ColumnModel('id', 'Id', true, false, true),
      new ColumnModel('fullname', 'Name', true, false, true),
      new ColumnModel('email', 'Email', true, false, true),
      new ColumnModel('phoneNumber', 'Phone Number', true, false, true),
      new ColumnModel('avatar', 'Avatar', false, true, false),
      new ColumnModel('gender', 'Gender', false, false, false),
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
    let accountSort: AccountSortModel = new AccountSortModel(sort.direction);
    if (sort.direction === 0) {
      accountSort = new AccountSortModel(0);
    } else {
      switch (sort.column) {
        case 'id':
          accountSort.id = true;
          break;
        case 'fullname':
          accountSort.fullName = true;
          break;
        case 'email':
          accountSort.email = true;
          break;
        case 'phoneNumber':
          accountSort.phoneNumber = true;
          break;
        case 'avatar':
          accountSort.avatar = true;
          break;
        case 'gender':
          accountSort.gender = true;
          break;
      }
    }

    console.log(accountSort);
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.loadData();
  }
}
