var COMMUNICATIONLINES =
{
	isOffline:false,
	offlineData:{},
	init:function()
	{
		console.log("init comm");
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
					console.log("offlineData comm"+COMMUNICATIONLINES.offlineData+":"+data);
				});
			}
		});
	},
	getOffline:function(params,callType)
	{
		if(COMMUNICATIONLINES.offlineData != undefined && 'packages' in COMMUNICATIONLINES.offlineData)
		{
			return COMMUNICATIONLINES.offlineData['packages'];
		}
	},
	applyFilters:function(params,callback)
	{
		console.log("isOffline"+COMMUNICATIONLINES.isOffline);
		console.log("offlineData"+COMMUNICATIONLINES.offlineData);
		if(COMMUNICATIONLINES.isOffline)
		{
			var data =  COMMUNICATIONLINES.getOffline(params,'filter');
			callback(data);
		}
	},
	
}

COMMUNICATIONLINES.init();