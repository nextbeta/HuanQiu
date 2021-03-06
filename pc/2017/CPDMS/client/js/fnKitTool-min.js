function getMonthNums(e, t) {
  return new Date(e, t, 0).getDate()
}
Date.prototype.isLeapYear = function(e) {
  var t = e ? parseInt(e) : this.getYear();
  return 0 == t % 4 && (t % 100 != 0 || t % 400 == 0)
}, Date.prototype.Format = function(e) {
  var t = e,
    n = ["日", "一", "二", "三", "四", "五", "六"];
  return t = t.replace(/yyyy|YYYY/, this.getFullYear()), t = t.replace(/yy|YY/, this.getYear() % 100 > 9 ? (this.getYear() % 100).toString() : "0" + this.getYear() % 100), t = t.replace(/MM/, this.getMonth() + 1 > 9 ? (this.getMonth() + 1).toString() : "0" + (this.getMonth() + 1)), t = t.replace(/M/g, this.getMonth() + 1), t = t.replace(/w|W/g, n[this.getDay()]), t = t.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : "0" + this.getDate()), t = t.replace(/d|D/g, this.getDate()), t = t.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : "0" + this.getHours()), t = t.replace(/h|H/g, this.getHours()), t = t.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : "0" + this.getMinutes()), t = t.replace(/m/g, this.getMinutes()), t = t.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : "0" + this.getSeconds()), t = t.replace(/s|S/g, this.getSeconds())
}, Date.prototype.addDays = function(e) { this.setDate(this.getDate() + e) }, Date.prototype.addDaysFormat = function(e) {
  var t = this.setDate(this.getDate() + e);
  return new Date(t)
}, Date.prototype.addWeeks = function(e) { this.addDays(7 * e) }, Date.prototype.addMonths = function(e) {
  var t = this.getDate();
  this.setMonth(this.getMonth() + e), this.getDate() < t && this.setDate(0)
}, Date.prototype.addYears = function(e) {
  var t = this.getMonth();
  this.setFullYear(this.getFullYear() + e), t < this.getMonth() && this.setDate(0)
}, Date.prototype.daysBetween = function(e, t) {
  e = e.replace(/-/g, "/"), t = t.replace(/-/g, "/");
  var n = (Date.parse(e) - Date.parse(t)) / 864e5;
  return Math.abs(n)
}, Date.prototype.getDaysAgo = function(e) {
  var t = new Date,
    n = new Date(t.getTime() - 24 * e * 3600 * 1e3),
    i = n.getFullYear(),
    a = n.getMonth() + 1,
    o = n.getDate();
  return a < 10 && (a = "0" + a), o < 10 && (o = "0" + o), i + "-" + a + "-" + o
}, Date.prototype.getMonthAgo = function(e) {
  var t = new Date,
    n = t.getFullYear(),
    i = t.getMonth() + 1 - e,
    a = t.getDate();
  return i <= 0 && (i += 12, n -= 1), i < 10 && (i = "0" + i), a < 10 && (a = "0" + a), n + "-" + i + "-" + a
}, Date.prototype.getYearAgo = function(e) {
  var t = new Date,
    n = t.getFullYear(),
    i = t.getMonth() + 1,
    a = t.getDate();
  return i < 10 && (i = "0" + i), a < 10 && (a = "0" + a), n - e + "-" + i + "-" + a
};
var FNKitTool = {
    createNew: function() {
      var fnKitTool = { url: { getUrl: "/api/dataJson", postUrl: "/Command/dataPost.aspx" } },
        createXHR = function() {
          if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
          if ("undefined" == typeof ActiveXObject) throw new Error("您的系统或浏览器不支持XHR对象！");
          for (var e = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], t = 0; t < e.length; t++) try {
            return new ActiveXObject(e[t])
          } catch (e) {}
        },
        params = function(e) {
          var t = [];
          for (var n in e) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
          return t.join("&")
        };
      return fnKitTool.adjustPage = function(e) {
        var t = $("#leftnav"),
          n = $("#newslist"),
          i = $("#myframe"),
          a = $(window).height(),
          o = $("#fn-header").outerHeight(),
          s = $(".header-bar").eq(0).outerHeight(),
          r = ($("#content .leftMenu2").eq(0).outerHeight(), 50),
          l = ($(".fn-s-rightHeader").eq(0).outerHeight(), a - o - r);
        // n.height(l - s), i.height(l - 50);
        n.height(l - 170), i.height(l - 50);
        var c = 0;
        switch (e) {
          case 0:
            t.height(l);
            break;
          case 1:
            break;
          case 2:
            c = $(".fn-new-four-links").eq(0).outerHeight(), t.height(l - c), n.height(l - s - c), i.height(l - c);
            break;
          case 3:
            var d = l - t.siblings(".panel-heading").eq(0).outerHeight();
            t.css("height", d + "px");
            break;
          case 4:
            $("#content>.main").height(l);
            break;
          case 5:
            c = $(".fn-new-four-links").eq(0).outerHeight(), $("#content>.main").height(l - c - 20)
        }
      }, 
      fnKitTool.ajaxRequest = function(e) {
        function t() { 200 == n.status ? e.success(n.responseText) : e.Error("获取数据失败!<br>错误代号为：" + n.status + "<br>错误信息为：" + n.statusText) }
        var n = createXHR();
        e.url = e.url + "?rand=" + Math.random(), 
        e.data = params(e.data), "get" === e.method.toLowerCase() && (e.url += "-1" == e.url.indexOf("?") ? "?" + e.data : "&" + e.data), !0 === e.async && (n.onreadystatechange = function() { 4 == n.readyState && t() }), n.open(e.method, 
          e.url, 
        e.async), "post" === e.method.toLowerCase() ? (n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.send(e.data)) : n.send(null), !1 === e.async && t()
      }, 
      fnKitTool.render = function(e, t, n) {}, 
      fnKitTool.getDis = function(e) {
        var t = $(window).width(),
          n = $(window).height(),
          i = e.pageX,
          a = e.pageY;
        return { top: a, left: i, bottom: n - a, right: t - i }
      }, 
      fnKitTool.getDomPos = function(e) {
        e instanceof jQuery || (e = $(e));
        var t = e.offset(),
          n = e.outerWidth(),
          i = e.outerHeight(),
          a = $(window).width(),
          o = $(window).height();
        return t.right = a - n - t.left, t.bottom = o - t.top - i, t
      }, 
      fnKitTool.getCursorPos = function(e, t) {
        var n = t || window.event,
          i = n.clientX,
          a = n.clientY,
          o = fnTool.getDomPos(e);
        return { rl: i - o.left, rt: a - o.top }
      }, 
      fnKitTool.ajaxSimply = function(type, data, url, callback, err) {
        var dtd = $.Deferred(),
          time = { num: 1 };
        return $.ajax({
          type: type,
          data: data,
          url: url,
          timeout: 18e4,
          success: function(viewData) {
            if (typeof viewData === 'object') {
              viewData = JSON.stringify(viewData)
            }
            return 0 == viewData.indexOf('"') && (viewData = JSON.parse(viewData)), viewData = 0 == viewData.indexOf("{") ? JSON.parse(viewData) : eval("[" + viewData + "]"), callback && callback(viewData), dtd.resolve(), dtd.promise()
          },
          error: function(e, t, n) { console && console.log(n) }
        })
      }, 
      fnKitTool.handleViewData = function(e, t, n) {
        if (!e.Succeed) {
          switch (e.state) {
            case 0:
              n && n(e.Msg, e);
              break;
            case 200:
              window.location.href = "/UserManage/UserLogin/Login.aspx?url=" + encodeURIComponent(window.location.href);
              break;
            case 201:
              fnTool.alertCustom("您当前没有权限进行此操作！", "error")
          }
          return !1
        }
        var i = e.obj ? e.obj : e.dt ? e.dt : e;
        t && t(i, 
          e.Msg, 
        e.Msg2)
      }, 
      fnKitTool.DealReturns = function(result) {
        var msg = eval(result);
        msg.IfError ? $.alert({ title: "<h4>用户登录已过期，请重新登录</h4>", columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4", autoClose: "confirm|2000", content: !1, confirmButton: "确定", confirmButtonClass: "btn-primary hidden", confirm: function() { window.location.reload() } }) : msg.Succeed ? $.alert({ title: "<h4>您已经成功取消该频道收藏</h4>", columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4", autoClose: "confirm|2000", content: !1, confirmButton: "确定", confirmButtonClass: "btn-primary hidden", confirm: function() { window.location.reload() } }) : $.alert({ title: "<h4>" + msg.Msg + "</h4>", columnClass: "col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4", autoClose: "confirm|2000", content: !1, confirmButton: "确定", confirmButtonClass: "btn-primary", confirm: function() {} })
      }, 
      fnKitTool.cutStr = function(e, t) {
        for (var n = 0, i = e.length, a = /[\u4e00-\u9fa5]/, o = "", s = 0, r = e; s < i && n <= t;) o = e.charAt(s), a.test(o) ? n += 2 : n++, s++;
        return n > t && (s--, r = e.substring(0, s) + "…"), r
      }, 
      fnKitTool.SysMonitor = function() {
       // fnTool.ajaxSimply("post", {}, "/api/dataJson?whatDo=SysMonitor", function(e) {
       //    -1 == e.Result && (top.window.location.href = "../UserManage/UserLogin/Login.aspx?url=" + top.window.location.href) 
       //  }) 
      }, 
      fnKitTool.stopPropagation = function(e) {
        var t = e || window.event;
        return t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, t
      }, 
      fnKitTool.stopDefault = function(e) {
        var t = e || window.event;
        t.preventDefault ? t.preventDefault() : t.reutrnValue = !1
      }, 
      fnKitTool.bindEvent = function(e, t, n) { e && (e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n) }, 
      fnKitTool.alertCustom = function(e, t, n) {
        $(".alert-customIcon").remove(), $("body").append("<div class='alert alert-" + t + " alert-customIcon'><i class='fa fa-check fa-lg'></i>" + e + "<button class='close' data-dismiss='alert'><i class='fa fa-times'></i></button></div>");
        var i = $(window).height(),
          a = $(window).width(),
          o = $(".alert-customIcon"),
          s = o.outerWidth(),
          r = o.outerHeight();
        $(".alert-customIcon").css({ left: (a - s) / 2, top: (i - r) / 2 }).animate({ opacity: .8 }, 5e3, function() { $(this).remove(), n && n() })
      }, 
      fnKitTool.getUrlVal = function(e, t) {
        var n, i = "";
        if (i = 2 == arguments.length ? t.attr("src") : window.location.href, i.indexOf("?") >= 0 && i.indexOf("=") > i.indexOf("?")) {
          n = i.split("?")[1].split("&");
          for (var a, o = 0; o < n.length; o++)
            if (a = n[o].split("="), a[0] == e) return a[1]
        }
        return null
      }, 
      fnKitTool.replaceStr = function(e, t) {
        return e.replace(/\{\w*\}/g, function(e) {
          var n = "",
            i = e.substring(1, 
              e.length - 1);
          return void 0 !== t[i] && (n = t[i]), n
        })
      }, 
      fnKitTool.concatStr = function(e, t) {
        for (var n = t.length, i = null, a = "", o = 0; o < n; o++) i = t[o], a += fnTool.replaceStr(e, i);
        return a
      }, 
      fnKitTool.checkBrowser = function() {
        var e = navigator.userAgent;
        if (e.indexOf("Opera") > -1) return "Opera";
        if (e.indexOf("Firefox") > -1) return "FF";
        if (e.indexOf("Chrome") > -1) return "Chrome";
        for (var t = 3, n = document.createElement("div"), i = n.getElementsByTagName("i"); n.innerHTML = "\x3c!--[if gt IE " + ++t + "]><i></i><![endif]--\x3e", i[0];);
        return t > 4 && t
      }, 
      fnKitTool.curStr = function(e, t) {
        for (var n = 0, i = e.length, a = /[\u4e00-\u9fa5]/, o = "", s = 0, r = e; s < i && n <= t;) o = e.charAt(s), a.test(o) ? n += 2 : n++, s++;
        return n > t && (s--, r = e.substring(0, s) + "…"), r
      }, 
      fnKitTool.CleanHtmlTags = function(e) {
        return null == e || void 0 == e || "" == e ? "" : (e = e.replace(/<[^>]+>/g, ""), e = e.replace(/<\/?.+?>/g, ""), e = e.replace(/[ | ]*\n/g, "\n"), e = e.replace(/</g, ""), e = e.replace(/>/g, ""), e = e.replace(/\\/g, ""), e = e.replace(/\\"/g, ""), e = e.replace(/"/g, ""), e = e.replace(/p/g, ""), e = e.replace(/\/p/g, ""), e = e.replace(/　/g, ""), e = e.replace(/\r\n/g, ""), e = e.replace(/&nbs;/g, ""), e = e.replace(/&;/g, ""), e = e.replace(/&；/g, ""))
      }, 
      fnKitTool.filterData = function(e, t) {
        var n = e ? e.length : 0,
          i = null,
          a = {},
          o = 0,
          s = [];
        if (n) {
          for (var r = 0; r < n; r++) {
            if (i = e[r], t && o >= t) return s;
            a[i.same_id] || (a[i.same_id] = i, s.push(i), o++)
          }
          return s
        }
        return []
      }, 
      fnKitTool.toggleCollect = function(e, t, n, i) {
        var a = "",
          o = "",
          s = "",
          r = "",
          l = "";
        switch ("4" == n ? $(e).before("<img class=\"pull-right\" src='/images/loader.gif' style='width:15px;height:15px' />") : $(e).before("<img src='/images/loader.gif' style='width:15px;height:15px' />"), $(e).hide(), n) {
          case 1:
            a = "文章收藏成功！", o = "文章收藏失败！", s = "取消文章收藏成功！", r = "取消文章收藏失败！";
            break;
          case 2:
            a = "频道收藏成功！", o = "频道收藏失败！", s = "取消频道收藏成功！", r = "取消频道收藏失败！";
            break;
          case 3:
            a = "事件收藏成功！", o = "事件收藏失败！", s = "取消事件收藏成功！", r = "取消事件收藏失败！";
            break;
          case 4:
            a = "报纸收藏成功！", o = "报纸收藏失败！", s = "取消报纸收藏成功！", r = "取消报纸收藏失败！"
        }
        l = $(e).hasClass("text-warning") ? "deleteCollection" : "addCollection", ajaxrequest = $.getJSON("/api/collection?whatDo=" + l + "&collectionId=" + n + "&keyId=" + t + "&keyName=" + i, function(t) { $(e).show(), $(e).prev("img").remove(), "addCollection" == l ? t.Succeed ? ($(e).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: a }), $(e).popover("show"), $(e).removeClass("fa-star-o text-muted"), $(e).addClass("fa-star text-warning")) : ($(e).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: o }), $(e).popover("show")) : t.Succeed ? ($(e).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: s }), $(e).popover("show"), $(e).removeClass("fa-star text-warning"), $(e).addClass("fa-star-o text-muted")) : ($(e).popover({ container: "body", toggle: "popover", animation: !0, placement: "top", content: r }), $(e).popover("show")), setTimeout(function() { $(e).popover("destroy") }, 1e3) })
      }, 
      fnKitTool.toggleColCollection = function(e, t) { this.stopPropagation(t), this.toggleCollect(e, $(e).attr("data-id"), 2, $(e).parent().attr("title")) }, 
      fnKitTool.SetChannelInfo = function(e) { $("#channelinfo .fn-s-channelName").eq(0).html(unescape(e)) }, 
      fnKitTool.ChannelNameSearch = function(e, t, n) {
        if (13 == e.keyCode) return "txt_searchchannel" == document.activeElement.id && ("" != $("#txt_searchchannel").val() ? $.when(this.SearchChannel(n)).done(function() {
          $("#txtkeyWords").val("");
          var e = $("#fntree a").eq(0);
          e.length && (fnTool.SetChannelInfo(e.attr("title")), 
            e.click())
        }) : t && t(-100)), 
          e.keyCode = 9, !1
      }, 
      fnKitTool.SearchChannel = function(e) {
        var t = $.Deferred();
        fnTool.SysMonitor();
        var n = '<span class="text-danger text-center" style="width:100%;">没有匹配结果</span>';
        this.ajaxrequest && this.ajaxrequest.abort();
        var i = "";
        return this.ajaxrequest = $.getJSON("/api/dataJson?whatDo=WebsiteChannelSearch&active=1&treeType=1&key=" + encodeURIComponent($("#txt_searchchannel").val()) + "&GroupArticleType=" + e, function(e) { 1 == e.result && e.count > 0 && (n = "", $.each(e.data, function(e, t) { 0 == e && $("#txt_cid").val(t.websiteID), i += t.websiteID + ",", n += '<a href="javascript:;" id="cnode_' + t.websiteID + '" class="list-group-item no-border fnchannel" title="' + t.websiteName + '" onclick="ChangeChannel(this,\'' + escape(t.websiteName) + "','" + t.websiteID + "')\"><i data-id='" + t.websiteID + '\' class="fa fa-star-o text-muted fa-lg" onclick="fnTool.toggleColCollection(this,event)"></i>&nbsp;' + t.websiteName + "</a>" })), $("#fntree").html(n), "" != i && News.createNew().CheckCollectNews(i, 2), t.resolve() }), t.promise()
      }, 
      fnKitTool.renderHelper = function() {}, 
      fnKitTool.bottomOut = function() {}, 
      fnKitTool.handleTime = function(e) {
        function t(e) {
          return e = String(e), 1 == e.length && (e = "0" + e), e
        }
        if (e.indexOf("/Date") >= 0) {
          var n = /\/Date\((-?\d+|-?\d+\+\d+)\)\//g,
            i = n.exec(e),
            a = parseInt(i[1]),
            o = new Date(a);
          return o.getFullYear() + "-" + t(o.getMonth() + 1) + "-" + t(o.getDate()) + " " + t(o.getHours()) + ":" + t(o.getMinutes())
        }
        return e
      }, 
      fnKitTool.MediaHotFocusChart_old = function(e, t) { $("#" + e).highcharts({ chart: { type: "spline", height: 150, width: 500, marginTop: 15 }, title: { text: "媒体关注72小时跟踪", align: "left", x: 40, y: 2, style: { color: "#3E576F", fontSize: "13px" } }, xAxis: { title: {}, type: "datetime", dateTimeLabelFormats: { day: "%b%e" }, tickPixelInterval: 200 }, yAxis: { title: { text: "" }, min: 1, tickPixelInterval: 10 }, tooltip: { crosshairs: !0, pointFormat: '<br><br><span style="color:#8AC1E8">{point.mediaName}</span><br><b>{point.y} <span style="color:red">热度</span></b>' }, plotOptions: { spline: { minSize: 1, maxSize: 3, marker: { enabled: !1 }, pointInterval: 18e5, pointStart: Date.UTC(t.firstYear, t.firstMonth - 1, t.firstDay, t.firstHour, t.firstMinute, 0) }, spline: { minSize: 1, maxSize: 3, marker: { enabled: !1 }, pointInterval: 18e5, pointStart: Date.UTC(t.firstYear, t.firstMonth - 1, t.firstDay, t.firstHour, t.firstMinute, 0) } }, series: [{ color: "#990033", name: "预测", data: t.hourData3 }, { color: "#A3E2FE", name: "总量", data: t.hourData2 }, { color: "#E79C25", name: "增量" }], legend: { enable: !0, align: "right", verticalAlign: "top", x: -15, y: -15, floating: !0, borderWidth: 0, itemStyle: { fontWeight: "normal" } }, credits: { enabled: !1 } }) }, 
      fnKitTool.MediaHotFocusChart = function(e, t) {
        $("#" + e).highcharts({
          chart: { type: "spline", height: 220, width: 500, marginTop: 15 },
          title: { text: "热度趋势图", align: "left", x: 30, y: 1, style: { color: "#3E576F", fontSize: "13px" } },
          xAxis: { title: {}, type: "datetime", dateTimeLabelFormats: { day: "%b%e" }, tickPixelInterval: 100 },
          yAxis: { title: { text: "" }, min: 1, tickPixelInterval: 30 },
          tooltip: { crosshairs: !0, pointFormat: '<br><br><span style="color:#8AC1E8">{point.mediaName}</span><br><b><span style="color:red">{point.y}</span></b>' },
          plotOptions: {
            spline: { minSize: 1, maxSize: 3, marker: { enabled: !1 } },
            series: {
              cursor: "pointer",
              events: {
                click: function(e) {
                  if (e.stopPropagation(), fnTool.modal || (fnTool.modal = $.fnModel({ $dom: $("#fn-s-detailModal"), width: "420", hideFun: function() {} }), $("#fn-s-detailModal").bind("click", function(e) {
                      var t = e || window.event;
                      fnTool.stopPropagation(t)
                    })), 
                    e.point.articleId) {
                    var t = $("#fn-s-frame");
                    t.attr("src", ""), t.contents().find("body").html("<div style='text-align:center; margin-top: 10px;' class='fn-s-indexLoad'><img src='/images/ajax-loader.gif'/></div>"), fnTool.modal.init(e, e), t.attr("src", "/WebPageEmbed.html?ArticleSequenceId=" + e.point.articleId + "&keypar=")
                  }
                }
              }
            }
          },
          series: [{ color: "#E79C25", name: "热度", data: t.data2 }],
          legend: { enable: !0, align: "right", verticalAlign: "top", x: -15, y: -15, floating: !0, borderWidth: 0, itemStyle: { fontWeight: "normal" } },
          credits: { enabled: !1 }
        })
      }, 
      fnKitTool.LHChart = function(e, t, n, i) {
        $("#" + e).highcharts({
          chart: { renderTo: "container", type: "column", borderColor: "#FDF7EC", borderWidth: 2, borderRadius: 5, marginLeft: 40 },
          title: { text: "" },
          xAxis: { min: 0, max: 12, type: "category", labels: { rotation: -45, style: { fontSize: "13px", fontFamily: "微软雅黑, Verdana, sans-serif" } } },
          yAxis: { min: 0, title: { text: "" }, labels: { enabled: !1 } },
          plotLines: { color: "rgba(0,0,0,0)" },
          legend: { layout: "vertical", align: "right", verticalAlign: "top", x: 0, y: -5, floating: !0, backgroundColor: Highcharts.theme && Highcharts.theme.legendBackgroundColor || "#FFFFFF" },
          tooltip: {
            formatter: function() {
              return '<span style="font-size:14px;">' + this.key + "</span><br/>" + i + "：" + this.y
            }
          },
          scrollbar: { enabled: !0 },
          plotOptions: { column: { pointWidth: 45, pointPadding: .5, groupPadding: .5 } },
          series: [{ name: n, data: t, color: "#F88928", dataLabels: { enabled: !0, color: "#777777", align: "center", format: "{point.y}", y: 9, style: { fontWeight: "normal" } }, events: { click: function(e) { "人物排行" == n && window.open("lianghui/leaderinfo.htm?name=" + e.point.name), "热词排行" == n && (ShowMediaList(e), ShowTopNewsList(e)) } } }],
          credits: { enabled: !1 }
        })
      }, 
      fnKitTool.LHChart2 = function(e, t, n, i) {
        $("#" + e).highcharts({
          chart: { renderTo: "container", type: "column", borderColor: "#FDF7EC", borderWidth: 2, borderRadius: 5, marginLeft: 40 },
          title: { text: "" },
          xAxis: { min: 0, max: 12, type: "category", crosshair: !0, labels: { rotation: -45, style: { fontSize: "13px", fontFamily: "微软雅黑, Verdana, sans-serif" } } },
          yAxis: [{ min: 0, title: { text: "" }, labels: { enabled: !1 } }, { title: { text: "" }, labels: { enabled: !1 } }],
          plotLines: { color: "rgba(0,0,0,0)" },
          legend: { layout: "vertical", align: "right", verticalAlign: "top", x: 0, y: -5, floating: !0, backgroundColor: Highcharts.theme && Highcharts.theme.legendBackgroundColor || "#FFFFFF" },
          tooltip: {
            formatter: function() {
              return "#9CCC3C" == this.color ? '<span style="font-size:14px;">' + this.key + "</span><br/>频率：" + this.y : '<span style="font-size:14px;">' + this.key + "</span><br/>" + i + "：" + this.y
            }
          },
          scrollbar: { enabled: !0 },
          plotOptions: { column: { pointWidth: 45, pointPadding: .5, groupPadding: .5 } },
          series: [{ name: n, data: t.wordList[0].hotList, color: "#F88928", dataLabels: { enabled: !0, color: "#777777", align: "center", format: "{point.y}", y: 10, style: { fontWeight: "normal" } } }, { name: " 政府报告中出现的频率", data: t.wordList[1].freqList, type: "spline", yAxis: 1, color: "#9CCC3C", dataLabels: { enabled: !0, color: "#000000", align: "center", format: "{point.y}", y: 10, style: { fontWeight: "normal" } } }],
          credits: { enabled: !1 }
        })
      }, 
      fnKitTool.ShowMediaList = function(e) {
        var t = "";
        $.getJSON("../api/dataJson?whatDo=GetOriginalMediaRank&hotword=" + encodeURIComponent(e.point.name), function(n) {
          n.length > 0 && (t = '<header class="panel-heading"><button type="button" class="close" onclick="$(\'#mediaList\').hide()"><i class="fa fa-times text-danger"></i></button>『' + e.point.name + '』 媒体top20</header><div class="list-group">', $("#mediaList").show());
          for (var i = 0; i < n.length; i++) t += '<a href="#" class="list-group-item"><span class="badge bg-success">' + n[i].count + "</span>" + n[i].medianame + "</a>";
          t += "</div>", $("#mediaList").html(t)
        })
      }, 
      fnKitTool.ShowTopNewsList = function(e) {
        var t = "";
        $.getJSON("../api/dataJson?whatDo=GetHotwordArticleRank&hotword=" + encodeURIComponent(e.point.name), function(n) {
          n.rows.length > 0 && (t = '<header class="panel-heading"><button type="button" class="close" onclick="$(\'#topNewsList\').hide()"><i class="fa fa-times text-danger"></i></button>『' + e.point.name + '』 原创文章top20</header><div class="list-group">', $("#topNewsList").show());
          for (var i = 0; i < n.rows.length; i++) t += '<a href="#" class="list-group-item" onclick="GetNews(this,\'' + escape(n.rows[i].Title) + "','" + n.rows[i].articlesequenceid + '\')"><span class="badge bg-success">' + n.rows[i].videosize + "</span>" + n.rows[i].title + "</a>";
          t += "</div>", $("#topNewsList").html(t)
        })
      }, 
      fnKitTool.NewsEmotionPie = function(e, t) {
        $("#" + e).highcharts({
          chart: { plotBackgroundColor: null, plotBorderWidth: null, plotShadow: !1, height: 78, width: 78, backgroundColor: "transparent", type: "pie" },
          title: { text: "" },
          tooltip: {
            pointFormat: "{point.percentage:.1f}%",
            hideDelay: 0,
            positioner: function() {
              return { x: 0, y: 20 }
            }
          },
          plotOptions: { pie: { allowPointSelect: !0, cursor: "pointer", dataLabels: { enabled: !1, connectorColor: "silver" }, showInLegend: !1 } },
          series: [{ name: "", data: [{ name: "正面", y: parseInt(t.result.replace("%", "")) }, { name: "负面", y: parseInt(100 - t.result.replace("%", "")) }] }],
          credits: { enabled: !1 }
        })
      }, 
      fnKitTool.WechatLineChart = function(e, t) {
        var n, i, a, o, s, r, l = JSON.parse(t.attr("data-read")),
          c = JSON.parse(t.attr("data-like")),
          d = l[0],
          f = [],
          h = [],
          p = l.length;
        for (var u in d) {
          r = u;
          break
        }
        for (var m = 0; m < p; m++) {
          for (var g in l[m]) f.push({ x: parseInt(g), y: l[m][g] });
          for (var w in c[m]) h.push({ x: parseInt(w), y: c[m][w] })
        }
        r = new Date(1e3 * r), a = r.getFullYear(), i = r.getMonth() + 1, n = r.getDate(), o = r.getHours(), s = r.getMinutes(), 
        e.highcharts({ chart: { type: "spline", height: 150, width: 500, marginTop: 15 }, title: { text: "微信阅读量跟踪", align: "left", x: 40, y: 2, style: { color: "#3E576F", fontSize: "13px" } }, xAxis: { title: {}, type: "datetime", dateTimeLabelFormats: { day: "%b%e" }, tickPixelInterval: 200 }, yAxis: { title: { text: "" }, min: 1, tickPixelInterval: 10 }, tooltip: { crosshairs: !0, pointFormat: '<br><br><span style="color:#8AC1E8">{point.mediaName}</span><br><b>{point.y} <span style="color:red">次</span></b>' }, plotOptions: { spline: { minSize: 1, maxSize: 3, marker: { enabled: !1 }, pointInterval: 108e5, pointStart: Date.UTC(a, i - 1, n, o, s, 0) }, spline: { minSize: 1, maxSize: 3, marker: { enabled: !1 }, pointInterval: 108e5, pointStart: Date.UTC(a, i - 1, n, o, s, 0) } }, series: [{ color: "#A3E2FE", name: "阅读量", data: f }, { color: "#E79C25", name: "点赞量", data: h }], legend: { enable: !0, align: "right", verticalAlign: "top", x: -15, y: -15, floating: !0, borderWidth: 0, itemStyle: { fontWeight: "normal" } }, credits: { enabled: !1 } })
      }, 
      fnKitTool.isNumber = function(e) {
        return null != e && "" != e && !isNaN(e)
      }, 
      fnKitTool.limitNumber = function(e, t, n) {
        var i = e.val();
        e.val(i.replace(/[^\d]/g, "")), i = e.val(), "number" == typeof Number(i) || 0 === Number(i) ? Number(i) > n ? e.val(n) : Number(i) < t && e.val(t) : e.val(t)
      }, 
      fnKitTool.eventLoop = function(e, t, n) {
        if (fnKitTool.isNumber(n) && 0 != n) setTimeout(function() { setInterval(e, t) }, n);
        else var i = setInterval(e, t);
        return i
      }, 
      fnKitTool.doubleNum = function(e) {
        return e += "", 1 == e.length ? "0" + e : e
      }, 
      fnKitTool
    }
  },
  fnTool = FNKitTool.createNew(),
  News = {
    createNew: function() {
      var e = { sim: !0, source: !0 },
        t = { preTitle: "引题", title: "标题", subTitle: "副标题", markInfo: "概要", url: "文章url", images: "图片", source: "数据源", updateTime: "原文发布时间", createTime: "入库时间", isCollected: !1, isOriginal: !1, articleType: "news" };
      return e.getArticleModel = function() {
        return t
      }, 
      e.checkType = function() {}, 
      e.showTypeIcon = function() {}, 
      e.showTimeAbbr = function(e) {
        var t = /-\d+/,
          n = "";
        t.test(e) ? n = t.exec(e)[0] : (e = fnTool.handleTime(e), n = t.exec(e)[0]), e = e.replace(t, "-" + (Math.abs(parseInt(n)) - 1));
        var i = e.replace(/-/g, ",").replace(/:/g, ",").replace(/\s+/g, ",").replace(/\./g, ",");
        e = new Function(" return new Date(" + i + ");")();
        var a = new Date,
          o = a.getTime() - e.getTime(),
          s = { tag: -1 };
        if (o < -3e5) return s.tag = -1, s.time = "未来", s;
        var r = o / 864e5,
          l = o % 864e5,
          c = Math.floor(l / 36e5),
          d = l % 36e5,
          f = Math.floor(d / 6e4),
          h = d % 6e4,
          p = Math.round(h / 1e3),
          u = a.getTime() - (3600 * a.getHours() * 1e3 + 60 * a.getMinutes() * 1e3 + 1e3 * a.getSeconds() + a.getMilliseconds()),
          m = u - e.getTime();
        if (m > 0)
          if (r = Math.ceil(m / 864e5), s.tag = 2, 1 == r) s.tag = 1, s.time = "昨天";
          else switch (r) {
            case 2:
              s.time = "前天";
              break;
            case 3:
              s.time = "三天前";
              break;
            case 4:
              s.time = "四天前";
              break;
            case 5:
              s.time = "五天前";
              break;
            case 6:
              s.time = "六天前";
              break;
            case 7:
              s.time = "七天前";
              break;
            default:
              s.time = "历史"
          } else a.getDate() == e.getDate() && (s.tag = 0, s.time = c > 0 ? c + "小时前" : f > 0 ? f + "分钟前" : f > 0 ? p + "秒前" : "刚刚");
        return s
      }, 
      e.articleType = function(e, t) {
        var n = "";
        return e.indexOf("weixin") >= 0 ? n = "weixin" : e.indexOf("website") >= 0 ? n = "website" : e.indexOf("bbs") >= 0 ? n = "bbs" : e.indexOf("app") >= 0 ? n = "app" : 0 == e.indexOf("news") ? n = "news" : e.indexOf("weibo") >= 0 && (n = "weibo"), "" === n && (n = t > 18000101e11 && t < 25e17 ? "news" : t >= 25e17 && t < 35e17 || 17 == t.toString().length ? "weibo" : t >= 35e17 && t < 44e17 ? "weixin" : "website"), n
      }, 
      e.washData = function(e, t) {
        var n = this,
          i = [],
          a = [];
        for (l in e.sameIDRows) a.push(e.sameIDRows[l][0]);
        for (var o = null, s = e.rows.length, r = [], l = 0; l < s; l++)
          if (o = e.rows[l], 
              o.gettimeabbr = n.showTimeAbbr(e.rows[l].updatetime), 
              o.timeago = o.gettimeabbr.time, 
              o.ut = fnTool.handleTime(o.updatetime), 
              o.ct = fnTool.handleTime(o.createtime), 
              a.indexOf(o.same_id) > -1 && (o.ishassame = 1), 
              r.indexOf(o.articlesequenceid) > -1 && (o.collected = 1), 
              this.dataStorage.indexOf(e.rows[l].same_id) < 0) {
            var c = this.articleType(o.articletype, o.articlesequenceid);
            o.at = c, this.dataStorage.push(o.same_id), this.onlyone.push(o.same_id), i.push(o)
          } else {
            for (var d = 0; d < i.length; d++) o.same_id == i[d].same_id && (i[d].ishassame = 1);
            $.each(this.onlyone, function(t, i) { i == e.rows[l].same_id && (n.onlyone.splice(t, 1), 0 == $(".sameid_" + i).find(".fa-files-o").length && $(".sameid_" + i).find(".fa-star-o").before("<i class='fa fa-lg fa-files-o m-r-small' title='查看相似文章' data-sameid='" + i + "></i>")) })
          }
        if ("score" == t) return i;
        for (var f = { today: [], yesterday: [], history: [] }, h = 0; h < i.length; h++) {
          var p = i[h].gettimeabbr;
          if (null !== p) switch (p.tag) {
            case 0:
              i[h].date = "nt", f.today.push(i[h]);
              break;
            case 1:
              i[h].date = "ny", f.yesterday.push(i[h]);
              break;
            case 2:
              i[h].date = "nh", f.history.push(i[h]);
              break;
            default:
              console.log("日期转换出现错误")
          }
        }
        return f
      }, 
      e.GetQueryString = function(e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
          n = window.location.search.substr(1).match(t);
        return null != n ? n[2] : ""
      }, 
      e.picUrl = function(e, t, n, i, a) {
        if ("" != e) {
          var o = new Array;
          o = e.split("%D%W");
          var s = new Array;
          return s = o[0].split(","), o[0].indexOf("http://") >= 0 ? (s[0].toLowerCase().indexOf(".jpg") > -1 || s[0].toLowerCase().indexOf(".gif") > -1 || s[0].toLowerCase().indexOf(".png") > -1 || s[0].toLowerCase().indexOf(".jpeg") > -1 || s[0].toLowerCase().indexOf(".bmp"), s[0].replace("#", "%23")) : fnService.GetOssUrl(fnService.GetOssKey(3, n, i, a, s[0].replace("#", "%23")))
        }
      }, 
      e.checkOriginal = function(e) {
        return !(e >= 0 && e < 10) && (e >= 10 && e < 50 || void 0)
      }, 
      e.showNewsSource = function() {}, 
      e.CheckCollectNews = function(e, t, n, i) {
        return t = "string" == typeof t ? t.replace(/\s+/g, "") : t, i && i.abort(), fnTool.ajaxSimply("post", { whatDo: "checkCollectionList", collectionIdList: t, articleId: e }, "/api/collection", function(e) {
          fnTool.handleViewData(e, function(e) {
            if (e) {
              var i = e[0].replace(/,{2,}/g, ",").replace(/^,|,$/g, "") + ",",
                a = 0;
              if ("1,6" == t) {
                var o = n.parent().parent().parent(),
                  s = null;
                if (s = n.hasClass("fn-similarNewsII") ? o.siblings(".fn-simailarNews").children(".fn-normalNews").children() : o.siblings(".fn-originalNews").children(".fn-normalNews").children(), s.length)
                  for (var r, l = s.length, c = 0; c < l; c++) r = s.eq(c), i.indexOf(r.attr("data-id") + ",") >= 0 && r.find(".fn-collection").children("i").removeClass("fa-star-o").addClass("fa-star text-warning")
              } else if (2 == t)
                if ("chatbo" == n)
                  for (a = 0; a < $(".fn-z-chatbocollection>i").length; a++) i.indexOf($(".fn-z-chatbocollection>i").eq(a).attr("data-id")) > -1 && ($(".fn-z-chatbocollection>i").eq(a).removeClass("fa-star-o"), $(".fn-z-chatbocollection>i").eq(a).addClass("fa-star text-warning"));
                else
                  for (a = 0; a < $(".fnchannel").length; a++) i.indexOf($(".fnchannel").eq(a).attr("id").substring(6, $(".fnchannel").eq(a).attr("id").length - 1)) > -1 && ($(".fnchannel").eq(a).children("i").removeClass("fa-star-o"), $(".fnchannel").eq(a).children("i").addClass("fa-star text-warning"));
              else if (3 == t)
                for (a = 0; a < $("#accordion").children("div").length; a++) i.indexOf($("#accordion").children("div").eq(a).attr("id").substring(6, $("#accordion").children("div").eq(a).attr("id").length)) > -1 && ($("#accordion").children("div").eq(a).find("i").removeClass("fa-star-o"), $("#accordion").children("div").eq(a).find("i").addClass("fa-star text-warning"))
            }
          })
        })
      }, 
      e.findHotNews = function(e, t) {
        var n = $(e).attr("data-key");
        fnTool.stopPropagation(t), $("#divDiscover .modal-body > iframe").attr("src", "/discover.aspx?key=" + encodeURIComponent(n)), $("#divDiscover .modal-title").html("发现新闻：" + n), $("#divDiscover .modal-body > iframe").css("height", "650px"), $("#divDiscover").modal("show")
      }, 
      e.openFound = function(t) {
        this.foundUrl = { start: 0, limit: 10, keyword: "" }, this.dataStorage = [], this.onlyone = [], this.datalength = 0, this.findHottemp = '{#list}<li class="fn-z-findNewslist clearfix {date} sameid_{same_id}" data-id="{articlesequenceid}" data-updatetime="{updatetime}"><div class="fn-z-findNewsBlock"><h4 class="fn-z-findNewstitle">{#if (viocesize >= 1 && viocesize <= 9)}<span class="label label-success fn-inlineBlock">原创</span>{#elseif (viocesize>=10 && viocesize<=50)}<span class="label label-default fn-inlineBlock">转载</span>{#/if}<span>&nbsp;{title}</span></h4><div class="fn-z-findNewscontent"><p class="fn-z-findNewssource text-info" title="事件来源">{#if (at == "website")}<i class="fa fa-newspaper-o fn-text-default">&nbsp;</i>{#elseif (at == "news")}<i class="iconfont icon-newspaper text-muted">&nbsp;</i>{#elseif (at == "weibo")}<i class="fa fa-weibo fa-lg text-danger">&nbsp;</i>{#elseif (at == "weixin")}<i class="wechat icon-weixin text-success">&nbsp;</i>{#elseif (at == "app")}<i class="fa fa-mobile fa-lg text-danger fn-z-fontsize-fif">&nbsp;</i>{#elseif (at == "bbs")}<i class="fa fa-group text-info">&nbsp;</i>{#/if}<span>{papername}</span></p><div class="fn-s-taOut fn-relative"><span class="fn-z-findNewstimeago">{timeago}</span><div class="fn-z-findNewstime fn-miss"><p class="fn-newsPubTime"><i class="fa fa-clock-o"></i>原文发布：{ut}</p><p class="fn-newsFnTime"><i class="fa fa-clock-o"></i>入库：{ct}</p></div></div><span class="pull-right m-r fn-z-findNewscollection">{#if ( ishassame== 1)}<i title="查看相似文章" class="fa fa-files-o fa-lg fn-z-findNewssimilar" data-sameid={same_id}></i>{#/if}{#if(sameid3)}<i class="fa fa-copyright fa-lg m-r-small" title="追溯原创文章" data-sameid3={sameid3}></i>{#/if}{#if (collected != 1)}{#else}<i class="fa fa-star text-warning fa-lg fn-collection" data-id="{articlesequenceid}"></i>{#/if}</span></div><div class="fn-z-totalsimilar"><p class="fn-originalNum">已匹配<span class="text-danger"></span>篇相似文章</p><ul class="fn-z-findNewssimilarul"></ul></div><div class="fn-z-totalorigin"><p class="fn-originalNum"></p><ul class="fn-z-findNewsoriginul"></ul></div></div></li>{#/list}', this.innerTemp = this.findHottemp.replace('{#if ( ishassame== 1)}<i title="查看相似文章" class="fa fa-files-o fa-lg fn-z-findNewssimilar" data-sameid={same_id}></i>{#/if}{#if(sameid3)}<i class="fa fa-copyright fa-lg m-r-small" title="追溯原创文章" data-sameid3={sameid3}></i>{#/if}', "").replace('<div class="fn-z-totalsimilar"><p class="fn-originalNum">已匹配<span class="text-danger"></span>篇相似文章</p><ul class="fn-z-findNewssimilarul"></ul></div><div class="fn-z-totalorigin"><p class="fn-originalNum"></p><ul class="fn-z-findNewsoriginul"></ul></div>', ""), this.foundAjax = !1, this.lock = !0;
        var n = this,
          i = document.getElementById("myframe");
        $(document).on("click", "body", function() { $(".fn-z-findarrow").hide(), $(".fn-z-findNews").hide(), t.find(".fn-found.text-warning").removeClass("text-warning") }), i.onload = i.onreadystatechange = function() { this.readyState && "complete" != this.readyState || $("#myframe").contents().on("click", "body", function() { $(".fn-z-findarrow").hide(), $(".fn-z-findNews").hide(), $(".fn-z-searchareacontent").hide(), $(".fn-z-searchprovince").show(), $(".fn-z-searchcity").show(), t.find(".fn-found.text-warning").removeClass("text-warning") }) }, $(".fn-z-findNews,.fn-z-findarrow").on("click", function(e) { fnTool.stopPropagation(e) }), t.delegate(".fn-found", "click", function(e) { t.find(".fn-found").removeClass("text-warning"), $(this).addClass("text-warning"), n.showFound($(this), e) }), $("#fn-z-findNewsul").on("click", "li", function(e) { fnTool.stopPropagation(e), $("#fn-z-findscrolltop:visible").hide(), $(".fn-z-findNewslist").removeClass("findNewslistactive"), $(this).addClass("findNewslistactive"), n.findNewsDetails($(this).attr("data-id"), $(this).attr("data-updatetime")) }), $("#fn-z-findNewsul").on("click", ".fn-collection", function(e) { fnTool.stopPropagation(e), n.toggleCollect($(this), event) }), $("#fn-z-findNewsul").on("click", ".fn-s-foundList", function(e) { n.showToggle(this) }), $("#fn-z-findNewsdetails").on("click", ".fn-z-closeDetail", function() { $("#fn-z-findNewsdetails").hide(), $(".fn-z-hasNews").show(), $("#fn-z-findNewsul").scrollTop() > 30 ? $("#fn-z-findscrolltop").show() : $("#fn-z-findscrolltop").hide() }), $("#fn-z-findNewsul").on("click", ".fa-files-o", function(t) {
          t.stopPropagation();
          var n = $(this).parent("span").parent("div").siblings(".fn-z-totalsimilar"),
            i = $(this).parent("span").parent("div").siblings(".fn-z-totalsimilar").children("ul"),
            a = $(this).attr("data-sameid"),
            o = $(this);
          o.next(".fa-copyright.text-warning").removeClass("text-warning"), $(".fn-z-totalorigin").hide(), "none" == n.css("display") ? (o.addClass("text-warning"), "" == i.html() && e.findSameNews(a, this), $(".fn-z-totalsimilar").hide(), n.show()) : (o.removeClass("text-warning"), $(".fn-z-totalsimilar").hide())
        }), $("#fn-z-findNewsul").on("click", ".fa-copyright", function(t) {
          t.stopPropagation(), $(".fn-z-totalsimilar").hide();
          var n = $(this).parent("span").parent("div").siblings(".fn-z-totalorigin"),
            i = $(this).parent("span").parent("div").siblings(".fn-z-totalorigin").children("ul"),
            a = $(this).attr("data-sameid3"),
            o = $(this);
          o.prev(".fn-z-findNewssimilar.text-warning").removeClass("text-warning"), "none" == n.css("display") ? (o.addClass("text-warning"), "" == i.html() && e.findOriginNews(a, this), $(".fn-z-totalorigin").hide(), n.show()) : (o.removeClass("text-warning"), $(".fn-z-totalorigin").hide())
        }), $(".fn-z-findNews").on("click", "#fn-z-findscrolltop", function() {
          $("#fn-z-findNewsul:visible").animate({ scrollTop: 0 }, 500), $(".fn-z-findnewsdetails-contentmain:visible").animate({ scrollTop: 0 }, 500)
        }), $("#fn-z-findNewsul").scroll(function() { $(this).get(0).scrollTop > 30 ? $("#fn-z-findscrolltop").show() : $("#fn-z-findscrolltop").hide() }), $(".fn-z-findnewsdetails-contentmain").scroll(function() { $(this).get(0).scrollTop > 30 ? $("#fn-z-findscrolltop").show() : $("#fn-z-findscrolltop").hide() }), $("#fn-z-findNewsul").on("mouseenter mouseleave", ".fn-z-findNewstimeago", function(e) { "mouseenter" == e.type ? $(this).siblings(".fn-z-findNewstime").show() : $(this).siblings(".fn-z-findNewstime").hide() })
      }, 
      e.resetParam = function() { this.foundUrl = { start: 0, limit: 10, keyword: "" }, this.dataStorage = [], this.onlyone = [], this.datalength = 0 }, 
      e.showFound = function(e, t) {
        $(".fn-newslistOuter").height() > $("#newslist").height() - 42 ? $(".fn-z-findNews").css("left", "315px") : $(".fn-z-findNews").css("left", "323px"), fnTool.stopPropagation(t);
        var n = $(".fn-z-findNews");
        n.is(":hidden") && n.show(), this.resetParam(), $(".fn-z-findNewstop span").children("a").html(""), $(".fn-z-findNewstop span").children(".badge").html("…"), $(".fn-z-findNewstop>span:eq(1)").children("b").html("0"), $(".fn-z-findarrow").hide(), $("#fn-z-findNewsdetails").hide(), $(".fn-z-noexternalnews").remove(), 
        e.hasClass("fa") ? e.siblings(".fn-z-findarrow").length ? e.siblings(".fn-z-findarrow").show() : e.after('<div style="display: block" class="fn-z-findarrow"></div>') : e.children(".fn-z-findarrow").length ? e.children(".fn-z-findarrow").show() : e.append('<div style="display: block" class="fn-z-findarrow"></div>'), $(".fn-z-findNews").show(), $(".fn-z-hasNews").show(), this.loadData(e)
      }, 
      e.loadData = function(e) {
        function t(e) {
          var t = e + "";
          return 1 == t.length ? "0" + t : t
        }
        var n = $.Deferred(),
          i = $("#fn-z-findNewsul"),
          a = $(".fn-z-findNewstop"),
          o = "<li class='text-center img m-t-mini'><img src='/images/ajax-loader.gif'></li>",
          s = this.foundUrl.start,
          r = e.attr("data-key").replace(/,|，|&nbsp;/g, " ").split(" "),
          l = "",
          c = "",
          d = 0;
        limit = this.foundUrl.limit, self = this;
        for (var f = 0; f < r.length; f++) " " != r[f] && "&nbsp;" != r[f] && (0 == d ? (l += r[f], c += r[f]) : (l += " " + r[f], d < 3 && (c += " " + r[f])), d++);
        var h = this.foundUrl.start + this.foundUrl.limit;
        0 == s ? (i.html(o), this.dataStorage = [], this.onlyone = []) : i.append(o), this.foundUrl.keyword = l, $(".fn-z-clickmore").remove(), this.foundAjax && (this.foundAjax.abort(), self.lock = !0);
        var p = new Date,
          u = p.getMonth() + 1 + "",
          m = p.getDate() + "",
          m = p.getFullYear() + "-" + t(u) + "-" + t(p.getDate()),
          g = p.addDaysFormat(-90),
          w = g.getFullYear() + "-" + t(p.getMonth() + 1) + "-" + t(g.getDate());
        if (self.lock) {
          self.lock = !1;
          var v = {keyword: l};
          this.foundAjax = fnTool.ajaxSimply("get", v, "/api/index.php?c=search&type=4", function(e) {
            fnTool.handleViewData(e, function(e) {
              0 == e.rows.length && $("#fn-z-findNewsul").append("<div class='fn-z-noexternalnews'>目前没有发现文章</div>");
              var t = self.washData(e, "score"),
                  n = t.length;
                // n = "_score desc" == v.orderby ? t.length 
                //                                 : t.today.length + t.yesterday.length + t.history.length;
              $(".fn-z-alertprompt").children("span").eq(0).html(e.rows.length), 
              $(".fn-z-alertprompt").children("span").eq(1).html(e.rows.length - n), 
              $(".fn-z-alertprompt").show(), 
              setTimeout(function() { 
                $(".fn-z-alertprompt").hide() 
              }, 2e3), 
              self.datalength = e.total, 
              i.children(".img").remove(), 
              a.children("span:eq(0)").length > 0 ? a.children("span:eq(0)").addClass("fn-s-spanOne").children("a").html(c + "&nbsp;&nbsp;") 
                                                  : a.find(".fn-s-spanOne").children("a").html(c + "&nbsp;&nbsp;").attr("title", c + "&nbsp;&nbsp;"), 
                                                    a.children("span:eq(1)").length > 0 ? a.children("span:eq(1)").addClass("fn-s-spanTwo").children("b").html(n) 
                                                                                        : a.find(".fn-s-spanTwo").children("b").html(n), 
                                                                                          a.children("span").wrapAll("<div class='fn-s-fountTitle'></div>"), 
                                                                                          a.children(".fn-s-fountTitle").children(".fn-s-foundMore").length > 0 ? a.children(".fn-s-fountTitle").children(".fn-s-foundMore").attr("href", "/advancedsearch.aspx#/result?normalSearchKey= " + l + "&anyKey=&exceptKey=&searchRange=1&searchResultType=0&startDate=" + w + "&endDate=" + m + "&mediaNameList=&original=2&emotion=-1&haveImage=-1&searchType=&cityInfo=") 
                                                                                                                                                                : a.children(".fn-s-fountTitle").append(""), 
                                                                                                                                                                  "_score desc" == "_score desc" ? self.getDataBymodal(self.findHottemp, t) 
                                                                                                                                                                                              : (t.today.length && (self.getDataBymodal(self.findHottemp, t.today), 0 == $("#fn-z-findtodaynews").length && $("#fn-z-findNewsul").prepend('<div id="fn-z-findtodaynews" class="list-group-item bg-light no-border fn-s-foundList"><i class="fa fa-caret-down"></i>&nbsp;今天</div>')), t.yesterday.length && (0 == $("#fn-z-findyestodaynews").length && $("#fn-z-findNewsul").append('<div id="fn-z-findyestodaynews"  class="list-group-item bg-light no-border fn-s-foundList"><i class="fa fa-caret-down"></i>&nbsp;昨天</div>'), self.getDataBymodal(self.findHottemp, t.yesterday)), t.history.length && (0 == $("#fn-z-findyeshistorynews").length && $("#fn-z-findNewsul").append('<div id="fn-z-findyeshistorynews"  class="list-group-item bg-light no-border fn-s-foundList"><i class="fa fa-caret-down"></i>&nbsp;历史</div>'), self.getDataBymodal(self.findHottemp, t.history)), parseInt($("#fn-z-findNewsul").get(0).scrollHeight) == parseInt($("#fn-z-findNewsul").get(0).clientHeight) && e.total > h && $("#fn-z-findNewsul").append('<div class="list-group-item bg-lighter text-center fn-z-clickmore">点击更多</div>')), 
                                                                                                                                                                                                self.lock = !0
            }), n.resolve()
          })
        }
        return n.promise()
      }, 
      e.getDataBymodal = function(e, t) { $.multiMode({ template: e, data: t, $con: $("#fn-z-findNewsul") }).append(t) }, 
      e.showToggle = function(e) {
        var t = $(e),
          n = $.trim(t.text()),
          i = "nt";
        switch (n) {
          case "今天":
            i = "nt";
            break;
          case "昨天":
            i = "ny";
            break;
          case "历史":
            i = "nh"
        }
        t.children("i").hasClass("fa-caret-right") ? (t.children("i").removeClass("fa-caret-right").addClass("fa-caret-down"), $("." + i).show()) : (t.children("i").removeClass("fa-caret-down").addClass("fa-caret-right"), $("." + i).hide())
      }, 
      e.clearFindNewsModal = function() { $(".fn-z-leadTitle").html(""), $(".fn-z-mtitle").html(""), $(".fn-z-subTitle").html(""), $(".fn-z-channel").html(""), $(".fn-z-reported").html(""), $(".fn-z-reporttime").html(""), $(".fn-z-content").html(""), $(".fn-z-loadPie").hide() }, 
      e.findNewsDetails = function(e, t) {
        var n = this,
          i = $(".fn-z-hasNews"),
          a = $("#fn-z-findNewsdetails"),
          o = $(".fn-z-findnewsdetails-contentmain"),
          s = $(".fn-z-leadTitle"),
          r = $(".fn-z-mtitle"),
          l = $(".fn-z-subTitle"),
          c = $(".fn-z-channel"),
          d = $(".fn-z-reported"),
          f = $(".fn-z-reporttime"),
          h = $(".fn-z-content"),
          p = $(".fn-z-findlink"),
          u = $(".fn-z-findoriginal"),
          m = $("#fn-z-findNewsdetails").find("#bdshare");
        // i.hide(), a.show(), n.clearFindNewsModal(), 0 == o.children(".fn-newsLoading").length && o.append("<div class='fn-newsLoading text-muted text-center m-t'>正在获取新闻详情，请稍后...</div>"), fnTool.SysMonitor(), $.getJSON("/api/dataJson?whatDo=SearchNormalForArticleID&key=" + e + "&articleTime=" + fnTool.handleTime(t), function(e) {
        i.hide(), a.show(), n.clearFindNewsModal(), 0 == o.children(".fn-newsLoading").length && o.append("<div class='fn-newsLoading text-muted text-center m-t'>正在获取新闻详情，请稍后...</div>"), fnTool.SysMonitor(), $.getJSON("/api/index.php?c=content&id=" + e + "&articleTime=" + fnTool.handleTime(t), function(e) {
          o.children(".fn-newsLoading").remove();
          var t = e.rows[0];
          m.attr("data", "{url: '" + window.location.origin + "/page/innerview.aspx?ArticleSequenceId=" + t.articlesequenceid + "',text: '" + t.title + "'}"), s.html(t.leadTitle ? t.leadTitle : ""), r.html(t.title).attr("title", t.title), l.html(t.subtitle ? t.subtitle : ""), c.html(t.papername ? t.papername : ""), t.viocesize >= 1 && t.viocesize <= 9 ? d.html("") : d.html("转载自：" + t.page), f.html(t.updatetime.substring(0, 19)), h.html(t.contenttxt), p.attr("href", "/page/innerview.aspx?ArticleSequenceId=" + t.articlesequenceid), u.attr("href", t.url), o.scrollTop(0), n.loadPie(t.videosize), $(".fn-z-loadPie").show()
        })
      }, 
      e.loadPie = function(e) {
        var t = $("#fn-z-loadPie");
        t.html(""), t.highcharts({
          chart: { plotBackgroundColor: null, plotBorderWidth: null, plotShadow: !1, height: 70, width: 70, backgroundColor: "transparent", type: "pie" },
          title: { text: "" },
          tooltip: {
            headerFormat: "",
            pointFormat: "<span>{point.name}：<b>{point.y}%</b></span> ",
            useHTML: !0,
            hideDelay: 0,
            positioner: function() {
              return { x: 0, y: 20 }
            },
            style: { padding: 0, "line-height": 1, left: 0 }
          },
          plotOptions: { pie: { allowPointSelect: !0, cursor: "pointer", dataLabels: { enabled: !1, connectorColor: "silver" }, showInLegend: !1 } },
          series: [{ name: "", data: [{ name: "正面", y: e / 100 }, { name: "负面", y: (1e4 - e) / 100 }] }],
          credits: { enabled: !1 }
        })
      }, 
      e.findSameNews = function(e, t) {
        var n = this,
          i = $(t),
          a = $(t).parent("span").parent("div").siblings(".fn-z-totalsimilar").children("ul"),
          o = $(t).parent("span").parent("div").siblings(".fn-z-totalsimilar").children("p"),
          s = i.parentsUntil(".fn-z-findNewslist").parent().eq(0),
          r = s.attr("data-id");
        a.prepend("<div class='text-center img'><img src='/images/ajax-loader.gif' /></div>"), o.html("");
        var l = s.find(".fn-newsPubTime").text().substring(5).split(" ")[0];
        fnTool.ajaxSimply("get", {}, "/api/ArticleList?whatDo=getArticeListBySameId&sameType=2&startDate=" + l + "&sameid=" + e + "&articleid=" + r, function(e) {
          fnTool.handleViewData(e, function(e) {
            a.children(".img").remove(), o.append("已匹配<span  class='text-danger'>" + e.total + "</span>篇相似文章");
            for (var t = e.IsCollect, i = null, s = e.rows.length, r = 0; r < s; r++) {
              i = e.rows[r];
              var l = n.showTimeAbbr(fnTool.handleTime(i.updatetime));
              i.timeago = l.time, t.indexOf(i.articlesequenceid) > 0 && (i.collected = 1)
            }
            $.multiMode({ template: n.innerTemp, data: e.rows, $con: a }).init()
          })
        })
      }, 
      e.findOriginNews = function(e, t) {
        var n = this,
          i = $(t),
          a = $(t).parent("span").parent("div").siblings(".fn-z-totalorigin").children("ul"),
          o = $(t).parent("span").parent("div").siblings(".fn-z-totalorigin").children("p");
        a.prepend("<div class='text-center img'><img src='/images/ajax-loader.gif' /></div>");
        var s = i.parentsUntil(".fn-z-findNewslist").parent().eq(0),
          r = s.attr("data-id");
        o.html("");
        var l = s.find(".fn-newsPubTime").text().substring(5).split(" ")[0];
        fnTool.ajaxSimply("get", {}, "/api/ArticleList?whatDo=getArticeListBySameId&sameType=2&startDate=" + l + "&sameid=" + e + "&articleid=" + r + "&original=1", function(e) {
          fnTool.handleViewData(e, function(e) {
            var t = [];
            a.children(".img").remove();
            for (var i = e.rows, s = i.length, r = (e.IsCollect, null), l = 0; l < s; l++) {
              r = i[l];
              var c = n.showTimeAbbr(fnTool.handleTime(r.updatetime));
              r.timeago = c.time, r.viocesize >= 1 && r.viocesize <= 9 && t.push(r)
            }
            if (0 != t.length) {
              o.append("已匹配<span class='text-danger'>" + t.length + "</span>篇原创文章");
              $.multiMode({ template: n.innerTemp, data: t, $con: a }).init()
            } else o.append("<span class='text-danger'>0</span>篇原创文章")
          })
        })
      }, 
      e.scroll = function(e, t) {
        var n = "FF" === fnTool.checkBrowser(),
          i = "mousewheel";
        n && (i = "DOMMouseScroll");
        var a = $(e).get(0),
          o = this;
        fnTool.bindEvent(a, i, function(e) {
          var t = e || window.event;
          if (t.wheelDelta && t.wheelDelta < 0 || t.detail && t.detail > 0) var n = parseInt(a.scrollTop),
            i = parseInt(a.scrollHeight),
            s = parseInt(a.clientHeight);
          o.foundUrl.start = o.foundUrl.start + o.foundUrl.limit, n + s >= i - 30 && o.lock && i >= s && o.foundUrl.start < o.datalength && o.loadData($(".fn-found.text-warning"))
        })
      }, 
      e.toggleCollect = function(e, t) {
        fnTool.stopPropagation(t);
        var n = $(e).attr("data-id");
        fnTool.toggleCollect(e, n, 1)
      }, 
      e.checkCollection = function() {}, 
      e.getNews = function(e, t, n, i, a) {
        var o = $(e),
          s = $("#" + t);
        switch (n.find(".fn-list-group-item").removeClass("active"), n.find(".fn-normalNews li").removeClass("active"), o.addClass("active"), n.find(".fa-asterisk").removeClass("text-warning"), i) {
          case "media":
          case "hot":
          case "normal":
            var r = fnTool.getUrlVal("ArticleSequenceId", s),
              l = o.attr("data-id");
            (r != l || s.data("loaded")) && (s.contents().find("body").html("<p style='text-align: center; margin-top: 50px;'><img src='/images/ajax-loader.gif'/></p>"), s.attr("src", "/api/index.php?c=content&id=" + l));
            break;
          case "push":
            var c = s.attr("src"),
              d = o.attr("data-url");
            c != d && s.attr("src", d)
        }
      }, 
      e.showStatisticsLine = function(e, t) {
        function n(e, t, n) { $.getJSON(o + "?whatDo=getMediaFocusChartData&articleid=" + t + "&updatetime=" + n, function(n) { null != n.obj ? (fnTool.MediaHotFocusChart(e, n.obj), $("#hm_loading_" + t).hide(), $("#hm_flag_" + t).show().addClass("text-warning"), $(".fn-x-chart").show()) : $("#hm_loading").hide() }) }

        function i() { $(".fn-x-chart").remove(), $(".MediaFocusStatisticsLine .fa-line-chart.text-warning").removeClass("text-warning") }

        function a() { l.contents().on("click", "body", function() { i() }) }
        var o = "/api/hotfind";
        fnTool.stopPropagation(t);
        var s = $(e).attr("data-id"),
          r = $(e).attr("data-ut");
        t = t || window.event;
        var l = (function(e, t, i, a) { $(".fn-x-chart").remove(), $("#hm_flag_" + i).hide(), $("#hm_loading_" + i).show(), chartHtml = '<div class="fn-x-chart" style=" top: ' + (fnTool.getDomPos(e).top - 120) + 'px;"><button type="button" style="padding:10px 10px 0 0" class="close" onclick="$(\'.fn-x-chart\').remove();$(\'.fa-line-chart\').removeClass(\'text-warning\')"><i class="fa fa-times text-danger"></i></button><div id="chartContainer"></div><div class="fn-tag"></div></div>', $(e).after(chartHtml), n("chartContainer", i, a) }(e, t, s, r), $("#myframe"));
        if ($(document).on("click", "body", function() { i() }), l.length > 0) {
          var c = l.get(0);
          a(), c.onload = c.onreadystatechange = function() { this.readyState && "complete" != this.readyState || a() }
        }
        $("#newslist").unbind("scroll").bind("scroll", function() { i() })
      }, e
    }
  },
  FNCommonService = {
    cityModel: { firstCityList: null, secondCityList: null, currentProvinceData: null, currentCityData: null },
    createNew: function() {
      var e = {};
      return e.GetOssKey = function(e, t, n, i, a) {
        var o = "error";
        switch (e) {
          case 1:
            o = "jpg";
            break;
          case 2:
            o = "pdf";
            break;
          case 3:
            o = "img"
        }
        return (o + "/" + n.toString().substr(0, 4) + "/" + n + "/" + t + "/" + i + "/" + a).toLowerCase()
      }, 
      e.GetOssUrl = function(e) {
        return "http://fwimage.cnfanews.com/" + e
      }, 
      e.threeColumnsSplitter = function(e, t) {
        var n = document.getElementById(e),
          i = new Drag(n, { handle: n, limit: !1, direction: "h" }),
          a = 0,
          o = 0;
        i.onStart = function() { $("#" + e).css("background-color", "#233445"), $("#mask").show(), a = $("#" + e).offset().left }, i.onMove = function() {}, i.onStop = function() { o = this.drag.offsetLeft, "splitter1" == e ? ($("aside").eq(0).width($("aside").eq(0).width() + o - a), $("#" + t).offset({ left: this.drag.offsetLeft + $("aside").eq(1).width() })) : $("aside").eq(1).width($("aside").eq(1).width() + o - a), $("#mask").hide(), $("#" + e).css("background-color", "transparent") }, i.lockY = !i.lockY
      }, 
      e.twoColumnsSplitter = function(e) {
        var t = document.getElementById(e),
          n = new Drag(t, { handle: t, limit: !1 }),
          i = 0,
          a = 0;
        n.onStart = function() { $("#" + e).css("background-color", "#233445"), $("#mask").show(), i = $("#" + e).offset().left }, n.onMove = function() {}, n.onStop = function() { a = this.drag.offsetLeft, $("aside").eq(0).width($("aside").eq(0).width() + a - i), $("#mask").hide(), $("#" + e).css("background-color", "transparent") }, n.lockY = !n.lockY
      }, 
      e.blockSplitter = function(e) {
        var t = document.getElementById(e),
          n = new Drag(t, { handle: t, limit: !1, direction: "h" }),
          i = 0,
          a = 0;
        n.onStart = function() { $("#" + e).css("background-color", "#233445"), $("#mask").show(), i = $("#" + e).offset().left }, n.onMove = function() {}, n.onStop = function() { a = this.drag.offsetLeft, $(".fn-Searchkey-Stats").eq(0).width($(".fn-Searchkey-Stats").eq(0).width() + a - i + 1), $("#mask").hide(), $("#" + e).css("background-color", "transparent") }, n.lockY = !n.lockY
      }, 
      e.locateCurrentCityByIP = function() {
        var e = $.Deferred();
        return $.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js", function() { myProvince = remote_ip_info.province, myCity = remote_ip_info.city, 
          e.resolve() }), 
        e.promise()
      }, 
      e.getProvinceList = function() {
        var e = $.Deferred();
        return $.getJSON("/js/city.js", function(t) { FNCommonService.cityModel.firstCityList = t.city, 
          e.resolve() }), 
        e.promise()
      }, 
      e.getCityList = function() {
        var t = $.Deferred();
        return $.getJSON("/js/citySecond.js", function(n) { FNCommonService.cityModel.secondCityList = n.city, 
          e.searchCityDataByName(myCity, FNCommonService.cityModel.secondCityList), t.resolve() }), t.promise()
      }, 
      e.searchProvinceDataByName = function(e, t) {
        return FNCommonService.cityModel.currentProvinceData = jsonsql.query("select * from json where (name=='" + e + "')", t), FNCommonService.cityModel.currentProvinceData
      }, 
      e.searchCitysDataByProvinceId = function(e, t) {
        return FNCommonService.cityModel.currentCityData = jsonsql.query("select * from json where (provinces=='" + e + "')", t), FNCommonService.cityModel.currentCityData
      }, 
      e.searchCityDataByName = function(e, t) {
        return FNCommonService.cityModel.currentCityData = jsonsql.query("select * from json where (name=='" + e + "')", t), FNCommonService.cityModel.currentCityData
      }, 
      e.getProvinceData = function() {
        return FNCommonService.cityModel.firstCityList
      }, 
      e.getCityData = function() {
        return FNCommonService.cityModel.secondCityList
      }, 
      e.getCurrentProvinceData = function() {
        return FNCommonService.cityModel.currentProvinceData
      }, 
      e.getCurrentCityData = function() {
        return FNCommonService.cityModel.currentCityData
      }, 
      e.keyTag = function(e, t, n) {
        var i = '<span style="';
        for (item in n) i += item + ":" + n[item] + ";";
        return i += ">" + t + "</span>", 
      e.replace(new RegExp(t, "gm"), i)
      }, e
    }
  },
  Guide = {
    cerateNew: function() {
      var e, t = {},
        n = [],
        i = 0;
      return t.init = function(e) { n = e }, t.next = function() { i++, e = n[i] }, t.forward = function() { i--, e = n[i] }, t.show = function(e, t, n) { $("body") }, t
    }
  },
  Selection = {
    selectedItems: { id: "", searchKey: "", searchAnyKey: "", searchExceptKey: "", recentDays: "0", startDate: "1900-01-01", endDate: "1900-01-01", newsType: "all", original: "all", newsSource: "0", cityID: "0", showPic: "true", media: "", emotions: "all", searchType: "", viewMode: "normal", markInfo: "1", orderBy: "updatetime desc" },
    urlDatas: {},
    initDatas: function(e) { Selection.urlDatas = e },
    getFiled: function(e) {
      return Selection.urlDatas[e]
    },
    delFileds: function(e) {
      for (var t = 0; t < e.length; t++) delete Selection.urlDatas[e[t]]
    },
    setDatas: function(e) {
      for (var t in e) Selection.urlDatas[t] = e[t]
    },
    getDatas: function() {
      var e = Selection.urlDatas,
        t = "?";
      for (var n in e) t += "keyWords" === n ? "&" + n + "=" + encodeURIComponent(e[n]) : "&" + n + "=" + e[n];
      return t = t.replace(/&/, "")
    },
    createNew: function(e) {
      var t = {};
      return t.urlDatas = e, t.getSelectedItems = function() {
        return Selection.selectedItems
      }, t.changeSomeFiled = function(e) {
        for (var t in e) this.urlDatas[t] = e[t]
      }, t.initSelectedItems = function() {}, t.changeChannelID = function(e) { Selection.selectedItems.id = e }, t.changeSearchKey = function(e) { Selection.selectedItems.searchKey = e }, t.changeSearchAnyKey = function(e) { Selection.selectedItems.searchAnyKey = e }, t.changeSearchExceptKey = function(e) { Selection.selectedItems.searchExceptKey = e }, t.changeRecentDays = function(e) { Selection.selectedItems.recentDays = e }, t.changeNewsDate = function(e, t) { Selection.selectedItems.startDate = e, Selection.selectedItems.endDate = t }, t.changeNewsType = function(e) { Selection.selectedItems.newsType = e }, t.changeNewsOriginal = function(e) { Selection.selectedItems.original = e }, t.changeNewsSource = function(e) { Selection.selectedItems.newsSource = e }, t.changeCityID = function(e) { Selection.selectedItems.cityID = e }, t.changePicShow = function(e) { Selection.selectedItems.showPic = e }, t.changeMedia = function(e) { Selection.selectedItems.media = e }, t.changeMotions = function(e) { Selection.selectedItems.emotions = e }, t.changeSearchType = function(e) { Selection.selectedItems.searchType = e }, t.changeViewMode = function(e) { Selection.selectedItems.viewMode = e }, t.changeMarkInfo = function(e) { Selection.selectedItems.markInfo = e }, t.changeOrderBy = function(e) { Selection.selectedItems.orderBy = e }, t
    }
  },
  Channel = {
    channelModel: { id: "0", name: "", recentDays: "0", startDate: "1900-01-01", endDate: "1900-01-01" },
    createNew: function() {
      var e = {};
      return e.getModel = function() {
        return Channel.channelModel
      }, 
      e.getInfoById = function(e) {
        var t = $.Deferred(),
          n = "/api/dataJson?whatDo=GetChannelById&id=" + e;
        return $.getJSON(n, function(e) { null != e && (Channel.channelModel.id = e[0].channelID, Channel.channelModel.name = e[0].channelName, Channel.channelModel.recentDays = e[0].int4, Channel.channelModel.startDate = e[0].beginDate, Channel.channelModel.endDate = e[0].endDate), t.resolve() }), t.promise()
      }, e
    }
  };
