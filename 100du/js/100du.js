/**
 * Created by Administrator on 16-6-8.
 */
$(function () {
    //搜索框切换。
    (function () {
        var aLi = $("#menu li");
        var oText = $("#search").find(".form .text");
        var arrText = [
            "例如：荷棠鱼坊烧鱼 或 樱花日本料理",
            "例如：昌平区育新站龙旗广场2号楼609室",
            "例如：万达影院双人情侣券",
            "例如：东莞出事了，大老虎是谁？",
            "例如：北京初春降雪，天气变幻莫测"
        ];
        var iNow = 0;
        oText.val(arrText[iNow]);
        aLi.each(function (index) {
            $(this).click(function () {
                aLi.attr("class", "gradient");
                $(this).attr("class", "active");
                iNow = index;
                oText.val(arrText[iNow]);
            });
        });
        oText.focus(function () {
            if ($(this).val() == arrText[iNow]) {
                $(this).val("");
            }
        });
        oText.blur(function () {
            if ($(this).val() == "") {
                oText.val(arrText[iNow]);
            }
        });
    })();
    // update文字弹性滑动。
    (function () {
        var oDiv = $(".update");
        var oUl = oDiv.find("ul");
        var iHigh = 0;
        var arrData = [
            {"name": "萱萱", "time": 4, "title": "青山依旧在，几度夕阳红", "url": "#"},
            {"name": "畅畅", "time": 5, "title": "古今多少事，都付笑谈中", "url": "#"},
            {"name": "璐璐", "time": 6, "title": "生死挈阔，与子成说", "url": "#"},
            {"name": "琳琳", "time": 7, "title": "执子之手，与子偕老", "url": "#"},
            {"name": "晨晨", "time": 8, "title": "但愿人长久，千里共婵娟", "url": "#"},
            {"name": "韵韵", "time": 9, "title": "皑如山上雪，皎若云间月", "url": "#"},
            {"name": "琪琪", "time": 10, "title": "愿得一人心，白首不相离", "url": "#"},
            {"name": "默默", "time": 11, "title": "仰视山巅，肃何芊芊", "url": "#"}
        ];
        var str = "";
        var oBtnUp = $("#updateUpBtn");
        var oBtnDown = $("#updateDownBtn");
        var iNow = 0;
        var timer = null;

        for (var i = 0; i < arrData.length; i++) {
            str += "<li><a href='" + arrData[i].url + "'><strong>" + arrData[i].name + "</strong><span> "
                + arrData[i].time + "分钟前</span> 写了一篇新文章：" + arrData[i].title + "…</a></li>";
        }
        oUl.html(str);
        iHigh = oUl.find("li").height();
        oBtnUp.click(function () {
            doMove(-1);
        });

        oBtnDown.click(function () {
            doMove(1);
        });

        oDiv.hover(function () {
            clearInterval(timer);
        }, autoPlay);

        function autoPlay() {
            timer = setInterval(function () {
                doMove(-1);
            }, 3500);
        }

        autoPlay();

        function doMove(num) {
            iNow += num;
            if (Math.abs(iNow) > arrData.length - 1) {
                iNow = 0;
            }
            if (iNow > 0) {
                iNow = -(arrData.length - 1);
            }
            oUl.stop().animate({"top": iHigh * iNow}, 2200, "elasticOut");
        }
    })();
    // options 选项卡切换。
    (function () {

        fnTab($(".tabNav1"), $(".tabCon1"), "click");
        fnTab($(".tabNav2"), $(".tabCon2"), "click");
        fnTab($(".tabNav3"), $(".tabCon3"), "mouseover");
        fnTab($(".tabNav4"), $(".tabCon4"), "mouseover");

        function fnTab(oNav, aCon, sEvent) {
            var aElem = oNav.children();
            aCon.hide().eq(0).show();

            aElem.each(function (index) {
                $(this).on(sEvent, function () {
                    aElem.removeClass("active").addClass("gradient");
                    $(this).removeClass("gradient").addClass("active");
                    aElem.find("a").attr("class", "triangle_down_gray");
                    $(this).find("a").attr("class", "triangle_down_red");

                    aCon.hide().eq(index).show();
                });
            })
        }
    })();
    // 自动播放的焦点图。
    (function () {
        var oDiv = $("#fade");
        var aUlLi = oDiv.find("ul li");
        var aOlLi = oDiv.find("ol li");
        var oP = oDiv.find("p");
        var arr = ["爸爸去哪儿啦~", "人像摄影中的光影感", "娇柔妩媚、美艳大方"];
        var iNow = 0;
        var timer = null;

        fnFade();

        aOlLi.click(function () {
            iNow = $(this).index();
            fnFade();
        });

        oDiv.hover(function () {
            clearInterval(timer);
        }, autoPlay);

        function autoPlay() {
            timer = setInterval(function () {
                iNow++;
                iNow %= arr.length;
                fnFade();
            }, 3000);
        }

        autoPlay();

        function fnFade() {
            aUlLi.each(function (i) {
                if (i != iNow) {
                    aUlLi.eq(i).fadeOut().css("zIndex", 1);
                    aOlLi.eq(i).removeClass("active");
                } else {
                    aUlLi.eq(i).fadeIn().css("zIndex", 2);
                    aOlLi.eq(i).addClass("active");
                }
            });
            oP.text(arr[iNow]);
        }
    })();
    //日历提示说明。
    (function () {
        var aSpan = $(".calendar h3 span");
        var aImg = $(".calendar .img");
        var oPrompt = $(".today_info");
        var oImg = oPrompt.find("img");
        var oStrong = oPrompt.find("strong");
        var oP = oPrompt.find("p");

        aImg.hover(function () {
            var iTop = $(this).parent().position().top - 30;
            var iLeft = $(this).parent().position().left + 55;
            var index = $(this).parent().index() % aSpan.size();

            oPrompt.show().css({"left": iLeft, "top": iTop});
            oP.text($(this).attr("info"));
            oImg.attr("src", $(this).attr('src'));
            oStrong.text(aSpan.eq(index).text());
        }, function () {
            oPrompt.hide();
        });
    })();
    // BBS高亮显示。
    (function () {
        $(".bbs ol li").mouseover(function () {
            $(".bbs ol li").removeClass("active").eq($(this).index()).addClass("active");
        });
    })();
    // HOT鼠标半透明提示效果。
    (function () {
        var arr = [
            "",
            "用户1<br />人气1",
            "用户2：性感宝贝<br />区域：朝阳CBD<br />人气：124987",
            "用户3<br />人气3",
            "用户4<br />人气4",
            "用户5<br />人气5",
            "用户6<br />人气6",
            "用户7<br />人气7",
            "用户8<br />人气8",
            "用户9<br />人气9",
            "用户10<br />人气10"
        ];
        $(".hot_area li").mouseover(function () {
            if ($(this).index() == 0) {
                return;
            }
            $(".hot_area li p").remove();
            $(this).append('<p style="width:' + ($(this).width() - 12) + 'px; height:'
                + ($(this).height() - 12) + 'px;">' + arr[$(this).index()] + '</p>');
        });
    })();
});