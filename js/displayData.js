//button script to display all locations in the multidimensional locations array
function displayLocations(){
    $(".show_locations").hide();
    $(".clear_locations").show();
    //findLocations();
    //queryJsonForLocations;
    for (i=0; i < locationArray.length; i++){
        myArrayLocation=i;//this creates id based on record number in the multi-dimensional array for future reference
        $('#jsonContent').append("<li id='"+myArrayLocation+"' class='myLocation "+locationArray[i][2]+" "+locationArray[i][0]+" "+locationArray[i][1]+"'>"+ locationArray[i][2] +"</li>");
        } 
    //button script to assign on-click values from the array 
    $(".myLocation").click(function(){
        $( "#popup" ).empty();
        var me=($(this).attr('id'));//me identifies the record number in the multidimensional array on click.
        console.log(locationArray[me][3]+":"+locationArray[me][4])
        $('#popup').append(locationArray[me][0]);
        $('#popup').append(" | <a class='"+locationArray[me][1]+"' href='"+locationArray[me][1]+".html'>"+locationArray[me][1]+"</a>");
        //add elements to display the state and the city, and pass state values to state display;need option to display country if state=null.
    });
}; 