var queryString = window.location.search;

// LANDING PAGE SCRIPTS
function landingSection(){

	// SLIDE ATTRIBUTES FOR WIDTH AND SETTING UP MASK WIDTH
	var length = $('#landingPageVisual').children().length,
		screenWidth = $(window).width(),
		slideImage = $('.landingPageImages'),
		slideText = $('.landingPageSlideText'),
		$length = screenWidth/length,
		slide = $('.landingPageSlideText'),
		slideNav = $('.landingPageSlideNav');;

	// SLIDE HOVER FUNCTIONALITY
	if($(window).width() >=  769) {
		slide.on({
			mouseenter : function(){
				$(this).addClass('active');

				var number = $(this).attr('data-number');

				$('.landingPageImages[data-slide="' + number + '"]').addClass('active');
			},
			mouseleave : function(){
				$(this).removeClass('active');

				var number = $(this).attr('data-number');

				$('.landingPageImages[data-slide="' + number + '"]').removeClass('active');
			}
		});


	} else {
		slide.on('click', function(){

			$(this).addClass('active').siblings().removeClass('active');

			var number = $(this).attr('data-number');

			$('.landingPageImages[data-slide="' + number + '"]').addClass('active').siblings().removeClass('active');
		});
	}

}
// end

// INITIATE HORZ SCROLL SCRIPT
function loadInterior(){

// START DYNAMIC WIDTH FUNCTION
// FIND HIGHEST MODULE ID OF THE MODULES (use for width later)
	var ids = $('.container > section[id]').map(function() {
	    return parseInt(this.id, 15);
	}).get();

	var highest = Math.max.apply(Math, ids),
		scrollNumber = 0,
		left = $('#' + highest).offset().left;

// WAIT UNTIL ITEMS ARE LOADED AND THEN FIRE SCRIPT
	var interiorLoaded = setInterval(function() {
	  if (/loaded|complete/.test(document.readyState)) {

	  	// CLEAR INTERVAL ONCE LOADED
	    clearInterval(interiorLoaded);

	    // FIND LAST CHILD WIDTH AND LEFT POS
	    // ADD NUMBERS TOGETHER + 100
	    var	left = $('#' + highest).offset().left,
	    	width = $('#' + highest).width(),
	    	windowWidth = $(window).width()
	    	dragNavWidth = $('.dragNav').width();

	    if($('#' + highest).hasClass('end')) {
	    	var bodyWidth = left + width;
	    } else {
	    	var bodyWidth = left + width + 150;
	    }


	    // DEFINE CLICKABLE NAVIGATION AT BOTTOM FOR SECTION
	    var slideNumber = Math.ceil(bodyWidth/windowWidth);

	    for (i = 0; i < slideNumber; i++) {
	    	var n = [i],
	    		animateTo = n * windowWidth,
	    		animateBarTo = (dragNavWidth / (slideNumber-1)) * n,
	    		animatePercent = animateBarTo/dragNavWidth * 100;
	    	$('.dragNav').append('<article class="navSlideClick" id="navSlide' + [i] + '"><div data-scroll="' + animateTo + '" data-bar="' + animateBarTo + '" data-percent="' + animatePercent + '"></div></article>');
	    }

	    $('.navSlideClick').css({
	    	'width' : dragNavWidth / (slideNumber - 1)
	    });
	    $('body').on('click', '.navSlideClick', function(){

	    	var scrollWidth = $(this).find('div').data('scroll'),
	    		animateWidth = $(this).find('div').data('bar');

	    	// ADD ACTIVE CLASS TO NAV SCROLL ELEMENT AND REMOVE FROM SIBLINGS
    		$(this).addClass('active').nextAll().removeClass('active');
    		$(this).prevUntil().addClass('active');
	    	
	    	// DEFINE ANIMATIONS OF BAR AND BODY
	    	$('body').animate({scrollLeft: scrollWidth}, 500);
	    	$('.dragAnimate').css({
	    		'width' : animateWidth + 'px'
	    	})
	    	return false;
	    });

		// GIVE BODY WIDTH BASED UPON NUMBERS ADDED TOGETHER
		// GIVE NEXT SECTION END A LEFT POSITION TO THE VERY END OF BODY
		if($(window).width() >= 769) {
		    $('body').css({
		    	'width' : bodyWidth
		    });
		    $('.nextSectionEnd').css({
				'left' : bodyWidth
			});
		}

	  }

	  // CHECK EVERY 40 MS
	}, 40);
	// END

// START HORZ MOUSEWHEEL SCROLL
   $("body").mousewheel(function(event, delta) {

      this.scrollLeft -= (delta * 1);
      var scrollNumber = this.scrollLeft -= (delta * 1);

      event.preventDefault();

      $('body').addClass('scroll');

      scrollActivate = scrollNumber + 200;

	  var percent = (scrollActivate / left) * 100;

	  $('.dragAnimate').css({
      	'width' : (scrollActivate / left) * 100 + '%'
      });

      $('.navSlideClick').each(function(){
      	var percentMatch = $(this).find('div').attr('data-percent');
      	if(percentMatch <= percent) {
      		$(this).addClass('active')
      	} else {
      		$(this).removeClass('active')
      	}
      });

   });
// END HORZ SCROLL

}
// end

