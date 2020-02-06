import { Component, OnInit } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Platform } from '@ionic/angular';



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
  constructor(private platform: Platform,private document: DocumentViewer,private file: File,private transfer: FileTransfer) {
    /*for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/
  }

  openLocalPdf() {
    const option: DocumentViewerOptions = {
        title: 'My PDF'
    };
    this.document.viewDocument('assets/D5100_EN.pdf', 'application/pdf', option);
  }

  downloadAndOpenPdf() {
    let path = null;
    
    if (this.platform.is('ios')) {
       path = this.file.documentsDirectory;
    } else {
       path = this.file.dataDirectory;
    }
    
    const transfer = this.transfer.create();
    transfer.download('https://cdn-10.nikon-cdn.com/pdf/manuals/dslr/D5100_EN.pdf', path + 'myfile.pdf').then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf',{});
    })
    
      
  }

  

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
