sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/com/ssdm/e2e/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("sap.com.ssdm.e2e.controller.App", {

		formatter: formatter,

		onInit: function () {

		}
	});
});