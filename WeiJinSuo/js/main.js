/**
 * Created by Administrator on 16-7-22.
 */
$(function () {
    //根据屏幕宽度的变化决定轮播图片大小
    (function () {

        $(window).on("resize", resize).trigger("resize");

        function resize() {
            // 获取屏幕宽度
            var windowWidth = $(window).width();
            // 判断屏幕大小
            var isSmallScreen = windowWidth < 768;
            // 根据大小为界面上的每一张轮播图设置背景
            $("#home_slide>.carousel-inner>.item").each(function (i, item) {
                // 因为拿到是DOM对象 需要转换
                var $item = $(item);
                var imgSrc = $item.data(isSmallScreen ? "image-xs" : "image-lg");
                // 设置背景图片
                $item.css('backgroundImage', 'url("' + imgSrc + '")');
                // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
                if (isSmallScreen) {
                    $item.html('<img src="' + imgSrc + '" alt="" />');
                } else {
                    $item.empty();
                }
            });
        }
    })();
    // 轮播图触摸
    (function () {
        // 获取界面上的轮播图容器
        var $carousels = $(".carousel");
        var startX, endX;
        var offset = 50;
        // 注册滑动事件
        $carousels.on("touchstart", function (e) {
            // 手指触摸开始时记录一下手指所在的坐标X
            startX = e.originalEvent.touches[0].clientX;
        });

        $carousels.on("touchmove", function (e) {
            // 变量重复赋值
            endX = e.originalEvent.touches[0].clientX;
        });
        $carousels.on("touchend", function () {
            // 结束触摸一瞬间记录最后的手指所在坐标X
            // 比大小
            // 控制精度
            // 获取每次运动的距离，当距离大于一定值时认为是有方向变化
            var distance = Math.abs(startX - endX);
            if (distance > offset) {
                // 有方向变化
                // console.log(startX > endX ? "←" : "→");
                // 2. 根据获得到的方向选择上一张或者下一张
                //     - $("a").click();
                $(this).carousel(startX > endX ? "next" : "prev");
            }
        });
    })();
    // 提示框效果
    (function () {
        $("[data-toggle='tooltip']").tooltip()
    })();
    // 新闻点击切换
    (function () {
        $(".news-nav a").click(function () {
            $(".news-title").text($(this).data("title"));
        })
    })();
    //控制标签页的标签容器宽度
    (function () {
        var $ulContainer = $(".nav-tabs");
        // 获取所有子元素的宽度和
        var width = 30;
        // 遍历子元素
        $ulContainer.children().each(function (index, element) {
            width += element.clientWidth;
        });
        // 此时width等于所有LI的宽度总和
        // 判断当前UL的宽度是否超出屏幕，如果超出就显示横向滚动条
        if (width > $(window).width()) {
            $ulContainer.css("width", width).parent().css("overflow-x", "scroll");
        }
    })();
});