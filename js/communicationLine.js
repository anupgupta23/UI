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
					COMMUNICATIONLINES.handleResult('offline',data);
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
		if(COMMUNICATIONLINES.isOffline)
		{
			if(COMMUNICATIONLINES.offlineData != undefined)
			{
				var data =  COMMUNICATIONLINES.getOffline(params,'filter');
				callback(data);	
			}
			else
			{
				COMMUNICATIONLINES.callbackHandler[params["id"]] = [params,callback];
			}
		}
	},
	handleResult:function(id,data)
	{
		if(id in COMMUNICATIONLINES.callbackHandler)
		{
			var arr = COMMUNICATIONLINES.callbackHandler[id];
			(arr[1])(data['packages']);
			delete COMMUNICATIONLINES.callbackHandler[id];
		}
	}
	
}

COMMUNICATIONLINES.init();