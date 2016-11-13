/**
 * Created by Administrator on 16-4-17.
 */
window.onload = function () {
    var oUl = document.getElementById("ul1");
    var aLi = document.getElementsByTagName("li");
    var aPos = [];
    var iMinIndex = 2;
    var i = 0;
    //布局转换。
    for (i = 0; i < aLi.length; i++) {
        aPos[i] = {left: aLi[i].offsetLeft, top: aLi[i].offsetTop};
    }

    for (i = 0; i < aLi.length; i++) {
        aLi[i].style.left = aPos[i].left + "px";
        aLi[i].style.top = aPos[i].top + "px";

        aLi[i].style.position = "absolute";
        aLi[i].style.margin = 0;

        aLi[i].index = i;
    }

    for (i = 0; i < aLi.length; i++) {
        setDrag(aLi[i]);
    }
    //拖拽。
    function setDrag(obj) {
        obj.onmousedown = function (ev) {

            var oEvent = ev || event;

            obj.style.zIndex = iMinIndex++;

            var disX = oEvent.clientX - obj.offsetLeft;
            var disY = oEvent.clientY - obj.offsetTop;

            document.onmousemove = function (ev) {
                var oEvent = ev || event;
                obj.style.left = oEvent.clientX - disX + "px";
                obj.style.top = oEvent.clientY - disY + "px";

                for (i = 0; i < aLi.length; i++) {

                    aLi[i].className = "";
                }
                var oNear = findNearest(obj);
                if (oNear) {
                    oNear.className = "active";
                }

                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouseup = null;

                    var oNear = findNearest(obj);

                    if (oNear) {
                        oNear.className = "";

                        oNear.style.zIndex = iMinIndex++;
                        obj.style.zIndex = iMinIndex++;

                        startMove(oNear, aPos[obj.index]);
                        startMove(obj, aPos[oNear.index]);

                        var tmp = 0;

                        tmp = obj.index;
                        obj.index = oNear.index;
                        oNear.index = tmp;
                        
                    } else {
                        startMove(obj, aPos[obj.index]);
                    }
                };
            };

            clearInterval(obj.timer);
            return false;
        };
    }


    //碰撞检测。
    function collisionTest(obj1, obj2) {

        var left1 = obj1.offsetLeft;
        var right1 = obj1.offsetLeft + obj1.offsetWidth;
        var top1 = obj1.offsetTop;
        var bottom1 = obj1.offsetTop + obj1.offsetHeight;

        var left2 = obj2.offsetLeft;
        var right2 = obj2.offsetLeft + obj2.offsetWidth;
        var top2 = obj2.offsetTop;
        var bottom2 = obj2.offsetTop + obj2.offsetHeight;

        if (right1 < left2 || left1 > right2 || bottom1 < top2 || top1 > bottom2) {
            return false;
        } else {
            return true;
        }
    }

    function getDis(obj1, obj2) {
        var a = obj1.offsetLeft - obj2.offsetLeft;
        var b = obj1.offsetTop - obj2.offsetTop;

        return Math.sqrt(a * a + b * b);
    }

    //找到碰上的，并且最近的。
    function findNearest(obj) {

        var iMin = 999999999;
        var iMinIndex = -1;
        for (i = 0; i < aLi.length; i++) {
            if (obj == aLi[i]) {
                continue;
            }
            if (collisionTest(obj, aLi[i])) {
                var dis = getDis(obj, aLi[i]);
                if (iMin > dis) {
                    iMin = dis;
                    iMinIndex = i;
                }
            }
        }
        if (iMinIndex == -1) {
            return null;
        } else {
            return aLi[iMinIndex];
        }
    }

    //运动。

};