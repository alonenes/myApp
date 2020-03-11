import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { downloaddata } from '../../models/Rest_PDF';

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
  

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
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
    return this.database.executeSql('SELECT * FROM attach_pdf WHERE  attach_pdf_active = ?', [1]).then(data => {
      let pdfs: Pdf[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          
          pdfs.push({ 
                      attach_pdf_id: data.rows.item(i).attach_pdf_id,                   // Primary
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
    });
  }

  getPdf(attach_pdf_id): Promise<Pdf> {
    return this.database.executeSql('SELECT * FROM attach_pdf WHERE attach_pdf_id = ?', [attach_pdf_id]).then(data => {

      return {
        attach_pdf_id: data.rows.item(0).attach_pdf_id,                   // Primary
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
  updateURLpath(pdf:Pdf,url:string) {
    let data = [url]
    return this.database.executeSql(`UPDATE attach_pdf SET url_path = ? WHERE attach_pdf_id = ${pdf.attach_pdf_id}`, [data]).then(data => {
      this.loadPdfsfromDB();
    })
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
          this.database.executeSql(`INSERT or IGNORE INTO attach_pdf ( 
            attach_id ,              
            menu_category_id ,
            menu_category_name ,
            menu_category_level ,
            employee_code ,
            employee_name ,
            admin_type ,
            attach_pdf_path ,
            attach_pdf_size ,
            attach_pdf_originalname ,
            attach_pdf_description ,
            attach_pdf_datetime ,
            usercrewgroup 
          ) VALUES 
          (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [result.data[count].attach_id,
           result.data[count].menu_category_id,
           result.data[count].menu_category_name,
           result.data[count].menu_category_level,
           result.data[count].employee_code,
           result.data[count].employee_name,
           result.data[count].admin_type,
           result.data[count].attach_path,
           result.data[count].attach_size,
           result.data[count].attach_original_name,
           result.data[count].attach_description,
           result.data[count].attach_datetime,
           result.data[count].usercrewgroup
          ]).then(() => {
            alert('Row Inserted!');
          })
          .catch(e => {
            alert("error " + JSON.stringify(e))
          });
          // INSERT or IGNORE  INTO attach_pdf 
          // (attach_pdf_id, menu_category_id, employee_code, employee_name, admin_type, 
          //attach_pdf_path, attach_pdf_size, attach_pdf_originalname, attach_pdf_description, 
          //attach_pdf_datetime, attach_by_cb, attach_by_ca, attach_by_fb, attach_by_fa, usercrewgroup, attach_pdf_active)
          console.log(result.data[count].attach_id);
          count++;
        }
      }
      this.loadPdfsfromDB();
     });
  }
  
}
