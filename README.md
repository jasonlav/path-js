
#Path.js
####Simple Javascript path management library 

Installation
------------

Include path.js in your HTML file. Path.js depends on [tags.js].

``` html
<script src="tags.js"></script>
<script src="path.js"></script>
```

Usage
-----
#####Simple
``` javascript
var pathConfig = {
	base: "/base/"
};

var path = new Path(pathConfig);
path.url("about") // /base/about
```

Options
-----
#####Base
The only required config parameter is base. The base string will be appended to unchanged paths. Useful when using relative paths in conjunction with HTML History API.

``` javascript
var pathConfig = {
	base: "/base/",
	cdn: "http://cdn.com/",
	tags: {
	  "cdn": "{{cdn}}"
	}
};

var path = new Path(pathConfig);
path.url("about"); // /base/about
path.url("{{cdn}}about"); // http://cdn.com/about
```

#####Tags
Replacement tags can be used anywhere within paths. Tags are referenced in paths with mustache-style curly braces: {{tagName}}

``` javascript
var pathConfig = {
	base: "/base/",
	tags: {
	  "lang": "english",
	  "region": "great-britain"
	}
};

var path = new Path(pathConfig);
path.url("about/{{lang}}"); // about/english
path.url("about/{{lang}}/canada"); // about/english/canada
path.url("about/{{lang}}/{{region}}"); // about/english/great-britain
```

Tag values can reference variables in the root of the config object.

``` javascript
var pathConfig = {
	base: "/base/",
	country: "great-britain",
	tags: {
	  "lang": "english",
	  "region": "{{country}}" //references pathConfig.country
	}
};

var path = new Path(pathConfig);
path.url("about/{{lang}}/{{region}}"); // about/english/great-britain
```

#####Prefixes
Prefixes are similar to tags, but are only replaced if found at the beginning of a path. Mustache-style curly braces are not necessary.

``` javascript
var pathConfig = {
  base: "/base/",
  cdn: "http://cdn.com/",
  prefixes: {
    "/lang/": "/english/",
    "/cdn/": "{{cdn}}"
  }
}

var path = new Path(pathConfig);
path.url("/lang/united-states"); // /english/united-states
path.url("/no-change/lang/"); // /no-change/lang
path.url("/cdn/assets/image.jpg"); // http://cdn.com/assets/image.jpg
```

#####ignorePrefixes
Path class will not change paths that begin with certain strings. Common examples would be "http://" or "mailto:".

``` javascript
var pathConfig = {
  base: "/base/",
  "ignorePrefixes": ["http://", "https://", "mailto:", "#"]
}

var path = new Path(pathConfig);
path.url("/lang/united-states"); // /english/united-states
path.url("/lang/united-states"); // /english/united-states

```

Compatibility
-------------
Path.js has been tested in all modern browsers and Internet Explorer 7+.

License
-------------
Released under [MIT License].
[MIT License]: http://mit-license.org/
[Mustache]: http://mustache.github.io/
[Handlebars]: http://handlebarsjs.com/
[tags.js]: https://github.com/jasonlav/tags-js
