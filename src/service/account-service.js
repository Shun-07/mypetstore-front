var _util = require('util/util.js');

var _account_service = {
    getInfo: function(resolve, reject){
        _util.request({
            url: _util.getServerURL('account/get_login_account_info'),
            method: "POST",
            success: resolve,
            error: reject
        })
    },
    checkLogin:function(resolve, reject){
        _util.request({
            url: _util.getServerURL('account/checkLogin'),
            method: "Get",
            success: resolve,
            error: reject
        })
    },
    login: function(account, resolve, reject){       
        _util.request({
            url: _util.getServerURL('account/login'),
            data: account,
            method: "POST",
            success: resolve,
            error: reject
        });
    },
    register: function(account, resolve, reject){
        _util.request({
            url: _util.getServerURL('account/register'),
            data: account,
            method: "POST",
            success: resolve,
            error: reject
        });
    },
    logOut: function(resolve, reject){
        _util.request({
            url: _util.getServerURL('account/quitAccount'),        
            method: "POST",
            success: resolve,
            error: reject
        });
    },
    editAccount: function(account,resolve, reject){
        _util.request({
            url: _util.getServerURL('account/editAccountInfo'),    
            data: account,    
            method: "POST",
            success: resolve,
            error: reject
        });
    }
}

module.exports = _account_service;