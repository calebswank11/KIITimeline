
// MOVE THE BACKGROUND IMAGE FUNCTION
$.fn.bgMove = function(){


    var el = this,
        measure = $('.measure'),
        measureTop = measure.offset().top,
        measureLeft = measure.offset().left,
        screenY = $(window).height(),
        screenX = $(window).width();

    if($(window).width() > 768) {

        $(window).mousemove(function(e){

            var mouseY = e.pageY,
                mouseX = e.pageX - $(window).scrollLeft(),
                MYCenter = mouseY - measureTop,
                MXCenter = mouseX - measureLeft,
                transY = MYCenter * -.003 + 50,
                transX = MXCenter * -.003 + 50,
                transY2 = MYCenter * .02 + 50,
                transX2 = MXCenter * .02 + 50,
                transY3 = MYCenter * -.0008 + 50,
                transX3 = MXCenter * -.0008 + 50;

            if (el.hasClass('bioItem')) {
                el.css({
                  'transform' : 'translate(' + transX2 + '%, ' + transY2 + '%)'
                });
            } else if (el.hasClass('bioBackground')){
                el.css({
                  'left' : transX3 + '%',
                  'top' : transY3 + '%'
                });
            } else {
                el.css({
                  'left' : transX + '%',
                  'top' : transY + '%'
                });
            }

        });
    }

}
$.fn.distributeWidth = function(){
    var parentWidth = this.width(),
        child = this.children(),
        amount = child.length,
        childWidth = parentWidth / amount - 5;

    child.css({
        'width' : childWidth,
        'height' : childWidth
    });
}

// START FUNCTIONS MANIPULATING CONTENT
function Section_Description() {
}
function Image_Feature_1() {
    $('.Image_Feature_1').each(function(){
    
        if($(this).hasClass('Image_Feature'))  {
            // console.log('done did it');
        } else {
            $(this).addClass('Image_Feature').children().not('img').wrapAll('<div class="Image_Feature_Text"></div>').parent().children().not('h1').wrapAll('<div class="Text_Background"></div>');
        }

    });
}

function Image_Feature_2() {
    $('.Image_Feature_2').each(function(){
        if($(this).hasClass('Image_Feature')) {
            // console.log('done did it | image two')
        } else {
            $(this).addClass('Image_Feature').children().not('img')
            .wrapAll('<div class="Image_Feature_Text col-3 posY-1">')
            .parent().children().not('h1').wrapAll('<div class="Text_Background">');
        }
    });
}

function Video_Feature_1() {
    $('.Video_Feature_1').each(function(){
        $(this).addClass('videoModule').children().not('iframe')
        .wrapAll('<div class="Video_Feature_Text col-2 posY-4">').parent().siblings('iframe').addClass('col-14');
    });
}

function Video_Feature_2() {
    $('.Video_Feature_2').each(function(){

        if($(this).hasClass('videoModule')) {
            // console.log('done did it | video')
        } else {
            $(this).addClass('videoModule').find('h1').addClass('largeText').parent().children().not('iframe')
                .wrapAll('<div class="Video_Feature_Text">');
            // $(this).find('h1').addClass('largeText ttu');
        }
    });
}

