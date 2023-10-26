import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { take } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Package } from '../models/md.model';
import { PackageService } from '../share/package.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddPackageComponent } from './add-package/add-package.component';
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

const COLUMNS_SCHEMA = [
  {
    key: 'id',
    type: 'text',
    label: 'Id',
  },
  {
    key: 'address',
    type: 'string',
    label: 'Direcion',
  },
  {
    key: 'postal',
    type: 'number',
    label: 'Codigo Postal',
  }
  ,
  {
    key: 'sender',
    type: 'string',
    label: 'Remitiente',
  },
  {
    key: 'recipient',
    type: 'string',
    label: 'Recipiente',
  }
  ,
  {
    key: 'transport',
    type: 'string',
    label: 'Transporte',
  }
  ,
  {
    key: 'weight',
    type: 'number',
    label: 'Peso',
  }
  ,
  {
    key: 'price',
    type: 'number',
    label: 'Precio',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  }
];



@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource = new MatTableDataSource<Package>()
  columnsSchema: any = COLUMNS_SCHEMA;
  packages: Package[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(public dialog: MatDialog, private packageService: PackageService) {
  }

  ngOnInit() {
    this.packageService.getAllPackages().subscribe(
      (res: Package[]) => {
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



  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent,
      {
        width: '250px',
        data: "¿Desea eliminar el producto con id? " + id,
      });

    dialogRef.afterClosed().subscribe((result : Boolean) => {
      if(result){
        this.removeRow(id);
     
      }
    });
  }



  removeRow(id: number) {
    this.packageService.deletePackageById(id).subscribe(res => {
      console.log("deleted product", id);
      this.packageService.getAllPackages().subscribe(
        (res: Package[]) => {
          this.dataSource.data = res;
        }
      );
    });
  }


  openAddDialog(data: any): void {
    const dialogRef = this.dialog.open(AddPackageComponent,
      {
        height: '885px',
        width: '600px',
        data: data
      });

    dialogRef.afterClosed().subscribe(result => {
     
        this.packageService.createPackage(result).subscribe(
          (res) => {
            console.log("creating product", result);
            this.packageService.getAllPackages().subscribe(
              (res: Package[]) => {
                this.dataSource.data = res;                
              }
            );
          }
        );
      
    });
  }

}
