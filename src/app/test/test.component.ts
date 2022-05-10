import { Component, OnInit } from '@angular/core';
import { machine } from '../model/machine';
import { summary } from '../model/summary';
import { CrudGlobaleService } from '../services/crud-globale.service';
import { MachineService } from '../services/machine.service';
import { ProductionService } from '../services/production.service';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  mois = [
    { id: 1, mois: "janvier" },
    { id: 2, mois: "fevrier" },
    { id: 3, mois: "mars" },
    { id: 4, mois: "avril" },
    { id: 5, mois: "mai" },
    { id: 6, mois: "juin" },
    { id: 7, mois: "juillet" },
    { id: 8, mois: "août" },
    { id: 9, mois: "septembre" },
    { id: 10, mois: "octobre" },
    { id: 11, mois: "novembre" },
    { id: 12, mois: "decembre" }
  ]

  year = [
    { id: 2010 }, 
    { id: 2011 }, 
    { id: 2012 },
    { id: 2013 },
    { id: 2014 }, 
    { id: 2015 }, 
    { id: 2016 }, 
    { id: 2017 }, 
    { id: 2018 }, 
    { id: 2019 }, 
    { id: 2020 }, 
    { id: 2021 }, 
    { id: 2022 }, 
  ]

  moisId!: number
  yearId!: number

  listSummaries!: summary[]
  listTesterID!: machine[]

  databaseId: string = ''

  rapport : any

    //properties for pagination
    thePageNumber: number = 1;
    thePageSize: number = 10;
    theTotalElements: number = 0;

  constructor(
    private productionService : ProductionService,
    private crudService: CrudGlobaleService) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()

    this.crudService.getListEntity("machine").subscribe(
      data => {this.listTesterID = data
        console.log(this.listTesterID)
      }
    )
    
  }

  listsummary() {
    console.log(this.yearId)
    this.productionService.getSummaryByYearByMonth(
      this.databaseId,
      this.moisId, 
      this.yearId,
      this.thePageSize,
      this.thePageNumber - 1).subscribe(this.processResult())
  }

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