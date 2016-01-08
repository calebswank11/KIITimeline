
var mediaValue;
var mediaValueParent;
var moduleTitle;
mediaArray = [];
SectionArray = [];

function getData(Chapter,Section){
//*****************************************Ajax call to call JSON******************************************//
$.ajax({
    //url : 'combo_data.json',
   // url : 'http://www.kochcreativegroupdev.com/kochrestservice/api/ContentsSections/'+Chapter+'/'+Section+'/?format=json',
    url : 'json/sample.json',
    type: 'GET',
    success : showjson,
});
//***********************************ITTERATE THROUGH THE JSON FOR DATA***********************//
function showjson (data){
     $.each(data, function (index, value) {
            //console.log(index);
                while (index == 'request'){
                    console.log(value);
                    //console.log(value.Chapter);
                    //console.log(value.Section);
                    $('#chapter').append('<li>Chapter:'+value.Chapter+' </li>');
                    
                        break;
                    };

                    while (index == 'Data'){
                        //GET SECTION INFORMATION
                        var SectionContent=value.Content;
                        for (var SC=0; SC<SectionContent.length; SC++){
                            mySectionTitle=SectionContent[SC].SectionTitle;
                            mySectionNumber=SectionContent[SC].SectionNumber;
                            mySectionDate=SectionContent[SC].SectionDate;
                            mySectionIntro=SectionContent[SC].SectionIntro;
                            mySectionHero=SectionContent[SC].SectionHero;
                            console.log(mySectionTitle,mySectionNumber,mySectionDate,mySectionIntro,mySectionHero);
                            $('#section').append('<h1>Section:'+mySectionTitle+' </h1>');
                            $('#section').append('<h2>'+mySectionDate+' </h2>');
                            $('#section').append('<h3>'+mySectionIntro+' </h3>');
                            //ITERATE THROUGH MODULES
                            var Modules = value.Content[SC].Modules;
                            for (var M = 0; M < Modules.length; M++){
                                myModuleTitle = Modules[M].Module_Title;
                                myModuleYear = Modules[M].Module_Year
                                myModuleOrder = Modules[M].Module_Order;
                                myModuleSubtitle=Modules[M].Module_Subtitle;
                                myModuleCopy=Modules[M].Module_Copy;
                                myModuleType=Modules[M].Module_Type;
                                myModulePosX=Modules[M].PosX;
                                myModulePosY=Modules[M].PosY;
                                myModuleCol=Modules[M].Col;
                                myModuleRow=Modules[M].Row;
                                console.log('module'+myModuleOrder+':'+myModuleTitle);
                                $('#modules').append('<div id="'+myModuleOrder+'" class="'+myModuleType+' '+myModulePosX+' '+myModulePosY+' '+myModuleCol+' '+myModuleRow+'"><p class="date">'+myModuleYear+'</p><h3>'+myModuleTitle+' </h3><p>'+myModuleSubtitle+'</p><p>'+myModuleCopy+'</p></div><hr>');
                                //ITTERATE THROUGH MEDIA
                            }
                        }  
                        
              
                        
                        break;
                    };

        });
    };

};


