import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { take } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Package, Type } from '../models/md.model';
import { PackageService } from '../share/package.service';
import { TypesService } from '../share/types.service';

const COLUMNS_SCHEMA = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'intmin',
    type: 'number',
    label: 'Peso desde',
  },
  {
    key: 'intmax',
    type: 'number',
    label: 'Peso Hasta',
  }
  
];


@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent {


  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = new MatTableDataSource<Type>()
  columnsSchema: any = COLUMNS_SCHEMA;
  packages: Type[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(public dialog: MatDialog, private typesService: TypesService) {
  }

  ngOnInit() {
    this.typesService.getAllTypes().subscribe(
      (res: Type[]) => {
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

  editRow(row: Package){
    
    row.isEdit = false;
  }


}
