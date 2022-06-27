require('page/common/header/index.js');
var $ = require("jquery");

var orderService = require('service/order-service.js');
var accountService = require('service/account-service.js');

var listTemplate = require('./index.string');
//var result = _util.renderHtml(listTemplate, { ListData: _this.ListData });


var _order = {

    init: function () {

        $(".2").hide();
        $(".address").hide();
        this.loadInfo();
        this.bindEvents();
        return this;
    },
    bindEvents: function () {
       

        _this = this;
        $("#check").click(function () {
            if (this.checked) {
                //$(".address").toggle();
                //$(".address").show();
                $(".address").fadeIn();
                $(".address").fadeIn("slow");
                $(".address").fadeIn(3000);


            } else {
                //$(".address").fadeToggle();
                //$(".address").fadeToggle("slow");
                $(".address").fadeOut();
                $(".address").fadeOut("slow");
                $(".address").fadeOut(3000);
                // $(".address").toggle();
                //$(".address").hide();

            }

        });



        $("#newOrder").click(function () {

            if ($("#newOrder").val() == 'Continue') {
                $(".2").show();
                $(".1").hide();
                $(".address").show();
                $(".check").hide();
                console.log("+++++++++++++++++++++++++++++++++++++++++")
                $("#newOrder").attr('value', 'Confirm');

                var ListData = {
                    shipChanged: false,
                    confirmed: true,
                    // shippingAddressRequired:'OK',
                    // cardType:'',
                    // creditcard:999999999999999,
                    // billToFirstName:'',
                    // billToLastName:'',
                    // billAddress1:'',
                    // billAddress2:'',
                    // billCity:'',
                    // billState:'',
                    // billCountry:'',
                    // billZip:'',
                    shipToFirstName: '',
                    shipToLastName: '',
                    shipAddress1: '',
                    shipAddress2: '',
                    shipCity: '',
                    shipState: '',
                    shipCountry: '',
                    shipZip: '',

                };


                // ListData['cardType']=$("#cardType option:selected").val();
                // ListData['billToFirstName'] = $(".shipToFirstName").val();
                // ListData['billToLastName']=$(".shipToLastName").val();
                // ListData['billAddress1']=$(".shipAddress1").val();
                // ListData['billAddress2'] =$(".shipAddress2").val();
                // ListData['billCity'] =$(".shipCity").val();
                // ListData['billState'] =$(".shipState").val();
                // ListData['billCountry']=$(".shipCountry").val();
                // ListData['billZip']=  $(".shipZip").val();    
                // ListData['shipToFirstName'] = $(".shipToFirstName").val();
                // ListData['shipToLastName']=$(".shipToLastName").val();
                // ListData['shipAddress1']=$(".shipAddress1").val();
                // ListData['shipAddress2']=$(".shipAddress2").val();
                // ListData['shipCity']=$(".shipCity").val();
                // ListData['shipState']=$(".shipState").val();
                // ListData['shipCountry']=$(".shipCountry").val();
                // ListData['shipZip']=   $(".shipZip").val(); 

                // ListData['confirmed']='OK',
                // ListData['shipChanged']="NO",

                ListData.confirmed = 'OK',
                    ListData.shipChanged = "NO",
                    ListData.shipToFirstName = $(".shipToFirstName").val();
                ListData.shipToLastName = $(".shipToLastName").val();
                ListData.shipAddress1 = $(".shipAddress1").val();
                ListData.shipAddress2 = $(".shipAddress2").val();
                ListData.shipCity = $(".shipCity").val();
                ListData.shipState = $(".shipState").val();
                ListData.shipCountry = $(".shipCountry").val();
                ListData.shipZip = $(".shipZip").val();

                console.log(ListData);

                orderService.generateOrder(ListData, function (res) {

                    console.log(res);



                    _this.orderId = res.orderId;

                    //     $(".shipToFirstName").val()=res.shipToFirstName;
                    //    $(".shipToLastName").val()=res.shipToLastName;
                    //   $(".shipAddress1").val()=res.shipAddress1;
                    //     $(".shipAddress2").val()=res.shipAddress2;
                    //     $(".shipCity").val()=res.shipCity;
                    //      $(".shipState").val()=res.shipState;
                    //     $(".shipCountry").val()=res.shipCountry;
                    //      $(".shipZip").val()=res.shipZip;
                    //       $(".shipToFirstName").val()=res.shipToFirstName;
                    //     $(".shipToLastName").val()=res.shipToLastName;
                    //     $(".shipAddress1").val()=res.shipAddress1;
                    //    $(".shipAddress2").val()=res.shipAddress2;
                    //     $(".shipCity").val()=res.shipCity;
                    //     $(".shipState").val()=res.shipState;
                    //     $(".shipCountry").val()=res.shipCountry;
                    //       $(".shipZip").val()=res.shipZip;








                }, function (err) {
                    window.alert(err);
                });













            }
            else {


                window.location.href = 'confirm.html?id=' + _this.orderId;

            }

        });







    },
    loadInfo: function () {



        orderService.newOrderForm(function (res) {

            
        },
            function (err) {


            })


        var _this = this;
        accountService.getInfo(function (data) {
            console.log(data);

            $(".billToFirstName").val(data.firstName);
            $(".billToLastName").val(data.lastName);
            $(".billAddress1").val(data.address1);
            $(".billAddress2").val(data.address2);
            $(".billCity").val(data.city);
            $(".billState").val(data.state);
            $(".billZip").val(data.zip);
            $(".billCountry").val(data.country);

            $(".shipToFirstName").val(data.firstName);
            $(".shipToLastName").val(data.lastName);
            $(".shipAddress1").val(data.address1);
            $(".shipAddress2").val(data.address2);
            $(".shipCity").val(data.city);
            $(".shipState").val(data.state);
            $(".shipZip").val(data.zip);
            $(".shipCountry").val(data.country);



        }, function (error) {

        })



    }


}

module.exports = _order.init();