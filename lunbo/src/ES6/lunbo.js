/**
 * 使用方法：new Lunbo({config}).initFocus()
 * 							再initFocus()前可以自定义createArrows和createDots()方法
 *params: {contetnElem: docElem, autoplay: true, delay: 3, hasDot: true, hsaArrow: true}
 * return: div.focus-dots-content包含N个a.dot,需要自定义样式
 *					div.focus-arrows-content包含a.focus-arrow-pre和a.focus-arrow-next，需要自定义样式
 *					
 * 兼容IE 8
 */
class Lunbo {
	constructor(config) {

		// 默认配置
		let defaultConfig = {
			autoplay: true,
			pause: true,
			contin: 1,
			delay: 3,
			hasDot: false,
			hasArrow: false
		};
		// 合并
		config = {
			...defaultConfig,
			...config
		}

		let {
			contentElem,
			autoplay,
			pause,
			contin,
			delay,
			hasDot,
			hasArrow
		} = config;

		// 兼容jQuery对象
		if(contentElem.length !== undefined) {
			this.contentElem = contentElem[0];
		} else {
			this.contentElem = contentElem;
		}

		this.autoplay = autoplay;
		this.pause = pause;
		this.contin = contin;
		this.delay = delay;
		this.hasDot = hasDot;
		this.hasArrow = hasArrow;

		// 一些全局变量
		this.imgListElem = contentElem.querySelector('ul');
		this.len = contentElem.querySelectorAll('img').length;
		this.imgWidth = contentElem.clientWidth;
		this._n = 0;
		this.movingFlag = null;
		// 将init函数提出，之后手动调用，再调用前可以自定义createArrows和createDots函数
		// this.initFocus();
	}

	turn(n) {
		// 目的地
		let pos = this._n + n;
		if( pos < 0) {
			pos = pos + this.len;
		} else if( pos >= this.len) {
			pos = pos - this.len;
		}
		// 如果正在滚动，停止滚动，并重新开始
		if(this.movingFlag) {
			clearInterval(this.movingFlag);
			this.movingFlag = null;
		}

		// 滚动到该目的地
		// 坐标轴 左为正，又为负
		let nextLeft = - pos * this.imgWidth;
		let currLeft = parseFloat(this.imgListElem.style.left);
		// 每次移动距离
		let move = (nextLeft - currLeft) / (this.contin * 1000 ) * 13;
		
		// 滚动动画，13ms一次
		this.movingFlag = setInterval(() => {
			// 每次要移动到的位置
			let targetLeft = parseFloat(this.imgListElem.style.left) + move;
			
			// 向前移动 
			if(move < 0) {
				// 移动到的位置在目标位置的右边
				if(targetLeft <= nextLeft) {
					targetLeft = nextLeft;
					clearInterval(this.movingFlag);
					this.movingFlag = null;
				}
			} else if(move > 0) {
				// 移动到的位置再目标位置的左边
				if(targetLeft >= nextLeft) {
					targetLeft = nextLeft;
					clearInterval(this.movingFlag);
					this.movingFlag = null;
				}
			}		
			
			this.imgListElem.style.left = targetLeft + 'px';
		}, 13);
		
		this._n = pos;

		// 修改dot active
		if(this.hasDot){
			let dotElems = this.contentElem.parentNode.querySelectorAll('.dot');
			dotElems.forEach(dotElem => {
				dotElem.classList.remove('active');
			});
			dotElems[pos].classList.add('active');
		} 
	}

	// Dots和Arrows需要自定义样式
	createDots() {
		// 最好使用createElement创建的Dom节点像页面添加元素
		let dotContentElem = document.createElement('div');
		dotContentElem.setAttribute('class', 'focus-dots-content');

		let str = '<a href="javascript:void(0);" class="dot active"></a>';
		for(let i = 1; i < this.len; i++) {
			str += '<a href="javascript:void(0);" class="dot"></a>';
		}
		dotContentElem.innerHTML = str;
		// 添加到父节点，可以避免被容器元素overflow隐藏
		this.contentElem.parentNode.appendChild(dotContentElem);
	}

	createArrows() {
		let arrowContentElem = document.createElement('div');
		arrowContentElem.setAttribute('class', 'focus-arrows-content');

		let str = '<a href="javascript:void(0);" class="focus-arrow-pre"></a>' +
				'<a href="javascript:void(0);" class="focus-arrow-next"></a>';
		arrowContentElem.innerHTML = str;
		this.contentElem.parentNode.appendChild(arrowContentElem);
	}

	addEvent() {
		if(this.hasArrow) {
			let arrowContentElem = this.contentElem.parentNode.querySelector('.focus-arrows-content');
			arrowContentElem.onclick = event => {
				let target = event.target || event.srcElement;
				if(target.className.indexOf('focus-arrow-pre') !== -1) {
					this.turn(-1);
				}
				if(target.className.indexOf('focus-arrow-next') !== -1) {
					this.turn(1);
				}
			};
		}

		if(this.hasDot) {
			let dotContentElem = this.contentElem.parentNode.querySelector('.focus-dots-content');

			let dotElems = dotContentElem.querySelectorAll('.dot');
			dotContentElem.onclick = event => {
				let target = event.target || event.srcElement;
				if(target.className.indexOf('dot') !== -1) {
					// 阻止点击多次
					if(target.className.indexOf('active') !== -1) {
						return;
					}
					let targetIndex = 0;
					dotElems.forEach( (item, index) => {
						if(item === target) {
							targetIndex = index;
						}
					});
					this.turn(targetIndex - this._n);
				}
			};
		}
	}

	init() {
		// 样式初始化
		this.contentElem.style.position = 'relative';
		this.contentElem.style.fontSize = 0;
		this.contentElem.style.overflow = 'hidden';
		this.imgListElem.style.padding = 0;
		this.imgListElem.style.width = this.len * this.imgWidth + 'px';
		this.imgListElem.style.position = 'absolute';
		this.imgListElem.style.left = 0;

		this.hasArrow && this.createArrows();
		this.hasDot && this.createDots();

		this.addEvent();

		let imgElems = this.contentElem.querySelectorAll('li');
		let imgHeight = this.contentElem.clientHeight;
		imgElems.forEach(item => {
			item.style.listStyle = 'none';
			item.style.display = 'inline-block';
			item.style.width = this.imgWidth + 'px';
			item.style.height = imgHeight + 'px';
			item.querySelector('img').style.width = '100%';
			item.querySelector('img').style.height = '100%';
		});
		// 自动播放
		if(this.autoplay) {
			this.autoplayFlag = setInterval(() => {
				this.turn(1);
			}, this.delay * 1000);
			// 鼠标暂停
			if(this.pause) {
				if(document.addEventListener) {
					this.contentElem.addEventListener('mouseenter', () => {
						clearInterval(this.autoplayFlag);
					});
					this.contentElem.addEventListener('mouseleave', () => {
						this.autoplayFlag = setInterval(() => {
							this.turn(1);
						}, this.delay * 1000);
					});
				} else if(document.attachEvent) {
					this.contentElem.attachEvent('onmouseenter', () => {
						clearInterval(this.autoplayFlag);
					});
					this.contentElem.attachEvent('onmouseleave', () => {
						this.autoplayFlag = setInterval(() => {
							this.turn(1);
						}, this.delay * 1000);
					})
				}
			}
		}
	}
}