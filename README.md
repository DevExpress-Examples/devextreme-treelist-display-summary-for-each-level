<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/355815169/20.2.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T988572)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# How to display a summary for each level in TreeList
<!-- run online -->
**[[Run Online]](https://codecentral.devexpress.com/355815169/)**
<!-- run online end -->
This example illustrates how to display a summary (e.g. count|sum) for each level in TreeList.

The calculation starts when the data was initially loaded in the [onContentReady](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTreeList/Configuration/#onContentReady) event handler.  Summmary calculation is implemented in the `getSummary` function. In this function we use recursion in order to traverse all nodes and get the necessary data to calculate the total value for each level.

After calculation is finished, the [push](https://js.devexpress.com/Documentation/ApiReference/Data_Layer/ArrayStore/Methods/#pushchanges) API is used in order to insert rows with summary values on each level.

Note that this solution does not support remote operations.
