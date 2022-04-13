import { Component, OnInit, Input } from '@angular/core';
import { LaodCharge } from 'src/app/model/LaodCharge';
import { CentreChargeService } from 'src/app/services/centre-charge.service';

@Component({
  selector: 'app-centre-charge',
  templateUrl: './centre-charge.component.html',
  styleUrls: ['./centre-charge.component.css']
})
export class CentreChargeComponent implements OnInit {

  @Input() data !: number
  CCs!: LaodCharge[]
  constructor(private ccService: CentreChargeService) { }

  ngOnInit(): void {
    this.ccService.listLoadChargeByUAP(this.data).subscribe(
      data=>{
        this.CCs = data
      }
    )
  }
}
