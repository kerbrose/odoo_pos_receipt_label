# -*- coding: utf-8 -*-
{
    "name": "POS return/refund label",
    "summary": """
        - show label in POS Receipt
    """,
    "description": """
        - show label in POS Receipt
    """,
    "author": "Khaled Said",
    "website": "https://kerbrose.github.io/",
    "category": "Sales/Point of Sale",
    "depends": [
        "base",
        "point_of_sale",
    ],
    "data": [],
    'assets': {
        'point_of_sale.assets': [
            'pos_receipt_label/static/src/js/models.js',
            'pos_receipt_label/static/src/xml/OrderReceipt.xml',
        ],
    },
    "demo": [],
}
