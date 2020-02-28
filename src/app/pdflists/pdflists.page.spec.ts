import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PdflistsPage } from './pdflists.page';

describe('PdflistsPage', () => {
  let component: PdflistsPage;
  let fixture: ComponentFixture<PdflistsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdflistsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PdflistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
