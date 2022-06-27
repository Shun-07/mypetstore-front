var $ = require('jquery');
//js渲染
var Hogan = require('hogan.js');

var config = {
    serverHost: 'http://192.168.8.171:8088/'
}

//获得成功运行success
//获得失败运行error
//未登录跳到登录界面

var _util = {
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || "GET",
            url: param.url || "",
            dataType: param.type || "json",
            data: param.data || "",
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                if (0 === res.status) {
                    console.log(res.status);
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                   
                }
                else if (10 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                    console.log(res.status);
                    _this.doLogin();
                }
                else if (1 === res.status) {
                    console.log('服务器返回错误信息' * 1000000000000);
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (errMsg) {
                console.log(errMsg + "请求错误***********");
                typeof param.error === 'function' && param.error('服务器异常');
            }
        })
    },
    doLogin: function () {

        console.log("要求登录");
        window.location.href = "./user-login.html?redirect=" + encodeURIComponent(window.location.href);
    },
    getServerURL: function (path) {
        return config.serverHost + path;
    },

    validateField: function (fieldType, fieldValue) {

    },
    getURLParam: function (name) {

        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');

        var result = window.location.search.substring(1).match(reg);     

        return result ? result[2] : null;
    },
     //渲染html,放入数据
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate);

        var result = template.render(data)
     
        return result;


    }

}

module.exports = _util;