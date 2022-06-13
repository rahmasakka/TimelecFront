import { Component, OnInit } from '@angular/core';
import { GabarieService } from 'src/app/services/gabarie.service';

@Component({
  selector: 'app-gabaries',
  templateUrl: './gabaries.component.html',
  styleUrls: ['./gabaries.component.scss']
})
export class GabariesComponent implements OnInit {
  of !: string
  dateDeb !: string
  dateFin !: string
  gabarie !: string

  //properties for pagination démarrage
  thePageNumberDemarrage: number = 1;
  thePageSizeDemarrage: number = 5;
  theTotalElementsDemarrage: number = 0;
  demarrage !: any

  //properties for pagination Suivi
  thePageNumberSuivi: number = 1;
  thePageSizeSuivi: number = 5;
  theTotalElementsSuivi: number = 0;
  suivi!: any

  //properties for pagination production
  thePageNumberProduction: number = 1;
  thePageSizeProduction: number = 5;
  theTotalElementsProduction: number = 0;
  production !: any

  constructor(private gabarieService: GabarieService) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    if (this.dateFin == undefined) {
      this.dateFin = this.dateDeb
    }

    if (this.dateDeb != undefined) {
      if (this.of != undefined) {
        console.log(this.dateDeb)

        this.betweenTwoDatesOf(this.dateDeb, this.dateFin, this.of)
      } else {
        this.getBetweenTwoDates(this.dateDeb, this.dateFin)
      }

      if (this.gabarie != undefined) {
        this.byMachineBetweenTwoDates(this.dateDeb, this.dateFin, this.gabarie)
      } else {
        this.getBetweenTwoDates(this.dateDeb, this.dateFin)
      }
    } else {
      if (this.of != undefined) {
        this.getByOF(this.of)
      } else {
        this.all()
      }

      if (this.gabarie != undefined) {
        this.byMachine(this.gabarie)
      } else {
        this.all()
      }
    }
  }

  byMachine(gabarie: string) {
    this.gabarieService.byMachine("suivi", gabarie, this.thePageSizeSuivi, this.thePageNumberSuivi - 1).subscribe(this.processResultSuivi())
  }

  all() {
    this.gabarieService.getAll("demarrage", this.thePageSizeDemarrage, this.thePageNumberDemarrage - 1).subscribe(this.processResultdemarrage())
    this.gabarieService.getAll("production", this.thePageSizeProduction, this.thePageNumberProduction - 1).subscribe(this.processResultProduction())
    this.gabarieService.getAll("suivi", this.thePageSizeSuivi, this.thePageNumberSuivi - 1).subscribe(this.processResultSuivi())
  }

  byMachineBetweenTwoDates(dateDeb: string, dateFin: string, gabarie: string) {
    this.gabarieService.byMachineBetweenTwoDates("suivi", dateDeb, dateFin, gabarie, this.thePageSizeSuivi, this.thePageNumberSuivi - 1).subscribe(this.processResultSuivi())
  }

  betweenTwoDatesOf(dateDeb: string, dateFin: string, of: string) {
    this.gabarieService.betweenTwoDatesOf("demarrage", dateDeb, dateFin, of, this.thePageSizeDemarrage, this.thePageNumberDemarrage - 1).subscribe(this.processResultdemarrage())
    this.gabarieService.betweenTwoDatesOf("production", dateDeb, dateFin, of, this.thePageSizeProduction, this.thePageNumberProduction - 1).subscribe(this.processResultProduction())
  }

  getByOF(of: string) {
    this.gabarieService.getByOF("demarrage", of, this.thePageSizeDemarrage, this.thePageNumberDemarrage - 1).subscribe(this.processResultdemarrage())
    this.gabarieService.getByOF("production", of, this.thePageSizeProduction, this.thePageNumberProduction - 1).subscribe(this.processResultProduction())
  }

  getBetweenTwoDates(dateDeb: string, dateFin: string) {
    this.gabarieService.betweenTwoDates("demarrage", dateDeb, dateFin, this.thePageSizeDemarrage, this.thePageNumberDemarrage - 1).subscribe(this.processResultdemarrage())
    this.gabarieService.betweenTwoDates("production", dateDeb, dateFin, this.thePageSizeProduction, this.thePageNumberProduction - 1).subscribe(this.processResultProduction())
    this.gabarieService.betweenTwoDates("suivi", dateDeb, dateFin, this.thePageSizeSuivi, this.thePageNumberSuivi - 1).subscribe(this.processResultSuivi())
  }

  processResultdemarrage() {
    return (data: any) => {
      this.demarrage = data.content;
      this.thePageSizeDemarrage = data.pageable.pageSize;
      this.thePageNumberDemarrage = data.pageable.pageNumber + 1;
      this.theTotalElementsDemarrage = data.totalElements;
    };
  }

  updatePageSizeDemarrage(Size: number) {
    this.thePageSizeDemarrage = Size;
    this.thePageNumberDemarrage = 1;
    this.getList()
  }

  processResultProduction() {
    return (data: any) => {
      this.production = data.content;
      this.thePageSizeProduction = data.pageable.pageSize;
      this.thePageNumberProduction = data.pageable.pageNumber + 1;
      this.theTotalElementsProduction = data.totalElements;
    };
  }

  updatePageSizeProduction(Size: number) {
    this.thePageSizeProduction = Size;
    this.thePageNumberProduction = 1;
    this.getList()
  }

  processResultSuivi() {
    return (data: any) => {
      this.suivi = data.content;
      this.thePageSizeSuivi = data.pageable.pageSize;
      this.thePageNumberSuivi = data.pageable.pageNumber + 1;
      this.theTotalElementsSuivi = data.totalElements;
    };
  }

  updatePageSizeSuivi(Size: number) {
    this.thePageSizeSuivi = Size;
    this.thePageNumberSuivi = 1;
    this.getList()
  }

  exportExcel() {

  }
}