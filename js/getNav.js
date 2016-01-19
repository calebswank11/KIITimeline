var mediaValue;
var mediaValueParent;
var moduleTitle;
mediaArray = [];
SectionArray = [];

function getNav(){
//*****************************************Ajax call to call JSON******************************************//
    $.ajax({
       url : 'http://www.kochcreativegroupdev.com/kochrestservice/api/menu/?format=json',
        //url : 'json/sample.json',
        type: 'GET',
        success : showjson,
    });
//***********************************ITTERATE THROUGH THE JSON FOR DATA***********************//
    function showjson (data){
         $.each(data, function (index, value) {

            while (index == 'Data'){
                //GET CHAPTER INFORMATION
                var MenuChapters=value.Menu;
                for (var MC=0; MC<MenuChapters.length; MC++){
                    
                    var Chapterx=value.Menu[MC].Chapter.Chapters;
                    
                    // ITERATE THROUGH CHAPTERS
                    for (var M = 0; M<Chapterx.length; M++){
                        myChapterTitle=Chapterx[M].ChapterTitle;
                        myChapterNumber=Chapterx[M].ChapterNumber;
                        myChapterDate=Chapterx[M].ChapterDate;

                        // APPEND CHAPTER LEVEL AND SECTION LEVEL TO #CHAPTER NAVIGATION
                        $('#chapter').append('<li class="chapterLevel" id="'+myChapterTitle+'"><div><p>Chapter ' + myChapterNumber + '</p><h2>'+myChapterTitle+'</h2><p>' + myChapterDate + '</p></div></li>');
                        $('#'+myChapterTitle).append('<ul class="sectionLevel" id="navigation-'+MC+'"> </ul>');
                        var SectionX=value.Menu[MC].Sections.Sections;

                        for (var ss = 0; ss<SectionX.length; ss++){
                            mySectionTitle=SectionX[ss].SectionTitle;
                            mySectionNumber=SectionX[ss].SectionNumber;
                            mySectionNumber=SectionX[ss].SectionNumber;
                            
                            $('#navigation-'+MC).append('<li><a href="index.html?chapter='+myChapterTitle+ '&section='+mySectionTitle+'" ><p id="navChapterTitle">'+mySectionDate + '</p><h3 id="navSectionTitle">' + mySectionTitle + '</h3><p id="navNumber">' + myChapterNumber + '.' + mySectionNumber +'</p></a></li>');
                        };
                    }
                }
                break;
            };  
        });
    };

};