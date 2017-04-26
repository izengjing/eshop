/**
 *
 * Created by ZJing on 2017/4/21.
 */



$(function(){
    //商品功能
    var Product = function (id,name,price,img,quantity){
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.quantity = 0;
    };
    var cart = {
        totalQuantity: 0,
        totalAmount: 0,
        productList:[],
        addCart: function(product){
            // 版本一
            // this.productList.push(product);
            // this.totalQuantity = 0;this.totalAmount = 0;
            // for(var i = 0;i<this.productList.length;i++){
            //     this.totalQuantity += this.productList[i].quantity;
            //     this.totalAmount += this.productList[i].price * this.productList[i].quantity;
            // }
            // 版本二
            //对上面的代码改进：每次点击，都要遍历整个productList，麻烦，但实际只需要改变当前长度里面的属性值就可以了
            //this.productList.push(product);
            // this.totalQuantity += this.productList[this.productList.length].quantity;
            // this.totalAmount += this.productList[this.productList.length].price * this.productList[this.productList.length].quantity;
            // 版本三
            //再改进（优化版）
            this.productList.push(product);
            this.totalQuantity += product.quantity;
            this.totalAmount += product.price * product.quantity;

            //优化：购物车方法，这个是业务逻辑，不应该dom操作，不应该与dom直接挂钩，应该把dom操作与业务逻辑分离开
            // $('#quantity').html(this.totalQuantity+" items");
            // $('#money').html("$ "+this.totalAmount);

            //单独渲染
            productComp.render();
        },
        removeCart: function(){

        }
    };
    var productComp = {//商品相关功能对象
        $productList : $('#bestSeller>ul'),
        init : function(){
            this.loadData();//先加载一部分数据
            this.$productList.on('click','.btn-add-cart',function(){
                var product = $(this).parents('.product-item').data('item-data');
                product.quantity = parseInt($(this).prev().val());//获取数量
                cart.addCart(product);
            });
        },
        render : function(){
            $('#quantity').html(cart.totalQuantity+" items");
            $('#money').html("$ "+cart.totalAmount);
        },
        loadData : function(){
            // var $productList = $('#bestSeller ul');
            $.get('js/data.json',{},function (data) {//【【【获取数据】】】url,一个数据，一个回掉函数，返回一个数据格式'json'(一堆商品)
                for(var i = 0;i<data.length;i++){

                    var product = new Product(data[i].product_id,data[i].product_name,data[i].product_price,
                                            data[i].product_img,data[i].product_quantity);
                    var $product = $('<li class="product-item">\
                            <div class="imgZone">\
                                <a href=""><img src="'+product.img+'" alt=""></a>\
                            </div>\
                            <div class="product-info">\
                                <h3 class="product-name">'+product.name+'</h3>\
                                <h4 class="product-price">'+product.price+'</h4>\
                                <input type="text" class="quantity" value="'+product.quantity+'"/>\
                                <input type="button" class="btn-add-cart" value="ADD">\
                            </div>\
                        </li>');
                    $product.data('item-data',product);//绑定 名称：item-data，值：product
                    this.$productList.append($product);
                }
            }.bind(this),'json');//是个函数，通过bind把this传进去
        },
        loadMore : function(){

        }
    };
    productComp.init();
});