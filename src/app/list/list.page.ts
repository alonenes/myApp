import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  readonly domain_name: string = "http://cdic.lionairapp.com";

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
  constructor(private platform: Platform, 
              private file: File, 
              private ft: FileTransfer,
              private fileOpener: FileOpener, 
              private document: DocumentViewer, 
              public alertCrtl: AlertController) {
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
     console.log('filePath is '+ filePath);
     if (this.platform.is('android')) { 
       let fakeName = Date.now();
       this.file.copyFile(filePath, 'D5100_EN.pdf', this.file.dataDirectory, `${fakeName}.pdf`).then(result => {
          this.fileOpener.open(result.nativeURL, 'application/pdf');
          this.presentAlert("openLocalPdf","openning","");
       });
     } else {
       const options: DocumentViewerOptions = {
          title: 'My PDF'
       }
       this.document.viewDocument(`${filePath}/D5100_EN.pdf`, 'application/pdf', options);
     }    

  }

  downloadAndOpenPdf() {
    let downloadUrl = this.domain_name +'/public/documents/pdf/1.pdf';
      console.log('downloadUrl is '+ downloadUrl);
    let path = this.file.dataDirectory;
      console.log('Path is '+ path);
    const transfer = this.ft.create();

    transfer.download(downloadUrl, `${path}myfile.pdf`).then(entry => {
      let url = entry.toURL();
       console.log('url is '+ url);
        
      if (this.platform.is('ios')) {
        console.log(this.platform.is);
        this.document.viewDocument(url, 'application/pdf', {});
      } else {
        console.log(this.platform.is);
        this.fileOpener.open(url, 'application/pdf');
      }
    });
  }

  async presentAlert(head:string,subhead:string,message:string) {
    const alert = await this.alertCrtl.create({
      header: head,
      subHeader: subhead,
      message: message,
      buttons: ['Close']
    });
    console.log("presentAlert is running");
    await alert.present();
  }
  

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
