import { ThrowStmt } from '@angular/compiler';
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
  listSummaries1!: object[]
  testerId!: number
  databaseId: string = ''

  msg!: string
  datedeb!: string
  datefin!: string

  isEmpty: boolean = false
  isError: boolean = false
  isClicked: boolean = false

  listTesterID !: machine[]
  nbSecond !: number
  nbMinute = 3

  pageNumber: number = 0;
  pageSize: number = 100;
  numElement: number = 4;
  nb_seconde!: number
  nb_minute: number = 0
  nb_heure: number = 0
  time !: String

  constructor(private productionService: ProductionService,
    private etlService: EtlService,
    private machineService: MachineService) { }

  ngOnInit() {
    this.machineService.listTesteurReferenced().subscribe(
      data => { this.listTesterID = data }
    )
    const currentDate = new Date();
    const currentDateFormat = currentDate.toISOString().substring(0, 10)
   // this.getListSummaryByDate(currentDateFormat)
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
    }

    if ((this.testerId == null) && (this.datefin != null) && (this.datedeb != null)) {
      // this.datefin = this.modelFin.year.toString() + '-' + this.modelFin.month.toString() + '-' + this.modelFin.day.toString()
      /* if (this.datedeb > this.datefin) {
         this.isError = true
         return
       }*/
      this.getListSummariesBetweenDebFin(this.datedeb, this.datefin)
    }

    if ((this.testerId != null) && (this.datefin == null) && (this.datedeb != null)) {
      this.getListSummaryByTesterId(this.datedeb, this.testerId)
      this.getNbSecond(this.datedeb, this.testerId, this.nbMinute)
    }

    if ((this.testerId == null) && (this.datefin == null) && (this.datedeb != null)) {
      this.getListSummaryByDate(this.datedeb)
    }

    if ((this.datefin == null) && (this.datedeb == null) && (this.testerId != null)) {
      this.getTesterId(this.testerId)
    }

  }

  getListSummaryByDate(date: string) {
    this.productionService.getSummaryByDate(this.databaseId, date).subscribe(
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
    this.productionService.getListSummaryByTesterId(this.databaseId, datedeb, testerId).subscribe(
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
    this.productionService.getSummariesBetweenTwoDays(this.databaseId, datedeb, datefin).subscribe(
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
    this.productionService.getSummariesBetweenTwoDaysByTesterId(this.databaseId, datedeb, datefin, testerId).subscribe(
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
    this.etlService.calculNbSecond(this.databaseId, maDate, testerId, nbMinute).subscribe(
      data => {
        this.nbSecond = data
        this.isClicked = true
        //console.log(this.nbSecond)
        this.nb_seconde = this.nbSecond

        if (this.nb_seconde > 3600) {
          this.nb_heure = Math.floor(this.nb_seconde / 3600)
        }

        this.nb_seconde = this.nb_seconde - (this.nb_heure * 3600)

        if (this.nb_seconde > 60) {
          this.nb_minute = Math.floor(this.nb_seconde / 60)
        }

        this.nb_seconde = this.nb_seconde - (this.nb_minute * 60)
        if (this.nb_heure >= 10) {
          this.time= this.nb_heure + ":" + this.nb_minute + ':' + this.nb_seconde
        }
        else 
       this.time = '0'+this.nb_heure + ":" + this.nb_minute + ':' + this.nb_seconde
      }
    )
  }

  getTesterId(testerId: number) {
    this.productionService.getTesterId(this.databaseId, testerId).subscribe(
      data => { this.listSummaries = data }
    )
  }

  getSummaryPagination() {
    this.productionService.getSummaryListPaginate(this.databaseId, this.pageNumber, this.pageSize).subscribe(
      data => {
        this.listSummaries1 = data;
        console.log(this.listSummaries1)
      }
    )
  }
}