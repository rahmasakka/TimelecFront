import { Component, OnInit } from '@angular/core';
import { UAP } from 'src/app/model/uap';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';

@Component({
  selector: 'app-uap',
  templateUrl: './uap.component.html',
  styleUrls: ['./uap.component.scss']
})
export class UapComponent implements OnInit {
  url:string = "uap";
  uaps!: UAP[]
  constructor( private crudService : CrudGlobaleService) { }

  ngOnInit(): void {
    this.getListOfUAP();
  }

  getListOfUAP() {
    this.crudService.getListEntity(this.url).subscribe(
      data => {
        this.uaps = data;
      }
    )
  }
}