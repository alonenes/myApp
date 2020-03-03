import { Component, OnInit } from '@angular/core';
import { DatabaseService,  Pdf } from './../services/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer,DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-pdflist',
  templateUrl: './pdflist.page.html',
  styleUrls: ['./pdflist.page.scss'],
})
export class PdflistPage implements OnInit {

  readonly domain_name: string = "http://cdic.lionairapp.com";
  pdf: Pdf = null;

  constructor(
    private route: ActivatedRoute, 
    private db: DatabaseService,
    private router: Router, 
    private toast: ToastController,
    private platform: Platform, 
    private file: File, 
    private ft: FileTransfer,
    private fileOpener: FileOpener, 
    private document: DocumentViewer) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let pdfId = params.get('attach_pdf_id');
 
      this.db.getPdf(pdfId).then(data => {
        this.pdf = data;
      });
    });
  }

  DownloadPDF(Pdfpath:string,Pdfnam:string) {
    let downloadUrl = this.domain_name +Pdfpath; 
    let path = this.file.dataDirectory +Pdfnam;
    const transfer = this.ft.create();
 
      console.log('downloadUrl is '+ downloadUrl);
      console.log('Path is '+ path);
      console.log('Transfer is '+ transfer);
      
    transfer.download(downloadUrl, `${path}`).then(entry => {
      let url = entry.toURL();
       console.log('url is '+ url);

       this.db.updateURLpath(this.pdf,url).then(async (res) => {
        let toast = await this.toast.create({
          message: 'Download Success',
          duration: 2000
        });
        toast.present();
      });
 
    });
  }

  OpenPDF(Pdfurl:string) {
 
      // ****IOS****   
      if (this.platform.is('ios')) {
        console.log(this.platform.is);
        this.document.viewDocument(Pdfurl, 'application/pdf', {});
      // ***Android***
      } else {
        console.log(this.platform.is);
        this.fileOpener.open(Pdfurl, 'application/pdf');
      }
    
  }

  /*delete() {
    this.db.deleteDeveloper(this.developer.id).then(() => {
      this.router.navigateByUrl('/');
    });
  }*/
  // updateDeveloper() {
   
  //   this.db.updateDeveloper(this.pdf).then(async (res) => {
  //     let toast = await this.toast.create({
  //       message: 'Developer updated',
  //       duration: 3000
  //     });
  //     toast.present();
  //   });
  // }
}
