import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { take } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Package, Type, Usuario } from '../models/md.model';
import { PackageService } from '../share/package.service';
import { TypesService } from '../share/types.service';
import { AuthService } from '../share/auth.service';

const COLUMNS_SCHEMA = [
  {
    key: 'nombre',
    type: 'text',
    label: 'Nombre',
  },
  {
    key: 'email',
    type: 'text',
    label: 'Correo',
  },
  {
    key: 'role',
    type: 'text',
    label: 'Rol',
  }
  
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = new MatTableDataSource<Usuario>()
  columnsSchema: any = COLUMNS_SCHEMA;
  packages: Usuario[] = [];
  public token!: string | null;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(public dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit() {
    this.token=this.authService.restoreToken();
    if (this.token!=null)
    {
    this.authService.getAllUsers(this.token).subscribe(
      (res: Usuario[]) => {
        console.log(res);
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );

    }
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
