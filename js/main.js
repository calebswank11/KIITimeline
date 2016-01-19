var queryString = window.location.search
// LOAD INTERIOR FUNCTIONS
if (queryString.length) {
	loadInterior();
	imageExpand();
	setTimeout(navigationHovers, 1000);
} else {
// LOAD HOMEPAGE FUNCTIONS
landingSection();
$('.nextSectionEnd').addClass('hideMe');
}

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

    $('.container').append('<!-- start scroll to navigate --><section class="scrollToNav col-2 row-1 posX-14 posY-4"><p>Scroll to Navigate</p><span></span></section><!-- end -->')	

// WAIT UNTIL ITEMS ARE LOADED AND THEN FIRE SCRIPT
	var interiorLoaded = setInterval(function() {
	  if (/loaded|complete/.test(document.readyState)) {

	  	// CLEAR INTERVAL ONCE LOADED
	    clearInterval(interiorLoaded);

	    // FIND LAST CHILD WIDTH AND LEFT POS
	    // ADD NUMBERS TOGETHER + 100
	    var	left = $('#' + highest).offset().left,
	    	width = $('#' + highest).width(),
	    	bodyWidth = left + width + 150;


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

      this.scrollLeft -= (delta * 12);
      var scrollNumber = this.scrollLeft -= (delta * 12);
    
      event.preventDefault();

      $('body').addClass('scroll');

      scrollActivate = scrollNumber + 200;

      // console.log((scrollActivate / left) * 100 + '%');

	  $('.dragAnimate').css({
      	'width' : (scrollActivate / left) * 100 + '%'
      });

   });
// END HORZ SCROLL

}
// end

// SHOWCASE IMAGES FUNCTION
// LIGHTBOX FUNCTION
// TRY IMAGE EXPAND FUNCTION ACROSS ALL SHOWCASES
function imageExpand(){

	$('.expand').on('click', function(){

		var src = $(this).find('img').attr('src').replace(/Thumb/g, ''),
        	img = $(this).find('img'),
	        src = img.attr('src').replace(/Thumb/g, ''),
	        alt = img.attr('alt'),
	        index = alt.split('-'),
	        title = index[0],
	        text = index[1],
	        date = index[2];

	        console.log( date + '<--date//' + text + '<--text//' + title + '<--title//' + alt + '<--alt//' + src + '<--Src//' )

		// ADDS SRC INTO LIGHTBOX IMG PLACEHOLDER
		// ACTIVATE LIGHTBOX ONE
		$(this).parents().eq(1).siblings('.lightBox').addClass('active').find('img').attr('src', src).siblings('.Image_Showcase_1_Lightbox_Text').find('.description').text(text).siblings('div').find('h1').text(title).siblings('.date').text(date);
 
		// ACTIVATE LIGHTBOX TWO
		$(this).siblings().removeClass('active').parents().eq(1).siblings('.lightBox').addClass('active').find('img').attr('src', src);

	});

	$('.Lightbox_Close').on('click', function(){

		$('.lightBox').removeClass('active');

	});

}
// end

var queryString = queryString.replace(/%20/g, " ");


