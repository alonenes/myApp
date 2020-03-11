import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { downloaddata } from '../../models/Rest_PDF';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';


export interface Pdf {
  attach_pdf_id: number,                // Primary
  menu_category_id: number,             // Category
  employee_code: string,                // รหัสพนักงานที่อัพโหลด Upload By CODE
  employee_name: string,                // ชื่อพนักงานที่อัพโหลด Upload By EMP
  attach_pdf_description: string,       // คำอธิบาย File PDF
  attach_pdf_datetime: string,          // วันที่ Upload File
  admin_type: string,                   // ฝ่ายที่ Upload File
  attach_pdf_path: string               // Path PDF
  download_pdf_date: string,            // วันที่ Download
  url_path : string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  pdfs = new BehaviorSubject([]);
  mPdf:downloaddata;

  readonly domain_name: string = "http://cdic.lionairapp.com";
  

  constructor(private plt: Platform, 
              private sqlitePorter: SQLitePorter, 
              private sqlite: SQLite, 
              private http: HttpClient,
              private file: File, 
              private ft: FileTransfer,
              private toast: ToastController) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.InsertFromRest();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getPdfs(): Observable<Pdf[]> {
    return this.pdfs.asObservable();
  }

  loadPdfsfromDB() {
    return this.database.executeSql('SELECT * FROM attach_pdf ', []).then(data => {
      let pdfs: Pdf[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          
          pdfs.push({ 
                      attach_pdf_id: data.rows.item(i).attach_id,                   // Primary
                      menu_category_id: data.rows.item(i).menu_category_id,             // Category
                      employee_code: data.rows.item(i).employee_code,                   // รหัสพนักงานที่อัพโหลด Upload By CODE
                      employee_name: data.rows.item(i).employee_name,                   // ชื่อพนักงานที่อัพโหลด Upload By EMP
                      attach_pdf_description: data.rows.item(i).attach_pdf_description, // คำอธิบาย File PDF
                      attach_pdf_datetime: data.rows.item(i).attach_pdf_datetime,       // วันที่ Upload File
                      admin_type: data.rows.item(i).admin_type,
                      download_pdf_date: data.rows.item(i).download_pdf_date,
                      url_path: data.rows.item(i).url_path,
                      attach_pdf_path: data.rows.item(i).attach_pdf_path
           });
        }
      }
      this.pdfs.next(pdfs);
      console.log("loadPDF ACTIVE!!")
    }).catch(e => {
      console.log("error " + JSON.stringify(e))
      // alert("error " + JSON.stringify(e))
    });
  }

  getPdf(attach_pdf_id): Promise<Pdf> {
    return this.database.executeSql('SELECT * FROM attach_pdf WHERE attach_id = ?', [attach_pdf_id]).then(data => {

      return {
        attach_pdf_id: data.rows.item(0).attach_id,                   // Primary
        menu_category_id: data.rows.item(0).menu_category_id,             // Category
        employee_code: data.rows.item(0).employee_code,                   // รหัสพนักงานที่อัพโหลด Upload By CODE
        employee_name: data.rows.item(0).employee_name,                   // ชื่อพนักงานที่อัพโหลด Upload By EMP
        attach_pdf_description: data.rows.item(0).attach_pdf_description, // คำอธิบาย File PDF
        attach_pdf_datetime: data.rows.item(0).attach_pdf_datetime,       // วันที่ Upload File
        admin_type: data.rows.item(0).admin_type,
        download_pdf_date: data.rows.item(0).download_pdf_date,
        url_path: data.rows.item(0).url_path,
        attach_pdf_path: data.rows.item(0).attach_pdf_path
      }
    });
  }
  
  /*รอปรับปรุง ใช้เพื่อลบ DB*/ 
  // deleteDeveloper(id) {
  //   return this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]).then(_ => {
  //     this.loadDevelopers();
  //     this.loadProducts();
  //   });
  // }
  //รอปรับปรุง ใช้เพื่อUpdate DB
  updateURLpath(pdf:any,url:string) {
    let data = [url]
    return this.database.executeSql(`UPDATE attach_pdf SET url_path = ? WHERE attach_id = ${pdf.attach_pdf_id}`, [data]).then(data => {
      this.loadPdfsfromDB();
    })
  }

  updateURLpaths(pdf:any,url:string) {
    // let data = [url,pdf]
    console.log('attach id ' + pdf + 'url : ' + url);
    return this.database.executeSql(`UPDATE attach_pdf SET url_path = ? WHERE attach_id = ?`, [url,pdf]).then(data => {
      console.log('Update path Success!!')
      this.loadPdfsfromDB();
    }).catch(e =>{
      console.log('Update Path Error!! :'+JSON.stringify(e))
    });
  }

  feed():Observable<downloaddata>{
    console.log('Feed Active!!');
    let url = "https://cdic.lionairapp.com/webservice/data/getfile/id/TL152554";
    return this.http.get<downloaddata>(url);
  }

  InsertFromRest(){
    console.log('InsertFromRest Active!!');
    this.feed().subscribe(result =>{
      let key, count = 0;

      for(key in result.data) {
        if(result.data.hasOwnProperty(key)) {
          console.log('attach_id : ' + result.data[count].attach_id);
          this.database.executeSql(`INSERT or IGNORE INTO attach_pdf ( 
            attach_id,
            menu_category_id,
            menu_category_name,
            employee_code,
            employee_name,
            attach_pdf_description,
            attach_pdf_datetime,
            admin_type,
            attach_pdf_path
          ) VALUES 
          (?,?,?,?,?,?,?,?,?);`,
          [result.data[count].attach_id,
           result.data[count].menu_category_id,
           result.data[count].menu_category_name,
           result.data[count].employee_code,
           result.data[count].employee_name,
           result.data[count].attach_description,
           result.data[count].attach_datetime,
           result.data[count].admin_type,
           result.data[count].attach_path
          ]).then(() => {
            console.log('Row Inserted!');
            
            // alert('Row Inserted!');
          })
          .catch(e => {
            console.log("error " + JSON.stringify(e))
            // alert("error " + JSON.stringify(e))
          });
          this.Download_ROWs_Update(result.data[count].attach_path,
                                    result.data[count].attach_description,
                                    result.data[count].attach_id);
          count++;
        }
      }
      alert('Row '+(count)+' Inserted !');
      this.loadPdfsfromDB();
     });
  }

  Download_ROWs_Update(Pdfpath:string,Pdfnam:string,Pdfid:string) {
    let downloadUrl = this.domain_name +Pdfpath; 
    let path = this.file.dataDirectory +Pdfnam;
    const transfer = this.ft.create();
 
      console.log('downloadUrl is '+ downloadUrl);
      console.log('Path is '+ path);
      console.log('Transfer is '+ transfer);
      
    transfer.download(downloadUrl, `${path}`).then(entry => {
      let url = entry.toURL();
       console.log('url is '+ url);

       this.updateURLpaths(Pdfid,url).then(async (res) => {
        let toast = await this.toast.create({
          message: 'Download Success',
          duration: 2000
        });
        toast.present();
        
      });
 
    });
  }

}
