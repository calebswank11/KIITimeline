
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
                    $('#section').append('<li>Section:'+value.Section+' </li>');
                        break;
                    };

                    while (index == 'Data'){
                       
                      
                       var output = [];
                        console.log(value)
                        for(var i = 0;i<value.Content.length;i++)
                            alert(i);
                        //output.push(value.Content.length[i]);
                        //alert(output); 
                        break;
                      
                    
                    };

        });
    };

};


