import { Component, OnInit } from '@angular/core';
import { centreCharge } from '../model/centreCharge';
import { machine } from '../model/machine';
import { UAP } from '../model/uap';
import { CentreChargeService } from '../services/centre-charge.service';
import { MachineService } from '../services/machine.service';
import { UapService } from '../services/uap.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  idUAP!: number
  idCC!: number

  uaps!: UAP[]
  machines!: machine[]
  centreCharges !: centreCharge[]
  selectedUAP!: UAP

  constructor(private centreChargeService: CentreChargeService,
    private uapService: UapService,
    private machineService: MachineService) { }


  ngOnInit() {
    this.showAll();
    this.onSelect(this.selectedUAP.idUAP)
  }

  showAll() {
    this.uapService.getUAPList().subscribe(
      data => {
        this.uaps = data
        //console.log(this.uaps)
      }
    )
  }

  /*
  onSelect(uap_id : any){
    this.centreChargeService.listLoadChargeByUAP(uap_id).subscribe(
      (res : any) => {
        this.centreCharges = res.filter(
          (res:any) => res.uap_id == uap_id!.value
        ),
        console.log(this.centreCharges);
      }
    )
  }*/

  onSelect(uap_id: any) {
    this.centreChargeService.listLoadChargeByUAP(uap_id).subscribe(
      data => {
        this.centreCharges = data
        console.log("*****", this.centreCharges)
      }
    )
  }
}