/**
 * Created by Administrator on 17-1-6.
 */

$(function () {
    var count = 0,
        limitDay = [],
        limitNum = $(".day");

    //循环获取中奖天数
    for (var d = 0; d < limitNum.length; d++) {
        limitDay.push(parseInt(limitNum.eq(d).text()));//设置中奖天数
    }
    //绑定--签到--点击事件
    $("#sign").on("touchend", function () {

        $("#mask").show();
        $("#logIn").show();

        bindClick(this, "您已签到");//修改签到状态

        count++;//记录签到次数

        if (count > 31) {
            count = 0;
        }//判断大于本月最大天数清零

        $(".number").find("i").text(p(count));//记录签到天数

        for (var i = 0; i < limitDay.length; i++) {//满足中奖天数
            if (count == limitDay[i]) {
                $("#signNum").css({border: "1px solid #ff8b03", color: "#ff8b03"})//点亮领取资格
                    .find("img").attr("src", "images/rightcolor.png");
                $("#prizeN").text(1);

                limitNum.eq(i).find("span").addClass("limday");//点亮领取奖项
                limitNum.eq(i).next(".cont2").css('border-color', "#ff8b03")
                    .find(".left i").css("border-color", "#ff8b03");

                if (i == 1) {
                    $(".line2").show().css("height", "3rem");//满足第2个
                }
                if (i == 2) {
                    $(".line2").css("height", "8.5rem");//满足第3个
                }

                //绑定--领取--点击事件
                $(".get").find("button").eq(i).on("tap", function () {
                    bindClick(this, "您已领取");
                });
            }
        }
        event.preventDefault();
    });
    //点击方法
    function bindClick(e, t) {
        $(e).css("background", "#d5d5d5").text(t);
    }

    //补0方法
    function p(s) {
        return s < 10 ? "0" + s : s;
    }
});
$("#close,#mask").on("touchend", function () {
    $("#mask").hide();
    $("#logIn").hide();
    event.preventDefault();
});
//弹窗活动规则开始
$("#activeItem").on("touchend",function () {
    $("#mask").show();
    $(".contentAct").show();
    popup(".contentAct");
    event.preventDefault();
});
$(".closeAct").on("touchend",function () {
    $("#mask").hide();
    $(".contentAct").hide();
    event.preventDefault();
});
//可视窗口居中
function popup(e) {
    var wh = window.innerHeight,//获取当前窗口高度
        ww = window.innerWidth,//获取当前窗口宽度
        ih = $(e).height(),//获取弹出层高度
        iw = $(e).width(),//获取弹出层宽度
        st = $("body").scrollTop(),//获取滚动条距离顶部的高度
        iTop = (wh - ih) / 2 + st,
        iLeft = (ww - iw) / 2;
    console.log(iTop, iLeft, st);
    $(e).css({"left": iLeft + "px", "top": iTop + "px", "display": "block"});//居中操作
}
