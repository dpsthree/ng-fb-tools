import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const itemsCollection = new Subject();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const docs = [{ ref: { delete: () => {} } }];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: AngularFirestore,
          useValue: {
            collection: () => ({
              valueChanges: () => itemsCollection,
              ref: {
                get: () => docs,
              },
            }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-fb-tools'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ng-fb-tools');
  });
});
