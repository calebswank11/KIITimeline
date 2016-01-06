
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
                    console.log(value);
        });
    };

};


