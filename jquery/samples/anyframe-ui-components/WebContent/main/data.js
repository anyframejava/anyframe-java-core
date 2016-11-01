(function(global) {
	
	var isjQueryReady = !(!window.jQuery);
	
	if (!isjQueryReady) throw "jQuery not loaded !";
	
	var SampleDS = (window.SampleDS === undefined) ? {} : window.SampleDS;
	if (SampleDS.loaded !== undefined && SampleDS.loaded)	return;		// just once loading
	
	
	var _rawData = {};
	
	
	function _dataload(callback) {
		
		var _datafile = "data.json";		
		
		$.getJSON(_datafile, callback);		
	}	

	
	function _loadCallback(data) 
	{
		try 
		{
			_rawData = data;
			
			_buildCategory( data['category'] );
			_buildSampleSetArry( data['sampleSetArry'] );
			_buildSampleArry( data['sampleArry'], data['sampleLinkAddition'] );
			
			SampleDS.loaded = true;
			
			//console.log( SampleDS );
		}
		catch (err)
		{
			throw "json loading error: " + err;
		}
	}
	
	function _buildCategory(catArry)
	{
		var tdata = SampleDS.data,
			tcat = SampleDS.category; 
			
		for (var cx = 0, len = catArry.length; cx < len; cx++)
		{
			var catone = catArry[cx];
			
			if ( tdata[catone.catName] === undefined )
			{
				tdata[catone.catName] = {};
				tdata[catone.catName].desc =  catone.desc;
				tdata[catone.catName].disable = (catone.disable === undefined) ? false : catone.disable;
				
				tcat.push(catone.catName);
			}
			else 
			{
				throw "SampleDS.data invalid - category duplication error"; 
			}
		}
	}
	
	
	function _buildSampleSetArry(sampleSetArry)
	{
		var tdata = SampleDS.data;
		
		for (var ax = 0, len = sampleSetArry.length; ax < len; ax++)
		{
			var sampleSetOne = sampleSetArry[ax];
			var catone = tdata[sampleSetOne.catName];
			
			if ( catone[sampleSetOne.sampleSetName] === undefined )
			{
				if (catone.list === undefined)
					catone.list = [];
				
				catone.list.push(sampleSetOne.sampleSetName);
				
				catone[sampleSetOne.sampleSetName] = {};
				catone[sampleSetOne.sampleSetName].list = [];
				catone[sampleSetOne.sampleSetName].desc = sampleSetOne.desc;
			}
			else 
			{
				throw "SampleDS.data invalid - sampleSetName duplication error";
			}			
		}
	}
	
	function _buildSampleArry(sampleArry, prePath)
	{
		var tdata = SampleDS.data;
		
		for (var ax = 0, len = sampleArry.length; ax < len; ax++)
		{
			var sampleone = sampleArry[ax];
			var catone = tdata[sampleone.catName];
			var newSample = {};			
			
			// build list
			if (catone[sampleone.sampleSetName] === undefined)
			{
				throw "SampleDS.data invalid - sampleSetName not found";
			}
			
			// build each sample			
			newSample.name = sampleone.sampleName;
			newSample.link = prePath + sampleone.sampleLink;
			
			catone[sampleone.sampleSetName].list.push( newSample );
		}
	}
	

	// property 
	SampleDS.data = {};			// data.Layout.SetGroup[*].Frame[*].
	SampleDS.category = [];
	SampleDS.loaded = false;
	
	
	// function
	SampleDS.getCategory = function()
	{
		return this.category.valueOf();
	};
	
	SampleDS.getCategoryDisable = function(qryCatName)
	{
		return this.data[qryCatName].disable;
	};

	SampleDS.getSampleSetArry = function(qryCatName)
	{
		if (this.data[qryCatName].list === undefined || this.data[qryCatName].list.length == 0)
			return [];
		else
			return this.data[qryCatName].list.valueOf(); 
	};
	
	SampleDS.getSampleSetDesc = function(qryCatName, qrySampleSetName)
	{
		return this.data[qryCatName][qrySampleSetName].desc;
	};
	
	SampleDS.getSampleArray = function(qryCatName, qrySampleSetName)
	{
		return this.data[qryCatName][qrySampleSetName].list.valueOf();
	};

	window.SampleDS = SampleDS;		//TODO:
	_dataload(_loadCallback);
	
	
})(window);