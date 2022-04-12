import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LaodCharge } from 'src/app/model/LaodCharge';
import { UAP } from 'src/app/model/uap';
import { LoadChargeService } from 'src/app/services/load-charge.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-load-charge-by-uap',
  templateUrl: './load-charge-by-uap.component.html',
  styleUrls: ['./load-charge-by-uap.component.css']
})
export class LoadChargeByUapComponent implements OnInit {
  id!: number;  
  loadCharge! : LaodCharge[];
  ccname: String = '';
  ccdescription : String='';
  loadChargeID!: LaodCharge;


  constructor(private loadChargeService: LoadChargeService,
    private token: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute) {}

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getListLoadCharge(this.id)
    this.loadChargeService.getLoadChargeById(this.id).subscribe(
      data => {
        this.loadChargeID = data
        console.log(data)
      }
    )
  }

  getListLoadCharge(id: number){
    this.loadChargeService.listLoadChargeByUAP(id).subscribe(
      data => {
        this.loadCharge = data
      //  console.log(data)
      }
    )
  }

  
  deleteLoadCharge(id: number){
    this.loadChargeService.deleteLoadCharge(id).subscribe(
      data => {
     //   console.log(data);
        this.getListLoadCharge(id);
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