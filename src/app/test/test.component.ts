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
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  modelDebut!: NgbDateStruct;
  modelFin!: NgbDateStruct;
  result: any
  listTesterID: any
  databaseId: string = '';
  testerId!: number
  dashboards !: dashboard[];

  datedeb!: string
  datefin!: string


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
    this.dashboardService.getDashboardByDatabase("vm").subscribe(
      (data: any) => {
        console.log(data)
        let temp_tester = data.map((data: any) => data.testerID)
        let temp_fonctionnement = data.map((data: any) => data.dureeFonctionnement)
        let temp_disfonctionnement = data.map((data: any) => data.dureeDisfonctionnement)
        let conforme = data.map((data: any) => data.quantiteConforme)
        let nonConforme = data.map((data: any) => data.quantiteNonConforme)
        let date = data.map((data: any) => data.date)

        /*
          database
          date
          dureeDisfonctionnement: "00:35:51"
          dureeDisfonctionnementSeconde: 2151
          dureeFonctionnement: "00:19:56"
          dureeFonctionnementSeconde: 1196
          finishTime: "17:27:18"
          id: 1
          quantiteConforme: 16
          quantiteNonConforme: 1
          startTime: "16:31:31"
          testeurId: 6932
        */
        /*
                let date: any = []
                temp_date.forEach((data: any) => {
                  let jsdate = new Date(data * 1000)
                  date.push(jsdate.toLocaleTimeString('fr', { year: 'numeric', month: 'short', day: 'numeric' }))
                })
        */


        var myChartPie = new Chart("myChartPie", {
          type: 'pie',
          data: {
            labels: ["conforme", "nonConforme"],
            datasets: [{
              label: date,
              data: [conforme, nonConforme],
              backgroundColor: [
                "rgba(3, 58, 118, 0.8)",
                "rgba(242, 200, 48, 0.8)"
              ],
              borderColor: [
                "rgba(3, 58, 118, 1)",
                "rgba(242, 200, 48, 1)"

              ],
              borderWidth: 1
            }
            ]
          }
        })


        var myChartBar = new Chart("myChartBar", {
          type: 'bar',
          data: {
            labels: date,
            datasets: [{
              label: 'piece conforme',
              data: conforme,
              backgroundColor: "rgba(75, 192, 192, 0.8)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: 'piece non conforme',
              data: nonConforme,
              backgroundColor: "rgba(255, 99, 132, 0.8)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            }
            ]
          }

          ,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        }
        )
      })
  }



  getDashboard() {
    if (this.modelDebut != null) {
      this.datedeb = this.modelDebut.year.toString() + '-' + this.modelDebut.month.toString() + '-' + this.modelDebut.day.toString()
    }

    if (this.modelFin != null) {
      this.datefin = this.modelFin.year.toString() + '-' + this.modelFin.month.toString() + '-' + this.modelFin.day.toString()
    }

    if ((this.testerId != null) && (this.datefin == null) && (this.datedeb == null)) {
      this.getDashboardByDatabaseByTester(this.databaseId, this.testerId)
    }

    if ((this.testerId == null) && (this.datefin == null) && (this.datedeb == null)) {
      this.getDashboardByDatabase(this.databaseId)
    }

  }

  getDashboardByDatabase(db: string) {
    // this.chargerTesterID(db)
    this.dashboardService.getDashboardByDatabase(db).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }

  chargerTesterID(db: string) {
    this.productionService.getListTesterByDatabase(db).subscribe(
      data => this.listTesterID = data
    )
  }

  getDashboardByDatabaseByTester(db: string, tester: number) {
    this.dashboardService.getDashboardByDatabaseByTester(db, tester).subscribe(
      data => {
        this.dashboards = data
        console.log(this.dashboards)
      }
    )
  }

}