import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { centreCharge } from '../model/centreCharge';
import { machine } from '../model/machine';
import { UAP } from '../model/uap';
import { CrudGlobaleService } from '../services/crud-globale.service';
import { DashboardService } from '../services/dashboard.service';
import { MachineService } from '../services/machine.service';
import { EtlService } from '../services/etl.service';
import { dashboard } from '../model/dashboard';
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


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  modelDebut!: NgbDateStruct;
  modelFin!: NgbDateStruct;

  datedeb!: string
  datefin!: string

  uaps!: UAP[];
  centreChargeByUAP !: centreCharge[];
  machineReferenced !: machine;
  dashboardUAP !: dashboard[];
  dashboardCC!: dashboard[]
  isOK = false

  tester!: any

  constructor(private crud: CrudGlobaleService,
    private machineService: MachineService,
    private dashboardService: DashboardService,
    private etl: EtlService) {
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

  ngOnInit(): void { }

  listUAP() {
    this.crud.getListEntity("uap").subscribe(
      data => {
        this.uaps = data;
      }
    )
  }

  getListCentreChargeByUAP(id: number) {
    this.datedeb = this.modelDebut.year.toString() + '-' + this.modelDebut.month.toString() + '-' + this.modelDebut.day.toString()
    this.ETL(this.datedeb)
    this.crud.getSonByMother("cc", id).subscribe(
      data => {
        this.centreChargeByUAP = data
        for (let i = 0; i < this.centreChargeByUAP.length; i++) {
          this.getListMachineReferenced(this.centreChargeByUAP[i].idCC)
        }
      })

    this.dashboardService.getDashboardByDate(this.datedeb).subscribe((data) => {
      localStorage.removeItem('dashboardUAP')
      this.dashboardUAP = data
      console.log(this.dashboardUAP)
      let temp_tester = this.dashboardUAP.map((data: any) => data.testeurId.idMachine)
      this.tester = temp_tester
      let temp_fonctionnement = this.dashboardUAP.map((data: any) => data.dureeFonctionnementSeconde)
      let temp_disfonctionnement = this.dashboardUAP.map((data: any) => data.dureeDisfonctionnementSeconde)
      let conforme = this.dashboardUAP.map((data: any) => data.quantiteConforme)
      let nonConforme = this.dashboardUAP.map((data: any) => data.quantiteNonConforme)
     // let date = this.dashboardUAP.map((data: any) => data.date)
      let sommeConforme = 0
      for (let i = 0; i < conforme.length; i++) { sommeConforme = sommeConforme + conforme[i] }

      let sommeNonConforme = 0
      for (let i = 0; i < nonConforme.length; i++) { sommeNonConforme = sommeNonConforme + nonConforme[i] }

      var myChartPieUAP = new Chart("myChartPieUAP", {
        type: 'pie',
        data: {
          labels: ["conforme", "nonConforme"],
          datasets: [{
            label: "date",
            data: [sommeConforme, sommeNonConforme],
            backgroundColor: [
              "rgba(3, 58, 118, 0.5)",
              "rgba(219, 0, 66, 0.3)"
            ],
            borderColor: [
              "rgba(3, 58, 118, 1)",
              "rgba(219, 0, 66, 1)"
            ],
            borderWidth: 1
          }
          ]
        }
      })

      var myChartLineUAP = new Chart("myChartLineUAP", {
        type: 'line',
        data: {
          labels: temp_tester,
          datasets: [{
            label: 'Durée du fonctionnement',
            data: temp_fonctionnement,
            backgroundColor: "rgba(242, 200, 48, 0.5)",
            borderColor: "rgba(242, 200, 48, 1)",
            borderWidth: 1,
          },
          {
            label: 'Durée du disfonctionnement',
            data: temp_disfonctionnement,
            backgroundColor: "rgba(219, 0, 66, 0.5)",
            borderColor: "rgba(219, 0, 66, 1)",
            borderWidth: 1,
          }]
        }
      })
    })

  }

  getListMachineReferenced(idCentreCharge: number) {
    this.machineService.machineReferencedToCentreCharge(idCentreCharge).subscribe(data => {
      this.machineReferenced = data
      this.getDashboard(this.machineReferenced.idMachine)
    })
  }

  getDashboard(idMachine: number) {
    if (this.modelDebut != null) {
      this.datedeb = this.modelDebut.year.toString() + '-' + this.modelDebut.month.toString() + '-' + this.modelDebut.day.toString()
      this.dashboardService.getDashboardByDateBytesterId(this.datedeb, idMachine).subscribe(data => { this.dashboardCC = data })
    } else {
      this.dashboardService.getDashboardByTesterID(idMachine).subscribe(data => {
        this.dashboardCC = data
        console.log(this.dashboardCC)
      })
    }
    //

    let temp_fonctionnement = this.dashboardCC.map((data: any) => data.dureeFonctionnementSeconde)
    let temp_disfonctionnement = this.dashboardCC.map((data: any) => data.dureeDisfonctionnementSeconde)
    let conforme = this.dashboardCC.map((data: any) => data.quantiteConforme)
    let nonConforme = this.dashboardCC.map((data: any) => data.quantiteNonConforme)
    let date = this.dashboardCC.map((data: any) => data.date)
    let temp_tester = this.dashboardUAP.map((data: any) => data.testeurId.idMachine)

    var myChartBar = new Chart("myChartBar", {
      type: 'bar',
      data: {
        labels: date,
        datasets: [{
          label: 'Durée du fonctionnement',
          data: temp_fonctionnement,
          backgroundColor: "rgba(242, 200, 48, 0.5)",
          borderColor: "rgba(242, 200, 48, 1)",
          borderWidth: 1,
        },
        {
          label: 'Durée du disfonctionnement',
          data: temp_disfonctionnement,
          backgroundColor: "rgba(219, 0, 66, 0.5)",
          borderColor: "rgba(219, 0, 66, 1)",
          borderWidth: 1,
        }]
      }
    })

    //

    var myChartPie = new Chart("myChartPie", {
      type: 'pie',
      data: {
        labels: ["conforme", "nonConforme"],
        datasets: [{
          label: "date",
          data: [conforme, nonConforme],
          backgroundColor: [
            "rgba(242, 200, 48, 0.5)",
            "rgba(219, 0, 66, 0.5)"
          ],
          borderColor: [
            "rgba(242, 200, 48, 1)",
            "rgba(219, 0, 66, 1)"
          ],
          borderWidth: 1
        }
        ]
      }
    })

  }

  ETL(date: string) {
    this.etl.ETLDEVP87(date).subscribe(() => { console.log("ETL DEVP87 done! ") })
    this.etl.ETLSIRCOVER(date).subscribe(() => { console.log("ETL SIRCOVER done! ") })
    this.etl.ETLFuserbloc(date).subscribe(() => { console.log("ETL Fuserbloc done! ") })
    this.etl.ETLVM(date).subscribe(() => { console.log("ETL VM done! ") })
    this.etl.ETLP77(date).subscribe(data => { console.log("ETL P77 done! ") })
    this.isOK = true
  }
}
