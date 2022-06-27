var _util = require('util/util.js');


var _cart_service = {
    
   insertCart: function(cart,resolve, reject){
        _util.request({
            url: _util.getServerURL('cart/insertCart'),
            data:cart,
            method: "Post",
            success: resolve,
            error: reject
        })
    },
    deleteCart: function(cartid,resolve, reject){
        _util.request({
            url: _util.getServerURL('cart/deleteCart'),
            data: cartid,
            method: "Post",
            success: resolve,
            error: reject
        })
    },
    getCartList: function(resolve, reject){
        _util.request({
            url: _util.getServerURL('cart/getCart'),
            method: "Get",
            success: resolve,
            error: reject
        })
    },
    updateCart: function(cart,resolve, reject){
        _util.request({
            url: _util.getServerURL('cart/updateCart'),
            data:cart,
            method: "Post",
            success: resolve,
            error: reject
        });
    },
   
}

module.exports = _cart_service;