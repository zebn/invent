import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { take } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Code, Type } from '../models/md.model';
import { PackageService } from '../share/package.service';
import { TypesService } from '../share/types.service';
import { CodesService } from '../share/codes.service';

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'code',
    type: 'number',
    label: 'Codigo',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
  {
    key: 'isDelete',
    type: 'isDelete',
    label: '',
  }
  
];


@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent {

  
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = new MatTableDataSource<Code>()
  columnsSchema: any = COLUMNS_SCHEMA;
  packages: Code[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(public dialog: MatDialog, private codesService: CodesService) {
  }

  ngOnInit() {
    this.codesService.getAllCodes().subscribe(
      (res: Code[]) => {
        console.log(res);
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );


  }

  ngAfterViewInit() {
    this.dataSource.sort = this.empTbSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRow(row: Code){
    
    row.isEdit = false;
  }


}
