import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { summary } from 'src/app/model/summary';
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';
import { EtlService } from 'src/app/services/etl.service';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-databases',
  templateUrl: './databases.component.html',
  styleUrls: ['./databases.component.scss']
})
export class DatabasesComponent implements OnInit {
  modelDebut!: NgbDateStruct;
  modelFin!: NgbDateStruct;
  listSummaries: summary[] = []
  testerId!: number
  databaseId: string = ''

  msg!: string
  datedeb!: string
  datefin!: string

  isEmpty: boolean = false
  isError: boolean = false
  isClicked: boolean = false

  listTesterID: any
  nbSecond !: number
  nbMinute = 3

  nb_seconde!: number
  nb_minute: number = 0
  nb_heure: number = 0
  time !: String

  //properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;


  constructor(
    private productionService: ProductionService,
    private etlService: EtlService,
    private crudService: CrudGlobaleService) { }

  ngOnInit() {
    /*  
    this.crudService.getListEntity("machine").subscribe(
      data => this.listTesterID = data
    )

    this.machineService.listTesteurReferenced().subscribe(
      data => { this.listTesterID = data }
    )*/

    const currentDate = new Date();
    const currentDateFormat = currentDate.toISOString().substring(0, 10)
    //this.getListSummaryByDatePaginate(currentDateFormat)
  }

  chargerTesterID(db: string) {
    this.productionService.getListTesterByDatabase(db).subscribe(
      data => this.listTesterID = data
    )
  }

  listsummary() {
    if (this.modelDebut != null) {
      this.datedeb = this.modelDebut.year.toString() + '-' + this.modelDebut.month.toString() + '-' + this.modelDebut.day.toString()
    }

    if (this.modelFin != null) {
      this.datefin = this.modelFin.year.toString() + '-' + this.modelFin.month.toString() + '-' + this.modelFin.day.toString()
    }

    if ((this.testerId != null) && (this.datefin != null) && (this.datedeb != null)) {
      if (this.datedeb > this.datefin) {
        this.isError = true
        return
      }
      this.getListSummaryBetweenTwoDaysByTesterId(this.datedeb, this.datefin, this.testerId)
    }

    if ((this.testerId == null) && (this.datefin != null) && (this.datedeb != null)) {
      if (this.datedeb > this.datefin) {
        this.isError = true
        return
      }
      this.getListSummariesBetweenDebFin(this.datedeb, this.datefin)
    }

    if ((this.testerId != null) && (this.datefin == null) && (this.datedeb != null)) {
      this.getListSummaryByDateByTesterId(this.datedeb, this.testerId)
      //this.getNbSecond(this.datedeb, this.testerId, this.nbMinute)
    }

    if ((this.testerId == null) && (this.datefin == null) && (this.datedeb != null)) {
      this.getListSummaryByDate(this.datedeb)
    }

    if ((this.datefin == null) && (this.datedeb == null) && (this.testerId != null)) {
      this.getListSummaryByTesterId(this.testerId)
    }

    if ((this.datefin == null) && (this.datedeb == null) && (this.testerId == null)) {
      this.getListSummaryByDatabase()
    }
  }

  getListSummaryByDatabase(){
    this.productionService.getListSummaryByDatabase(
      this.databaseId, this.thePageSize,
      this.thePageNumber - 1).subscribe(
      this.processResult()
    )
  }

  getListSummaryByDate(date: string) {
    this.productionService.getSummaryByDatePaginate(
      this.databaseId,
      date,
      this.thePageSize,
      this.thePageNumber - 1
    ).subscribe(this.processResult());
  }


  getListSummaryByDateByTesterId(datedeb: string, testerId: number) {
    this.productionService.getListSummaryByDateByTesterIdPaginate(
      this.databaseId,
      datedeb,
      testerId,
      this.thePageSize,
      this.thePageNumber - 1).subscribe(this.processResult())
  }

  getListSummariesBetweenDebFin(datedeb: string, datefin: string) {
    this.productionService.getSummariesBetweenTwoDaysPaginate(
      this.databaseId,
      datedeb,
      datefin,
      this.thePageSize,
      this.thePageNumber - 1).subscribe(this.processResult())
  }

  getListSummaryBetweenTwoDaysByTesterId(datedeb: string, datefin: string, testerId: number) {
    this.productionService.getSummariesBetweenTwoDaysByTesterIdPaginate(
      this.databaseId,
      datedeb,
      datefin,
      testerId,
      this.thePageSize,
      this.thePageNumber - 1).subscribe(this.processResult())
  }


  getListPaginate() {
    this.productionService.getSummaryListPaginate(this.databaseId,
      this.thePageSize,
      this.thePageNumber - 1).subscribe(this.processResult())
  }

  getListSummaryByTesterId(testerId: number) {
    this.productionService.getListSummaryByTesterId(
      this.databaseId,
      testerId,
      this.thePageSize,
      this.thePageNumber - 1).subscribe(this.processResult())
  }
/*
  getNbSecond(maDate: string, testerId: number, nbMinute: number) {
    this.etlService.calculNbSecond(this.databaseId, maDate, testerId, nbMinute).subscribe(
      data => {
        this.nbSecond = data
        this.isClicked = true
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
          this.time = this.nb_heure + ":" + this.nb_minute + ':' + this.nb_seconde
        }
        else
          this.time = '0' + this.nb_heure + ":" + this.nb_minute + ':' + this.nb_seconde
      }
    )
  }
*/
  processResult() {
    return (data: any) => {
      this.listSummaries = data.content;
      console.log(data)
      this.thePageSize = data.pageable.pageSize;
      this.thePageNumber = data.pageable.pageNumber + 1;
      this.theTotalElements = data.totalElements;
    };
  }

  updatePageSize(Size: number) {
    this.thePageSize = Size;
    this.thePageNumber = 1;
    this.listsummary()
  }
}