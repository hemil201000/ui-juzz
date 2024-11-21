import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StringFilterComponent } from '../../shared/string-filter/string-filter.component';

@Component({
  selector: 'app-admin-transaction',
  standalone: true,
  templateUrl: './admin-transaction.component.html',
  styleUrls: ['./admin-transaction.component.css'],
  imports: [
    CommonModule,       // Use CommonModule instead of BrowserModule
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    HttpClientModule,
    StringFilterComponent,
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdminTransactionComponent implements OnInit {
  pageNo = 1;
  public transactionList = {
    totalCount: 0,
    adminTransactionList: []
  };

  public transactionListRequest = {
    filter: {
      pagination: { start: 0, limit: 10 },
      sort_by: "id",
      sort_order: true,
      search: [{
        column: 'id',
        applied: false,
        text: '',
        old: '',
        comparision: 'Equal to'
      },{
        column: 'upiID',
        applied: false,
        text: '',
        old: '',
        comparision: 'Equal to'
      },{
        column: 'transactionNumber',
        applied: false,
        text: '',
        old: '',
        comparision: 'Equal to'
      }] as Array<any>
    },
  };


  displayedColumns = ['id', 'upiID', 'transactionNumber', 'accId', 'amount', 'datetimeTransaction', 'datetimeSubmitTransaction'];
  dataSource = new MatTableDataSource();
  resultsLength = 0;
  pageSize = 10;
  noOfPages!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.transactionListRequest.filter.sort_by = this.sort.active;
          this.transactionListRequest.filter.sort_order = this.sort.direction === 'asc';
          this.transactionListRequest.filter.pagination.start = this.paginator.pageIndex * this.paginator.pageSize;
          this.dataSource.paginator= this.paginator
          this.pageNo = this.paginator.pageIndex + 1;
          return this.getConfigurationList();
        }),
        map(data => {
          this.transactionList = data;
          this.resultsLength = this.transactionList.totalCount;
          this.noOfPages = Math.ceil(this.transactionList.totalCount / this.paginator.pageSize);
          return this.transactionList.adminTransactionList;
        }),
        catchError(() => observableOf([]))
      ).subscribe(data => this.dataSource.data = data);
  }

  loadData() {
    this.getConfigurationList().subscribe(data => {
      console.log(data)
      this.transactionList = data;
      this.dataSource.data = this.transactionList.adminTransactionList;
      this.resultsLength = this.transactionList.totalCount;
    });
  }

  getConfigurationList() {
    return this.http.post<any>('http://localhost:8082/admin/transaction/list', this.transactionListRequest);
  }

  // search(column: string, filterValue: string) {
  //   const searchItem = this.transactionListRequest.filter.search.find(item => item.column === column);
  //   if (searchItem) {
  //     searchItem.text = filterValue;
  //     searchItem.applied = !!filterValue;
  //   }
  //   this.paginator.pageIndex = 0;
  //   this.loadData();
  // }

  applyFilter(data:Event){
    const value = (data.target as HTMLInputElement).value
    this.dataSource.filter = value
  }

  search() {
    this.paginator.pageIndex = 0;
    this.ngAfterViewInit();
  }

  goToPage() {
    if (this.pageNo <= this.noOfPages) {
      this.paginator.pageIndex = this.pageNo - 1;
      this.loadData();
    }
  }

  refreshList() {
    this.loadData();
  }
}