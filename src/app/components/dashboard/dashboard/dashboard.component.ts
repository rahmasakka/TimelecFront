import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import { EtlService } from 'src/app/services/etl.service';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import { ProductionService } from 'src/app/services/production.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { dashboard } from 'src/app/model/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  modelDebut!: NgbDateStruct;
  modelFin!: NgbDateStruct;
  result: any
  listTester: any
  databaseId: string = '';
  testerId!: number
  dashboards !: dashboard[];

  datedeb!: string
  datefin!: string

  resultat: any;

  constructor(private dashboardService: DashboardService, private etl: EtlService, private productionService: ProductionService) {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip,
      SubTitle
    );
  }

  ngOnInit(): void { 
    this.listTesters()
  }

  getDashboard() {

    if (this.modelDebut != null) {
      this.datedeb = this.modelDebut.year.toString() + '-' + this.modelDebut.month.toString() + '-' + this.modelDebut.day.toString()
    }

    if (this.modelFin != null) {
      this.datefin = this.modelFin.year.toString() + '-' + this.modelFin.month.toString() + '-' + this.modelFin.day.toString()
    }
    if (this.databaseId != '')
      if (this.testerId != null)
        if (this.datedeb != null)
          if (this.datefin != null)
            this.getDashboardBetween2DaysByDatabaseByTester(this.databaseId, this.datedeb, this.datefin, this.testerId)
          else
            this.getDashboardByDateByDatabaseBytesterId(this.databaseId, this.datedeb, this.testerId)
        else
          this.getDashboardByDatabaseByTester(this.databaseId, this.testerId)
      else
        if (this.datedeb != null)
          if (this.datefin != null)
            this.getDashboardBetween2DaysByDatabase(this.datedeb, this.datefin, this.databaseId)
          else
            this.getDashboardByDateByDatabase(this.datedeb, this.databaseId)
        else
          this.getDashboardByDatabase(this.databaseId)

    else
      if (this.testerId != null)
        if (this.datedeb != null)
          if (this.datefin != null)
            this.getDashboardBetween2DaysByTester(this.testerId, this.datedeb, this.datefin)
          else
            this.getDashboardByDateBytesterId(this.datedeb, this.testerId)
        else
          this.getDashboardByTesterID(this.testerId)

      else
        if (this.datedeb != null)
          if (this.datefin != null)
            this.getDashboardBetween2Days(this.datedeb, this.datefin)
          else
            this.getDashboardByDate(this.datedeb)
  }

  chargerTesterID(db: string) {
    this.productionService.getListTesterByDatabase(db).subscribe(
      data => this.listTester = data
    )
  }


  //1 [database testerID datedeb datefin]
  getDashboardBetween2DaysByDatabaseByTester(db: string, date1: string, date2: string, tester: number) {
    this.dashboardService.getDashboardBetween2DaysByDatabaseByTester(db, date1, date2, tester).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }


  //2 [database testerID datedeb !datefin]
  getDashboardByDateByDatabaseBytesterId(database: string, dateDeb: string, tester: number) {
    this.dashboardService.getDashboardByDateByDatabaseByTester(database, dateDeb, tester).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }


  //3 [database testerID !datedeb !datefin]
  getDashboardByDatabaseByTester(database: string, tester: number) {
    this.dashboardService.getDashboardByDatabaseByTester(database, tester).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }


  //4 [database !testerID datedeb datefin]
  getDashboardBetween2DaysByDatabase(database: string, dateDeb: string, dateFin: string) {
    this.dashboardService.getDashboardBetween2DaysByDatabase(database, dateDeb, dateFin).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }


  //5 [database !testerID datedeb !datefin]
  getDashboardByDateByDatabase(database: string, dateDeb: string) {
    this.dashboardService.getDashboardByDateByDatabase(database, dateDeb).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }


  //6 [database !testerID !datedeb !datefin]
  getDashboardByDatabase(database: string) {
    this.dashboardService.getDashboardByDatabase(database).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }

  //7 [!database testerID datedeb datefin]
  getDashboardBetween2DaysByTester(tester: number, dateDeb: string, dateFin: string) {
    this.dashboardService.getDashboardBetween2DaysByTester(tester, dateDeb, dateFin).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }


  //8 [!database testerID datedeb !datefin]
  getDashboardByDateBytesterId(dateDeb: string, tester: number) {
    this.dashboardService.getDashboardByDateBytesterId(dateDeb, tester).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }

  //9 [!database testerID !datedeb !datefin]
  getDashboardByTesterID(tester: number) {
    this.dashboardService.getDashboardByTesterID(tester).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }


  //10 [!database !testerID datedeb datefin]
  getDashboardBetween2Days(dateDeb: string, dateFin: string) {
    this.dashboardService.getDashboardBetween2Days(dateDeb, dateFin).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }


  //11 [!database !testerID datedeb !datefin]
  getDashboardByDate(dateDeb: string) {
    this.dashboardService.getDashboardByDate(dateDeb).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }


  //12 
  dashboardByTesterID() {
    this.dashboardService.dashboardByTesterID().subscribe(
      res => {
        this.resultat = res
      }
    )
  }

  //14 
  listTesters(){
    this.dashboardService.listTesters().subscribe(
      data => {
        this.listTester = data 
        console.log("**********" , this.listTester)
      }
    )
  }


}