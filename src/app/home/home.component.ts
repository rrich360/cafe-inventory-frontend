import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  focus: any;
  focus1: any;

  constructor(private dialog:MatDialog,
    private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer
  ) { 
      this.matIconRegistry.addSvgIcon(
        'coffee-building',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/coffee-building.svg')
      ),
      this.matIconRegistry.addSvgIcon(
        'purchase-order',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/purchase-order.svg')
      ),
      this.matIconRegistry.addSvgIcon(
        'delivery-truck',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/delivery-truck.svg')
      ),
      this.matIconRegistry.addSvgIcon(
        'coffee-menu',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svg/coffee-menu.svg')
      )
  }

  ngOnInit(): void {
  }

  // handleRegisterAction(){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = "550px";
  //   this.dialog.open(RegisterComponent, dialogConfig);
  // }

}