function Image_Showcase_1() {
    $('.Image_Showcase_1').children().wrapAll('<div class="Image_Showcase_1_Options">')
    .parent().find('img').wrapAll('<ul class="Image_Showcase_1_Images">').parent().find('img').wrap('<li class="expand lb1"><div></div></li>');
    $('.Image_Showcase_1').append('<div class="lightboxMeasure measure"></div><div class="Image_Showcase_1_Lightbox lightBox"><div class="Image_Showcase_1_Lightbox_Text lightboxText"><div><h1></h1><p class="date"></p></div><p class="description"></p><div class="Lightbox_Nav"><div class="Lightbox_Close"></div><div class="Lightbox_Next"></div><div class="Lightbox_Previous"></div></div></div><img src="" alt="">');

    $.fn.imgAttributes = function(){

        var el = this,
            img = this.find('img'),
            src = img.attr('src').replace(/Thumb/g, ''),
            alt = img.attr('alt'),
            index = alt.split('|'),
            title = index[0],
            text = index[1],
            date = index[2];

        $(this).parents().eq(1).siblings('.lightBox').addClass('active').find('img').attr('src', src).siblings('.Image_Showcase_1_Lightbox_Text').find('.description').text(text).siblings('div').find('h1').text(title).siblings('.date').text(date);

        // START ADDING ITALICS TO CAPTIONS
        var description = $('.description');
        var test_str = text;
        var start_pos = test_str.indexOf('^') + 1;
        var end_pos = test_str.indexOf('^',start_pos);
        var text_to_get = test_str.substring(start_pos,end_pos);
        var replace = description.html(description.text().replace(/\^(.*?)\^/, '<i>' + text_to_get + '</i>'));

        // console.log(replace)

    };

    // DISTRIBUTE WIDTH ON IMAGES IN LIST
    $('.Image_Showcase_1_Images').distributeWidth();
    $(window).resize(function(){
        $('.Image_Showcase_1_Images').distributeWidth();
    })

    $('body').on('click', '.expand.lb1', function(){

        $(this).addClass('active').siblings().removeClass('active');
        $(this).imgAttributes();

        $('.nextSection').add('.prevSection').css({'z-index' : '98'});

    });


    // START LIGHTBOX NEXT FUNCTIONALITY
    $('body').on('click', '.Lightbox_Next', function(){
    
         var current = $(this).parents('.Image_Showcase_1_Lightbox').siblings('.Image_Showcase_1_Options').find('.active'),
            currentNext = current.next(),
            currentFirst = current.siblings('li:first-of-type');

         if(current.is('li:last-of-type')) {
            currentFirst.imgAttributes();
            current.removeClass('active').siblings('li:first-of-type').addClass('active')
         } else {
            currentNext.imgAttributes();
            current.removeClass('active').next().addClass('active')
         }

    });
    $('.Lightbox_Close').on('click', function(){

        $('.lightBox').removeClass('active');
        $('.nextSection').add('.prevSection').css({'z-index' : '100'});

    });
    // START LIGHTBOX PREVIOUS FUNCTIONALITY
    $('body').on('click', '.Lightbox_Previous', function(){
    
         var current = $(this).parents('.Image_Showcase_1_Lightbox').siblings('.Image_Showcase_1_Options').find('.active'),
            currentPrev = current.prev(),
            currentLast = current.siblings('li:last-of-type');

         if(current.is('li:first-of-type')) {
            currentLast.imgAttributes();
            current.removeClass('active').siblings('li:last-of-type').addClass('active')
         } else {
            currentPrev.imgAttributes();
            current.removeClass('active').prev().addClass('active')
         }

    });

    $('.Image_Showcase_1_Lightbox img').bgMove();

}

