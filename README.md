<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/355815169/20.2.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T988572)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->

# TreeList for DevExtreme - How to display a summary for each level

This example illustrates how to display a summary (e.g. count|sum) for each level in TreeList.

The calculation starts when the data was initially loaded in the [onContentReady](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/Configuration/#onContentReady) event handler.  Summmary calculation is implemented in the `getSummary` function. In this function we use recursion in order to traverse all nodes and get the necessary data to calculate the total value for each level.

After calculation is finished, the [push](https://js.devexpress.com/Documentation/ApiReference/Data_Layer/ArrayStore/Methods/#pushchanges) API is used in order to insert rows with summary values on each level.

Note that this solution does not support remote operations.

<div align="center"><img alt="TreeList for DevExtreme - How to display a summary for each level" src="dx-treelist-display-summary-for-each-level.png" /></div>

## Files to Review

- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **jQuery**
    - [index.html](jQuery/src/index.html)
    - [index.js](jQuery/src/index.js)
- **React**
    - [App.js](React/src/App.js)
- **Vue**
    - [App.vue](Vue/src/App.vue)

## Documentation

- [Getting Started with TreeList](https://js.devexpress.com/Documentation/Guide/UI_Components/TreeList/Getting_Started_with_TreeList/)

- [TreeList - API Reference](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/)
