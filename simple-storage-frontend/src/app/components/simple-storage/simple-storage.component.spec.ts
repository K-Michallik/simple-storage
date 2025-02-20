import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SimpleStorageComponent} from "./simple-storage.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('SimpleStorageComponent', () => {
  let fixture: ComponentFixture<SimpleStorageComponent>;
  let component: SimpleStorageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleStorageComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleStorageComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
