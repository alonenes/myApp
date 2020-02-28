import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Pdf {
  attach_pdf_id: number,                // Primary
  menu_category_id: number,             // Category
  employee_code: string,                // รหัสพนักงานที่อัพโหลด Upload By CODE
  employee_name: string,                // ชื่อพนักงานที่อัพโหลด Upload By EMP
  attach_pdf_description: string,       // คำอธิบาย File PDF
  attach_pdf_datetime: string,          // วันที่ Upload File
  admin_type: string                    // ฝ่ายที่ Upload File
  attach_pdf_path: string               // Path File
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  pdfs = new BehaviorSubject([]);
  

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
          this.loadPdf();
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
  loadPdf() {
    return this.database.executeSql('SELECT * FROM attach_pdf ', []).then(data => {
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
                      attach_pdf_path: data.rows.item(i).attach_pdf_path
           });
        }
      }
      this.pdfs.next(pdfs);
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
  /*รอปรับปรุง ใช้เพื่อUpdate DB
  updateDeveloper(dev: Dev) {
    let data = [dev.name, JSON.stringify(dev.skills), dev.img];
    return this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadDevelopers();
    })
  }*/
}
