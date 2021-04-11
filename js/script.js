const ratingItemList = document.querySelectorAll('.rating-item');
const ratingItemsArray = Array.prototype.slice.call(ratingItemList);

ratingItemsArray.forEach(item =>
	item.addEventListener('click', () =>
		item.parentNode.dataset.totalValue = item.dataset.itemValue
	)
);

//===tabs===//

$('.tab-bar.bar-1').click(function(){
	$('[class^=tab-bar]').removeClass('active');
	$(this).addClass('active');
});

$('.tab-bar.bar-2').click(function(){
	$('[class^=tab-bar]').removeClass('active');
	$(this).addClass('active');
});

$('.tab-bar.bar-3').click(function(){
	$('[class^=tab-bar]').removeClass('active');
	$(this).addClass('active');
});

//===burger===//

$('.navbar-burger-landing').click(function(){
	$('.navbar-burger-landing, .navbar').toggleClass('active');
});

$('.navbar-burger').click(function(){
	$('.navbar-burger, .navbar-ul').toggleClass('active');
	$(body).toggleClass('lock');
});

let wrapper = document.querySelector('.wrapper');

let animBtn = document.querySelector('.animation_in_baset');

function animation (btn){
	animBtn.classList.add('active');
	setTimeout(()=>{
		animBtn.classList.remove('active');
	},50);
}

//===slider===//
let pageS = document.querySelector('.page');

if (pageS) {
	let = pageSlider = new Swiper('.page',{
		wrapperClass: "page__wrapper",
		slideClass: "page__screen",
		direction: 'vertical',
		slidesPerView: 'auto',
		parallax: true,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
			pageUpDown: true,
		},
		mousewheel: {
			sensivity: 1,
		},
		speed: 800,
		watchOverflow: true,
		observer: true,
		observeParents: true,
		observeSlideChildren: true,
		
		pagination: {
			el: '.page__pagination',
			type: 'bullets',
			clickable: true,
			bulletClass: "page__bullet",
			bulletActiveClass: "page__bullet_active",
		},
		scrollbar: {
			el: '.page__scroll',
			dragClass: "page__drag-scroll",
			draggable: true
		},

		init: false,

		on: {
			init: function () {
				menuSlider();
				setScrollType();
				wrapper.classList.add('loaded');

			},

			slideChange: function() {
				menuRemove();
				menuLincks[pageSlider.realIndex].classList.add('-active');
			},
			resize: function () {
				setScrollType();
			}
		},
	});

	let menuLincks = document.querySelectorAll('.menu-linck');

	function menuSlider () {
		menuLincks[pageSlider.realIndex].classList.add('-active');
		if (menuLincks.length > 0) {
			for (let i = 0; i < menuLincks.length; i++) {
				const menuLinck = menuLincks[i];
				menuLinck.addEventListener("click", function(e) {
					pageSlider.slideTo(i, 800);
					menuLinck.classList.add('-active');
					e.preventDefault();
				});
			}
		}
	}

	function menuRemove() {
		let menuLinckActive = document.querySelector('.menu-linck.-active');

		if (menuLinckActive) {
			menuLinckActive.classList.remove('-active');
		}
	}

	function setScrollType () {

		if (wrapper.classList.contains('free')) {
			wrapper.classList.remove('free');
			pageSlider.params.freeMode = false;
			pageSlider.params.parallax = true;
		}

		for (let i = 0; i < pageSlider.slides.length; i++) {
			const pageSlide = pageSlider.slides[i];
			const pageSlideContent = pageSlide.querySelector('.screen-content');
			if (pageSlideContent) {
				const pageSlideContentHeight = pageSlideContent.offsetHeight;
				if (pageSlideContentHeight > window.innerHeight) {
					wrapper.classList.add('free');
					pageSlider.params.freeMode = true;
					pageSlider.params.parallax = false;
					break;
				}
			}
		}
	}

	pageSlider.init();
}

tabsSundry = document.querySelectorAll('.tab-bloock-2');
tabsSundryLincks = document.querySelectorAll('.tab_bar-sundry');

for (let i = 0; i < tabsSundryLincks.length; i++) {
	const tabSundryLinck = tabsSundryLincks[i];
	const tabSundry = tabsSundry[i];
	tabSundryLinck.addEventListener("click", function(e) {
		removeTabActive();
		tabSundry.classList.add('active');
		tabSundryLinck.classList.add('active');
	});
}

function removeTabActive() {
	const TabActive = document.querySelector('.tab-bloock-2.active');
	const TabActiveLinck = document.querySelector('.tab_bar-sundry.active');

	TabActive.classList.remove('active');
	TabActiveLinck.classList.remove('active');
}

//===================---//popup//---======================//

