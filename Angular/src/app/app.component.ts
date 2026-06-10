import { Component } from '@angular/core';
import { DxTreeListModule } from 'devextreme-angular';
import type { DxTreeListTypes } from 'devextreme-angular/ui/tree-list';

import { Service, type Employee } from './app.service';

interface SummaryNode extends DxTreeListTypes.Node {
  isSummary?: boolean;
}

@Component({
    selector: 'app-root',
    imports: [DxTreeListModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [Service]  
})
export class AppComponent {
  employees: Employee[];

  constructor(private service: Service) {
    this.employees = service.getEmployees();
  }

  createSummaryNode(node: SummaryNode, count: number): SummaryNode {
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

  buildSummaries(node: SummaryNode): number {
    const children = node.children || [];
    node.children = children;

    let count = 0;

    for (const child of children as SummaryNode[]) {
      if (!child.isSummary) {
        const childDescendants = this.buildSummaries(child);
        count += (child.visible ? 1 : 0) + childDescendants;
      }
    }

    if (count > 0) {
      node.children.push(this.createSummaryNode(node, count));
    }

    return count;
  }

  onNodesInitialized(e: DxTreeListTypes.NodesInitializedEvent): void {
    this.buildSummaries(e.root as SummaryNode);
  }

  onRowPrepared(e: DxTreeListTypes.RowPreparedEvent): void {
    const node = e.node as SummaryNode | undefined;

    if (e.rowType === 'data' && node?.isSummary) {
      e.rowElement.classList.add('summary-row');
    }
  }
}
