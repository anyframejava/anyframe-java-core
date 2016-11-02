//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro-public-license-readme-1.1.html	
//
//==============================================================================

if (!nexacro.Point) {
	nexacro.Point = function (x, y) {
		this.x = (x | 0);
		this.y = (y | 0);
	};
	var _pPoint = nexacro.Point.prototype;

	_pPoint.copy = function () {
		return new nexacro.Point(this.x, this.y);
	};
	_pPoint.equals = function (p) {
		return (this.x == p.x && this.y == p.y);
	};
	_pPoint.isWithin = function (p, threshold) {
		if (!threshold) {
			threshold = {
				x : threshold
			};
			threshold.y = threshold.x;
		}
		return (this.x <= p.x + threshold.x && this.x >= p.x - threshold.x && 
			this.y <= p.y + threshold.y && this.y >= p.y - threshold.y);
	};

	_pPoint.translate = function (x, y) {
		this.x += (x | 0);
		this.y += (x | 0);
	};

	_pPoint.roundedEquals = function (p) {
		return (Math.round(this.x) == Math.round(p.x) && Math.round(this.y) == Math.round(p.y));
	};

	delete _pPoint;

	nexacro.Point.fromEvent = function (x, y) {
		return new nexacro.Point(x, y);
	};
}

if (!nexacro.Offset) {
	nexacro.Offset = function (x, y) {
		this.x = (x | 0);
		this.y = (y | 0);
	};

	var _pOffset = nexacro.Offset.prototype;

	_pOffset.copy = function () {
		return new nexacro.Offset(this.x, this.y);
	};

	_pOffset.copyFrom = function (p) {
		this.x = p.x;
		this.y = p.y;
	};

	_pOffset.equals = function (offset) {
		if (!(offset instanceof nexacro.Offset)) {
			throw new Error('offset must be an instance of nexacro.Offset');
		}
		return (this.x == offset.x && this.y == offset.y);
	};

	_pOffset.round = function (to) {
		if (!((+to) != (+to))) {
			var factor = Math.pow(10, to);
			this.x = Math.round(this.x * factor) / factor;
			this.y = Math.round(this.y * factor) / factor;
		}
		else {
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
		}
	};

	_pOffset.isZero = function () {
		return (this.x == 0 && this.y == 0);
	};

	nexacro.Offset.fromObject = function (obj) {
		return new nexacro.Offset(obj.x, obj.y);
	};

	delete _pOffset;
}

if (!nexacro.Region) {
	nexacro.Region = function (t, r, b, l) {
		var me = this;
		me.top = t;
		me.right = r;
		me.bottom = b;
		me.left = l;
		me[0] = l;
		me[1] = t;
	};
	var _pRegion = nexacro.Region.prototype;

	_pRegion.contains = function (region) {
		var me = this;
		return (region.left >= me.left && region.right <= me.right
			 && region.top >= me.top && region.bottom <= me.bottom);
	};

	_pRegion.intersect = function (region) {
		var me = this, t = Math.max(me.top, region.top), r = Math.min(me.right, region.right), b = Math.min(me.bottom, region.bottom), l = Math.max(me.left, region.left);

		if (b > t && r > l) {
			return new nexacro.Region(t, r, b, l);
		}
		else {
			return false;
		}
	};

	_pRegion.union = function (region) {
		var me = this, t = Math.min(me.top, region.top), r = Math.max(me.right, region.right), b = Math.max(me.bottom, region.bottom), l = Math.min(me.left, region.left);

		return new nexacro.Region(t, r, b, l);
	};

	_pRegion.constrainTo = function (region) {
		var me = this;
		me.top = this.constrain(me.top, r.top, r.bottom);
		me.bottom = this.constrain(me.bottom, r.top, r.bottom);
		me.left = this.constrain(me.left, r.left, r.right);
		me.right = this.constrain(me.right, r.left, r.right);
		return me;
	};

	_pRegion.constrain = function (num, minV, maxV) {
		num = parseFloat(num);
		if (!((+minV) != (+minV))) {
			num = Math.max(num, minV);
		}
		if (!((+maxV) != (+maxV))) {
			num = Math.min(num, maxV);
		}
		return num;
	};

	_pRegion.adjust = function (t, r, b, l) {
		var me = this;
		me.top += t;
		me.left += l;
		me.right += r;
		me.bottom += b;
		return me;
	};

	_pRegion.getOutOfBoundOffset = function (axis, p) {
		if (!(axis instanceof nexacro.Offset)) {
			if (axis == 'x') {
				return this.getOutOfBoundOffsetX(p);
			}
			else {
				return this.getOutOfBoundOffsetY(p);
			}
		}
		else {
			p = axis;
			var d = new nexacro.Offset();
			d.x = this.getOutOfBoundOffsetX(p.x);
			d.y = this.getOutOfBoundOffsetY(p.y);
			return d;
		}
	};

	_pRegion.getOutOfBoundOffsetX = function (p) {
		if (p <= this.left) {
			return this.left - p;
		}
		else if (p >= this.right) {
			return this.right - p;
		}
		return 0;
	};

	_pRegion.getOutOfBoundOffsetY = function (p) {
		if (p <= this.top) {
			return this.top - p;
		}
		else if (p >= this.bottom) {
			return this.bottom - p;
		}
		return 0;
	};
	_pRegion.isOutOfBound = function (axis, p) {
		if (!(axis instanceof nexacro.Offset)) {
			if (axis == 'x') {
				return this.isOutOfBoundX(p);
			}
			else {
				return this.isOutOfBoundY(p);
			}
		}
		else {
			p = axis;
			return (this.isOutOfBoundX(p.x) || this.isOutOfBoundY(p.y));
		}
	};

	_pRegion.isOutOfBoundX = function (p) {
		return (p < this.left || p > this.right);
	};

	_pRegion.isOutOfBoundY = function (p) {
		return (p < this.top || p > this.bottom);
	};

	_pRegion.restrict = function (axis, p, factor) {
		if (axis instanceof nexacro.Offset) {
			var newP;
			factor = p;
			p = axis;
			if (p.copy) {
				newP = p.copy();
			}
			else {
				newP = {
					x : p.x, 
					y : p.y
				};
			}
			newP.x = this.restrictX(p.x, factor);
			newP.y = this.restrictY(p.y, factor);
			return newP;
		}
		else {
			if (axis == 'x') {
				return this.restrictX(p, factor);
			}
			else {
				return this.restrictY(p, factor);
			}
		}
	};
	_pRegion.restrictX = function (p, factor) {
		if (!factor) {
			factor = 1;
		}

		if (p <= this.left) {
			p -= (p - this.left) * factor;
		}
		else if (p >= this.right) {
			p -= (p - this.right) * factor;
		}
		return p;
	};

	_pRegion.restrictY = function (p, factor) {
		if (!factor) {
			factor = 1;
		}
		if (p <= this.top) {
			p -= (p - this.top) * factor;
		}
		else if (p >= this.bottom) {
			p -= (p - this.bottom) * factor;
		}
		return p;
	};

	_pRegion.getSize = function () {
		return {
			width : this.right - this.left, 
			height : this.bottom - this.top
		};
	};

	_pRegion.copy = function () {
		return new nexacro.Region(this.top, this.right, this.bottom, this.left);
	};

	_pRegion.translateBy = function (offset) {
		this.left += offset.x;
		this.right += offset.x;
		this.top += offset.y;
		this.bottom += offset.y;
	};

	_pRegion.round = function () {
		this.top = Math.round(this.top);
		this.right = Math.round(this.right);
		this.bottom = Math.round(this.bottom);
		this.left = Math.round(this.left);
		return this;
	};

	_pRegion.equals = function (region) {
		return (this.top == region.top && this.right == region.right
			 && this.bottom == region.bottom && this.left == region.left);
	};

	delete _pRegion;
}

