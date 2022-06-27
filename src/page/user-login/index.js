require('./index.css');
require('page/common/header/index.js');


var _account_service = require('service/account-service.js');
var $ = require('jquery');
const _util = require('../../util/util');


$('#loginMsg').hide();

var _userLogin = {
    init: function () {
        $('#loginMsg').hide();
        this.bindEvents();
        return this;
    },
    bindEvents: function () {
        var _this = this;
        $('#submit').click(function () {
            _this.submit();
        });
    },
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        console.log(formData);

        _account_service.login(
            formData,
          function(data,msg){          
               console.log('登陆成功'); 
               //返回到进入用户登录界面之前的界面   
              window.location.href=_util.getURLParam('redirecct')||'./catalog-main.html'; 
            },
            function(err){
            console.log('登陆失败');
             $('#loginMsg').show().text(err);
            }
        );

    }
}

module.exports = _userLogin.init();