// SHOWCASE IMAGES FUNCTION
// LIGHTBOX FUNCTION
// TRY IMAGE EXPAND FUNCTION ACROSS ALL SHOWCASES
function imageExpand(){

	$('body').on('click', '.expand.lb1', function(){

	    var img = $(this).find('img'),
            src = img.attr('src').replace(/Thumb/g, ''),
            alt = img.attr('alt'),
            index = alt.split('-'),
            title = index[0],
            text = index[1],
            date = index[2];

            // DEFINE ITALICS WITHIN TEXT
        var startPos = text.indexOf('^') + 1,
        	endPos = text.indexOf('^', startPos),
        	textTwo = text.substring(startPos, endPos),
        	index2 = text.split('^'),
        	textUse = index2[0];

        	console.log(textUse + '<em>' + textTwo + '</em>');

			$(this).parents().eq(1).siblings('.lightBox').addClass('active').find('img').attr('src', src).siblings('.Image_Showcase_1_Lightbox_Text').find('.description').text(text).siblings('div').find('h1').text(title).siblings('.date').text(date);

	});

	$('body').on('click', '.expand.lbb', function(){

	    var img = $(this).find('img'),
            src = img.attr('src').replace(/Thumb/g, ''),
            alt = img.attr('alt'),
            index = alt.split('-'),
            title = index[0],
            text = index[1],
            date = index[2],
            el = $(this);

            console.log(src + '/////' + alt + '/////' + title + '/////' + date + '/////' + text + '/////');

            $(this).parent().siblings('.lightBox').addClass('active').find('img').attr('src', src).siblings('.lightboxText').find('.description').text(text).siblings('div').find('h1').text(title).siblings('.date').text(date);

	});

	$('.Lightbox_Close').on('click', function(){

		$('.lightBox').removeClass('active');

	});

	// ON NEXT CLICK
	$('.Lightbox_Next').on('click', function(){

		var currenntImage = $(this).parents().eq(1).siblings('img').attr()
		console.log(currentImage);

	});

	// ON PREV CLICK
}
// end
 // START NAVIGATION FUNCTION
function navigation(){

	$('#chapter > li:first-child').remove();

	// ACTIVATES CHAPTER NAVIGATION
	$('.navigationLevel').on('click', function(){
		if($(window).width() > 768) {
			$(this).toggleClass('active').parent().addClass('active').siblings('#chapter').removeClass('fromLeft').addClass('active')
		} else {
			$(this).addClass('active').parents().eq(1).addClass('Chapters');
			$('.breadcrumbsMobile').addClass('levelOne');
		}
	});

	// MUTE SOUND AND STOP ANIMATION
	$('.miniTimelineSound').on('click', function(){
		$(this).toggleClass('active');
	});

	// TOGGLE NAVIGATION TIMELINE
	$('.miniTimelineNav').on('click', function(){
		$(this).toggleClass('active');
		$('nav').toggleClass('active');
		$('.navigationChapters').removeClass('active')
	});
	// CLOSE CHAPTERS FROM WITHIN CHAPTERS
	$('.closeChapters').on('click', function(){
		$('.navigationChapters').removeClass('active');
		$('.navigationList').removeClass('active');
		$('nav').removeClass('active')
	});
	// CLOSE NAVIGATION FROM WITHIN MENU
	$('.navigationClose').on('click', function(){
		$('.miniTimelineNav').removeClass('active');
		$('nav').removeClass('active');
	});
} navigation();
// end

