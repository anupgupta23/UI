var COMMUNICATIONLINES =
{
	isOffline:false,
	offlineData:undefined,
	callbackHandler:{},
	init:function()
	{

		$.getJSON('config/commLines.json','application/json',function(data)
		{
			if('isOffline' in data)
			{
				COMMUNICATIONLINES.isOffline = data['isOffline'];
			}
			if(COMMUNICATIONLINES.isOffline)
			{
				$.getJSON('offline/offlineData.json','application/json',function(data)
				{
					COMMUNICATIONLINES.offlineData = data;
					COMMUNICATIONLINES.handleResult('offline','filter',$.extend(true,{},COMMUNICATIONLINES.offlineData));
				});
			}
		});
	},
	getTourData:function(id)
	{
		if(COMMUNICATIONLINES.isOffline && COMMUNICATIONLINES.offlineData!=undefined)
		{
			if(id in COMMUNICATIONLINES.offlineData['packages'])
			{
				return (COMMUNICATIONLINES.offlineData['packages'])[id];
			}
		}
		return null;
	},
	executeFilter:function(data,filterMap)
	{
		var newData = data;
		if(data!= undefined && filterMap != undefined)
		{
			for(pckgID in data)
			{
				if(pckgID != undefined)
				{
					var packData = data[pckgID];
					if("budget" in filterMap)
					{
						var budArr = filterMap["budget"];
						var minBudget = budArr[0];
						var maxBudget = budArr[1];
						if(packData["budgetVal"] > maxBudget || packData["budgetVal"] < minBudget)
						{
							delete newData[pckgID];
							continue;
						}
					}
				}
			}
		}
		return newData;
	},
	applyFilters:function(params,callback)
	{
		if(COMMUNICATIONLINES.isOffline)
		{
			COMMUNICATIONLINES.callbackHandler[params["id"]] = [params,callback];
			if(COMMUNICATIONLINES.offlineData != undefined)
			{
				COMMUNICATIONLINES.handleResult(params["id"],'filter',$.extend(true,{},COMMUNICATIONLINES.offlineData));		
			}
		}
	},
	handleResult:function(id,callType,data)
	{
		if(id in COMMUNICATIONLINES.callbackHandler)
		{
			var arr = COMMUNICATIONLINES.callbackHandler[id];
			var rawData = data['packages'];
			var filterData = rawData;
			switch(callType)
			{
				case 'filter':
					filterData = COMMUNICATIONLINES.executeFilter(rawData,arr[0]['filterMap']);
				break;
			} 
			(arr[1])(filterData);
			delete COMMUNICATIONLINES.callbackHandler[id];
		}
	}
	
}

COMMUNICATIONLINES.init();