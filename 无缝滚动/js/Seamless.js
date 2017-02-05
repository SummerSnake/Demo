/**
 * Created by summersnake on 2017/2/3.
 */
(function ($) {
    var $items = $('.items'),
        lastTime = 0,
    //requestAnimationFrame兼容。
        nextFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                var currTime = +new Date(),
                    delay = Math.max(1000 / 60, 1000 / 60 - (currTime - lastTime));
                lastTime = currTime + delay;
                return setTimeout(callback, delay);
            },
        cancelFrame = window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.msCancelAnimationFrame ||
            clearTimeout,
        scrollX = 0,
        itemW = 480,
        target = 0,
        timer = null,
        sX,
        sL;
    //判断设备，调整图片大小。
    if ($items.children().eq(0).width() == 190) {
        itemW = 190;
    }
    if ($items.children().eq(0).width == 160) {
        itemW = 160;
    }
    //计算包裹层宽度。
    target = itemW * $items.children().length;
    //复制一组图片。
    $items.html($items.html() + $items.html());

    move();
    //滚动函数。
    function move() {
        timer = nextFrame(function () {
            scrollX += 1;
            if (scrollX >= target) {
                scrollX = 0;
            }
            $items.scrollLeft(scrollX);
            move();
        });
    }

    //PC端移入移出控制。
    if (!isMobile()) {
        $items.on('mouseover', function () {
            cancelFrame(timer);
        }).on('mouseout', function () {
            move();
        });
    }
    //移动端移入移出控制。
    $items.on('touchstart', function (e) {
        cancelFrame(timer);
        sX = e.originalEvent.changedTouches[0].pageX;//涉及当前事件(touchstart)的第一个手指的pageX。
        sL = $items.scrollLeft;
    }).on('touchmove', function (e) {
        var dis = e.originalEvent.changedTouches[0].pageX - sX;
        var nowX = sL - dis;
        if (nowX > target) {
            nowX = 0;
        }
        items.scrollLeft(nowX);
    }).on('touchend', function (e) {
        scrollX = $items.scrollLeft();
        if (scrollX >= target) {
            scrollX = 0;
        }
        move();
    });
    //判断是否在移动端。
    function isMobile() {
        return /(iphone|ipad|ipod|ios|android|mobile|blackberry|iemobile|mqqbrowser|juc|fennec|wosbrowser|browserng|Webos|symbian|windows phone)/i.test(navigator.userAgent);
    }
})(jQuery);