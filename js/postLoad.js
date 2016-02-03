var queryString = window.location.search,
	queryString = queryString.replace(/%20/g, " ");

if (queryString.length) {
	navigationHovers();
} else {
}

// NEXT AND PREVIOUS PAGE NAV
function navigationHovers(){

	$('.prevSection').add($('.nextSection')).hover(function(){
		$(this).toggleClass('active');
	});

	$('nav a[href$="index.html' + queryString + '"]').attr('id','currentPage');

	// DEFINE VARIABLES FOR IF STATEMENT
	var currentPage = $('#currentPage'),
	 	next = currentPage.parent().next(),
		prev = currentPage.parent().prev();

	// CHANGE VARIABLES BASED ON THE LOCATION OF CURRENTPAGE
	// IF NEXT PAGE IS THE FIRST OF THE NEXT CHAPTER
	if (currentPage.parents().eq(2).is('#navigation-4') && currentPage.parent().is('li:last-of-type')) {
		$('.nextSection').addClass('inactive');
	// IF PAGE IS THE IMMEDIATE NEXT SECTION IN THE CHAPTER
	} else if (currentPage.parent().next().length) {
		next = currentPage.parent().next()
		var nextSection = next.find('#navSectionTitle').text(),
			nextChapter = next.find('#navChapterTitle').text();
		// IF PAGE IS THE FIRST SECTION OF THE NEXT CHAPTER
	} else {
		next = currentPage.parents().eq(2).next().find('ul').find('li:first-of-type');
		var nextSection = currentPage.parents().eq(2).next().find('div').find('h2').text(),
			nChapterNumber = currentPage.parents().eq(2).next().find('div').find('p:first-of-type').text(),
			nextChapter = 'Chapter ' + nChapterNumber;
			$('.nextSection').addClass('chapterChange');
	}

	// IF CURRENT PAGE IS THE VERY FIRST SECTION
	if(currentPage.parents().eq(2).is('#navigation-0') && currentPage.parent().is('li:first-of-type')) {
		$('.prevSection').addClass('inactive');
		$('.container').addClass('whiteHeader');
	} else if (currentPage.parent().prev().length) {
		// IF SIBLINGS HAVE PREVIOUS PAGE
		prev = currentPage.parent().prev();
		var prevSection = prev.find('#navSectionTitle').text(),
			prevChapter = prev.find('#navChapterTitle').text();
	} else {
		// IF PAGE IS END OF PREVIOUS CHAPTER
		$('.container').addClass('whiteHeader');
		prev = currentPage.parents().eq(2).prev().find('ul').find('li:last-of-type');
		var prevSection = currentPage.parents().eq(2).prev().find('div').find('h2').text(),
			pChapterNumber = currentPage.parents().eq(2).prev().find('div').find('p:first-of-type').text(),
			prevChapter = 'Chapter ' + pChapterNumber;
			$('.prevSection').addClass('chapterChange');
	}

	// ASSIGN VARIABLES ACCORDINGLY
		var nextAnchor = next.find('a').attr('href'),
			prevAnchor = prev.find('a').attr('href'),
			nextNumber = next.find('#navNumber').text(),
			prevNumber = prev.find('#navNumber').text();

	// APPEND LINKS TO NEXT AND PREVIOUS SECTION HOVERS (LEFT AND RIGHT OF SCREEN)
	$('.nextSection').find('a').attr('href', nextAnchor).append('<span class="number">' + nextNumber + '</span><p class="nextTitle"><span>' + nextChapter + ' </span><span>' + nextSection + '</span><span class="sideNavArrow"></span></p>');

	$('.nextSectionEnd').find('a').attr('href', nextAnchor).append('<span class="number">' + nextNumber + '</span><p class="nextTitle"><span>' + nextChapter + ' </span><span>' + nextSection + '</span><span class="sideNavArrow"></span></p>');

	$('.prevSection').find('a').attr('href', prevAnchor).append('<span class="number">' + prevNumber + '</span><p class="prevTitle"><span>' + prevChapter + ' </span><span>' + prevSection + '</span><span class="sideNavArrow"></span></p>');


	////////////
	// chapter text : section text (bottom left minitimielin)
	var currentText = currentPage.find('#navNumber').text()
		currentTitle = currentPage.find('#navSectionTitle').text();

	// DEFINE TEXT IN BOTTOM MINITIMELINE NAVIGATION
	$('.prevText').attr('href', prevAnchor);
	$('.nextText').attr('href', nextAnchor);
	$('.currentText').html('Section ' + currentText + '<span>  ' + currentTitle + '</span>');

	if($(window).width() <= 600) {
		$('.miniTimelineTitle').html('<h1>Chapter ' + currentText + '</h1>');
	} else {
		$('.miniTimelineTitle').html('<h1>' + currentTitle + '<span>  ' + currentText + '</span></h1>');
	}

	// MINITIMELINE CIRCLES BOTTOM CENTER
	currentPage.parents().eq(1).children().each(function(){
		var anchor = $(this).find('a').attr('href');
		$('.miniTimelineSections').append('<a href="' + anchor + '"></a>')
	});

	$('.miniTimelineSections a[href$="' + queryString + '"]').addClass('active');	

	// RUN NAVIGATION FUNCTION FOR MOBILE
	if($(window).width() <= 768 ){
		// NAVIGATION ADDIONAL LEVEL MOBILE
		$('.chapterLevel').on('click', function(){
			$(this).addClass('active').parents().eq(1).addClass('Sections')
			$('.breadcrumbsMobile').addClass('levelTwo');
		});

		var breadcrumbs = $('.breadcrumbsMobile');

		breadcrumbs.find('.breadcrumbs-1').on('click', function(){
			console.log('working');
			$('#chapter').add('.navigationList').removeClass('active');
			$('.breadcrumbsMobile').removeClass('levelOne');
			$('nav').removeClass('Chapters');
			$('.chapterLevel').removeClass('active');
		});

		breadcrumbs.find('.breadcrumbs-2').on('click', function(){
			console.log('working');
			$('nav').removeClass('Sections')
			$('.sectionLevel').removeClass('active');
			$('#chapter').addClass('active').addClass('fromLeft');
			$('.breadcrumbsMobile').removeClass('levelTwo');
			$('.chapterLevel').removeClass('active');
		});

	}


}
	function motion(event){
	    // THIS IS X AXIS
	    var xAxis = event.accelerationIncludingGravity.x,
	    	yAxis = event.accelerationIncludingGravity.y,
	    	multipleX = xAxis / .5,
	    	multipleY = yAxis / .5,
	    	transX = 52 + multipleX,
	    	transY = 51 + multipleY; 


		$('.mobileAccelerometer img').css({
	    	'transition' : 'transform linear 1s',
	   		'transform' : 'translate(-' + transX + '%, -' + transY + '% )'
	   	});
	}
	function go(){
	  if(window.DeviceMotionEvent){
	    window.addEventListener("devicemotion", motion, false);
	  }
	}

	if($(window).width() <= 600) {
		go();
	}
// end