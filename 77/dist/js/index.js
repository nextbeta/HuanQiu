"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),Dialogue=function(){function e(t){var i=this;if(_classCallCheck(this,e),this.dialogue1=t.dialogue1,this.dialogue2=t.dialogue2,this.index=0,this.autoplay=t.autoplay||!0,this.spaceTime=t.spaceTime||1200,this.clickable=t.clickable||!0,this.autoplay&&(this.intervalId=setInterval(this["switch"].bind(this),this.spaceTime),setTimeout(function(){clearInterval(i.intervalId)},this.spaceTime*this.dialogue1.length+this.spaceTime*this.dialogue2.length+3e3)),this.clickable){var a=document.querySelector("#dialogue1").parentNode;a.onclick=function(){i.index<i.dialogue1.length+i.dialogue2.length&&i["switch"]()}}}return _createClass(e,[{key:"switch",value:function(){var e=document.querySelector("#dialogue1"),t=document.querySelector("#dialogue2"),i=document.querySelector(".you");if(!(this.index>this.dialogue1.length+this.dialogue2.length)){if(this.index==this.dialogue1.length+this.dialogue2.length)return 0!==document.querySelector("#dialogue1 span").innerHTML.length&&(document.querySelector("#dialogue1 span").innerHTML="",e.style.backgroundImage="url(dist/imgs/heart.png)",e.style.backgroundSize="45%",e.style.backgroundOrigin="border-box",i.classList.add("heart")),void this.index++;if(i.className.indexOf("heart")!==-1)return i.classList.remove("heart"),e.style.backgroundImage="url(dist/imgs/dialogue-1.png)",void(e.style.backgroundSize="contain");this.index%2===0?(0===this.index&&(e.style.backgroundImage="url(dist/imgs/dialogue-1.png)",e.style.backgroundRepeat="no-repeat",e.style.backgroundPosition="center",e.style.backgroundSize="contain",e.style.backgroundOrigin="border-box"),e.removeChild(document.querySelector("#dialogue1 span")),e.innerHTML="<span>"+this.dialogue1[this.index/2]+"</span>",2===this.index?e.style.padding="1rem 1rem":e.style.padding="1.3rem 1rem"):(1==this.index&&(t.style.backgroundImage="url(dist/imgs/dialogue-2.png)",t.style.backgroundRepeat="no-repeat",t.style.backgroundPosition="center",t.style.backgroundSize="contain",t.style.backgroundOrigin="border-box"),t.removeChild(document.querySelector("#dialogue2 span")),t.innerHTML="<span>"+this.dialogue2[(this.index-1)/2]+"</span>",5==this.index?t.style.padding=".9rem .5rem":t.style.padding="1.3rem 1rem"),this.index++}}},{key:"destory",value:function(){document.querySelector("#dialogue1 span").innerHTML="",document.querySelector("#dialogue2 span").innerHTML="",document.querySelector("#dialogue1").style.backgroundImage="",document.querySelector("#dialogue2").style.backgroundImage="",document.querySelector(".you").classList.remove("heart"),clearInterval(this.intervalId)}}]),e}();Array.prototype.forEach.call(document.querySelectorAll("label"),function(e){e.addEventListener("click",function(e){var t=e.target||e.srcElement;t.className.indexOf("checked")==-1&&(Array.prototype.forEach.call(t.parentNode.querySelectorAll("label"),function(e){e.classList.remove("checked")}),t.classList.add("checked"))})});var iMark=0;$("#musicBtn").on("touchstart",function(){0==iMark?($("#musicBtn").addClass("paused"),audio.pause(),iMark=1):($("#musicBtn").removeClass("paused"),audio.play(),iMark=0)}),document.body.addEventListener("click",function(e){e.preventDefault();var t=e.target||e.srcElement;if("pass"==t.className)return void mySwiper.slideNext();if(t.className.indexOf("choose")!==-1){var i=t.getAttribute("data");mySwiper.appendSlide(results[i-2]),mySwiper.slideTo(9,0,!0)}});