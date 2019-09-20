sap.ui.define([
    "sap/suite/ui/commons/networkgraph/Status"
],function(Status){
    "use strict";

    const _helper={};
    _helper._lines=[];
    _helper._nodes=[];
    _helper._groups=[];
    _helper._statuses=[];
    var _key=0;
    var _statPrefix="STAT";
    var _statKey =0;
    const defaultStatus={
        selectedBorderColor:"red"
    }


    _helper.init=function(){
        _helper._lines=[];
        _helper._nodes=[];
        _helper._groups=[];
        _helper._statuses=[];
    }

    _helper.getNewKey=function(){
        _key = _key + 1;
        return _key;
    }

    _helper.getStatKey=function(){
        _statKey=_statKey+1;
        return _statPrefix+_statKey;
    }

    //----------------Status---------------------------
    function LStatus(){
        this.backgroundColor="";
        this.title="Status Title";
        this.key=_helper.getStatKey();
    };

    function Group(){
        this.key=_helper.getNewKey();
    };

    function Node(){
        this.key=_helper.getNewKey();
    };

    function Line(){
    };

    function Attribute(){
        this.icon="";
        this.label="";
        this.labelStatus="";
        this.value=""
        this.valueStatus=""
        this.visible=true;
    };

    function _addAttribute(att){
        if(!this.attributes){
            this.attributes=[];
        }
        this.attributes.push(att);
    };

    function _addAttributes(atts){
        atts.forEach(att=>this.addAttribute(att));
    };


    Node.prototype.addAttribute= _addAttribute;
    Node.prototype.addAttributes=_addAttributes;
    Line.prototype.addAttribute= _addAttribute;
    Line.prototype.addAttributes= _addAttributes;


    _helper.newAttribute=function(){
      var latt=new Attribute();
      return latt;
    };

    _helper.newStatus=function(settings){
        var _status=new Status();
        Object.assign(_status.mProperties,defaultStatus);
        if(settings){
            Object.assign(_status.mProperties,settings);
        }
        _status.setKey(_helper.getStatKey());
        _helper._statuses.push(_status);
        return _status;
    };

    _helper.getStatuses=function(){
        return _helper._statuses;
    };


    _helper.newNode=function(settings,pgroup){
        var lnode=new Node();
        if(settings){
            Object.assign(lnode,settings);
        }
        if(pgroup){
            lnode.group=pgroup.key;
        }

        _helper._nodes.push(lnode);
        return lnode;
    };
    _helper.newGroup=function(settings){
        var lgroup=new Group();
        if(settings){
            Object.assign(lgroup,settings);
        }

        _helper._groups.push(lgroup);
        return lgroup;
    };
    _helper.linkNodes=function(fromNode,toNode,settings,attributes){
        var lline=new Line();
        if(settings){
            Object.assign(lline,settings);
        }
        if(attributes){
            lline.addAttributes(attributes);
        }
        lline.from=fromNode.key;
        lline.to=toNode.key;
        _helper._lines.push(lline);
        return lline;
    };


    _helper.getData=function(){
        return{
            nodes:_helper._nodes,
            lines:_helper._lines,
            groups:_helper._groups
        }
    };

    _helper.setStatus=function(pObject,pStat){
        pObject.status = pStat.getKey();
    }













    //-----end----
    return _helper;
});