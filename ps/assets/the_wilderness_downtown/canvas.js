var bg = document.getElementById('bg');
function sprite() {}
function ProjMap(a, b) {
	this.scale = 1, this.deviation = 0, this.poff = null, this.copyrights = [], this.invalidate_c = !1, this.copyright_str = "", this.canvas = null, this.ctx = null, this.logo = new Image, this.vignette = new Image, this.cloud = new Image, this.logo.src = "files/img/poweredby.png", this.vignette.src = "files/img/vignette.png", this.cloud.src = "files/img/PerlinNoise2d.png", this.birds1 = !1, this.birds2 = !1, this.birds3 = !1, this.perspective = .35, this.debug = !1, this.map_version = GMAPS_VERSION, this.tweener = new MANUAL_TWEEN.Manager, this.tween_zoom = 0, this.tween_zoom2 = 0, this.tween_angle1 = 0, this.tween_angle2 = 0, this.tween_angle3 = 0, this.tween_perspective = 0, this.tween_alpha = 0, this.tilemap = [], this.zoom = null, this.int_zoom = null, this.tile_zoom = null, this.real_zoom = null, this.zoom_factor = null, this.starting_zoom = 19, this.start_time = 0, this.projection = null, this.map_type = 1, this.extent = 3, this.tileorigin = null, this.bird = null, this.bird2 = null, this.runner = null, this.standing = null, this.load_failed = !1, this.tint_alpha = .5, this.tint_colour = "#704214", this.running = !1, this.rotating = !1, this.clouds = !1, this.zooming = !1, this.clouds_alpha = 0, this.white_alpha = 0, this.texture_angle = 0, this.position = null, this.runner_position = null, this.pos_offset = null, this.current_position = null, this.final_coordinates = null, this.original_coordinates = null, this.position_offset = {
		x: 0,
		y: 0
	}, this.angle = 0, this.runner_angle = 0, this.trees = !1, this.tree = null, this.trees_array = [], this.birds_array = [], this.birds2_array = [], this.birds3_array = [], this.last_time = null, this.spans = null
}
var THREE = THREE || {};
THREE.Color = function(a) {
	this.__styleString = "rgba(0, 0, 0, 1)", this.setHex = function(a) {
		this.hex = a, this.updateRGBA(), this.updateStyleString()
	}, this.setRGBA = function(a, b, c, d) {
		this.r = a, this.g = b, this.b = c, this.a = d, this.updateHex(), this.updateStyleString()
	}, this.updateHex = function() {
		this.hex = Math.floor(255 * this.a) << 24 | Math.floor(255 * this.r) << 16 | Math.floor(255 * this.g) << 8 | Math.floor(255 * this.b)
	}, this.updateRGBA = function() {
		this.a = (this.hex >> 24 & 255) / 255, this.r = (this.hex >> 16 & 255) / 255, this.g = (this.hex >> 8 & 255) / 255, this.b = (255 & this.hex) / 255
	}, this.updateStyleString = function() {
		this.__styleString = "rgba(" + Math.floor(255 * this.r) + "," + Math.floor(255 * this.g) + "," + Math.floor(255 * this.b) + "," + this.a + ")"
	}, this.toString = function() {
		return "THREE.Color ( r: " + this.r + ", g: " + this.g + ", b: " + this.b + ", a: " + this.a + ", hex: " + this.hex + " )"
	}, this.setHex(a)
}, THREE.Vector2 = function(a, b) {
	this.x = a || 0, this.y = b || 0
}, THREE.Vector2.prototype = {
	set: function(a, b) {
		this.x = a, this.y = b
	},
	copy: function(a) {
		this.x = a.x, this.y = a.y
	},
	addSelf: function(a) {
		this.x += a.x, this.y += a.y
	},
	add: function(a, b) {
		this.x = a.x + b.x, this.y = a.y + b.y
	},
	subSelf: function(a) {
		this.x -= a.x, this.y -= a.y
	},
	sub: function(a, b) {
		this.x = a.x - b.x, this.y = a.y - b.y
	},
	multiplyScalar: function(a) {
		this.x *= a, this.y *= a
	},
	unit: function() {
		this.multiplyScalar(1 / this.length())
	},
	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	},
	lengthSq: function() {
		return this.x * this.x + this.y * this.y
	},
	negate: function() {
		this.x = -this.x, this.y = -this.y
	},
	clone: function() {
		return new THREE.Vector2(this.x, this.y)
	},
	toString: function() {
		return "THREE.Vector2 (" + this.x + ", " + this.y + ")"
	}
}, THREE.Vector3 = function(a, b, c) {
	this.x = a || 0, this.y = b || 0, this.z = c || 0
}, THREE.Vector3.prototype = {
	set: function(a, b, c) {
		this.x = a, this.y = b, this.z = c
	},
	copy: function(a) {
		this.x = a.x, this.y = a.y, this.z = a.z
	},
	add: function(a, b) {
		this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z
	},
	addSelf: function(a) {
		this.x += a.x, this.y += a.y, this.z += a.z
	},
	addScalar: function(a) {
		this.x += a, this.y += a, this.z += a
	},
	sub: function(a, b) {
		this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z
	},
	subSelf: function(a) {
		this.x -= a.x, this.y -= a.y, this.z -= a.z
	},
	cross: function(a, b) {
		this.x = a.y * b.z - a.z * b.y, this.y = a.z * b.x - a.x * b.z, this.z = a.x * b.y - a.y * b.x
	},
	crossSelf: function(a) {
		var b = this.x,
			c = this.y,
			d = this.z;
		this.x = c * a.z - d * a.y, this.y = d * a.x - b * a.z, this.z = b * a.y - c * a.x
	},
	multiplySelf: function(a) {
		this.x *= a.x, this.y *= a.y, this.z *= a.z
	},
	multiplyScalar: function(a) {
		this.x *= a, this.y *= a, this.z *= a
	},
	divideScalar: function(a) {
		this.x /= a, this.y /= a, this.z /= a
	},
	dot: function(a) {
		return this.x * a.x + this.y * a.y + this.z * a.z
	},
	distanceTo: function(a) {
		return Math.sqrt(this.distanceToSquared(a))
	},
	distanceToSquared: function(a) {
		var b = this.x - a.x,
			c = this.y - a.y,
			d = this.z - a.z;
		return b * b + c * c + d * d
	},
	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
	},
	lengthSq: function() {
		return this.x * this.x + this.y * this.y + this.z * this.z
	},
	negate: function() {
		this.x = -this.x, this.y = -this.y, this.z = -this.z
	},
	normalize: function() {
		this.multiplyScalar(this.length() > 0 ? 1 / this.length() : 0)
	},
	isZero: function() {
		var a = 1e-4;
		return Math.abs(this.x) < a && Math.abs(this.y) < a && Math.abs(this.z) < a
	},
	clone: function() {
		return new THREE.Vector3(this.x, this.y, this.z)
	},
	toString: function() {
		return "THREE.Vector3 ( " + this.x + ", " + this.y + ", " + this.z + " )"
	}
}, THREE.Vector4 = function(a, b, c, d) {
	this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = d || 1
}, THREE.Vector4.prototype = {
	set: function(a, b, c, d) {
		this.x = a, this.y = b, this.z = c, this.w = d
	},
	copy: function(a) {
		this.x = a.x, this.y = a.y, this.z = a.z, this.w = a.w
	},
	add: function(a, b) {
		this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this.w = a.w + b.w
	},
	addSelf: function(a) {
		this.x += a.x, this.y += a.y, this.z += a.z, this.w += a.w
	},
	sub: function(a, b) {
		this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this.w = a.w - b.w
	},
	subSelf: function(a) {
		this.x -= a.x, this.y -= a.y, this.z -= a.z, this.w -= a.w
	},
	clone: function() {
		return new THREE.Vector4(this.x, this.y, this.z, this.w)
	},
	toString: function() {
		return "THREE.Vector4 (" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")"
	}
}, THREE.Rectangle = function() {
	function a() {
		f = d - b, g = e - c
	}
	var b, c, d, e, f, g, h = !0;
	this.getX = function() {
		return b
	}, this.getY = function() {
		return c
	}, this.getWidth = function() {
		return f
	}, this.getHeight = function() {
		return g
	}, this.getX1 = function() {
		return b
	}, this.getY1 = function() {
		return c
	}, this.getX2 = function() {
		return d
	}, this.getY2 = function() {
		return e
	}, this.set = function(f, g, i, j) {
		h = !1, b = f, c = g, d = i, e = j, a()
	}, this.addPoint = function(f, g) {
		h ? (h = !1, b = f, c = g, d = f, e = g) : (b = Math.min(b, f), c = Math.min(c, g), d = Math.max(d, f), e = Math.max(e, g)), a()
	}, this.addRectangle = function(f) {
		h ? (h = !1, b = f.getX1(), c = f.getY1(), d = f.getX2(), e = f.getY2()) : (b = Math.min(b, f.getX1()), c = Math.min(c, f.getY1()), d = Math.max(d, f.getX2()), e = Math.max(e, f.getY2())), a()
	}, this.inflate = function(f) {
		b -= f, c -= f, d += f, e += f, a()
	}, this.minSelf = function(f) {
		b = Math.max(b, f.getX1()), c = Math.max(c, f.getY1()), d = Math.min(d, f.getX2()), e = Math.min(e, f.getY2()), a()
	}, this.instersects = function(a) {
		return Math.min(d, a.getX2()) - Math.max(b, a.getX1()) >= 0 && Math.min(e, a.getY2()) - Math.max(c, a.getY1()) >= 0
	}, this.empty = function() {
		h = !0, b = 0, c = 0, d = 0, e = 0, a()
	}, this.isEmpty = function() {
		return h
	}, this.toString = function() {
		return "THREE.Rectangle (x1: " + b + ", y1: " + e + ", x2: " + d + ", y1: " + c + ", width: " + f + ", height: " + g + ")"
	}
}, THREE.Matrix4 = function() {
	this._x = new THREE.Vector3, this._y = new THREE.Vector3, this._z = new THREE.Vector3
}, THREE.Matrix4.prototype = {
	n11: 1,
	n12: 0,
	n13: 0,
	n14: 0,
	n21: 0,
	n22: 1,
	n23: 0,
	n24: 0,
	n31: 0,
	n32: 0,
	n33: 1,
	n34: 0,
	n41: 0,
	n42: 0,
	n43: 0,
	n44: 1,
	identity: function() {
		this.n11 = 1, this.n12 = 0, this.n13 = 0, this.n14 = 0, this.n21 = 0, this.n22 = 1, this.n23 = 0, this.n24 = 0, this.n31 = 0, this.n32 = 0, this.n33 = 1, this.n34 = 0, this.n41 = 0, this.n42 = 0, this.n43 = 0, this.n44 = 1
	},
	lookAt: function(a, b, c) {
		var d = this._x,
			e = this._y,
			f = this._z;
		f.sub(a, b), f.normalize(), d.cross(c, f), d.normalize(), e.cross(f, d), e.normalize(), this.n11 = d.x, this.n12 = d.y, this.n13 = d.z, this.n14 = -d.dot(a), this.n21 = e.x, this.n22 = e.y, this.n23 = e.z, this.n24 = -e.dot(a), this.n31 = f.x, this.n32 = f.y, this.n33 = f.z, this.n34 = -f.dot(a)
	},
	transform: function(a) {
		var b = a.x,
			c = a.y,
			d = a.z,
			e = a.w ? a.w : 1;
		a.x = this.n11 * b + this.n12 * c + this.n13 * d + this.n14 * e, a.y = this.n21 * b + this.n22 * c + this.n23 * d + this.n24 * e, a.z = this.n31 * b + this.n32 * c + this.n33 * d + this.n34 * e, e = this.n41 * b + this.n42 * c + this.n43 * d + this.n44 * e, a.w ? a.w = e : (a.x = a.x / e, a.y = a.y / e, a.z = a.z / e)
	},
	crossVector: function(a) {
		var b = new THREE.Vector4;
		return b.x = this.n11 * a.x + this.n12 * a.y + this.n13 * a.z + this.n14 * a.w, b.y = this.n21 * a.x + this.n22 * a.y + this.n23 * a.z + this.n24 * a.w, b.z = this.n31 * a.x + this.n32 * a.y + this.n33 * a.z + this.n34 * a.w, b.w = a.w ? this.n41 * a.x + this.n42 * a.y + this.n43 * a.z + this.n44 * a.w : 1, b
	},
	multiply: function(a, b) {
		this.n11 = a.n11 * b.n11 + a.n12 * b.n21 + a.n13 * b.n31 + a.n14 * b.n41, this.n12 = a.n11 * b.n12 + a.n12 * b.n22 + a.n13 * b.n32 + a.n14 * b.n42, this.n13 = a.n11 * b.n13 + a.n12 * b.n23 + a.n13 * b.n33 + a.n14 * b.n43, this.n14 = a.n11 * b.n14 + a.n12 * b.n24 + a.n13 * b.n34 + a.n14 * b.n44, this.n21 = a.n21 * b.n11 + a.n22 * b.n21 + a.n23 * b.n31 + a.n24 * b.n41, this.n22 = a.n21 * b.n12 + a.n22 * b.n22 + a.n23 * b.n32 + a.n24 * b.n42, this.n23 = a.n21 * b.n13 + a.n22 * b.n23 + a.n23 * b.n33 + a.n24 * b.n43, this.n24 = a.n21 * b.n14 + a.n22 * b.n24 + a.n23 * b.n34 + a.n24 * b.n44, this.n31 = a.n31 * b.n11 + a.n32 * b.n21 + a.n33 * b.n31 + a.n34 * b.n41, this.n32 = a.n31 * b.n12 + a.n32 * b.n22 + a.n33 * b.n32 + a.n34 * b.n42, this.n33 = a.n31 * b.n13 + a.n32 * b.n23 + a.n33 * b.n33 + a.n34 * b.n43, this.n34 = a.n31 * b.n14 + a.n32 * b.n24 + a.n33 * b.n34 + a.n34 * b.n44, this.n41 = a.n41 * b.n11 + a.n42 * b.n21 + a.n43 * b.n31 + a.n44 * b.n41, this.n42 = a.n41 * b.n12 + a.n42 * b.n22 + a.n43 * b.n32 + a.n44 * b.n42, this.n43 = a.n41 * b.n13 + a.n42 * b.n23 + a.n43 * b.n33 + a.n44 * b.n43, this.n44 = a.n41 * b.n14 + a.n42 * b.n24 + a.n43 * b.n34 + a.n44 * b.n44
	},
	multiplySelf: function(a) {
		var b = this.n11,
			c = this.n12,
			d = this.n13,
			e = this.n14,
			f = this.n21,
			g = this.n22,
			h = this.n23,
			i = this.n24,
			j = this.n31,
			k = this.n32,
			l = this.n33,
			m = this.n34,
			n = this.n41,
			o = this.n42,
			p = this.n43,
			q = this.n44;
		this.n11 = b * a.n11 + c * a.n21 + d * a.n31 + e * a.n41, this.n12 = b * a.n12 + c * a.n22 + d * a.n32 + e * a.n42, this.n13 = b * a.n13 + c * a.n23 + d * a.n33 + e * a.n43, this.n14 = b * a.n14 + c * a.n24 + d * a.n34 + e * a.n44, this.n21 = f * a.n11 + g * a.n21 + h * a.n31 + i * a.n41, this.n22 = f * a.n12 + g * a.n22 + h * a.n32 + i * a.n42, this.n23 = f * a.n13 + g * a.n23 + h * a.n33 + i * a.n43, this.n24 = f * a.n14 + g * a.n24 + h * a.n34 + i * a.n44, this.n31 = j * a.n11 + k * a.n21 + l * a.n31 + m * a.n41, this.n32 = j * a.n12 + k * a.n22 + l * a.n32 + m * a.n42, this.n33 = j * a.n13 + k * a.n23 + l * a.n33 + m * a.n43, this.n34 = j * a.n14 + k * a.n24 + l * a.n34 + m * a.n44, this.n41 = n * a.n11 + o * a.n21 + p * a.n31 + q * a.n41, this.n42 = n * a.n12 + o * a.n22 + p * a.n32 + q * a.n42, this.n43 = n * a.n13 + o * a.n23 + p * a.n33 + q * a.n43, this.n44 = n * a.n14 + o * a.n24 + p * a.n34 + q * a.n44
	},
	multiplyScalar: function(a) {
		this.n11 *= a, this.n12 *= a, this.n13 *= a, this.n14 *= a, this.n21 *= a, this.n22 *= a, this.n23 *= a, this.n24 *= a, this.n31 *= a, this.n32 *= a, this.n33 *= a, this.n34 *= a, this.n41 *= a, this.n42 *= a, this.n43 *= a, this.n44 *= a
	},
	determinant: function() {
		return this.n14 * this.n23 * this.n32 * this.n41 - this.n13 * this.n24 * this.n32 * this.n41 - this.n14 * this.n22 * this.n33 * this.n41 + this.n12 * this.n24 * this.n33 * this.n41 + this.n13 * this.n22 * this.n34 * this.n41 - this.n12 * this.n23 * this.n34 * this.n41 - this.n14 * this.n23 * this.n31 * this.n42 + this.n13 * this.n24 * this.n31 * this.n42 + this.n14 * this.n21 * this.n33 * this.n42 - this.n11 * this.n24 * this.n33 * this.n42 - this.n13 * this.n21 * this.n34 * this.n42 + this.n11 * this.n23 * this.n34 * this.n42 + this.n14 * this.n22 * this.n31 * this.n43 - this.n12 * this.n24 * this.n31 * this.n43 - this.n14 * this.n21 * this.n32 * this.n43 + this.n11 * this.n24 * this.n32 * this.n43 + this.n12 * this.n21 * this.n34 * this.n43 - this.n11 * this.n22 * this.n34 * this.n43 - this.n13 * this.n22 * this.n31 * this.n44 + this.n12 * this.n23 * this.n31 * this.n44 + this.n13 * this.n21 * this.n32 * this.n44 - this.n11 * this.n23 * this.n32 * this.n44 - this.n12 * this.n21 * this.n33 * this.n44 + this.n11 * this.n22 * this.n33 * this.n44
	},
	clone: function() {
		var a = new THREE.Matrix4;
		return a.n11 = this.n11, a.n12 = this.n12, a.n13 = this.n13, a.n14 = this.n14, a.n21 = this.n21, a.n22 = this.n22, a.n23 = this.n23, a.n24 = this.n24, a.n31 = this.n31, a.n32 = this.n32, a.n33 = this.n33, a.n34 = this.n34, a.n41 = this.n41, a.n42 = this.n42, a.n43 = this.n43, a.n44 = this.n44, a
	},
	toString: function() {
		return "| " + this.n11 + " " + this.n12 + " " + this.n13 + " " + this.n14 + " |\n| " + this.n21 + " " + this.n22 + " " + this.n23 + " " + this.n24 + " |\n| " + this.n31 + " " + this.n32 + " " + this.n33 + " " + this.n34 + " |\n| " + this.n41 + " " + this.n42 + " " + this.n43 + " " + this.n44 + " |"
	}
}, THREE.Matrix4.translationMatrix = function(a, b, c) {
	var d = new THREE.Matrix4;
	return d.n14 = a, d.n24 = b, d.n34 = c, d
}, THREE.Matrix4.scaleMatrix = function(a, b, c) {
	var d = new THREE.Matrix4;
	return d.n11 = a, d.n22 = b, d.n33 = c, d
}, THREE.Matrix4.rotationXMatrix = function(a) {
	var b = new THREE.Matrix4;
	return b.n22 = b.n33 = Math.cos(a), b.n32 = Math.sin(a), b.n23 = -b.n32, b
}, THREE.Matrix4.rotationYMatrix = function(a) {
	var b = new THREE.Matrix4;
	return b.n11 = b.n33 = Math.cos(a), b.n13 = Math.sin(a), b.n31 = -b.n13, b
}, THREE.Matrix4.rotationZMatrix = function(a) {
	var b = new THREE.Matrix4;
	return b.n11 = b.n22 = Math.cos(a), b.n21 = Math.sin(a), b.n12 = -b.n21, b
}, THREE.Matrix4.makeInvert = function(a) {
	var b = new THREE.Matrix4;
	return b.n11 = a.n23 * a.n34 * a.n42 - a.n24 * a.n33 * a.n42 + a.n24 * a.n32 * a.n43 - a.n22 * a.n34 * a.n43 - a.n23 * a.n32 * a.n44 + a.n22 * a.n33 * a.n44, b.n12 = a.n14 * a.n33 * a.n42 - a.n13 * a.n34 * a.n42 - a.n14 * a.n32 * a.n43 + a.n12 * a.n34 * a.n43 + a.n13 * a.n32 * a.n44 - a.n12 * a.n33 * a.n44, b.n13 = a.n13 * a.n24 * a.n42 - a.n14 * a.n23 * a.n42 + a.n14 * a.n22 * a.n43 - a.n12 * a.n24 * a.n43 - a.n13 * a.n22 * a.n44 + a.n12 * a.n23 * a.n44, b.n14 = a.n14 * a.n23 * a.n32 - a.n13 * a.n24 * a.n32 - a.n14 * a.n22 * a.n33 + a.n12 * a.n24 * a.n33 + a.n13 * a.n22 * a.n34 - a.n12 * a.n23 * a.n34, b.n21 = a.n24 * a.n33 * a.n41 - a.n23 * a.n34 * a.n41 - a.n24 * a.n31 * a.n43 + a.n21 * a.n34 * a.n43 + a.n23 * a.n31 * a.n44 - a.n21 * a.n33 * a.n44, b.n22 = a.n13 * a.n34 * a.n41 - a.n14 * a.n33 * a.n41 + a.n14 * a.n31 * a.n43 - a.n11 * a.n34 * a.n43 - a.n13 * a.n31 * a.n44 + a.n11 * a.n33 * a.n44, b.n23 = a.n14 * a.n23 * a.n41 - a.n13 * a.n24 * a.n41 - a.n14 * a.n21 * a.n43 + a.n11 * a.n24 * a.n43 + a.n13 * a.n21 * a.n44 - a.n11 * a.n23 * a.n44, b.n24 = a.n13 * a.n24 * a.n31 - a.n14 * a.n23 * a.n31 + a.n14 * a.n21 * a.n33 - a.n11 * a.n24 * a.n33 - a.n13 * a.n21 * a.n34 + a.n11 * a.n23 * a.n34, b.n31 = a.n22 * a.n34 * a.n41 - a.n24 * a.n32 * a.n41 + a.n24 * a.n31 * a.n42 - a.n21 * a.n34 * a.n42 - a.n22 * a.n31 * a.n44 + a.n21 * a.n32 * a.n44, b.n32 = a.n14 * a.n32 * a.n41 - a.n12 * a.n34 * a.n41 - a.n14 * a.n31 * a.n42 + a.n11 * a.n34 * a.n42 + a.n12 * a.n31 * a.n44 - a.n11 * a.n32 * a.n44, b.n33 = a.n13 * a.n24 * a.n41 - a.n14 * a.n22 * a.n41 + a.n14 * a.n21 * a.n42 - a.n11 * a.n24 * a.n42 - a.n12 * a.n21 * a.n44 + a.n11 * a.n22 * a.n44, b.n34 = a.n14 * a.n22 * a.n31 - a.n12 * a.n24 * a.n31 - a.n14 * a.n21 * a.n32 + a.n11 * a.n24 * a.n32 + a.n12 * a.n21 * a.n34 - a.n11 * a.n22 * a.n34, b.n41 = a.n23 * a.n32 * a.n41 - a.n22 * a.n33 * a.n41 - a.n23 * a.n31 * a.n42 + a.n21 * a.n33 * a.n42 + a.n22 * a.n31 * a.n43 - a.n21 * a.n32 * a.n43, b.n42 = a.n12 * a.n33 * a.n41 - a.n13 * a.n32 * a.n41 + a.n13 * a.n31 * a.n42 - a.n11 * a.n33 * a.n42 - a.n12 * a.n31 * a.n43 + a.n11 * a.n32 * a.n43, b.n43 = a.n13 * a.n22 * a.n41 - a.n12 * a.n23 * a.n41 - a.n13 * a.n21 * a.n42 + a.n11 * a.n23 * a.n42 + a.n12 * a.n21 * a.n43 - a.n11 * a.n22 * a.n43, b.n44 = a.n12 * a.n23 * a.n31 - a.n13 * a.n22 * a.n31 + a.n13 * a.n21 * a.n32 - a.n11 * a.n23 * a.n32 - a.n12 * a.n21 * a.n33 + a.n11 * a.n22 * a.n33, b.scale(1 / a.determinant()), b
}, THREE.Matrix4.makeFrustum = function(a, b, c, d, e, f) {
	var g, h, i, j, k, l, m;
	return g = new THREE.Matrix4, h = 2 * e / (b - a), i = 2 * e / (d - c), j = (b + a) / (b - a), k = (d + c) / (d - c), l = -(f + e) / (f - e), m = -2 * f * e / (f - e), g.n11 = h, g.n12 = 0, g.n13 = j, g.n14 = 0, g.n21 = 0, g.n22 = i, g.n23 = k, g.n24 = 0, g.n31 = 0, g.n32 = 0, g.n33 = l, g.n34 = m, g.n41 = 0, g.n42 = 0, g.n43 = -1, g.n44 = 0, g
}, THREE.Matrix4.makePerspective = function(a, b, c, d) {
	var e, f, g, h;
	return e = c * Math.tan(a * Math.PI / 360), f = -e, g = f * b, h = e * b, THREE.Matrix4.makeFrustum(g, h, f, e, c, d)
}, THREE.Matrix4.makeOrtho = function(a, b, c, d, e, f) {
	var g, h, i, j, k, l, m;
	return g = new THREE.Matrix4, k = b - a, l = d - c, m = f - e, h = (b + a) / k, i = (d + c) / l, j = (f + e) / m, g.n11 = 2 / k, g.n12 = 0, g.n13 = 0, g.n14 = -h, g.n21 = 0, g.n22 = 2 / l, g.n23 = 0, g.n24 = -i, g.n31 = 0, g.n32 = 0, g.n33 = -2 / m, g.n34 = -j, g.n41 = 0, g.n42 = 0, g.n43 = 0, g.n44 = 1, g
}, THREE.Vertex = function(a, b) {
	this.position = a || new THREE.Vector3, this.normal = b || new THREE.Vector3, this.screen = new THREE.Vector3, this.__visible = !0, this.toString = function() {
		return "THREE.Vertex ( position: " + this.position + ", normal: " + this.normal + " )"
	}
}, THREE.Face3 = function(a, b, c, d, e) {
	this.a = a, this.b = b, this.c = c, this.normal = d || new THREE.Vector3, this.screen = new THREE.Vector3, this.color = e || new THREE.Color(0), this.toString = function() {
		return "THREE.Face3 ( " + this.a + ", " + this.b + ", " + this.c + " )"
	}
}, THREE.Face4 = function(a, b, c, d, e, f) {
	this.a = a, this.b = b, this.c = c, this.d = d, this.normal = e || new THREE.Vector3, this.screen = new THREE.Vector3, this.color = f || new THREE.Color(0), this.toString = function() {
		return "THREE.Face4 ( " + this.a + ", " + this.b + ", " + this.c + " " + this.d + " )"
	}
}, THREE.UV = function(a, b) {
	this.u = a || 0, this.v = b || 0
}, THREE.UV.prototype = {
	copy: function(a) {
		this.u = a.u, this.v = a.v
	},
	toString: function() {
		return "THREE.UV (" + this.u + ", " + this.v + ")"
	}
}, THREE.Geometry = function() {
	this.vertices = [], this.faces = [], this.uvs = [], this.computeNormals = function() {
		var a, b, c, d, e, f, g, h;
		for (a = 0; a < this.vertices.length; a++) this.vertices[a].normal.set(0, 0, 0);
		for (b = 0; b < this.faces.length; b++) c = this.vertices[this.faces[b].a], d = this.vertices[this.faces[b].b], e = this.vertices[this.faces[b].c], f = new THREE.Vector3, g = new THREE.Vector3, h = new THREE.Vector3, f.sub(e.position, d.position), g.sub(c.position, d.position), f.crossSelf(g), f.isZero() || f.normalize(), this.faces[b].normal = f, c.normal.addSelf(h), d.normal.addSelf(h), e.normal.addSelf(h), this.faces[b] instanceof THREE.Face4 && this.vertices[this.faces[b].d].normal.addSelf(h)
	}
}, THREE.Camera = function(a, b, c, d) {
	this.position = new THREE.Vector3(0, 0, 0), this.target = {
		position: new THREE.Vector3(0, 0, 0)
	}, this.projectionMatrix = THREE.Matrix4.makePerspective(a, b, c, d), this.up = new THREE.Vector3(0, 1, 0), this.matrix = new THREE.Matrix4, this.autoUpdateMatrix = !0, this.updateMatrix = function() {
		this.matrix.lookAt(this.position, this.target.position, this.up)
	}, this.toString = function() {
		return "THREE.Camera ( " + this.position + ", " + this.target.position + " )"
	}
}, THREE.Object3D = function(a) {
	this.position = new THREE.Vector3, this.rotation = new THREE.Vector3, this.scale = new THREE.Vector3(1, 1, 1), this.matrix = new THREE.Matrix4, this.screen = new THREE.Vector3, this.material = a instanceof Array ? a : [a], this.autoUpdateMatrix = !0, this.updateMatrix = function() {
		this.matrix.identity(), this.matrix.multiplySelf(THREE.Matrix4.translationMatrix(this.position.x, this.position.y, this.position.z)), this.matrix.multiplySelf(THREE.Matrix4.rotationXMatrix(this.rotation.x)), this.matrix.multiplySelf(THREE.Matrix4.rotationYMatrix(this.rotation.y)), this.matrix.multiplySelf(THREE.Matrix4.rotationZMatrix(this.rotation.z)), this.matrix.multiplySelf(THREE.Matrix4.scaleMatrix(this.scale.x, this.scale.y, this.scale.z))
	}
}, THREE.Line = function(a, b) {
	THREE.Object3D.call(this, b), this.geometry = a
}, THREE.Line.prototype = new THREE.Object3D, THREE.Line.prototype.constructor = THREE.Line, THREE.Mesh = function(a, b) {
	THREE.Object3D.call(this, b), this.geometry = a, this.flipSided = !1, this.doubleSided = !1, this.overdraw = !1
}, THREE.Mesh.prototype = new THREE.Object3D, THREE.Mesh.prototype.constructor = THREE.Mesh, THREE.Particle = function(a) {
	THREE.Object3D.call(this, a), this.autoUpdateMatrix = !1
}, THREE.Particle.prototype = new THREE.Object3D, THREE.Particle.prototype.constructor = THREE.Particle, THREE.LineColorMaterial = function(a, b, c) {
	this.lineWidth = c || 1, this.color = new THREE.Color((b >= 0 ? 255 * b << 24 : 4278190080) | a), this.toString = function() {
		return "THREE.LineColorMaterial ( color: " + this.color + ", lineWidth: " + this.lineWidth + " )"
	}
}, THREE.MeshBitmapUVMappingMaterial = function(a) {
	this.bitmap = a, this.toString = function() {
		return "THREE.MeshBitmapUVMappingMaterial ( bitmap: " + this.bitmap + " )"
	}
}, THREE.MeshColorFillMaterial = function(a, b) {
	this.color = new THREE.Color((b >= 0 ? 255 * b << 24 : 4278190080) | a), this.toString = function() {
		return "THREE.MeshColorFillMaterial ( color: " + this.color + " )"
	}
}, THREE.MeshColorStrokeMaterial = function(a, b, c) {
	this.lineWidth = c || 1, this.color = new THREE.Color((b >= 0 ? 255 * b << 24 : 4278190080) | a), this.toString = function() {
		return "THREE.MeshColorStrokeMaterial ( lineWidth: " + this.lineWidth + ", color: " + this.color + " )"
	}
}, THREE.MeshFaceColorFillMaterial = function() {
	this.toString = function() {
		return "THREE.MeshFaceColorFillMaterial ( )"
	}
}, THREE.MeshFaceColorStrokeMaterial = function(a) {
	this.lineWidth = a || 1, this.toString = function() {
		return "THREE.MeshFaceColorStrokeMaterial ( lineWidth: " + this.lineWidth + " )"
	}
}, THREE.ParticleBitmapMaterial = function(a) {
	this.bitmap = a, this.offset = new THREE.Vector2, this.toString = function() {
		return "THREE.ParticleBitmapMaterial ( bitmap: " + this.bitmap + " )"
	}
}, THREE.ParticleCircleMaterial = function(a, b) {
	this.color = new THREE.Color((b >= 0 ? 255 * b << 24 : 4278190080) | a), this.toString = function() {
		return "THREE.ParticleCircleMaterial ( color: " + this.color + " )"
	}
}, THREE.Scene = function() {
	this.objects = [], this.addObject = function(a) {
		this.objects.push(a)
	}, this.removeObject = function(a) {
		for (var b = 0, c = this.objects.length; c > b; b++)
			if (a == this.objects[b]) return void this.objects.splice(b, 1)
	}, this.add = function(a) {
		this.addObject(a)
	}, this.toString = function() {
		return "THREE.Scene ( " + this.objects + " )"
	}
}, THREE.Renderer = function() {
	function a(a, b) {
		return b.z - a.z
	}
	var b = [],
		c = [],
		d = [],
		e = [],
		f = new THREE.Vector4,
		g = new THREE.Matrix4;
	this.renderList = null, this.project = function(h, i) {
		var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x = 0,
			y = 0,
			z = 0,
			A = 0;
		for (this.renderList = [], i.autoUpdateMatrix && i.updateMatrix(), j = 0, k = h.objects.length; k > j; j++)
			if (s = h.objects[j], s.autoUpdateMatrix && s.updateMatrix(), s instanceof THREE.Mesh) {
				for (g.multiply(i.matrix, s.matrix), l = 0, m = s.geometry.vertices.length; m > l; l++) p = s.geometry.vertices[l], p.screen.copy(p.position), g.transform(p.screen), i.projectionMatrix.transform(p.screen), p.__visible = p.screen.z > 0 && p.screen.z < 1;
				for (n = 0, o = s.geometry.faces.length; o > n; n++) r = s.geometry.faces[n], r instanceof THREE.Face3 ? (t = s.geometry.vertices[r.a], u = s.geometry.vertices[r.b], v = s.geometry.vertices[r.c], t.__visible && u.__visible && v.__visible && (s.doubleSided || s.flipSided != (v.screen.x - t.screen.x) * (u.screen.y - t.screen.y) - (v.screen.y - t.screen.y) * (u.screen.x - t.screen.x) < 0) && (b[x] || (b[x] = new THREE.RenderableFace3), b[x].v1.copy(t.screen), b[x].v2.copy(u.screen), b[x].v3.copy(v.screen), b[x].z = Math.max(t.screen.z, Math.max(u.screen.z, v.screen.z)), b[x].material = s.material, b[x].overdraw = s.overdraw, b[x].uvs = s.geometry.uvs[n], b[x].color = r.color, this.renderList.push(b[x]), x++)) : r instanceof THREE.Face4 && (t = s.geometry.vertices[r.a], u = s.geometry.vertices[r.b], v = s.geometry.vertices[r.c], w = s.geometry.vertices[r.d], t.__visible && u.__visible && v.__visible && w.__visible && (s.doubleSided || s.flipSided != ((w.screen.x - t.screen.x) * (u.screen.y - t.screen.y) - (w.screen.y - t.screen.y) * (u.screen.x - t.screen.x) < 0 || (u.screen.x - v.screen.x) * (w.screen.y - v.screen.y) - (u.screen.y - v.screen.y) * (w.screen.x - v.screen.x) < 0)) && (c[y] || (c[y] = new THREE.RenderableFace4), c[y].v1.copy(t.screen), c[y].v2.copy(u.screen), c[y].v3.copy(v.screen), c[y].v4.copy(w.screen), c[y].z = Math.max(t.screen.z, Math.max(u.screen.z, Math.max(v.screen.z, w.screen.z))), c[y].material = s.material, c[y].overdraw = s.overdraw, c[y].uvs = s.geometry.uvs[n], c[y].color = r.color, this.renderList.push(c[y]), y++))
			} else if (s instanceof THREE.Line)
			for (g.multiply(i.matrix, s.matrix), l = 0, m = s.geometry.vertices.length; m > l; l++) p = s.geometry.vertices[l], p.screen.copy(p.position), g.transform(p.screen), i.projectionMatrix.transform(p.screen), p.__visible = p.screen.z > 0 && p.screen.z < 1, l > 0 && (q = s.geometry.vertices[l - 1], p.__visible && q.__visible && (d[z] || (d[z] = new THREE.RenderableLine), d[z].v1.copy(p.screen), d[z].v2.copy(q.screen), d[z].z = Math.max(p.screen.z, q.screen.z), d[z].material = s.material, this.renderList.push(d[z]), z++));
		else s instanceof THREE.Particle && (f.set(s.position.x, s.position.y, s.position.z, 1), i.matrix.transform(f), i.projectionMatrix.transform(f), s.screen.set(f.x / f.w, f.y / f.w, f.z / f.w), s.screen.z > 0 && s.screen.z < 1 && (e[A] || (e[A] = new THREE.RenderableParticle), e[A].x = s.screen.x, e[A].y = s.screen.y, e[A].z = s.screen.z, e[A].rotation = s.rotation.z, e[A].scale.x = s.scale.x * Math.abs(f.x / f.w - (f.x + i.projectionMatrix.n11) / (f.w + i.projectionMatrix.n14)), e[A].scale.y = s.scale.y * Math.abs(f.y / f.w - (f.y + i.projectionMatrix.n22) / (f.w + i.projectionMatrix.n24)), e[A].material = s.material, e[A].color = s.color, this.renderList.push(e[A]), A++));
		this.renderList.sort(a)
	}
}, THREE.CanvasRenderer = function() {
	function a(a, b, c, d, e, f, g, i, j, k, l, m, n) {
		var o, p, q, r, s, t, u;
		h.beginPath(), h.moveTo(b, c), h.lineTo(d, e), h.lineTo(f, g), h.lineTo(b, c), h.closePath(), h.save(), h.clip(), o = i * (n - l) - k * n + m * l + (k - m) * j, p = -(j * (f - d) - l * f + n * d + (l - n) * b) / o, q = (l * g + j * (e - g) - n * e + (n - l) * c) / o, r = (i * (f - d) - k * f + m * d + (k - m) * b) / o, s = -(k * g + i * (e - g) - m * e + (m - k) * c) / o, t = (i * (n * d - l * f) + j * (k * f - m * d) + (m * l - k * n) * b) / o, u = (i * (n * e - l * g) + j * (k * g - m * e) + (m * l - k * n) * c) / o, h.transform(p, q, r, s, t, u), h.drawImage(a, 0, 0), h.restore()
	}

	function b(a, b) {
		l.sub(b, a), l.unit(), b.addSelf(l), a.subSelf(l)
	}
	THREE.Renderer.call(this);
	var c, d, e, f, g = document.createElement("canvas"),
		h = g.getContext("2d"),
		i = new THREE.Rectangle,
		j = new THREE.Rectangle,
		k = new THREE.Rectangle,
		l = new THREE.Vector2,
		m = new THREE.Vector2,
		n = new THREE.Vector2,
		o = new THREE.UV,
		p = new THREE.UV,
		q = new THREE.UV,
		r = new THREE.UV;
	this.domElement = g, this.autoClear = !0, this.setSize = function(a, b) {
		c = a, d = b, e = c / 2, f = d / 2, g.width = c, g.height = d, i.set(-e, -f, e, f)
	}, this.clear = function() {
		j.isEmpty() || (j.inflate(1), j.minSelf(i), h.setTransform(1, 0, 0, 1, e, f), h.clearRect(j.getX(), -(j.getHeight() + j.getY()), j.getWidth(), j.getHeight()), j.empty())
	}, this.render = function(c, d) {
		var g, l, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R = 2 * Math.PI;
		for (this.project(c, d), this.autoClear && this.clear(), h.setTransform(1, 0, 0, -1, e, f), g = 0, l = this.renderList.length; l > g; g++) {
			if (u = this.renderList[g], k.empty(), u instanceof THREE.RenderableParticle) {
				for (w = u.x * e, x = u.y * f, s = 0, t = u.material.length; t > s; s++)
					if (v = u.material[s], v instanceof THREE.ParticleCircleMaterial) {
						if (I = u.scale.x * e, J = u.scale.y * f, k.set(w - I, x - J, w + I, x + J), !i.instersects(k)) continue;
						h.save(), h.translate(w, x), h.rotate(-u.rotation), h.scale(I, J), h.beginPath(), h.arc(0, 0, 1, 0, R, !0), h.closePath(), h.fillStyle = v.color.__styleString, h.fill(), h.restore()
					} else if (v instanceof THREE.ParticleBitmapMaterial) {
					if (O = v.bitmap, P = O.width / 2, Q = O.height / 2, K = u.scale.x * e, L = u.scale.y * f, I = K * P, J = L * Q, M = v.offset.x * K, N = v.offset.y * L, k.set(w + M - I, x + N - J, w + M + I, x + N + J), !i.instersects(k)) continue;
					h.save(), h.translate(w, x), h.rotate(-u.rotation), h.scale(K, -L), h.translate(-P + v.offset.x, -Q - v.offset.y), h.drawImage(O, 0, 0), h.restore()
				}
			} else if (u instanceof THREE.RenderableLine) {
				if (w = u.v1.x * e, x = u.v1.y * f, y = u.v2.x * e, z = u.v2.y * f, k.addPoint(w, x), k.addPoint(y, z), !i.instersects(k)) continue;
				for (h.beginPath(), h.moveTo(w, x), h.lineTo(y, z), h.closePath(), s = 0, t = u.material.length; t > s; s++) v = u.material[s], v instanceof THREE.LineColorMaterial && (h.lineWidth = v.lineWidth, h.lineJoin = "round", h.lineCap = "round", h.strokeStyle = v.color.__styleString, h.stroke(), k.inflate(h.lineWidth))
			} else if (u instanceof THREE.RenderableFace3) {
				if (u.v1.x *= e, u.v1.y *= f, u.v2.x *= e, u.v2.y *= f, u.v3.x *= e, u.v3.y *= f, u.overdraw && (b(u.v1, u.v2), b(u.v2, u.v3), b(u.v3, u.v1)), w = u.v1.x, x = u.v1.y, y = u.v2.x, z = u.v2.y, A = u.v3.x, B = u.v3.y, k.addPoint(w, x), k.addPoint(y, z), k.addPoint(A, B), !i.instersects(k)) continue;
				for (s = 0, t = u.material.length; t > s; s++) v = u.material[s], v instanceof THREE.MeshColorFillMaterial ? (h.beginPath(), h.moveTo(w, x), h.lineTo(y, z), h.lineTo(A, B), h.lineTo(w, x), h.closePath(), h.fillStyle = v.color.__styleString, h.fill()) : v instanceof THREE.MeshColorStrokeMaterial ? (h.beginPath(), h.moveTo(w, x), h.lineTo(y, z), h.lineTo(A, B), h.lineTo(w, x), h.closePath(), h.lineWidth = v.lineWidth, h.lineJoin = "round", h.lineCap = "round", h.strokeStyle = v.color.__styleString, h.stroke(), k.inflate(h.lineWidth)) : v instanceof THREE.MeshFaceColorFillMaterial ? (h.beginPath(), h.moveTo(w, x), h.lineTo(y, z), h.lineTo(A, B), h.lineTo(w, x), h.closePath(), h.fillStyle = u.color.__styleString, h.fill()) : v instanceof THREE.MeshFaceColorStrokeMaterial ? (h.beginPath(), h.moveTo(w, x), h.lineTo(y, z), h.lineTo(A, B), h.lineTo(w, x), h.closePath(), h.lineWidth = v.lineWidth, h.lineJoin = "round", h.lineCap = "round", h.strokeStyle = u.color.__styleString, h.stroke(), k.inflate(h.lineWidth)) : v instanceof THREE.MeshBitmapUVMappingMaterial && (O = v.bitmap, P = O.width - 1, Q = O.height - 1, o.copy(u.uvs[0]), p.copy(u.uvs[1]), q.copy(u.uvs[2]), o.u *= P, o.v *= Q, p.u *= P, p.v *= Q, q.u *= P, q.v *= Q, a(O, w, x, y, z, A, B, o.u, o.v, p.u, p.v, q.u, q.v))
			} else if (u instanceof THREE.RenderableFace4) {
				if (u.v1.x *= e, u.v1.y *= f, u.v2.x *= e, u.v2.y *= f, u.v3.x *= e, u.v3.y *= f, u.v4.x *= e, u.v4.y *= f, m.copy(u.v2), n.copy(u.v4), u.overdraw && (b(u.v1, u.v2), b(u.v2, u.v4), b(u.v4, u.v1)), w = u.v1.x, x = u.v1.y, y = u.v2.x, z = u.v2.y, C = u.v4.x, D = u.v4.y, u.overdraw && (b(u.v3, m), b(u.v3, n)), A = u.v3.x, B = u.v3.y, E = m.x, F = m.y, G = n.x, H = n.y, k.addPoint(w, x), k.addPoint(y, z), k.addPoint(A, B), k.addPoint(C, D), !i.instersects(k)) continue;
				for (s = 0, t = u.material.length; t > s; s++) v = u.material[s], v instanceof THREE.MeshColorFillMaterial ? (h.beginPath(), h.moveTo(w, x), h.lineTo(y, z), h.lineTo(A, B), h.lineTo(C, D), h.lineTo(w, x), h.closePath(), h.fillStyle = v.color.__styleString, h.fill()) : v instanceof THREE.MeshColorStrokeMaterial ? (h.beginPath(), h.moveTo(w, x), h.lineTo(y, z), h.lineTo(A, B), h.lineTo(C, D), h.lineTo(w, x), h.closePath(), h.lineWidth = v.lineWidth, h.lineJoin = "round", h.lineCap = "round", h.strokeStyle = v.color.__styleString, h.stroke(), k.inflate(h.lineWidth)) : v instanceof THREE.MeshFaceColorFillMaterial ? (h.beginPath(), h.moveTo(w, x), h.lineTo(y, z), h.lineTo(A, B), h.lineTo(C, D), h.lineTo(w, x), h.closePath(), h.fillStyle = u.color.__styleString, h.fill()) : v instanceof THREE.MeshFaceColorStrokeMaterial ? (h.beginPath(), h.moveTo(w, x), h.lineTo(y, z), h.lineTo(A, B), h.lineTo(C, D), h.lineTo(w, x), h.closePath(), h.lineWidth = v.lineWidth, h.lineJoin = "round", h.lineCap = "round", h.strokeStyle = u.color.__styleString, h.stroke(), k.inflate(h.lineWidth)) : v instanceof THREE.MeshBitmapUVMappingMaterial && (O = v.bitmap, P = O.width - 1, Q = O.height - 1, o.copy(u.uvs[0]), p.copy(u.uvs[1]), q.copy(u.uvs[2]), r.copy(u.uvs[3]), o.u *= P, o.v *= Q, p.u *= P, p.v *= Q, q.u *= P, q.v *= Q, r.u *= P, r.v *= Q, a(O, w, x, y, z, C, D, o.u, o.v, p.u, p.v, r.u, r.v), a(O, E, F, A, B, G, H, p.u, p.v, q.u, q.v, r.u, r.v))
			}
			j.addRectangle(k)
		}
		h.setTransform(1, 0, 0, 1, 0, 0)
	}
}, THREE.CanvasRenderer.prototype = new THREE.Renderer, THREE.CanvasRenderer.prototype.constructor = THREE.CanvasRenderer, THREE.SVGRenderer = function() {
	function a(a) {
		return null == j[a] ? (j[a] = document.createElementNS("http://www.w3.org/2000/svg", "path"), 0 == l && j[a].setAttribute("shape-rendering", "crispEdges"), j[a]) : j[a]
	}

	function b(a) {
		return null == k[a] ? (k[a] = document.createElementNS("http://www.w3.org/2000/svg", "circle"), 0 == l && k[a].setAttribute("shape-rendering", "crispEdges"), k[a]) : k[a]
	}
	THREE.Renderer.call(this);
	var c, d, e, f, g = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
		h = new THREE.Rectangle,
		i = new THREE.Rectangle,
		j = [],
		k = [],
		l = 1;
	this.domElement = g, this.autoClear = !0, this.setQuality = function(a) {
		switch (a) {
			case "high":
				l = 1;
				break;
			case "low":
				l = 0
		}
	}, this.setSize = function(a, b) {
		c = a, d = b, e = c / 2, f = d / 2, g.setAttribute("viewBox", -e + " " + -f + " " + c + " " + d), g.setAttribute("width", c), g.setAttribute("height", d), h.set(-e, -f, e, f)
	}, this.clear = function() {
		for (; g.childNodes.length > 0;) g.removeChild(g.childNodes[0])
	}, this.render = function(c, d) {
		var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z = 0,
			A = 0;
		for (this.autoClear && this.clear(), this.project(c, d), j = 0, k = this.renderList.length; k > j; j++)
			for (n = this.renderList[j], l = 0, m = n.material.length; m > l; l++) {
				if (o = n.material[l], i.empty(), n instanceof THREE.RenderableParticle) {
					if (q = n.x * e, r = n.y * -f, y = n.size * e, i.set(q - y, r - y, q + y, r + y), !h.instersects(i)) continue;
					p = b(A++), p.setAttribute("cx", q), p.setAttribute("cy", r), p.setAttribute("r", y)
				} else if (n instanceof THREE.RenderableFace3) {
					if (q = n.v1.x * e, r = n.v1.y * -f, s = n.v2.x * e, t = n.v2.y * -f, u = n.v3.x * e, v = n.v3.y * -f, i.addPoint(q, r), i.addPoint(s, t), i.addPoint(u, v), !h.instersects(i)) continue;
					p = a(z++), p.setAttribute("d", "M " + q + " " + r + " L " + s + " " + t + " L " + u + "," + v + "z")
				} else if (n instanceof THREE.RenderableFace4) {
					if (q = n.v1.x * e, r = n.v1.y * -f, s = n.v2.x * e, t = n.v2.y * -f, u = n.v3.x * e, v = n.v3.y * -f, w = n.v4.x * e, x = n.v4.y * -f, i.addPoint(q, r), i.addPoint(s, t), i.addPoint(u, v), i.addPoint(w, x), !h.instersects(i)) continue;
					p = a(z++), p.setAttribute("d", "M " + q + " " + r + " L " + s + " " + t + " L " + u + "," + v + " L " + w + "," + x + "z")
				}
				o instanceof THREE.MeshColorFillMaterial ? p.setAttribute("style", "fill: " + o.color.__styleString) : o instanceof THREE.MeshFaceColorFillMaterial ? p.setAttribute("style", "fill: " + n.color.__styleString) : o instanceof THREE.MeshColorStrokeMaterial ? p.setAttribute("style", "fill: none; stroke: " + o.color.__styleString + "; stroke-width: " + o.lineWidth + "; stroke-linecap: round; stroke-linejoin: round") : o instanceof THREE.MeshFaceColorStrokeMaterial && p.setAttribute("style", "fill: none; stroke: " + n.color.__styleString + "; stroke-width: " + o.lineWidth + "; stroke-linecap: round; stroke-linejoin: round"), g.appendChild(p)
			}
	}
}, THREE.SVGRenderer.prototype = new THREE.Renderer, THREE.SVGRenderer.prototype.constructor = THREE.CanvasRenderer, THREE.WebGLRenderer = function() {
	function a() {
		try {
			e = g.getContext("experimental-webgl")
		} catch (a) {}
		if (!e) throw alert("WebGL not supported"), "cannot create webgl context";
		e.clearColor(0, 0, 0, 1), e.clearDepth(1), e.enable(e.DEPTH_TEST), e.depthFunc(e.LEQUAL), e.enable(e.BLEND), e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA), e.clearColor(0, 0, 0, 0)
	}

	function b() {
		f = e.createProgram(), e.attachShader(f, c("fragment", ["varying vec4 vcolor;", "void main(){", "gl_FragColor = vcolor;", "}"].join(""))), e.attachShader(f, c("vertex", ["attribute vec3 position;", "attribute vec4 color;", "uniform mat4 viewMatrix;", "uniform mat4 projectionMatrix;", "varying vec4 vcolor;", "void main(void) {", "vcolor = color;", "gl_Position = projectionMatrix * viewMatrix * vec4( position, 1 );", "}"].join(""))), e.linkProgram(f), e.getProgramParameter(f, e.LINK_STATUS) || alert("Could not initialise shaders"), e.useProgram(f), f.viewMatrix = e.getUniformLocation(f, "viewMatrix"), f.projectionMatrix = e.getUniformLocation(f, "projectionMatrix"), f.color = e.getAttribLocation(f, "color"), e.enableVertexAttribArray(f.color), f.position = e.getAttribLocation(f, "position"), e.enableVertexAttribArray(f.position), f.viewMatrixArray = new WebGLFloatArray(16), f.projectionMatrixArray = new WebGLFloatArray(16)
	}

	function c(a, b) {
		var c;
		return "fragment" == a ? c = e.createShader(e.FRAGMENT_SHADER) : "vertex" == a && (c = e.createShader(e.VERTEX_SHADER)), e.shaderSource(c, b), e.compileShader(c), e.getShaderParameter(c, e.COMPILE_STATUS) ? c : (alert(e.getShaderInfoLog(c)), null)
	}

	function d(a, b) {
		b[0] = a.n11, b[1] = a.n21, b[2] = a.n31, b[3] = a.n41, b[4] = a.n12, b[5] = a.n22, b[6] = a.n32, b[7] = a.n42, b[8] = a.n13, b[9] = a.n23, b[10] = a.n33, b[11] = a.n43, b[12] = a.n14, b[13] = a.n24, b[14] = a.n34, b[15] = a.n44
	}
	var e, f, g = document.createElement("canvas"),
		h = new THREE.Matrix4;
	this.domElement = g, this.autoClear = !0, a(), b(), this.setSize = function(a, b) {
		g.width = a, g.height = b, e.viewport(0, 0, g.width, g.height)
	}, this.clear = function() {
		e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT)
	}, this.render = function(a, b) {
		var c, g, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y;
		for (this.autoClear && this.clear(), o = 0, p = a.objects.length; p > o; o++)
			if (i = a.objects[o], i instanceof THREE.Mesh) {
				if (!i.__webGLVertexBuffer) {
					for (k = [], l = [], m = [], n = 0, q = 0, r = i.geometry.faces.length; r > q; q++) c = i.geometry.faces[q], g = c.color, c instanceof THREE.Face3 ? (v = i.geometry.vertices[c.a].position, w = i.geometry.vertices[c.b].position, x = i.geometry.vertices[c.c].position, k.push(v.x, v.y, v.z), k.push(w.x, w.y, w.z), k.push(x.x, x.y, x.z), m.push(g.r, g.g, g.b, g.a), m.push(g.r, g.g, g.b, g.a), m.push(g.r, g.g, g.b, g.a), l.push(n, n + 1, n + 2), n += 3) : c instanceof THREE.Face4 && (v = i.geometry.vertices[c.a].position, w = i.geometry.vertices[c.b].position, x = i.geometry.vertices[c.c].position, y = i.geometry.vertices[c.d].position, k.push(v.x, v.y, v.z), k.push(w.x, w.y, w.z), k.push(x.x, x.y, x.z), k.push(y.x, y.y, y.z), m.push(g.r, g.g, g.b, g.a), m.push(g.r, g.g, g.b, g.a), m.push(g.r, g.g, g.b, g.a), m.push(g.r, g.g, g.b, g.a), l.push(n, n + 1, n + 2), l.push(n, n + 2, n + 3), n += 4);
					if (!k.length) continue;
					i.__webGLVertexBuffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, i.__webGLVertexBuffer), e.bufferData(e.ARRAY_BUFFER, new WebGLFloatArray(k), e.STATIC_DRAW), i.__webGLColorBuffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, i.__webGLColorBuffer), e.bufferData(e.ARRAY_BUFFER, new WebGLFloatArray(m), e.STATIC_DRAW), i.__webGLFaceBuffer = e.createBuffer(), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, i.__webGLFaceBuffer), e.bufferData(e.ELEMENT_ARRAY_BUFFER, new WebGLUnsignedShortArray(l), e.STATIC_DRAW), i.__webGLFaceCount = l.length
				}
				for (h.multiply(b.matrix, i.matrix), d(h, f.viewMatrixArray), d(b.projectionMatrix, f.projectionMatrixArray), e.uniformMatrix4fv(f.viewMatrix, !1, f.viewMatrixArray), e.uniformMatrix4fv(f.projectionMatrix, !1, f.projectionMatrixArray), e.bindBuffer(e.ARRAY_BUFFER, i.__webGLVertexBuffer), e.vertexAttribPointer(f.position, 3, e.FLOAT, !1, 0, 0), s = 0, t = i.material.length; t > s; s++)
					if (j = i.material[s], j instanceof THREE.MeshColorFillMaterial) {
						if (!j.__webGLColorBuffer) {
							for (m = [], u = 0; u < i.__webGLFaceCount; u++) m.push(j.color.r, j.color.g, j.color.b, j.color.a);
							j.__webGLColorBuffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, j.__webGLColorBuffer), e.bufferData(e.ARRAY_BUFFER, new WebGLFloatArray(m), e.STATIC_DRAW)
						}
						e.bindBuffer(e.ARRAY_BUFFER, j.__webGLColorBuffer), e.vertexAttribPointer(f.color, 4, e.FLOAT, !1, 0, 0)
					} else j instanceof THREE.MeshFaceColorFillMaterial && (e.bindBuffer(e.ARRAY_BUFFER, i.__webGLColorBuffer), e.enableVertexAttribArray(f.color), e.vertexAttribPointer(f.color, 4, e.FLOAT, !1, 0, 0));
				e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, i.__webGLFaceBuffer), e.drawElements(e.TRIANGLES, i.__webGLFaceCount, e.UNSIGNED_SHORT, 0)
			}
	}
}, THREE.RenderableFace3 = function() {
	this.v1 = new THREE.Vector2, this.v2 = new THREE.Vector2, this.v3 = new THREE.Vector2, this.z = null, this.color = null, this.material = null
}, THREE.RenderableFace4 = function() {
	this.v1 = new THREE.Vector2, this.v2 = new THREE.Vector2, this.v3 = new THREE.Vector2, this.v4 = new THREE.Vector2, this.z = null, this.color = null, this.material = null
}, THREE.RenderableParticle = function() {
	this.x = null, this.y = null, this.z = null, this.rotation = null, this.scale = new THREE.Vector2, this.color = null, this.material = null
}, THREE.RenderableLine = function() {
	this.v1 = new THREE.Vector2, this.v2 = new THREE.Vector2, this.z = null, this.color = null, this.material = null
};
var TWEEN_MANAGER = TWEEN_MANAGER || function() {
		var a, b, c = [];
		return this.add = function(a) {
			c.push(a)
		}, this.remove = function(a) {
			for (var b = 0, d = c.length; d > b; b++)
				if (a == c[b]) return void c.splice(b, 1)
		}, this.update = function() {
			for (a = 0, b = (new Date).getTime(); a < c.length;) c[a].update(b) ? a++ : c.splice(a, 1)
		}, this
	}(),
	TWEEN = TWEEN || {};
