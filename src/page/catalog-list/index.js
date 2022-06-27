require('page/common/header/index.js');
require('./index.css');

const _util = require('../../util/util');
const $ = require('jquery');
var catalogService = require('service/catalog-service.js');
var accountService = require('service/account-service.js');
var cartService = require('service/cart-service.js');
//页面渲染模型
var listTemplate = require('./index.string');
//控制product和item页面
var _catalogList = {
    ListData: {
        title: '',
        headList: [],
        productsList: {},
        itemsList: {}

    },
    productsHeadList: ['Product ID', 'Name'],
    itemHeadList: ['Item ID', 'Product ID', 'Description', 'List Price', ' '],

    init: function () {


        this.loadInfo();
        this.bindEvents();
        return this;
    },
    bindEvents: function () {

//点击item页面添加到购物车
        $(document).on('click', "[name='add']", function () {

            var id = $(this).attr("id");
            var data = {
                itemId: id,
                quantity: 1

            };
            var isExist = false;
            //判断用户是否登录
            accountService.checkLogin(
                function (res) {
//获得用户购物车列表
                    cartService.getCartList(

                        function (response) {
                            //登录后判断购物车中是否有该item
                            if(response){
                            for (var i = 0; i < response.length; i++) {
                                if (response[i].itemId == id) {
                                    isExist = true;
                                    data = {
                                        cartId: response[i].cartId,
                                        quantity: response[i].quantity + 1,

                                    };
                                }

                            }
                        }
                            //购物车中存在，则数量+1
                            if (isExist) {
                                cartService.updateCart(
                                    data,
                                    function (res) {

                                        window.location.href='viewCart.html';

                                    }, function (err) {

                                    });

                            } else {//购物车中不存在加入到购物车并且数量=1
                                cartService.insertCart(
                                    data,
                                    function (res) {

                                        window.location.href = 'viewCart.html';

                                    }, function (err) {

                                    });
                            }

                        },
                        function (error) {

                        }

                    )

                }, function (error) {//用户未登录转移到登录界面

                    window.location.href = 'user-login.html?redirecct=' + window.location.href;
                }
            );



        });


    },
    loadInfo: function () {
        var id = _util.getURLParam('id');
        var route = _util.getURLParam('route');

        var _this = this;
        if (route === 'product') {//如果为product页面，渲染product信息
            catalogService.getProduct(id,
                function (res) {
                    console.log(res);
                    _this.ListData.headList = _this.productsHeadList;
                    _this.ListData.title = id;
                    _this.ListData.productsList = res;
                    _this.ListData.itemsList = null;
                    console.log(_this.ListData);
                    var result = _util.renderHtml(listTemplate, { ListData: _this.ListData });


                    $('#Catalog').html(result);

                },
                function (err) {
                    console.log(err);
                }
            );
        }

        if (route === 'item') {//如果为item页面，渲染item信息
            catalogService.getItem(id,
                function (res) {
                    console.log(res);
                    _this.ListData.headList = _this.itemHeadList;
                    _this.ListData.title = id;
                    _this.ListData.productsList = null;
                    _this.ListData.itemsList = res;

                    var result = _util.renderHtml(listTemplate, { ListData: _this.ListData });
                   
                    $('#Catalog').html(result);

                },
                function (err) {
                    console.log(err);
                }
            );

        }



    }


}

module.exports = _catalogList.init();