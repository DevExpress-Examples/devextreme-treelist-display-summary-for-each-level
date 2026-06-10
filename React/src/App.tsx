import { useCallback } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import TreeList, {
  Column,
  Sorting,
  SearchPanel,
  FilterRow,
  HeaderFilter,
} from 'devextreme-react/tree-list';
import type { RowPreparedEvent, NodesInitializedEvent, Node } from 'devextreme/ui/tree_list';

import { employees } from './data';

interface SummaryNode extends Node {
  isSummary?: boolean;
}

function createSummaryNode(node: SummaryNode, count: number): SummaryNode {
  return {
    key: `summary_${node.key}`,
    parent: node.parent,
    level: node.level + 1,
    isSummary: true,
    data: { Title: `Count: ${count}` },
    children: [],
    visible: true,
  };
}

function buildSummaries(node: SummaryNode): number {
  const children = node.children || [];
  node.children = children;

  let count = 0;

  for (const child of children as SummaryNode[]) {
    if (!child.isSummary) {
      const childDescendants = buildSummaries(child);
      count += (child.visible ? 1 : 0) + childDescendants;
    }
  }

  if (count > 0) {
    node.children.push(createSummaryNode(node, count));
  }

  return count;
}

const expandedRowKeys = [1];

function App(): JSX.Element {
  const onNodesInitialized = useCallback((e: NodesInitializedEvent) => {
    buildSummaries(e.root as SummaryNode);
  }, []);

  const onRowPrepared = useCallback((e: RowPreparedEvent) => {
    const node = e.node as SummaryNode | undefined;

    if (e.rowType === 'data' && node?.isSummary) {
      e.rowElement.classList.add('summary-row');
    }
  }, []);

  return (
    <div className='demo-container'>
      <TreeList
        id="employees"
        dataSource={employees}
        rootValue={-1}
        defaultExpandedRowKeys={expandedRowKeys}
        showRowLines={true}
        showBorders={true}
        columnAutoWidth={true}
        keyExpr="ID"
        parentIdExpr="Head_ID"
        onNodesInitialized={onNodesInitialized}
        onRowPrepared={onRowPrepared}
      >
        <Sorting mode="multiple" />
        <SearchPanel visible={true} />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />

        <Column dataField="Title" caption="Position" />
        <Column dataField="Full_Name" />
        <Column dataField="City" />
        <Column dataField="State" />
        <Column dataField="Mobile_Phone" />
        <Column dataField="Hire_Date" dataType="date" />
      </TreeList>
    </div>
  );
}

export default App;
