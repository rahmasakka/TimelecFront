import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';

@Component({
  selector: 'app-create-uap',
  templateUrl: './create-uap.component.html',
  styleUrls: ['./create-uap.component.scss']
})
export class CreateUapComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  submitted = false;

  constructor(private crudService: CrudGlobaleService, private router: Router) { }

  ngOnInit(): void {} 

  onSubmit(): void {
   this.submitted= true;

   console.log(this.form)
    this.crudService.createNewEntity("uap",this.form).subscribe(
      data => {
        this.goToUAPList()
        this.isSuccessful = true;
        this.isFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
  }
  
  goToUAPList() {
    this.router.navigate(['/uap-list']);
  }
}