const popapLinkcs = document.querySelectorAll('.popup-linck');
const body = document.querySelector('body');
const lockPading = document.querySelector(".lock-pading");
const nav = document.querySelector('.navbar');
const fillBlocks = document.querySelectorAll('.fill-block');

isMobile = {

   Android: function() {
      return navigator.userAgent.match(/Android/i);
   },

   BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
   },
     iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  	},
     Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function() {
      return (
      	isMobile.Android() || 
      	isMobile.BlackBerry() || 
      	isMobile.iOS() || 
      	isMobile.Opera() || 
      	isMobile.Windows()
      );
   }
};

if (isMobile.any()) {
	document.body.classList.add('touch');
}else{
	document.body.classList.add('pc');
}

let unlock = true;

const timeout = 800;

if (popapLinkcs.length > 0) {
	for (let i = 0; i < popapLinkcs.length; i++) {
		const popapLinck = popapLinkcs[i];
		popapLinck.addEventListener("click", function(e) {
			const popapName = popapLinck.getAttribute('href').replace('#', '');
			const curentPopap = document.getElementById(popapName);
			popapOpen(curentPopap);
			console.log(curentPopap);
			e.preventDefault();
		});
	}
}

const popapCloseIcon = document.querySelectorAll('.cloce-popap');

if (popapCloseIcon.length > 0) {
	for (let i = 0; i < popapCloseIcon.length; i++) {
		const el =popapCloseIcon[i];
		el.addEventListener('click', function(e) {
			popapClose(el.closest('.popap'));
			e.preventDefault();
		});
	}
}

const plan = document.querySelector('.plan');

function popapOpen(curentPopap) {
	if (curentPopap && unlock) {
		const popapActive = document.querySelector('.popap.open');
		
		if (popapActive) {
			popapClose(popapActive, false);
		}else {
			bodyLock();
		}
		if (!isMobile.any()) {
			for (let i = 0; fillBlocks.length > i; i++) {
				const fillBlock = fillBlocks[i];
				fillBlock.classList.add('fill');
			}
		}
		curentPopap.classList.add('open');
		nav.classList.add('up-nav');
		curentPopap.addEventListener("click", function(e) {
			
			if (!e.target.closest('.popap-content')) {
				popapClose(e.target.closest('.popap'));
			}
		});
	}
}

function popapClose (popapActive, doUnlock = true) {
	if (unlock) {
		popapActive.classList.remove('open');
		nav.classList.remove('up-nav');
		
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

function bodyLock() {
	const lockPadingValue = window.innerWidth - document.querySelector('.wrapper-sundry').offsetWidth + 'px';
	console.log(lockPadingValue);
	if (lockPading) {
		for (let i = 0; i < lockPading.length; i++) {
			const el = lockPading[i];
			el.style.padingRight = lockPadingValue;
		}
	}
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function() {
		if (lockPading) {
			for (let i = 0; i < lockPading.length; i++) {
				const el = lockPading[i];
				el.style.padingRight = '0px';
			}
			if (!isMobile.any()) {
				for (let i = 0; fillBlocks.length > i; i++) {
					const fillBlock = fillBlocks[i];
					fillBlock.classList.remove('fill');
				}
			}
		}
		body.style.padingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popapActive = document.querySelector('.popap.open');
		popapClose(popapActive);
	}
});

//==================//===---sundry-sliders---===//=====================//

let sliderSundry_1 = new Swiper ('.slider-sundry-1',{
	navigation: {
   	nextEl: '.swiper-button-next',
   	prevEl: '.swiper-button-prev'
  },

  pagination: {
   	el: '.swiper-pagination',
   	clickable: true,

   	dynamicBullets: true,
   	renderBullet: function(index, className) {
   		return '<span class="' + className + '">'+ (index + 1) + '</span>';
   	}
  },

  grabCursor: true,

  	observer: true,
  	observerSlideChildren: true,
  	observerParents: true,

  	speed: 800,

  	autoHeight: true,
});


let sliderSundry_2 = new Swiper ('.slider-sundry-2',{
	navigation: {
   	nextEl: '.swiper-button-next',
   	prevEl: '.swiper-button-prev'
  },

  pagination: {
   	el: '.swiper-pagination',
   	type: 'fraction',
   	// clickable: true,
  },

  	grabCursor: true,

  	observer: true,
  	observerSlideChildren: true,
  	observerParents: true,

  	speed: 800,

  	autoHeight: true,

  	slidesPerView: 3,

  	effect: 'coverflow',

  	coverflowEffect:{
  		rotate: 20,
  		strech: 50,

  		slidesShadows: true,
  	},

  	centeredSlides: true,

  	scrollbar:{
  		el:'.swiper-scrollbar',
  		draggable: true,
  	},
});

