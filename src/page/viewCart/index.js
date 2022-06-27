require('page/common/header/index.js');

const $ = require('jquery');
var cartService = require('service/cart-service.js');
var _util = require('util/util.js');



var listTemplate = require('./index.string');

var _cart = {
    ListData: {
        cartList: [],
        total: 0

    },
    init: function () {


        this.loadInfo();
        this.bindEvents();
        return this;
    },
    bindEvents: function () {
        var _this = this;
        $(document).on('blur', "[name='quantity']", function () {
            var id = $(this).attr("id");
            var quantity = $(this).val();
                
            if (quantity <= 0) {
                var cartId = {
                    'cartId': id
                };
                console.log(cartId);
                cartService.deleteCart(cartId,
                    function (res) {
                        var t='.rem_'+ id;
                        $(t).fadeOut();
                       $(t).fadeOut("slow");
                       $(t).fadeOut(3000);
                         //window.location.reload();
                    },
                    function (err) {

                    });
            } else {
                var cartId = {
                    'cartId': id,
                    'quantity': quantity

                };
                cartService.updateCart(cartId,
                    function (res) {
                       
                        var priceId = '#price_' + id;
                        var totalId = '#total_' + id;
                        var price = $(priceId).html().trim();

                        var totalPrice = price * quantity;
                        totalPrice = totalPrice.toFixed(2);
                      
                        $(totalId).html(totalPrice);


                        cartService.getCartList(function (res) {
                            var cartList = res;

                            var sum = 0;
                            if(res){
                            for (var i = 0; i < cartList.length; i++) {
                                sum += cartList[i].totalCost;
                            }
                        }
                            $('#subtotal').html(sum.toFixed(2));

                        }, function (err) { });



                    },
                    function (err) {

                    });

            }

        });





        $(document).on('click', "[name='remove']", function () {
            var id = $(this).attr("id");
          
                
           
                var cartId = {
                    'cartId': id,                  

                };

                cartService.deleteCart(cartId,
                    function (res) {
                        var t='.rem_'+ id;
                        console.log(t);
                        console.log($(t));

                      $(t).fadeOut();
                      $(t).fadeOut("slow");
                      $(t).fadeOut(3000);            
                    //window.location.reload();



                    cartService.getCartList(function (res) {
                        res;
                     
                        console.log(res);
                        var total=0;
                     
                            for (var i = 0; i < res.length; i++) {
                                total += res[i].totalCost;
                                                           
                               
                            }
            
                           
                            total = total.toFixed(2);
                          
                            $('#subtotal').html(total);
            
                    
                    },
                        function (err) {
                           
            
                        });









                    },
                    function (err) {

                    });


                


        });






    },
    loadInfo: function () {
        var _this = this;
        var cartId = {
            'cartId': _util.getURLParam('cartId')
        };

        if (cartId) {
            cartService.deleteCart(cartId,
                function (res) {
                   
                },
                function (err) {

                })
        }
        cartService.getCartList(function (res) {
            _this.ListData.cartList = res;
            // _this.ListData.description ='http://localhost:8888/'+res.attribute2;
              if(res){
            if (_this.ListData.cartList.length > 0) {
                for (var i = 0; i < _this.ListData.cartList.length; i++) {
                    _this.ListData.total += _this.ListData.cartList[i].totalCost;
                    _this.ListData.cartList[i].listCost = _this.ListData.cartList[i].listCost.toFixed(2);
                    _this.ListData.cartList[i].totalCost = _this.ListData.cartList[i].totalCost.toFixed(2);
                    _this.ListData.cartList[i].itemDescription= _this.ListData.cartList[i].itemDescription.substring( _this.ListData.cartList[i].itemDescription.indexOf('>')+1);
                   console.log(_this.ListData.cartList[i].itemDescription);
                }

               
                _this.ListData.total = _this.ListData.total.toFixed(2);
                var result = _util.renderHtml(listTemplate, { ListData: _this.ListData });

                $('#Cart').html(result);

            }
        }

        },
            function (err) {

            });




    }


}

module.exports = _cart.init();