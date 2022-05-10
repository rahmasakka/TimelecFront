import { Component, OnInit , Input} from '@angular/core';
import { machine } from 'src/app/model/machine';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {
  @Input() data !: number

  machines!: machine[]
  constructor(private crudService: CrudGlobaleService) { }

  ngOnInit(): void {
    this.crudService.getSonByMother("machine" ,this.data).subscribe(
      data =>{
        this.machines = data
      }
    )
  }
}