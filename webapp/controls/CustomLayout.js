sap.ui.define(
    ["sap/suite/ui/commons/networkgraph/layout/TwoColumnsLayout"],
    function(TwoColumns){
        "use strict";

        const _customLayout=TwoColumns;

        _customLayout.prototype._validateLines = function () {
            var oFromTop, oToTop;
            if (this.oGraph.getLines().some(function (oLine) {
                oFromTop = oLine.getFromNode()._oGroup._oTopParentGroup;
                oToTop = oLine.getToNode()._oGroup._oTopParentGroup;
                return !((oFromTop === this.oLeftColumn && oToTop === this.oRightColumn)
                    || (oToTop === this.oLeftColumn && oFromTop === this.oRightColumn));
            }.bind(this))) {
                return null;
            } else {
                return null;
            }
        };


        return _customLayout;

    });