if (!nexacro.Rect) {
	nexacro.Rect = function (left, top, right, bottom) {
		this.left = (left | 0);
		this.top = (top | 0);
		this.right = (right | 0);
		this.bottom = (bottom | 0);

		this.width = this.right - this.left;
		this.height = this.bottom - this.top;
	};

	var _pRect = nexacro.Rect.prototype;
	_pRect.clear = function () {
		this.left = this.top = this.right = this.bottom = 0;
		this.width = this.height = 0;
	};
	_pRect.copy = function (rc) {
		this.left = rc.left;
		this.top = rc.top;
		this.right = rc.right;
		this.bottom = rc.bottom;
		this.width = rc.width;
		this.height = rc.height;
	};
	_pRect.set = function (left, top, right, bottom) {
		if (left != this.left || top != this.top || right != this.right || bottom != this.bottom) {
			this.left = (left | 0);
			this.top = (top | 0);
			this.right = (right | 0);
			this.bottom = (bottom | 0);

			this.width = this.right - this.left;
			this.height = this.bottom - this.top;
			return true;
		}
		return false;
	};
	_pRect.clone = function () {
		return new nexacro.Rect(this.left, this.top, this.right, this.bottom);
	};
	_pRect.isSame = function (rc) {
		return (this.left == rc.left) && (this.top == rc.top) && (this.right == rc.right) && (this.bottom == rc.bottom);
	};
	_pRect.isSameSize = function (rc) {
		return (this.width == rc.width) && (this.height == rc.height);
	};
	_pRect.getWidth = function () {
		return this.width;
	};
	_pRect.getHeight = function () {
		return this.height;
	};
	_pRect = null;
}

if (!nexacro.SizeRect) {
	nexacro.SizeRect = function (left, top, width, height) {
		this.left = (left | 0);
		this.top = (top | 0);
		this.width = (width | 0);
		this.height = (height | 0);
	};

	_pSizeRect = {
	};
	nexacro.SizeRect.prototype = _pSizeRect;

	_pSizeRect.clear = function () {
		this.left = this.top = this.width = this.height = 0;
	};

	_pSizeRect.copy = function (rc) {
		this.left = rc.left;
		this.top = rc.top;
		this.width = rc.width;
		this.height = rc.height;
	};

	_pSizeRect.set = function (left, top, width, height) {
		if (left != this.left || top != this.top || width != this.width || height != this.height) {
			this.left = (left | 0);
			this.top = (top | 0);
			this.width = (width | 0);
			this.height = (height | 0);
			return true;
		}
		return false;
	};

	_pSizeRect.clone = function () {
		return new nexacro.SizeRect(this.left, this.top, this.width, this.height);
	};

	_pSizeRect.isSame = function (rc) {
		return (this.left == rc.left) && (this.top == rc.top) && (this.width == rc.width) && (this.height == rc.height);
	};

	_pSizeRect.isSameSize = function (rc) {
		return ((this.width == rc.width) && (this.height == rc.height));
	};

	_pSizeRect = null;
}

