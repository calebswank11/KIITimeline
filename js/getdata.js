
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
    $.each(data, function (index1, value1){
        console.log(value1);
        $.each(value1, function (index2, value2){
            $.each(value2,function(index3, value3){
            
                    console.log(value3);
                    var level=String(index3);  
                    if (index3 == "CMS_Attachment"){
                      getAttachments(index3, value3);  
                    }
                    else if (index3 == "cms_documents"){
                     getDocuments(index3, value3);
                 }
            })       
        });      
    });
};
function getAttachments(index3, value3){
    $.each(value3, function(index4, value4){
        var id=String(value4.AttachmentDocumentID);  
        var fileName=String(value4.AttachmentName);  
        var guid=String(value4.AttachmentGUID);  
    });
}
function getDocuments(index3, value3){
    $.each(value3, function(index4, value4){
        $.each(value4,function(index5, value5){
            var docClassName=String(index5);  
////////////////////////////////////////////SECTION///////////////////////////////////////////////
            $.each(value5,function(index6, value6){
                //var SectionTitle;
                while (docClassName == "custom_KochTimelineSection"){
                    SectionTitle=String(value6.SectionTitle);
                    $('#section').append('<li>Node ID='+value6.NodeID+' <li style="font-weight:bold;font-size:2em;"> '+value6.SectionTitle+' <li  style="margin-bottom:1em;"> '+value6.SectionIntro+'</li></li></li>');
                    break;
                }
            });
////////////////////////////////////////////MODULES///////////////////////////////////////////////
            $.each(value5,function(index6, value6){
                var order=String(value6.NodeOrder); 
                var parent=(value6.NodeParentID); 
                var docID=(value6.NodeID);     
                //iterate to display Module information     
                while (docClassName == "custom_KochTimelineModule") {   
                    var moduleTitle=value6.Module_Title;
                    moduleTitle=moduleTitle.replace(/ /g,"_");
                    sectionTitle=SectionTitle.replace(/ /g,"_");
                    //************************PULL MODULE PAGE****************************//
                     $('#section').append('<div class="module" id="module_'+index6+'"></div>'); 
                     
                    setTimeout(function(){
                        $('#module_'+index6).load('modules/'+sectionTitle+'/'+moduleTitle+'.html',function(){                      
                        //*********FUNCTION RETURN TO WRITE BACK TO THAT DYNAMIC MODULE
                        $('#'+moduleTitle).addClass(''+value6.NodeID+'');
                    me=value6.NodeID; 
                        $('#'+moduleTitle).append('<h2>Module = '+value6.Module_Title+'</h2><p>NodeID='+value6.NodeID+'</p><p>Module Type='+value6.Module_Type+'</p><p style="font-weight:bold;"> '+moduleTitle+'</p><p style="margin-bottom:1em;"> '+value6.Module_Copy+'</p>');
                      ////////make this append a class instead of a new div            
                        }); 
                    }, 30);
                    break;
                }
            })                                                   
////////////////////////////////////////////MEDIA///////////////////////////////////////////////
            $.each(value5,function(index6, value6){
                while (docClassName == "custom_kochTimelineMedia"){
                    setTimeout(function() {
                        //$('#node_'+value6.NodeParentID).append('<ul><li>'+value6.Option_File+'</li><li>'+value6.Option_Link+'</li><li>'+value6.Option_SVG_Code+'</li><li>'+value6.Option_JS_Code+'</li></ul>')
                            //var mediaTypeUse = value6.Media_Type;
                            var mediaType=value6.Media_Type;                                
                                switch (mediaType)
                                {
                                   case 'svg-code':  myMediaType=value6.Option_SVG_Code,
                                    svgCode(myMediaType, value6.NodeParentID, mediaType, value6.Media_Title, value6.Media_Description)
                                   break;
                                
                                   case 'js-code': myMediaType=value6.Option_JS_Code,
                                    jsCode(myMediaType, value6.NodeParentID, mediaType, value6.Media_Title, value6.Media_Description)
                                   break;

                                   case 'video': myMediaType=value6.Option_Link;
                                    videoCode(myMediaType, value6.NodeParentID, mediaType, value6.Media_Title, value6.Media_Description)
                                   break;
                                
                                   case 'photo': myMediaType=value6.Option_File,
                                    photoCode(myMediaType, value6.NodeParentID, mediaType, value6.Media_Title, value6.Media_Description)
                                   break;
                                }
                                //document.write("Exiting switch block");
                           //$('.'+value6.Media_Type).append(myMediaType);
                    }, 80);  
                    break;
                }
            });
///////////////////////////////////////////////////////////////////////////
        });     
    });
}
    function svgCode(x,y,z,a,b){
        setTimeout(function(){
            //alert("do this to my svg code " + z)
            $('.'+y).append(x);
            $('.'+y).append('<ul><li>Media Title: '+a+' | Description:'+b+'</li></ul>');
            ///////!!!!!!!!!!!!!!get me the parent module type and then
        },80)                      
    }
    function jsCode(x,y,z,a,b){
        //alert("do this to my js code " + x)
    }
    function videoCode(x,y,z,a,b){
        //alert("do this to my video code " + x)
    }
    function photoCode(x,y,z,a,b){
        setTimeout(function(){
            //alert("do this to my svg code " + z)
            $('.'+y).append('<img src ="img/'+x+'"/>');
            $('.'+y).append('<ul><li>Media Title: '+a+' | Description:'+b+'</li></ul>');         
        },80)
    }
};


