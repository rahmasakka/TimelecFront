import { Component, OnInit , Input} from '@angular/core';
import { machine } from 'src/app/model/machine';
import { MachineService } from 'src/app/services/machine.service';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {
  @Input() data !: number

  machines!: machine[]
  constructor(private machineService: MachineService) { }

  ngOnInit(): void {
    this.machineService.listMachineByLoadCharge(this.data).subscribe(
      data =>{
        this.machines = data
      }
    )
  }
}