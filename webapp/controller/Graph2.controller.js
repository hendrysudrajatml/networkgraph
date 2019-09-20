sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"../utils/GraphHelper",
	"sap/suite/ui/commons/networkgraph/Status"
], function(Controller,JSONModel, formatter,gh,Status) {
	"use strict";

	return Controller.extend("sap.com.ssdm.e2e.controller.Graph2", {

		formatter: formatter,
		graph:{},

		onInit: function () {
			this.graph=this.byId("graph");
			this.setUpGraph();
		},
		setUpGraph:function(){
			gh.init();

			//setup Statuses (Systems)
			var stat1=gh.newStatus({title:"HR Data",backgroundColor:"red"});
			var statPE=gh.newStatus({title:"Premium Engagement",backgroundColor:"red"});
			var statReceivingObject=gh.newStatus({title:"Receiving Object",backgroundColor:"#FFC000"});


			//Cloud
			var gConcur=gh.newGroup({title:"Concur CTE",icon:"sap-icon://cloud"});
			var gCallidus = gh.newGroup({title:"Callidus CPQ",icon:"sap-icon://cloud"});
			var gSF = gh.newGroup({title:"Successfactors",icon:"sap-icon://cloud"});
			var gFG = gh.newGroup({title:"FieldGlass",icon:"sap-icon://cloud"});



			//OnPremise
			var gISP=gh.newGroup({title:"ISP",icon:"sap-icon://it-host"});
			var gICP=gh.newGroup({title:"ICP",icon:"sap-icon://it-host"});
			var gI3P=gh.newGroup({title:"I3P",icon:"sap-icon://it-host"});
			var gIPP=gh.newGroup({title:"IPP",icon:"sap-icon://it-host"});
			var gIFP=gh.newGroup({title:"IFP",icon:"sap-icon://it-host"});
			var gILP=gh.newGroup({title:"ILP",icon:"sap-icon://it-host"});


			//setup nodes

			//-- ICP Nodes
			var nICPOpportunity			=gh.newNode({title:"Opportunity"},gICP);
			var nICPServiceContract		=gh.newNode({title:"Service Contract"},gICP);
			var nICPServiceOrder		=gh.newNode({title:"Service Order"},gICP);

			nICPOpportunity.addAttributes([{label:"table:",value:"??"},{label:"ID",value:"?"}]);

			//------------------------ISP Nodes---------------------------------
			var nISPActivityRecord=gh.newNode({title:"Activity"},gISP);
			nISPActivityRecord.addAttributes([
				{label:"Task Type"},
				{label:"Task Level"},
				{label:"Task Component"}
			]);

			var nISPStaffing=gh.newNode({title:"Staffing"},gISP);
			nISPStaffing.addAttributes([
				{label:"Begda"},
				{label:"Endda"},
				{label:"Receiving Object"},
				{label:"Working Days"},
				{label:"Travel Hours"}
			]);


			var nISPControlling=gh.newNode({title:"FI/CO"},gISP);
			var nISPReceiverSaleOrder=gh.newNode({title:"Sales Order"},gISP);
			var nISPInternalOrder=gh.newNode({title:"Internal Order"},gISP);
			var nISPCostCenter=gh.newNode({title:"Cost Center"},gISP);

			var nISPPSProject=gh.newNode({title:"PS Project",description:"Some description here..."},gISP);
			var nISPMiniMaster=gh.newNode({title:"HR Mini Master"},gISP);
			var nISPTimeData = gh.newNode({title:"PTIMEOV1"},gISP);
			var nISPReceiverWBS=gh.newNode({title:"WBS"},gISP);
			var nISPProfileAssignment=gh.newNode({title:"Profile Assignment",description:"Assign profile"},gIPP);


			//--------------------IPP Nodes------------------------------------------
			var nIPPPA=gh.newNode({title:"HR Master"},gIPP);
			var nIPPOM=gh.newNode({title:"Org Info"},gIPP);
			var nIPPTime=gh.newNode({title:"Absence"},gIPP);
			var nIPPJobProfile=gh.newNode({title:"Job Profile (PACE)",description:"PACE"},gIPP);


			//-------------------------Concur Nodes-------------------------------------
			var nConExpenseClaim=gh.newNode({title:"Expense Report"},gConcur);

			//----------------------Fieldglass Nodes--------------------------------
			var nFGTimesheet=gh.newNode({title:"Timesheet"},gFG);
			var nFGWordOrder=gh.newNode({title:"Work Order"},gFG);


			//----------------------SF Nodes---------------------------
			var nSFEmpProfile=gh.newNode({title:"Employee Profile"},gSF);
			nSFEmpProfile.addAttributes([
				{label:"employee",value:"aa"}
			]);
			var nSFOrgInfo   =gh.newNode({title:"Organization Info"},gSF);


			//-----------------------C-allidus Nodes-----------------------------
			var nCalQuote=gh.newNode({title:"Quote"},gCallidus);



			//---------------------I3P Node---------------------------------
			var nI3PProject=gh.newNode({title:"Project"},gI3P);

			//---------------------IFP Node---------------------------------
			var nIFPcProject=gh.newNode({title:"cProject"},gIFP);

			//---------------------ILP Node---------------------------------
			var nILPBooking=gh.newNode({title:"Booking"},gILP);



			//|||||||||||||||||||||||||||||| Lines|||||||||||||||||||||||||||||||



			gh.linkNodes(nISPStaffing,nISPActivityRecord,null,[
				{label:"Input"}
			]);
			gh.linkNodes(nICPOpportunity,nCalQuote );
			gh.linkNodes(nCalQuote,nICPServiceContract );

			gh.linkNodes(nConExpenseClaim,nISPControlling);
			gh.linkNodes(nISPActivityRecord,nISPControlling);
			gh.linkNodes(nFGTimesheet,nISPActivityRecord);
			gh.linkNodes(nSFEmpProfile,nIPPPA);
			gh.linkNodes(nSFOrgInfo,nIPPOM);
			gh.linkNodes(nICPServiceContract, nISPReceiverSaleOrder);
			gh.linkNodes(nISPStaffing,nConExpenseClaim);

			gh.linkNodes(nFGWordOrder,nIPPPA,{title:"C-User Replication"});

			gh.linkNodes(nI3PProject,nISPPSProject);
			gh.linkNodes(nISPPSProject,nISPReceiverWBS);

			gh.linkNodes(nIPPTime,nISPTimeData);

			//==============Setting Status
			gh.setStatus(nSFEmpProfile,stat1);
			gh.setStatus(nISPReceiverSaleOrder,statReceivingObject);
			gh.setStatus(nISPReceiverWBS,statReceivingObject);
			gh.setStatus(nISPInternalOrder,statReceivingObject);
			gh.setStatus(nISPCostCenter,statReceivingObject);



			//Finally get the data and set the model

			var statuses=gh.getStatuses();
			statuses.forEach(stat=>this.graph.addStatus(stat));

			this.getView().setModel(new JSONModel(gh.getData()));


		}//end of Graph setup









	});
});