TWEEN.Tween = function(a) {
	TWEEN_MANAGER.add(this);
	var b = a,
		c = {},
		d = {},
		e = 1e3,
		f = (new Date).getTime(),
		g = TWEEN.Easing.Elastic.EaseInOut,
		h = null,
		i = null;
	this.to = function(a, f) {
		e = 1e3 * a;
		for (var g in f) null !== b[g] && (c[g] = b[g], d[g] = f[g] - b[g]);
		return this
	}, this.delay = function(a) {
		return f += 1e3 * a, this
	}, this.easing = function(a) {
		return g = a, this
	}, this.onUpdate = function(a) {
		return h = a, this
	}, this.onComplete = function(a) {
		return i = a, this
	}, this.update = function(a) {
		var j, k;
		if (f > a) return !0;
		if (k = a - f, k > e) return null !== i && i(), !1;
		for (j in d) b[j] = g(k, c[j], d[j], e);
		return null !== h && h(), !0
	}, this.destroy = function() {
		TWEEN_MANAGER.remove(this)
	}
}, TWEEN.Easing = {
	Back: {},
	Elastic: {},
	Expo: {},
	Linear: {},
	Sine: {}
}, TWEEN.Easing.Back.EaseIn = function(a, b, c, d) {
	var e = 1.70158;
	return c * (a /= d) * a * ((e + 1) * a - e) + b
}, TWEEN.Easing.Back.EaseOut = function(a, b, c, d) {
	var e = 1.70158;
	return c * ((a = a / d - 1) * a * ((e + 1) * a + e) + 1) + b
}, TWEEN.Easing.Back.EaseInOut = function(a, b, c, d) {
	var e = 1.70158;
	return (a /= d / 2) < 1 ? c / 2 * a * a * (((e *= 1.525) + 1) * a - e) + b : c / 2 * ((a -= 2) * a * (((e *= 1.525) + 1) * a + e) + 2) + b
}, TWEEN.Easing.Elastic.EaseIn = function(a, b, c, d) {
	if (0 == a) return b;
	if (1 == (a /= d)) return b + c;
	var e = .3 * d,
		f = c,
		g = e / 4;
	return -(f * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a * d - g) * Math.PI / e)) + b
}, TWEEN.Easing.Elastic.EaseOut = function(a, b, c, d) {
	if (0 == a) return b;
	if (1 == (a /= d)) return b + c;
	var e = .3 * d,
		f = c,
		g = e / 4;
	return f * Math.pow(2, -10 * a) * Math.sin(2 * (a * d - g) * Math.PI / e) + c + b
}, TWEEN.Easing.Elastic.EaseInOut = function(a, b, c, d) {
	if (0 == a) return b;
	if (2 == (a /= d / 2)) return b + c;
	var e = .3 * d * 1.5,
		f = c,
		g = e / 4;
	return 1 > a ? -.5 * f * Math.pow(2, 10 * (a -= 1)) * Math.sin(2 * (a * d - g) * Math.PI / e) + b : f * Math.pow(2, -10 * (a -= 1)) * Math.sin(2 * (a * d - g) * Math.PI / e) * .5 + c + b
}, TWEEN.Easing.Expo.EaseIn = function(a, b, c, d) {
	return 0 == a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b
}, TWEEN.Easing.Expo.EaseOut = function(a, b, c, d) {
	return a == d ? b + c : c * (-Math.pow(2, -10 * a / d) + 1) + b
}, TWEEN.Easing.Expo.EaseInOut = function(a, b, c, d) {
	return 0 == a ? b : a == d ? b + c : (a /= d / 2) < 1 ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : c / 2 * (-Math.pow(2, -10 * --a) + 2) + b
}, TWEEN.Easing.Linear.EaseNone = function(a, b, c, d) {
	return c * a / d + b
}, TWEEN.Easing.Linear.EaseIn = function(a, b, c, d) {
	return c * a / d + b
}, TWEEN.Easing.Linear.EaseOut = function(a, b, c, d) {
	return c * a / d + b
}, TWEEN.Easing.Linear.EaseInOut = function(a, b, c, d) {
	return c * a / d + b
}, TWEEN.Easing.Sine.EaseIn = function(a, b, c, d) {
	return -c * Math.cos(a / d * (Math.PI / 2)) + c + b
}, TWEEN.Easing.Sine.EaseInOutSine = function(a, b, c, d) {
	return -c / 2 * (Math.cos(Math.PI * a / d) - 1) + b
}, TWEEN.Easing.Sine.EaseOut = function(a, b, c, d) {
	return c * Math.sin(a / d * (Math.PI / 2)) + b
};
var MANUAL_TWEEN = MANUAL_TWEEN || {};
MANUAL_TWEEN.Manager = function() {
	var a = [];
	this.add = function(b) {
		a.push(b)
	}, this.remove = function(b) {
		for (var c = 0, d = a.length; d > c; c++)
			if (b == a[c]) return void a.splice(c, 1)
	}, this.update = function(b) {
		for (var c = 0, d = a.length; d > c; c++) a[c].update(b)
	}
}, MANUAL_TWEEN.Tween = function(a, b) {
	var c = a,
		d = {},
		e = {},
		f = {},
		g = 1e3,
		h = 0,
		i = TWEEN.Easing.Linear.EaseNone;
	this.to = function(a, b) {
		g = 1e3 * a;
		for (var h in b) null !== c[h] && (d[h] = c[h], e[h] = b[h] - c[h], f[h] = b[h]);
		return this
	}, this.delay = function(a) {
		return h += 1e3 * a, this
	}, this.easing = function(a) {
		return i = a, this
	}, this.update = function(a) {
		var b, j;
		if (h > a)
			for (b in d) c[b] = d[b];
		else if (j = a - h, j >= g)
			for (b in f) c[b] = f[b];
		else
			for (b in e) c[b] = i(j, d[b], e[b], g)
	}
};
var Boid = function() {
		"use strict";
		var a, b, c, d, e, f, g, h = new THREE.Vector3,
			i = 1e4,
			j = 3,
			k = .1,
			l = !1;
		a = this.position = new THREE.Vector3, b = this.velocity = new THREE.Vector3, c = new THREE.Vector3, this.setGoal = function(a) {
			g = a
		}, this.setAvoidWalls = function(a) {
			l = a
		}, this.setWorldSize = function(a, b, c) {
			d = a, e = b, f = c
		}, this.run = function(b) {
			l && (h.set(-d, a.y, a.z), this.avoid(h), h.set(d, a.y, a.z), this.avoid(h), h.set(a.x, -e, a.z), this.avoid(h), h.set(a.x, e, a.z), this.avoid(h), h.set(a.x, a.y, -f), this.avoid(h), h.set(a.x, a.y, f), this.avoid(h)), Math.random() > .5 && this.flock(b), this.move()
		}, this.flock = function(a) {
			g && this.reach(g, .005), this.alignment(a), this.cohesion(a), this.separation(a)
		}, this.move = function() {
			b.addSelf(c);
			var d = b.length();
			d > j && b.divideScalar(d / j), a.addSelf(b), c.set(0, 0, 0)
		}, this.checkBounds = function() {
			a.x > d && (a.x = -d), a.x < -d && (a.x = d), a.y > e && (a.y = -e), a.y < -e && (a.y = e), a.z > f && (a.z = -f), a.z < -f && (a.z = f)
		};
		var m = new THREE.Vector3,
			n = new THREE.Vector3;
		this.avoid = function(b) {
			m.copy(a), m.subSelf(b), m.multiplyScalar(5 / a.distanceToSquared(b)), c.addSelf(m)
		}, this.repulse = function(b) {
			var d = a.distanceToSquared(b);
			22500 > d && (m.copy(a), m.subSelf(b), m.multiplyScalar(75 / d), c.addSelf(m))
		}, this.reach = function(b, d) {
			m.copy(b), m.subSelf(a), m.multiplyScalar(d), c.addSelf(m)
		}, this.alignment = function(b) {
			var d, e;
			m.set(0, 0, 0);
			for (var f = 0, g = 0; g < b.length; g++) Math.random() > .6 || (d = b[g], e = d.position.distanceToSquared(a), e > 0 && i >= e && (m.addSelf(d.velocity), f++));
			if (f > 0) {
				m.divideScalar(f);
				var h = m.length();
				h > k && m.divideScalar(h / k)
			}
			c.addSelf(m)
		}, this.cohesion = function(b) {
			var d, e;
			m.set(0, 0, 0);
			for (var f = 0, g = 0; g < b.length; g++) Math.random() > .6 || (d = b[g], e = d.position.distanceToSquared(a), e > 0 && i >= e && (m.addSelf(d.position), f++));
			f > 0 && m.divideScalar(f), m.subSelf(a);
			var h = m.length();
			h > k && m.divideScalar(h / k), c.addSelf(m)
		}, this.separation = function(b) {
			for (var d, e, f = 0; f < b.length; f++) Math.random() > .6 || (d = b[f], e = d.position.distanceToSquared(a), e > 0 && i >= e && (n.copy(a), n.subSelf(d.position), n.normalize(), n.divideScalar(Math.sqrt(e)), m.addSelf(n)));
			c.addSelf(m)
		}
	},
	ImprovedNoise = function() {
		function a(a) {
			return a * a * a * (a * (6 * a - 15) + 10)
		}

		function b(a, b, c) {
			return b + a * (c - b)
		}

		function c(a, b, c, d) {
			var e = 15 & a,
				f = 8 > e ? b : c,
				g = 4 > e ? c : 12 == e || 14 == e ? b : d;
			return (0 === (1 & e) ? f : -f) + (0 === (2 & e) ? g : -g)
		}
		for (var d = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180], e = 0; 256 > e; e++) d[256 + e] = d[e];
		return {
			noise: function(e, f, g) {
				var h = Math.floor(e),
					i = Math.floor(f),
					j = Math.floor(g),
					k = 255 & h,
					l = 255 & i,
					m = 255 & j;
				e -= h, f -= i, g -= j;
				var n = e - 1,
					o = f - 1,
					p = g - 1,
					q = a(e),
					r = a(f),
					s = a(g),
					t = d[k] + l,
					u = d[t] + m,
					v = d[t + 1] + m,
					w = d[k + 1] + l,
					x = d[w] + m,
					y = d[w + 1] + m;
				return b(s, b(r, b(q, c(d[u], e, f, g), c(d[x], n, f, g)), b(q, c(d[v], e, o, g), c(d[y], n, o, g))), b(r, b(q, c(d[u + 1], e, f, p), c(d[x + 1], n, f, g - 1)), b(q, c(d[v + 1], e, o, p), c(d[y + 1], n, o, p))))
			}
		}
	};
