sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"../utils/helper"
], function(Controller,JSONModel, formatter,helper) {
	"use strict";

	return Controller.extend("sap.com.ssdm.e2e.controller.Graph", {

		formatter: formatter,

		onInit: function () {
			helper.init();
			var gSF = helper.newGroup("SuccessFactors",null);
			var gFG  = helper.newGroup("FieldGlass",null);
			var gConcur = helper.newGroup("Concur CTE",null);
			var gCallidus=helper.newGroup("Callidus",null);

			var gICP=helper.newGroup("ICP",null);
			var gIPP=helper.newGroup("IPP",null);
			var gIBP=helper.newGroup("IBP",null);
			var gISP=helper.newGroup("ISP",null);

			gISP.addAttributes([{label:"S4HANA"},{label:"FI/CO"}]);


			//Callidus
			var nCallidusQuote=helper.newNode("Quote",gCallidus,null);

			//Concur
			var nConcurExpenseClaim=helper.newNode("Expense Report",gConcur,null);

			//FieldGlass
			var nFGTimesheet=helper.newNode("Timesheet",gFG,null);

			//ISP Node
			var nInputActivityType=helper.newNode("Activity Type",gISP,{shape:"Circle",width:5});
			var nISPActivityRecord=helper.newNode("Activity Record",gISP,{status:"stat1"});
			nISPActivityRecord.addAttributes([{label:"Date"},{label:"Task Type"},{label:"Task Level"},{label:"Task Component"}, {label:"Catsquantity"}]);


			var nISPControlling=helper.newNode("Controlling",gISP,null);
			var nISPStaffing=helper.newNode("Staffing",gISP,null);
			nISPStaffing.addAttributes([{label:"Receiving Object"},{label:"Begin date"},{label:"End date"}]);
			nInputActivityType.linkTo(nISPActivityRecord);

			//ICP Nodes
			var nodeOpportunity=helper.newNode("Oppotunity",gICP,null);
			nodeOpportunity.addAttribute({label:"Opportunity ID"});


			helper.linkNodes(nISPActivityRecord,nISPControlling);
			helper.linkNodes(nFGTimesheet,nISPActivityRecord);
			helper.linkNodes(nConcurExpenseClaim, nISPControlling);
			helper.linkNodes(nodeOpportunity,nCallidusQuote,{arrowOrientation: "ChildOf"});
			helper.linkNodes(nISPStaffing,nConcurExpenseClaim);
			//helper.linkNodes(nodeOpportunity,nodeActivityRecording);

			this.getView().setModel(new JSONModel(helper.getGraphData()));




		}
	});
});