if (!nexacro.Decimal) {
	nexacro.Decimal = function (v1, v2) {
		if (!this instanceof nexacro.Decimal) {
			return new nexacro.Decimal(v1, v2);
		}

		this.hi = 0.0;
		this.lo = 0.0;
		if (v2 == null) {
			if (typeof v1 == "boolean") {
				if (v1) {
					this.hi = 1;
				}
				else {
					this.hi = 0;
				}
			}
			else if (typeof v1 == "number") {
				this._parse(v1.toString());
			}
			else if (typeof v1 == 'object' && v1 instanceof nexacro.Decimal) {
				this.hi = v1.hi;
				this.lo = v1.lo;
			}
			else {
				this._parse(v1);
			}
		}
		else {
			this.hi = (v1 - 0.0);
			this.lo = (v2 - 0.0);
		}

		return this;
	};
	nexacro.Decimal._fraction_10 = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14, 1e15, 1e16, 1e17, 1e18, 1e19, 1e20, 1e21, 1e22, 1e23, 1e24, 1e25, 1e26, 1e27, 1e28, 1e29, 1e30, 1e31, 1e32, 1e33, 1e34, 1e35, 1e36, 1e37, 1e38, 1e39, 1e40, 1e41, 1e42, 1e43, 1e44, 1e45, 1e46, 1e47, 1e48, 1e49, 1e50, 1e51, 1e52, 1e53, 1e54, 1e55, 1e56, 1e57, 1e58, 1e59, 1e60, 1e61, 1e62, 1e63, 1e64, 1e65, 1e66, 1e67, 1e68, 1e69, 1e70, 1e71, 1e72, 1e73, 1e74, 1e75, 1e76, 1e77, 1e78, 1e79, 1e80, 1e81, 1e82, 1e83, 1e84, 1e85, 1e86, 1e87, 1e88, 1e89, 1e90, 1e91, 1e92, 1e93, 1e94, 1e95, 1e96, 1e97, 1e98, 1e99, 1e100, 1e101, 1e102, 1e103, 1e104, 1e105, 1e106, 1e107, 1e108, 1e109, 1e110, 1e111, 1e112, 1e113, 1e114, 1e115, 1e116, 1e117, 1e118, 1e119, 1e120, 1e121, 1e122, 1e123, 1e124, 1e125, 1e126, 1e127, 1e128, 1e129, 1e130, 1e131, 1e132, 1e133, 1e134, 1e135, 1e136, 1e137, 1e138, 1e139, 1e140, 1e141, 1e142, 1e143, 1e144, 1e145, 1e146, 1e147, 1e148, 1e149, 1e150, 1e151, 1e152, 1e153, 1e154, 1e155, 1e156, 1e157, 1e158, 1e159, 1e160, 1e161, 1e162, 1e163, 1e164, 1e165, 1e166, 1e167, 1e168, 1e169, 1e170, 1e171, 1e172, 1e173, 1e174, 1e175, 1e176, 1e177, 1e178, 1e179, 1e180, 1e181, 1e182, 1e183, 1e184, 1e185, 1e186, 1e187, 1e188, 1e189, 1e190, 1e191, 1e192, 1e193, 1e194, 1e195, 1e196, 1e197, 1e198, 1e199, 1e200, 1e201, 1e202, 1e203, 1e204, 1e205, 1e206, 1e207, 1e208, 1e209, 1e210, 1e211, 1e212, 1e213, 1e214, 1e215, 1e216, 1e217, 1e218, 1e219, 1e220, 1e221, 1e222, 1e223, 1e224, 1e225, 1e226, 1e227, 1e228, 1e229, 1e230, 1e231, 1e232, 1e233, 1e234, 1e235, 1e236, 1e237, 1e238, 1e239, 1e240, 1e241, 1e242, 1e243, 1e244, 1e245, 1e246, 1e247, 1e248, 1e249, 1e250, 1e251, 1e252, 1e253, 1e254, 1e255, 1e256, 1e257, 1e258, 1e259, 1e260, 1e261, 1e262, 1e263, 1e264, 1e265, 1e266, 1e267, 1e268, 1e269, 1e270, 1e271, 1e272, 1e273, 1e274, 1e275, 1e276, 1e277, 1e278, 1e279, 1e280, 1e281, 1e282, 1e283, 1e284, 1e285, 1e286, 1e287, 1e288, 1e289, 1e290, 1e291, 1e292, 1e293, 1e294, 1e295, 1e296, 1e297, 1e298, 1e299, 1e300, 1e301, 1e302, 1e303, 1e304, 1e305, 1e306, 1e307, 1e308
	];
	nexacro.Decimal._QD_SPLITTER = 134217729.0;
	nexacro.Decimal._zero_strs = ['', '0', '00', '000', '0000', '00000', '000000', '0000000', '00000000'];

	nexacro.Decimal._magnitude = function (x) {
		var dAbs = Math.abs(x);
		var dLog10 = Math.log(dAbs) * Math.LOG10E;
		var nMag = Math.floor(dLog10);

		if (dAbs >= nexacro.Decimal._fraction_10[nMag + 1]) {
			return nMag + 2;
		}
		return nMag + 1;
	};
	nexacro.Decimal._getPow = function (n, dec) {
		dec.setDouble(1.0);
		while (n > 0) {
			if (n >= 14) {
				dec.mulDouble(1e14);
			}
			else {
				dec.mulDouble(nexacro.Decimal._fraction_10[n]);
			}
			n -= 14;
		}
	};

	var _pDecimal = nexacro.Decimal.prototype;

	_pDecimal._parse = function (numstr) {
		this.hi = 0;
		this.lo = 0;

		var pos = 0;

		if (!numstr) {
			return;
		}

		var len = numstr.length;

		var ch;
		while (pos < len) {
			ch = numstr.charAt(pos);
			if (ch != ' ' && ch != '\t') {
				break;
			}
			pos++;
		}

		if (pos >= len) {
			this.hi = Number.NaN;
			return;
		}

		var sign = 0;
		ch = numstr.charAt(pos);
		if (ch == '-') {
			sign = 1;
			pos++;
		}
		else if (ch == '+') {
			pos++;
		}

		var ipos = pos;
		var fpos = pos;
		while (fpos < len) {
			ch = numstr.charAt(fpos);
			if (ch < '0' || ch > '9') {
				break;
			}
			fpos++;
		}

		var digits;
		var frac_offset = 0;

		var tpos = ipos;
		while (tpos < fpos) {
			pos = tpos;
			tpos += 9;
			if (tpos > fpos) {
				tpos = fpos;
				frac_offset = tpos - pos;
			}
			else {
				frac_offset = 9;
			}

			digits = 0;
			while (pos < tpos) {
				digits *= 10;
				ch = numstr.charAt(pos++);
				digits += (ch - '0');
			}

			this.mulDouble(nexacro.Decimal._fraction_10[frac_offset]);
			this.addDouble(digits);
		}

		var epos, dfrac = 0;
		ch = numstr.charAt(fpos);
		if (ch == '.') {
			fpos++;
			pos = fpos;
			while (pos < len) {
				ch = numstr.charAt(pos);
				if (ch < '0' || ch > '9') {
					break;
				}
				pos++;
			}
			epos = pos;

			tpos = fpos;
			while (tpos < epos) {
				pos = tpos;
				tpos += 9;
				if (tpos > epos) {
					tpos = epos;
					frac_offset = tpos - pos;
				}
				else {
					frac_offset = 9;
				}

				digits = 0;
				while (pos < tpos) {
					digits *= 10;
					ch = numstr.charAt(pos++);
					digits += (ch - '0');
				}

				this.mulDouble(nexacro.Decimal._fraction_10[frac_offset]);
				this.addDouble(digits);
				dfrac += frac_offset;
			}
		}
		else {
			epos = fpos;
		}

		ch = numstr.charAt(epos);
		digits = 0;
		if (ch == 'e' || ch == 'E') {
			var negf;
			epos++;
			ch = numstr.charAt(epos);
			if (ch == '-') {
				negf = 1;
				epos++;
			}
			else if (ch == '+') {
				negf = 0;
				epos++;
			}
			else {
				negf = 0;
			}

			pos = epos;
			while (pos < len) {
				ch = numstr.charAt(pos);
				if (ch < '0' || ch > '9') {
					break;
				}
				pos++;
			}
			len = pos + 1;
			if (len > numstr.length) {
				len = numstr.length;
			}

			pos = epos;
			while (pos < len) {
				digits *= 10;
				ch = numstr.charAt(pos++);
				digits += (ch - '0');
			}

			if (digits >= 308) {
				if (negf) {
					this.hi = 0.0;
					this.lo = 0.0;
				}
				else {
					this.hi = (sign ? -Infinity : Infinity);
					this.lo = 0.0;
				}
				return;
			}
		}

		var scale = new nexacro.Decimal();
		if (dfrac > 0) {
			nexacro.Decimal._getPow(dfrac, scale);
			this.divDecimal(scale);
		}
		else {
			nexacro.Decimal._getPow(dfrac, scale);
			this.mulDecimal(scale);
		}


		if (digits > 0) {
			nexacro.Decimal._getPow(digits, scale);
			if (negf) {
				this.divDecimal(scale);
			}
			else {
				this.mulDecimal(scale);
			}
		}

		if (sign) {
			this.hi = -this.hi;
			this.lo = -this.lo;
		}
	};

	_pDecimal.setDouble = function (hi) {
		if (typeof hi != 'number') {
			throw new TypeError("Invalid arguments type!");
		}

		this.hi = hi;
		this.lo = 0.0;
	};

	_pDecimal.setDecimal = function (dec) {
		if (!dec instanceof nexacro.Decimal) {
			throw new TypeError("Invalid arguments type!");
		}

		this.hi = dec.hi;
		this.lo = dec.lo;
	};

	_pDecimal.setString = function (numstr) {
		if (typeof numstr != 'string') {
			throw new TypeError("Invalid arguments type!");
		}

		this._parse(numstr);
	};

	_pDecimal.isZero = function () {
		return (this.hi == 0.0 && this.lo == 0.0);
	};
	_pDecimal.isEqual = function (dec) {
		if (!(dec instanceof nexacro.Decimal)) {
			throw new TypeError("Invalid arguments type!");
		}

		return (this.hi == dec.hi && this.lo == dec.lo);
	};
	_pDecimal.isInfinity = function () {
		return (this.hi == Infinity || this.hi == -Infinity);
	};
	_pDecimal.isNaN = function () {
		return (this.hi != this.hi);
	};
	_pDecimal.isNaNOrInf = function () {
		return (this.hi == Infinity || this.hi == -Infinity || this.hi != this.hi);
	};
	_pDecimal.isNegative = function () {
		return this.hi < 0.0 || (this.hi == 0.0 && this.lo < 0.0);
	};

	_pDecimal.addDouble = function (dval) {
		var H, S, s, e;
		S = this.hi + dval;
		e = S - this.hi;
		s = S - e;
		s = (dval - e) + (this.hi - s);
		e = s + this.lo;
		H = S + e;
		e = e + (S - H);

		this.hi = H + e;
		this.lo = e + (H - this.hi);
	};

	_pDecimal.addDecimal = function (dec) {
		var H, h, T, t, S, s, e, f;
		S = this.hi + dec.hi;
		T = this.lo + dec.lo;
		e = S - this.hi;
		f = T - this.lo;
		s = S - e;
		t = T - f;
		s = (dec.hi - e) + (this.hi - s);
		t = (dec.lo - f) + (this.lo - t);
		e = s + T;
		H = S + e;
		h = e + (S - H);
		e = t + h;

		this.hi = H + e;
		this.lo = e + (H - this.hi);
	};

	_pDecimal.subDouble = function (dval) {
		var H, S, s, e;
		S = this.hi - dval;
		e = S - this.hi;
		s = S - e;
		s = (-dval - e) + (this.hi - s);
		e = s + this.lo;
		H = S + e;
		e = e + (S - H);

		this.hi = H + e;
		this.lo = e + (H - this.hi);
	};

	_pDecimal.subDecimal = function (dec) {
		var H, h, T, t, S, s, e, f;
		S = this.hi - dec.hi;
		T = this.lo - dec.lo;
		e = S - this.hi;
		f = T - this.lo;
		s = S - e;
		t = T - f;
		s = (-dec.hi - e) + (this.hi - s);
		t = (-dec.lo - f) + (this.lo - t);
		e = s + T;
		H = S + e;
		h = e + (S - H);
		e = t + h;

		this.hi = H + e;
		this.lo = e + (H - this.hi);
	};

	_pDecimal.mulDouble = function (dval) {
		var hx, tx, hy, ty, C, c;
		C = nexacro.Decimal._QD_SPLITTER * this.hi;
		hx = C - this.hi;
		c = nexacro.Decimal._QD_SPLITTER * dval;
		hx = C - hx;
		tx = this.hi - hx;
		hy = c - dval;
		C = this.hi * dval;
		hy = c - hy;
		ty = dval - hy;

		c = ((((hx * hy - C) + hx * ty) + tx * hy) + tx * ty) + (this.lo * dval);
		this.hi = C + c;
		hx = C - this.hi;
		this.lo = c + hx;
	};

	_pDecimal.mulDecimal = function (dec) {
		var hx, tx, hy, ty, C, c;
		C = nexacro.Decimal._QD_SPLITTER * this.hi;
		hx = C - this.hi;
		c = nexacro.Decimal._QD_SPLITTER * dec.hi;
		hx = C - hx;
		tx = this.hi - hx;
		hy = c - dec.hi;
		C = this.hi * dec.hi;
		hy = c - hy;
		ty = dec.hi - hy;

		c = ((((hx * hy - C) + hx * ty) + tx * hy) + tx * ty) + (this.hi * dec.lo + this.lo * dec.hi);
		this.hi = C + c;
		hx = C - this.hi;
		this.lo = c + hx;
	};

	_pDecimal.divDouble = function (dval) {
		var hc, tc, hy, ty, C, c, U, u;
		C = this.hi / dval;
		c = nexacro.Decimal._QD_SPLITTER * C;
		hc = c - C;
		u = nexacro.Decimal._QD_SPLITTER * dval;
		hc = c - hc;
		tc = C - hc;
		hy = u - dval;
		U = C * dval;
		hy = u - hy;
		ty = dval - hy;
		u = (((hc * hy - U) + hc * ty) + tc * hy) + tc * ty;
		c = ((((this.hi - U) - u) + this.lo)) / dval;

		this.hi = C + c;
		this.lo = (C - this.hi) + c;
	};
	_pDecimal.divDecimal = function (dec) {
		var hc, tc, hy, ty, C, c, U, u;
		C = this.hi / dec.hi;
		c = nexacro.Decimal._QD_SPLITTER * C;
		hc = c - C;
		u = nexacro.Decimal._QD_SPLITTER * dec.hi;
		hc = c - hc;
		tc = C - hc;
		hy = u - dec.hi;
		U = C * dec.hi;
		hy = u - hy;
		ty = dec.hi - hy;
		u = (((hc * hy - U) + hc * ty) + tc * hy) + tc * ty;
		c = ((((this.hi - U) - u) + this.lo) - C * dec.lo) / dec.hi;

		this.hi = C + c;
		this.lo = (C - this.hi) + c;
	};

	_pDecimal.modDouble = function (dval) {
		var r = new nexacro.Decimal(this);
		r.divDouble(dval);
		r.floor();
		r.mulDouble(dval);
		this.subDecimal(r);
	};
	_pDecimal.modDecimal = function (dec) {
		var r = new nexacro.Decimal(this);
		r.divDecimal(dec);
		r.floor();
		r.mulDecimal(dec);
		this.subDecimal(r);
	};

	_pDecimal.abs = function () {
		if (this.isNegative()) {
			this.hi = -this.hi;
			this.lo = -this.lo;
		}
		return this;
	};

	_pDecimal.floor = function () {
		var fhi = Math.floor(this.hi);
		if (fhi == this.hi) {
			this.lo = Math.floor(this.lo);
		}
		else {
			this.hi = fhi;
			this.lo = 0.0;
		}
		return this;
	};
	_pDecimal.ceil = function () {
		var fhi = Math.ceil(this.hi);
		if (fhi == this.hi) {
			this.lo = Math.ceil(this.lo);
		}
		else {
			this.hi = fhi;
			this.lo = 0.0;
		}
		return this;
	};
	_pDecimal.round = function () {
		this.addDouble(0.5);
		return this.floor();
	};
	_pDecimal.trunc = function () {
		if (this.hi > 0.0) {
			return this.floor();
		}
		else {
			return this.ceil();
		}
	};

	_pDecimal.toString = function () {
		if (this.isZero()) {
			return "0";
		}

		if (this.isNaN()) {
			return "NaN";
		}

		var nMag = nexacro.Decimal._magnitude(this.hi);
		if (nMag >= -5 && nMag <= 24) {
			return this._toStandardStr();
		}
		return this._toScientificStr();
	};

	_pDecimal.valueOf = function () {
		return this.hi + this.lo;
	};
	_pDecimal._getCVT = function () {
		var buf = '';
		var sign = 0;
		var y = new nexacro.Decimal(this);

		if (this.hi < 0.0 || this.hi == 0.0 && this.lo < 0.0) {
			sign = 1;
			y.abs();
		}

		var nMag = nexacro.Decimal._magnitude(y.hi);
		var scale = new nexacro.Decimal();
		if (nMag > 8) {
			nexacro.Decimal._getPow(nMag - 8, scale);
			y.divDecimal(scale);
		}
		else {
			nexacro.Decimal._getPow(nMag - 8, scale);
			y.mulDecimal(scale);
		}

		var pos = 0, len;
		var digit;
		var p;
		while (true) {
			digit = y.hi | 0;
			if (digit < 0) {
				break;
			}

			p = String(digit);
			len = p.length;

			if (len > 8) {
				buf += '99999999';
				pos += 8;
			}
			else if (pos == 0) {
				buf += p;
				pos += len;
			}
			else {
				buf += nexacro.Decimal._zero_strs[8 - len];
				buf += p;
				pos += 8;
			}

			if (pos >= 32) {
				pos = 32;
				break;
			}

			y.subDouble(digit);
			y.mulDouble(1e8);
		}


		if (pos >= 32 && buf.charAt(pos - 1) >= '5') {
			var round_pos = -1;
			while (pos > 0) {
				--pos;
				if (buf.charAt(pos - 1) < '9') {
					round_pos = pos - 1;
					break;
				}
				round_pos = pos - 1;
			}

			if (round_pos > -1) {
				buf = buf.substr(0, round_pos) + (Number(buf.charAt(round_pos)) + 1);
			}
		}
		else {
			while (pos > 0 && buf.charAt(pos - 1) == '0') {
				--pos;
			}
		}

		var _cvt_info = new Object;
		_cvt_info.dec = nMag;
		_cvt_info.sign = sign;
		_cvt_info.pos = pos;
		_cvt_info.buf = buf.substr(0, pos);
		return _cvt_info;
	};

	_pDecimal._toScientificStr = function () {
		var str = '', digits = 0;
		var _cvt = this._getCVT();
		if (_cvt == null || _cvt.pos == 0) {
			return '0';
		}

		digits = _cvt.pos;
		if (_cvt.sign) {
			str = '-';
		}

		str += _cvt.buf.charAt(0);
		if (digits == 1) {
			return str;
		}

		str += '.';
		str += _cvt.buf.substring(1);

		str += 'e+';
		str += (_cvt.dec - 1);

		return str;
	};
	_pDecimal._toStandardStr = function () {
		var str = '', digits = 0, dec = 0;
		var _cvt = this._getCVT();
		if (_cvt == null || _cvt.pos == 0) {
			return '0';
		}

		if (_cvt.sign) {
			str = '-';
		}

		dec = _cvt.dec;
		digits = _cvt.pos;
		var buf = _cvt.buf;
		if (dec <= 0) {
			str += '0.';
			for (var i = dec; i < 0; i++) {
				str += '0';
			}
			str += buf.substring(digits - (digits + (dec - 1)));
		}
		else if (digits > dec) {
			str += buf.substring(0, dec);
			str += '.';
			str += buf.substring(dec);
		}
		else {
			str += buf;
			if ((dec - digits) > 0) {
				for (var i = 0; i < (dec - digits); i++) {
					str += '0';
				}
			}
		}
		return str;
	};

	_pDecimal.toFixed = function (fractionDigits) {
		var decimal_point = ".";
		var thousands_sep = ",";
		var grouping = 0;
		var positive_sign = "";
		var negative_sign = "-";
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this, decimal_point, thousands_sep, grouping, fractionDigits, true);

		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pDecimal.toExponential = function (fractionDigits) {
	};

	_pDecimal.toPrecision = function (precision) {
	};

	_pDecimal.toLocaleString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var decimal_point = locale_info.decimal_point;
		var thousands_sep = locale_info.thousands_sep;
		var grouping = locale_info.grouping;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this, decimal_point, thousands_sep, grouping, 3);


		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pDecimal.toLocaleCurrencyString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var mon_decimal_point = locale_info.mon_decimal_point;
		var mon_thousands_sep = locale_info.mon_thousands_sep;
		var int_currency_code = locale_info.int_curr_symbol;
		var currency_symbol = locale_info.currency_symbol.trim();
		var mon_grouping = locale_info.mon_grouping;
		var int_frac_digits = locale_info.int_frac_digits;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var p_cs_precedes = locale_info.p_cs_precedes;
		var p_sep_by_space = locale_info.p_sep_by_space;
		var n_cs_precedes = locale_info.n_cs_precedes;
		var n_sep_by_space = locale_info.n_sep_by_space;
		var p_sign_position = locale_info.p_sign_posn;
		var n_sign_position = locale_info.n_sign_posn;
		var mon_n_sign_position = locale_info.mon_n_sign_posn;
		if (mon_n_sign_position != undefined) {
			n_sign_position = mon_n_sign_position;
		}

		var space_char = "\u0020";
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this, mon_decimal_point, mon_thousands_sep, mon_grouping, int_frac_digits, true);

		if (isNegative) {
			if (n_cs_precedes) {
				switch (n_sign_position) {
					case 0:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + currency_symbol + space_char + locale_string + ")";
									}
									break;
								case 2:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = negative_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = negative_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = negative_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + locale_string + negative_sign;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + space_char + locale_string + negative_sign;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + locale_string + space_char + negative_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = negative_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = negative_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = negative_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + negative_sign + locale_string;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + negative_sign + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + space_char + negative_sign + locale_string;
									}
									break;
							}
						}
						break;
				}
			}
			else {
				switch (n_sign_position) {
					case 0:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = "(" + locale_string + currency_symbol + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
								case 2:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = negative_sign + locale_string + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = negative_sign + locale_string + space_char + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = negative_sign + locale_string + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + negative_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + negative_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + negative_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + negative_sign + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + negative_sign + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = locale_string + negative_sign + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + negative_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + negative_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + negative_sign;
									}
									break;
							}
						}
						break;
				}
			}
		}
		else {
			if (p_cs_precedes) {
				switch (p_sign_position) {
					case 0:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + currency_symbol + space_char + locale_string + ")";
									}
									break;
								case 2:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = positive_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = positive_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = positive_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + locale_string + positive_sign;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + space_char + locale_string + positive_sign;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + locale_string + space_char + positive_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = positive_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = positive_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = positive_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + positive_sign + locale_string;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + positive_sign + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + space_char + positive_sign + locale_string;
									}
									break;
							}
						}
						break;
				}
			}
			else {
				switch (p_sign_position) {
					case 0:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = "(" + locale_string + currency_symbol + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
								case 2:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = positive_sign + locale_string + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = positive_sign + locale_string + space_char + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = positive_sign + locale_string + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + positive_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + positive_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + positive_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + positive_sign + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + positive_sign + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = locale_string + positive_sign + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + positive_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + positive_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + positive_sign;
									}
									break;
							}
						}
						break;
				}
			}
		}

		return locale_string;
	};

	_pDecimal.toFixedLocaleString = function (locale, fractionDigits) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var decimal_point = locale_info.decimal_point;
		var thousands_sep = locale_info.thousands_sep;
		var grouping = locale_info.grouping;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this, decimal_point, thousands_sep, grouping, fractionDigits, true);

		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pDecimal._getFormattedStringValue = function (value, decimal_point, thousands_sep, grouping, frac_digits, use_fraction_digits) {
		var hi = this.hi;
		var lo = this.lo;
		var value_string = value.abs().toString().split(".");
		var integer_string = value_string[0];
		var decimal_string = value_string[1];

		if (!decimal_string) {
			decimal_string = "";
		}

		var locale_string = "";
		var grouping_value;

		if (!decimal_point) {
			decimal_point = ".";
		}

		if (!thousands_sep) {
			thousands_sep = ",";
		}

		if (grouping && grouping.length > 0) {
			grouping_value = grouping[0];
		}

		if (grouping_value <= 0) {
			grouping_value = 3;
		}

		if (integer_string.length > grouping_value && grouping_value > 0) {
			locale_string = thousands_sep + integer_string.substr(integer_string.length - grouping_value, grouping_value) + locale_string;
			integer_string = integer_string.slice(0, integer_string.length - grouping_value);
		}

		if (grouping.length > 1) {
			grouping_value = grouping[1];
		}

		if (grouping_value <= 0) {
			grouping_value = 3;
		}

		while (integer_string.length > grouping_value && grouping_value > 0) {
			locale_string = thousands_sep + integer_string.substr(integer_string.length - grouping_value, grouping_value) + locale_string;
			integer_string = integer_string.slice(0, integer_string.length - grouping_value);
		}

		locale_string = integer_string + locale_string;

		if (use_fraction_digits) {
			var i = decimal_string.length;
			var fraction_string = "";
			while (i < frac_digits) {
				fraction_string = fraction_string + "0";
				i++;
			}

			decimal_string = decimal_string + fraction_string;
			decimal_string = decimal_string.slice(0, frac_digits);
		}

		if (decimal_string) {
			locale_string = locale_string + decimal_point + decimal_string;
		}

		this.hi = hi;
		this.lo = lo;
		return locale_string;
	};
	delete _pDecimal;
}

