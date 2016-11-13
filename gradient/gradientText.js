/**
 * Created by Administrator on 16-4-9.
 */
window.onload = function () {
    var oTxt = document.getElementById("txt1");
    var oBtn = document.getElementById("btn1");
    var oUl = document.getElementById("ul1");

    oBtn.onclick = function () {

        var oLi = document.createElement("li");
        var aLi = document.getElementsByTagName("li");

        oLi.innerHTML = oTxt.value;
        oTxt.value = "";
        if (aLi.length) {
            oUl.insertBefore(oLi, aLi[0]);
        } else {
            oUl.appendChild(oLi);
        }

        var iHeight = oLi.offsetHeight;
        oLi.style.height = 0;

        startMove(oLi, {height: iHeight}, function () {
            startMove(oLi, {opacity: 100});
        });
    }
};