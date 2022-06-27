var _util = require('util/util.js');

var _category_service = {
    getProduct: function(catalogId,resolve, reject){
        _util.request({
            url: _util.getServerURL('catalog/categories/'+catalogId+'/products'),
            method: "Get",
            success: resolve,
            error: reject
        })
    },
    getItem: function(productId,resolve, reject){
        _util.request({
            url: _util.getServerURL('catalog/products/'+productId+'/items'),
            method: "Get",
            success: resolve,
            error: reject
        });
    },
    getItemById: function (itemId,resolve, reject)
    {
        _util.request({
            url: _util.getServerURL('catalog/items/'+itemId),
            method: "Get",
            success: resolve,
            error: reject
        });
    },
    searchProduct: function (value,resolve, reject)
    {
        _util.request({
            url: _util.getServerURL('catalog/searchProduct'),
            data: value,
            method: "Get",
            success: resolve,
            error: reject
        });
    }
}

module.exports = _category_service;