import { Component, OnInit } from '@angular/core';
import { UAP } from 'src/app/model/uap';
import { UapService } from 'src/app/services/uap.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  uaps!: UAP[]
  uapName = "test"
  constructor(private uapService: UapService) { }

  ngOnInit(): void {
    this.uapService.getUAPList().subscribe(
      data => {
        this.uaps = data;
      }
    )
  }
}
