var _util = require('util/util.js');


var _order_service = {
    generateOrder: function(order,resolve, reject){
        _util.request({
            url: _util.getServerURL('order/newOrder'),
            data:order,         
            method: "Get",
            success: resolve,
            error: reject
        })
    },
    newOrderForm: function(resolve, reject){
        _util.request({
            url: _util.getServerURL('order/newOrderForm'),           
            method: "Get",
            success: resolve,
            error: reject
        })
    },
    viewOrder: function(id,resolve, reject){
        _util.request({
            url: _util.getServerURL('order/viewOrder'),
            data: id,
            method: "Get",
            success: resolve,
            error: reject
        })
    },
    getOrderList: function(resolve, reject){
        _util.request({
            url: _util.getServerURL('cart/getCart'),
            method: "Get",
            success: resolve,
            error: reject
        })
    },

   
}

module.exports = _order_service;