require('page/common/header/index.js');


const $ = require('jquery');
var catalogService = require('service/catalog-service.js');
var _util = require('util/util.js');
var cartService = require('service/cart-service.js');
var accountService = require('service/account-service.js');


var listTemplate = require('./index.string');


var _item = {
    ListData: {
        description: '',
        itemId: '',
        attribute: '',
        quantity: '',
        productName: '',
        price: ''

    },
    init: function () {


        this.loadInfo();
        this.bindEvents();
        return this;
    },
    bindEvents: function () {

       //catalog-list中代码相同
        $(document).on('click', "[name='add']", function () {        
          
            var id = $(this).attr("id");
            var data = {
                itemId: id,
                quantity: 1

            };
            var isExist = false;
            accountService.checkLogin(
                function(res){
                   
                    cartService.getCartList(

                        function (response) {    
                          
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
                            if(isExist){
                                cartService.updateCart(
                                    data,
                                    function (res) {                           
                                      
                                        window.location.href('viewCart.html');
                            
                                    }, function (err) {
                            
                                    });
                            
                            }else{
                                cartService.insertCart(
                                    data,
                                    function (res) {                            
                                      
                                        window.location.href='viewCart.html';
                            
                                    }, function (err) {
                                       
                                    });
                            }
                            
                        },
                        function (error) {
                            
                        }
        
                    )

                }, function(error) {

                    window.location.href='user-login.html?redirecct='+window.location.href;
                }
            );

           

        

        });



    },
    loadInfo: function () {

        //展示item信息
        var id = _util.getURLParam('id');

        var _this = this;

        catalogService.getItemById(id,
            function (res) {
                console.log(res);


                   //获得照片信息,尽量改善照片呈现方式，使用    require!!!
                _this.ListData.description = 'http://localhost:8888/' + res.attribute2;



                _this.ListData.itemId = res.itemId;
                _this.ListData.attribute = res.attribute1 + ' ' + res.productName;
                _this.ListData.productName = res.productName;
                //库存信息
                if (res.quantity <= 0) {
                    _this.ListData.quantity = 'Back Order';
                }
                else {
                    _this.ListData.quantity = res.quantity + ' in stock';
                }
                //价格信息

                _this.ListData.price = res.listPrice.toFixed(2);

                var result = _util.renderHtml(listTemplate, { ListData: _this.ListData });
             

                $('#Catalog').html(result);
              
            },
            function (err) {
                console.log(err);
            }
        );






    }


}

module.exports = _item.init();