shuffle = function(a) {
	for (var b, c, d = a.length; d > 0;) c = Math.floor(Math.random() * d), d--, b = a[d], a[d] = a[c], a[c] = b;
	return a
}, sprite.prototype = {
	create: function(a, b, c) {
		this.image = new Image;
		var d = this;
		this.image.onload = function() {
			d.onImage()
		};
		var e = new Date;
		this.image.src = a + "?" + e.getTime(), this.step = 0, this.running = !0, this.framerate = c, this.size = b, this.off_x = 0, this.off_y = 0, this.loop = !0, this.offset = 0
	},
	onImage: function() {
		this.steps = this.image.height / this.size
	},
	blit: function(a, b, c, d) {
		if (this.image.complete) {
			if (this.loop) {
				var e = (d + this.offset) % 1;
				this.step = Math.floor(e * this.framerate) % this.steps
			} else this.step = Math.floor(d * this.framerate), this.step > this.steps - 1 && (this.step = this.steps - 1);
			a.drawImage(this.image, 0, this.step * this.size, this.image.width, this.size, b - this.image.width / 2 + this.off_x, c - this.size / 2 + this.off_y, this.image.width, this.size)
		}
	},
	start: function() {
		this.running = !0
	},
	stop: function() {
		this.running = !1, this.step = 0
	}
}, ProjMap.prototype = {
	create: function(a) {
		this.locationObject = a, this.projection = new MercatorProjection, this.canvas = document.createElement("canvas"), this.canvas.style.position = "absolute", this.ctx = this.canvas.getContext("2d"), this.texture = document.createElement("canvas"), this.texture.width = 320, this.texture.height = 240, this.texture_ctx = this.texture.getContext("2d"), this.runner = new sprite, this.standing = new sprite, this.tree = new sprite, this.bird = new sprite, this.bird2 = new sprite, this.runner.create("files/img/running.png", 15, 24), this.standing.create("files/img/runner_static.png", 7, 1), this.tree.create("files/img/treeSprite_2.png", 64, 30), this.bird.create("files/img/bird3.png", 16, 22), this.bird2.create("files/img/birdb.png", 64, 22), this.tree.loop = !1, this.init(), this.addTrees(), this.addBirds1(), this.addBirds2(), this.addBirds3()
	},
	init: function() {
		this.perspective = .35, this.default_zoom = 19, this.deviation = 0, this.tween_zoom = 0, this.tween_zoom2 = 0, this.tween_angle1 = 0, this.tween_angle2 = 0, this.tween_angle3 = 0, this.tween_perspective = 0, this.tween_alpha = 0, this.angle = 0, this.runner_angle = 0, this.running = !1, this.rotating = !1, this.clouds = !1, this.zooming = !1, this.clouds_alpha = 0, this.white_alpha = 0, this.texture_angle = 0, this.precalc(), this.setZoom(this.default_zoom, !0), this.preloadImages()
	},
	setScene: function(a) {
		1 == a && (this.tint_alpha = .4, this.tint_colour = "#85622a"), 2 == a && (this.tint_alpha = 0, this.tint_colour = "#704214")
	},
	addTrees: function() {
		var a, b, c, d, e, f, g, h, i, j;
		for (d = [], a = 0; 50 > a; a++) c = {
			pos: this.locationObject.getPosition(a / 50),
			d: 1e-4
		}, d.push(c);
		for (d.push({
				pos: this.locationObject.getLocation(),
				d: 1e-4
			}), a = 0; 50 > a; a++) {
			c = this.locationObject.getPosition(a / 100);
			do
				for (e = c.lat() + 5e-4 - .001 * Math.random(), f = c.lng() + 5e-4 - .001 * Math.random(), i = !0, b = 0; b < d.length; b++)
					if (g = e - d[b].pos.lat(), h = f - d[b].pos.lng(), j = Math.sqrt(g * g + h * h), j < d[b].d) {
						i = !1;
						break
					}
			while (!i);
			this.trees_array.push({
				pos: new google.maps.LatLng(e, f),
				a: 2 * Math.random() * Math.PI,
				scale: .75 + 1.25 * Math.random(),
				offset: 12.562 + 21 * Math.random()
			})
		}
		var k = 6e-4,
			l = 25e-5;
		for (d = [], d.push({
				pos: this.locationObject.getLocation(),
				d: 5e-4
			}), c = this.locationObject.getLocation(), a = 0; 150 > a; a++) {
			do
				for (e = c.lat() + 75e-5 - .0015 * Math.random(), f = c.lng() + 75e-5 - .0015 * Math.random(), i = !0, b = 0; b < d.length; b++)
					if (g = e - d[b].pos.lat(), h = f - d[b].pos.lng(), j = Math.sqrt(g * g + h * h), j < d[b].d) {
						i = !1;
						break
					}
			while (!i);
			this.trees_array.push({
				pos: new google.maps.LatLng(e, f),
				a: 2 * Math.random() * Math.PI,
				scale: .75 + 1.5 * Math.random(),
				offset: 31.875 - 6 * Math.random()
			})
		}
		k = 35e-5, l = 15e-5;
		for (var m = -k; k > m; m += l)
			for (var n = -k; k > n; n += l) e = c.lat() + m + (1e-5 - 5e-5 * Math.random()), f = c.lng() + n + (1e-5 - 5e-5 * Math.random()), this.trees_array.push({
				pos: new google.maps.LatLng(e, f),
				a: 2 * Math.random() * Math.PI,
				scale: .75 + 1.5 * Math.random(),
				offset: 33.875 - 2 * Math.random()
			});
		for (a = 0; a < this.trees_array.length; a++) {
			var o = 2 * Math.random() * Math.PI;
			k = 300 + 300 * Math.random();
			var p = 3 + 2 * Math.random(),
				q = {
					x: k * Math.cos(o) / p,
					y: k * Math.sin(o) / p
				};
			this.trees_array[a].bird = {
				a: o,
				r: k,
				d: q,
				t: p,
				s: null,
				o: Math.random()
			}
		}
		this.trees_array.sort(function(a, b) {
			return a.scale - b.scale
		})
	},
	addBirds1: function() {
		for (var a = 0; 100 > a; a++) {
			var b = -1 - .5 * Math.random(),
				c = 1 - 2 * Math.random(),
				d = 1 + .5 * Math.random(),
				e = 1 - 2 * Math.random() - .5 * Math.random(),
				f = 1.5 * (.025 + .05 * Math.random()),
				g = (d - b) / f,
				h = (e - c) / f,
				i = Math.atan2(h, g);
			this.birds_array.push({
				start: {
					x: b,
					y: c
				},
				end: {
					x: d,
					y: e
				},
				d: {
					x: g,
					y: h
				},
				a: i,
				t: f,
				o: Math.random(),
				scale: .4 + .4 * Math.random()
			})
		}
	},
	addBirds2: function() {
		for (var a = 0; 50 > a; a++) {
			var b = 1 - 2 * Math.random(),
				c = 1 + .5 * Math.random(),
				d = 1 - 2 * Math.random(),
				e = -1 - .5 * Math.random(),
				f = 3 * (.025 + .05 * Math.random()),
				g = (d - b) / f,
				h = (e - c) / f,
				i = Math.atan2(h, g);
			this.birds2_array.push({
				start: {
					x: b,
					y: c
				},
				end: {
					x: d,
					y: e
				},
				d: {
					x: g,
					y: h
				},
				a: i,
				t: f,
				o: Math.random(),
				scale: .5 + .3 * Math.random()
			})
		}
	},
	addBirds3: function() {
		for (var a = 0; 10 > a; a++) {
			var b = 1.5 - 3 * Math.random(),
				c = 1 + .5 * Math.random(),
				d = 0,
				e = -3,
				f = 3 * (.025 + .05 * Math.random()),
				g = (d - b) / f,
				h = (e - c) / f,
				i = Math.atan2(h, g);
			this.birds3_array.push({
				start: {
					x: b,
					y: c
				},
				end: {
					x: d,
					y: e
				},
				d: {
					x: g,
					y: h
				},
				a: i,
				t: f,
				o: Math.random(),
				scale: .75 + .25 * Math.random()
			})
		}
	},
	addCopyright: function(a) {
		"" !== a && (this.copyrights.push(a), this.invalidate_c = !0)
	},
	fixCopyrights: function() {
		this.invalidate_c && (this.copyrights = unique(this.copyrights), this.copyright_str = "© 2010 Google, " + this.copyrights.join(", "), this.copyright_str = this.copyright_str.replace(/&amp;/gi, "&"), this.canvas.title = this.copyright_str, this.invalidate_c = !1)
	},
	getCopyrights: function() {
		return this.copyright_str
	},
	loadCopyright: function(a, b) {
		var c = "http://maps.google.com/maps/vp?spn=1.2,1.2&t=h&z=" + b + "&vp=" + a.lat() + "," + a.lng() + "&ev=mh&hl=en&country=us",
			d = document.getElementsByTagName("head").item(0),
			e = document.createElement("script");
		e.setAttribute("type", "text/javascript"), e.setAttribute("src", c), d.appendChild(e)
	},
	preloadImages: function() {
		var a, b;
		this.tilemap = [], this.load_failed = !1, this.setZoom(this.default_zoom, !0);
		for (var c = this.locationObject.getPosition(0), d = this.locationObject.getLocation(), e = d.lat() - c.lat(), f = d.lng() - c.lng(), g = 0; 1 > g; g += .01) a = new google.maps.LatLng(c.lat() + g * e, c.lng() + g * f), this.loadCopyright(a, this.int_zoom), b = this.calculateTileFromLatLng(a), this.enableTile(b.x, b.y, !0);
		a = this.locationObject.getLocation();
		for (var h = 13; 20 > h; h++) this.setZoom(h), b = this.calculateTileFromLatLng(a), this.enableTile(b.x, b.y, !0);
		this.setZoom(this.default_zoom), this.updateCamera(0)
	},
	isPreloaded: function() {
		for (var a in this.tilemap) {
			var b = this.tilemap[a];
			for (var c in b)
				if (!b[c].complete) return !1
		}
		return this.tree.image.complete && this.bird.image.complete ? !0 : !1
	},
	setZoom: function(a, b) {
		var c;
		if (a != this.zoom || b) {
			a > 21.99 && (a = 21.99), this.zoom = a, this.int_zoom = Math.floor(a), this.zoom2 = Math.pow(2, this.int_zoom), this.tile_zoom = (1 + (this.zoom - this.int_zoom)) / this.scale;
			(1 + this.int_zoom) / this.scale;
			this.real_zoom = 1 / (20 - this.zoom), c = this.projection.fromLatLngToPoint(gLocation.getLocation());
			var d = new google.maps.Point(c.x * this.zoom2, c.y * this.zoom2),
				e = new google.maps.Point(Math.floor(d.x / MERCATOR_RANGE), Math.floor(d.y / MERCATOR_RANGE));
			this.tileorigin = e;
			var f = new google.maps.Point((e.x + .5) * MERCATOR_RANGE, (e.y + .5) * MERCATOR_RANGE),
				g = new google.maps.Point(f.x / this.zoom2, f.y / this.zoom2),
				h = this.projection.fromPointToLatLng(g);
			this.offset = new google.maps.LatLng(h.lat(), h.lng());
			var i = this.projection.fromLatLngToPoint(this.offset);
			this.poff = new google.maps.Point(i.x * this.zoom2, i.y * this.zoom2), null !== this.last_time && this.updateCamera(this.last_time), c = new google.maps.Point(1e-5, 1e-5), this.zoom_factor = new google.maps.Point(c.x * this.zoom2, c.y * this.zoom2), this.final_coordinates = this.getWorldPosition(this.locationObject.getPosition(1)), this.original_coordinates = this.getWorldPosition(this.locationObject.getPosition(0));
			var j = this.locationObject.getPosition(0),
				k = this.locationObject.getPosition(1),
				l = this.getWorldPosition(j),
				m = this.getWorldPosition(k),
				n = m.x - l.x,
				o = m.y - l.y;
			this.angle = -Math.atan2(o, n)
		}
	},
	setSize: function(a, b) {
		this.canvas.width = a / this.scale, this.canvas.height = b / this.scale, this.canvas.style.width = a + "px", this.canvas.style.height = b + "px", this.texture.width = a / this.scale, this.texture.height = b / this.scale, this.precalc()
	},
	precalc: function() {
		this.spans = [];
		for (var a = -.5 * this.texture.width, b = .5 * this.texture.width, c = -.5 * this.texture.height, d = .5 * this.texture.height - 1, e = -this.perspective * this.texture.width, f = (this.perspective * this.texture.width, 180 * Math.PI / 180), g = -a / Math.tan(.5 * f) + 1e-100, h = -e / Math.tan(.5 * f) + 1e-100, i = (d / h - c / g) / this.canvas.height, j = (1 / h - 1 / g) / this.canvas.height, k = (e - a) / this.canvas.height, l = .5 * this.canvas.height, m = c / g, n = 1 / g, o = 0, p = l; p > -l; p--) {
			m += i, n += j;
			var q = m / n + .5 * this.texture.height;
			o = (l - p) * k, this.spans.push({
				x: 0,
				y: this.canvas.height - (p + l),
				w: this.canvas.width,
				h: 1,
				u1: a + o + .5 * this.texture.width,
				u2: b - o + .5 * this.texture.width,
				v1: q,
				v2: q + 1
			}), o += k
		}
	},
	getWorldPosition: function(a) {
		var b = this.projection.fromLatLngToPoint(a),
			c = new google.maps.Point(b.x * this.zoom2, b.y * this.zoom2);
		return c.x -= this.poff.x, c.y -= this.poff.y, c
	},
	render: function(a, b) {
		var c, d, e, f, g, h, i, j = .5 * this.texture.width,
			k = .5 * this.texture.height;
		this.running && this.updateCamera(b, a);
		var l = this.angle + this.texture_angle - .5 * Math.PI;
		this.rotating && (l = this.texture_angle), this.texture_ctx.save(), this.texture_ctx.translate(j, k), this.texture_ctx.scale(this.tile_zoom, this.tile_zoom), this.texture_ctx.rotate(l), this.texture_ctx.translate(this.position_offset.x, this.position_offset.y), this.texture_ctx.fillStyle = "#000", this.debug && (this.texture_ctx.strokeStyle = "#f0f", this.texture_ctx.beginPath());
		var m = this.earthquake ? 257 : 256;
		for (c in this.tilemap[this.int_zoom]) {
			var n = this.tilemap[this.int_zoom][c],
				o = n.x * n.w - 128 - this.position.x,
				p = n.y * n.h - 128 - this.position.y;
			o + n.w >= -this.texture.width && p + n.h >= -this.texture.height && o <= 2 * this.texture.width && p <= 2 * this.texture.height && (n.complete ? this.texture_ctx.drawImage(n.image, 0, 0, 255, 255, o, p, m, m) : this.texture_ctx.fillRect(o, o, n.w, n.h), this.debug && (this.texture_ctx.moveTo(o, p), this.texture_ctx.lineTo(o + n.w, p), this.texture_ctx.lineTo(o + n.w, p + n.h), this.texture_ctx.lineTo(o, p + n.h), this.texture_ctx.lineTo(o, p)))
		}
		if (this.debug && this.texture_ctx.stroke(), this.texture_ctx.restore(), this.texture_ctx.save(), this.texture_ctx.translate(j, k), this.texture_ctx.translate(this.position_offset.x, this.position_offset.y), this.texture_ctx.scale(this.tile_zoom, this.tile_zoom), this.texture_ctx.rotate(l), this.texture_ctx.globalAlpha = .7, d = this.runner_position.x - this.position.x, e = this.runner_position.y - this.position.y, this.texture_ctx.translate(d, e), this.texture_ctx.scale(this.zoom_factor.x, this.zoom_factor.y), this.texture_ctx.scale(.2, .2), this.running ? (this.texture_ctx.rotate(this.runner_angle + .5 * Math.PI), this.debug && (this.texture_ctx.globalAlpha = 1, this.texture_ctx.fillStyle = "#f0f", this.texture_ctx.fillRect(-5, -5, 10, 10), this.texture_ctx.globalAlpha = .5), this.runner.blit(this.texture_ctx, 0, 0, a)) : this.standing.blit(this.texture_ctx, 0, 0, a), this.texture_ctx.restore(), this.birds1) {
			for (this.texture_ctx.save(), this.texture_ctx.translate(j, k), c = 0; c < this.birds_array.length; c++) f = this.birds_array[c], g = a - this.start_time, d = f.start.x * j + f.d.x * g, e = f.start.y * k + f.d.y * g, this.texture_ctx.save(), this.texture_ctx.translate(d, e), this.texture_ctx.scale(f.scale, f.scale), this.texture_ctx.rotate(f.a + .5 * Math.PI), this.texture_ctx.globalAlpha = .6 + (f.scale - .4), this.bird.blit(this.texture_ctx, 0, 0, g + 20 * f.o), this.texture_ctx.restore();
			this.texture_ctx.restore()
		}
		if (this.birds2) {
			for (this.texture_ctx.save(), this.texture_ctx.translate(j, k), c = 0; c < this.birds2_array.length; c++) f = this.birds2_array[c], g = a - this.start_time, d = f.start.x * j + f.d.x * g, e = f.start.y * k + f.d.y * g, this.texture_ctx.save(), this.texture_ctx.translate(d, e), this.texture_ctx.globalAlpha = .6 + (f.scale - .3), this.texture_ctx.scale(f.scale, f.scale), this.texture_ctx.rotate(f.a + .5 * Math.PI), this.bird.blit(this.texture_ctx, 0, 0, g + 20 * f.o), this.texture_ctx.restore();
			this.texture_ctx.restore()
		}
		if (this.birds3) {
			for (this.texture_ctx.save(), this.texture_ctx.translate(j, k), c = 0; c < this.birds3_array.length; c++) f = this.birds3_array[c], g = a - this.start_time, d = f.start.x * j + f.d.x * g, e = f.start.y * k + f.d.y * g, this.texture_ctx.save(), this.texture_ctx.translate(d, e), i = f.scale - .1 * g, .5 > i && (i = .5), this.texture_ctx.scale(i, i), this.texture_ctx.rotate(f.a + .5 * Math.PI), this.bird2.blit(this.texture_ctx, 0, 0, g + 20 * f.o), this.texture_ctx.restore();
			this.texture_ctx.restore()
		}
		if (this.trees) {
			for (this.texture_ctx.save(), this.texture_ctx.translate(j, k), this.texture_ctx.translate(this.position_offset.x, this.position_offset.y), this.texture_ctx.scale(this.tile_zoom, this.tile_zoom), c = 0; c < this.trees_array.length; c++) {
				var q = this.trees_array[c];
				if (g = a - this.start_time - q.offset, g > 0) h = this.getWorldPosition(q.pos), d = h.x - this.position.x, e = h.y - this.position.y, this.texture_ctx.save(), this.texture_ctx.rotate(l), this.texture_ctx.translate(d, e), this.texture_ctx.scale(1.1 * q.scale, 1.1 * q.scale), this.texture_ctx.rotate(q.a), this.tree.blit(this.texture_ctx, 0, 0, g), this.texture_ctx.restore();
				else if (g > -q.bird.t) {
					null === q.bird.s && (q.bird.s = a), g = a - q.bird.s;
					var r = 1 - g / q.bird.t;
					g = q.bird.t - g, h = this.getWorldPosition(q.pos), d = h.x - this.position.x, e = h.y - this.position.y, this.texture_ctx.save(), this.texture_ctx.translate(d, e), this.texture_ctx.rotate(l), d = q.bird.d.x * g, e = q.bird.d.y * g, this.texture_ctx.translate(d, e), this.texture_ctx.rotate(q.bird.a - .5 * Math.PI), this.texture_ctx.scale(r, r), this.bird.blit(this.texture_ctx, 0, 0, a + 20 * q.bird.o), this.texture_ctx.restore()
				}
			}
			this.texture_ctx.restore()
		}
		if (this.clouds && this.cloud.complete && (this.texture_ctx.save(), this.texture_ctx.translate(j, k), this.texture_ctx.globalAlpha = this.clouds_alpha, this.texture_ctx.scale(2, 2), this.texture_ctx.rotate(.25 * l), this.texture_ctx.drawImage(this.cloud, -.5 * this.cloud.width, -.5 * this.cloud.height), this.texture_ctx.restore(), this.texture_ctx.save(), this.texture_ctx.globalAlpha = this.white_alpha, this.texture_ctx.fillStyle = "#fff", this.texture_ctx.fillRect(0, 0, this.texture.width, this.texture.height), this.texture_ctx.restore()), this.debug) {
			for (this.texture_ctx.save(), this.texture_ctx.translate(j, k), this.texture_ctx.translate(this.position_offset.x, this.position_offset.y), this.texture_ctx.scale(this.tile_zoom, this.tile_zoom), this.texture_ctx.rotate(l), h = this.getWorldPosition(this.locationObject.getLocation()), d = h.x - this.position.x, e = h.y - this.position.y, this.texture_ctx.save(), this.texture_ctx.translate(d, e), this.texture_ctx.scale(this.zoom_factor.x, this.zoom_factor.y), this.texture_ctx.scale(.1, .1), this.texture_ctx.fillStyle = "#f0f", this.texture_ctx.fillRect(-5, -5, 10, 10), this.texture_ctx.restore(), this.texture_ctx.save(), this.texture_ctx.translate(d, e), this.texture_ctx.scale(this.zoom_factor.x, this.zoom_factor.y), this.texture_ctx.scale(.1, .1), this.texture_ctx.fillStyle = "#f0f", this.texture_ctx.fillRect(-5, -5, 10, 10), this.texture_ctx.restore(), this.texture_ctx.save(), this.texture_ctx.strokeStyle = "#f0f", this.texture_ctx.beginPath(), c = 0; 1 > c; c += .1) h = this.getWorldPosition(this.locationObject.getPosition(c)), d = h.x - this.position.x, e = h.y - this.position.y, this.texture_ctx.lineTo(d, e), this.texture_ctx.arc(d, e, 5, 0, 2 * Math.PI), this.texture_ctx.moveTo(d, e);
			this.texture_ctx.stroke(), this.texture_ctx.restore(), this.texture_ctx.save(), this.texture_ctx.fillStyle = "#f0f", this.texture_ctx.beginPath();
			var s = this.locationObject.getRoute();
			for (c = 0; c < s.length; c++) h = this.getWorldPosition(s[c]), d = h.x - this.position.x, e = h.y - this.position.y, this.texture_ctx.arc(d, e, 5, 0, 2 * Math.PI);
			this.texture_ctx.fill(), this.texture_ctx.restore(), this.texture_ctx.restore()
		}
		for (c = 0; c < this.spans.length; c++) i = this.spans[c], this.ctx.drawImage(this.texture, i.u1, i.v1, i.u2 - i.u1, i.v2 - i.v1, i.x, i.y, i.w, i.h);
		this.vignette.complete && (this.ctx.save(), this.ctx.globalAlpha = 1 * (1 - this.white_alpha), this.ctx.drawImage(this.vignette, 0, 0, this.vignette.width, this.vignette.height, 0, 0, this.canvas.width, this.canvas.height), this.ctx.restore()), this.frameCount++
	},
	updateCamera: function(a, b) {
		var c, d, e, f = null;
		this.runner_position && (f = this.runner_position);
		var g, h, i, j = this.trees ? 1.35 : 1;
		if (this.trees) {
			var k = 34.409 / 45.409,
				l = 1 - k,
				m = l + (b - 244.5931396484375) / 34.409 * k;
			i = this.locationObject.getPosition(l), g = this.locationObject.getPosition(m), h = this.locationObject.getPosition(m + .005)
		} else i = this.locationObject.getPosition(0), g = this.locationObject.getPosition(a), h = this.locationObject.getPosition(a + .005);
		var n = this.locationObject.getLocation(),
			o = new google.maps.LatLng(n.lat() - i.lat(), n.lng() - i.lng()),
			p = new google.maps.LatLng(i.lat() + a * j * o.lat(), i.lng() + a * j * o.lng()),
			q = this.getWorldPosition(g),
			r = this.getWorldPosition(p),
			s = this.getWorldPosition(h);
		this.fpos = this.getWorldPosition(n), f || (f = q), c = s.x - f.x, d = s.y - f.y, e = Math.atan2(d, c), c = s.x - q.x, d = s.y - q.y, e = Math.atan2(d, c), this.runner_angle = e;
		var t = this.calculateTileFromLatLng(p);
		this.position = {
			x: r.x,
			y: r.y,
			tile_x: t.x,
			tile_y: t.y
		}, this.runner_position = q, this.last_time = a, this.enableTile(t.x, t.y, !1)
	},
	enableTile: function(a, b, c) {
		for (var d = -this.extent; d <= this.extent; d++)
			for (var e = -this.extent; e <= this.extent; e++) {
				var f = a + e + "." + (b + d);
				if (void 0 === this.tilemap[this.int_zoom] && (this.tilemap[this.int_zoom] = {}), void 0 === this.tilemap[this.int_zoom][f]) {
					var g, h = a + e,
						i = b + d;
					switch (this.map_type) {
						case 1:
							g = "http://khm0.google.com/kh/v=" + this.map_version + "&x=" + h + "&s=&y=" + i + "&z=" + this.int_zoom + "&s=Galil";
							break;
						case 2:
							g = "http://mt1.google.com/vt/lyrs=m@129&hl=en&x=" + h + "&y=" + i + "&z=" + this.int_zoom + "&s=Gal"
					}
					var j = {
						x: h - this.tileorigin.x,
						y: i - this.tileorigin.y,
						w: 256,
						h: 256,
						is_critical: c,
						image: new Image,
						complete: !1
					};
					this.attachImage(j, g), this.tilemap[this.int_zoom][h + "." + i] = j
				}
			}
	},
	attachImage: function(a, b) {
		var c = this;
		a.image.onerror = function() {
			a.is_critical && !c.load_failed && (c.load_failed = !0)
		}, a.image.onload = function() {
			if (RegExp(" AppleWebKit/").test(navigator.userAgent)) {
				var b = document.createElement("canvas");
				b.width = 256, b.height = 256;
				var c = b.getContext("2d");
				c.drawImage(this, 0, 0), c.globalAlpha = .5, c.globalCompositeOperation = "darker", c.fillStyle = "#704214", c.fillRect(0, 0, 256, 256), c.globalCompositeOperation = "lighter", c.drawImage(this, 0, 0), a.image = b
			}
			a.complete = !0
		}, a.image.src = b
	},
	calculateTileFromLatLng: function(a) {
		var b = this.projection.fromLatLngToPoint(a),
			c = new google.maps.Point(b.x * this.zoom2, b.y * this.zoom2),
			d = new google.maps.Point(Math.floor(c.x / MERCATOR_RANGE), Math.floor(c.y / MERCATOR_RANGE));
		return {
			x: d.x,
			y: d.y
		}
	}
};
var BitmapSequence = function(a) {
		var b = a,
			c = a.length - 1;
		this.position = 0, this.get = function() {
			return b[Math.floor(this.position * c)]
		}
	},
	Crow = function() {
		function a(a, b, d) {
			c.vertices.push(new THREE.Vertex(new THREE.Vector3(a, b, d)))
		}

		function b(a, b, d) {
			c.faces.push(new THREE.Face3(a, b, d))
		}
		var c = this;
		THREE.Geometry.call(this), a(5, 0, 0), a(-5, -2, 1), a(-5, 0, 0), a(-5, -2, -1), a(0, 2, -6), a(0, 2, 6), a(2, 0, 0), a(-3, 0, 0), b(0, 2, 1), b(4, 7, 6), b(5, 6, 7)
	};
