import {Component, Inject} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { Package, Type } from 'src/app/models/md.model';
import { TypesService } from 'src/app/share/types.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css']
})
export class AddPackageComponent {

  public types!: Type[];
  public newPackageForm: FormGroup;

  public isEdit = false;

  constructor( public dialogRef: MatDialogRef<AddPackageComponent>, public typesService : TypesService,
               @Inject(MAT_DIALOG_DATA) public data: Package) {
                typesService.getAllTypes().subscribe(
      (res: Type[]) => {
        this.types = res;
      }
    )

    this.newPackageForm = new FormGroup({
      id: new FormControl(),
      isEdit: new FormControl(),
      address: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      sender: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      recipient: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      weight: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      postal: new FormControl('', [Validators.required,Validators.pattern('[0-9]{5}')])
      
    });

    if(data){
      this.isEdit = true;
      this.newPackageForm.setValue({
        id: data.id,
        isEdit: true,
        address:data.address,
        sender:data.sender,
        recipient:data.recipient,
        

       
      })
    }
  }

  
  public myError = (controlName: string, errorName: string) =>{
    return this.newPackageForm.controls[controlName].hasError(errorName);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if(!this.newPackageForm.valid){
      return;
    } else {
      let newpackagevalue  = this.newPackageForm.value;
      let newpackage : Package = {
        postal: newpackagevalue.postal,
        sender: newpackagevalue.sender,
        recipient: newpackagevalue.recipient,
        weight: newpackagevalue.weight,
        price: newpackagevalue.price,
        isEdit: false,
        address: newpackagevalue.address
      };

      this.dialogRef.close(newpackage)
    }
  }



}
