/**
 * Created by Administrator on 16-4-10.
 */
window.onload = function () {
    var oDiv = document.getElementById("div1");
    var oUl = document.getElementsByTagName("ul")[0];
    var aLi = document.getElementsByTagName("li");
    var aA = document.getElementsByTagName("a");
    var timer = null;
    var iSpeed = 1;

    oUl.innerHTML += oUl.innerHTML;
    oUl.style.width = aLi.length * aLi[0].offsetWidth + "px";

    function start() {
        if (oUl.offsetLeft < -oUl.offsetWidth / 2) {
            oUl.style.left = 0;
        } else if (oUl.offsetLeft > 0) {
            oUl.style.left = -oUl.offsetWidth / 2 + "px";
        }
        oUl.style.left = oUl.offsetLeft + iSpeed + "px";
    }

    timer = setInterval(start, 30);

    aA[0].onclick = function () {
        iSpeed = -2;
    };
    aA[1].onclick = function () {
        iSpeed = 2;
    };

    oDiv.onmouseover = function () {
        clearInterval(timer);
    };
    oDiv.onmouseout = function () {
        timer = setInterval(start, 30);
    };
};