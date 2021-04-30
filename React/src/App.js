
import React, { useCallback, useMemo } from 'react';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './App.css';

import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { TreeList, Column } from 'devextreme-react/tree-list';


import { departments } from './data.js';

const dataSource = new DataSource({
    store: new ArrayStore({
        data: departments
    }),
    reshapeOnPush: true
});

function App() {
    
    var values = useMemo(()=>[]);
  

    const onContentReady = useCallback((e) => {
        if (e.component.isNotFirstLoad) return;
        e.component.isNotFirstLoad = true;
        getSummary(e.component.getRootNode());

        var store = e.component.getDataSource().store();
        store.load().done((items) => {
            let lastId = items[items.length - 1].ID + 1;

            let changes = [];
            for (let i = 0; i < values.length; i++) {

                changes.push({
                    type: "insert",
                    data: {
                        ID: lastId,
                        Head_ID: values[i].Head_ID,
                        Department: values[i].Department,
                        Budget: values[i].Budget
                    }
                });
                lastId++;
            }
            store.push(changes);
        });
    })

    const onRowPrepared = (e) => {
        if (e.rowType === "data" && e.values[0].includes("=")) {
            e.rowElement.style.backgroundColor = "#E8E8E8";
        }
    }

    const getSummary = (node) => {
        let result = [0, 0];
        if (node.hasChildren) {
            node.children.forEach(function (n) {
                result[0] = result[0] + 1; //count
                result[1] += n.data.Budget; //sum
                getSummary(n).forEach(function (item, index) {
                    result[index] += item;
                });
            });
        }
        if (result[0] > 0) {
            if (node.data) {
                values.push({
                    Department: node.data.Department + " Count = " + result[0],
                    Head_ID: node.data.ID,
                    Budget: result[1]
                });
            } else
                values.push({
                    Department: "Overall Count = " + result[0],
                    Head_ID: 0,
                    Budget: result[1]
                });
        }
        return result;
    }

        return (
            <TreeList
                id="departments"
                dataSource={dataSource}
                autoExpandAll={true}
                showRowLines={true}
                showBorders={true}
                columnAutoWidth={true}
                repaintChangesOnly={true}
                keyExpr="ID"
                parentIdExpr="Head_ID"      
                onContentReady={onContentReady}
                onRowPrepared={onRowPrepared}
            >
                <Column
                    dataField="Department"
                />
                <Column
                    dataField="Location" />
                <Column
                    dataField="Budget"
                    format="currency" />
            </TreeList>
        );
    
}

export default App;
