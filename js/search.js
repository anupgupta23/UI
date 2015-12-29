  $(function() {
   
   init();
   COMMUNICATIONLINES.applyFilters({'id':'offline','filterMap':searchFiltersMap},onReceiveData);
    
  });

  var searchFiltersMap = {};

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
		          searchFiltersMap["budget"] = [ui.values[ 0 ] ,ui.values[ 1 ] ];
		      }
		    });
		    searchFiltersMap["budget"] = [budgetSelection[ 0 ] ,budgetSelection[ 1 ] ];
			var suffix = "";
	      	if( $( "#budget_slider_range" ).slider( "values", 1 ) == budgetRange[1])
	      	{
	      		suffix = "+";
	      	}
		    $( "#budget_range_val" ).val("₹" + $( "#budget_slider_range" ).slider( "values", 0 ) +
		      " to " +"₹" + $( "#budget_slider_range" ).slider( "values", 1 ) + suffix);
		    //filters initialization
		    $('#left_search_filters').on('hidden.bs.collapse', toggleChevron);
			$('#left_search_filters').on('shown.bs.collapse', toggleChevron);
	  		var filterData = retreiveConfigData(data,"filters");
	  		for(var key in filterData)
	  		{
	  			var $filterDiv = createCHeckboxesDiv(key,filterData[key]["values"]);
	  			var $headerDiv = createHeaderDiv(key,filterData[key]["label"]);
	  			var $masterDiv = $("<div/>");
	  			$masterDiv.append($headerDiv);
	  			$masterDiv.append($filterDiv);
	  			// $("#left_search_filters").append("<h3>"+filterData[key]["label"]+"</h3>");
	  		    $("#left_search_filters").append($masterDiv);
	  		}

	  		// apply button initialization
	  		 $('#filter_apply').on('click', function(e){
	  		 	COMMUNICATIONLINES.applyFilters({'id':'offline','filterMap':searchFiltersMap},onReceiveData);
	  		 }
	  		 );
		});

  }

  var onReceiveData = function(filterData)
  {
  	if(filterData != undefined)
  	{
  		$('#package_display').empty();
  		for(var packageKey in filterData)
  		{
  			if(packageKey != undefined)
  			{
  				var $imageDiv = createPackageDiv(packageKey,filterData[packageKey]);
  				$('#package_display').append($imageDiv);
  			}
  		}
  	}
  }

  var comparePackages = function(e)
  {
  	$('.comparison-prompt').addClass('active');
  }

  var createPackageDiv = function(key,data)
  {
  	var $pkgDiv = $("<div/>",{class:" col-sm-4 col-md-4 col-xs-12  left_search_nav package_div_class"});
  	var $headerDiv = $("<div/>",{class:"package_header_div_class left_search_nav"});
  	var $headeLabelName = $("<label/>",{text:data["destination"],class:"left_search_nav"});
  	var $bodyDiv = $("<div/>",{class:"package_body_div_class"});
  	var $footer = $("<div/>",{class:"package_footer_div_class left_search_nav"});
  	var $bodyImg =$("<img/>",{alt:data["label"],src:data["displayMapImg"],class:"package_div_disp_img_class"});
  	var $labelName = $("<label/>",{text:data["label"],class:"pull-left left_search_nav"});
  	var $budget = $("<label/>",{text:data["budget"],class:"pull-right left_search_nav"});
  	var $compareLabel = $("<label/>",{text:"compare",class:"compare_label left_search_nav",id:key});
  	$compareLabel.on('click',comparePackages);
  	$headerDiv.append($headeLabelName);
  	$bodyDiv.append($bodyImg);
  	$footer.append($compareLabel);	
  	$footer.append($labelName);
  	$footer.append($budget);
  	$pkgDiv.append($headerDiv);
	$pkgDiv.append($bodyDiv);
	$pkgDiv.append($footer);
	return $pkgDiv;
  }

  var createHeaderDiv = function(key,label)
  {
  	var $headerDiv = $("<div/>",{class:"search_filter_heading"});
  	var $h6 = $("<h5/>",{class:"filter_search_header_class"});
  	var $a = $("<a/>",{class:"accordion-toggle","data-toggle":"collapse", "data-parent":"#left_search_filters", "href":"#"+key+"_div"});
  	$a.append(label);
  	var $i = $("<i/>",{ class:"indicator glyphicon glyphicon-chevron-down  pull-right"});
  	var $hr = $("<hr>",{class:"filter_search_hr_class"});
  	$h6.append($a);
  	$h6.append($i);
  	$headerDiv.append($h6);
  	$headerDiv.append($hr);

  	return $headerDiv;
  }

  var createCHeckboxesDiv = function(id,data)
  {

  	var $mainDiv = $("<div/>",{id:id+"_div",class:"filter_checkboxes_div collapse"});
  	for(var index=0;index<data.length;index++)
  	{
  		var $chbx = $("<input/>",{id:id + index,class:"left_nav_label",type:"checkbox"});
  		var $lbl = $("<label/>",{class:"left_search_nav filter_checkboxes_label",text:data[index]});
  		var $chbxlbldiv  = $("<div/>",{class:"filter_search_chbxdiv_class"});
  		$chbxlbldiv.append($chbx);
  		$chbxlbldiv.append($lbl);
  		$mainDiv.append($chbxlbldiv);
  	}
  	return $mainDiv;
  }

   var toggleChevron = function(e) {
    $(e.target)
        .prev('.search_filter_heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}