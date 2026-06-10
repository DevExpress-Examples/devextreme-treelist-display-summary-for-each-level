<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/355815169/25.2.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T988572)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# DevExtreme TreeList - Display a Summary for Each Hierarchy Level

This example demonstrates how to display a custom summary row for each level in the DevExtreme [TreeList](https://js.devexpress.com/Documentation/Guide/UI_Components/TreeList/Overview/) hierarchy. The summary row shows the total number of descendant records within a node's subtree.

![DevExtreme TreeList - Display summary for each level](images/display-summary-for-each-level.png)

## Implementation Details

The solution uses the [onNodesInitialized](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/Configuration/#onNodesInitialized) event handler to traverse the TreeList node hierarchy after it is created.

A recursive function walks through all child nodes, calculates the number of visible descendants for each branch, and appends a custom summary node to the end of the corresponding level.

The following code recursively traverses the hierarchy and calculates descendant counts:

```JavaScript
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
```

The following code creates a custom summary node and inserts it into the node's children collection:

```JavaScript
function createSummaryNode(node, count) {
    return {
        key: `summary_${node.key}`,
        parent: node.parent,
        isSummary: true,
        data: {
            Title: `Count: ${count}`,
        },
        children: [],
        visible: true,
    };
}
```

The example uses the Node object's [children](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/Node/#children), [parent](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/Node/#parent), and [visible](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/Node/#visible) properties to navigate the hierarchy and calculate totals. Summary rows are identified through a custom `isSummary` flag and styled in the [onRowPrepared](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/Configuration/#onRowPrepared) event handler.

Since summary nodes are injected directly into the TreeList node hierarchy, this approach works entirely on the client side and does not require modifications to the original data source.

Note that this solution does not support selection and remote operations.

## Files to Review

- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **React**
    - [App.tsx](React/src/App.tsx)
- **Vue**
    - [HomeContent.vue](Vue/src/components/HomeContent.vue)
- **jQuery**
    - [index.html](jQuery/src/index.html)
    - [index.js](jQuery/src/index.js)
- **ASP.NET Core**    
    - [Index.cshtml](ASP.NET%20Core/Views/Home/Index.cshtml)

## Documentation

- [Getting Started with TreeList](https://js.devexpress.com/Documentation/Guide/UI_Components/TreeList/Getting_Started_with_TreeList/)
- [TreeList API - onNodesInitialized](https://js.devexpress.com/jQuery/Documentation/ApiReference/UI_Components/dxTreeList/Configuration/#onNodesInitialized)
<!-- feedback -->
## Does This Example Address Your Development Requirements/Objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-treelist-display-summary-for-each-level&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-treelist-display-summary-for-each-level&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
