/**
 * Created by Administrator on 16-5-2.
 */
window.onload = function () {
    var oPrevDiv = document.getElementsByClassName("prev_div")[0];
    var oNextDiv = document.getElementsByClassName("next_div")[0];
    var aLi = document.getElementsByTagName("li");
    var arr = [];

    for (var i = 0; i < aLi.length; i++) {
        var oImg = aLi[i].getElementsByTagName("img")[0];
        arr.push([parseInt(getStyle(aLi[i], "left")), parseInt(getStyle(aLi[i], "top")),
            getStyle(aLi[i], "opacity") * 100, getStyle(aLi[i], "zIndex"), oImg.width]);
    }

    oPrevDiv.onclick = function () {
        arr.push(arr[0]);
        arr.shift();

        for (var i = 0; i < aLi.length; i++) {
            var oImg = aLi[i].getElementsByTagName("img")[0];
            aLi[i].style.zIndex = arr[i][3];
            startMove(aLi[i], {left: arr[i][0], top: arr[i][1], opacity: arr[i][2]});
            startMove(oImg, {width: arr[i][4]});
        }
    };

    oNextDiv.onclick = function () {
        arr.unshift(arr[arr.length - 1]);
        arr.pop();
        for (var i = 0; i < aLi.length; i++) {
            var oImg = aLi[i].getElementsByTagName("img")[0];
            aLi[i].style.zIndex = arr[i][3];
            startMove(aLi[i], {left: arr[i][0], top: arr[i][1], opacity: arr[i][2]});
            startMove(oImg, {width: arr[i][4]});
        }
    };

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        }
        else {
            return getComputedStyle(obj, false)[attr];
        }
    }
};