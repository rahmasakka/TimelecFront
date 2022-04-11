import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LaodCharge } from 'src/app/model/LaodCharge';
import { LoadChargeService } from 'src/app/services/load-charge.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-load-charge-list',
  templateUrl: './load-charge-list.component.html',
  styleUrls: ['./load-charge-list.component.css']
})
export class LoadChargeListComponent implements OnInit {

  loadCharge! : LaodCharge[];
  ccname: String = '';
  ccdescription : String='';

  constructor(private loadChargeService : LoadChargeService, 
              private token: TokenStorageService,
              private router: Router) { }

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }                  
  ngOnInit(): void {
    this.getListLoadCharge();
  }


  getListLoadCharge(){
    this.loadChargeService.getLoadCharge().subscribe(
      data => {
        this.loadCharge = data;
        console.log(data)
      }
    )
  }

  deleteLoadCharge(id: number){
    this.loadChargeService.deleteLoadCharge(id).subscribe(
      data => {
        console.log(data);
        this.getListLoadCharge();
      }
    )
  }

  updateLoadCharge(id: number){
    this.router.navigate(['load-charge-update',id])
  }

  loadChargeDetails(id: number){
    this.router.navigate(['load-charge-details', id])
  }


  Search() {
    if (this.ccname != "" || this.ccdescription != "") {
      this.loadCharge = this.loadCharge.filter(
        res => {
          return (
            res.ccdescription.toLocaleLowerCase().match(this.ccdescription.toLocaleLowerCase()) ||
            res.ccname.toLocaleLowerCase().match(this.ccname.toLocaleLowerCase())
          )
        })
    }
    else if (this.ccdescription == "" && this.ccname == "") {
      this.ngOnInit();
    }
  }  
}