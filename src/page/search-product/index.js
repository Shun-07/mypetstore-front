require('page/common/header/index.js');

const _util = require('../../util/util');
const $ = require('jquery');
var catalogService = require('service/catalog-service.js');

var listTemplate = require('./index.string');

var _searchList = {

    ListData: {
        productsList: {}
    },

    init: function () {

        this.loadInfo();
        this.bindEvents();
        return this;
    },
    bindEvents: function () {


    },
    loadInfo: function () {
        var keyword = _util.getURLParam('value');


        var value = {
            'keyword': keyword
        }
    
        var _this = this;

        catalogService.searchProduct(value,
            function (res) {
                for (var i = 0; i < res.length; i++) {
                    res[i].description= res[i].description.substring(res[i].description.indexOf('/')+1, res[i].description.indexOf('>')-1);
                    res[i].description='http://localhost:8888/'+res[i].description;
                    console.log(res[i].description);
                }
            
                _this.ListData.productsList = res;

                var result = _util.renderHtml(listTemplate, { ListData: _this.ListData });

                console.log(result);
                $('#Catalog').html(result);

            },
            function (err) {
                console.log(err);
            }
        );

    }


}
_searchList.init();

module.exports = _searchList.init();