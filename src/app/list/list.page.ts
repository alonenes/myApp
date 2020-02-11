import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private platform: Platform, private file: File, private ft: FileTransfer,
     private fileOpener: FileOpener, private document: DocumentViewer) {
    /*for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/
  }
   
  openLocalPdf() {
     let  filePath = this.file.applicationDirectory + 'www/assets';
     if (this.platform.is('android')) {
       let fakeName = Date.now();
       this.file.copyFile(filePath, 'D5100_EN.pdf', this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
          this.fileOpener.open(result.nativeURL, 'application/pdf');
       });
     } else {
       const options: DocumentViewerOptions = {
          title: 'My PDF'
       }
       this.document.viewDocument(`${filePath}/D5100_EN.pdf`, 'application/pdf', options);
     }    

  }

  downloadAndOpenPdf() {
    let downloadUrl = 'https://gdlp01.c-wss.com/gds/6/0300002536/03/PSG11_CUG_EN_03.pdf';
    let path = 'this.file.dataDirectory';
    const transfer = this.ft.create();

    transfer.download(downloadUrl, `${path}myfile.pdf`).then(entry => {
      let url = entry.toURL();

      if (this.platform.is('ios')) {
        this.document.viewDocument(url, 'application/pdf', {});
      } else {
        this.fileOpener.open(url, 'application/pdf');
      }
    });
  }
  

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
