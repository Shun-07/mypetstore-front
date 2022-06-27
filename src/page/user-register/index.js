require('page/common/header/index.js');
require('../includeAccountFields/index.js');
require('./index.js');
require('./index.css');

var _account_service = require('service/account-service.js');
var $ = require('jquery');
const _util = require('../../util/util');



var _userRegister = {
    init: function () {

        this.bindEvents();

        var route = _util.getURLParam('route');
        //从查看用户信息界面进入
        if (route == "edit") {

            $('#register').attr('value', 'Save Account Information');


            _account_service.checkLogin(
                function (res) {

                    $('#username').val(res.username);
                    $("#username").attr("disabled", "disabled");

                    $('#firstName').val(res.firstName);
                    $('#lastName').val(res.lastName);
                    $('#email').val(res.email);
                    $('#phone').val(res.phone);
                    $('#address1').val(res.address1);
                    $('#address2').val(res.address2);
                    $('#city').val(res.city);
                    $('#state').val(res.state);
                    $('#zip').val(res.zip);
                    $('#country').val(res.country);

                    //$("#languagePreference").val(res.languagePreference);
                    //后端数据无法获取
                    // $("#favouriteCategoryId").val(res.favouriteCategoryId);
                    // $()
                    // $()

                },
                function (err) {
                    $("#message").css('color', 'red');
                    $("#message").text(err).show();
                }
            );




        }

        return this;
    },
    bindEvents: function () {
        var _this = this;

        $('#register').click(function () {
            _this.regist();
        });

        $('#repeatedPassword').blur(function () {
            _this.checkPwd();
        });

    },
    checkPwd: function () {
        if ($.trim($('#password').val()) == '') {

            $('#pwdMsg').text('密码不能为空').show();
            $("#pwdMsg").css('color', 'red');
        }
        else if ($.trim($('#password').val()) === $.trim($('#repeatedPassword').val())) {
            $('#pwdMsg').text('密码一致').show();
            $("#pwdMsg").css('color', 'green');
        }
        else {
            $("#pwdMsg").css('color', 'red');
            $('#pwdMsg').text('密码不一致').show();
        }
    },
    regist: function () {
        var route = _util.getURLParam('route');


        if (route == "edit") {
            var formData = {
                password: $.trim($('#password').val()),
                repeatedPassword: $.trim($('#repeatedPassword').val()),
                firstName: $.trim($('#firstName').val()),
                lastName: $.trim($('#lastName').val()),
                email: $.trim($('#email').val()),
                phone: $.trim($('#phone').val()),
                address1: $.trim($('#address1').val()),
                address2: $.trim($('#address2').val()),
                city: $.trim($('#city').val()),
                state: $.trim($('#state').val()),
                zip: $.trim($('#zip').val()),
                country: $.trim($('#country').val()),
                languagePreference: $("#languagePreference option:checked").attr("id"),
                favouriteCategoryId: $("#favouriteCategoryId option:checked").attr("id")
            };
            password = $.trim($('#password').val());
            repeatedPassword = $.trim($('#repeatedPassword').val());
            console.log(formData);

            if (password == repeatedPassword) {
                _account_service.editAccount(
                    formData,
                    function (data, msg) {

                        $("#message").css('color', 'green');
                        $("#message").text('信息修改成功').show();
                    },
                    function (err) {

                        $("#message").css('color', 'red');
                        $("#message").text('信息修改失败').show();

                    }
                );
            }
            else {
                $("#message").css('color', 'red');
                $("#message").text('密码不一致，信息修改失败').show();
            }



        }
        else {
            var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val()),
                repeatedPassword: $.trim($('#repeatedPassword').val()),
                firstName: $.trim($('#firstName').val()),
                lastName: $.trim($('#lastName').val()),
                email: $.trim($('#email').val()),
                phone: $.trim($('#phone').val()),
                address1: $.trim($('#address1').val()),
                address2: $.trim($('#address2').val()),
                city: $.trim($('#city').val()),
                state: $.trim($('#state').val()),
                zip: $.trim($('#zip').val()),
                country: $.trim($('#country').val()),
                languagePreference: $("#languagePreference option:checked").attr("id"),
                favouriteCategoryId: $("#favouriteCategoryId option:checked").attr("id")
            };


            _account_service.register(
                formData,
                function (data, msg) {

                    window.location.href = _util.getURLParam('redirecct') || './user-login.html';
                    $("#message").css('color', 'green');
                    $("#message").text('注册成功').show();
                },
                function (err) {
                    console.log('注册失败');
                    $("#message").css('color', 'red');
                    $("#message").text('注册失败').show();

                }
            );
        }
    }
}

module.exports = _userRegister.init();
