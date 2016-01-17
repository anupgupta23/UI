  $(function() {
   
   init();
    
  });

  var init =function()
  {
     var availableTags = [
      "Singapore",
      "Australia",
      "New zealand",
      "Thailand",
      "Malaysia"
    ];
    $( "#keyword_input" ).autocomplete({
      source: availableTags,
           select: function(event, ui) {
          window.location.replace("search.html");
         }
    });



    $("#keyword_input").keyup(function(event){
    if(event.keyCode == 13){
      window.location.replace("search.html");
    }
    });

    $("#keyword_input").click(function(event)
    {
      if(keyword_input_firstClick == false)
      {
        $("#keyword_input").val("");
           $("#keyword_input").attr('placeholder','Find Your Holiday');
      }
      keyword_input_firstClick = true;
    });
    type(1,'Singapore');
    setTimeout(erase,1350,9,'Singapore');
    setTimeout(type,2250,1,'Malaysia');
    setTimeout(erase,3450,8,'Malaysia');
    setTimeout(type,4250,1,'Find Your Holiday');

  }

  var keyword_input_firstClick = false;

  var type = function(captionLength,captionText) {
    if(keyword_input_firstClick == false)
    {
       $("#keyword_input").val(captionText.substr(0, captionLength++));
      if (captionLength < captionText.length + 1) {
        setTimeout(type, 150,captionLength,captionText);
      }
    }
 
}

var erase = function(captionLength,captionText) {
    if(keyword_input_firstClick == false)
    {
       $("#keyword_input").val(captionText.substr(0, captionLength--));
      if (captionLength >= 0) {
        setTimeout(erase, 100,captionLength,captionText);
      } 
    }
}

