  $(function() {
   
   init();
    
  });

  var init = function()
  {
  	$('#datetimepicker_st_dt').datetimepicker();
	 $.getJSON('config/search.json','application/json',function(data)
	 	{
			var durationRange = retreiveConfigData(data,"durationRange");
			var durationSelection = retreiveConfigData(data,"durationSelection");
		 	$( "#duration_slider_range" ).slider({
		      range: true,
		      min: durationRange[0],
		      max: durationRange[1],
		      values: [ durationSelection[0], durationSelection[1] ],
		      slide: function( event, ui ) {
		      	var suffix = " days";
		      	if(ui.values[ 1 ] == durationRange[1])
		      	{
		      		suffix = "+ days";
		      	}
		        $( "#duration_val" ).val(  ui.values[ 0 ] + " to " + ui.values[ 1 ] + suffix);
		      }
		    });
			var suffix = " days";
	      	if($( "#duration_slider_range" ).slider( "values", 1 )== durationRange[1])
	      	{
	      		suffix = "+ days";
	      	}
		    $( "#duration_val" ).val( $( "#duration_slider_range" ).slider( "values", 0 ) +
		      " to " + $( "#duration_slider_range" ).slider( "values", 1 ) + suffix);

		    //budget range initialization
		    var budgetRange = retreiveConfigData(data,"budgetRange");
			var budgetSelection = retreiveConfigData(data,"budgetSelection");
		 	$( "#budget_slider_range" ).slider({
		      range: true,
		      min: budgetRange[0],
		      max: budgetRange[1],
		      values: [ budgetSelection[0], budgetSelection[1] ],
		      slide: function( event, ui ) {
		      	var suffix = "";
		      	if(ui.values[ 1 ] == budgetRange[1])
		      	{
		      		suffix = "+";
		      	}
		         $( "#budget_range_val" ).val(  "₹" + ui.values[ 0 ] + " to " + "₹" + ui.values[ 1 ] + suffix);
		      }
		    });
			var suffix = "";
	      	if( $( "#budget_slider_range" ).slider( "values", 1 ) == budgetRange[1])
	      	{
	      		suffix = "+";
	      	}
		    $( "#budget_range_val" ).val("₹" + $( "#budget_slider_range" ).slider( "values", 0 ) +
		      " to " +"₹" + $( "#budget_slider_range" ).slider( "values", 1 ) + suffix);
		    //filters initialization
	  		var filterData = retreiveConfigData(data,"filters");
	  		for(var key in filterData)
	  		{
	  			var $filterDiv = createCHeckboxesDiv(key,filterData[key]["values"]);
	  			$("#left_search_filters").append("<h3>"+filterData[key]["label"]+"</h3>");
	  		    $("#left_search_filters").append($filterDiv);
	  		}
	  		$("#left_search_filters").accordion({collapsible : true, active : 'none',heightStyle: "content"});
		});

  }

  var createCHeckboxesDiv = function(id,data)
  {
  	var $outerDiv = $("<div/>");
  	var $mainDiv = $("<div/>",{id:id+"_div",class:"filter_checkboxes_div"});
  	for(var index=0;index<data.length;index++)
  	{
  		var $chbx = $("<input/>",{id:id + index,class:"left_nav_label",type:"checkbox"});
  		var $lbl = $("<label/>",{class:"left_search_nav filter_checkboxes_label",text:data[index]});
  		var $chbxlbldiv  = $("<div/>");
  		$chbxlbldiv.append($chbx);
  		$chbxlbldiv.append($lbl);
  		$mainDiv.append($chbxlbldiv);
  		$outerDiv.append($mainDiv);
  	}
  	return $outerDiv;
  }