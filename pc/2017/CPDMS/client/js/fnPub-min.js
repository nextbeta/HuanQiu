function alertMsg(result, KIDStr, opName, msgName) {
  var msgJson = eval(result);
  if (!msgJson.Succeed) return void alert(msgJson.Msg);
  var ret = msgJson.Msg,
    total = KIDStr.split(",").length,
    oksl = parseInt(ret.split(",")[0]),
    delsl = parseInt(ret.split(",")[1]),
    havesl = total - oksl - delsl,
    errsl = total - oksl,
    msg = "";
  0 != oksl && (msg = oksl + " 篇报道" + opName + "成功！"), 0 != errsl && (msg += errsl + " 篇失败！原因："), 0 != havesl && (msg += havesl + " 篇报道已在您的" + msgName + "中！"), 0 != delsl && (msg += delsl + " 篇报道已被删除！"), 0 == oksl && 1 == total && (0 != delsl && (msg = "所选的报道已被删除！"), 0 != havesl && (msg = "所选的报道已在您的" + msgName + "中！")), oksl == -1 && delsl == -1 && (msg = "对不起，您还未开通此权限！"), alert(msg)
}

function GetOssKey(e, t, n, o, r) {
  var i = "error";
  switch (e) {
    case 1:
      i = "jpg";
      break;
    case 2:
      i = "pdf";
      break;
    case 3:
      i = "img"
  }
  var a = i + "/" + n.toString().substr(0, 4) + "/" + n + "/" + t + "/" + o + "/" + r;
  return a.toLowerCase()
}

function GetOssUrl(e) {
  return imageDomain + "/" + e
}

function GetDate(strDate) {
  var date = eval("new Date(" + strDate.replace(/\d+(?=-[^-]+$)/, function(e) {
    return parseInt(e, 10) - 1
  }).match(/\d+/g) + ")");
  return date
}

function TagKey(e, t) {
  if (0 == t.length) return e;
  for (var n = t.split(" "), o = 0; o < n.length; o++) "" != n[o] && (e = e.replaceAll(n[o], '<font style="color:red;background-color:#F4BD00;padding:2px;">' + n[o] + "</font>"));
  return e
}

function Browser() {
  return navigator.userAgent.indexOf("MSIE") > 0 ? "MSIE" : (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) ? "Firefox" : (isMozilla = navigator.userAgent.indexOf("Opera") > 0) ? "Opera" : (isFirefox = navigator.userAgent.indexOf("Chrome") > 0) ? "Chrome" : (isSafari = navigator.userAgent.indexOf("Safari") > 0) ? "Safari" : (isCamino = navigator.userAgent.indexOf("Camino") > 0) ? "Camino" : (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) ? "Gecko" : void 0
}

function StopEventBubble(e) {
  var t = Browser();
  "Firefox" == t ? e.cancelBubble = !0 : window.event ? window.event.cancelBubble = !0 : event.stopPropagation()
}

function ScrollTop(e, t) {
  $(e).scroll(function() {
    var t = $(e).scrollTop();
    t > 100 ? $("div[id=scrollTop]").fadeIn() : $("div[id=scrollTop]").fadeOut()
  }), $(t).click(function() { $(e).animate({ scrollTop: 0 }, 500) })
}

function CheckArticleTypeById(e) {
  var t = "";
  return t = e > 18000101e11 && e < 25e17 ? "news" : e >= 25e17 && e < 35e17 ? "weibo" : e >= 35e17 && e < 44e17 ? "weixin" : 17 == e.toString().length ? "weibo" : "website"
}

function ShowNewsOverly(e) {
  var t = "";
  encodeURIComponent($("#txtkeyWords").val());
  t = "/v2/WebPageEmbed.aspx?ArticleSequenceId=" + e + "&keypar=", $("#divCollection").css("height", document.documentElement.clientHeight + "px"), $("#divCollection .modal-body > iframe").css("height", document.documentElement.clientHeight - 150 + "px"), $("#divCollection .modal-body > iframe").attr("src", t + "&nocache" + Math.random()), $("#divCollection").modal("show"), $("#divCollection").on("shown.bs.modal", function(e) { document.getElementById("iframeCollection").contentWindow.document.getElementById("newscontent").style.height = document.documentElement.clientHeight - 165 + "px" })
}

function GetQueryString(e) {
  var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
    n = window.location.search.substr(1).match(t);
  return null != n ? n[2] : null
}

function windOpen(e, t, n) {
  var o = 80,
    r = 30,
    i = 0,
    a = 0;
  i = (window.screen.height - parseInt(n) - o) / 2, a = (window.screen.width - parseInt(t) - r) / 2, window.open(e, "", "scrollbars=yes,resizable=yes,width=" + t + ",height=" + n + ",top=" + i + ",left=" + a)
}

function QX(e) { $("#" + e).find('input[type="checkbox"]').each(function(e, t) { t.checked = !0 }) }

function FX(e) { $("#" + e).find('input[type="checkbox"]').each(function(e, t) { t.checked ? t.checked = !1 : t.checked = !0 }) }

function QBX(e) { $("#" + e).find('input[type="checkbox"]').each(function(e, t) { t.checked = !1 }) }

function getSelectValues(e) {
  var t = "";
  return $("#" + e).find('input[type="checkbox"]').each(function(e, n) { n.checked && ("" != t && (t += ","), t += n.value) }), t
}
ajaxAction = function(e, t, n) { ajaxObj = $.ajax({ async: !0, type: "POST", url: e, data: t, dataType: "json", success: n }) }, String.prototype.replaceAll = function(e, t, n) {
  return RegExp.prototype.isPrototypeOf(e) ? this.replace(e, t) : this.replace(new RegExp(e, n ? "gi" : "g"), t)
};
