<script setup lang="ts">
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DxTreeList, {
  DxColumn,
  DxSorting,
  DxSearchPanel,
  DxFilterRow,
  DxHeaderFilter,
} from 'devextreme-vue/tree-list';
import type { DxTreeListTypes } from 'devextreme-vue/tree-list';
import { employees } from '../data';

interface SummaryNode extends DxTreeListTypes.Node {
  isSummary?: boolean;
}

const expandedRowKeys = [1];

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

function onNodesInitialized(e: DxTreeListTypes.NodesInitializedEvent): void {
  buildSummaries(e.root as SummaryNode);
}

function onRowPrepared(e: DxTreeListTypes.RowPreparedEvent): void {
  const node = e.node as SummaryNode | undefined;

  if (e.rowType === 'data' && node?.isSummary) {
    e.rowElement.classList.add('summary-row');
  }
}
</script>

<template>
  <DxTreeList
    id="employees"
    :data-source="employees"
    :root-value="-1"
    :expanded-row-keys="expandedRowKeys"
    :show-row-lines="true"
    :show-borders="true"
    :column-auto-width="true"
    key-expr="ID"
    parent-id-expr="Head_ID"
    @nodes-initialized="onNodesInitialized"
    @row-prepared="onRowPrepared"
  >
    <DxSorting mode="multiple"/>
    <DxSearchPanel :visible="true"/>
    <DxFilterRow :visible="true"/>
    <DxHeaderFilter :visible="true"/>

    <DxColumn
      data-field="Title"
      caption="Position"
    />
    <DxColumn data-field="Full_Name"/>
    <DxColumn data-field="City"/>
    <DxColumn data-field="State"/>
    <DxColumn data-field="Mobile_Phone"/>
    <DxColumn
      data-field="Hire_Date"
      data-type="date"
    />
  </DxTreeList>
</template>

<style>
#employees {
  max-height: 660px;
}

.summary-row {
  font-weight: 600;
  background-color: #f5f5f5;
}
</style>