function Image_Showcase_2() {
    var imageShowcaseTwo = $('.Image_Showcase_2')
    imageShowcaseTwo.children().wrapAll('<div class="Image_Showcase_2_Options">')
    .parent().find('img').wrapAll('<ul class="Image_Showcase_2_Images">').parent().find('img').wrap('<li class="expand lb2">').parent().parent().siblings().wrapAll('<div class="Image_Showcase_2_Text" />');
    imageShowcaseTwo.append('<div class="lightboxMeasure measure"></div><div class="Image_Showcase_2_Lightbox lightBox"><div class="Image_Showcase_2_Lightbox_Text"><div><h1></h1><p class="date"></p><p class="description"></p></div><img src="" alt=""></div>');
    if($(window).width() <= 768 ) {
        imageShowcaseTwo.find('.Image_Showcase_2_Lightbox').append('<div class="Lightbox_Nav"><div class="Lightbox_Close"></div><div class="Lightbox_Next"></div><div class="Lightbox_Previous"></div></div>');
    }

    imageShowcaseTwo.find('li:first-of-type').addClass('active')

    // MAKE PSUEDO LIGHTBOX WORK ON CLICK
    $('.Image_Showcase_2_Images').find('li').on('click', function(){
        var img = $(this).find('img'),
            src = img.attr('src').replace(/Thumb/g, ''),
            alt = img.attr('alt'),
            index = alt.split('|'),
            title = index[0],
            text = index[1],
            date = index[2];

            // console.log(src + '///////' + alt + '///////' + title + '///////' + text + '///////' + date)
            $(this).addClass('active').siblings().removeClass('active').parents().eq(1).siblings('.Image_Showcase_2_Lightbox').addClass('active').find('.Image_Showcase_2_Lightbox_Text').toggleClass('animate').find('img').attr('src', src).siblings('div').find('h1').text(title).siblings('.date').text(date).siblings('.description').text(text);
    });

    // MAKE PSUEDO LIGHTBOX WORK ON LOAD
    var imgLoad = $('.Image_Showcase_2').find('img').first(),
        srcLoad = imgLoad.attr('src').replace(/Thumb/g, ''),
        altLoad = imgLoad.attr('alt'),
        indexLoad = altLoad.split('|'), 
        titleLoad = indexLoad[0],
        textLoad = indexLoad[1],
        dateLoad = indexLoad[2];

        imageShowcaseTwo.find('.Image_Showcase_2_Lightbox_Text').find('img').attr('src', srcLoad).siblings('div').find('h1').text(titleLoad).siblings('.date').text(dateLoad).siblings('.description').text(textLoad);

    $('.Image_Showcase_2_Lightbox_Text img').bgMove();

}

function Quote_1() {
    // var text1 = $('.Quote_1').text();
    // $('.Quote_1').find('h1').html('<span>&quot;</span>' + text1 + '<span>&quot;</span>');
}

function Quote_2() {
    var text2 = $('.Quote_2').text();
    $('.Quote_2').children().not('img').wrapAll('<div class="quoteText">').addClass('largeText')
}
function Quote_3() {
    $('.Quote_3').children().not('img').wrapAll('<div class="Quote_3_Text"></div>')
}

function Text_Module_Black() {
    $('.Text_Module_Black').append('<div>').prepend('<div>').find('p').not('.date').addClass('text');
}

function Text_Module_White() {
    $('.Text_Module_White').each(function(){
        if($(this).hasClass('textBarModule')) {
            // console.log('done did it')
        } else {
            $(this).addClass('textBarModule')
            $(this).append('<div>').prepend('<div>').find('p').not('.date').addClass('text');
        }
    })
}

function Year_Text_1() {
}

function Year_Text_2() {
}

function Custom_Biography(){
    $('.Custom_Biography > img').bgMove();
    $('.Custom_Biography > .bioBackground').bgMove();
    $('.Custom_Biography .bioItem').bgMove();
}
function Custom(){
    if($('.mapTexture').length) {
        $('.mapTexture').bgMove();
    }
}
function  Image_Caption_One(){
    $('.Image_Caption_One').children().not('img').wrapAll('<div class="caption"></div>');
}
function  Image_Caption_Two(){}

function loadMainJS(){
    $.getScript('js/main.js', function(){
    });
}
// END DEFINE FUNCTIONS FOR AJAX


var mediaValue;
var mediaValueParent;
var moduleTitle;
var queryString = window.location.search;
mediaArray = [];
SectionArray = [];

