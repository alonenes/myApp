import { Component, OnInit } from '@angular/core';
import { DatabaseService, Pdf } from './../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pdflist',
  templateUrl: './pdflist.page.html',
  styleUrls: ['./pdflist.page.scss'],
})
export class PdflistPage implements OnInit {

  pdf: Pdf = null;

  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let pdfId = params.get('id');
 
      this.db.getPdf(pdfId).then(data => {
        this.pdf = data;
      });
    });
  }

  /*delete() {
    this.db.deleteDeveloper(this.developer.id).then(() => {
      this.router.navigateByUrl('/');
    });
  }*/

}
