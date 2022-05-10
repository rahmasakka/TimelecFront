import { Component, OnInit, Input } from '@angular/core';
import { centreCharge } from 'src/app/model/centreCharge';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';

@Component({
  selector: 'app-centre-charge',
  templateUrl: './centre-charge.component.html',
  styleUrls: ['./centre-charge.component.scss']
})
export class CentreChargeComponent implements OnInit {

  @Input() data !: number
  CCs!: centreCharge[]
  constructor(private crudService: CrudGlobaleService) { }

  ngOnInit(): void {
    this.crudService.getSonByMother("cc", this.data).subscribe(
      data=>{
        this.CCs = data
      }
    )
  }
}
