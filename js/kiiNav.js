/*--NAVIGATION--*/
    /*--Adds active class to navigation based on page--*/
        function navActiveState(page, nav_item) {
            if ( $('body').is('.'+page ) ) {
                $('.'+nav_item).addClass('active');
            }
        };
        // navActiveState('about_koch', 'about_koch_nav_item');
        if ( $(window).width() > 1024 ) {
            navActiveState('about', 'about_nav_item');
            navActiveState('giving', 'giving_nav_item');
            navActiveState('companies', 'companies_nav_item');
            navActiveState('responsibility', 'responsibility_nav_item');
            navActiveState('careers', 'careers_nav_item');
        }
        // navActiveState('join_our_team', 'join_our_team_nav_item');
    /*--End adds active class to navigation based on page--*/

    /*--Navigation Dropdowns--*/    
        function navigationDropdowns() {
            var nav = $('nav'),
            navItem = $('nav ul li');



            if ( $(window).width() > 1024 ) {
                navItem.click(function(event) {
                // $(document).on('click', 'nav ul li', function(event){
                    $(this).find('ul').slideToggle().css({'display' : 'block'});
                    $(this).siblings().find('ul').slideUp();
                    
                    event.stopPropagation();
                });

                $(document).click(function(event) {
                    navItem.find('ul').slideUp();
                
                    event.stopPropagation();
                });
            } // if ( $(window).width() > 1024 )
        }
        navigationDropdowns();
    /*--End Navigation Dropdowns--*/

    // START ADDITIONAL HOVER FOR TIMELINE
    function kiiNavHover(){
    	$('#kochNav').on({
    		mouseenter : function(){
    			$(this).addClass('active');
    		},
    		mouseleave : function(){
    			$(this).removeClass('active');
                $(this).find('nav ul li ul').slideUp();
    		}	
    	});
    } 
    kiiNavHover();
    // END ADDITIONAL HOVER FOR TIMELINE

    // /*--Sticky Nav on scroll--*/
    //     if( $(window).width() > 1024 ) {
    //         $(document).on('scroll', function() {
    //             var scrollTop = $(window).scrollTop();

    //             function stickyNav() {
    //                 if (scrollTop > 35) {
    //                     $('.header_container').css({'position': 'fixed', 'margin-top': '-35px'});
    //                 }
    //                 else {
    //                     $('.header_container').css({'position': 'absolute', 'margin-top': '0px'});
    //                 }
    //             }
    //             stickyNav();
    //         });
    //     }
    // /*--END Sticky nav on scroll--*/

    /*--Mobile Nav--*/
        function mobileNav() {
            var mobileNavIcon = $('.mobile_nav_icon'),
                linksContainer = $('.links_container'),
                topLevelNavItem = $('.top_level_nav_item'),
                navDropdown = $('.nav_dropdown'),
                subLevelNavBackButton = $('.sub_level_nav_back_button');

            mobileNavIcon.click(function(event) {
                $(this).toggleClass('active');
                linksContainer.toggleClass('top_level_nav_open');

                if ( linksContainer.hasClass('sub_level_nav_open') ) {
                    linksContainer.removeClass('sub_level_nav_open');
                    navDropdown.removeClass('open');
                }

                event.stopPropagation();
            }); // mobileNavIcon.click(function(event)

            subLevelNavBackButton.click(function(event) {
                navDropdown.removeClass('open');
            }); // subLevelNavBackButton.click(function(event))

            if ( $(window).width() <= 1024 ) {
                topLevelNavItem.click(function(event) {
                    $(this).children('ul').addClass('open');
                    linksContainer.addClass('sub_level_nav_open');

                    event.stopPropagation();
                });

                $(document).click(function(event) {
                    if ( linksContainer.hasClass('top_level_nav_open') && linksContainer.hasClass('sub_level_nav_open') ) {
                        linksContainer.removeClass('sub_level_nav_open');
                        navDropdown.removeClass('open');
                    }
                    else if ( linksContainer.hasClass('top_level_nav_open') ) {
                        linksContainer.removeClass('top_level_nav_open');
                        mobileNavIcon.removeClass('active');
                    }

                    event.stopPropagation();
                });
            } // if ( $(window).width() < 1024 ) 

        } //mobileNav
        mobileNav();
    /*--End Mobile Nav--*/