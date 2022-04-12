import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UAP } from 'src/app/model/uap';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UapService } from 'src/app/services/uap.service';

@Component({
  selector: 'app-uap-list',
  templateUrl: './uap-list.component.html',
  styleUrls: ['./uap-list.component.css']
})
export class UapListComponent implements OnInit {

  uaps!: UAP[];
  uapName: String = '';
  uapDescription: String = '';
  constructor(private uapService: UapService,
              private token: TokenStorageService,
              private router: Router) { }

  isAdmin() { return this.token.getUser().roles[0] == "ROLE_ADMIN" }
  isUser() { return this.token.getUser().roles[0] == "ROLE_USER" }

  ngOnInit(): void {
    this.getListOfUAP();
  }

  getListOfUAP() {
    this.uapService.getUAPList().subscribe(
      data => {
        this.uaps = data;
      //  console.log(this.uaps);
      }
    )
  }

  deleteUAP(id: number) {
    this.uapService.deleteUAP(id).subscribe(
      data => {
       // console.log(data);
        this.getListOfUAP();
      }
    )
  }

  updateUAP(id: number) {
    this.router.navigate(['uap-update', id]);
  }

  loadChargeByUAP(id: number) {
    this.router.navigate(['load-charge-by-uap', id]);
  }

  Search() {
    if (this.uapDescription != "" || this.uapName != "") {
      this.uaps = this.uaps.filter(
        res => {
          return (
            res.uapDescription.toLocaleLowerCase().match(this.uapDescription.toLocaleLowerCase()) ||
            res.uapName.toLocaleLowerCase().match(this.uapName.toLocaleLowerCase())
          )
        })
    }
    else if (this.uapDescription == "" && this.uapName == "") {
      this.ngOnInit();
    }
  }
}