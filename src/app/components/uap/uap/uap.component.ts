import { Component, OnInit } from '@angular/core';
import { UAP } from 'src/app/model/uap';
import { UapService } from 'src/app/services/uap.service';

@Component({
  selector: 'app-uap',
  templateUrl: './uap.component.html',
  styleUrls: ['./uap.component.css']
})
export class UapComponent implements OnInit {

  uaps!: UAP[]
  constructor(private uapService: UapService) { }

  ngOnInit(): void {
    this.getListOfUAP();
  }

  getListOfUAP() {
    this.uapService.getUAPList().subscribe(
      data => {
        this.uaps = data;
      }
    )
  }
}
