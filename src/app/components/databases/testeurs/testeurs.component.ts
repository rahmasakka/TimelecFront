import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { summary } from 'src/app/model/summary';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-testeurs',
  templateUrl: './testeurs.component.html',
  styleUrls: ['./testeurs.component.scss']
})
export class TesteursComponent implements OnInit {
  listSummaries: summary[] = []
  testerId!: number

  databaseId: string = ''
  msg!: string

  isEmpty: boolean = false
  isError: boolean = false
  isClicked: boolean = false

  listTesterID: any
  nbSecond !: number

  nb_seconde!: number
  nb_minute: number = 0
  nb_heure: number = 0
  time !: string

  //properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  datedeb: any;
  datefin: any;

  constructor(private productionService: ProductionService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.databaseId = this.route.snapshot.params['keyword']
    this.chargerTesterID(this.databaseId)
    const currentDate = new Date();
    const currentDateFormat = currentDate.toISOString().substring(0, 10)
    console.log(currentDateFormat)
    this.getListSummaryByDate(currentDateFormat)
  }

  chargerTesterID(db: string) {
    this.productionService.getListTesterByDatabase(db).subscribe((data) => this.listTesterID = data)
  }

  listsummary() {
    if (this.datefin == undefined) {
      this.datefin = this.datedeb
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

  getAll(){
    this.productionService.getAll(this.databaseId,
      this.thePageSize,
      this.thePageNumber - 1).subscribe(this.processResult())
  }

  getListSummaryByDatabase() {
    this.productionService.getListSummaryByDatabase(
      this.databaseId,
      this.thePageSize,
      this.thePageNumber - 1).subscribe(this.processResult())
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

  processResult() {
    return (data: any) => {
      this.listSummaries = data.content;
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