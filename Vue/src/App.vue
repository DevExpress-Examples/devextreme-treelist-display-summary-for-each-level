<template>
    <div>
        <DxTreeList id="employees"
                    :data-source="departments"
                    :repaint-changes-only="true"
                    :auto-expand-all="true"
                    :show-row-lines="true"
                    :show-borders="true"
                    :column-auto-width="true"
                    key-expr="ID"
                    parent-id-expr="Head_ID"
                    @content-ready="onContentReady"
                    @row-prepared="onRowPrepared">
            <DxColumn data-field="Department"/>
            <DxColumn data-field="Location" />
            <DxColumn data-field="Budget" format="currency"/>
        </DxTreeList>
    </div>
</template>
<script>
    import { data } from './data.js';
    import { DxTreeList, DxColumn } from 'devextreme-vue/tree-list';
    import ArrayStore from 'devextreme/data/array_store';
    import DataSource from 'devextreme/data/data_source';

    let values = [];

    const departments = new DataSource({
        store: new ArrayStore({
            key: 'ID',
            data: data,
        }),
        reshapeOnPush: true
    });

    export default {
        components: {
            DxTreeList, DxColumn
        },
        data() {
            return {
                departments
            };
        },
        methods: {
            onRowPrepared(e) {
                if (e.rowType === "data" && e.values[0].includes("=")) {
                    e.rowElement.style.backgroundColor = "#E8E8E8";
                }
            },
            onContentReady(e) {
                if (e.component.isNotFirstLoad) return;
                e.component.isNotFirstLoad = true;
                this.getSummary(e.component.getRootNode());

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
                
            },

            getSummary(node) {
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
        }

    };
</script>
<style scoped>
    #employees {
        max-height: 440px;
    }
</style>
