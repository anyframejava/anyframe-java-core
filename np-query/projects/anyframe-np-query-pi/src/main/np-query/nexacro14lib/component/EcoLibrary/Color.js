/**
 * @fileoverview Color와 관련된 함수.
 */
 
if ( !JsNamespace.exist("Eco.Color") )
{
	/**
	 * @namespace
	 * @name Eco.Color
	 * @memberof! <global>
	 */
	JsNamespace.declare("Eco.Color", {
	 /**
	 * 기본색상 배열.
	 * @type array
	 * @memberOf Eco.Color
	 */
	basicColors: [
		['#ff8080','#ffff80','#80ff80','#00ff80','#80ffff','#0080ff','#ff80c0','#ff80ff'],
		['#ff0000','#ffff00','#80ff00','#00ff40','#00ffff','#0080c0','#8080c0','#ff00ff'],
		['#804040','#ff8040','#00ff00','#008080','#004080','#8080ff','#800040','#ff0080'],
		['#800000','#ff8000','#008000','#008040','#0000ff','#0000a0','#800080','#8000ff'],
		['#400000','#804000','#004000','#004040','#000080','#000040','#400040','#400080'],
		['#000000','#808000','#808040','#808080','#408080','#c0c0c0','#400040','#ffffff']
	],	     
                                                                          
    /** Thanks to Veselin Tenev. 
    * http://www.codeproject.com/Articles/12372/Windows-Like-Choose-Color-Dialog
    */

	/**
	 * HSL MAX값.
	 * @constant
	 * @type number
	 * @memberOf Eco.Color
	 */ 
    HSLMAX: 240,
    
	/**
	 * RGB MAX값.
	 * @constant
	 * @type number
	 * @memberOf Eco.Color
	 */     
    RGBMAX: 255,

	/**
	 * 채도가 0이면 색상은 undefined 이다.<br>
	 * 이때 색상값을 처리하기 위한 값이다.
	 * @constant
	 * @private
	 * @type number
	 * @memberOf Eco.Color
	 */    
    //HUE_VALUE_WHEN_SATURATION_IS_ZERO: (parseInt(this.HSLMAX*2)/3),  //<-- 주의. this를 Eco.Color로 바꾸지 말 것.  
    HUE_VALUE_WHEN_SATURATION_IS_ZERO: 160,  //계산식 사용 X

	
    rgbToHsl: function(R,G,B)
   	{ 
		var pThis = Eco.Color;
		var HSLMAX = pThis.HSLMAX;
		var RGBMAX = pThis.RGBMAX;
		var cMax = Math.max( Math.max(R,G), B);
		var cMin = Math.min( Math.min(R,G), B);
		var L = Math.floor(( ((cMax+cMin)*HSLMAX) + RGBMAX )/(2*RGBMAX) );
		var H = 0;
		
		if (cMax == cMin) 
		{                               /* r=g=b --> achromatic case */
			 S = 0;                     /* saturation */
			 H = pThis.HUE_VALUE_WHEN_SATURATION_IS_ZERO;        /* hue */
			 
			 //console.log("pThis.HUE_VALUE_WHEN_SATURATION_IS_ZERO=" +pThis.HUE_VALUE_WHEN_SATURATION_IS_ZERO)
			 //console.log("cMax="+ cMax + ", cMin="+ cMin  + ", S="+ S + ", H="+ H);	
		}
		else 
		{                        /* chromatic case */
			 /* saturation */
			 if (L <= (HSLMAX/2))
			 {
				S = Math.floor( ( ((cMax-cMin)*HSLMAX) + ((cMax+cMin)/2) ) / (cMax+cMin) );
			 }
			 else
			 {
				S = Math.floor( ( ((cMax-cMin)*HSLMAX) + ((2*RGBMAX-cMax-cMin)/2) )/ (2*RGBMAX-cMax-cMin) );
			 }

				 /* hue */
			  var Rdelta = Math.floor( ( ((cMax-R)*(HSLMAX/6)) + ((cMax-cMin)/2) ) / (cMax-cMin) );
			  var Gdelta = Math.floor( ( ((cMax-G)*(HSLMAX/6)) + ((cMax-cMin)/2) ) / (cMax-cMin) );
			  var Bdelta = Math.floor( ( ((cMax-B)*(HSLMAX/6)) + ((cMax-cMin)/2) ) / (cMax-cMin) );

			 if (R == cMax)
			 {
				H = Bdelta - Gdelta;
			 }
			 else if (G == cMax)
			 {
				H = (HSLMAX/3) + Rdelta - Bdelta;
			 }
			 else /* B == cMax */
			 {
				H = ((2*HSLMAX)/3) + Gdelta - Rdelta;
			 }
			 
			 if (H < 0)	H += HSLMAX;
			 
			 if (H > HSLMAX) H -= HSLMAX;
		}

		var res = [];
		res[0] = Math.floor(H);
		res[1] = Math.floor(S);
		res[2] = Math.floor(L);
		return res;
	},    
    
    
	/**
	 * 색상을 RGB로 변환한다.
	 * @private 
	 * @param {number} n1 보정값1.
	 * @param {number} n2 보정값2.
	 * @param {number} hue 색상.
	 * @return {number} 색상.
	 * @memberOf Eco.Color
	 */     
   	hueToRgb: function(n1,n2,hue)
   	{
	   var HSLMAX = Eco.Color.HSLMAX;
	   
		n1 = Math.floor(n1);
		n2 = Math.floor(n2);
		hue = Math.floor(hue);
      /* range check: note values passed add/subtract thirds of range */
      if (hue < 0) hue += HSLMAX;

      if (hue > HSLMAX) hue -= HSLMAX;

      /* return r,g, or b value from this tridrant */
      if (hue < (HSLMAX/6)) 
      {
          return Math.floor( n1 + Math.floor((((n2-n1)*hue+(HSLMAX/12))/(HSLMAX/6))) );
      }
      
      if (hue < (HSLMAX/2))
      {
         return ( n2 );
      }
      
      
      if (hue < ((HSLMAX*2)/3))
      {
         return Math.floor( n1 +    Math.floor( (((n2-n1)*(((HSLMAX*2)/3)-hue)+(HSLMAX/12)) / (HSLMAX/6)) ) );
      }
      else
      {
         return Math.floor( n1 );
      }
      
    },


	/**
	 * HSL을 RGB로 변환한다.
	 * @param {number} hue 색상.
	 * @param {number} sat 채도.
	 * @param {number} lum 명도.
	 * @return {array.<number>} RGB값을 가진 array. [R,G,B].
	 * @example 
	 * trace(Eco.Color.hslToRgb(100,240,120)); //output: [0,255,128]
	 * trace(Eco.Color.hslToRgb(20,240,120));  //output: [255,128,0]
	 *
	 * @memberOf Eco.Color
	 */     
   	hslToRgb: function(hue,sat,lum)
   	{
	  var R,G,B;
	  var pThis = Eco.Color;
	  var HSLMAX = pThis.HSLMAX;
	  var RGBMAX = pThis.RGBMAX;

	 //trace("\t### Eco.hlsToRGB > hue=" + hue + ", sat=" + sat + ", lum=" + lum);
      if (sat == 0) 
      {  /* achromatic case */
         R=G=B=(lum*RGBMAX)/HSLMAX;
        
         if (hue != pThis.HUE_VALUE_WHEN_SATURATION_IS_ZERO) 
         {
            /* ERROR */
         }
      }
      else  
      {  
         //보정처리
         /* chromatic case */
         /* set up magic numbers */
         var Magic1, Magic2;
         
         if (lum <= (HSLMAX/2))
         {
			Magic2 = Math.floor(	(lum*(HSLMAX + sat) + (HSLMAX/2)) / HSLMAX	);
         }
         else
         {
            Magic2 = (lum + sat - Math.floor( ((lum*sat) + (HSLMAX/2))/HSLMAX) );
         }
			
         Magic1 = 2*lum-Magic2;

		 var hueToRgb= pThis.hueToRgb;
         /* get RGB, change units from HSLMAX to RGBMAX */
         R = ( hueToRgb(Magic1,Magic2,hue+(HSLMAX/3)) * RGBMAX + (HSLMAX/2) )  / HSLMAX;
         G = ( hueToRgb(Magic1,Magic2,hue) * RGBMAX + (HSLMAX/2) )  / HSLMAX;
         B = ( hueToRgb(Magic1,Magic2,hue - (HSLMAX/3)) * RGBMAX +  (HSLMAX/2) )  / HSLMAX;
      }
	  
	  res = [];
	  res[0] = Math.floor(R);
	  res[1] = Math.floor(G);
	  res[2] = Math.floor(B);
	  
	  return res;
    },
    
    
	/**
	 * RGB를 Hexadecimal code로 변환한다.
	 * @param {number} red red.
	 * @param {number} green green.
	 * @param {number} blue blue.
	 * @param {number=} alpha alpha.
	 * @return {string} Hexadecimal code.
	 * @example
	 * trace(Eco.Color.rgbToHex(255,140,0)); //output: #FF8C00
	 * trace(Eco.Color.rgbToHex(255,140,0, 100)); //output: #FF8C0064
	 *
	 * @memberOf Eco.Color
	 */        
	rgbToHex: function(red,green,blue,alpha)
	{
		var numberToHex = Eco.Color.numberToHex;
		return "#" + numberToHex(red) + numberToHex(green) + numberToHex(blue) + numberToHex(alpha);	
	},
	
	/**
	 * number를 Hexadecimal code로 변환한다.
	 * @private
	 * @param {number} value 변환대상.
	 * @return {number} Hexadecimal.
	 * @memberOf Eco.Color
	 */	
	numberToHex: function(value)
	{
		if(Eco.isEmpty(value)) return "";
		
		var hex = value.toString(16).padLeft(2,"0");
		//trace("value="+value+" , hex="+hex);
		return hex.toUpperCase();
	},

	/**
	 * Hexadecimal code를 HSL로 변환한다.
	 * @param {string} str "red"같이 named color나, "#000000" 값들이 주어진다.
	 * @return {array} [H,S,L] 형태의 array 값.
	 * @example
	 * trace(Eco.Color.hexToHsl("#FF8080")); //output: [0,240,180]
	 * trace(Eco.Color.hexToHsl("#008000")); //output: [80,240,60]
	 * @memberOf Eco.Color
	 */		
	hexToHsl: function(str)
	{
		if(Eco.isEmpty(str)) {
			alert("Arguments is empty!");
			return;
		}
		
		var pThis = Eco.Color;
		var rgb = pThis.hexToRgb(str);
		return pThis.rgbToHsl(rgb[0],rgb[1],rgb[2]);
	},
	
	/**
	 * Hexadecimal code를 [r, g, b, a]로 변환한다.
	 * @param {string} str "red"같이 named color나, "#000000", "#000000ff" 값들이 주어진다.
	 * @return {array} [r, g, b, a] 형태의 array 값.
	 * @example
	 * trace(Eco.Color.hexToRgb("#FF8C00")); //output: [255,140,0]
	 * @memberOf Eco.Color
	 */	
	hexToRgb: function(str)
	{
		if(Eco.isEmpty(str)) {
			alert("Arguments is empty!");
			return;
		}
		
		if ( !(str.match(/^#[0-9a-f]{3,8}$/i)) )
		{
			str = nexacro._xreNamedColorList[str];
		}
		
		var hex;
		if ( str.length == 9 )
		{
			hex = str.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})(\w{1,2})$/);
		}
		else
		{
			hex = str.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
		}
		if (hex.length >= 4)
		{
			var rgb = [0, 0, 0];
			for (var i = 0; i < 3; i++)
			{
				var value = hex[i + 1];
				rgb[i] = parseInt(value.length == 1
						? value + value : value, 16) ;
			}
			if ( hex[4] && hex[4].length > 0 )
			{
				rgb.push(parseInt(hex[4], 16) );
			}
			else
			{
				rgb.push(255);			
			}
			return rgb;
		}
	}
		 
	});
}  
		 
		 


