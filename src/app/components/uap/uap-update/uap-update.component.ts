import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UAP } from 'src/app/model/uap';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';

@Component({
  selector: 'app-uap-update',
  templateUrl: './uap-update.component.html',
  styleUrls: ['./uap-update.component.scss']
})
export class UapUpdateComponent implements OnInit {

  id!: number;
  uap : UAP = new UAP();
  submitted = false;
  isSuccessful = false;
  errorMessage = '';
  isFailed = false;

  constructor(
              private crudService: CrudGlobaleService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.crudService.getEntityById("uap", this.id).subscribe(
      data => {
        this.uap = data;
      },
      error => console.log(error)
    );
  }


  onSubmit(){
    this.crudService.updateEntity("uap", this.id, this.uap).subscribe(
      data => {
        console.log(data)
        this.goToUAP()
        this.isSuccessful = true;
        this.submitted = true;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    )
  }

  goToUAP(){
    this.router.navigate(['/uap-list'])
  }
}