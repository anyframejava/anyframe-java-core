/**
 * @fileoverview object 처리를 위한 함수.
 */

if ( !JsNamespace.exist("Eco.object") )
{
	/**
	 * @namespace
	 * @name Eco.object
	 * @memberof! <global>
	 */
	 
	JsNamespace.declare("Eco.object",{
				
		/**
		* object 속성값들을 transcation 함수에 사용되는 인자인 strArgument를<br>
		* transaction 형식의 값으로 변경한다.<br>
		* 속성 구조가 반복되는 객체의 경우는 (속성명 + "_" + index) 또는<br> 
		* (속성명 + "_" + 속성명) 의 argument string으로 변환한다.<br>
		*   예) {colors: ['red', 'green', 'blue']}) == > colors_0='red' colors_1='green' colors_2='blue'
		* @param {object} object argument string 정보를 담고 있는 객체
		* @return {string} argument 형태로 변환 처리된 string
		* @example
		* edt_arg.value = "edt_arg_value"; // Edit Compoenent value
		* var result = Eco.object.getServiceArgumenets({a: 1, b: "2", code: edt_arg});
		* trace(result);
		* // output : a=1 b="2" code="edt_arg_value"
		*
		* var result = Eco.object.getServiceArgumenets({colors: ['red', 'green', edt_arg]});
		* trace(result);
		* // output : colors_0="red" colors_1="green" colors_2="edt_arg_value"
		*
		* var result = Eco.object.getServiceArgumenets({a: 1, b: {b1: "2", b2: "3"}, code: edt_arg});
		* trace(result);
		* // output : a=1 b_b1="2" b_b2="3" code="edt_arg_value"
		* @memberOf Eco.object
		*/
		getServiceArgumenets: function(object)
		{
			var p, objects = [],
				i, len, value,
				obj, params = [],
				isEmpty = Eco.isEmpty,
				pThis = Eco.object;
			
			for (p in object) 
			{
				if (object.hasOwnProperty(p)) 
				{
					objects = objects.concat(pThis._toArgumentObjects(p, object[p], true));
				}
			}
			
			for (i = 0, len = objects.length; i < len; i++) 
			{
				obj = objects[i];
				if (!obj || isEmpty(obj.name))	continue;
				
				name = obj.name;
				value = obj.value;
				if (typeof value === "string")
				{
					value = nexacro.wrapQuote(value);
				}
				
				params.push(name + '=' + value);
			}

			return params.join(" ");
		},
		
		/**
		* object 속성값들을 transcation 함수에 사용되는 인자인<br>
		* strInDatasets, strOutDatasets를 transaction 형식의 값으로 변경한다.
		* @param {object} object strInDatasets, strOutDatasets string 정보를 담고 있는 객체
		* @return {string} 변환 처리된 string
		* @example
		* var result = Eco.object.getServiceDatasets({input: ds_users, input1: "ds_info"});
		* trace(result);
		* // output : input=ds_users input1=ds_info
		* @memberOf Eco.object
		*/
		getServiceDatasets: function(object)
		{
			var p, objects = [],
				i, len, value,
				obj, params = [],
				isEmpty = Eco.isEmpty,
				pThis = Eco.object;
			
			for (p in object) 
			{
				if (object.hasOwnProperty(p)) 
				{
					objects = objects.concat(pThis._toArgumentObjects(p, object[p]));
				}
			}
			
			for (i = 0, len = objects.length; i < len; i++) 
			{
				obj = objects[i];
				if (!obj || isEmpty(obj.name))	continue;
				
				name = obj.name;
				value = obj.value;
				params.push(name + '=' + value);
			}

			return params.join(" ");
		},
		
		/**
		* 속성,값 객체의 배열 형태로 반환
		* @private
		* @param {string} name 속성명
		* @param {object} value 속성값
		* @param {boolean=} recursive 재귀 처리 여부 (default: false)
		* @return {array} 
		* @memberOf Eco.object
		*/	
		_toArgumentObjects: function(name, value, recursive) 
		{
			var thisFunc = Eco.object._toArgumentObjects,
				objects = [],
				i, len, p;

			if (Eco.isXComponent(value))
			{
				if(value instanceof Static || value instanceof Button) 
				{
					value = value.text;
				} 
				else 
				{
					value = value.value;
				}
				
				objects.push({
					name: name,
					value: value
				});
			}
			else if (Eco.isArray(value)) 
			{
				for (i = 0, len = value.length; i < len; i++) 
				{
					if (recursive) 
					{
						objects = objects.concat(thisFunc(name + '_' + i, value[i], true));
					}
					else
					{
						objects.push({
							name: name,
							value: value[i]
						});
					}
				}
			}
			else if (Eco.isObject(value)) 
			{
				for (p in value) 
				{
					if (value.hasOwnProperty(p)) 
					{
						if (recursive) 
						{
							objects = objects.concat(thisFunc(name + '_' + p, value[p], true));
						}
						else 
						{
							objects.push({
								name: name,
								value: value[p]
							});
						}
					}
				}
			}
			else if (value instanceof Dataset)
			{
				value = value.name;
				objects.push({
					name: name,
					value: value
				});
			}
			else 
			{
				objects.push({
					name: name,
					value: value
				});
			}

			return objects;
		},
		
		/**
		* object에서 각 반복되는 속성값들을 주어진 함수로 처리한다.<br>
		* 주어진 함수에서 임의 속성 처리에서 return false를 하면 임의 속성지점에서 반복이 멈춘다.
		* @param {object} object 
		* @param {function} func callback 함수 
		* @param {string} func.prop object property name 
		* @param {object} func.val object property value
		* @param {object} func.object object 그 자체
		* @param {object=} scope callback 함수에 대한 수행 scope
		* @example
		* var datas = {code: "001", userId: "", name: "pete"};
		* Eco.object.Each(datas, function(prop, val, object) {
		* 	var result = "";
		* 	if ( !val )
		* 	{
		* 		result = prop + " must have not a non-empty value!"
		* 		st_result03.text += result;
		* 		trace(result);	// output : userId must have not a non-empty value!
		* 		return false;
		* 	}
		* 	result = prop + ":" + val;
		* 	st_result03.text += result + "  ";
		* 	trace(result);	// output : code:001
		* }, this);
		* @memberOf Eco.object
		*/
		Each: function(object, func, scope)
		{
			var p,
				scope = scope || object;
			for (p in object)
			{
				if (object.hasOwnProperty(p))
				{
					if (func.call(scope, p, object[p], object) === false)
					{
						return;
					}
				}
			}
		},
		
		/**
		* object 에 주어진 argument들로 속성값들을 합치는 처리<br>
		* 마지막부터 두번째/첫번째 argument는 속성들이 중복되는 경우 처리방법에 대한 함수이다.<br>
		* 마지막부터 두번째/첫번째 argument가 function으로 존재하지 않으면 중복되는 경우는 tarobject의 값으로 처리된다.
		* @param {object} tarobject target object 
		* @param {object...} target object 과 합치는 object들
		* @param {function=} func callback 함수 
		* @param {object=} scope callback 함수에 대한 수행 scope
		* @return {object} merge 처리된 object
		* @example
		* var datas01 = {"id": edt_id, "id_1": edt_id1};
		* var datas02 = {"name": edt_nm, "name_1": edt_nm1};
		* var datas03 = {"code": edt_cd, "value": edt_val};
		* var datas04 = {"code": edt_cd, "value": edt_val};
		* 
		* var result = Eco.object.merge(datas01, datas02, datas03, datas04, function(prop, val, object) {
		* 	switch ( prop )
		* 	{
		* 		case "code" :
		* 			if ( !object["code"] ) object["code"] = [];
		* 			object["code"].push(val);
		* 			return false;
		* 		case "value" :
		* 			if ( !object["value"] ) object["value"] = [];
		* 			object["value"].push(val);
		* 			return false;
		* 	}
		* }, this);
		* 
		* st_result.text = "";
		* for(var p in result)
		* {
		* 	if (Eco.isArray(result[p]))
		* 	{
		* 		for (var i=0; i < result[p].length; i++)
		* 		{
		* 			trace(p + "[" + i + "]:" + result[p][i].name);
		*			// output : code[0]:edt_cd
		*			// output : code[1]:edt_cd
		*			// output : value[0]:edt_val
		*			// output : value[1]:edt_val
		* 		}
		* 	}
		* 	else
		* 	{
		* 		trace(p + ":" + result[p].name);
		*		// output : id:edt_id
		*		// output : id_1:edt_id1
		*		// output : name:edt_nm
		*		// output : name_1:edt_nm1
		* 	}
		* }
		* @memberOf Eco.object
		*/
		merge: function(tarobject)
		{
			var i = 1,
				func, scope,
				ln = arguments.length,
				mergeFunc = Eco.object.merge,
				isObjectFunc = Eco.isObject,
				o, prop, 
				val, tarval;

			if ( !tarobject ) return;

			if ( typeof arguments[ln - 1]  == "function" )
			{
				ln = ln - 1;
				func = arguments[ln];
			}
			else if ( typeof arguments[ln - 2]  == "function" )
			{
				ln = ln - 2;
				func = arguments[ln];
				scope = arguments[ln + 1]||this;
			}

			if ( func )
			{
				for (; i < ln ; i++ ) //1
				{
					o = arguments[i];
					for ( prop in o )
					{
						if (o.hasOwnProperty(prop))
						{
							val = o[prop];
							if ( func.call(scope, prop, val, tarobject) !== false )
							{
								tarobject[prop] = val;
							}
						}
					}
				}
			}
			else
			{
				for (; i < ln ; i++ ) //1
				{
					o = arguments[i];
					for ( prop in o )
					{
						if (o.hasOwnProperty(prop))
						{
							val = o[prop];
							if ( !tarobject[prop] )
							{
								tarobject[prop] = val;
							}
						}
					}
				}
			}
			return tarobject;
		},
		
		/**
		* object에 argument로 주어진 object의 모든 속성값을 복사한다.<br>
		* object, function, date, array Type은 reference가 복사된다.
		* @param {object} tarobject target 객체 
		* @param {object} srcobject source 객체
		* @example
		* var target = {};
		* Eco.object.copyProperties(target, {a: 1, b: "2", c: {"A": "3", "B": 4}});
		* for(var p in target)
 		* {
		* 	trace(p + ":" + target[p]);
		*	// output : a:1
		*	// output : b:2
		*	// output : c:[object Object]
 		* }
		* @memberOf Eco.object
		*/
		copyProperties: function(tarobject, srcobject)
		{
			if (tarobject && srcobject) 
			{
				var p, value;
				
				for (p in srcobject)
				{
					if (srcobject.hasOwnProperty(p))
					{
						value = srcobject[p];
						tarobject[p] = value;
					}
				}
			}
		},
		
		
		/**
		* object에 argument로 주어진 object의 condition 조건에 따라 속성값을 복사한다.<br>
		* condition type이 undefined인 경우에는 tarobject에 정의되어 있지 않는 속성에 대해서만 복사되고,<br>
		* condition type이 function인 경우에는 return value가 true인 경우에만 복사 처리한다.<br>
		* object, function, date, array 속성 값은 reference가 복사된다.
		* @param {object} tarobject target 객체 
		* @param {object} srcobject source 객체
		* @param {function | undefined=} condition 복사 조건
		* @param {object=} scope callback 함수에 대한 수행 scope (default: this)
		* @example
		* var target = {"id1": "banana"};
		* Eco.object.copyPropertiesIf(target, {"id": "kiwi", "id1": "apple", "id2": "lemon"});
		* for(var p in target)
		* {
		* 	trace(p + ":" + target[p] + "  ");
		*	// output : id1:banana  
		*	// output : id:kiwi  
		*	// output : id2:lemon 
		* }
		* 
		* var target = {"id1": "banana"};
		* Eco.object.copyPropertiesIf(target, {"id": "kiwi", "id1": "apple", "id2": "lemon"}, function(prop, val, object) {
		* 	if (prop == "id1")
		* 	{
		* 		return false;
		* 	}
		* 	return true;
		* }
		* , this);
		* for(var p in target)
		* {
		* 	trace(p + ":" + target[p] + "  ");
		*	// output : id1:banana  
		*	// output : id:kiwi  
		*	// output : id2:lemon 
		* }
		* @memberOf Eco.object
		*/
		copyPropertiesIf: function(tarobject, srcobject, condition, scope)
		{
			if (tarobject && srcobject) 
			{
				var p, value, ret;
				
				if (condition && Eco.isFunction(condition))
				{
					for (var p in srcobject)
					{
						if (srcobject.hasOwnProperty(p))
						{
							value = srcobject[p];
							ret = condition.call(scope || this, p, value, srcobject);
							if (ret)
							{
								tarobject[p] = value;
							}
						}
					}
				}
				else // undefined
				{
					for (var p in srcobject)
					{
						if (srcobject.hasOwnProperty(p))
						{
							value = srcobject[p];
							if (tarobject[p] === condition)
							{
								tarobject[p] = value;
							}
						}
					}
				}
			}
		},
		
		/**
		* object에 속성값들을 array로 넘겨준다. 
		* @param {object} object 속성값 추출 대상 객체
		* @return {array} 속성값 Array
		* @example
		* var result = Eco.object.getValues({"id": "kiwi", "id1": "apple", code: edt_arg});
		* trace(result);	// output : kiwi,apple,[object Edit]
		* @memberOf Eco.object
		*/
		getValues: function(object)
		{
			var values = [], p;

			for (p in object) 
			{
				if (object.hasOwnProperty(p)) 
				{
					values.push(object[p]);
				}
			}

			return values;
		},
		_hasDontEnumBug: !({ toString: null }).propertyIsEnumerable('toString'),
		_dontEnums: [
			'toString',
			'toLocaleString',
			'valueOf',
			'hasOwnProperty',
			'isPrototypeOf',
			'propertyIsEnumerable',
			'constructor'
		],
		/**
		* object에 속성명칭들을 array로 넘겨준다. 
		* @function getPropertyNames
		* @param {object} object 속성명 추출 대상 객체
		* @return {array} 속성명칭 Array
		* @example
		* var result = Eco.object.getPropertyNames({"id": "kiwi", "id1": "apple", code: edt_arg});
		* trace(result);	// output : id,id1,code
		* @memberOf Eco.object
		*/
		getPropertyNames: Object.keys ? function(object) {
			return Object.keys(object);
		} :
		function(object)
		{
			var names = [], p;

            for (p in object) 
            {
                if (object.hasOwnProperty(p)) 
                {
                    names.push(p);
                }
            }
            var pThis = Eco.object;
			if ( pThis._hasDontEnumBug)
			{
				var enums = pThis._dontEnums;
				for ( var i = 0, len = enums.length ; i < len ; i++ )
				{
					if (object.hasOwnProperty(enums[i])) 
					{
						names.push(enums[i]);
					}
				}
			}
           return names;	
		},
		
		/**
		* object에 속성들의 갯수을 넘겨준다. 
		* @param {object} object 대상 객체
		* @return {number} 속성 갯수
		* @example
		* var result = Eco.object.getSize({"id": "kiwi", "id1": "apple", code: edt_arg});
		* trace(result);	// output : 3
		* @memberOf Eco.object
		*/
		getSize: function(object)
		{
			var len = 0, p;

			for (p in object) 
			{
				if (object.hasOwnProperty(p)) 
				{
					len++;
				}
			}

			return len;
		},
		
		/**
		* object0 기준으로 object1의 속성 값이 object0 속성과 같은지 비교한다. 
		* @param {object} object0 대상 객체
		* @param {object} object1 비교 대상 객체
		* @return {boolean} 비교 결과
		* @example
		* var result = Eco.object.equal({"id": "kiwi", "id1": "apple"}, {"id": "kiwi", "id1": "apple"});
		* trace(result);	// output : true
		* @memberOf Eco.object
		*/
		equal: function(object0, object1)
		{
            if (object0 === object1) 
            {
                return true;
            } 
            
            if (object0 && object1) 
            {
                return this._equalProperty(object0, object1) && this._equalProperty(object1, object0);  
            } 
            else if (!object0 && !object1) 
            {
                return object0 === object1;
            } 
            else 
            {
                return false;
            }
		},
		
		/**
		* object0 기준으로 object1의 속성 값이 object0 속성과 같은지 비교한다. 
		* @private
		* @param {object} object0 대상 객체
		* @param {object} object1 비교 대상 객체
		* @return {boolean} 비교 결과
		* @memberOf Eco.object
		*/
		_equalProperty: function(object0, object1) 
		{
            var p;
            for (p in object0) 
            {
                if (object0.hasOwnProperty(p)) 
                {
                    if (object0[p] !== object1[p]) 
                    {
                        return false;
                    }
                }
            }    
            return true;
        },
        
		
		/**
		* argument로 주어진 object의 속성 명칭과 속성 값 쌍을 하나의 Object로 구성하여 Array로 넘겨준다. 
		* @param {object} object 대상 객체
		* @return {array} 속성쌍(name:value) 배열
		* @example
		* var result = Eco.object.getArray({"id": "kiwi", "id1": "apple", code: edt_arg});
		* for (var i=0, len=result.length; i < len; i++)
		* {
		* 	for(var p in result[i])
		* 		trace(p + ":" + result[i][p]);
		*		// output :  id:kiwi
		*		// output :  id1:apple
		*		// output :  code:[object Edit]
		* }
		* @memberOf Eco.object
		*/
		getArray: function(object)
		{
			var array = [], 
				p, values;
				
			for (p in object)
			{
				if (object.hasOwnProperty(p))
				{
					values = {};
 					values[p] = object[p];
 					array.push(values);
				}
			}
			return array;
		},
		
		/**
		* object에 속성들(name, value)를 dataset에 구성한다.<br>
		* dir 값이 vert 이면 name Column, value Column를 dataset에 구성한 후 속성 값들을 record로 구성하고,<br>
		* dir 값이 horz 이면 name는 Column 명으로 구성한다 value는 Column에 0번째 Row에 구성된다.<br>
		* @param {object} object Dataset의 구성에 참조되는 객체
		* @param {dataset} ds 객체 속성,값을 참조해서 구성되는 Dataset
		* @param {string=} dir default horz(horz/vert) 
		* @example
		* var info = { "basic": "A",
		* 	"string": "가",
		* 	"int": 10,
		*  	"float": 0.8,
		* 	"bool": true
		* };
		* Eco.object.toDataset(info, ds_vert, "vert");
		* trace(ds_vert.saveXML());
		* // output: 구성된 Dataset 정보
		* //	&lt;Dataset id="ds_vert"&gt;
		* // 		&lt;ColumnInfo&gt;
		* // 			&lt;Column id="name" type="STRING" size="256"/&gt;
		* // 			&lt;Column id="value" type="STRING" size="256"/&gt;
		* // 		&lt;/ColumnInfo&gt;
		* // 		&lt;Rows&gt;
		* // 			&lt;Row&gt;
		* // 				&lt;Col id="name"&gt;basic&lt;/Col&gt;
		* // 				&lt;Col id="value"&gt;A&lt;/Col&gt;
		* // 			&lt;/Row&gt;
		* // 			&lt;Row&gt;
		* // 				&lt;Col id="name"&gt;string&lt;/Col&gt;
		* // 				&lt;Col id="value"&gt;가&lt;/Col&gt;
		* // 			&lt;/Row&gt;
		* // 			&lt;Row&gt;
		* // 				&lt;Col id="name"&gt;int&lt;/Col&gt;
		* // 				&lt;Col id="value"&gt;10&lt;/Col&gt;
		* // 			&lt;/Row&gt;
		* // 			&lt;Row&gt;
		* // 				&lt;Col id="name"&gt;float&lt;/Col&gt;
		* // 				&lt;Col id="value"&gt;0.8&lt;/Col&gt;
		* // 			&lt;/Row&gt;
		* // 			&lt;Row&gt;
		* // 				&lt;Col id="name"&gt;bool&lt;/Col&gt;
		* // 				&lt;Col id="value"&gt;true&lt;/Col&gt;
		* // 			&lt;/Row&gt;
		* // 		&lt;/Rows&gt;
		* // 	&lt;/Dataset&gt;
		* Eco.object.toDataset(info, ds_horz, "horz");
		* // output : 구성된 Dataset 정보
		* // 	&lt;Dataset id="dsHorz"&gt;
		* // 		&lt;ColumnInfo&gt;
		* // 			&lt;Column id="basic" type="STRING" size="256"/&gt;
		* // 			&lt;Column id="string" type="STRING" size="256"/&gt;
		* // 			&lt;Column id="int" type="STRING" size="256"/&gt;
		* // 			&lt;Column id="float" type="STRING" size="256"/&gt;
		* // 			&lt;Column id="bool" type="STRING" size="256"/&gt;
		* // 		&lt;/ColumnInfo&gt;
		* // 		&lt;Rows&gt;
		* // 			&lt;Row&gt;
		* // 				&lt;Col id="basic"&gt;A&lt;/Col&gt;
		* // 				&lt;Col id="string"&gt;가&lt;/Col&gt;
		* // 				&lt;Col id="int"&gt;10&lt;/Col&gt;
		* // 				&lt;Col id="float"&gt;0.8&lt;/Col&gt;
		* // 				&lt;Col id="bool"&gt;true&lt;/Col&gt;
		* // 			&lt;/Row&gt;
		* // 		&lt;/Rows&gt;
		* // 	&lt;/Dataset&gt;	
		* @memberOf Eco.object
		*/
		toDataset: function(object, ds, dir)
		{
			var p, i, len,
				value;
			
			if (dir == "vert")
			{
				if (!Eco.isEmpty(object)) 
				{
					ds.addColumn("name", "string", 256);
					ds.addColumn("value", "string", 256);
				}
				
				for (p in object)
				{
					if ( object.hasOwnProperty(p) )
					{
						value = object[p] || "";
						
						len = ds.addRow();
						ds.setColumn(len, "name", p);
						ds.setColumn(len, "value", value);
					}
				}
			}
			else 
			{
				if (!Eco.isEmpty(object)) 
				{
					for (p in object)
					{
						if ( object.hasOwnProperty(p) )
						{
							ds.addColumn(p, "string", 256);
						}
					}
					
					len = ds.addRow();
					
					for (p in object)
					{
						if ( object.hasOwnProperty(p) )
						{
							value = object[p] || "";
							ds.setColumn(len, p, value);
						}
					}
				}
			}
		},
		
		/**
		* object에 속성들(name, value) 를 dataset로 부터 구성한다.<br>
		* dir 값이 vert 이면 dataset에 name Column, value Column 필드명에서<br>
		* record별로 정보을 얻은 후 object 속성들로 구성하는 방법<br>
		* dir 값이 horz 이면 dataset의 Column들의 id를 속성 명칭,<br>
		* Column에 0번째 row 값을 value로 object 속성으로 구성된다.
		* @param {object} object Dataset값을 참조해서 새로 구성되는 객체
		* @param {dataset} ds 객체구성시 참조되는 Dataset
		* @param {string=} dir default horz(horz/vert)
		* @example
		* var info = {};
		* Eco.object.fromDataset(info, dsVert, "vert");
		* for (var p in info)
		* {
		* 	trace(p + ":" + info[p]);
		* 	// output : "string": "가",
		* 	// output : "int": 10,
		* 	// output : "float": 0.8,
		* 	// output : "bool": true
		* }
		* @memberOf Eco.object
		*/
		fromDataset: function(object, ds, dir)
		{
			var i, len,
				name, value,
				isEmpty = Eco.isEmpty;
			
			if (dir == "vert")
			{
				for(i = 0, len = ds.getRowCount(); i < len; i++)
				{
					name = ds.getColumn(i, "name");
					if (isEmpty(name)) continue;
					
					value = ds.getColumn(i, "value") || "";
					object[name] = value;
				}
			}
			else
			{
				for(i = 0, len = ds.getColCount(); i < len; i++)
				{
					name = ds.getColID(i);
					if (isEmpty(name)) continue;
					
					value = ds.getColumn(0, name) || "";
					object[name] = value;
				}
			}
		}
		
	});
}