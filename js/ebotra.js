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
  }