// GET HEIGHT AND WIDTH OF MAPMASK TO GIVE TO .MAP
function mapMaskCSS(){

	var mapMask = $('.mapMask img'),
		height = mapMask.height(),
		width = mapMask.width(),
		map = $('.map'),
		draggableMap = $('.draggableMap');

		draggableMap.children('img').height();

} if($('.draggableMap').length) {
	mapMaskCSS();
}

$('#journey > g').on('click touchstart', function(){
	var $el = $(this).attr('id');
	$(this).addClass('active').siblings().removeClass('active');
	console.log($el)
	$('.' + $el).addClass('active').siblings().removeClass('active');
});

// APPLY MOUSE TRACKING TO THE PAGE IF IT HAS THE MEASURE DIV
function backgroundImageMove(){
	if($('.measure').length) {

	  var measure = $('.measure'),
	      measureTop = measure.offset().top,
	      measureLeft = measure.offset().left,
	      screenY = $(window).height(),
	      screenX = $(window).width();

	      $(window).mousemove(function(e){

	        var mouseY = event.pageY,
	            mouseX = event.pageX - $(window).scrollLeft(),
	            MYCenter = mouseY - measureTop,
	            MXCenter = mouseX - measureLeft,
	            transY = MYCenter * -.0015 + 50,
	            transX = MXCenter * -.0015 + 50,
	            transY2 = MYCenter * -.15 + 50,
	            transX2 = MXCenter * -.15 + 50;

	        $('.mapTexture').css({
	          'left' : transX + '%',
	          'top' : transY + '%'
	        });

	      });

	} 
}
// end
// END MAP FUNCTIONALITY



function mobileLoad(){

	$('img').each(function(){
		var src = $(this).attr('src').replace(/.jpg/g,'_Mobile.jpg').replace(/.png/g, '_Mobile.png');

		$(this).attr('src', src);
	});

	$('.scrollToNav').appendTo($('.sectionIntro'));

	// SHOWCASE IMAGE WIDTH
	function imageModuleOneMobile(){

		var showcase = $('.Image_Showcase_1'),
			showcaseTwo = $('.Image_Showcase_2'),
			ul = $('.Image_Showcase_1_Images'),
			ulTwo = $('.Image_Showcase_2_Images'),
			amount = ul.find('li').length,
			width = ul.width(),
			amountTwo = ulTwo.find('li').length,
			widthTwo = ulTwo.width();

			ul.find('li').css({
				'width': width/amount
			});

			ulTwo.find('li').css({
				'width': widthTwo/amountTwo
			});

	} imageModuleOneMobile();

	// REORDER MODULES ON MOBILE TO BE IN CORRECT ORDER
	function sortModules(){

		$('.container > section').each(function(n){

			var id = $(this).attr('id'),
				newId = id-1;
			console.log(id)
			if(id !== undefined) {
				$('#' + id).insertAfter('#' + newId);
			} else {
				console.log('fail')
			}
 
		});

	} sortModules();

	$('.Text_Module_White').add('.Text_Module_Black').each(function(){
		$(this).children().wrapAll('<div />')	
	})
}

// VIDEO HEIGHT FUNCTION

function videoHeight(){

	var video = $('.videoModule iframe');

	video.each(function(){

		var width = $(this).width(),
			height = width * .56;

		$(this).css({
			"height" : height
		});	
	});

}
// end