function getData(Chapter,Section){
//*****************************************Ajax call to call JSON******************************************//
$.ajax({
   url : 'http://www.kochcreativegroupdev.com/kochrestservice/api/ContentsSections/'+Chapter+'/'+Section+'/?format=json',
    //url : 'json/sample.json',
    type: 'GET',
    success : showjson,
    complete: function(){
        setTimeout(loadMainJS, 250);
    },
    error: function(){
        alert('Oops! Looks like you broke something. Please Reload Your Page')
    }
});

//***********************************ITTERATE THROUGH THE JSON FOR DATA***********************//
function showjson (data){
    if(queryString.length) {
        $('.container').empty();
    } else {
        $('.container').load('../KIITimelineCS/includes/landingPage.html')
    }
    $.each(data, function (index, value, n) {

        while (index == 'request'){
                // console.log(value);
                //console.log(value.Chapter);
                //console.log(value.Section);
                $('#chapter').append('<li>Chapter:'+value.Chapter+' </li>');
                
                    break;
                };

                while (index === 'Data'){
                    //GET SECTION INFORMATION
                    var SectionContent=value.Content;
                    for (var SC=0; SC<SectionContent.length; SC++){
                        mySectionTitle=SectionContent[SC].SectionTitle;
                        mySectionNumber=SectionContent[SC].SectionNumber;
                        mySectionDate=SectionContent[SC].SectionDate;
                        mySectionIntro=SectionContent[SC].SectionIntro;
                        mySectionHero=SectionContent[SC].SectionHero;
                        var mySectionID = mySectionTitle.replace(/ /g, ''),
                            mySectionPath = mySectionTitle.replace(/ /g, '_'),
                            mySectionIDReplace = mySectionID.replace(/'/g, '');
                        $('.container').attr('id', mySectionIDReplace);
                        $('.container').append('<section class="sectionIntro col-16 row-15"><!-- sectionInterior --><div class="sectionTitle posX-1 posY-1 abs"><div><p class="sectionYear">' + mySectionDate + '</p><p class="chapterName">' + Chapter + '</p></div><h1>' + mySectionTitle + '</h1></div></section>')
                        // $('#section').append('<h3>'+mySectionIntro+' intro testing</h3>');

                        
                    ////////////////////////////////////////
                    var myModules = value.Content[SC].Modules,
                        dataStore = [];
                    // LOAD MODULE HTML INTO .CONTAINER
                    for (var M = 0; M < myModules.length; M++) {
                        myModuleTitle = myModules[M].Module_Title;
                        myModuleYear = myModules[M].Module_Year;
                        myModuleOrder = myModules[M].Module_Order;
                        myModuleSubtitle=myModules[M].Module_Subtitle;
                        myModuleCopy=myModules[M].Module_Copy;
                        myModuleType=myModules[M].Module_Type;
                        myModulePosX=myModules[M].PosX;
                        myModulePosY=myModules[M].PosY;
                        myModuleCol=myModules[M].Col;
                        myModuleRow=myModules[M].Row;
                        moduleLoad=myModules[M].Module_Type;

                        var n = M,
                            myMedias = value.Content[SC].Modules[M].Medias,
                            loadModules = 'modules/' + mySectionPath + '/' + moduleLoad + '.html',
                            n = M + 1,
                            appendModuleOrder = myModules[M].Module_Order,
                            appendModuleName = myModules[M].Module_Type,
                            appendModuleHighlight = myModules[M].Module_Highlight,
                            length = myModules.length;

                        // APPEND TEXT TO THE DOM
                        function appendText(){
                            
                            // CHECK TO SEE IF JSON HAS ATTRIBUTES ELSE REMOVE
                            if (myModuleTitle === 'undefined' || myModuleTitle === 'null') {
                                myModuleTitle = '';
                            }
                            if (myModuleYear === 'undefined' || myModuleYear === 0) {
                                myModuleYear = '';
                            }
                            if (myModuleCopy === 'undefined' || myModuleCopy === 'null') {
                                myModuleCopy = '';
                            }
                            $('#' + appendModuleOrder).append('<h1>' + myModuleTitle + '</h1>' + '<p class="date">' + myModuleYear +'</p>' + myModuleCopy);

                        } 

                        //ITTERATE THROUGH MEDIA
                        function myMediaFunction(){

                            if(myModules[M].hasOwnProperty('Medias')) {

                                for (var MM= 0; MM < myMedias.length; MM++){
                                    // DEFINE UNIVERSAL MEDIA TYPES
                                    myMediaTitle = myMedias[MM].Media_Title;
                                    myMediaType = myMedias[MM].Media_Type;
                                    myMediaPath = myMedias[MM].Option_File;
                                    myMediaDescription = myMedias[MM].Media_Description;
                                    myMediaCopyright = myMedias[MM].Media_Copyright;

                                    var testing = mySectionID.replace()

                                    function appendPhoto(){

                                        var mySectionIDReplace = mySectionID.replace(/'/g, '');
                                        // console.log(mySectionIDTwo)
                                        if($(window).width() > 768) {
                                            $('#' + appendModuleOrder).append('<img src="http://kochindsandbox.kochdev.com/KochSandbox/media/kochTimeline/' + mySectionIDReplace + '/' + myMediaPath + '" alt="' + myMediaTitle + ' | ' + myMediaDescription + ' | ' + myMediaCopyright + '" />');
                                        } else {
                                            $('#' + appendModuleOrder).append('<img src="http://kochindsandbox.kochdev.com/KochSandbox/media/kochTimeline/' + mySectionIDTwo + '/Mobile_' + myMediaPath + '" alt="' + myMediaTitle + ' | ' + myMediaDescription + ' | ' + myMediaCopyright + '" />');
                                        }
                                    }

                                    function appendGraphic(){
                                        $('#' + appendModuleOrder).append('<img src="http://kochindsandbox.kochdev.com/KochSandbox/media/kochTimeline/'  + mySectionID + '/' + myMediaPath + '" alt="' + myMediaTitle + ' | ' + myMediaDescription + ' | ' + myMediaCopyright + '" />');
                                    }

                                    function appendAudio(){
                                        $('#' + appendModuleOrder).append('<img src="http://kochindsandbox.kochdev.com/KochSandbox/media/kochTimeline/' + myMediaPath + ' | ' + myMediaCopyright + '" />');
                                    }

                                    function appendVideo(){
                                        myVideoPath = myMedias[MM].Option_Link;
                                        $('#' + appendModuleOrder).append('<iframe src="' + myVideoPath + '" width="480" height="270" frameborder="0" scrolling="auto" allowfullscreen></iframe>');
                                    }

                                    function appendSvgCode(){
                                        mySVGPath = myMedias[MM].Option_SVG_Code;
                                        $('#' + appendModuleOrder).append(mySVGPath);
                                    }

                                    function appendJsCode(){
                                        myJSPath = myMedias[MM].Option_JS_Code;
                                        $('body').append('<script>' + myJSPath + '</script>');
                                    }

                                    // RUN SWITCH STATEMENT TO CHANGE HOW MEDIA IS UPLOADED BASED UPON MEDIA TYPE
                                    switch (myMediaType) {
                                        case 'photo':
                                        appendPhoto();
                                        break;

                                        case 'graphic':
                                        appendGraphic();
                                        break;

                                        case 'audio':
                                        appendAudio();
                                        break;

                                        case 'video':
                                        appendVideo();
                                        break;

                                        case 'svg-code':
                                        appendSvgCode();
                                        break;

                                        case 'js-code':
                                        appendJsCode();
                                        break;
                                    }

                                }
                            }
                            // GIVES RULE TO FUNCTION TO ENSURE IT RUNS IN ABOVE IF STATEMENTS
                            var p = true;
                        }

                        // LOAD IN SECTION MODULES
                        function loadMyModules(){
                            var module = $('#' + appendModuleOrder);

                            // APPEND PARENT DIVS
                            $('.container').append('<section id="' + appendModuleOrder + '" class="module ' + appendModuleName + ' posX-' + myModulePosX + ' ' + 'posY-' + myModulePosY + ' ' + 'col-' + myModuleCol + ' ' + 'row-' + myModuleRow + ' ' + appendModuleHighlight + '"></section>');

                            // IF MODULE EXISTS RUN TEXT FUNCTION TO APPEND TEXT
                            if($('#' + appendModuleOrder).length) {
                                appendText();

                                // IF MODULE H1 TEXT EXISTS RUN MEDIA FUNCTION
                                if($('#' + appendModuleOrder).find('h1').length) {
                                    myMediaFunction();

                                    // IF MEDIA FUNCTION IS FINSIHED RUN RE-ORDER function
                                    if(p = true) {
                                        window[appendModuleName]();
                                    } else {
                                        alert('Please refresh your page');
                                    }

                                } else {
                                    alert('Please refresh your page');
                                }
                            } else {
                                alert('Please refresh your page');
                            }


                        } loadMyModules();

                    }

                }

                break;
            };
        });
    };
};