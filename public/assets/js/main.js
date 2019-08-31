/* ================================================
----------------- Hustle Main.js ------------- */
(function ($) {
	"use strict";
	var Hustle = {
		initialised: false,
		mobile: false,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}
			// Hide scroll animations
			this.hideScrollAnimElem();

			// Call Hustle Functions
			this.checkMobile();
			this.fitvids();
			this.stickyHeader();
			this.sideMenu();
			this.sideMenuToggle();
			this.sidemenuScrollbar();
			this.productZoom();
			this.searchFormToggle();
			this.quantityInputs();
			this.checkoutOPtionToggle();
			this.scrollToTop();
			this.scrollTo();
			this.reviewScroll();
			this.toggleCatFilterWidget();
			this.accordion();
			this.tooltip();
			this.popover();
			//this.revapi();

			/* Call function if Owl Carousel plugin is included */
			if ( $.fn.owlCarousel ) {
				this.owlCarousels();
			}

			/* Grid for category pages */
			if ( $.fn.isotope ) {
				this.categoryGrid();
			}

			if (typeof noUiSlider === "object") {
				this.filterSlider();	
			}

			/* Call masonry - isotope filder*/
			if ( $.fn.isotope ) {
				this.portfolio();
				this.portfolioFilter();
			}

			// Scroll Animations
			this.scrollAnim();

			// Count
			this.countTo();

		},
		checkMobile: function () {
			/* Mobile Detect*/
			if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
				this.mobile = true;
			} else {
				this.mobile = false;
			}
		},
		fitvids: function() {
			if ( $.fn.fitVids ) {
				$('body').fitVids();
			}
		},
		stickyHeader: function () {
			// Sticky header - calls if sticky-header class is added to the header
			if ( $('.sticky-header').length ) {
				var sticky = new Waypoint.Sticky({
					element: $('.sticky-header')[0],
					stuckClass: 'fixed',
					offset: -400
				});
			}
		},
		sideMenu: function () {
			if ($.fn.metisMenu) {
				$('.metismenu').metisMenu();
			}
		},
		sideMenuToggle: function () {
			// Toggle Sidemenu (Dashboard pages)
			$('.sidemenu-btn, .sidemenu-overlay').on('click', function (e) {
				$('body').toggleClass('toggle-sidemenu');
				$(this).toggleClass('open');
				e.preventDefault();
			});
		},
		sidemenuScrollbar: function () {
			// Custom scrollbar for sidemenu
			if ($.fn.perfectScrollbar) {
				$('.sidemenu-wrapper').perfectScrollbar();
			}
		},
		searchFormToggle: function () {
			// Toggle Search form for mobile
			$('.search-form-toggle').on('click', function (e) {
				$('.search-form-container').find('form').toggleClass('open');

				e.preventDefault();
			});
		},
		owlCarousels: function () {
			// Call each carousel with the class of owl-data-carousel 
			// Get the settings and init owl carousel
	        $.each($('.owl-data-carousel'), function(index) {
		    	var settings= {
						loop:false,
						margin: 30,
						navText: [],
						nav: false,
						dots:  false,
						lazyLoad: true,
						items: 1,
						autoHeight: false,
						responsive:{
							0: {
								items:1
							},
							480: {
								items:2
							},
							768: {
								items:3
							},
							992: {
								items:4
							}
						},
						rtl: ( $('html').attr('dir') === "rtl" ) ? true : false
		    		},
			    	owlsettings,
			    	owlResponsive;

				owlsettings = $(this).data('owl-settings'),
				owlResponsive = $(this).data('owl-responsive');

				// If it is not object don't use new settings - data-owl-settings
				if (typeof owlsettings === "object") {
					settings = $.extend(true, {}, settings, owlsettings);
				}

				// If it is not object don't use responsive setting
				if (typeof owlResponsive === "object") {
					settings = $.extend(true, {}, settings, {
						responsive: owlResponsive
					});
				}

				// Clear if items:1 is set and there is no data-owl-responsive 
				if (typeof owlResponsive === 'undefined' && owlsettings.items <= 2) {
					settings.responsive = {};
				}

				$(this).owlCarousel(settings);
		    });
		},
		countTo: function () {
			// CountTo plugin used count animations for homepages
			if ( $.fn.countTo ) {
				if ($.fn.waypoint) {
					$('.count').waypoint( function () {
						$(this.element).countTo();
					}, {
						offset: '90%',
						triggerOnce: true 
					});
				} else {
					$('.count').countTo();
				}	
			} else { 
				// fallback if count plugin doesn't included
				// Get the data-to value and add it to element
				$('.count').each(function () {
					var $this = $(this),
						countValue = $this.data('to');
						$this.text(countValue);
				});
			}
		},
		toggleCatFilterWidget: function () {
			// Toggle Widgets for sidebar shop
			var widgetCat = $('.widget-shop-category'),
				widgetFilter = $('.widget-shop-filter');

			$('.btn-category').on('click', function (e) {
				if ( !widgetCat.hasClass('active') ) {
					widgetFilter.removeClass('active');
					widgetCat.addClass('active');
				}
				e.preventDefault();
			});

			$('.btn-filter').on('click', function (e) {
				if ( !widgetFilter.hasClass('active')) {
					widgetCat.removeClass('active');
					widgetFilter.addClass('active');
				}
				e.preventDefault();
			});
		},
		accordion: function () {
			// Toggle "open" Class for parent elem 
			// example: category accordion on category page
			$('.accordion').on('shown.bs.collapse', function(item) {
				var parent = $(item.target).closest('li');

				if ( !parent.hasClass('open') ) {
					parent.addClass('open');
				}
			}).on('hidden.bs.collapse', function (item) {
				var parent = $(item.target).closest('li');

				if ( parent.hasClass('open') ) {
					parent.removeClass('open');
				}
			});
		},
		tooltip: function () {
			// Bootstrap Tooltip
			if ( $.fn.tooltip ) {
				$('[data-toggle="tooltip"]').tooltip();
			}
		},
		popover: function () {
			// Bootstrap Popover
			if ( $.fn.popover ) {
				$('[data-toggle="popover"]').popover({
					trigger: 'focus'
				});
			}
		},
		scrollBtnAppear: function () {
	        if ( $(window).scrollTop() >= 400 ) {
	            $('#scroll-top').addClass('fixed');
	        } else {
	            $('#scroll-top').removeClass('fixed');
	        }
		},
		scrollToTop: function () {
			$('#scroll-top').on('click', function (e) {
		        $('html, body').animate({
			            'scrollTop': 0
		        }, 1200);
				e.preventDefault();
			});
		},
		scrollTo: function() {
			// add .scrollto class 
			$('.scrollto').on('click', function (e) {
				var targetID = $(this).attr('href'),
					target = $(targetID);

				if (target.length) {
					// minus 90px for sticky header and a little spacing
					var targetPos = target.offset().top - 90;

					$('html, body').animate({
				            'scrollTop': targetPos
			        }, 1000);

					e.preventDefault();

				}
			});
		},
		reviewScroll: function() {
			// Scroll to review tab on product page
			$('.ratings-link').on('click', function (e) {
				var target = $('.product-details-tab');
				if (target.length) {
					// minus 90px for sticky header and a little spacing
					var targetPos = target.offset().top - 90;

					$('html, body').animate({
				            'scrollTop': targetPos
			        }, 800);

					$('.product-details-tab a[href="#reviews"]').tab('show');

					e.preventDefault();

				}
			});
		},
		quantityInputs: function() {
			// Quantity input - cart - product pages
			if ($.fn.TouchSpin) {
				// Cart Page
				$('.cart-product-quantity').TouchSpin({
					verticalbuttons: true,
					verticalupclass: 'fa fa-angle-up',
					verticaldownclass: 'fa fa-angle-down',
					initval: 1
				});

				// Product Page
				$('.single-product-quantity').TouchSpin({
					verticalbuttons: true,
					verticalupclass: 'glyphicon glyphicon-plus',
					verticaldownclass: 'glyphicon glyphicon-minus',
					initval: 1
				});
			}
		},
		checkoutOPtionToggle: function() {
			// Toggle Checkout - Payment options
			$('input[name="checkout-option"], input[name="payment-option"]').on('change', function () {
				var $this = $(this),
					parent = $this.closest('.tab-pane'),
					target = $this.data('target'),
					targetEl = $(target);

				if (targetEl.length) {
					parent.find('.target-area').removeClass('active');
					targetEl.addClass('active');
				}
			});
		},
		categoryGrid: function() {
			var container = $('.shop-container'),
				layoutMode = container.data('layout');

			if ( typeof imagesLoaded === 'function' ) {
				container.imagesLoaded(function () {
					container.isotope({
						itemSelector: '.product-item',
						layoutMode: (layoutMode) ? layoutMode : 'masonry'
					});
				});
			}
		},
		productZoom: function () {
			// Product Page Zoom Plugin
			if ($.fn.xzoom) {
				$('#product-zoom').xzoom({
		            zoomWidth: ($(window).width() >= 1200) ? 400 : 'auto',
		            title: true,
		            tint: '#fff',
		            tintOpacity: 0.4,
		            Xoffset: 5,
		            Yoffset: 5
				});
			}

			$('.product-gallery').find('a').on('click', function (e) {
				var previewImg = $(this).data('image'),
					originalImg = $(this).data('zoom-image');

				$('#product-zoom')
					.attr('src', previewImg)
					.attr('data-xoriginal', originalImg);

				e.preventDefault();
			});
		},
		filterSlider:function () {
			// Slider For category pages / filter price
			var priceSlider  = document.getElementById('price-slider');

			// Check if #price-slider elem is exists if not return
			// to prevent error logs
			if (priceSlider == null) return;

			noUiSlider.create(priceSlider, {
				start: [ 50, 150 ],
				connect: true,
				step: 50,
				range: {
					'min': 0,
					'max': 400
				}
			});

			// Update Price Range
			priceSlider.noUiSlider.on('update', function( values, handle ){
				$('#filter-price-range').text(values.join(' - '));
			});
		},
		hideScrollAnimElem: function () {
			// Hide all items with the class .bb-scroll-anim // Cal this first
			if ($.fn.waypoint) {
				$('.scroll-anim').css('visibility', 'hidden');
			}
		},
		scrollAnim: function () {
			// Custom Scroll Animation with waypoint plugin // Call this kast
			if ($.fn.waypoint) {
				$('.scroll-anim').waypoint( function () {
					var anim = $(this.element).attr('data-anim'),
						animDelay = $(this.element).attr('data-anim-delay') || '0s';

					$(this.element).addClass('animated').css({
						'visibility'	 : 'visible',
						'animation-name' : anim,
						'animation-delay': animDelay
					});

				}, {
					offset: '90%',
					triggerOnce: true 
				});
			}
		},
		portfolio: function() {
			var container = $('.portfolio-container'),
				layoutMode = container.data('layout');

			if ( typeof imagesLoaded === 'function' ) {
				container.imagesLoaded(function () {
					container.isotope({
						itemSelector: '.portfolio-item',
						layoutMode: (layoutMode) ? layoutMode : 'masonry'
					});
				});
			}
		},
		portfolioFilter: function () {
			// Isotope plugin filter handle
			var filtersContainer = $('.portfolio-filter');

			filtersContainer.find('a').on('click', function(e) {
				var $this = $(this),
					selector = $this.attr('data-filter');

				filtersContainer.find('.active').removeClass('active');

				// And filter now
				$('.portfolio-container').isotope({
					filter: selector,
					transitionDuration: '0.5s'
				});
				
				$this.closest('li').addClass('active');
				e.preventDefault();
			});
		},
		/*revapi: function () {
			// Revoluction Slider 
			
		}*/
	};

	// Ready Event
	jQuery(document).ready(function () {
		// Init our app
		Hustle.init();
		//Hustle.revapi();
	});

	// Load Event
	$(window).on('load', function() {
		Hustle.scrollBtnAppear();
		//Hustle.revapi();
		var revapi;
            if ( $("#rev_slider").revolution == undefined ) {
                revslider_showDoubleJqueryError("#rev_slider");
            } else {
                revapi = $("#rev_slider").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "",
                    sliderLayout: "auto",
                    dottedOverlay:"none",
                    delay: 15000,
                    navigation: {
                        mouseScrollNavigation: "off",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on"
                        },
                        arrows: {
                            style: "custom",
                            enable: true,
                            hide_onmobile: false,
                            hide_under: 768,
                            hide_onleave: false,
                            tmp: '',
                            left: {
                                h_align: "left",
                                v_align: "bottom",
                                h_offset: 63,
                                v_offset: 48
                            },
                            right: {
                                h_align: "left",
                                v_align: "bottom",
                                h_offset: 85,
                                v_offset: 48
                            }
                        },
                        bullets: {
                            enable: false
                        }
                    },
                    responsiveLevels: [1200,992,768,480],
                    gridwidth: [870,679,640,480],
                    gridheight: [468,400,360,300],
                    lazyType: "smart",
                    spinner: "spinner2",
                    parallax: {
                        type: "off"
                    },
                    debugMode: false
                });
            }
	});

	// Scroll Event
	$(window).on('scroll', function () {
		Hustle.scrollBtnAppear();
		//Hustle.revapi();
	});
	
})(jQuery);