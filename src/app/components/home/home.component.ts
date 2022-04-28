import { Component, OnInit } from '@angular/core';
import { UAP } from 'src/app/model/uap';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';
import { UapService } from 'src/app/services/uap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  uaps!: UAP[]
  uapName = "test"
  constructor(private crudService : CrudGlobaleService) { }

  ngOnInit(): void {
    this.crudService.getListEntity("uap").subscribe(
      data => {
        this.uaps = data;
      }
    )
  }
}