if (!nexacro.Number) {
	nexacro.Number = function (v) {
		{

			this.value = new Number(v);
		}
	};
	var _pNumber = nexacro._createPrototype(nexacro.Object, nexacro.Number);

	nexacro.Number.prototype = _pNumber;

	_pNumber.toString = function (locale) {
		return this.value.toString();
	};

	_pNumber.valueOf = function () {
		return this.value;
	};

	_pNumber.isNegative = function () {
		return this.value < 0;
	};

	_pNumber._getFormattedStringValue = function (value, decimal_point, thousands_sep, grouping, frac_digits, use_fraction_digits) {
		var value_string = Math.abs(value).toString().split(".");

		var integer_string = value_string[0];
		var decimal_string = value_string[1];

		if (!decimal_string) {
			decimal_string = "";
		}

		var locale_string = "";
		var grouping_value;

		if (!decimal_point) {
			decimal_point = ".";
		}

		if (!thousands_sep) {
			thousands_sep = ",";
		}

		if (grouping && grouping.length > 0) {
			grouping_value = grouping[0];
		}

		if (grouping_value <= 0) {
			grouping_value = 3;
		}

		if (integer_string.length > grouping_value && grouping_value > 0) {
			locale_string = thousands_sep + integer_string.substr(integer_string.length - grouping_value, grouping_value) + locale_string;
			integer_string = integer_string.slice(0, integer_string.length - grouping_value);
		}

		if (grouping.length > 1) {
			grouping_value = grouping[1];
		}

		if (grouping_value <= 0) {
			grouping_value = 3;
		}

		while (integer_string.length > grouping_value && grouping_value > 0) {
			locale_string = thousands_sep + integer_string.substr(integer_string.length - grouping_value, grouping_value) + locale_string;
			integer_string = integer_string.slice(0, integer_string.length - grouping_value);
		}

		locale_string = integer_string + locale_string;

		if (use_fraction_digits) {
			var i = decimal_string.length;
			var fraction_string = "";
			while (i < frac_digits) {
				fraction_string = fraction_string + "0";
				i++;
			}

			decimal_string = decimal_string + fraction_string;
			decimal_string = decimal_string.slice(0, frac_digits);
		}

		if (decimal_string) {
			locale_string = locale_string + decimal_point + decimal_string;
		}

		return locale_string;
	};

	_pNumber.toLocaleString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var decimal_point = locale_info.decimal_point;
		var thousands_sep = locale_info.thousands_sep;
		var grouping = locale_info.grouping;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this.value, decimal_point, thousands_sep, grouping, 3);


		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pNumber.toLocaleCurrencyString = function (locale) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var mon_decimal_point = locale_info.mon_decimal_point;
		var mon_thousands_sep = locale_info.mon_thousands_sep;
		var int_currency_code = locale_info.int_curr_symbol;
		var currency_symbol = locale_info.currency_symbol.trim();
		var mon_grouping = locale_info.mon_grouping;
		var int_frac_digits = locale_info.int_frac_digits;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var p_cs_precedes = locale_info.p_cs_precedes;
		var p_sep_by_space = locale_info.p_sep_by_space;
		var n_cs_precedes = locale_info.n_cs_precedes;
		var n_sep_by_space = locale_info.n_sep_by_space;
		var p_sign_position = locale_info.p_sign_posn;
		var n_sign_position = locale_info.n_sign_posn;
		var mon_n_sign_position = locale_info.mon_n_sign_posn;
		if (mon_n_sign_position != undefined) {
			n_sign_position = mon_n_sign_position;
		}

		var space_char = "\u0020";
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this.value, mon_decimal_point, mon_thousands_sep, mon_grouping, int_frac_digits, true);

		if (isNegative) {
			if (n_cs_precedes) {
				switch (n_sign_position) {
					case 0:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + currency_symbol + space_char + locale_string + ")";
									}
									break;
								case 2:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = negative_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = negative_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = negative_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + locale_string + negative_sign;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + space_char + locale_string + negative_sign;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + locale_string + space_char + negative_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = negative_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = negative_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = negative_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + negative_sign + locale_string;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + negative_sign + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + space_char + negative_sign + locale_string;
									}
									break;
							}
						}
						break;
				}
			}
			else {
				switch (n_sign_position) {
					case 0:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = "(" + locale_string + currency_symbol + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
								case 2:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = negative_sign + locale_string + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = negative_sign + locale_string + space_char + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = negative_sign + locale_string + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + negative_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + negative_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + negative_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + negative_sign + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + negative_sign + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = locale_string + negative_sign + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (n_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + negative_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + negative_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + negative_sign;
									}
									break;
							}
						}
						break;
				}
			}
		}
		else {
			if (p_cs_precedes) {
				switch (p_sign_position) {
					case 0:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + currency_symbol + space_char + locale_string + ")";
									}
									break;
								case 2:
									{

										locale_string = "(" + currency_symbol + locale_string + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = positive_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = positive_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = positive_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + locale_string + positive_sign;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + space_char + locale_string + positive_sign;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + locale_string + space_char + positive_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = positive_sign + currency_symbol + locale_string;
									}
									break;
								case 1:
									{

										locale_string = positive_sign + currency_symbol + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = positive_sign + space_char + currency_symbol + locale_string;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = currency_symbol + positive_sign + locale_string;
									}
									break;
								case 1:
									{

										locale_string = currency_symbol + positive_sign + space_char + locale_string;
									}
									break;
								case 2:
									{

										locale_string = currency_symbol + space_char + positive_sign + locale_string;
									}
									break;
							}
						}
						break;
				}
			}
			else {
				switch (p_sign_position) {
					case 0:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = "(" + locale_string + currency_symbol + ")";
									}
									break;
								case 1:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
								case 2:
									{

										locale_string = "(" + locale_string + space_char + currency_symbol + ")";
									}
									break;
							}
						}
						break;
					case 1:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = positive_sign + locale_string + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = positive_sign + locale_string + space_char + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = positive_sign + locale_string + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 2:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + positive_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + positive_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + positive_sign;
									}
									break;
							}
						}
						break;
					case 3:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + positive_sign + currency_symbol;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + positive_sign + currency_symbol;
									}
									break;
								case 2:
									{

										locale_string = locale_string + positive_sign + space_char + currency_symbol;
									}
									break;
							}
						}
						break;
					case 4:
						{

							switch (p_sep_by_space) {
								case 0:
									{

										locale_string = locale_string + currency_symbol + positive_sign;
									}
									break;
								case 1:
									{

										locale_string = locale_string + space_char + currency_symbol + positive_sign;
									}
									break;
								case 2:
									{

										locale_string = locale_string + currency_symbol + space_char + positive_sign;
									}
									break;
							}
						}
						break;
				}
			}
		}

		return locale_string;
	};

	_pNumber.toFixed = function (fractionDigits) {
		var decimal_point = ".";
		var thousands_sep = ",";
		var grouping = 0;
		var positive_sign = "";
		var negative_sign = "-";
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this.value, decimal_point, thousands_sep, grouping, fractionDigits, true);

		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pNumber.toFixedLocaleString = function (locale, fractionDigits) {
		var locale_info = nexacro.Locale.getLocaleInfo(locale);
		var decimal_point = locale_info.decimal_point;
		var thousands_sep = locale_info.thousands_sep;
		var grouping = locale_info.grouping;
		var positive_sign = locale_info.positive_sign;
		var negative_sign = locale_info.negative_sign;
		var isNegative = this.isNegative();

		var locale_string = this._getFormattedStringValue(this.value, decimal_point, thousands_sep, grouping, fractionDigits, true);

		if (isNegative) {
			locale_string = negative_sign + locale_string;
		}
		else {
			locale_string = positive_sign + locale_string;
		}

		return locale_string;
	};

	_pNumber.toPrecesion = function (precision) {
	};

	_pNumber.toExponential = function () {
	};

	delete _pNumber;
}
if (!nexacro.BindableValue) {
	nexacro.BindableValue = function (def) {
		this._bindtype = 0;
		this._default = def;
		this._value = def;
	};
	var _pBindableValue = nexacro._createPrototype(nexacro.Object, nexacro.BindableValue);
	nexacro.BindableValue.prototype = _pBindableValue;
	_pBindableValue._type_name = "BindableValue";

	_pBindableValue.valueOf = function () {
		return this._value;
	};
	_pBindableValue.toString = function () {
		return this._value + "";
	};
	_pBindableValue._set = function (v) {
		var str = this._default;
		if (v) {
			str = v.toString();
		}

		if (v !== this._value) {
			if (v === "") {
				this._value = this._default;
				this._bindtype = 0;
			}
			else {
				this._bindtype = 0;
				var tag = str.substr(0, 4);
				tag = tag.toUpperCase();
				if (tag == "EXPR" || tag == "BIND") {
					var chk = str.substr(4, 1);
					if (tag == "EXPR" && chk == "(") {
						str = str.substr(0, 4) + ":" + str.substr(4);
					}
					else if (chk != ":") {
						this._value = v;
						return;
					}

					var expr = str.substr(4).trim();
					if (tag == "BIND") {
						this._bindtype = 1;
					}
					else {
						this._bindtype = 2;
					}
					this._bindexpr = expr.substr(1);
					this._value = str.substr(0, 4) + ":" + this._bindexpr;
				}
				else {
					this._value = v;
				}
			}
		}
	};
	_pBindableValue._set_intval = function (v) {
		var str = v.toString();
		if (v != this._value) {
			if (v == "") {
				this._value = this._default;
				this._bindtype = 0;
			}
			else {
				this._bindtype = 0;
				var tag = str.substr(0, 4);
				tag = tag.toUpperCase();
				if (tag == "EXPR" || tag == "BIND") {
					var chk = str.substr(4, 1);
					if (tag == "EXPR" && chk == "(") {
						str = str.substr(0, 4) + ":" + str.substr(4);
					}
					if (tag == "BIND") {
						this._bindtype = 1;
					}
					else {
						this._bindtype = 2;
					}

					var expr = str.substr(4).trim();
					if (/^expr(\s*):|^bind(\s*):/.test(str)) {
						this._bindexpr = expr.substr(1);
					}
					else {
						this._bindexpr = expr.substr(1, expr.length - 1);
					}
					this._value = str;
				}
				else {
					this._value = (v | 0);
				}
			}
		}
	};

	_pBindableValue._set_enumval = function (v, enumvals) {
		var str = v.toString();
		if (v != this._value) {
			if (v == "") {
				this._value = this._default;
				this._bindtype = 0;
			}
			else {
				this._bindtype = 0;
				var tag = str.substr(0, 4);
				tag = tag.toUpperCase();
				if (tag == "EXPR" || tag == "BIND") {
					var chk = str.substr(4, 1);
					if (tag == "EXPR" && chk == "(") {
						str = str.substr(0, 4) + ":" + str.substr(4);
					}
					if (tag == "BIND") {
						this._bindtype = 1;
					}
					else {
						this._bindtype = 2;
					}

					var expr = str.substr(4).trim();
					if (/^expr(\s*):|^bind(\s*):/.test(str)) {
						this._bindexpr = expr.substr(1);
					}
					else {
						this._bindexpr = expr.substr(1, expr.length - 1);
					}
					this._value = str;
				}
				else {
					var len = enumvals.length;
					for (var i = 0; i < len; i++) {
						if (v == enumvals[i]) {
							this._value = v;
							return;
						}
					}
					this._value = this._default;
				}
			}
		}
	};
}


