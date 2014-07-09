/*!
 * Path.js - Simple Javascript path management library
 * (c) 2014 Jason Lavorante
 * MIT Licensed.
 *
 * https://github.com/jasonlav/path-js
 */
function Path(config) {
	this.config = config;
	this.config.tags = Tags.get(this.config.tags, config);
	this.config.prefixes = Tags.get(this.config.prefixes, config);
}

/**
 * URL
 */
Path.prototype.url = function(url) {
	//Array
	if(typeof url === "object") {
		for(var key in url) {
			url[key] = this.url(url[key]);
		}

		return url;
	}

	//Base
	if(url === "/") {
		url = "";
	}

	//Raw
	var raw = url;

	//Ignore
	if(this.ignore(url)) {
		return url;
	}

	//Keywords
	url = Tags.get(url, this.config.tags);

	//Prefix
	url = this.prefix(url);

	if(url === raw) {
		return this.clean(this.config.base+url);
	} else {
		return this.clean(url);
	}
};

/**
 * HTML
 */
Path.prototype.html = function(html, strip) {
	if(typeof strip !== "boolean") {
		strip = false;
	}

	return Tags.get(html, this.config.tags, strip);
};

/**
 * Ignore
 */
Path.prototype.ignore = function(path) {
	for(var key in this.config.ignorePrefixes) {
		var ignore = this.config.ignorePrefixes[key];

		if(path.substr(0, ignore.length) === ignore) {
			return true;
		}
	}

	return false;
};

/**
 * Prefix
 */
Path.prototype.prefix = function(path) {
	for(var key in this.config.prefixes) {
		var prefix = this.config.prefixes[key];

		if(path.substr(0, key.length) === key) {
			return prefix+path.substr(key.length, 9999);
		}
	}

	return path;
};

/**
 * Clean
 */
Path.prototype.clean = function(path) {
	return path;
};
