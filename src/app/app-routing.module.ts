import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'pdflists',
    loadChildren: () => import('./pdflists/pdflists.module').then(m => m.PdflistsPageModule)
  },
  {
    path: 'pdflists/:attach_pdf_id',
    loadChildren: () => import('./pdflist/pdflist.module').then(m => m.PdflistPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
