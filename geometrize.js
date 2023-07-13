(function ($hx_exports, $global) { "use strict";
$hx_exports["geometrize"] = $hx_exports["geometrize"] || {};
$hx_exports["geometrize"]["bitmap"] = $hx_exports["geometrize"]["bitmap"] || {};
;$hx_exports["geometrize"]["exporter"] = $hx_exports["geometrize"]["exporter"] || {};
;$hx_exports["geometrize"]["runner"] = $hx_exports["geometrize"]["runner"] || {};
;$hx_exports["geometrize"]["shape"] = $hx_exports["geometrize"]["shape"] || {};
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
Std.random = function(x) {
	if(x <= 0) {
		return 0;
	} else {
		return Math.floor(Math.random() * x);
	}
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe_io_Output = function() { };
haxe_io_Output.__name__ = true;
var _$Sys_FileOutput = function(fd) {
	this.fd = fd;
};
_$Sys_FileOutput.__name__ = true;
_$Sys_FileOutput.__super__ = haxe_io_Output;
_$Sys_FileOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(c) {
		js_node_Fs.writeSync(this.fd,String.fromCodePoint(c));
	}
	,writeBytes: function(s,pos,len) {
		var data = s.b;
		return js_node_Fs.writeSync(this.fd,js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length),pos,len);
	}
	,writeString: function(s,encoding) {
		js_node_Fs.writeSync(this.fd,s);
	}
	,flush: function() {
		js_node_Fs.fsyncSync(this.fd);
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
});
var haxe_io_Input = function() { };
haxe_io_Input.__name__ = true;
haxe_io_Input.prototype = {
	readByte: function() {
		throw new haxe_exceptions_NotImplementedException(null,null,{ fileName : "haxe/io/Input.hx", lineNumber : 53, className : "haxe.io.Input", methodName : "readByte"});
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		try {
			while(k > 0) {
				b[pos] = this.readByte();
				++pos;
				--k;
			}
		} catch( _g ) {
			if(!((haxe_Exception.caught(_g).unwrap()) instanceof haxe_io_Eof)) {
				throw _g;
			}
		}
		return len - k;
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = new haxe_io_Bytes(new ArrayBuffer(nbytes));
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) {
				throw haxe_Exception.thrown(haxe_io_Error.Blocked);
			}
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) {
			return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24;
		} else {
			return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
		}
	}
	,readString: function(len,encoding) {
		var b = new haxe_io_Bytes(new ArrayBuffer(len));
		this.readFullBytes(b,0,len);
		return b.getString(0,len,encoding);
	}
};
var _$Sys_FileInput = function(fd) {
	this.fd = fd;
};
_$Sys_FileInput.__name__ = true;
_$Sys_FileInput.__super__ = haxe_io_Input;
_$Sys_FileInput.prototype = $extend(haxe_io_Input.prototype,{
	readByte: function() {
		var buf = js_node_buffer_Buffer.alloc(1);
		try {
			js_node_Fs.readSync(this.fd,buf,0,1,null);
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			if(e.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(e));
			}
		}
		return buf[0];
	}
	,readBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		try {
			return js_node_Fs.readSync(this.fd,buf,pos,len,null);
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			if(e.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(e));
			}
		}
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
});
var UInt = {};
UInt.toFloat = function(this1) {
	var int = this1;
	if(int < 0) {
		return 4294967296.0 + int;
	} else {
		return int + 0.0;
	}
};
var arguable_ArgValues = function(_any,_length,_valid,_invalid) {
	this.any = _any;
	this.length = _length;
	this.valid = _valid;
	this.invalid = _invalid;
};
arguable_ArgValues.__name__ = true;
arguable_ArgValues.prototype = {
	has: function(arg) {
		return this.get(arg) != null;
	}
	,get: function(arg) {
		var _g = [];
		var _g1 = 0;
		var _g2 = this.valid;
		while(_g1 < _g2.length) {
			var v = _g2[_g1];
			++_g1;
			if(v.name == arg) {
				_g.push(v);
			}
		}
		var _found = _g;
		if(_found.length > 0) {
			return _found[0];
		} else {
			return null;
		}
	}
	,getAll: function(arg) {
		var _g = [];
		var _g1 = 0;
		var _g2 = this.valid;
		while(_g1 < _g2.length) {
			var v = _g2[_g1];
			++_g1;
			if(v.name == arg) {
				_g.push(v);
			}
		}
		var _found = _g;
		return _found;
	}
};
var arguable_ArgParser = function() { };
arguable_ArgParser.__name__ = true;
arguable_ArgParser.parse = function(args) {
	var _stack = new arguable_Stack();
	var _results;
	var _args_invalid = [];
	var _args_valid = [];
	if(args.length > 0) {
		var _g = 0;
		while(_g < args.length) {
			var _arg = args[_g];
			++_g;
			if(HxOverrides.substr(_arg,0,arguable_ArgParser.delimiter.length) == arguable_ArgParser.delimiter) {
				if(!_stack.empty()) {
					if(_stack.length == 2) {
						_args_valid.push({ value : _stack.pop(), name : _stack.pop()});
					} else {
						_args_valid.push({ value : "", name : _stack.pop()});
					}
				}
				_stack.push(HxOverrides.substr(_arg,arguable_ArgParser.delimiter.length,_arg.length - arguable_ArgParser.delimiter.length));
			} else if(_stack.length == 2) {
				_args_invalid.push({ name : _arg, value : ""});
				_args_valid.push({ value : _stack.pop(), name : _stack.pop()});
			} else if(_stack.length == 0) {
				_args_invalid.push({ name : _arg, value : ""});
			} else {
				_stack.push(_arg);
			}
		}
	}
	if(!_stack.empty()) {
		if(_stack.length == 2) {
			_args_valid.push({ value : _stack.pop(), name : _stack.pop()});
		} else {
			_args_valid.push({ value : "", name : _stack.pop()});
		}
	}
	return new arguable_ArgValues(_args_valid.length > 0 || _args_invalid.length > 0,_args_valid.length,_args_valid,_args_invalid);
};
var arguable_Stack = function() {
	this.length = 0;
	this.first = null;
	this.length = 0;
};
arguable_Stack.__name__ = true;
arguable_Stack.prototype = {
	empty: function() {
		return this.first == null;
	}
	,push: function(element) {
		if(element == null) {
			throw haxe_Exception.thrown("This Stack does not hold null elements.");
		}
		var oldfirst = this.first;
		this.first = new arguable_StackNode();
		this.first.item = element;
		this.first.next = oldfirst;
		this.length++;
	}
	,pop: function() {
		if(this.empty()) {
			throw haxe_Exception.thrown("Stack underflow");
		}
		var element = this.first.item;
		this.first = this.first.next;
		this.length--;
		return element;
	}
	,top: function() {
		if(this.empty()) {
			return null;
		}
		return this.first.item;
	}
	,iterator: function() {
		return new haxe_iterators_ArrayIterator(this.toArray());
	}
	,toArray: function() {
		if(this.empty()) {
			return [];
		}
		var a = [];
		var current = this.first;
		while(current != null) {
			a.push(current.item);
			current = current.next;
		}
		return a;
	}
};
var arguable_StackNode = function() {
};
arguable_StackNode.__name__ = true;
var format_png_Color = $hxEnums["format.png.Color"] = { __ename__:true,__constructs__:null
	,ColGrey: ($_=function(alpha) { return {_hx_index:0,alpha:alpha,__enum__:"format.png.Color",toString:$estr}; },$_._hx_name="ColGrey",$_.__params__ = ["alpha"],$_)
	,ColTrue: ($_=function(alpha) { return {_hx_index:1,alpha:alpha,__enum__:"format.png.Color",toString:$estr}; },$_._hx_name="ColTrue",$_.__params__ = ["alpha"],$_)
	,ColIndexed: {_hx_name:"ColIndexed",_hx_index:2,__enum__:"format.png.Color",toString:$estr}
};
format_png_Color.__constructs__ = [format_png_Color.ColGrey,format_png_Color.ColTrue,format_png_Color.ColIndexed];
var format_png_Chunk = $hxEnums["format.png.Chunk"] = { __ename__:true,__constructs__:null
	,CEnd: {_hx_name:"CEnd",_hx_index:0,__enum__:"format.png.Chunk",toString:$estr}
	,CHeader: ($_=function(h) { return {_hx_index:1,h:h,__enum__:"format.png.Chunk",toString:$estr}; },$_._hx_name="CHeader",$_.__params__ = ["h"],$_)
	,CData: ($_=function(b) { return {_hx_index:2,b:b,__enum__:"format.png.Chunk",toString:$estr}; },$_._hx_name="CData",$_.__params__ = ["b"],$_)
	,CPalette: ($_=function(b) { return {_hx_index:3,b:b,__enum__:"format.png.Chunk",toString:$estr}; },$_._hx_name="CPalette",$_.__params__ = ["b"],$_)
	,CUnknown: ($_=function(id,data) { return {_hx_index:4,id:id,data:data,__enum__:"format.png.Chunk",toString:$estr}; },$_._hx_name="CUnknown",$_.__params__ = ["id","data"],$_)
};
format_png_Chunk.__constructs__ = [format_png_Chunk.CEnd,format_png_Chunk.CHeader,format_png_Chunk.CData,format_png_Chunk.CPalette,format_png_Chunk.CUnknown];
var format_png_Reader = function(i) {
	this.i = i;
	i.set_bigEndian(true);
	this.checkCRC = true;
};
format_png_Reader.__name__ = true;
format_png_Reader.prototype = {
	read: function() {
		var b = 137;
		if(this.i.readByte() != b) {
			throw haxe_Exception.thrown("Invalid header");
		}
		var b = 80;
		if(this.i.readByte() != b) {
			throw haxe_Exception.thrown("Invalid header");
		}
		var b = 78;
		if(this.i.readByte() != b) {
			throw haxe_Exception.thrown("Invalid header");
		}
		var b = 71;
		if(this.i.readByte() != b) {
			throw haxe_Exception.thrown("Invalid header");
		}
		var b = 13;
		if(this.i.readByte() != b) {
			throw haxe_Exception.thrown("Invalid header");
		}
		var b = 10;
		if(this.i.readByte() != b) {
			throw haxe_Exception.thrown("Invalid header");
		}
		var b = 26;
		if(this.i.readByte() != b) {
			throw haxe_Exception.thrown("Invalid header");
		}
		var b = 10;
		if(this.i.readByte() != b) {
			throw haxe_Exception.thrown("Invalid header");
		}
		var l = new haxe_ds_List();
		while(true) {
			var c = this.readChunk();
			l.add(c);
			if(c == format_png_Chunk.CEnd) {
				break;
			}
		}
		return l;
	}
	,readHeader: function(i) {
		i.set_bigEndian(true);
		var width = i.readInt32();
		var height = i.readInt32();
		var colbits = i.readByte();
		var color = i.readByte();
		var color1;
		switch(color) {
		case 0:
			color1 = format_png_Color.ColGrey(false);
			break;
		case 2:
			color1 = format_png_Color.ColTrue(false);
			break;
		case 3:
			color1 = format_png_Color.ColIndexed;
			break;
		case 4:
			color1 = format_png_Color.ColGrey(true);
			break;
		case 6:
			color1 = format_png_Color.ColTrue(true);
			break;
		default:
			throw haxe_Exception.thrown("Unknown color model " + color + ":" + colbits);
		}
		var compress = i.readByte();
		var filter = i.readByte();
		if(compress != 0 || filter != 0) {
			throw haxe_Exception.thrown("Invalid header");
		}
		var interlace = i.readByte();
		if(interlace != 0 && interlace != 1) {
			throw haxe_Exception.thrown("Invalid header");
		}
		return { width : width, height : height, colbits : colbits, color : color1, interlaced : interlace == 1};
	}
	,readChunk: function() {
		var dataLen = this.i.readInt32();
		var id = this.i.readString(4);
		var data = this.i.read(dataLen);
		var crc = this.i.readInt32();
		if(this.checkCRC) {
			var c_crc = -1;
			var tmp = (c_crc ^ HxOverrides.cca(id,0)) & 255;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			c_crc = c_crc >>> 8 ^ tmp;
			var tmp = (c_crc ^ HxOverrides.cca(id,1)) & 255;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			c_crc = c_crc >>> 8 ^ tmp;
			var tmp = (c_crc ^ HxOverrides.cca(id,2)) & 255;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			c_crc = c_crc >>> 8 ^ tmp;
			var tmp = (c_crc ^ HxOverrides.cca(id,3)) & 255;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
			c_crc = c_crc >>> 8 ^ tmp;
			var b = data.b.bufferValue;
			var _g = 0;
			var _g1 = data.length;
			while(_g < _g1) {
				var i = _g++;
				var tmp = (c_crc ^ b.bytes[i]) & 255;
				tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
				tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
				tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
				tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
				tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
				tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
				tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
				tmp = tmp >>> 1 ^ -(tmp & 1) & -306674912;
				c_crc = c_crc >>> 8 ^ tmp;
			}
			if((c_crc ^ -1) != crc) {
				throw haxe_Exception.thrown("CRC check failure");
			}
		}
		switch(id) {
		case "IDAT":
			return format_png_Chunk.CData(data);
		case "IEND":
			return format_png_Chunk.CEnd;
		case "IHDR":
			return format_png_Chunk.CHeader(this.readHeader(new haxe_io_BytesInput(data)));
		case "PLTE":
			return format_png_Chunk.CPalette(data);
		default:
			return format_png_Chunk.CUnknown(id,data);
		}
	}
};
var format_png_Tools = function() { };
format_png_Tools.__name__ = true;
format_png_Tools.getHeader = function(d) {
	var _g_head = d.h;
	while(_g_head != null) {
		var val = _g_head.item;
		_g_head = _g_head.next;
		var c = val;
		if(c._hx_index == 1) {
			var h = c.h;
			return h;
		}
	}
	throw haxe_Exception.thrown("Header not found");
};
format_png_Tools.getPalette = function(d) {
	var _g_head = d.h;
	while(_g_head != null) {
		var val = _g_head.item;
		_g_head = _g_head.next;
		var c = val;
		if(c._hx_index == 3) {
			var b = c.b;
			return b;
		}
	}
	return null;
};
format_png_Tools.filter = function(data,x,y,stride,prev,p,numChannels) {
	if(numChannels == null) {
		numChannels = 4;
	}
	var b = y == 0 ? 0 : data.b[p - stride];
	var c = x == 0 || y == 0 ? 0 : data.b[p - stride - numChannels];
	var k = prev + b - c;
	var pa = k - prev;
	if(pa < 0) {
		pa = -pa;
	}
	var pb = k - b;
	if(pb < 0) {
		pb = -pb;
	}
	var pc = k - c;
	if(pc < 0) {
		pc = -pc;
	}
	if(pa <= pb && pa <= pc) {
		return prev;
	} else if(pb <= pc) {
		return b;
	} else {
		return c;
	}
};
format_png_Tools.reverseBytes = function(b) {
	var p = 0;
	var _g = 0;
	var _g1 = b.length >> 2;
	while(_g < _g1) {
		var i = _g++;
		var b1 = b.b[p];
		var g = b.b[p + 1];
		var r = b.b[p + 2];
		var a = b.b[p + 3];
		b.b[p++] = a;
		b.b[p++] = r;
		b.b[p++] = g;
		b.b[p++] = b1;
	}
};
format_png_Tools.extractGrey = function(d) {
	var h = format_png_Tools.getHeader(d);
	var grey = new haxe_io_Bytes(new ArrayBuffer(h.width * h.height));
	var data = null;
	var fullData = null;
	var _g_head = d.h;
	while(_g_head != null) {
		var val = _g_head.item;
		_g_head = _g_head.next;
		var c = val;
		if(c._hx_index == 2) {
			var b = c.b;
			if(fullData != null) {
				fullData.add(b);
			} else if(data == null) {
				data = b;
			} else {
				fullData = new haxe_io_BytesBuffer();
				fullData.add(data);
				fullData.add(b);
				data = null;
			}
		}
	}
	if(fullData != null) {
		data = fullData.getBytes();
	}
	if(data == null) {
		throw haxe_Exception.thrown("Data not found");
	}
	data = format_tools_Inflate.run(data);
	var r = 0;
	var w = 0;
	var _g = h.color;
	if(_g._hx_index == 0) {
		var alpha = _g.alpha;
		if(h.colbits != 8) {
			throw haxe_Exception.thrown("Unsupported color mode");
		}
		var width = h.width;
		var stride = (alpha ? 2 : 1) * width + 1;
		if(data.length < h.height * stride) {
			throw haxe_Exception.thrown("Not enough data");
		}
		var rinc = alpha ? 2 : 1;
		var _g = 0;
		var _g1 = h.height;
		while(_g < _g1) {
			var y = _g++;
			var f = data.b[r++];
			switch(f) {
			case 0:
				var _g2 = 0;
				var _g3 = width;
				while(_g2 < _g3) {
					var x = _g2++;
					var v = data.b[r];
					r += rinc;
					grey.b[w++] = v;
				}
				break;
			case 1:
				var cv = 0;
				var _g4 = 0;
				var _g5 = width;
				while(_g4 < _g5) {
					var x1 = _g4++;
					cv += data.b[r];
					r += rinc;
					grey.b[w++] = cv;
				}
				break;
			case 2:
				var stride = y == 0 ? 0 : width;
				var _g6 = 0;
				var _g7 = width;
				while(_g6 < _g7) {
					var x2 = _g6++;
					var v1 = data.b[r] + grey.b[w - stride];
					r += rinc;
					grey.b[w++] = v1;
				}
				break;
			case 3:
				var cv1 = 0;
				var stride1 = y == 0 ? 0 : width;
				var _g8 = 0;
				var _g9 = width;
				while(_g8 < _g9) {
					var x3 = _g8++;
					cv1 = data.b[r] + (cv1 + grey.b[w - stride1] >> 1) & 255;
					r += rinc;
					grey.b[w++] = cv1;
				}
				break;
			case 4:
				var stride2 = width;
				var cv2 = 0;
				var _g10 = 0;
				var _g11 = width;
				while(_g10 < _g11) {
					var x4 = _g10++;
					var numChannels = 1;
					if(numChannels == null) {
						numChannels = 4;
					}
					var b = y == 0 ? 0 : grey.b[w - stride2];
					var c = x4 == 0 || y == 0 ? 0 : grey.b[w - stride2 - numChannels];
					var k = cv2 + b - c;
					var pa = k - cv2;
					if(pa < 0) {
						pa = -pa;
					}
					var pb = k - b;
					if(pb < 0) {
						pb = -pb;
					}
					var pc = k - c;
					if(pc < 0) {
						pc = -pc;
					}
					cv2 = (pa <= pb && pa <= pc ? cv2 : pb <= pc ? b : c) + data.b[r] & 255;
					r += rinc;
					grey.b[w++] = cv2;
				}
				break;
			default:
				throw haxe_Exception.thrown("Invalid filter " + f);
			}
		}
	} else {
		throw haxe_Exception.thrown("Unsupported color mode");
	}
	return grey;
};
format_png_Tools.extract32 = function(d,bytes,flipY) {
	var h = format_png_Tools.getHeader(d);
	var bgra = bytes == null ? new haxe_io_Bytes(new ArrayBuffer(h.width * h.height * 4)) : bytes;
	var data = null;
	var fullData = null;
	var _g_head = d.h;
	while(_g_head != null) {
		var val = _g_head.item;
		_g_head = _g_head.next;
		var c = val;
		if(c._hx_index == 2) {
			var b = c.b;
			if(fullData != null) {
				fullData.add(b);
			} else if(data == null) {
				data = b;
			} else {
				fullData = new haxe_io_BytesBuffer();
				fullData.add(data);
				fullData.add(b);
				data = null;
			}
		}
	}
	if(fullData != null) {
		data = fullData.getBytes();
	}
	if(data == null) {
		throw haxe_Exception.thrown("Data not found");
	}
	data = format_tools_Inflate.run(data);
	var r = 0;
	var w = 0;
	var lineDelta = 0;
	if(flipY) {
		lineDelta = -h.width * 8;
		w = (h.height - 1) * (h.width * 4);
	}
	var flipY1 = flipY ? -1 : 1;
	var _g = h.color;
	switch(_g._hx_index) {
	case 0:
		var alpha = _g.alpha;
		if(h.colbits != 8) {
			throw haxe_Exception.thrown("Unsupported color mode");
		}
		var width = h.width;
		var stride = (alpha ? 2 : 1) * width + 1;
		if(data.length < h.height * stride) {
			throw haxe_Exception.thrown("Not enough data");
		}
		var alphvaIdx = -1;
		if(!alpha) {
			var _g1_head = d.h;
			while(_g1_head != null) {
				var val = _g1_head.item;
				_g1_head = _g1_head.next;
				var t = val;
				if(t._hx_index == 4) {
					if(t.id == "tRNS") {
						var data1 = t.data;
						if(data1.length >= 2) {
							alphvaIdx = data1.b[1];
						}
						break;
					}
				}
			}
		}
		var _g1 = 0;
		var _g2 = h.height;
		while(_g1 < _g2) {
			var y = _g1++;
			var f = data.b[r++];
			switch(f) {
			case 0:
				if(alpha) {
					var _g3 = 0;
					var _g4 = width;
					while(_g3 < _g4) {
						var x = _g3++;
						var v = data.b[r++];
						bgra.b[w++] = v;
						bgra.b[w++] = v;
						bgra.b[w++] = v;
						bgra.b[w++] = data.b[r++];
					}
				} else {
					var _g5 = 0;
					var _g6 = width;
					while(_g5 < _g6) {
						var x1 = _g5++;
						var v1 = data.b[r++];
						bgra.b[w++] = v1;
						bgra.b[w++] = v1;
						bgra.b[w++] = v1;
						bgra.b[w++] = v1 == alphvaIdx ? 0 : 255;
					}
				}
				break;
			case 1:
				var cv = 0;
				var ca = 0;
				if(alpha) {
					var _g7 = 0;
					var _g8 = width;
					while(_g7 < _g8) {
						var x2 = _g7++;
						cv += data.b[r++];
						bgra.b[w++] = cv;
						bgra.b[w++] = cv;
						bgra.b[w++] = cv;
						ca += data.b[r++];
						bgra.b[w++] = ca;
					}
				} else {
					var _g9 = 0;
					var _g10 = width;
					while(_g9 < _g10) {
						var x3 = _g9++;
						cv += data.b[r++];
						bgra.b[w++] = cv;
						bgra.b[w++] = cv;
						bgra.b[w++] = cv;
						bgra.b[w++] = cv == alphvaIdx ? 0 : 255;
					}
				}
				break;
			case 2:
				var stride = y == 0 ? 0 : width * 4 * flipY1;
				if(alpha) {
					var _g11 = 0;
					var _g12 = width;
					while(_g11 < _g12) {
						var x4 = _g11++;
						var v2 = data.b[r++] + bgra.b[w - stride];
						bgra.b[w++] = v2;
						bgra.b[w++] = v2;
						bgra.b[w++] = v2;
						var va = data.b[r++] + bgra.b[w - stride];
						bgra.b[w++] = va;
					}
				} else {
					var _g13 = 0;
					var _g14 = width;
					while(_g13 < _g14) {
						var x5 = _g13++;
						var v3 = data.b[r++] + bgra.b[w - stride];
						bgra.b[w++] = v3;
						bgra.b[w++] = v3;
						bgra.b[w++] = v3;
						bgra.b[w++] = v3 == alphvaIdx ? 0 : 255;
					}
				}
				break;
			case 3:
				var cv1 = 0;
				var ca1 = 0;
				var stride1 = y == 0 ? 0 : width * 4 * flipY1;
				if(alpha) {
					var _g15 = 0;
					var _g16 = width;
					while(_g15 < _g16) {
						var x6 = _g15++;
						cv1 = data.b[r++] + (cv1 + bgra.b[w - stride1] >> 1) & 255;
						bgra.b[w++] = cv1;
						bgra.b[w++] = cv1;
						bgra.b[w++] = cv1;
						ca1 = data.b[r++] + (ca1 + bgra.b[w - stride1] >> 1) & 255;
						bgra.b[w++] = ca1;
					}
				} else {
					var _g17 = 0;
					var _g18 = width;
					while(_g17 < _g18) {
						var x7 = _g17++;
						cv1 = data.b[r++] + (cv1 + bgra.b[w - stride1] >> 1) & 255;
						bgra.b[w++] = cv1;
						bgra.b[w++] = cv1;
						bgra.b[w++] = cv1;
						bgra.b[w++] = cv1 == alphvaIdx ? 0 : 255;
					}
				}
				break;
			case 4:
				var stride2 = width * 4 * flipY1;
				var cv2 = 0;
				var ca2 = 0;
				if(alpha) {
					var _g19 = 0;
					var _g20 = width;
					while(_g19 < _g20) {
						var x8 = _g19++;
						var b = y == 0 ? 0 : bgra.b[w - stride2];
						var c = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
						var k = cv2 + b - c;
						var pa = k - cv2;
						if(pa < 0) {
							pa = -pa;
						}
						var pb = k - b;
						if(pb < 0) {
							pb = -pb;
						}
						var pc = k - c;
						if(pc < 0) {
							pc = -pc;
						}
						var pos = r++;
						cv2 = (pa <= pb && pa <= pc ? cv2 : pb <= pc ? b : c) + data.b[pos] & 255;
						bgra.b[w++] = cv2;
						bgra.b[w++] = cv2;
						bgra.b[w++] = cv2;
						var b1 = y == 0 ? 0 : bgra.b[w - stride2];
						var c1 = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
						var k1 = ca2 + b1 - c1;
						var pa1 = k1 - ca2;
						if(pa1 < 0) {
							pa1 = -pa1;
						}
						var pb1 = k1 - b1;
						if(pb1 < 0) {
							pb1 = -pb1;
						}
						var pc1 = k1 - c1;
						if(pc1 < 0) {
							pc1 = -pc1;
						}
						var pos1 = r++;
						ca2 = (pa1 <= pb1 && pa1 <= pc1 ? ca2 : pb1 <= pc1 ? b1 : c1) + data.b[pos1] & 255;
						bgra.b[w++] = ca2;
					}
				} else {
					var _g21 = 0;
					var _g22 = width;
					while(_g21 < _g22) {
						var x9 = _g21++;
						var b2 = y == 0 ? 0 : bgra.b[w - stride2];
						var c2 = x9 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
						var k2 = cv2 + b2 - c2;
						var pa2 = k2 - cv2;
						if(pa2 < 0) {
							pa2 = -pa2;
						}
						var pb2 = k2 - b2;
						if(pb2 < 0) {
							pb2 = -pb2;
						}
						var pc2 = k2 - c2;
						if(pc2 < 0) {
							pc2 = -pc2;
						}
						var pos2 = r++;
						cv2 = (pa2 <= pb2 && pa2 <= pc2 ? cv2 : pb2 <= pc2 ? b2 : c2) + data.b[pos2] & 255;
						bgra.b[w++] = cv2;
						bgra.b[w++] = cv2;
						bgra.b[w++] = cv2;
						bgra.b[w++] = cv2 == alphvaIdx ? 0 : 255;
					}
				}
				break;
			default:
				throw haxe_Exception.thrown("Invalid filter " + f);
			}
			w += lineDelta;
		}
		break;
	case 1:
		var alpha = _g.alpha;
		if(h.colbits != 8) {
			throw haxe_Exception.thrown("Unsupported color mode");
		}
		var width = h.width;
		var stride = (alpha ? 4 : 3) * width + 1;
		if(data.length < h.height * stride) {
			throw haxe_Exception.thrown("Not enough data");
		}
		var alphaRed = -1;
		var alphaGreen = -1;
		var alphaBlue = -1;
		if(!alpha) {
			var _g1_head = d.h;
			while(_g1_head != null) {
				var val = _g1_head.item;
				_g1_head = _g1_head.next;
				var t = val;
				if(t._hx_index == 4) {
					if(t.id == "tRNS") {
						var data1 = t.data;
						if(data1.length >= 6) {
							alphaRed = data1.b[1];
							alphaGreen = data1.b[3];
							alphaBlue = data1.b[5];
						}
						break;
					}
				}
			}
		}
		var cr = 0;
		var cg = 0;
		var cb = 0;
		var ca = 0;
		var _g = 0;
		var _g1 = h.height;
		while(_g < _g1) {
			var y = _g++;
			var f = data.b[r++];
			switch(f) {
			case 0:
				if(alpha) {
					var _g2 = 0;
					var _g3 = width;
					while(_g2 < _g3) {
						var x = _g2++;
						bgra.b[w++] = data.b[r + 2];
						bgra.b[w++] = data.b[r + 1];
						bgra.b[w++] = data.b[r];
						bgra.b[w++] = data.b[r + 3];
						r += 4;
					}
				} else {
					var _g4 = 0;
					var _g5 = width;
					while(_g4 < _g5) {
						var x1 = _g4++;
						cb = data.b[r + 2];
						bgra.b[w++] = cb;
						cg = data.b[r + 1];
						bgra.b[w++] = cg;
						cr = data.b[r];
						bgra.b[w++] = cr;
						bgra.b[w++] = cr == alphaRed && cg == alphaGreen && cb == alphaBlue ? 0 : 255;
						r += 3;
					}
				}
				break;
			case 1:
				ca = 0;
				cb = ca;
				cg = cb;
				cr = cg;
				if(alpha) {
					var _g6 = 0;
					var _g7 = width;
					while(_g6 < _g7) {
						var x2 = _g6++;
						cb += data.b[r + 2];
						bgra.b[w++] = cb;
						cg += data.b[r + 1];
						bgra.b[w++] = cg;
						cr += data.b[r];
						bgra.b[w++] = cr;
						ca += data.b[r + 3];
						bgra.b[w++] = ca;
						r += 4;
					}
				} else {
					var _g8 = 0;
					var _g9 = width;
					while(_g8 < _g9) {
						var x3 = _g8++;
						cb += data.b[r + 2];
						bgra.b[w++] = cb;
						cg += data.b[r + 1];
						bgra.b[w++] = cg;
						cr += data.b[r];
						bgra.b[w++] = cr;
						bgra.b[w++] = cr == alphaRed && cg == alphaGreen && cb == alphaBlue ? 0 : 255;
						r += 3;
					}
				}
				break;
			case 2:
				var stride = y == 0 ? 0 : width * 4 * flipY1;
				if(alpha) {
					var _g10 = 0;
					var _g11 = width;
					while(_g10 < _g11) {
						var x4 = _g10++;
						bgra.b[w] = data.b[r + 2] + bgra.b[w - stride];
						++w;
						bgra.b[w] = data.b[r + 1] + bgra.b[w - stride];
						++w;
						bgra.b[w] = data.b[r] + bgra.b[w - stride];
						++w;
						bgra.b[w] = data.b[r + 3] + bgra.b[w - stride];
						++w;
						r += 4;
					}
				} else {
					var _g12 = 0;
					var _g13 = width;
					while(_g12 < _g13) {
						var x5 = _g12++;
						cb = data.b[r + 2] + bgra.b[w - stride];
						bgra.b[w] = cb;
						++w;
						cg = data.b[r + 1] + bgra.b[w - stride];
						bgra.b[w] = cg;
						++w;
						cr = data.b[r] + bgra.b[w - stride];
						bgra.b[w] = cr;
						++w;
						bgra.b[w++] = cr == alphaRed && cg == alphaGreen && cb == alphaBlue ? 0 : 255;
						r += 3;
					}
				}
				break;
			case 3:
				ca = 0;
				cb = ca;
				cg = cb;
				cr = cg;
				var stride1 = y == 0 ? 0 : width * 4 * flipY1;
				if(alpha) {
					var _g14 = 0;
					var _g15 = width;
					while(_g14 < _g15) {
						var x6 = _g14++;
						cb = data.b[r + 2] + (cb + bgra.b[w - stride1] >> 1) & 255;
						bgra.b[w++] = cb;
						cg = data.b[r + 1] + (cg + bgra.b[w - stride1] >> 1) & 255;
						bgra.b[w++] = cg;
						cr = data.b[r] + (cr + bgra.b[w - stride1] >> 1) & 255;
						bgra.b[w++] = cr;
						ca = data.b[r + 3] + (ca + bgra.b[w - stride1] >> 1) & 255;
						bgra.b[w++] = ca;
						r += 4;
					}
				} else {
					var _g16 = 0;
					var _g17 = width;
					while(_g16 < _g17) {
						var x7 = _g16++;
						cb = data.b[r + 2] + (cb + bgra.b[w - stride1] >> 1) & 255;
						bgra.b[w++] = cb;
						cg = data.b[r + 1] + (cg + bgra.b[w - stride1] >> 1) & 255;
						bgra.b[w++] = cg;
						cr = data.b[r] + (cr + bgra.b[w - stride1] >> 1) & 255;
						bgra.b[w++] = cr;
						bgra.b[w++] = cr == alphaRed && cg == alphaGreen && cb == alphaBlue ? 0 : 255;
						r += 3;
					}
				}
				break;
			case 4:
				var stride2 = width * 4 * flipY1;
				ca = 0;
				cb = ca;
				cg = cb;
				cr = cg;
				if(alpha) {
					var _g18 = 0;
					var _g19 = width;
					while(_g18 < _g19) {
						var x8 = _g18++;
						var b = y == 0 ? 0 : bgra.b[w - stride2];
						var c = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
						var k = cb + b - c;
						var pa = k - cb;
						if(pa < 0) {
							pa = -pa;
						}
						var pb = k - b;
						if(pb < 0) {
							pb = -pb;
						}
						var pc = k - c;
						if(pc < 0) {
							pc = -pc;
						}
						cb = (pa <= pb && pa <= pc ? cb : pb <= pc ? b : c) + data.b[r + 2] & 255;
						bgra.b[w++] = cb;
						var b1 = y == 0 ? 0 : bgra.b[w - stride2];
						var c1 = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
						var k1 = cg + b1 - c1;
						var pa1 = k1 - cg;
						if(pa1 < 0) {
							pa1 = -pa1;
						}
						var pb1 = k1 - b1;
						if(pb1 < 0) {
							pb1 = -pb1;
						}
						var pc1 = k1 - c1;
						if(pc1 < 0) {
							pc1 = -pc1;
						}
						cg = (pa1 <= pb1 && pa1 <= pc1 ? cg : pb1 <= pc1 ? b1 : c1) + data.b[r + 1] & 255;
						bgra.b[w++] = cg;
						var b2 = y == 0 ? 0 : bgra.b[w - stride2];
						var c2 = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
						var k2 = cr + b2 - c2;
						var pa2 = k2 - cr;
						if(pa2 < 0) {
							pa2 = -pa2;
						}
						var pb2 = k2 - b2;
						if(pb2 < 0) {
							pb2 = -pb2;
						}
						var pc2 = k2 - c2;
						if(pc2 < 0) {
							pc2 = -pc2;
						}
						cr = (pa2 <= pb2 && pa2 <= pc2 ? cr : pb2 <= pc2 ? b2 : c2) + data.b[r] & 255;
						bgra.b[w++] = cr;
						var b3 = y == 0 ? 0 : bgra.b[w - stride2];
						var c3 = x8 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
						var k3 = ca + b3 - c3;
						var pa3 = k3 - ca;
						if(pa3 < 0) {
							pa3 = -pa3;
						}
						var pb3 = k3 - b3;
						if(pb3 < 0) {
							pb3 = -pb3;
						}
						var pc3 = k3 - c3;
						if(pc3 < 0) {
							pc3 = -pc3;
						}
						ca = (pa3 <= pb3 && pa3 <= pc3 ? ca : pb3 <= pc3 ? b3 : c3) + data.b[r + 3] & 255;
						bgra.b[w++] = ca;
						r += 4;
					}
				} else {
					var _g20 = 0;
					var _g21 = width;
					while(_g20 < _g21) {
						var x9 = _g20++;
						var b4 = y == 0 ? 0 : bgra.b[w - stride2];
						var c4 = x9 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
						var k4 = cb + b4 - c4;
						var pa4 = k4 - cb;
						if(pa4 < 0) {
							pa4 = -pa4;
						}
						var pb4 = k4 - b4;
						if(pb4 < 0) {
							pb4 = -pb4;
						}
						var pc4 = k4 - c4;
						if(pc4 < 0) {
							pc4 = -pc4;
						}
						cb = (pa4 <= pb4 && pa4 <= pc4 ? cb : pb4 <= pc4 ? b4 : c4) + data.b[r + 2] & 255;
						bgra.b[w++] = cb;
						var b5 = y == 0 ? 0 : bgra.b[w - stride2];
						var c5 = x9 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
						var k5 = cg + b5 - c5;
						var pa5 = k5 - cg;
						if(pa5 < 0) {
							pa5 = -pa5;
						}
						var pb5 = k5 - b5;
						if(pb5 < 0) {
							pb5 = -pb5;
						}
						var pc5 = k5 - c5;
						if(pc5 < 0) {
							pc5 = -pc5;
						}
						cg = (pa5 <= pb5 && pa5 <= pc5 ? cg : pb5 <= pc5 ? b5 : c5) + data.b[r + 1] & 255;
						bgra.b[w++] = cg;
						var b6 = y == 0 ? 0 : bgra.b[w - stride2];
						var c6 = x9 == 0 || y == 0 ? 0 : bgra.b[w - stride2 - 4];
						var k6 = cr + b6 - c6;
						var pa6 = k6 - cr;
						if(pa6 < 0) {
							pa6 = -pa6;
						}
						var pb6 = k6 - b6;
						if(pb6 < 0) {
							pb6 = -pb6;
						}
						var pc6 = k6 - c6;
						if(pc6 < 0) {
							pc6 = -pc6;
						}
						cr = (pa6 <= pb6 && pa6 <= pc6 ? cr : pb6 <= pc6 ? b6 : c6) + data.b[r] & 255;
						bgra.b[w++] = cr;
						bgra.b[w++] = cr == alphaRed && cg == alphaGreen && cb == alphaBlue ? 0 : 255;
						r += 3;
					}
				}
				break;
			default:
				throw haxe_Exception.thrown("Invalid filter " + f);
			}
			w += lineDelta;
		}
		break;
	case 2:
		var pal = format_png_Tools.getPalette(d);
		if(pal == null) {
			throw haxe_Exception.thrown("PNG Palette is missing");
		}
		var alpha = null;
		var _g1_head = d.h;
		while(_g1_head != null) {
			var val = _g1_head.item;
			_g1_head = _g1_head.next;
			var t = val;
			if(t._hx_index == 4) {
				if(t.id == "tRNS") {
					var data1 = t.data;
					alpha = data1;
					break;
				}
			}
		}
		if(alpha != null && alpha.length < 1 << h.colbits) {
			var alpha2 = new haxe_io_Bytes(new ArrayBuffer(1 << h.colbits));
			alpha2.blit(0,alpha,0,alpha.length);
			alpha2.fill(alpha.length,alpha2.length - alpha.length,255);
			alpha = alpha2;
		}
		var width = h.width;
		var stride = Math.ceil(width * h.colbits / 8) + 1;
		if(data.length < h.height * stride) {
			throw haxe_Exception.thrown("Not enough data");
		}
		var rline = stride - 1;
		var _g = 0;
		var _g1 = h.height;
		while(_g < _g1) {
			var y = _g++;
			var f = data.b[r++];
			if(f == 0) {
				r += rline;
				continue;
			}
			switch(f) {
			case 1:
				var c = 0;
				var _g2 = 0;
				var _g3 = width;
				while(_g2 < _g3) {
					var x = _g2++;
					var v = data.b[r];
					c += v;
					data.b[r++] = c & 255;
				}
				break;
			case 2:
				var stride = y == 0 ? 0 : rline + 1;
				var _g4 = 0;
				var _g5 = width;
				while(_g4 < _g5) {
					var x1 = _g4++;
					var v1 = data.b[r];
					data.b[r] = v1 + data.b[r - stride];
					++r;
				}
				break;
			case 3:
				var c1 = 0;
				var stride1 = y == 0 ? 0 : rline + 1;
				var _g6 = 0;
				var _g7 = width;
				while(_g6 < _g7) {
					var x2 = _g6++;
					var v2 = data.b[r];
					c1 = v2 + (c1 + data.b[r - stride1] >> 1) & 255;
					data.b[r++] = c1;
				}
				break;
			case 4:
				var stride2 = rline + 1;
				var c2 = 0;
				var _g8 = 0;
				var _g9 = width;
				while(_g8 < _g9) {
					var x3 = _g8++;
					var v3 = data.b[r];
					var numChannels = 1;
					if(numChannels == null) {
						numChannels = 4;
					}
					var b = y == 0 ? 0 : data.b[r - stride2];
					var c3 = x3 == 0 || y == 0 ? 0 : data.b[r - stride2 - numChannels];
					var k = c2 + b - c3;
					var pa = k - c2;
					if(pa < 0) {
						pa = -pa;
					}
					var pb = k - b;
					if(pb < 0) {
						pb = -pb;
					}
					var pc = k - c3;
					if(pc < 0) {
						pc = -pc;
					}
					c2 = (pa <= pb && pa <= pc ? c2 : pb <= pc ? b : c3) + v3 & 255;
					data.b[r++] = c2;
				}
				break;
			default:
				throw haxe_Exception.thrown("Invalid filter " + f);
			}
		}
		var r = 0;
		if(h.colbits == 8) {
			var _g = 0;
			var _g1 = h.height;
			while(_g < _g1) {
				var y = _g++;
				++r;
				var _g2 = 0;
				var _g3 = h.width;
				while(_g2 < _g3) {
					var x = _g2++;
					var c = data.b[r++];
					bgra.b[w++] = pal.b[c * 3 + 2];
					bgra.b[w++] = pal.b[c * 3 + 1];
					bgra.b[w++] = pal.b[c * 3];
					bgra.b[w++] = alpha != null ? alpha.b[c] : 255;
				}
				w += lineDelta;
			}
		} else if(h.colbits < 8) {
			var req = h.colbits;
			var mask = (1 << req) - 1;
			var _g = 0;
			var _g1 = h.height;
			while(_g < _g1) {
				var y = _g++;
				++r;
				var bits = 0;
				var nbits = 0;
				var _g2 = 0;
				var _g3 = h.width;
				while(_g2 < _g3) {
					var x = _g2++;
					if(nbits < req) {
						bits = bits << 8 | data.b[r++];
						nbits += 8;
					}
					var c = bits >>> nbits - req & mask;
					nbits -= req;
					bgra.b[w++] = pal.b[c * 3 + 2];
					bgra.b[w++] = pal.b[c * 3 + 1];
					bgra.b[w++] = pal.b[c * 3];
					bgra.b[w++] = alpha != null ? alpha.b[c] : 255;
				}
				w += lineDelta;
			}
		} else {
			throw haxe_Exception.thrown(h.colbits + " indexed bits per pixel not supported");
		}
		break;
	}
	return bgra;
};
format_png_Tools.buildGrey = function(width,height,data,level) {
	if(level == null) {
		level = 9;
	}
	var rgb = new haxe_io_Bytes(new ArrayBuffer(width * height + height));
	var w = 0;
	var r = 0;
	var _g = 0;
	var _g1 = height;
	while(_g < _g1) {
		var y = _g++;
		rgb.b[w++] = 0;
		var _g2 = 0;
		var _g3 = width;
		while(_g2 < _g3) {
			var x = _g2++;
			rgb.b[w++] = data.b[r++];
		}
	}
	var l = new haxe_ds_List();
	l.add(format_png_Chunk.CHeader({ width : width, height : height, colbits : 8, color : format_png_Color.ColGrey(false), interlaced : false}));
	l.add(format_png_Chunk.CData(format_tools_Deflate.run(rgb,level)));
	l.add(format_png_Chunk.CEnd);
	return l;
};
format_png_Tools.buildIndexed = function(width,height,data,palette,level) {
	if(level == null) {
		level = 9;
	}
	var rgb = new haxe_io_Bytes(new ArrayBuffer(width * height + height));
	var w = 0;
	var r = 0;
	var _g = 0;
	var _g1 = height;
	while(_g < _g1) {
		var y = _g++;
		rgb.b[w++] = 0;
		var _g2 = 0;
		var _g3 = width;
		while(_g2 < _g3) {
			var x = _g2++;
			rgb.b[w++] = data.b[r++];
		}
	}
	var l = new haxe_ds_List();
	l.add(format_png_Chunk.CHeader({ width : width, height : height, colbits : 8, color : format_png_Color.ColIndexed, interlaced : false}));
	l.add(format_png_Chunk.CPalette(palette));
	l.add(format_png_Chunk.CData(format_tools_Deflate.run(rgb,level)));
	l.add(format_png_Chunk.CEnd);
	return l;
};
format_png_Tools.buildRGB = function(width,height,data,level) {
	if(level == null) {
		level = 9;
	}
	var rgb = new haxe_io_Bytes(new ArrayBuffer(width * height * 3 + height));
	var w = 0;
	var r = 0;
	var _g = 0;
	var _g1 = height;
	while(_g < _g1) {
		var y = _g++;
		rgb.b[w++] = 0;
		var _g2 = 0;
		var _g3 = width;
		while(_g2 < _g3) {
			var x = _g2++;
			rgb.b[w++] = data.b[r + 2];
			rgb.b[w++] = data.b[r + 1];
			rgb.b[w++] = data.b[r];
			r += 3;
		}
	}
	var l = new haxe_ds_List();
	l.add(format_png_Chunk.CHeader({ width : width, height : height, colbits : 8, color : format_png_Color.ColTrue(false), interlaced : false}));
	l.add(format_png_Chunk.CData(format_tools_Deflate.run(rgb,level)));
	l.add(format_png_Chunk.CEnd);
	return l;
};
format_png_Tools.build32ARGB = function(width,height,data,level) {
	if(level == null) {
		level = 9;
	}
	var rgba = new haxe_io_Bytes(new ArrayBuffer(width * height * 4 + height));
	var w = 0;
	var r = 0;
	var _g = 0;
	var _g1 = height;
	while(_g < _g1) {
		var y = _g++;
		rgba.b[w++] = 0;
		var _g2 = 0;
		var _g3 = width;
		while(_g2 < _g3) {
			var x = _g2++;
			rgba.b[w++] = data.b[r + 1];
			rgba.b[w++] = data.b[r + 2];
			rgba.b[w++] = data.b[r + 3];
			rgba.b[w++] = data.b[r];
			r += 4;
		}
	}
	var l = new haxe_ds_List();
	l.add(format_png_Chunk.CHeader({ width : width, height : height, colbits : 8, color : format_png_Color.ColTrue(true), interlaced : false}));
	l.add(format_png_Chunk.CData(format_tools_Deflate.run(rgba,level)));
	l.add(format_png_Chunk.CEnd);
	return l;
};
format_png_Tools.build32BGRA = function(width,height,data,level) {
	if(level == null) {
		level = 9;
	}
	var rgba = new haxe_io_Bytes(new ArrayBuffer(width * height * 4 + height));
	var w = 0;
	var r = 0;
	var _g = 0;
	var _g1 = height;
	while(_g < _g1) {
		var y = _g++;
		rgba.b[w++] = 0;
		var _g2 = 0;
		var _g3 = width;
		while(_g2 < _g3) {
			var x = _g2++;
			rgba.b[w++] = data.b[r + 2];
			rgba.b[w++] = data.b[r + 1];
			rgba.b[w++] = data.b[r];
			rgba.b[w++] = data.b[r + 3];
			r += 4;
		}
	}
	var l = new haxe_ds_List();
	l.add(format_png_Chunk.CHeader({ width : width, height : height, colbits : 8, color : format_png_Color.ColTrue(true), interlaced : false}));
	l.add(format_png_Chunk.CData(format_tools_Deflate.run(rgba,level)));
	l.add(format_png_Chunk.CEnd);
	return l;
};
var format_tools_Deflate = function() { };
format_tools_Deflate.__name__ = true;
format_tools_Deflate.run = function(b,level) {
	if(level == null) {
		level = 9;
	}
	return haxe_zip_Compress.run(b,level);
};
var format_tools_Inflate = function() { };
format_tools_Inflate.__name__ = true;
format_tools_Inflate.run = function(bytes) {
	return haxe_zip_Uncompress.run(bytes);
};
var geometrize_AbstractEnumTools = function() { };
geometrize_AbstractEnumTools.__name__ = true;
var geometrize_ArraySet = {};
geometrize_ArraySet.create = function(array) {
	if(array == null) {
		var this1 = [];
		return this1;
	}
	return geometrize_ArraySet.toSet(array);
};
geometrize_ArraySet.intersection = function(this1,set) {
	var result = [];
	var _g = 0;
	while(_g < this1.length) {
		var element = this1[_g];
		++_g;
		if(geometrize_ArraySet.contains(set,element)) {
			result.push(element);
		}
	}
	var this1 = result;
	return this1;
};
geometrize_ArraySet.union = function(this1,set) {
	return geometrize_ArraySet.toSet(this1.concat(geometrize_ArraySet.toArray(set)));
};
geometrize_ArraySet.unionArray = function(this1,array) {
	return geometrize_ArraySet.toSet(this1.concat(array));
};
geometrize_ArraySet.difference = function(this1,set) {
	var this2 = this1.slice();
	var result = this2;
	var _g = 0;
	var _g1 = set;
	while(_g < _g1.length) {
		var element = _g1[_g];
		++_g;
		HxOverrides.remove(result,element);
	}
	var this1 = geometrize_ArraySet.toArray(result);
	return this1;
};
geometrize_ArraySet.add = function(this1,element) {
	if(element == null) {
		throw haxe_Exception.thrown("FAIL: element != null");
	}
	if(geometrize_ArraySet.contains(this1,element)) {
		return false;
	}
	this1.push(element);
	return true;
};
geometrize_ArraySet.contains = function(this1,element) {
	var _g = 0;
	while(_g < this1.length) {
		var i = this1[_g];
		++_g;
		if(i == element) {
			return true;
		}
	}
	return false;
};
geometrize_ArraySet.copy = function(this1) {
	var this2 = this1.slice();
	return this2;
};
geometrize_ArraySet.slice = function(this1,position,end) {
	var this2 = this1.slice(position,end);
	return this2;
};
geometrize_ArraySet.splice = function(this1,position,length) {
	var this2 = this1.splice(position,length);
	return this2;
};
geometrize_ArraySet.toArray = function(this1) {
	return this1.slice();
};
geometrize_ArraySet.toSet = function(array) {
	var this1 = [];
	var set = this1;
	var _g = 0;
	while(_g < array.length) {
		var v = array[_g];
		++_g;
		geometrize_ArraySet.add(set,v);
	}
	return set;
};
geometrize_ArraySet._new = function(array) {
	var this1 = array;
	return this1;
};
var geometrize_Core = function() { };
geometrize_Core.__name__ = true;
geometrize_Core.computeColor = function(target,current,lines,alpha) {
	if(target == null) {
		throw haxe_Exception.thrown("FAIL: target != null");
	}
	if(current == null) {
		throw haxe_Exception.thrown("FAIL: current != null");
	}
	if(lines == null) {
		throw haxe_Exception.thrown("FAIL: lines != null");
	}
	if(alpha < 0) {
		throw haxe_Exception.thrown("FAIL: alpha >= 0");
	}
	var totalRed = 0;
	var totalGreen = 0;
	var totalBlue = 0;
	var count = 0;
	var f = 65535 / alpha;
	var a = f | 0;
	var _g = 0;
	while(_g < lines.length) {
		var line = lines[_g];
		++_g;
		var y = line.y;
		var _g1 = line.x1;
		var _g2 = line.x2 + 1;
		while(_g1 < _g2) {
			var x = _g1++;
			var t = target.data[target.width * y + x];
			var c = current.data[current.width * y + x];
			totalRed += ((t >> 24 & 255) - (c >> 24 & 255)) * a + (c >> 24 & 255) * 257;
			totalGreen += ((t >> 16 & 255) - (c >> 16 & 255)) * a + (c >> 16 & 255) * 257;
			totalBlue += ((t >> 8 & 255) - (c >> 8 & 255)) * a + (c >> 8 & 255) * 257;
			++count;
		}
	}
	if(count == 0) {
		return 0;
	}
	var value = (totalRed / count | 0) >> 8;
	var r = value < 0 ? 0 : value > 255 ? 255 : value;
	var value = (totalGreen / count | 0) >> 8;
	var g = value < 0 ? 0 : value > 255 ? 255 : value;
	var value = (totalBlue / count | 0) >> 8;
	var b = value < 0 ? 0 : value > 255 ? 255 : value;
	return ((r < 0 ? 0 : r > 255 ? 255 : r) << 24) + ((g < 0 ? 0 : g > 255 ? 255 : g) << 16) + ((b < 0 ? 0 : b > 255 ? 255 : b) << 8) + (alpha < 0 ? 0 : alpha > 255 ? 255 : alpha);
};
geometrize_Core.differenceFull = function(first,second) {
	if(first == null) {
		throw haxe_Exception.thrown("FAIL: first != null");
	}
	if(second == null) {
		throw haxe_Exception.thrown("FAIL: second != null");
	}
	var actual = first.width;
	var expected = second.width;
	if(actual != expected) {
		throw haxe_Exception.thrown("FAIL: values are not equal (expected: " + expected + ", actual: " + actual + ")");
	}
	var actual = first.height;
	var expected = second.height;
	if(actual != expected) {
		throw haxe_Exception.thrown("FAIL: values are not equal (expected: " + expected + ", actual: " + actual + ")");
	}
	var total = 0;
	var width = first.width;
	var height = first.height;
	var _g = 0;
	var _g1 = height;
	while(_g < _g1) {
		var y = _g++;
		var _g2 = 0;
		var _g3 = width;
		while(_g2 < _g3) {
			var x = _g2++;
			var f = first.data[first.width * y + x];
			var s = second.data[second.width * y + x];
			var dr = (f >> 24 & 255) - (s >> 24 & 255);
			var dg = (f >> 16 & 255) - (s >> 16 & 255);
			var db = (f >> 8 & 255) - (s >> 8 & 255);
			var da = (f & 255) - (s & 255);
			total += dr * dr + dg * dg + db * db + da * da;
		}
	}
	return Math.sqrt(total / (width * height * 4.0)) / 255;
};
geometrize_Core.differencePartial = function(target,before,after,score,lines) {
	if(target == null) {
		throw haxe_Exception.thrown("FAIL: target != null");
	}
	if(before == null) {
		throw haxe_Exception.thrown("FAIL: before != null");
	}
	if(after == null) {
		throw haxe_Exception.thrown("FAIL: after != null");
	}
	if(lines == null) {
		throw haxe_Exception.thrown("FAIL: lines != null");
	}
	var width = target.width;
	var height = target.height;
	var rgbaCount = width * height * 4;
	var total = Math.pow(score * 255,2) * rgbaCount;
	var _g = 0;
	while(_g < lines.length) {
		var line = lines[_g];
		++_g;
		var y = line.y;
		var _g1 = line.x1;
		var _g2 = line.x2 + 1;
		while(_g1 < _g2) {
			var x = _g1++;
			var t = target.data[target.width * y + x];
			var b = before.data[before.width * y + x];
			var a = after.data[after.width * y + x];
			var dtbr = (t >> 24 & 255) - (b >> 24 & 255);
			var dtbg = (t >> 16 & 255) - (b >> 16 & 255);
			var dtbb = (t >> 8 & 255) - (b >> 8 & 255);
			var dtba = (t & 255) - (b & 255);
			var dtar = (t >> 24 & 255) - (a >> 24 & 255);
			var dtag = (t >> 16 & 255) - (a >> 16 & 255);
			var dtab = (t >> 8 & 255) - (a >> 8 & 255);
			var dtaa = (t & 255) - (a & 255);
			total -= dtbr * dtbr + dtbg * dtbg + dtbb * dtbb + dtba * dtba;
			total += dtar * dtar + dtag * dtag + dtab * dtab + dtaa * dtaa;
		}
	}
	return Math.sqrt(total / rgbaCount) / 255;
};
geometrize_Core.bestRandomState = function(shapes,alpha,n,target,current,buffer,lastScore) {
	var bestEnergy = 0;
	var bestState = null;
	var _g = 0;
	var _g1 = n;
	while(_g < _g1) {
		var i = _g++;
		var state = new geometrize_State(geometrize_shape_ShapeFactory.randomShapeOf(shapes,current.width,current.height),alpha,target,current,buffer);
		var energy = state.energy(lastScore);
		if(i == 0 || energy < bestEnergy) {
			bestEnergy = energy;
			bestState = state;
		}
	}
	return bestState;
};
geometrize_Core.bestHillClimbState = function(shapes,alpha,n,age,target,current,buffer,lastScore) {
	var state = geometrize_Core.bestRandomState(shapes,alpha,n,target,current,buffer,lastScore);
	state = geometrize_Core.hillClimb(state,age,lastScore);
	return state;
};
geometrize_Core.hillClimb = function(state,maxAge,lastScore) {
	if(state == null) {
		throw haxe_Exception.thrown("FAIL: state != null");
	}
	if(maxAge < 0) {
		throw haxe_Exception.thrown("FAIL: maxAge >= 0");
	}
	var state1 = state.clone();
	var bestState = state1.clone();
	var bestEnergy = state1.energy(lastScore);
	var age = 0;
	while(age < maxAge) {
		var undo = state1.mutate();
		var energy = state1.energy(lastScore);
		if(energy >= bestEnergy) {
			state1 = undo;
		} else {
			bestEnergy = energy;
			bestState = state1.clone();
			age = -1;
		}
		++age;
	}
	return bestState;
};
geometrize_Core.energy = function(shape,alpha,target,current,buffer,score) {
	if(shape == null) {
		throw haxe_Exception.thrown("FAIL: shape != null");
	}
	if(target == null) {
		throw haxe_Exception.thrown("FAIL: target != null");
	}
	if(current == null) {
		throw haxe_Exception.thrown("FAIL: current != null");
	}
	if(buffer == null) {
		throw haxe_Exception.thrown("FAIL: buffer != null");
	}
	var lines = shape.rasterize();
	var color = geometrize_Core.computeColor(target,current,lines,alpha);
	geometrize_rasterizer_Rasterizer.copyLines(buffer,current,lines);
	geometrize_rasterizer_Rasterizer.drawLines(buffer,color,lines);
	return geometrize_Core.differencePartial(target,current,buffer,score,lines);
};
var geometrize_Model = function(target,backgroundColor) {
	if(target == null) {
		throw haxe_Exception.thrown("FAIL: target != null");
	}
	this.width = target.width;
	this.height = target.height;
	this.target = target;
	var w = target.width;
	var h = target.height;
	var bitmap = new geometrize_bitmap_Bitmap();
	bitmap.width = w;
	bitmap.height = h;
	var this1 = new Array(w * h);
	bitmap.data = this1;
	var i = 0;
	while(i < bitmap.data.length) {
		bitmap.data[i] = backgroundColor;
		++i;
	}
	this.current = bitmap;
	var w = target.width;
	var h = target.height;
	var bitmap = new geometrize_bitmap_Bitmap();
	bitmap.width = w;
	bitmap.height = h;
	var this1 = new Array(w * h);
	bitmap.data = this1;
	var i = 0;
	while(i < bitmap.data.length) {
		bitmap.data[i] = backgroundColor;
		++i;
	}
	this.buffer = bitmap;
	this.score = geometrize_Core.differenceFull(target,this.current);
};
geometrize_Model.__name__ = true;
geometrize_Model.prototype = {
	step: function(shapeTypes,alpha,n,age) {
		var state = geometrize_Core.bestHillClimbState(shapeTypes,alpha,n,age,this.target,this.current,this.buffer,this.score);
		var results = [this.addShape(state.shape,state.alpha)];
		return results;
	}
	,addShape: function(shape,alpha) {
		if(shape == null) {
			throw haxe_Exception.thrown("FAIL: shape != null");
		}
		var _this = this.current;
		var bitmap = new geometrize_bitmap_Bitmap();
		bitmap.width = _this.width;
		bitmap.height = _this.height;
		var this1 = new Array(_this.data.length);
		bitmap.data = this1;
		var _g = 0;
		var _g1 = _this.data.length;
		while(_g < _g1) {
			var i = _g++;
			bitmap.data[i] = _this.data[i];
		}
		var before = bitmap;
		var lines = shape.rasterize();
		var color = geometrize_Core.computeColor(this.target,this.current,lines,alpha);
		geometrize_rasterizer_Rasterizer.drawLines(this.current,color,lines);
		this.score = geometrize_Core.differencePartial(this.target,before,this.current,this.score,lines);
		var result = { score : this.score, color : color, shape : shape};
		return result;
	}
};
var geometrize_State = function(shape,alpha,target,current,buffer) {
	if(shape == null) {
		throw haxe_Exception.thrown("FAIL: shape != null");
	}
	this.shape = shape;
	this.alpha = alpha;
	this.score = -1;
	this.target = target;
	this.current = current;
	this.buffer = buffer;
};
geometrize_State.__name__ = true;
geometrize_State.prototype = {
	energy: function(lastScore) {
		if(this.score < 0) {
			this.score = geometrize_Core.energy(this.shape,this.alpha,this.target,this.current,this.buffer,lastScore);
		}
		return this.score;
	}
	,mutate: function() {
		var oldState = this.clone();
		this.shape.mutate();
		return oldState;
	}
	,clone: function() {
		return new geometrize_State(this.shape.clone(),this.alpha,this.target,this.current,this.buffer);
	}
};
var geometrize_Util = function() { };
geometrize_Util.__name__ = true;
geometrize_Util.getAverageImageColor = function(image) {
	if(image == null) {
		throw haxe_Exception.thrown("FAIL: image != null");
	}
	var totalRed = 0;
	var totalGreen = 0;
	var totalBlue = 0;
	var _g = 0;
	var _g1 = image.width;
	while(_g < _g1) {
		var x = _g++;
		var _g2 = 0;
		var _g3 = image.height;
		while(_g2 < _g3) {
			var y = _g2++;
			var pixel = image.data[image.width * y + x];
			totalRed += pixel >> 24 & 255;
			totalGreen += pixel >> 16 & 255;
			totalBlue += pixel >> 8 & 255;
		}
	}
	var size = image.width * image.height;
	var red = totalRed / size | 0;
	var green = totalGreen / size | 0;
	var blue = totalBlue / size | 0;
	return ((red < 0 ? 0 : red > 255 ? 255 : red) << 24) + ((green < 0 ? 0 : green > 255 ? 255 : green) << 16) + ((blue < 0 ? 0 : blue > 255 ? 255 : blue) << 8) + 255;
};
geometrize_Util.clamp = function(value,min,max) {
	if(min > max) {
		throw haxe_Exception.thrown("FAIL: min <= max");
	}
	if(value < min) {
		return min;
	} else if(value > max) {
		return max;
	} else {
		return value;
	}
};
geometrize_Util.min = function(first,second) {
	if(first < second) {
		return first;
	} else {
		return second;
	}
};
geometrize_Util.max = function(first,second) {
	if(first > second) {
		return first;
	} else {
		return second;
	}
};
geometrize_Util.toRadians = function(degrees) {
	return degrees * Math.PI / 180;
};
geometrize_Util.toDegrees = function(radians) {
	return radians * 180 / Math.PI;
};
geometrize_Util.random = function(lower,upper) {
	if(lower > upper) {
		throw haxe_Exception.thrown("FAIL: lower <= upper");
	}
	return lower + Math.floor((upper - lower + 1) * Math.random());
};
geometrize_Util.randomArrayItem = function(a) {
	if(!(a != null && a.length > 0)) {
		throw haxe_Exception.thrown("FAIL: a != null && a.length > 0");
	}
	var upper = a.length - 1;
	if(0 > upper) {
		throw haxe_Exception.thrown("FAIL: lower <= upper");
	}
	return a[Math.floor((upper + 1) * Math.random())];
};
geometrize_Util.minMaxElements = function(a) {
	if(a == null || a.length == 0) {
		return { x : 0, y : 0};
	}
	var min = a[0];
	var max = a[0];
	var _g = 0;
	while(_g < a.length) {
		var value = a[_g];
		++_g;
		if(min > value) {
			min = value;
		}
		if(max < value) {
			max = value;
		}
	}
	return { x : min, y : max};
};
geometrize_Util.abs = function(value) {
	if(value < 0) {
		return -value;
	}
	return value;
};
var geometrize_bitmap_Bitmap = $hx_exports["geometrize"]["bitmap"]["Bitmap"] = function() {
};
geometrize_bitmap_Bitmap.__name__ = true;
geometrize_bitmap_Bitmap.create = function(w,h,color) {
	var bitmap = new geometrize_bitmap_Bitmap();
	bitmap.width = w;
	bitmap.height = h;
	var this1 = new Array(w * h);
	bitmap.data = this1;
	var i = 0;
	while(i < bitmap.data.length) {
		bitmap.data[i] = color;
		++i;
	}
	return bitmap;
};
geometrize_bitmap_Bitmap.createFromBytes = function(w,h,bytes) {
	var bitmap = new geometrize_bitmap_Bitmap();
	if(bytes == null) {
		throw haxe_Exception.thrown("FAIL: bytes != null");
	}
	var actual = bytes.length;
	var expected = w * h * 4;
	if(actual != expected) {
		throw haxe_Exception.thrown("FAIL: values are not equal (expected: " + expected + ", actual: " + actual + ")");
	}
	bitmap.width = w;
	bitmap.height = h;
	var this1 = new Array(bytes.length / 4 | 0);
	bitmap.data = this1;
	var i = 0;
	var x = 0;
	while(i < bytes.length) {
		var red = bytes.b[i];
		var green = bytes.b[i + 1];
		var blue = bytes.b[i + 2];
		var alpha = bytes.b[i + 3];
		bitmap.data[x] = ((red < 0 ? 0 : red > 255 ? 255 : red) << 24) + ((green < 0 ? 0 : green > 255 ? 255 : green) << 16) + ((blue < 0 ? 0 : blue > 255 ? 255 : blue) << 8) + (alpha < 0 ? 0 : alpha > 255 ? 255 : alpha);
		i += 4;
		++x;
	}
	return bitmap;
};
geometrize_bitmap_Bitmap.createFromByteArray = function(w,h,bytes) {
	var data = new haxe_io_Bytes(new ArrayBuffer(bytes.length));
	var i = 0;
	while(i < bytes.length) {
		data.b[i] = bytes[i];
		++i;
	}
	var bitmap = new geometrize_bitmap_Bitmap();
	if(data == null) {
		throw haxe_Exception.thrown("FAIL: bytes != null");
	}
	var actual = data.length;
	var expected = w * h * 4;
	if(actual != expected) {
		throw haxe_Exception.thrown("FAIL: values are not equal (expected: " + expected + ", actual: " + actual + ")");
	}
	bitmap.width = w;
	bitmap.height = h;
	var this1 = new Array(data.length / 4 | 0);
	bitmap.data = this1;
	var i = 0;
	var x = 0;
	while(i < data.length) {
		var red = data.b[i];
		var green = data.b[i + 1];
		var blue = data.b[i + 2];
		var alpha = data.b[i + 3];
		bitmap.data[x] = ((red < 0 ? 0 : red > 255 ? 255 : red) << 24) + ((green < 0 ? 0 : green > 255 ? 255 : green) << 16) + ((blue < 0 ? 0 : blue > 255 ? 255 : blue) << 8) + (alpha < 0 ? 0 : alpha > 255 ? 255 : alpha);
		i += 4;
		++x;
	}
	return bitmap;
};
geometrize_bitmap_Bitmap.prototype = {
	getPixel: function(x,y) {
		return this.data[this.width * y + x];
	}
	,setPixel: function(x,y,color) {
		this.data[this.width * y + x] = color;
	}
	,clone: function() {
		var bitmap = new geometrize_bitmap_Bitmap();
		bitmap.width = this.width;
		bitmap.height = this.height;
		var this1 = new Array(this.data.length);
		bitmap.data = this1;
		var _g = 0;
		var _g1 = this.data.length;
		while(_g < _g1) {
			var i = _g++;
			bitmap.data[i] = this.data[i];
		}
		return bitmap;
	}
	,fill: function(color) {
		var idx = 0;
		while(idx < this.data.length) {
			this.data[idx] = color >> 24 & 255;
			this.data[idx + 1] = color >> 16 & 255;
			this.data[idx + 2] = color >> 8 & 255;
			this.data[idx + 3] = color & 255;
			idx += 4;
		}
	}
	,getBytes: function() {
		var bytes = new haxe_io_Bytes(new ArrayBuffer(this.data.length * 4));
		var i = 0;
		while(i < this.data.length) {
			var idx = i * 4;
			bytes.b[idx] = this.data[i] >> 24 & 255;
			bytes.b[idx + 1] = this.data[i] >> 16 & 255;
			bytes.b[idx + 2] = this.data[i] >> 8 & 255;
			bytes.b[idx + 3] = this.data[i] & 255;
			++i;
		}
		return bytes;
	}
};
var geometrize_bitmap_Rgba = {};
geometrize_bitmap_Rgba._new = function(rgba) {
	var this1 = rgba;
	return this1;
};
geometrize_bitmap_Rgba.create = function(red,green,blue,alpha) {
	return ((red < 0 ? 0 : red > 255 ? 255 : red) << 24) + ((green < 0 ? 0 : green > 255 ? 255 : green) << 16) + ((blue < 0 ? 0 : blue > 255 ? 255 : blue) << 8) + (alpha < 0 ? 0 : alpha > 255 ? 255 : alpha);
};
geometrize_bitmap_Rgba.fromInt = function(rgba) {
	return rgba;
};
geometrize_bitmap_Rgba.get_r = function(this1) {
	return this1 >> 24 & 255;
};
geometrize_bitmap_Rgba.get_g = function(this1) {
	return this1 >> 16 & 255;
};
geometrize_bitmap_Rgba.get_b = function(this1) {
	return this1 >> 8 & 255;
};
geometrize_bitmap_Rgba.get_a = function(this1) {
	return this1 & 255;
};
var geometrize_exporter_ShapeJsonExporter = $hx_exports["geometrize"]["exporter"]["ShapeJsonExporter"] = function() { };
geometrize_exporter_ShapeJsonExporter.__name__ = true;
geometrize_exporter_ShapeJsonExporter.export = function(shapes) {
	return "[\n" + geometrize_exporter_ShapeJsonExporter.exportShapes(shapes) + "\n]";
};
geometrize_exporter_ShapeJsonExporter.exportShapes = function(shapes) {
	var results = "";
	var _g = 0;
	var _g1 = shapes.length;
	while(_g < _g1) {
		var i = _g++;
		results += geometrize_exporter_ShapeJsonExporter.exportShape(shapes[i]);
		if(i != shapes.length - 1) {
			results += "\n";
		}
	}
	return results;
};
geometrize_exporter_ShapeJsonExporter.exportShape = function(shape) {
	var result = "    {\n";
	var type = shape.shape.getType();
	var data = shape.shape.getRawShapeData();
	var color = shape.color;
	var score = shape.score;
	result += "        \"type\":" + type + ",\n";
	result += "        \"data\":" + "[";
	var _g = 0;
	var _g1 = data.length;
	while(_g < _g1) {
		var item = _g++;
		result += data[item];
		if(item <= data.length - 2) {
			result += ",";
		}
	}
	result += "],\n";
	result += "        \"color\":" + "[";
	result += (color >> 24 & 255) + ",";
	result += (color >> 16 & 255) + ",";
	result += (color >> 8 & 255) + ",";
	result += color & 255;
	result += "],\n";
	result += "        \"score\":" + score + "\n";
	result += "    }";
	return result;
};
var geometrize_exporter_SvgExporter = $hx_exports["geometrize"]["exporter"]["SvgExporter"] = function() { };
geometrize_exporter_SvgExporter.__name__ = true;
geometrize_exporter_SvgExporter.export = function(shapes,width,height) {
	var results = geometrize_exporter_SvgExporter.getSvgPrelude();
	results += geometrize_exporter_SvgExporter.getSvgNodeOpen(width,height);
	results += geometrize_exporter_SvgExporter.exportShapes(shapes);
	results += geometrize_exporter_SvgExporter.getSvgNodeClose();
	return results;
};
geometrize_exporter_SvgExporter.exportShapes = function(shapes) {
	var results = "";
	var _g = 0;
	var _g1 = shapes.length;
	while(_g < _g1) {
		var i = _g++;
		results += geometrize_exporter_SvgExporter.exportShape(shapes[i]);
		if(i != shapes.length - 1) {
			results += "\n";
		}
	}
	return results;
};
geometrize_exporter_SvgExporter.exportShape = function(shape) {
	return StringTools.replace(shape.shape.getSvgShapeData(),geometrize_exporter_SvgExporter.SVG_STYLE_HOOK,geometrize_exporter_SvgExporter.stylesForShape(shape));
};
geometrize_exporter_SvgExporter.getSvgPrelude = function() {
	return "<?xml version=\"1.0\" standalone=\"no\"?>\n";
};
geometrize_exporter_SvgExporter.getSvgNodeOpen = function(width,height) {
	return "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.2\" baseProfile=\"tiny\" width=\"" + width + "\" height=\"" + height + "\">\n";
};
geometrize_exporter_SvgExporter.getSvgNodeClose = function() {
	return "</svg>";
};
geometrize_exporter_SvgExporter.stylesForShape = function(shape) {
	if(shape.shape.getType() == 6) {
		return geometrize_exporter_SvgExporter.strokeForColor(shape.color) + " stroke-width=\"1\" fill=\"none\" " + geometrize_exporter_SvgExporter.strokeOpacityForAlpha(shape.color & 255);
	} else {
		return geometrize_exporter_SvgExporter.fillForColor(shape.color) + " " + geometrize_exporter_SvgExporter.fillOpacityForAlpha(shape.color & 255);
	}
};
geometrize_exporter_SvgExporter.rgbForColor = function(color) {
	return "rgb(" + (color >> 24 & 255) + "," + (color >> 16 & 255) + "," + (color >> 8 & 255) + ")";
};
geometrize_exporter_SvgExporter.strokeForColor = function(color) {
	return "stroke=\"" + geometrize_exporter_SvgExporter.rgbForColor(color) + "\"";
};
geometrize_exporter_SvgExporter.fillForColor = function(color) {
	return "fill=\"" + geometrize_exporter_SvgExporter.rgbForColor(color) + "\"";
};
geometrize_exporter_SvgExporter.fillOpacityForAlpha = function(alpha) {
	return "fill-opacity=\"" + alpha / 255.0 + "\"";
};
geometrize_exporter_SvgExporter.strokeOpacityForAlpha = function(alpha) {
	return "stroke-opacity=\"" + alpha / 255.0 + "\"";
};
var geometrize_rasterizer_Rasterizer = function() { };
geometrize_rasterizer_Rasterizer.__name__ = true;
geometrize_rasterizer_Rasterizer.drawLines = function(image,c,lines) {
	if(image == null) {
		throw haxe_Exception.thrown("FAIL: image != null");
	}
	if(lines == null) {
		throw haxe_Exception.thrown("FAIL: lines != null");
	}
	var sr = c >> 24 & 255;
	sr |= sr << 8;
	sr *= c & 255;
	sr = sr / 255 | 0;
	var sg = c >> 16 & 255;
	sg |= sg << 8;
	sg *= c & 255;
	sg = sg / 255 | 0;
	var sb = c >> 8 & 255;
	sb |= sb << 8;
	sb *= c & 255;
	sb = sb / 255 | 0;
	var sa = c & 255;
	sa |= sa << 8;
	var _g = 0;
	while(_g < lines.length) {
		var line = lines[_g];
		++_g;
		var y = line.y;
		var ma = 65535;
		var m = 65535;
		var as = (m - sa * (ma / m)) * 257;
		var a = as | 0;
		var _g1 = line.x1;
		var _g2 = line.x2 + 1;
		while(_g1 < _g2) {
			var x = _g1++;
			var d = image.data[image.width * y + x];
			var dr = d >> 24 & 255;
			var dg = d >> 16 & 255;
			var db = d >> 8 & 255;
			var da = d & 255;
			var r = (UInt.toFloat(dr * a + sr * ma) / UInt.toFloat(m) | 0) >> 8;
			var g = (UInt.toFloat(dg * a + sg * ma) / UInt.toFloat(m) | 0) >> 8;
			var b = (UInt.toFloat(db * a + sb * ma) / UInt.toFloat(m) | 0) >> 8;
			var a1 = (UInt.toFloat(da * a + sa * ma) / UInt.toFloat(m) | 0) >> 8;
			image.data[image.width * y + x] = ((r < 0 ? 0 : r > 255 ? 255 : r) << 24) + ((g < 0 ? 0 : g > 255 ? 255 : g) << 16) + ((b < 0 ? 0 : b > 255 ? 255 : b) << 8) + (a1 < 0 ? 0 : a1 > 255 ? 255 : a1);
		}
	}
};
geometrize_rasterizer_Rasterizer.copyLines = function(destination,source,lines) {
	if(destination == null) {
		throw haxe_Exception.thrown("FAIL: destination != null");
	}
	if(source == null) {
		throw haxe_Exception.thrown("FAIL: source != null");
	}
	if(lines == null) {
		throw haxe_Exception.thrown("FAIL: lines != null");
	}
	var _g = 0;
	while(_g < lines.length) {
		var line = lines[_g];
		++_g;
		var y = line.y;
		var _g1 = line.x1;
		var _g2 = line.x2 + 1;
		while(_g1 < _g2) {
			var x = _g1++;
			destination.data[destination.width * y + x] = source.data[source.width * y + x];
		}
	}
};
geometrize_rasterizer_Rasterizer.bresenham = function(x1,y1,x2,y2) {
	var dx = x2 - x1;
	var ix = (dx > 0 ? 1 : 0) - (dx < 0 ? 1 : 0);
	dx = (dx < 0 ? -dx : dx) << 1;
	var dy = y2 - y1;
	var iy = (dy > 0 ? 1 : 0) - (dy < 0 ? 1 : 0);
	dy = (dy < 0 ? -dy : dy) << 1;
	var points = [];
	points.push({ x : x1, y : y1});
	if(dx >= dy) {
		var error = dy - (dx >> 1);
		while(x1 != x2) {
			if(error >= 0 && (error != 0 || ix > 0)) {
				error -= dx;
				y1 += iy;
			}
			error += dy;
			x1 += ix;
			points.push({ x : x1, y : y1});
		}
	} else {
		var error = dx - (dy >> 1);
		while(y1 != y2) {
			if(error >= 0 && (error != 0 || iy > 0)) {
				error -= dy;
				x1 += ix;
			}
			error += dx;
			y1 += iy;
			points.push({ x : x1, y : y1});
		}
	}
	return points;
};
geometrize_rasterizer_Rasterizer.scanlinesForPolygon = function(points) {
	var lines = [];
	var edges = [];
	var _g = 0;
	var _g1 = points.length;
	while(_g < _g1) {
		var i = _g++;
		var p1 = points[i];
		var p2 = i == points.length - 1 ? points[0] : points[i + 1];
		var p1p2 = geometrize_rasterizer_Rasterizer.bresenham(p1.x,p1.y,p2.x,p2.y);
		edges = edges.concat(p1p2);
	}
	var yToXs = new haxe_ds_IntMap();
	var _g = 0;
	while(_g < edges.length) {
		var point = edges[_g];
		++_g;
		var s = yToXs.h[point.y];
		if(s != null) {
			geometrize_ArraySet.add(s,point.x);
		} else {
			s = geometrize_ArraySet.create();
			geometrize_ArraySet.add(s,point.x);
			yToXs.h[point.y] = s;
		}
	}
	var key = yToXs.keys();
	while(key.hasNext()) {
		var key1 = key.next();
		var a = geometrize_ArraySet.toArray(yToXs.h[key1]);
		var minMaxElements;
		if(a == null || a.length == 0) {
			minMaxElements = { x : 0, y : 0};
		} else {
			var min = a[0];
			var max = a[0];
			var _g = 0;
			while(_g < a.length) {
				var value = a[_g];
				++_g;
				if(min > value) {
					min = value;
				}
				if(max < value) {
					max = value;
				}
			}
			minMaxElements = { x : min, y : max};
		}
		lines.push(new geometrize_rasterizer_Scanline(key1,minMaxElements.x,minMaxElements.y));
	}
	return lines;
};
var geometrize_rasterizer_Scanline = function(y,x1,x2) {
	this.y = y;
	this.x1 = x1;
	this.x2 = x2;
};
geometrize_rasterizer_Scanline.__name__ = true;
geometrize_rasterizer_Scanline.trim = function(scanlines,w,h) {
	if(scanlines == null) {
		throw haxe_Exception.thrown("FAIL: scanlines != null");
	}
	var w1 = w;
	var h1 = h;
	var f = function(line) {
		if(line.y < 0 || line.y >= h1 || line.x1 >= w1 || line.x2 < 0) {
			return false;
		} else {
			var value = line.x1;
			var max = w1 - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			line.x1 = value < 0 ? 0 : value > max ? max : value;
			var value = line.x2;
			var max = w1 - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			line.x2 = value < 0 ? 0 : value > max ? max : value;
			return line.x1 <= line.x2;
		}
	};
	var _g = [];
	var _g1 = 0;
	var _g2 = scanlines;
	while(_g1 < _g2.length) {
		var v = _g2[_g1];
		++_g1;
		if(f(v)) {
			_g.push(v);
		}
	}
	return _g;
};
geometrize_rasterizer_Scanline.trimHelper = function(line,w,h) {
	if(line.y < 0 || line.y >= h || line.x1 >= w || line.x2 < 0) {
		return false;
	}
	var value = line.x1;
	var max = w - 1;
	if(0 > max) {
		throw haxe_Exception.thrown("FAIL: min <= max");
	}
	line.x1 = value < 0 ? 0 : value > max ? max : value;
	var value = line.x2;
	var max = w - 1;
	if(0 > max) {
		throw haxe_Exception.thrown("FAIL: min <= max");
	}
	line.x2 = value < 0 ? 0 : value > max ? max : value;
	return line.x1 <= line.x2;
};
var geometrize_runner_ImageRunner = $hx_exports["geometrize"]["runner"]["ImageRunner"] = function(inputImage,backgroundColor) {
	this.model = null;
	this.model = new geometrize_Model(inputImage,backgroundColor);
};
geometrize_runner_ImageRunner.__name__ = true;
geometrize_runner_ImageRunner.prototype = {
	step: function(options) {
		return this.model.step(options.shapeTypes,options.alpha,options.candidateShapesPerStep,options.shapeMutationsPerStep);
	}
	,getImageData: function() {
		if(this.model == null) {
			throw haxe_Exception.thrown("FAIL: model != null");
		}
		return this.model.current;
	}
};
var geometrize_shape_Ellipse = function(xBound,yBound) {
	this.x = Std.random(xBound);
	this.y = Std.random(yBound);
	this.rx = Std.random(32) + 1;
	this.ry = Std.random(32) + 1;
	this.xBound = xBound;
	this.yBound = yBound;
};
geometrize_shape_Ellipse.__name__ = true;
geometrize_shape_Ellipse.prototype = {
	rasterize: function() {
		var lines = [];
		var aspect = this.rx / this.ry;
		var w = this.xBound;
		var h = this.yBound;
		var _g = 0;
		var _g1 = this.ry;
		while(_g < _g1) {
			var dy = _g++;
			var y1 = this.y - dy;
			var y2 = this.y + dy;
			if((y1 < 0 || y1 >= h) && (y2 < 0 || y2 >= h)) {
				continue;
			}
			var s = Math.sqrt(this.ry * this.ry - dy * dy) * aspect | 0;
			var x1 = this.x - s;
			var x2 = this.x + s;
			if(x1 < 0) {
				x1 = 0;
			}
			if(x2 >= w) {
				x2 = w - 1;
			}
			if(y1 >= 0 && y1 < h) {
				lines.push(new geometrize_rasterizer_Scanline(y1,x1,x2));
			}
			if(y2 >= 0 && y2 < h && dy > 0) {
				lines.push(new geometrize_rasterizer_Scanline(y2,x1,x2));
			}
		}
		return lines;
	}
	,mutate: function() {
		var r = Std.random(3);
		switch(r) {
		case 0:
			var value = this.x + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x = value < 0 ? 0 : value > max ? max : value;
			var value = this.y + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y = value < 0 ? 0 : value > max ? max : value;
			break;
		case 1:
			var value = this.rx + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(1 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.rx = value < 1 ? 1 : value > max ? max : value;
			break;
		case 2:
			var value = this.ry + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(1 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.ry = value < 1 ? 1 : value > max ? max : value;
			break;
		}
	}
	,clone: function() {
		var ellipse = new geometrize_shape_Ellipse(this.xBound,this.yBound);
		ellipse.x = this.x;
		ellipse.y = this.y;
		ellipse.rx = this.rx;
		ellipse.ry = this.ry;
		return ellipse;
	}
	,getType: function() {
		return 3;
	}
	,getRawShapeData: function() {
		return [this.x,this.y,this.rx,this.ry];
	}
	,getSvgShapeData: function() {
		return "<ellipse cx=\"" + this.x + "\" cy=\"" + this.y + "\" rx=\"" + this.rx + "\" ry=\"" + this.ry + "\" " + geometrize_exporter_SvgExporter.SVG_STYLE_HOOK + " />";
	}
};
var geometrize_shape_Circle = function(xBound,yBound) {
	geometrize_shape_Ellipse.call(this,xBound,yBound);
	this.rx = Std.random(32) + 1;
	this.ry = this.rx;
};
geometrize_shape_Circle.__name__ = true;
geometrize_shape_Circle.__super__ = geometrize_shape_Ellipse;
geometrize_shape_Circle.prototype = $extend(geometrize_shape_Ellipse.prototype,{
	mutate: function() {
		var r = Std.random(2);
		switch(r) {
		case 0:
			var value = this.x + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x = value < 0 ? 0 : value > max ? max : value;
			var value = this.y + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y = value < 0 ? 0 : value > max ? max : value;
			break;
		case 1:
			var value = this.rx + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(1 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			var r = value < 1 ? 1 : value > max ? max : value;
			this.rx = r;
			this.ry = r;
			break;
		}
	}
	,clone: function() {
		var circle = new geometrize_shape_Circle(this.xBound,this.yBound);
		circle.x = this.x;
		circle.y = this.y;
		circle.rx = this.rx;
		circle.ry = this.ry;
		return circle;
	}
	,getType: function() {
		return 5;
	}
	,getRawShapeData: function() {
		return [this.x,this.y,this.rx];
	}
	,getSvgShapeData: function() {
		return "<circle cx=\"" + this.x + "\" cy=\"" + this.y + "\" r=\"" + this.rx + "\" " + geometrize_exporter_SvgExporter.SVG_STYLE_HOOK + " />";
	}
});
var geometrize_shape_Line = function(xBound,yBound) {
	this.x1 = Std.random(xBound);
	this.y1 = Std.random(yBound);
	var value = this.x1 + Std.random(32) + 1;
	if(0 > xBound) {
		throw haxe_Exception.thrown("FAIL: min <= max");
	}
	this.x2 = value < 0 ? 0 : value > xBound ? xBound : value;
	var value = this.y1 + Std.random(32) + 1;
	if(0 > yBound) {
		throw haxe_Exception.thrown("FAIL: min <= max");
	}
	this.y2 = value < 0 ? 0 : value > yBound ? yBound : value;
	this.xBound = xBound;
	this.yBound = yBound;
};
geometrize_shape_Line.__name__ = true;
geometrize_shape_Line.prototype = {
	rasterize: function() {
		var lines = [];
		var points = geometrize_rasterizer_Rasterizer.bresenham(this.x1,this.y1,this.x2,this.y2);
		var _g = 0;
		while(_g < points.length) {
			var point = points[_g];
			++_g;
			lines.push(new geometrize_rasterizer_Scanline(point.y,point.x,point.x));
		}
		return geometrize_rasterizer_Scanline.trim(lines,this.xBound,this.yBound);
	}
	,mutate: function() {
		var r = Std.random(4);
		switch(r) {
		case 0:
			var value = this.x1 + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x1 = value < 0 ? 0 : value > max ? max : value;
			var value = this.y1 + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y1 = value < 0 ? 0 : value > max ? max : value;
			break;
		case 1:
			var value = this.x2 + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x2 = value < 0 ? 0 : value > max ? max : value;
			var value = this.y2 + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y2 = value < 0 ? 0 : value > max ? max : value;
			break;
		}
	}
	,clone: function() {
		var line = new geometrize_shape_Line(this.xBound,this.yBound);
		line.x1 = this.x1;
		line.y1 = this.y1;
		line.x2 = this.x2;
		line.y2 = this.y2;
		return line;
	}
	,getType: function() {
		return 6;
	}
	,getRawShapeData: function() {
		return [this.x1,this.y1,this.x2,this.y2];
	}
	,getSvgShapeData: function() {
		return "<line x1=\"" + this.x1 + "\" y1=\"" + this.y1 + "\" x2=\"" + this.x2 + "\" y2=\"" + this.y2 + "\" " + geometrize_exporter_SvgExporter.SVG_STYLE_HOOK + " />";
	}
};
var geometrize_shape_Rectangle = function(xBound,yBound) {
	this.x1 = Std.random(xBound);
	this.y1 = Std.random(yBound);
	var value = this.x1 + Std.random(32) + 1;
	var max = xBound - 1;
	if(0 > max) {
		throw haxe_Exception.thrown("FAIL: min <= max");
	}
	this.x2 = value < 0 ? 0 : value > max ? max : value;
	var value = this.y1 + Std.random(32) + 1;
	var max = yBound - 1;
	if(0 > max) {
		throw haxe_Exception.thrown("FAIL: min <= max");
	}
	this.y2 = value < 0 ? 0 : value > max ? max : value;
	this.xBound = xBound;
	this.yBound = yBound;
};
geometrize_shape_Rectangle.__name__ = true;
geometrize_shape_Rectangle.prototype = {
	rasterize: function() {
		var lines = [];
		var _g = this.y1;
		var _g1 = this.y2;
		while(_g < _g1) {
			var y = _g++;
			if(this.x1 != this.x2) {
				var first = this.x1;
				var second = this.x2;
				var first1 = this.x1;
				var second1 = this.x2;
				lines.push(new geometrize_rasterizer_Scanline(y,first < second ? first : second,first1 > second1 ? first1 : second1));
			}
		}
		return lines;
	}
	,mutate: function() {
		var r = Std.random(2);
		switch(r) {
		case 0:
			var value = this.x1 + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x1 = value < 0 ? 0 : value > max ? max : value;
			var value = this.y1 + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y1 = value < 0 ? 0 : value > max ? max : value;
			break;
		case 1:
			var value = this.x2 + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x2 = value < 0 ? 0 : value > max ? max : value;
			var value = this.y2 + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y2 = value < 0 ? 0 : value > max ? max : value;
			break;
		}
	}
	,clone: function() {
		var rectangle = new geometrize_shape_Rectangle(this.xBound,this.yBound);
		rectangle.x1 = this.x1;
		rectangle.y1 = this.y1;
		rectangle.x2 = this.x2;
		rectangle.y2 = this.y2;
		return rectangle;
	}
	,getType: function() {
		return 0;
	}
	,getRawShapeData: function() {
		var first = this.x1;
		var second = this.x2;
		var first1 = this.y1;
		var second1 = this.y2;
		var first2 = this.x1;
		var second2 = this.x2;
		var first3 = this.y1;
		var second3 = this.y2;
		return [first < second ? first : second,first1 < second1 ? first1 : second1,first2 > second2 ? first2 : second2,first3 > second3 ? first3 : second3];
	}
	,getSvgShapeData: function() {
		var first = this.x1;
		var second = this.x2;
		var first1 = this.y1;
		var second1 = this.y2;
		var first2 = this.x1;
		var second2 = this.x2;
		var first3 = this.x1;
		var second3 = this.x2;
		var first4 = this.y1;
		var second4 = this.y2;
		var first5 = this.y1;
		var second5 = this.y2;
		return "<rect x=\"" + (first < second ? first : second) + "\" y=\"" + (first1 < second1 ? first1 : second1) + "\" width=\"" + ((first2 > second2 ? first2 : second2) - (first3 < second3 ? first3 : second3)) + "\" height=\"" + ((first4 > second4 ? first4 : second4) - (first5 < second5 ? first5 : second5)) + "\" " + geometrize_exporter_SvgExporter.SVG_STYLE_HOOK + " />";
	}
};
var geometrize_shape_RotatedEllipse = function(xBound,yBound) {
	this.x = Std.random(xBound);
	this.y = Std.random(yBound);
	this.rx = Std.random(32) + 1;
	this.ry = Std.random(32) + 1;
	this.angle = Std.random(360);
	this.xBound = xBound;
	this.yBound = yBound;
};
geometrize_shape_RotatedEllipse.__name__ = true;
geometrize_shape_RotatedEllipse.prototype = {
	rasterize: function() {
		var pointCount = 20;
		var points = [];
		var rads = this.angle * (Math.PI / 180.0);
		var c = Math.cos(rads);
		var s = Math.sin(rads);
		var _g = 0;
		var _g1 = pointCount;
		while(_g < _g1) {
			var i = _g++;
			var rot = 360.0 / pointCount * i * (Math.PI / 180.0);
			var crx = this.rx * Math.cos(rot);
			var cry = this.ry * Math.sin(rot);
			var tx = crx * c - cry * s + this.x | 0;
			var ty = crx * s + cry * c + this.y | 0;
			points.push({ x : tx, y : ty});
		}
		return geometrize_rasterizer_Scanline.trim(geometrize_rasterizer_Rasterizer.scanlinesForPolygon(points),this.xBound,this.yBound);
	}
	,mutate: function() {
		var r = Std.random(4);
		switch(r) {
		case 0:
			var value = this.x + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x = value < 0 ? 0 : value > max ? max : value;
			var value = this.y + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y = value < 0 ? 0 : value > max ? max : value;
			break;
		case 1:
			var value = this.rx + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(1 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.rx = value < 1 ? 1 : value > max ? max : value;
			break;
		case 2:
			var value = this.ry + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(1 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.ry = value < 1 ? 1 : value > max ? max : value;
			break;
		case 3:
			var value = this.angle + (-4 + Math.floor(9 * Math.random()));
			this.angle = value < 0 ? 0 : value > 360 ? 360 : value;
			break;
		}
	}
	,clone: function() {
		var ellipse = new geometrize_shape_RotatedEllipse(this.xBound,this.yBound);
		ellipse.x = this.x;
		ellipse.y = this.y;
		ellipse.rx = this.rx;
		ellipse.ry = this.ry;
		ellipse.angle = this.angle;
		return ellipse;
	}
	,getType: function() {
		return 4;
	}
	,getRawShapeData: function() {
		return [this.x,this.y,this.rx,this.ry,this.angle];
	}
	,getSvgShapeData: function() {
		var s = "<g transform=\"translate(" + this.x + " " + this.y + ") rotate(" + this.angle + ") scale(" + this.rx + " " + this.ry + ")\">";
		s += "<ellipse cx=\"" + 0 + "\" cy=\"" + 0 + "\" rx=\"" + 1 + "\" ry=\"" + 1 + "\" " + geometrize_exporter_SvgExporter.SVG_STYLE_HOOK + " />";
		s += "</g>";
		return s;
	}
};
var geometrize_shape_RotatedRectangle = function(xBound,yBound) {
	this.x1 = Std.random(xBound);
	this.y1 = Std.random(yBound);
	var value = this.x1 + Std.random(32) + 1;
	if(0 > xBound) {
		throw haxe_Exception.thrown("FAIL: min <= max");
	}
	this.x2 = value < 0 ? 0 : value > xBound ? xBound : value;
	var value = this.y1 + Std.random(32) + 1;
	if(0 > yBound) {
		throw haxe_Exception.thrown("FAIL: min <= max");
	}
	this.y2 = value < 0 ? 0 : value > yBound ? yBound : value;
	this.angle = Math.floor(361 * Math.random());
	this.xBound = xBound;
	this.yBound = yBound;
};
geometrize_shape_RotatedRectangle.__name__ = true;
geometrize_shape_RotatedRectangle.prototype = {
	rasterize: function() {
		var first = this.x1;
		var second = this.x2;
		var xm1 = first < second ? first : second;
		var first = this.x1;
		var second = this.x2;
		var xm2 = first > second ? first : second;
		var first = this.y1;
		var second = this.y2;
		var ym1 = first < second ? first : second;
		var first = this.y1;
		var second = this.y2;
		var ym2 = first > second ? first : second;
		var cx = (xm1 + xm2) / 2 | 0;
		var cy = (ym1 + ym2) / 2 | 0;
		var ox1 = xm1 - cx;
		var ox2 = xm2 - cx;
		var oy1 = ym1 - cy;
		var oy2 = ym2 - cy;
		var rads = this.angle * Math.PI / 180.0;
		var c = Math.cos(rads);
		var s = Math.sin(rads);
		var ulx = ox1 * c - oy1 * s + cx | 0;
		var uly = ox1 * s + oy1 * c + cy | 0;
		var blx = ox1 * c - oy2 * s + cx | 0;
		var bly = ox1 * s + oy2 * c + cy | 0;
		var urx = ox2 * c - oy1 * s + cx | 0;
		var ury = ox2 * s + oy1 * c + cy | 0;
		var brx = ox2 * c - oy2 * s + cx | 0;
		var bry = ox2 * s + oy2 * c + cy | 0;
		return geometrize_rasterizer_Scanline.trim(geometrize_rasterizer_Rasterizer.scanlinesForPolygon([{ x : ulx, y : uly},{ x : urx, y : ury},{ x : brx, y : bry},{ x : blx, y : bly}]),this.xBound,this.yBound);
	}
	,mutate: function() {
		var r = Std.random(3);
		switch(r) {
		case 0:
			var value = this.x1 + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x1 = value < 0 ? 0 : value > max ? max : value;
			var value = this.y1 + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y1 = value < 0 ? 0 : value > max ? max : value;
			break;
		case 1:
			var value = this.x2 + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x2 = value < 0 ? 0 : value > max ? max : value;
			var value = this.y2 + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y2 = value < 0 ? 0 : value > max ? max : value;
			break;
		case 2:
			var value = this.angle + (-4 + Math.floor(9 * Math.random()));
			this.angle = value < 0 ? 0 : value > 360 ? 360 : value;
			break;
		}
	}
	,clone: function() {
		var rectangle = new geometrize_shape_RotatedRectangle(this.xBound,this.yBound);
		rectangle.x1 = this.x1;
		rectangle.y1 = this.y1;
		rectangle.x2 = this.x2;
		rectangle.y2 = this.y2;
		rectangle.angle = this.angle;
		return rectangle;
	}
	,getType: function() {
		return 1;
	}
	,getRawShapeData: function() {
		var first = this.x1;
		var second = this.x2;
		var first1 = this.y1;
		var second1 = this.y2;
		var first2 = this.x1;
		var second2 = this.x2;
		var first3 = this.y1;
		var second3 = this.y2;
		return [first < second ? first : second,first1 < second1 ? first1 : second1,first2 > second2 ? first2 : second2,first3 > second3 ? first3 : second3,this.angle];
	}
	,getSvgShapeData: function() {
		var first = this.x1;
		var second = this.x2;
		var xm1 = first < second ? first : second;
		var first = this.x1;
		var second = this.x2;
		var xm2 = first > second ? first : second;
		var first = this.y1;
		var second = this.y2;
		var ym1 = first < second ? first : second;
		var first = this.y1;
		var second = this.y2;
		var ym2 = first > second ? first : second;
		var cx = (xm1 + xm2) / 2 | 0;
		var cy = (ym1 + ym2) / 2 | 0;
		var ox1 = xm1 - cx;
		var ox2 = xm2 - cx;
		var oy1 = ym1 - cy;
		var oy2 = ym2 - cy;
		var rads = this.angle * Math.PI / 180.0;
		var c = Math.cos(rads);
		var s = Math.sin(rads);
		var ulx = ox1 * c - oy1 * s + cx | 0;
		var uly = ox1 * s + oy1 * c + cy | 0;
		var blx = ox1 * c - oy2 * s + cx | 0;
		var bly = ox1 * s + oy2 * c + cy | 0;
		var urx = ox2 * c - oy1 * s + cx | 0;
		var ury = ox2 * s + oy1 * c + cy | 0;
		var brx = ox2 * c - oy2 * s + cx | 0;
		var bry = ox2 * s + oy2 * c + cy | 0;
		var points = [{ x : ulx, y : uly},{ x : urx, y : ury},{ x : brx, y : bry},{ x : blx, y : bly}];
		var s = "<polygon points=\"";
		var _g = 0;
		var _g1 = points.length;
		while(_g < _g1) {
			var i = _g++;
			s += points[i].x + " " + points[i].y;
			if(i != points.length - 1) {
				s += " ";
			}
		}
		s += "\" " + geometrize_exporter_SvgExporter.SVG_STYLE_HOOK + "/>";
		return s;
	}
	,getCornerPoints: function() {
		var first = this.x1;
		var second = this.x2;
		var xm1 = first < second ? first : second;
		var first = this.x1;
		var second = this.x2;
		var xm2 = first > second ? first : second;
		var first = this.y1;
		var second = this.y2;
		var ym1 = first < second ? first : second;
		var first = this.y1;
		var second = this.y2;
		var ym2 = first > second ? first : second;
		var cx = (xm1 + xm2) / 2 | 0;
		var cy = (ym1 + ym2) / 2 | 0;
		var ox1 = xm1 - cx;
		var ox2 = xm2 - cx;
		var oy1 = ym1 - cy;
		var oy2 = ym2 - cy;
		var rads = this.angle * Math.PI / 180.0;
		var c = Math.cos(rads);
		var s = Math.sin(rads);
		var ulx = ox1 * c - oy1 * s + cx | 0;
		var uly = ox1 * s + oy1 * c + cy | 0;
		var blx = ox1 * c - oy2 * s + cx | 0;
		var bly = ox1 * s + oy2 * c + cy | 0;
		var urx = ox2 * c - oy1 * s + cx | 0;
		var ury = ox2 * s + oy1 * c + cy | 0;
		var brx = ox2 * c - oy2 * s + cx | 0;
		var bry = ox2 * s + oy2 * c + cy | 0;
		return [{ x : ulx, y : uly},{ x : urx, y : ury},{ x : brx, y : bry},{ x : blx, y : bly}];
	}
};
var geometrize_shape_ShapeFactory = function() { };
geometrize_shape_ShapeFactory.__name__ = true;
geometrize_shape_ShapeFactory.create = function(type,xBound,yBound) {
	switch(type) {
	case 0:
		return new geometrize_shape_Rectangle(xBound,yBound);
	case 1:
		return new geometrize_shape_RotatedRectangle(xBound,yBound);
	case 2:
		return new geometrize_shape_Triangle(xBound,yBound);
	case 3:
		return new geometrize_shape_Ellipse(xBound,yBound);
	case 4:
		return new geometrize_shape_RotatedEllipse(xBound,yBound);
	case 5:
		return new geometrize_shape_Circle(xBound,yBound);
	case 6:
		return new geometrize_shape_Line(xBound,yBound);
	}
};
geometrize_shape_ShapeFactory.randomShape = function(xBound,yBound) {
	var a = [0,1,2,3,4,5,6];
	if(!(a != null && a.length > 0)) {
		throw haxe_Exception.thrown("FAIL: a != null && a.length > 0");
	}
	var upper = a.length - 1;
	if(0 > upper) {
		throw haxe_Exception.thrown("FAIL: lower <= upper");
	}
	return geometrize_shape_ShapeFactory.create(a[Math.floor((upper + 1) * Math.random())],xBound,yBound);
};
geometrize_shape_ShapeFactory.randomShapeOf = function(types,xBound,yBound) {
	if(!(types != null && types.length > 0)) {
		throw haxe_Exception.thrown("FAIL: a != null && a.length > 0");
	}
	var upper = types.length - 1;
	if(0 > upper) {
		throw haxe_Exception.thrown("FAIL: lower <= upper");
	}
	return geometrize_shape_ShapeFactory.create(types[Math.floor((upper + 1) * Math.random())],xBound,yBound);
};
var geometrize_shape_ShapeTypes = $hx_exports["geometrize"]["shape"]["ShapeTypes"] = function() { };
geometrize_shape_ShapeTypes.__name__ = true;
var geometrize_shape_Triangle = function(xBound,yBound) {
	this.x1 = Std.random(xBound);
	this.y1 = Std.random(yBound);
	this.x2 = this.x1 + (-16 + Math.floor(33 * Math.random()));
	this.y2 = this.y1 + (-16 + Math.floor(33 * Math.random()));
	this.x3 = this.x1 + (-16 + Math.floor(33 * Math.random()));
	this.y3 = this.y1 + (-16 + Math.floor(33 * Math.random()));
	this.xBound = xBound;
	this.yBound = yBound;
};
geometrize_shape_Triangle.__name__ = true;
geometrize_shape_Triangle.prototype = {
	rasterize: function() {
		return geometrize_rasterizer_Scanline.trim(geometrize_rasterizer_Rasterizer.scanlinesForPolygon([{ x : this.x1, y : this.y1},{ x : this.x2, y : this.y2},{ x : this.x3, y : this.y3}]),this.xBound,this.yBound);
	}
	,mutate: function() {
		var r = Std.random(3);
		switch(r) {
		case 0:
			var value = this.x1 + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x1 = value < 0 ? 0 : value > max ? max : value;
			var value = this.y1 + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y1 = value < 0 ? 0 : value > max ? max : value;
			break;
		case 1:
			var value = this.x2 + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x2 = value < 0 ? 0 : value > max ? max : value;
			var value = this.y2 + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y2 = value < 0 ? 0 : value > max ? max : value;
			break;
		case 2:
			var value = this.x3 + (-16 + Math.floor(33 * Math.random()));
			var max = this.xBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.x3 = value < 0 ? 0 : value > max ? max : value;
			var value = this.y3 + (-16 + Math.floor(33 * Math.random()));
			var max = this.yBound - 1;
			if(0 > max) {
				throw haxe_Exception.thrown("FAIL: min <= max");
			}
			this.y3 = value < 0 ? 0 : value > max ? max : value;
			break;
		}
	}
	,clone: function() {
		var triangle = new geometrize_shape_Triangle(this.xBound,this.yBound);
		triangle.x1 = this.x1;
		triangle.y1 = this.y1;
		triangle.x2 = this.x2;
		triangle.y2 = this.y2;
		triangle.x3 = this.x3;
		triangle.y3 = this.y3;
		return triangle;
	}
	,getType: function() {
		return 2;
	}
	,getRawShapeData: function() {
		return [this.x1,this.y1,this.x2,this.y2,this.x3,this.y3];
	}
	,getSvgShapeData: function() {
		return "<polygon points=\"" + this.x1 + "," + this.y1 + " " + this.x2 + "," + this.y2 + " " + this.x3 + "," + this.y3 + "\" " + geometrize_exporter_SvgExporter.SVG_STYLE_HOOK + "/>";
	}
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
};
haxe_Exception.__name__ = true;
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	unwrap: function() {
		return this.__nativeException;
	}
	,toString: function() {
		return this.get_message();
	}
	,get_message: function() {
		return this.message;
	}
	,get_native: function() {
		return this.__nativeException;
	}
});
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
};
haxe_ValueException.__name__ = true;
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	unwrap: function() {
		return this.value;
	}
});
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) if(this.h.hasOwnProperty(key)) a.push(+key);
		return new haxe_iterators_ArrayIterator(a);
	}
};
var haxe_ds_List = function() {
	this.length = 0;
};
haxe_ds_List.__name__ = true;
haxe_ds_List.prototype = {
	add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = true;
var haxe_exceptions_PosException = function(message,previous,pos) {
	haxe_Exception.call(this,message,previous);
	if(pos == null) {
		this.posInfos = { fileName : "(unknown)", lineNumber : 0, className : "(unknown)", methodName : "(unknown)"};
	} else {
		this.posInfos = pos;
	}
};
haxe_exceptions_PosException.__name__ = true;
haxe_exceptions_PosException.__super__ = haxe_Exception;
haxe_exceptions_PosException.prototype = $extend(haxe_Exception.prototype,{
	toString: function() {
		return "" + haxe_Exception.prototype.toString.call(this) + " in " + this.posInfos.className + "." + this.posInfos.methodName + " at " + this.posInfos.fileName + ":" + this.posInfos.lineNumber;
	}
});
var haxe_exceptions_NotImplementedException = function(message,previous,pos) {
	if(message == null) {
		message = "Not implemented";
	}
	haxe_exceptions_PosException.call(this,message,previous,pos);
};
haxe_exceptions_NotImplementedException.__name__ = true;
haxe_exceptions_NotImplementedException.__super__ = haxe_exceptions_PosException;
haxe_exceptions_NotImplementedException.prototype = $extend(haxe_exceptions_PosException.prototype,{
});
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = true;
haxe_io_Bytes.prototype = {
	blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(srcpos == 0 && len == src.b.byteLength) {
			this.b.set(src.b,pos);
		} else {
			this.b.set(src.b.subarray(srcpos,srcpos + len),pos);
		}
	}
	,fill: function(pos,len,value) {
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			this.b[pos++] = value;
		}
	}
	,getString: function(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		var s = "";
		var b = this.b;
		var i = pos;
		var max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			var debug = pos > 0;
			while(i < max) {
				var c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					var code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					var c2 = b[i++];
					var code1 = (c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code1);
				} else {
					var c21 = b[i++];
					var c3 = b[i++];
					var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				var c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
};
var haxe_io_BytesBuffer = function() {
	this.pos = 0;
	this.size = 0;
};
haxe_io_BytesBuffer.__name__ = true;
haxe_io_BytesBuffer.prototype = {
	add: function(src) {
		if(this.pos + src.length > this.size) {
			this.grow(src.length);
		}
		if(this.size == 0) {
			return;
		}
		var sub = new Uint8Array(src.b.buffer,src.b.byteOffset,src.length);
		this.u8.set(sub,this.pos);
		this.pos += src.length;
	}
	,grow: function(delta) {
		var req = this.pos + delta;
		var nsize = this.size == 0 ? 16 : this.size;
		while(nsize < req) nsize = nsize * 3 >> 1;
		var nbuf = new ArrayBuffer(nsize);
		var nu8 = new Uint8Array(nbuf);
		if(this.size > 0) {
			nu8.set(this.u8);
		}
		this.size = nsize;
		this.buffer = nbuf;
		this.u8 = nu8;
		this.view = new DataView(this.buffer);
	}
	,getBytes: function() {
		if(this.size == 0) {
			return new haxe_io_Bytes(new ArrayBuffer(0));
		}
		var b = new haxe_io_Bytes(this.buffer);
		b.length = this.pos;
		return b;
	}
};
var haxe_io_BytesInput = function(b,pos,len) {
	if(pos == null) {
		pos = 0;
	}
	if(len == null) {
		len = b.length - pos;
	}
	if(pos < 0 || len < 0 || pos + len > b.length) {
		throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
	}
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
haxe_io_BytesInput.__name__ = true;
haxe_io_BytesInput.__super__ = haxe_io_Input;
haxe_io_BytesInput.prototype = $extend(haxe_io_Input.prototype,{
	readByte: function() {
		if(this.len == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(this.len == 0 && len > 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		if(this.len < len) {
			len = this.len;
		}
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		var _g1 = len;
		while(_g < _g1) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
});
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
var haxe_io_Eof = function() {
};
haxe_io_Eof.__name__ = true;
haxe_io_Eof.prototype = {
	toString: function() {
		return "Eof";
	}
};
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else {
		this.dir = null;
	}
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
haxe_io_Path.__name__ = true;
haxe_io_Path.withoutExtension = function(path) {
	var s = new haxe_io_Path(path);
	s.ext = null;
	return s.toString();
};
haxe_io_Path.withoutDirectory = function(path) {
	var s = new haxe_io_Path(path);
	s.dir = null;
	return s.toString();
};
haxe_io_Path.directory = function(path) {
	var s = new haxe_io_Path(path);
	if(s.dir == null) {
		return "";
	}
	return s.dir;
};
haxe_io_Path.join = function(paths) {
	var _g = [];
	var _g1 = 0;
	var _g2 = paths;
	while(_g1 < _g2.length) {
		var v = _g2[_g1];
		++_g1;
		if(v != null && v != "") {
			_g.push(v);
		}
	}
	var paths = _g;
	if(paths.length == 0) {
		return "";
	}
	var path = paths[0];
	var _g = 1;
	var _g1 = paths.length;
	while(_g < _g1) {
		var i = _g++;
		path = haxe_io_Path.addTrailingSlash(path);
		path += paths[i];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	var slash = "/";
	path = path.split("\\").join(slash);
	if(path == slash) {
		return slash;
	}
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") {
			target.pop();
		} else if(token == "") {
			if(target.length > 0 || HxOverrides.cca(path,0) == 47) {
				target.push(token);
			}
		} else if(token != ".") {
			target.push(token);
		}
	}
	var tmp = target.join(slash);
	var acc_b = "";
	var colon = false;
	var slashes = false;
	var _g2_offset = 0;
	var _g2_s = tmp;
	while(_g2_offset < _g2_s.length) {
		var s = _g2_s;
		var index = _g2_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g2_offset;
		}
		var c2 = c1;
		switch(c2) {
		case 47:
			if(!colon) {
				slashes = true;
			} else {
				var i = c2;
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				acc_b += String.fromCodePoint(i);
			}
			break;
		case 58:
			acc_b += ":";
			colon = true;
			break;
		default:
			var i1 = c2;
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			acc_b += String.fromCodePoint(i1);
		}
	}
	return acc_b;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) {
		return "/";
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) {
			return path + "\\";
		} else {
			return path;
		}
	} else if(c1 != path.length - 1) {
		return path + "/";
	} else {
		return path;
	}
};
haxe_io_Path.prototype = {
	toString: function() {
		return (this.dir == null ? "" : this.dir + (this.backslash ? "\\" : "/")) + this.file + (this.ext == null ? "" : "." + this.ext);
	}
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = true;
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var haxe_zip_Compress = function(level) {
	throw haxe_Exception.thrown("Not implemented for this platform");
};
haxe_zip_Compress.__name__ = true;
haxe_zip_Compress.run = function(s,level) {
	var data = s.b;
	var buffer = js_node_Zlib.deflateSync(js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length),{ level : level});
	return js_node_buffer__$Buffer_Helper.bytesOfBuffer(buffer);
};
haxe_zip_Compress.prototype = {
	execute: function(src,srcPos,dst,dstPos) {
		return null;
	}
	,setFlushMode: function(f) {
	}
	,close: function() {
	}
};
var haxe_zip_FlushMode = $hxEnums["haxe.zip.FlushMode"] = { __ename__:true,__constructs__:null
	,NO: {_hx_name:"NO",_hx_index:0,__enum__:"haxe.zip.FlushMode",toString:$estr}
	,SYNC: {_hx_name:"SYNC",_hx_index:1,__enum__:"haxe.zip.FlushMode",toString:$estr}
	,FULL: {_hx_name:"FULL",_hx_index:2,__enum__:"haxe.zip.FlushMode",toString:$estr}
	,FINISH: {_hx_name:"FINISH",_hx_index:3,__enum__:"haxe.zip.FlushMode",toString:$estr}
	,BLOCK: {_hx_name:"BLOCK",_hx_index:4,__enum__:"haxe.zip.FlushMode",toString:$estr}
};
haxe_zip_FlushMode.__constructs__ = [haxe_zip_FlushMode.NO,haxe_zip_FlushMode.SYNC,haxe_zip_FlushMode.FULL,haxe_zip_FlushMode.FINISH,haxe_zip_FlushMode.BLOCK];
var haxe_zip_Uncompress = function(windowBits) {
	this.windowBits = windowBits;
};
haxe_zip_Uncompress.__name__ = true;
haxe_zip_Uncompress.run = function(src,bufsize) {
	var data = src.b;
	var buffer = js_node_Zlib.inflateSync(js_node_buffer_Buffer.from(data.buffer,data.byteOffset,src.length),bufsize == null ? { } : { chunkSize : bufsize});
	return js_node_buffer__$Buffer_Helper.bytesOfBuffer(buffer);
};
haxe_zip_Uncompress.prototype = {
	execute: function(src,srcPos,dst,dstPos) {
		var data = src.b;
		var src1 = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,src.length).slice(srcPos);
		var data = dst.b;
		var dst1 = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,dst.length);
		var res = js_node_Zlib.inflateRawSync(src1,{ info : true});
		var engine = res.engine;
		var res1 = res.buffer;
		dst1.set(res1,dstPos);
		return { done : true, read : engine.bytesRead, write : res1.byteLength};
	}
	,setFlushMode: function(f) {
	}
	,close: function() {
	}
};
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_node_ChildProcess = require("child_process");
var js_node_Fs = require("fs");
var js_node_KeyValue = {};
js_node_KeyValue.get_key = function(this1) {
	return this1[0];
};
js_node_KeyValue.get_value = function(this1) {
	return this1[1];
};
var js_node_Zlib = require("zlib");
var js_node_buffer_Buffer = require("buffer").Buffer;
var js_node_buffer__$Buffer_Helper = function() { };
js_node_buffer__$Buffer_Helper.__name__ = true;
js_node_buffer__$Buffer_Helper.bytesOfBuffer = function(b) {
	var o = Object.create(haxe_io_Bytes.prototype);
	o.length = b.byteLength;
	o.b = b;
	b.bufferValue = b;
	b.hxBytes = o;
	b.bytes = b;
	return o;
};
var js_node_stream_WritableNewOptionsAdapter = {};
js_node_stream_WritableNewOptionsAdapter.from = function(options) {
	if(!Object.prototype.hasOwnProperty.call(options,"final")) {
		Object.defineProperty(options,"final",{ get : function() {
			return options.final_;
		}});
	}
	return options;
};
var js_node_url_URLSearchParamsEntry = {};
js_node_url_URLSearchParamsEntry._new = function(name,value) {
	var this1 = [name,value];
	return this1;
};
js_node_url_URLSearchParamsEntry.get_name = function(this1) {
	return this1[0];
};
js_node_url_URLSearchParamsEntry.get_value = function(this1) {
	return this1[1];
};
var src_GeometrizeCli = function() { };
src_GeometrizeCli.__name__ = true;
src_GeometrizeCli.main = function() {
	var shapeMap_h = Object.create(null);
	shapeMap_h["rectangle"] = 0;
	shapeMap_h["rotated_rectangle"] = 1;
	shapeMap_h["triangle"] = 2;
	shapeMap_h["ellipse"] = 3;
	shapeMap_h["rotated_ellipse"] = 4;
	shapeMap_h["circle"] = 5;
	shapeMap_h["line"] = 6;
	arguable_ArgParser.delimiter = "-";
	var results = arguable_ArgParser.parse(process.argv.slice(2));
	if(!results.has("i") || !results.has("o")) {
		process.stdout.write("Did not specify input or output.");
		process.stdout.write("\n");
		process.exit(1);
	}
	var verbose = false;
	if(results.has("v")) {
		verbose = true;
	}
	var inputPath = results.get("i").value;
	var outputPath = results.get("o").value;
	var splitPath = outputPath.split(".");
	var fileExt = splitPath[splitPath.length - 1];
	var shapeAmt = 200;
	if(results.has("s")) {
		shapeAmt = Std.parseInt(results.get("s").value);
	}
	var shapeTypes = [5,3,6,0,4,1,2];
	if(results.has("t")) {
		shapeTypes = [];
		var split = results.get("t").value.split(" ");
		var _g = 0;
		while(_g < split.length) {
			var i = split[_g];
			++_g;
			shapeTypes.push(shapeMap_h[i]);
		}
	}
	var alpha = 128;
	if(results.has("a")) {
		alpha = Std.parseInt(results.get("a").value);
	}
	var candidates = 500;
	if(results.has("c")) {
		candidates = Std.parseInt(results.get("c").value);
	}
	var mutations = 100;
	if(results.has("m")) {
		mutations = Std.parseInt(results.get("m").value);
	}
	var bitmap = src_GeometrizeCli.readPNGImage(new haxe_io_Path(inputPath));
	var runner = new geometrize_runner_ImageRunner(bitmap,0);
	var shapes = [];
	var _g = 0;
	var _g1 = shapeAmt;
	while(_g < _g1) {
		var i = _g++;
		var shapeData = runner.step({ shapeTypes : shapeTypes, alpha : alpha, candidateShapesPerStep : candidates, shapeMutationsPerStep : mutations});
		var _g2 = 0;
		while(_g2 < shapeData.length) {
			var shape = shapeData[_g2];
			++_g2;
			shapes.push(shape);
		}
	}
	if(fileExt == "svg" || fileExt == "png") {
		var data = geometrize_exporter_SvgExporter.export(shapes,bitmap.width,bitmap.height);
		var svgPath = new haxe_io_Path(outputPath).toString();
		js_node_Fs.writeFileSync(svgPath,data);
		if(fileExt == "png") {
			var programPath = haxe_io_Path.directory(__filename);
			var execPath = haxe_io_Path.join([programPath,"./svg-to-img-cli"]);
			var fileName = haxe_io_Path.withoutExtension(haxe_io_Path.withoutDirectory(outputPath));
			var cmd = execPath + " -i ./" + svgPath + " -o ./" + fileName + ".png -w " + bitmap.width;
			var args = null;
			if(args == null) {
				js_node_ChildProcess.spawnSync(cmd,{ shell : true, stdio : "inherit"});
			} else {
				js_node_ChildProcess.spawnSync(cmd,args,{ stdio : "inherit"});
			}
		}
	} else if(fileExt == "json") {
		var finishedData = geometrize_exporter_ShapeJsonExporter.export(shapes);
		js_node_Fs.writeFileSync(new haxe_io_Path(outputPath).toString(),finishedData);
	} else {
		process.stdout.write("Did not recognize output file extension.");
		process.stdout.write("\n");
		process.stdout.write("Supported file extensions: .svg, .png, .json");
		process.stdout.write("\n");
	}
};
src_GeometrizeCli.log = function(v,verbose) {
	if(verbose) {
		console.log("src/GeometrizeCli.hx:130:",v);
	}
};
src_GeometrizeCli.readPNGImage = function(filePath) {
	try {
		var handle = new sys_io_FileInput(js_node_Fs.openSync(filePath.toString(),"r"));
		var d = new format_png_Reader(handle).read();
		var hdr = format_png_Tools.getHeader(d);
		handle.close();
		var bytes = format_png_Tools.extract32(d);
		format_png_Tools.reverseBytes(bytes);
		if(bytes == null) {
			throw haxe_Exception.thrown("FAIL: bytes != null");
		}
		var actual = bytes.length % 4;
		var expected = 0;
		if(actual != expected) {
			throw haxe_Exception.thrown("FAIL: values are not equal (expected: " + expected + ", actual: " + actual + ")");
		}
		var length = bytes.length;
		var i = 0;
		while(i < length) {
			var a = bytes.b[i];
			var r = bytes.b[i + 1];
			var g = bytes.b[i + 2];
			var b = bytes.b[i + 3];
			bytes.b[i] = r;
			bytes.b[i + 1] = g;
			bytes.b[i + 2] = b;
			bytes.b[i + 3] = a;
			i += 4;
		}
		var rgba = bytes;
		var w = hdr.width;
		var h = hdr.height;
		var bitmap = new geometrize_bitmap_Bitmap();
		if(rgba == null) {
			throw haxe_Exception.thrown("FAIL: bytes != null");
		}
		var actual = rgba.length;
		var expected = w * h * 4;
		if(actual != expected) {
			throw haxe_Exception.thrown("FAIL: values are not equal (expected: " + expected + ", actual: " + actual + ")");
		}
		bitmap.width = w;
		bitmap.height = h;
		var this1 = new Array(rgba.length / 4 | 0);
		bitmap.data = this1;
		var i = 0;
		var x = 0;
		while(i < rgba.length) {
			var red = rgba.b[i];
			var green = rgba.b[i + 1];
			var blue = rgba.b[i + 2];
			var alpha = rgba.b[i + 3];
			bitmap.data[x] = ((red < 0 ? 0 : red > 255 ? 255 : red) << 24) + ((green < 0 ? 0 : green > 255 ? 255 : green) << 16) + ((blue < 0 ? 0 : blue > 255 ? 255 : blue) << 8) + (alpha < 0 ? 0 : alpha > 255 ? 255 : alpha);
			i += 4;
			++x;
		}
		return bitmap;
	} catch( _g ) {
		return null;
	}
};
src_GeometrizeCli.argbToRgba = function(bytes) {
	if(bytes == null) {
		throw haxe_Exception.thrown("FAIL: bytes != null");
	}
	var actual = bytes.length % 4;
	var expected = 0;
	if(actual != expected) {
		throw haxe_Exception.thrown("FAIL: values are not equal (expected: " + expected + ", actual: " + actual + ")");
	}
	var length = bytes.length;
	var i = 0;
	while(i < length) {
		var a = bytes.b[i];
		var r = bytes.b[i + 1];
		var g = bytes.b[i + 2];
		var b = bytes.b[i + 3];
		bytes.b[i] = r;
		bytes.b[i + 1] = g;
		bytes.b[i + 2] = b;
		bytes.b[i + 3] = a;
		i += 4;
	}
	return bytes;
};
src_GeometrizeCli.rgbToHex = function(r,g,b) {
	var hexString = "#";
	hexString += src_GeometrizeCli.hexCodes.charAt(Math.floor(r / 16));
	hexString += src_GeometrizeCli.hexCodes.charAt(r % 16);
	hexString += src_GeometrizeCli.hexCodes.charAt(Math.floor(g / 16));
	hexString += src_GeometrizeCli.hexCodes.charAt(g % 16);
	hexString += src_GeometrizeCli.hexCodes.charAt(Math.floor(b / 16));
	hexString += src_GeometrizeCli.hexCodes.charAt(b % 16);
	return hexString;
};
var sys_io_FileInput = function(fd) {
	this.fd = fd;
	this.pos = 0;
};
sys_io_FileInput.__name__ = true;
sys_io_FileInput.__super__ = haxe_io_Input;
sys_io_FileInput.prototype = $extend(haxe_io_Input.prototype,{
	readByte: function() {
		var buf = js_node_buffer_Buffer.alloc(1);
		var bytesRead;
		try {
			bytesRead = js_node_Fs.readSync(this.fd,buf,0,1,this.pos);
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			if(e.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(e));
			}
		}
		if(bytesRead == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.pos++;
		return buf[0];
	}
	,readBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		var bytesRead;
		try {
			bytesRead = js_node_Fs.readSync(this.fd,buf,pos,len,this.pos);
		} catch( _g ) {
			var e = haxe_Exception.caught(_g).unwrap();
			if(e.code == "EOF") {
				throw haxe_Exception.thrown(new haxe_io_Eof());
			} else {
				throw haxe_Exception.thrown(haxe_io_Error.Custom(e));
			}
		}
		if(bytesRead == 0) {
			throw haxe_Exception.thrown(new haxe_io_Eof());
		}
		this.pos += bytesRead;
		return bytesRead;
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,seek: function(p,pos) {
		switch(pos._hx_index) {
		case 0:
			this.pos = p;
			break;
		case 1:
			this.pos += p;
			break;
		case 2:
			this.pos = js_node_Fs.fstatSync(this.fd).size + p;
			break;
		}
	}
	,tell: function() {
		return this.pos;
	}
	,eof: function() {
		return this.pos >= js_node_Fs.fstatSync(this.fd).size;
	}
});
var sys_io_FileOutput = function(fd) {
	this.fd = fd;
	this.pos = 0;
};
sys_io_FileOutput.__name__ = true;
sys_io_FileOutput.__super__ = haxe_io_Output;
sys_io_FileOutput.prototype = $extend(haxe_io_Output.prototype,{
	writeByte: function(b) {
		var buf = js_node_buffer_Buffer.alloc(1);
		buf[0] = b;
		js_node_Fs.writeSync(this.fd,buf,0,1,this.pos);
		this.pos++;
	}
	,writeBytes: function(s,pos,len) {
		var data = s.b;
		var buf = js_node_buffer_Buffer.from(data.buffer,data.byteOffset,s.length);
		var wrote = js_node_Fs.writeSync(this.fd,buf,pos,len,this.pos);
		this.pos += wrote;
		return wrote;
	}
	,close: function() {
		js_node_Fs.closeSync(this.fd);
	}
	,seek: function(p,pos) {
		switch(pos._hx_index) {
		case 0:
			this.pos = p;
			break;
		case 1:
			this.pos += p;
			break;
		case 2:
			this.pos = js_node_Fs.fstatSync(this.fd).size + p;
			break;
		}
	}
	,tell: function() {
		return this.pos;
	}
});
var sys_io_FileSeek = $hxEnums["sys.io.FileSeek"] = { __ename__:true,__constructs__:null
	,SeekBegin: {_hx_name:"SeekBegin",_hx_index:0,__enum__:"sys.io.FileSeek",toString:$estr}
	,SeekCur: {_hx_name:"SeekCur",_hx_index:1,__enum__:"sys.io.FileSeek",toString:$estr}
	,SeekEnd: {_hx_name:"SeekEnd",_hx_index:2,__enum__:"sys.io.FileSeek",toString:$estr}
};
sys_io_FileSeek.__constructs__ = [sys_io_FileSeek.SeekBegin,sys_io_FileSeek.SeekCur,sys_io_FileSeek.SeekEnd];
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.__name__ = true;
Array.__name__ = true;
js_Boot.__toStr = ({ }).toString;
arguable_ArgParser.delimiter = "--";
geometrize_exporter_SvgExporter.SVG_STYLE_HOOK = "::svg_style_hook::";
geometrize_shape_ShapeTypes.RECTANGLE = 0;
geometrize_shape_ShapeTypes.ROTATED_RECTANGLE = 1;
geometrize_shape_ShapeTypes.TRIANGLE = 2;
geometrize_shape_ShapeTypes.ELLIPSE = 3;
geometrize_shape_ShapeTypes.ROTATED_ELLIPSE = 4;
geometrize_shape_ShapeTypes.CIRCLE = 5;
geometrize_shape_ShapeTypes.LINE = 6;
src_GeometrizeCli.hexCodes = "0123456789ABCDEF";
src_GeometrizeCli.main();
})(typeof exports != "undefined" ? exports : typeof window != "undefined" ? window : typeof self != "undefined" ? self : this, {});
