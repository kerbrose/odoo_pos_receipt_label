odoo.define("pos_receipt_label.models", function (require) {
    "use strict";

    const { Order } = require('point_of_sale.models');
    const Registries = require("point_of_sale.Registries");

    const LabelOrder = (Order) => class LabelOrder extends Order {
        constructor(obj, options) {
            super(...arguments);
            this.posReceiptLabel = "";
        }
        init_from_JSON(json) {
            super.init_from_JSON(...arguments);
            if (json.pos_receipt_label) {
                this.posReceiptLabel = json.pos_receipt_label;
            }
        }
        export_as_JSON() {
            let json = super.export_as_JSON(...arguments);
            json.pos_receipt_label = this.posReceiptLabel;
            return json;
        }
        export_for_printing() {
            const receipt = super.export_for_printing(...arguments);
            this.check_label();
            receipt.posReceiptLabel = this.posReceiptLabel;
            return receipt;
        }
        check_label() {
            let orderLines = this.get_orderlines();
            let refundOrderLines = orderLines.filter(line => line.quantity < 0 && (line.refunded_orderline_id || line.refund_orderline_ids));
            if ((orderLines.length > refundOrderLines.length) && refundOrderLines.length > 0) {
                this.posReceiptLabel = "Refund/Exchange";
            } else if ((orderLines.length === refundOrderLines.length) && orderLines.length > 0) {
                this.posReceiptLabel = "Refund";
            }
        }
        add_orderline(line) {
            super.add_orderline(...arguments);
            this.check_label();
        }
        remove_orderline(line) {
            super.remove_orderline(...arguments);
            this.check_label();
        }
    };
    Registries.Model.extend(Order, LabelOrder);


});
