/**
 * 完美运动框架
 */
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}
function startMove(obj, json, fnEnd) {
    //每次调用首先清除定时器。
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        //假设此次运动已经结束，所有的值均已达到。
        var bStop = true;
        for (var attr in json) {
            //1、取当前值。
            var iCur = 0;
            //处理透明度。
            if (attr == "opacity") {
                iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            //2、计算运行速度。
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //3、检测是否停止。
            if (iCur != json[attr]) {
                bStop = false;
            }

            if (attr == "opacity") {
                obj.style.filter = "alpha(opacity:" + (iCur + iSpeed) + ")";
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + "px";
            }
        }
        //4、已到达目标点。
        if (bStop) {
            clearInterval(obj.timer);
            if (fnEnd) {
                fnEnd();
            }
        }
    }, 30);
}