Crow.prototype = new THREE.Geometry, Crow.prototype.constructor = Crow;
var Sphere = function(a, b, c, d, e) {
	THREE.Geometry.call(this);
	var f, g, h = b || 8,
		i = c || 6,
		j = Math.max(3, h),
		k = Math.max(2, i),
		l = [];
	for (g = 0; k + 1 > g; g++) {
		var m = g / k,
			n = a * Math.cos(m * Math.PI),
			o = a * Math.sin(m * Math.PI),
			p = [],
			q = 0;
		for (f = 0; j > f; f++) {
			var r = 2 * f / j,
				s = o * Math.sin(r * Math.PI),
				t = o * Math.cos(r * Math.PI);
			(0 == g || g == k) && f > 0 || (q = this.vertices.push(new THREE.Vertex(new THREE.Vector3(t, n, s))) - 1), p.push(q)
		}
		l.push(p)
	}
	var u = l.length;
	for (g = 0; u > g; g++) {
		var v = l[g].length;
		if (g > 0)
			for (f = 0; v > f; f++) {
				var w = f == v - 1,
					x = l[g][w ? 0 : f + 1],
					y = l[g][w ? v - 1 : f],
					z = l[g - 1][w ? v - 1 : f],
					A = l[g - 1][w ? 0 : f + 1],
					B = g / (u - 1),
					C = (g - 1) / (u - 1),
					D = (f + 1) / v,
					E = f / v,
					F = new THREE.UV(d ? D : 1 - D, e ? 1 - B : B),
					G = new THREE.UV(d ? E : 1 - E, e ? 1 - B : B),
					H = new THREE.UV(d ? E : 1 - E, e ? 1 - C : C),
					I = new THREE.UV(d ? D : 1 - D, e ? 1 - C : C);
				g < l.length - 1 && (this.faces.push(new THREE.Face3(x, y, z)), this.uvs.push([F, G, H])), g > 1 && (this.faces.push(new THREE.Face3(x, z, A)), this.uvs.push([F, H, I]))
			}
	}
};
Sphere.prototype = new THREE.Geometry, Sphere.prototype.constructor = Sphere;