// NEXT AND PREVIOUS PAGE NAV
function navigationHovers(){

	$('.prevSection').add($('.nextSection')).hover(function(){
		$(this).toggleClass('active');
	});

	$('nav a[href$="' + queryString + '"]').attr('id','currentPage');

	// DEFINE VARIABLES FOR IF STATEMENT
	var currentPage = $('#currentPage'),
	 	next = currentPage.parent().next(),
		prev = currentPage.parent().prev();

	// CHANGE VARIABLES BASED ON THE LOCATION OF CURRENTPAGE
	if (currentPage.parent().next().length) {
		next = currentPage.parent().next()
	} else {
		next = currentPage.parents().eq(2).next().find('ul').find('li:first-of-type');
		console.log('next section isnt there');
	}

	if(currentPage.parent().prev().length) {
		prev = currentPage.parent().prev();
	} else {
		$('.container').addClass('whiteHeader')
		prev = currentPage.parents().eq(2).prev().find('ul').find('li:last-of-type');
		console.log('previous section isnt there');
	}

	// ASSIGN VARIABLES ACCORDINGLY
	var prevChapter = prev.find('#navChapterTitle').text(),
			prevAnchor = prev.find('a').attr('href'),
			prevSection = prev.find('#navSectionTitle').text(),
			prevNumber = prev.find('#navNumber').text(),
			nextChapter = next.find('#navChapterTitle').text(),
			nextAnchor = next.find('a').attr('href'),
			nextSection = next.find('#navSectionTitle').text(),
			nextNumber = next.find('#navNumber').text();

	// APPEND LINKS TO NEXT AND PREVIOUS SECTION HOVERS (LEFT AND RIGHT OF SCREEN)
	$('.nextSection').find('a').attr('href', nextAnchor).append('<span class="number">' + nextNumber + '</span><p class="nextTitle">' + nextChapter + ' <span>' + nextSection + '</span></p>');

	$('.nextSectionEnd').find('a').attr('href', nextAnchor).append('<span class="number">' + nextNumber + '</span><p class="nextTitle">' + nextChapter + ' <span>' + nextSection + '</span></p>');

	$('.prevSection').find('a').attr('href', prevAnchor).append('<span class="number">' + prevNumber + '</span><p class="prevTitle">' + prevChapter + ' <span>' + prevSection + '</span></p>');

	// PEOPLE NOT THINGS : CHAPTER TEXT HERE
	var currentText = currentPage.find('#navNumber').text()
		currentTitle = currentPage.find('#navSectionTitle').text();
	// $('.miniTimelineTitle').find('span').text(' ' + currentText);
	$('.miniTimelineTitle').html('<h1>' + currentTitle + '<span>  ' + currentText + '</span></h1>');

	// MINITIMELINE CIRCLES BOTTOM RIGHT
	// var currentCircleNav = $('#currentPage').parents().eq(1).children();
	currentPage.parents().eq(1).children().each(function(){
		var anchor = $(this).find('a').attr('href');
		$('.miniTimelineSections').append('<a href="' + anchor + '"></a>')
	});

	$('.miniTimelineSections a[href$="' + queryString + '"]').addClass('active')

	// console.log(currentCircleNav);
	// $('.miniTimelineSections').append(currentCircleNav);



}
// end
 // START NAVIGATION FUNCTION
function navigation(){

	$('#chapter > li:first-child').remove();

	// ACTIVATES CHAPTER NAVIGATION
	$('.navigationLevel').on('click', function(){
		$(this).toggleClass('active').parent().addClass('active').siblings('#chapter').addClass('active')
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
		$('.navigationChapters').removeClass('active')
	});
	// CLOSE NAVIGATION FROM WITHIN MENU
	$('.navigationClose').on('click', function(){
		$('.miniTimelineNav').removeClass('active');
		$('nav').removeClass('active');
	});
} navigation();
// end

// START MAP BOOTSTRAPS > FROM NETHERLANDS TO TEXAS
// DRAGGABLKE FUNCTION
(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);

$('.mapDraggable, .draggableMap svg, .gradAnimate span').drags();

// GET HEIGHT AND WIDTH OF MAPMASK TO GIVE TO .MAP
function mapMaskCSS(){

	var mapMask = $('.mapMask img'),
		height = mapMask.height(),
		width = mapMask.width(),
		map = $('.map'),
		draggableMap = $('.draggableMap');

		// map.css({
		// 	'max-height' : '60vh',
		// 	'max-width' : width 
		// });

		draggableMap.children('img').height();

} if($('.draggableMap').length) {
	mapMaskCSS();
}

$('.mapMarker, #journey > g').on('click', function(){
	var $el = $(this).attr('id');
	$(this).addClass('active').siblings().removeClass('active');
	console.log($el)
	$('.' + $el).addClass('active').siblings().removeClass('active');
});
// END MAP FUNCTIONALITY


var h1Text = $('.container > section').find('h1');

h1Text.each(function(){
	
	if ($(this).text() === 'null') {
		$(this).remove();
	}

}, 500);



// var loadTime = window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;
// console.log(window.performance);