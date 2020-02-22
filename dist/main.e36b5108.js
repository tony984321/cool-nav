// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"FVPG":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var $siteList = $('.siteList');
var $lastLi = $siteList.find('.last');
var site = localStorage.getItem('site');
var initialSite = [{
  logo: 'A',
  url: 'https://www.acfun.cn',
  logoType: 'text',
  title: 'acfun.cn'
}, {
  logo: 'http://img5.imgtn.bdimg.com/it/u=2950647569,1131126252&fm=26&gp=0.jpg',
  url: 'https://bilibili.com',
  logoType: 'image',
  title: 'bilibili.com'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var hashMap = JSON.parse(site) || initialSite;

var renderSiteList = function renderSiteList() {
  $siteList.find('li:not(.last)').remove();
  hashMap.map(function (_ref, index) {
    var logo = _ref.logo,
        url = _ref.url,
        logoType = _ref.logoType,
        title = _ref.title;
    var $li = $("<li>\n      <a href='".concat(url, "'>\n        <div class=\"site\">\n          <div class=\"logo\">\n            ").concat(logoType === 'image' ? "<img src = ".concat(logo, " />") : logo, "\n          </div>\n          <div class=\"link\">").concat(title, "</div>\n          <div class=\"close\">\n            <svg class=\"icon\">\n              <use xlink:href=\"#icon-close\"></use>\n            </svg>\n          </div>\n        </div>\n      </a>\n    </li>")).insertBefore($lastLi);
    $li.on('click', '.close', function (e) {
      hashMap.splice(index, 1);
      renderSiteList();
      e.stopPropagation();
      e.preventDefault();
    });
  });
};

var renderModal = function renderModal() {
  var $modal = $("<modal class=\"modalContainer\">\n    <div class=\"modalWrapper\">\n      <form class=\"modalForm\">\n        <label>Website Address</label>\n        <input type=\"text\" name=\"address\" placeholder=\"Please enter website address\" />\n        <label>Website Logo</label>\n        <input type=\"text\" name=\"logo\" placeholder=\"Please enter website logo address\" />\n        <label>Website Title</label>\n        <input type=\"text\" name=\"title\" placeholder=\"Please enter website title\" />\n        <button type=\"submit\">\n          Submit\n        </button>\n      </form>\n      <div class=\"close\">\n        <svg class=\"icon\">\n          <use xlink:href=\"#icon-close\"></use>\n        </svg>\n      </div>\n    </div>\n  </modal>").appendTo('body');
  $modal.on('click', '.close', function (e) {
    $modal.remove();
  });
  $modal.on('click', 'button', function () {
    var webSite = {};
    var url = $(" input[ name='address' ] ").val();

    if (url.indexOf('http') !== 0) {
      url = "https://".concat(url);
    }

    webSite['title'] = $(" input[ name='title' ] ").val();
    webSite['url'] = url;
    webSite['logo'] = $(" input[ name='logo' ] ").val() || simplifyUrl(url)[0];
    webSite['logoType'] = $(" input[ name='logo' ] ").val() ? 'image' : 'text';
    hashMap = [].concat(_toConsumableArray(hashMap), [webSite]);
    $modal.remove();
    renderSiteList();
  });
};

renderSiteList();
$('.addButton').on('click', function () {
  renderModal();
});

window.onbeforeunload = function () {
  localStorage.setItem('site', JSON.stringify(hashMap));
};
},{}]},{},["FVPG"], null)
//# sourceMappingURL=main.e36b5108.js.map