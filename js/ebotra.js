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
      source: availableTags
    });
      $( "#keyword_input1" ).autocomplete({
      source: availableTags
    });
        $( "#keyword_input2" ).autocomplete({
      source: availableTags
    });

  $( "#keyword_input3" ).autocomplete({
      source: availableTags
    });


    $("#keyword_input").keyup(function(event){
    if(event.keyCode == 13){
      window.location.replace("search.html");
    }
     $("#keyword_input1").keyup(function(event){
    if(event.keyCode == 13){
      window.location.replace("search.html");
    }
     $("#keyword_input2").keyup(function(event){
    if(event.keyCode == 13){
      window.location.replace("search.html");
    }
     $("#keyword_input3").keyup(function(event){
    if(event.keyCode == 13){
      window.location.replace("search.html");
    }
});
  }
