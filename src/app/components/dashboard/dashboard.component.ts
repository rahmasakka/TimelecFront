import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
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
import { CrudGlobaleService } from 'src/app/services/crud-globale.service';
import { UAP } from 'src/app/model/uap';
import { DashboardService } from 'src/app/services/dashboard.service';
import { EtlService } from 'src/app/services/etl.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private datePipe: DatePipe, private etl: EtlService, private crud: CrudGlobaleService) {
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
  dateDebutSeconde: any;
  dateFinSeconde: any;
  dateDeb: any;
  dateFin: any;
  testerID: any
  isOK: any
  date!: any
  dashboard: any
  centreChargeByUAP!: any
  sommeDashboard!: any

  dashboardUAP: any
  dashboardUAPDetails: any
  dashboardCentreCharge: any
  nbj = 0
  uaps!: UAP[]

  ngOnInit(): void {
    this.listUAP()
    //this.refrech()

    var now: any = new Date();
    var millisTill: any = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    console.log(millisTill);

    if (millisTill < 0) {
      millisTill += 86400000; // it's after 10am, try 10am tomorrow.
    }

    setTimeout(function () { alert("It's 10am!") }, millisTill);

  }


  listUAP() {
    this.crud.getListEntity("uap").subscribe(
      data => {
        this.uaps = data;
      }
    )
  }

  getListCentreChargeByUAP(idUAP: number) {
    if (this.dateFin == undefined) {
      this.dateFin = this.dateDeb
    }

    if (this.dateDeb == undefined) {
      alert("Il faut choisir la date pour préparer le tableau de bord")
    }

    this.dashboardService.getDashboardByUAP(this.dateDeb, this.dateFin, idUAP).subscribe(

      (data: any) => {
        this.dashboardUAP = data
        let conforme = this.dashboardUAP.map((data: any) => data[27])
        let nonConforme = this.dashboardUAP.map((data: any) => data[28])
        var myChartPie = new Chart("myChartPieByUAP", {
          type: 'pie',
          data: {
            labels: ["sommeConforme", "sommeNonConforme"],
            datasets: [{
              label: "date",
              data: [conforme, nonConforme],
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
      }
    )

    this.dashboardService.getDashboardByUAPDetails(this.dateDeb, this.dateFin, idUAP).subscribe(
      (data: any) => {
        this.dashboardUAPDetails = data
        console.log(this.dashboardUAPDetails)
        let temp_fonctionnement = this.dashboardUAPDetails.map((data: any) => data[26])
        let temp_disfonctionnement = this.dashboardUAPDetails.map((data: any) => data[25])
        let sommeConforme = this.dashboardUAPDetails.map((data: any) => data[27])
        let sommeNonConforme = this.dashboardUAPDetails.map((data: any) => data[28])
        let centre_charge = this.dashboardUAPDetails.map((data: any) => data[21])
        var myChartLine = new Chart("myChartLineByUAPDetails", {
          type: 'bar',
          data: {
            labels: centre_charge,
            datasets: [{
              label: 'Durée du fonctionnement',
              data: temp_fonctionnement,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: 'Durée du disfonctionnement',
              data: temp_disfonctionnement,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            }]
          }
        })

        var myChartLine = new Chart("myCharBarByUAPDetails", {
          type: 'bar',
          data: {
            labels: centre_charge,
            datasets: [{
              label: 'Quantité conforme',
              data: sommeConforme,
              backgroundColor: "rgba(3, 58, 118, 0.5)",
              borderColor: "rgba(3, 58, 118, 1)",
              borderWidth: 1,
            },
            {
              label: 'Quantité non conforme',
              data: sommeNonConforme,
              backgroundColor: "rgba(219, 0, 66, 0.5)",
              borderColor: "rgba(219, 0, 66, 1)",
              borderWidth: 1,
            }]
          },

        })
      }
    )
    this.crud.getSonByMother("cc", idUAP).subscribe(
      data => this.centreChargeByUAP = data
    )
  }



  getDashboardCentreCharge(idCC: number) {
    if (this.dateDeb == undefined) {
      alert("Il faut choisir la date pour préparer le tableau de bord")
    }
    this.dashboardService.dashboardByCentreCharge(this.dateDeb, this.dateFin, idCC).subscribe(
      (data: any) => {
        this.dashboardCentreCharge = data
        console.log(this.dashboardCentreCharge)

        let temp_fonctionnement = this.dashboardCentreCharge.map((data: any) => data[26])
        let temp_disfonctionnement = this.dashboardCentreCharge.map((data: any) => data[25])
        let centre_charge = this.dashboardCentreCharge.map((data: any) => data[21])
        let date = this.dashboardCentreCharge.map((data: any) => data[9])

        var myChartLine = new Chart("myChartLineByCentreCharge", {
          type: 'bar',
          data: {
            labels: centre_charge,
            datasets: [{
              label: 'Durée du fonctionnement',
              data: temp_fonctionnement,
              backgroundColor: "rgba(242, 200, 48, 0.3)",
              borderColor: "rgba(242, 200, 48, 1)",
              borderWidth: 1,
            },
            {
              label: 'Durée du disfonctionnement',
              data: temp_disfonctionnement,
              backgroundColor: "rgba(219, 0, 66, 0.3)",
              borderColor: "rgba(219, 0, 66, 1)",
              borderWidth: 1,
            }]
          }
        })
      }
    )
  }

  getDashboard() {
    if (this.dateFin == undefined) {
      this.dateFin = this.dateDeb
    }

    if (this.dateDeb == undefined) {
      alert("Il faut choisir la date pour préparer le tableau de bord")
    }

    if (this.testerID != null) {
      this.dashboardService.getDashboardGroupByDateUAPBytester(this.dateDeb, this.dateFin, this.testerID).subscribe(data => {
        this.dashboard = data
        let temp_fonctionnement = this.dashboard.map((data: any) => data[26])
        let temp_disfonctionnement = this.dashboard.map((data: any) => data[25])
        let conforme = this.dashboard.map((data: any) => data[27])
        let nonConforme = this.dashboard.map((data: any) => data[28])
        let date = this.dashboard.map((data: any) => data[9])

        var myChartLine = new Chart("myChartLineByDateByTester", {
          type: 'line',
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

        var myChartBar = new Chart("myChartBarByDateByTester", {
          type: 'bar',
          data: {
            labels: date,
            datasets: [{
              label: 'Quantité conforme',
              data: conforme,
              backgroundColor: "rgba(242, 200, 48, 0.3)",
              borderColor: "rgba(242, 200, 48, 1)",
              borderWidth: 1,
            },
            {
              label: 'Quantité non conforme',
              data: nonConforme,
              backgroundColor: "rgba(219, 0, 66, 0.3)",
              borderColor: "rgba(219, 0, 66, 1)",
              borderWidth: 1,
            }]
          }
        })
      })
    }
    this.dashboardService.getDashboardGroupByDateUAP(this.dateDeb, this.dateFin).subscribe(
      (data: any) => {
        this.dashboard = data
        let temp_fonctionnement = this.dashboard.map((data: any) => data[26])
        let temp_disfonctionnement = this.dashboard.map((data: any) => data[25])
        let conforme = this.dashboard.map((data: any) => data[27])
        let nonConforme = this.dashboard.map((data: any) => data[28])
        let temp_UAP = this.dashboard.map((data: any) => data[22])
        let date = this.dashboard.map((data: any) => data[9])

        var myChartLine = new Chart("myChartLineByDate", {
          type: 'line',
          data: {
            labels: temp_UAP,
            datasets: [{
              label: 'Durée du fonctionnement',
              data: temp_fonctionnement,
              backgroundColor: "rgba(242, 200, 48, 0.3)",
              borderColor: "rgba(242, 200, 48, 1)",
              borderWidth: 1,
            },
            {
              label: 'Durée du disfonctionnement',
              data: temp_disfonctionnement,
              backgroundColor: "rgba(219, 0, 66, 0.3)",
              borderColor: "rgba(219, 0, 66, 1)",
              borderWidth: 1,
            }]
          }
        })

        var myChartBar = new Chart("myChartBarByDate", {
          type: 'bar',
          data: {
            labels: temp_UAP,
            datasets: [{
              label: 'Quantité conforme',
              data: conforme,
              backgroundColor: "rgba(242, 200, 48, 0.3)",
              borderColor: "rgba(242, 200, 48, 1)",
              borderWidth: 1,
            },
            {
              label: 'Quantité non conforme',
              data: nonConforme,
              backgroundColor: "rgba(219, 0, 66, 0.3)",
              borderColor: "rgba(219, 0, 66, 1)",
              borderWidth: 1,
            }]
          }
        })
      }
    )

    this.dashboardService.getSommeGlobale(this.dateDeb, this.dateFin).subscribe(
      (data: any) => {
        this.sommeDashboard = data
        console.log(this.sommeDashboard)
        let sommeConforme = this.sommeDashboard.map((data: any) => data[27])
        let sommeNonConforme = this.sommeDashboard.map((data: any) => data[28])

        var myChartPie = new Chart("myChartPieSomme", {
          type: 'pie',
          data: {
            labels: ["Conforme", "Non Conforme"],
            datasets: [{
              label: "date",
              data: [sommeConforme, sommeNonConforme],
              backgroundColor: [
                "rgba(3, 58, 118, 0.3)",
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
      }
    )
  }


  ETL() {
    if (this.dateDeb == undefined) {
      alert("Il faut choisir la date pour préparer le tableau de bord")
    }
    this.dateDebutSeconde = new Date(this.dateDeb).getTime();
    this.dateFinSeconde = new Date(this.dateFin).getTime();
    this.nbj = (this.dateFinSeconde - this.dateDebutSeconde) / 86400000;
    for (let i = 0; i <= this.nbj; i++) {
      this.date = this.datePipe.transform((this.dateDebutSeconde + (i * 86400000)), 'yyyy-MM-dd')
      this.ETLDate(this.date)
    }
  }

  refrech() {
    setInterval(() => {
      this.ETL(); // api call
    }, 1000 * 60);
  }

  ETLDate(date: any) {
    this.etl.ETLDEVP87(date).subscribe(() => { console.log(date + " ETL DEVP87 done! ") })
    this.etl.ETLSIRCOVER(date).subscribe(() => { console.log(date + " ETL SIRCOVER done! ") })
    this.etl.ETLFuserbloc(date).subscribe(() => { console.log(date + " ETL Fuserbloc done! ") })
    this.etl.ETLVM(date).subscribe(() => { console.log(date + " ETL VM done! ") })
    this.etl.ETLP77(date).subscribe(() => { console.log(date + " ETL P77 done! ") })
    this.isOK = true
  }

  exportExcel() {
    this.crud.exporterExcel(this.dateDeb, this.dateFin).subscribe((data) => {
      let file = new Blob([data], { type: 'application/vnd.ms-excel' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    })
  }
}