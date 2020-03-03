import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdflistsPageRoutingModule } from './pdflists-routing.module';

import { PdflistsPage } from './pdflists.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdflistsPageRoutingModule
  ],
  declarations: [PdflistsPage]
})
export class PdflistsPageModule {}
