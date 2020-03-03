import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PdflistPage } from './pdflist.page';

describe('PdflistPage', () => {
  let component: PdflistPage;
  let fixture: ComponentFixture<PdflistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdflistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PdflistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