function CanvasBirds(a, b, c) {
	"use strict";

	function d() {
		m = Date.now(), k = new THREE.Vector3(0, 1e3, 0), g = new THREE.Camera(75, n / o, 1, 1e4), g.position.z = 500, h = new THREE.Scene, j = [], l = [], i = new THREE.CanvasRenderer, i.domElement.style.position = "absolute", i.domElement.style.left = "0px", i.domElement.style.top = "0px", i.setSize(n, o), a.style.left = "0px", a.appendChild(i.domElement), document.addEventListener("mousemove", f, !1)
	}

	function e() {
		var a, b;
		b = new Boid, l.push(b), b.position.x = 100 * Math.random() + 900, b.position.y = 600 * Math.random() - 300, b.position.z = 200 * Math.random() - 100, b.velocity.x = 2 * Math.random() + 1, b.velocity.y = 2 * Math.random() + 1, b.velocity.z = 2 * Math.random() + 1, b.setAvoidWalls(!0), b.setWorldSize(1e3, 800, 300), a = new THREE.Mesh(new Crow, r), j.push(a), a.phase = Math.floor(62.83 * Math.random()), a.position = b.position, a.doubleSided = !0, h.addObject(a)
	}

	function f(a) {
		k.x = a.clientX - p, k.y = -a.clientY + q
	}
	var g, h, i, j, k, l, m, n = b,
		o = c,
		p = n / 2,
		q = o / 2,
		r = new THREE.MeshColorFillMaterial(0),
		s = 100;
	this.container = a, d(), this.update = function() {
		var a, b, c, d, f = Date.now() - m,
			n = parseInt(f / 100) + 1;
		s >= n && n != l.length && e();
		for (var o = 0, p = j.length; p > o; o++) b = l[o], b.run(l), k.z = b.position.z, b.repulse(k), c = j[o], a = c.material[0].color, a.r = a.g = a.b = (500 - c.position.z) / 1e3, a.updateStyleString(), c.rotation.y = Math.atan2(-b.velocity.z, b.velocity.x), c.rotation.z = Math.asin(b.velocity.y / b.velocity.length()), c.phase += Math.max(0, c.rotation.z - .5) + .1, d = 5 * Math.sin(c.phase % 62.83), c.geometry.vertices[5].position.y = d, c.geometry.vertices[4].position.y = d;
		i.render(h, g)
	}
}

var canvasBirds = new CanvasBirds(bg, window.innerWidth, window.innerHeight);
var canvasBirdsInterval = setInterval(canvasBirds.update,20);