if (!nexacro.Image) {
	nexacro.Image = function (target) {
		if (target) {
			this._target = target;
		}

		this._event_list = {
			"onload" : 1, 
			"onerror" : 1
		};
	};

	_pImageObject = nexacro._createPrototype(nexacro.EventSinkObject, nexacro.Image);
	nexacro.Image.prototype = _pImageObject;
	_pImageObject._type_name = "Image";

	_pImageObject.height = 0;
	_pImageObject.width = 0;
	_pImageObject.src = "";
	_pImageObject._base64str = "";
	_pImageObject._handle = null;

	_pImageObject.setBase64String = function (v) {
		if (typeof v != "string") {
			return;
		}

		if (v == "") {
			this._base64str = v;
		}
		else if (v.substring(0, 10).toLowerCase() != "data:image") {
			this._base64str = "data:image;base64," + v;
		}
		else if (v.substring(0, 17).toLowerCase() != "data:image;base64") {
			var comma_idx = v.indexOf(",");
			if (comma_idx > -1) {
				var tmp = v.slice(comma_idx + 1, v.legnth);
				this._base64str = "data:image;base64," + tmp;
			}
		}
	};

	_pImageObject.getBase64String = function () {
		return this._base64str;
	};

	_pImageObject.set_src = function (v) {
		if (this.src != v) {
			this.src = v;
			this._handle = nexacro._getImageObject(v, this.on_load, this);
		}
	};

	_pImageObject.on_load = function (imageurl, width, height, _handle, errstatus, fireerrorcode, returncode, locationurl) {
		this.width = width;
		this.height = height;

		if (errstatus && errstatus < 0) {
			var errormsg;
			if (fireerrorcode) {
				errormsg = nexacro._GetSystemErrorMsg(this, fireerrorcode);
			}

			this.on_fire_onerror(this, fireerrorcode, errormsg, returncode, imageurl, locationurl);
		}
		else {
			if (_handle) {
				this._handle = _handle;
			}
			this.on_fire_onload(this, imageurl);
		}
	};

	_pImageObject.on_fire_onload = function (obj, url) {
		if (this.onload && this.onload._has_handlers) {
			var evt = new nexacro.LoadEventInfo(obj, "onload", url);
			this.onload._fireEvent(obj, evt);
		}
	};

	_pImageObject.on_fire_onerror = function (obj, errorcode, errormsg, statuscode, requesturi, locationuri) {
		if (this.onerror && this.onerror._has_handlers) {
			var evt = new nexacro.ErrorEventInfo(obj, "onerror", errorcode, errormsg, this, statuscode, requesturi, locationuri);
			this.onerror._fireEvent(this, evt);
		}
	};
	delete _pImageObject;
}

