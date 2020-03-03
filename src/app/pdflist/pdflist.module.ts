import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdflistPageRoutingModule } from './pdflist-routing.module';

import { PdflistPage } from './pdflist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdflistPageRoutingModule
  ],
  declarations: [PdflistPage]
})
export class PdflistPageModule {}
