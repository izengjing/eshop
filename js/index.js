/**
 *
 * Created by ZJing on 2017/4/21.
 */



$(function(){
    //商品功能
    var Product = function (id,name,price,img){
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        // this.quantity = quantity;
    };
    var cart = {
        totalQuantity: 0,
        totalAmount: 0,
        addCart: function(){

        },
        remoueCart: function(){

        }
    };
    var productComp = {//商品相关功能对象
        $productList : $('#bestSeller>ul'),
        init : function(){
            this.loadData();//先加载一部分数据
            this.$productList.on('click','.btn-add-cart',function(){

                console.log($(this).parents('.product-item'));
                console.log($(this).parents('.product-item').data());
                console.log($(this).parents('.product-item').data('item-data'));
            });

        },
        loadData : function(){
            // var $productList = $('#bestSeller ul');
            $.get('js/data.json',{},function (data) {//【【【获取数据】】】url,一个数据，一个回掉函数，返回一个数据格式'json'(一堆商品)
                for(var i = 0;i<data.length;i++){

                    var product = new Product(data[i].product_id,data[i].product_name,data[i].product_price,data[i].product_img);
                    var $product = $('<li class="product-item">\
                            <div class="imgZone">\
                                <a href=""><img src="'+product.img+'" alt=""></a>\
                            </div>\
                            <div class="product-info">\
                                <h3 class="product-name">'+product.name+'</h3>\
                                <h4 class="product-price">'+product.price+'</h4>\
                                <input type="text" class="quantity" value="1"/><br />\
                                <input type="button" class="btn-add-cart" value="ADD">\
                            </div>\
                        </li>');//绑定 名称：item-data，值：product
                    $product.data('item-data',product);
                    this.$productList.append($product);

                    console.log($product);
                     console.log($product.data('item-data'));
                }
            }.bind(this),'json');//是个函数，通过bind把this传进去
        },
        loadMore : function(){

        }
    };
    productComp.init();
});