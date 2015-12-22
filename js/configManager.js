retreiveConfigData = function(configJson,labelName)
{
	if(labelName in configJson)
	{
		return configJson[labelName];
	}
	return undefined;
}