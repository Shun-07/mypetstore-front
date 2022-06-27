require('page/common/header/index.js');
var $ = require("jquery");

var orderService = require('service/order-service.js');

var _util = require('util/util.js');


var listTemplate = require('./index.string');
var _confirm = {
    ListData: {
        billAddress1: "2",
        billAddress2: "1",
        billCity: "2",
        billCountry: "1",
        billState: "2",
        billToFirstName: "1",
        billToLastName: "1",
        billZip: "1",
        cardType: "Visa",
        courier: "UPS",
        creditCard: "999 9999 9999 9999",
        expiryDate: "12/03",
        lineItems: {},
        locale: "CA",
        orderDate: "2022-04-17T16:25:13.189+00:00",
        orderId: 0,
        shipAddress1: "2",
        shipAddress2: "1",
        shipCity: "2",
        shipCountry: "1",
        shipState: "2",
        shipToFirstName: "1",
        shipToLastName: "1",
        shipZip: "1",
        status: "P",
        totalPrice: "399.00",
        username: "j2ee",

    },
    init: function () {



        this.loadInfo();
        this.bindEvents();
        return this;
    },
    bindEvents: function () {


    },
    loadInfo: function () {

        var id = _util.getURLParam('id');
        console.log(id);

        var _this = this;

        orderService.viewOrder({ 'orderId': id }, function (res) {

            ListData = res;
            console.log(ListData.totalPrice);
            //ListData.lineItems=JSON.stringify(res.lineItems);
            for(var i=0;i<ListData.lineItems.length;i++) {
            ListData.lineItems[i].total=ListData.lineItems[i].unitPrice*ListData.lineItems[i].quantity;
            console.log( ListData.lineItems[i].total);
          
           
            ListData.lineItems[i].unitPrice=ListData.lineItems[i].unitPrice.toFixed(2);
            ListData.lineItems[i].total= ListData.lineItems[i].total.toFixed(2);

               }

              
               _this.ListData.orderDate =_this.ListData.orderDate.substring(0,10)+" "+_this.ListData.orderDate.substring(11,19);
              
              


              
               //ListData.orderDate=new Date(+new Date(dates) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
           
            ListData.totalPrice= ListData.totalPrice.toFixed(2);
            _this.ListData.totalPrice=ListData.totalPrice;
            
            _this.ListData.lineItems=res.lineItems;
         
            console.log(_this.ListData.orderDate);
            var result = _util.renderHtml(listTemplate, {ListData:_this.ListData});
         
           
            $('#Catalog').html(result);







        }, function (err) {

        })




    }


}

module.exports = _confirm.init();