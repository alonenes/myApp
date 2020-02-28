import { Component, OnInit } from '@angular/core';
import { DatabaseService,  Pdf} from './../services/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pdflists',
  templateUrl: './pdflists.page.html',
  styleUrls: ['./pdflists.page.scss'],
})
export class PdflistsPage implements OnInit {

  pdfs: Pdf[] = [];

  pdf = {};

  selectedView = 'Bulletin';

  constructor(private db: DatabaseService) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getPdfs().subscribe(pdfs => {
          this.pdfs = pdfs;
        })
        //this.products = this.db.getProducts();
      }
    });
  }

}
