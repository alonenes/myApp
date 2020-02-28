import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdflistsPageRoutingModule } from './pdflists-routing.module';

import { PdflistsPage } from './pdflists.page';

import { DatabaseService, Pdf } from './../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdflistsPageRoutingModule
  ],
  declarations: [PdflistsPage]
})
export class PdflistsPageModule {

  pdfs: Pdf[] = [];

  pdf = {};

  selectedView = 'Bulletin';

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getPdfs().subscribe(pdfs => {
          this.pdf = pdfs;
        })
        //this.products = this.db.getProducts();
      }
    });
  }

}
