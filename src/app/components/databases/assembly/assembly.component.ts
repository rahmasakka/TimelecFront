import { Component, OnInit } from '@angular/core';
import { MechanicalService } from 'src/app/services/mechanical.service';
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
  selector: 'app-assembly',
  templateUrl: './assembly.component.html',
  styleUrls: ['./assembly.component.scss']
})
export class AssemblyComponent implements OnInit {
  
  databaseId: string = ''
  of!: string
  listMechanical: any
  dateDeb !: string
  dateFin !: string

  timeDeb !: string
  timeFin !: string

  sommePiece!: number
  SommeEmballage !: number
  sommeNonEmballé !: number

  constructor(private mechanicalService : MechanicalService) { 
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

  ngOnInit(): void {}


  getMechanical(){
    this.getMechanicalByOf(this.databaseId, this.of)
  }

  getMechanicalByOf(databaseId : string, of: string){
    this.mechanicalService.assemblyByOf(databaseId, of).subscribe(
      data =>{
        this.listMechanical = data 
        let date = this.listMechanical.map((data: any) => data[1])
        this.dateDeb = date[0]
        this.dateFin = date[this.listMechanical.length - 1]

        let time = this.listMechanical.map((data:any) => data[2])
        this.timeDeb = time[0]
        this.timeFin = time[this.listMechanical.length - 1]
       
        let somme = this.listMechanical.map((data: any) => data[3])
        this.sommePiece = somme.length
        
        
        this.mechanicalService.sumPacking(databaseId, of).subscribe(
          data => {
            this.SommeEmballage = data
            this.sommeNonEmballé = this.sommePiece - this.SommeEmballage

            var myChartPieEmballage = new Chart("myChartPieEmballage", {
              type: 'pie',
              data: {
                labels: ["Pièces emballées", "Pièces non emballées"],
                datasets: [{
                  label: "date",
                  data: [this.SommeEmballage, this.sommeNonEmballé],
                  backgroundColor: [
                    "rgba(102, 255, 168, 0.3)",
                    "rgba(219, 0, 66, 0.3)"
                  ],
                  borderColor: [
                    "rgba(102, 255, 168, 1)",
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
    )
  }
}