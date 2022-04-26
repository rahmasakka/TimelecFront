import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { machine } from 'src/app/model/machine';
import { summary } from 'src/app/model/summary';
import { EtlService } from 'src/app/services/etl.service';
import { MachineService } from 'src/app/services/machine.service';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  modelDebut!: NgbDateStruct;
  modelFin!: NgbDateStruct;
  listSummaries!: summary[]
  testerId!: number

  msg!: string
  datedeb!: string
  datefin!: string

  isEmpty: boolean = false
  isError: boolean = false
  isClicked: boolean = false

  listTesterID !: machine[]
  nbSecond !: number

  nbMinute = 3

  constructor(private productionService: ProductionService,
    private etlService: EtlService,
    private machineService: MachineService) { }

  ngOnInit() {
    this.machineService.listTesteurReferenced().subscribe(
      data => { this.listTesterID = data }
    )
    
    const currentDate = new Date();
    //console.log(currentDate.toISOString().substring(0, 10))
    const currentDateFormat = currentDate.toISOString().substring(0, 10)
    this.getListSummaryByDate(currentDateFormat)
  }

  function() {
    if (this.modelDebut != null) {
      this.datedeb = this.modelDebut.year.toString() + '-' + this.modelDebut.month.toString() + '-' + this.modelDebut.day.toString()
    }

    if (this.modelFin != null) {
      this.datefin = this.modelFin.year.toString() + '-' + this.modelFin.month.toString() + '-' + this.modelFin.day.toString()
    }

    if ((this.testerId != null) && (this.datefin != null) && (this.datedeb != null)) {
      //this.datefin = this.modelFin.year.toString() + '-' + this.modelFin.month.toString() + '-' + this.modelFin.day.toString()
      /*  if (this.datedeb > this.datefin) {
          this.isError = true
          return
        }*/
      this.getListSummaryBetweenTwoDaysByTesterId(this.datedeb, this.datefin, this.testerId)
      return
    }

    if ((this.testerId == null) && (this.datefin != null) && (this.datedeb != null)) {
      // this.datefin = this.modelFin.year.toString() + '-' + this.modelFin.month.toString() + '-' + this.modelFin.day.toString()
      /* if (this.datedeb > this.datefin) {
         this.isError = true
         return
       }*/
      this.getListSummariesBetweenDebFin(this.datedeb, this.datefin)
      return
    }

    if ((this.testerId != null) && (this.datefin == null) && (this.datedeb != null)) {
      this.getListSummaryByTesterId(this.datedeb, this.testerId)
      return
    }

    if ((this.testerId == null) && (this.datefin == null) && (this.datedeb != null)) {
      this.getListSummaryByDate(this.datedeb)
    }

    if ((this.datefin == null) && (this.datedeb == null) && (this.testerId != null)) {
      this.getTesterId(this.testerId)
    }
  }

  /* 
  function() {
  this.datedeb = this.modelDebut.year.toString() + '-' + this.modelDebut.month.toString() + '-' + this.modelDebut.day.toString()

  if (this.datefin != null) {
    this.datefin = this.modelFin.year.toString() + '-' + this.modelFin.month.toString() + '-' + this.modelFin.day.toString()
    if (this.datedeb >= this.datefin) {
      this.isError = true
    }
    if (this.testerId != null) {
      this.getListSummaryBetweenTwoDaysByTesterId(this.datedeb, this.datefin, this.testerId)
    } else {
      this.getListSummariesBetweenDebFin(this.datedeb, this.datefin)
    }
  } else {
    if (this.testerId != null) {
      this.getListSummaryByTesterId(this.datedeb, this.testerId)
    } else {
      this.getListSummaryByDate(this.datedeb)
    }
  }
  this.getNbSecond(this.datedeb, this.testerId, this.nbMinute)
}
*/


  getListSummaryByDate(date: string) {
    this.productionService.getSummaryByDate(date).subscribe(
      data => {
        this.listSummaries = data
        console.log(this.listSummaries)
        if (this.listSummaries == null) {
          this.isEmpty = true
        }
      }
    )
  }

  getListSummaryByTesterId(datedeb: string, testerId: number) {
    this.productionService.getListSummaryByTesterId(datedeb, testerId).subscribe(
      data => {
        this.listSummaries = data
        console.log(this.listSummaries)
        if (this.listSummaries == null) {
          this.isEmpty = true
        }
      }
    )
  }

  getListSummariesBetweenDebFin(datedeb: string, datefin: string) {
    this.productionService.getSummariesBetweenTwoDays(datedeb, datefin).subscribe(
      data => {
        this.listSummaries = data
        console.log(this.listSummaries)
        if (this.listSummaries == null) {
          this.isEmpty = true
        }
      }
    )
  }

  getListSummaryBetweenTwoDaysByTesterId(datedeb: string, datefin: string, testerId: number) {
    this.productionService.getSummariesBetweenTwoDaysByTesterId(datedeb, datefin, testerId).subscribe(
      data => {
        this.listSummaries = data
        console.log(this.listSummaries)
        if (this.listSummaries == null) {
          this.isEmpty = true
        }
      }
    )
  }

  getNbSecond(maDate: string, testerId: number, nbMinute: number) {
    this.etlService.calculNbSecond(maDate, testerId, nbMinute).subscribe(
      data => {
        this.nbSecond = data
        this.isClicked = true
        console.log(this.nbSecond)
      }
    )
  }

  getTesterId(testerId: number) {
    this.productionService.getTesterId(testerId).subscribe(
      data => { this.listSummaries = data }
    )
  }
}