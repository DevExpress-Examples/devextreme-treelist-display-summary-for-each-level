import { Component, ViewChild } from '@angular/core';
import { DxTreeListComponent } from 'devextreme-angular';

import { Department, Service } from './app.service';

import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service]
})

export class AppComponent {
  title = 'TreeList with a summary';

  @ViewChild(DxTreeListComponent, { static: false }) treeList: DxTreeListComponent
  departments: DataSource;
  root: any;
  values: any = [];

  constructor(service: Service) {
    this.departments = new DataSource({
      store: new ArrayStore({
        key: "ID",
        data: service.getDepartment()
      }),
      reshapeOnPush: true
    });
    this.getSummary = this.getSummary.bind(this);
  }

  onNodesInitialized(e: any) {
    if (e.component.isNotFirstLoad) return;
    this.root = e.root;
  }

  onContentReady(e: any) {
    if (e.component.isNotFirstLoad) return;
    e.component.isNotFirstLoad = true;
    this.getSummary(this.root);

    var store = this.treeList.instance.getDataSource().store();
    store.load().done((items) => {
      let lastId = items[items.length - 1].ID + 1;

      let changes = [];
      for (let i = 0; i < this.values.length; i++) {

        changes.push({
          type: "insert",
          data: {
            ID: lastId,
            Head_ID: this.values[i].Head_ID,
            Department: this.values[i].Department,
            Budget: this.values[i].Budget
          }
        });
        lastId++;
      }
      store.push(changes);
    });
  }

  getSummary(node: any) {
    let result = [0, 0];
    if (node.hasChildren) {
      node.children.forEach((n) => {
        result[0] = result[0] + 1; //count
        result[1] += n.data.Budget; //sum
        this.getSummary(n).forEach((item, index) => {
          
          result[index] += item;
        });
      });
    }
    if (result[0] > 0) {
      if (node.data) {
        this.values.push({
          Department: node.data.Department + " Count = " + result[0],
          Head_ID: node.data.ID,
          Budget: result[1]
        });
      } else
        this.values.push({
          Department: "Overall Count = " + result[0],
          Head_ID: 0,
          Budget: result[1]
        });
    }
    return result;
  }

  onRowPrepared(e) {
    if (e.rowType === "data" && e.values[0].includes("=")) {
      e.rowElement.style.backgroundColor = "#E8E8E8";
    }
  }
}