if (!nexacro.HotKey) {
	nexacro.HotKey = function (value) {
		this._load(value);
	};

	var _pHotKey = nexacro._createPrototype(nexacro.Object, nexacro.HotKey);
	nexacro.HotKey.prototype = _pHotKey;

	_pHotKey._modifierkey = 0;
	_pHotKey._keycode = 0;
	_pHotKey._is_registered = false;

	_pHotKey._type_name = "HotKey";

	_pHotKey._keytable = {
		"BACK" : 0x08, 
		"TAB" : 0x09, 
		"RETURN" : 0x0d, 
		"PAUSE" : 0x13, 
		"CAPITAL" : 0x14, 
		"ESCAPE" : 0x1b, 
		"SPACE" : 0x20, 
		"PRIOR" : 0x21, 
		"NEXT" : 0x22, 
		"END" : 0x23, 
		"HOME" : 0x24, 
		"LEFT" : 0x25, 
		"UP" : 0x26, 
		"RIGHT" : 0x27, 
		"DOWN" : 0x28, 
		"INSERT" : 0x2d, 
		"DELETE" : 0x2e, 
		"NUMPAD0" : 0x60, 
		"NUMPAD1" : 0x61, 
		"NUMPAD2" : 0x62, 
		"NUMPAD3" : 0x63, 
		"NUMPAD4" : 0x64, 
		"NUMPAD5" : 0x65, 
		"NUMPAD6" : 0x66, 
		"NUMPAD7" : 0x67, 
		"NUMPAD8" : 0x68, 
		"NUMPAD9" : 0x69, 
		"MULTIPLY" : 0x6a, 
		"ADD" : 0x6b, 
		"SEPARATOR" : 0x6c, 
		"SUBTRACT" : 0x6d, 
		"DECIMAL" : 0x6e, 
		"DIVIDE" : 0x6f, 
		"F1" : 0x70, 
		"F2" : 0x71, 
		"F3" : 0x72, 
		"F4" : 0x73, 
		"F5" : 0x74, 
		"F6" : 0x75, 
		"F7" : 0x76, 
		"F8" : 0x77, 
		"F9" : 0x78, 
		"F10" : 0x79, 
		"F11" : 0x7a, 
		"F12" : 0x7b, 
		"NUMLOCK" : 0x90, 
		"SCROLL" : 0x91
	};

	_pHotKey._clear = function () {
		this._modifierkey = 0;
		this._keycode = 0;
	};
	_pHotKey._load = function (value) {
		this._clear();
		if (value && value != "") {
			var ar = value.split("+");
			for (var i = 0; i < ar.length - 1; i++) {
				var token = ar[i].toUpperCase().trim();
				if (token == "CTRL" || token == "CONTROL") {
					this._modifierkey += 0x01;
				}
				if (token == "ALT") {
					this._modifierkey += 0x02;
				}
				if (token == "SHIFT") {
					this._modifierkey += 0x04;
				}
			}
			var keycode_str = ar[ar.length - 1].toUpperCase().trim();
			var keycode = this._convToKeyCode(keycode_str);
			if (keycode < 0) {
				this._clear();
				return;
			}

			this._keycode = keycode;
		}
	};
	_pHotKey._isEmpty = function () {
		if (this._keycode == 0) {
			return true;
		}
		return false;
	};
	_pHotKey._convToKeyCode = function (value) {
		var ret = -1;
		if (!value) {
			return ret;
		}

		if (value.length == 1) {
			if ((value >= 'A' && value <= 'Z') || (value >= '0' && value <= '9')) {
				ret = value.charCodeAt(0);
			}
			else if (value >= 'a' && value <= 'z') {
				ret = value.toUpperCase().charCodeAt(0);
			}
		}
		else {
			if (this._keytable[value]) {
				ret = this._keytable[value];
			}
		}

		return ret;
	};
	_pHotKey._convToKeyString = function (value) {
		var ret = -1;
		if (!value) {
			return ret;
		}

		if ((value >= 65 && value <= 90) || (value >= 48 && value <= 57)) {
			ret = String.fromCharCode(value);
		}
		else {
			for (var keystr in this._keytable) {
				if (value == this._keytable[keystr]) {
					ret = keystr;
					break;
				}
			}
		}

		return ret;
	};
	_pHotKey._toString = function () {
		var ret = "";
		if ((this._modifierkey & 0x01) == 0x01) {
			ret += "CTRL";
		}
		if ((this._modifierkey & 0x02) == 0x02) {
			if (ret.length != 0) {
				ret += "+";
			}
			ret += "ALT";
		}
		if ((this._modifierkey & 0x04) == 0x04) {
			if (ret.length != 0) {
				ret += "+";
			}
			ret += "SHIFT";
		}
		if (ret.length != 0) {
			ret += "+";
		}
		ret += this._convToKeyString(this._keycode);

		return ret;
	};

	delete _pHotKey;
}
