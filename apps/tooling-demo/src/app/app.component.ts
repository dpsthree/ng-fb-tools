import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'ng-fb-tools-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-fb-tools';
  items: Observable<any[]>;
  constructor(private firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
    this.exposeTestingMethods();
  }

  async clearItems() {
    const qry = await this.firestore.collection('items').ref.get();

    qry.forEach((doc) => {
      doc.ref.delete();
    });
  }

  async addItem(newItem: { label: string }) {
    const newId = this.firestore.createId();
    return this.firestore
      .collection('items')
      .doc(newId)
      .set(Object.assign({}, newItem));
  }

  exposeTestingMethods() {
    window.dashboardModel = {
      clearItems: this.clearItems.bind(this),
      addItem: this.addItem.bind(this),
    };
  }
}
