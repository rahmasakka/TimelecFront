import { Component, OnInit } from '@angular/core';
import { CrudGlobaleService } from '../services/crud-globale.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private crud: CrudGlobaleService) { }


  ngOnInit(): void {
  }

  export() {
    console.log("am testing exportExcel....1.*****.......")

    this.crud.exporterExcel().subscribe((data) => {
      console.log("am testing exportExcel....1........")

      let file = new Blob([data],{type:'application/vnd.ms-excel'});
      console.log("am testing exportExcel......2......")
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }

}