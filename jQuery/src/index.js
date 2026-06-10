import { employees } from './data.js';

$(() => {
  $('#employees').dxTreeList({
    dataSource: employees,
    rootValue: -1,
    keyExpr: 'ID',
    parentIdExpr: 'Head_ID',
    columns: [
      {
        dataField: 'Title',
        caption: 'Position',
      },
      'Full_Name',
      'City',
      'State',
      'Mobile_Phone',
      {
        dataField: 'Hire_Date',
        dataType: 'date',
      },
    ],
    sorting: {
      mode: 'multiple',
    },
    searchPanel: {
      visible: true,
    },
    filterRow: {
      visible: true,
    },
    headerFilter: {
      visible: true,
    },
    expandedRowKeys: [1],
    showRowLines: true,
    showBorders: true,
    columnAutoWidth: true,
    onNodesInitialized(e) {

        function createSummaryNode(node, count) {
            return {
                key: `summary_${node.key}`,
                parent: node.parent,
                isSummary: true,
                data: { Title: `Count: ${count}` },
                children: [],
                visible: true,
            };
        }

        function buildSummaries(node) {
            const children = node.children || [];
            let count = 0;

            for (const child of children) {
                if (child.isSummary) continue;
                const childDescendants = buildSummaries(child); 
                count += (child.visible ? 1 : 0) + childDescendants;
            }

            if (count > 0) {
                node.children.push(createSummaryNode(node, count));
            }
            return count;
        }

        buildSummaries(e.root);
    },
    onRowPrepared(e) {
      if (e.rowType === 'data' && e.node?.isSummary) {
        e.rowElement.addClass('summary-row');
      }
    },
  });
});
