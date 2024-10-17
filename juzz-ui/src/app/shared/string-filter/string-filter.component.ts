import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'string-filter',
  standalone:true,
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.css'],
  imports: [
    MatSelectModule,
    MatButtonModule, 
    MatMenuTrigger,
    MatIconModule,
    MatButtonModule,  // Ensure this is included
    MatIconModule,    // Ensure this is included
    MatMenuModule,
    FormsModule,  
    CommonModule,
  ]
})
export class StringFilterComponent implements OnInit {

  @Input() filter : any;
  @Output() search: EventEmitter<any> = new EventEmitter<any>();

  types = [
    'Equal to', 'Like', 'Not equal to'
  ];

  applyFilter(menuTrigger: MatMenuTrigger, forcefully?: Boolean) {
    let isChangeDetected = false;
    this.filter.applied = !!this.filter.new_val;
    menuTrigger.closeMenu();
    if (forcefully || this.filter.new_val !== this.filter.current_val) {
      isChangeDetected = true;
    }
    this.filter.current_val = this.filter.new_val;
    if (isChangeDetected) {
      this.emitSearch();
    }
  }

  emitSearch(): void {
    this.search.next(this.filter);
  }

  constructor() { }

  ngOnInit() {
  }

}

