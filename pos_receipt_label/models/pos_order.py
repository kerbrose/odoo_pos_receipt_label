from odoo import api, fields, models


class PosOrder(models.Model):
    _inherit = "pos.order"

    pos_receipt_label = fields.Char()

    def _export_for_ui(self, order):
        receipt = super(PosOrder, self)._export_for_ui(order)
        receipt["pos_receipt_label"] = order.pos_receipt_label
        return receipt

    @api.model
    def _order_fields(self, ui_order):
        order_fields = super(PosOrder, self)._order_fields(ui_order)
        if ui_order.get("pos_receipt_label"):
            order_fields["pos_receipt_label"] = ui_order["pos_receipt_label"]
        return order_fields
