sap.ui.define([

],function(){
    "use strict";

    const _helper={};
    const _links=[];
    const _nodes=[];
    const _groups=[];
    var   _GlobalKey=0;
    var lastX=0;
    var lastY=0;


    _helper.init=function(){
        _helper._GlobalKey=0;
        _helper._links=[];
        _helper._nodes=[];
        _helper._groups=[];
    };


    function Line(){
            this.lineType="Solid";
            this.arrowOrientation = "ParentOf";
            this.arrowPosition = "Middle";
            this.selected = false;
            this.stretchToCenter = false;
    };


    _helper.linkNodes=function(node1,node2,settings){
        var link=new Line();
        if(settings){
            Object.assign(link,settings);
        }
        link.from=node1.key;
        link.to  = node2.key;
        _helper._links.push(link);
    };

    function Group(){
    }

    Group.prototype.addNode=function(pNode){
        pNode.group=this.key;
    };

    Group.prototype.addAttribute=function(att){
        if(this.attributes){
            this.attributes.push(att);
        }else{
            this.attributes=[];
            this.attributes.push(att);
        }
    };

    Group.prototype.addAttributes=function(atts){
        atts.forEach(att=>this.addAttribute(att));
    };

    function Node(){
        //this.width="150";
        this.shape="Box";
        this.width=350;
        this.showDetailButton=true;
        this.showExpandButton=true;
        this.titleLineSize=0;
        this.collapsed=true;
    }

    Node.prototype.linkTo=function(pNode){
      _helper._links.push({
          from:this.key,
          to:pNode.key
      });
    };
    Node.prototype.addAttribute=function(att){
        if(this.attributes){
            this.attributes.push(att);
        }else{
            this.attributes=[];
            this.attributes.push(att);
        }
    };

    Node.prototype.addAttributes=function(atts){
        atts.forEach(att=>this.addAttribute(att));
    }

    _helper.newNode=function(title,group,settings){
        var lnode=new Node();
        if(settings){
            Object.assign(lnode,settings);
        }
        _helper._GlobalKey = _helper._GlobalKey + 1;
        lnode.key=_helper._GlobalKey;
        lnode.title=title;
        lnode.x= lastX+200;
        lnode.y=10;
        lastX=lastX+30;
        //lnode.width=250;
        //lnode.maxWidth=600;
        if(group){
            lnode.group=group.key;
        }
        _helper._nodes.push(lnode);

        return lnode;
    };



    _helper.newGroup=function(title,parentGroup,settings){
        var lgroup=new Group();
        if(settings){
            Object.assign(lgroup,settings);
        }
        _helper._GlobalKey = _helper._GlobalKey + 1;
        lgroup.key=_helper._GlobalKey;
        lgroup.title = title;
        if(parentGroup){
            lgroup.parentGroupKey=parentGroup.key;
        }
        _helper._groups.push(lgroup);
        return lgroup;
    };

    _helper.newAttribute=function(icon,label,labelStatus,value,valueStatus,visible){
        var latt={};
        if(icon){
            latt.icon=icon;
        }
        if(label){
            latt.label=label;
        }
        if(labelStatus){
            latt.labelStatus = labelStatus;
        }
        if(value){
            latt.value=value;
        }
        if(valueStatus){
            latt.valueStatus=valueStatus;
        }
        if(visible){
            latt.visible=visible;
        }else{
            latt.visible=true;
        }


        return latt;
    }

    _helper.getGraphData=function(){
        return{
            nodes:_helper._nodes,
            lines:_helper._links,
            groups:_helper._groups
        }
    }


    return _helper;

});