// LOAD INTERIOR FUNCTIONS
if (queryString.length) {
	imageExpand();
	videoHeight();
    $('.container').append('<!-- start scroll to navigate --><section class="scrollToNav col-2 row-1 posX-14 posY-4"><p>Scroll to Explore</p><span></span></section><!-- end -->');
	if($(window).width() > 768) {
		loadInterior();
	} else {
		mobileLoad();
	}
} else {
	// LOAD HOMEPAGE FUNCTIONS
	landingSection();
	$('.nextSectionEnd').addClass('hideMe');
	$('.miniTimelineTitle').html('<h1>People Not Things <span>Home</span></h1>');
}

// DEFINE PAGEBASED FUNCTIONS
if(queryString.indexOf('Netherlands') != -1) {
	$('<div class="measure">').prependTo('body');
	if($(window).width() > 768) {
		backgroundImageMove();
		console.log('testing')
	}
}

//----------------------------------------------------------------------------------------------
// var loadTime = window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;
// console.log(window.performance);

/*--------------------------------------------------------------
Draggable
alternative to jQuery UI’s draggable
based on comments from: http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
usage example: $('.post-thumbnail, article header').draggable();
--------------------------------------------------------------*/
(function($) {
    if (!jQuery().draggable) {
        $.fn.draggable = function() {
            var _fixMobileEvent = function (e) {
                if (e.originalEvent && e.originalEvent.targetTouches && e.originalEvent.targetTouches[0]) {
                    var t = e.originalEvent.targetTouches[0];
                    e.pageX = t.clientX;
                    e.pageY = t.clientY;
                    return true;
                } else {
                    return false;
                }
            };
            this
                .css('cursor', 'move')
                .on('mousedown touchstart', function(e) {
                    _fixMobileEvent(e);
                    var $dragged = $(this);

                    var startOffset = $dragged.offset();
                    var x = startOffset.left - e.pageX,
                        y = startOffset.top - e.pageY,
                        z = $dragged.css('z-index');

                    if (!$.fn.draggable.stack) {
                        $.fn.draggable.stack = 1;
                    }
                    stack = $.fn.draggable.stack;
                    var firstMove = true;
                    var $preventClick = null;

                    $(window)
                        .on('mousemove.draggable touchmove.draggable', function(e) {
                            _fixMobileEvent(e);

                            if (firstMove) {
                                firstMove = false;
                                $dragged
                                    .css({'transform': 'scale(1.05)',
                                          'bottom': 'auto', 'right': 'auto'
                                    });
                                var $target = $(e.target);
                                if ($target.is('a')) {
                                    $preventClick = $target;
                                    $target.one('click.draggable', function(e) {
                                        e.preventDefault();
                                        e.stopImmediatePropagation();
                                    });
                                } else if ($dragged.is('a')) {
                                    $preventClick = $dragged;
                                    $dragged.one('click.draggable', function(e) {
                                        e.preventDefault();
                                        e.stopImmediatePropagation();
                                    });
                                }
                            }
                            $dragged.offset({
                                left: x + e.pageX,
                                top: y + e.pageY
                            });
                            e.preventDefault();
                        })
                        .one('mouseup touchend touchcancel', function() {
                            $(this).off('mousemove.draggable touchmove.draggable');
                            $dragged.css({'transform': 'scale(1)'})
                            $.fn.draggable.stack++;
                            if (_fixMobileEvent(e)) {
                                if ($preventClick) $preventClick.off('click.draggable');
                                var endOffset = $dragged.offset();
                                if (Math.abs(endOffset.left - startOffset.left) <= 3
                                        && Math.abs(endOffset.top - startOffset.top) <= 3) {

                                    if ($preventClick) {
                                        $preventClick[0].click();
                                    } else {
                                        var $target = $(e.target);
                                        if ($target.is('a')) {
                                            e.target.click();
                                        } else if ($dragged.is('a')) {
                                            $dragged[0].click();
                                        }
                                    }
                                }
                            }
                        });

                    e.preventDefault();
                });
            return this;
        };
    }
})(jQuery);

$('.draggableMap svg').draggable();
