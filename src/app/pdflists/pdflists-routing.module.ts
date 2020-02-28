import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdflistsPage } from './pdflists.page';

const routes: Routes = [
  {
    path: '',
    component: PdflistsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdflistsPageRoutingModule {}
