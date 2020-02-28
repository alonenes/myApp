import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdflistPage } from './pdflist.page';

const routes: Routes = [
  {
    path: '',
    component: PdflistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdflistPageRoutingModule {}
