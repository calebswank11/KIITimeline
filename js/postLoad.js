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
	if (currentPage.parents().eq(2).is('#navigation-4') && currentPage.parent().is('li:last-of-type')) {
		$('.nextSection').addClass('inactive');
	} else if (currentPage.parent().next().length) {
		next = currentPage.parent().next()
	} else {
		next = currentPage.parents().eq(2).next().find('ul').find('li:first-of-type');
		console.log('next section isnt there');
	}

	if(currentPage.parents().eq(2).is('#navigation-0') && currentPage.parent().is('li:first-of-type')) {
		$('.prevSection').addClass('inactive');
		$('.container').addClass('whiteHeader');
	} else if (currentPage.parent().prev().length) {
		// IF VERY FIRST PAGE IN LIST
		prev = currentPage.parent().prev();
	} else {
		$('.container').addClass('whiteHeader');
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
	$('.nextSection').find('a').attr('href', nextAnchor).append('<span class="number">' + nextNumber + '</span><p class="nextTitle">' + nextChapter + ' <span>' + nextSection + '</span><span class="sideNavArrow"></span></p>');

	$('.nextSectionEnd').find('a').attr('href', nextAnchor).append('<span class="number">' + nextNumber + '</span><p class="nextTitle">' + nextChapter + ' <span>' + nextSection + '</span><span class="sideNavArrow"></span></p>');

	$('.prevSection').find('a').attr('href', prevAnchor).append('<span class="number">' + prevNumber + '</span><p class="prevTitle">' + prevChapter + ' <span>' + prevSection + '</span><span class="sideNavArrow"></span></p>');

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

	$('.miniTimelineSections a[href$="' + queryString + '"]').addClass('active');	

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


// end