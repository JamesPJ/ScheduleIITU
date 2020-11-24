/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = __webpack_require__(/*! axios */ "./node_modules/axios/index.js"),
    Axios = _require["default"];

Vue.component('app-footer', {
  props: ['text'],
  data: function data() {
    return {
      link: "https://github.com/hypev",
      name: "kurr"
    };
  },
  computed: {
    year: function year() {
      return new Date().getFullYear();
    }
  },
  template: "\n      <footer class=\"footer\">\n         <div class=\"footer-content container\">\n            <p class=\"footer-content-text\">\n               {{ text }} &copy;\n               <a :href=\"link\" target=\"_blank\">{{ name }}</a>\n               {{ year }}\n            </p>\n         </div>\n      </footer>\n   "
});
Vue.component('app-nav', {
  props: ['lang', 'top', 'search-page'],
  data: function data() {
    return {
      dropDown: false,
      langs: ['En', 'Ru', 'Kz']
    };
  },
  methods: {
    langDropDown: function langDropDown() {
      this.dropDown = !this.dropDown;
    }
  },
  template: "\n      <header class=\"header\" :class=\"{z:top=='yes'}\">\n         <div class=\"header__content\">\n            <nav class=\"menu\">\n               <div class=\"lang\">\n\n                  <button class=\"btn tr\" data-modal=\"search\"><i class=\"fas fa-search\"></i></button>\n                  <modal id=\"search\">\n                     <form :action=\"searchPage\" method='GET' class=\"search__form\" id=\"search-overlay-form\">\n                        <input name=\"keyword\" type=\"text\" placeholder=\"Group, Teacher, Room...\" required\n                           autocomplete=\"off\">\n                        <button type=\"submit\"><i class=\"fas fa-search\"></i></button>\n                     </form>\n                  </modal>\n\n                  <slot></slot>\n\n                  <div class=\"lang\">\n                     <button class=\"btn lang__btn\" @click=\"langDropDown\">\n                        {{ lang }} <i class=\"fas fa-angle-down\"></i>\n                     </button>\n                     <div class=\"lang__dropdown\" :class=\"{active:dropDown}\">\n                        <a href=\"#\" class=\"btn lang__btn\" v-for=\"l of langs\" v-if=\"l != lang\">{{l}}</a>\n                     </div>\n                  </div>\n               </div>\n            </nav>\n         </div>\n      </header>\n   "
});
Vue.component('list-empty', {
  props: ['text'],
  template: "\n      <div class='empty'>\n         {{ text }}\n      </div>\n   "
});
Vue.component('alert', {
  props: ['obj', 'title', 'message', 'type'],
  data: function data() {
    return {
      active: true
    };
  },
  computed: {
    classComputed: function classComputed() {
      return this.obj ? this.obj["class"] : this.classType;
    },
    classType: function classType() {
      if (this.type || this.type === 'error' || this.type === 'success') {
        if (this.type === 'error') return {
          active: this.active,
          error: true,
          success: false
        };else return {
          active: this.active,
          error: false,
          success: true
        };
      }

      return {
        active: this.active
      };
    },
    titleComputed: function titleComputed() {
      return this.obj ? this.obj.title : this.title ? this.title : "Where is title?";
    },
    messageComputed: function messageComputed() {
      return this.obj ? this.obj.message : this.message ? this.message : "";
    }
  },
  methods: {
    close: function close() {
      if (this.obj) this.obj["class"].active = false;else this.active = false;
    }
  },
  created: function created() {
    this.active = this.obj ? this.obj["class"].active : true;
  },
  template: "\n      <div id=\"alert\" :class=\"classComputed\">\n         <strong>{{ titleComputed }}</strong>\n         <span v-if=\"messageComputed != ''\">{{messageComputed}}</span>\n         <button type=\"button\" @click=\"close\"><i class=\"fas fa-times\"></i></button>\n      </div>\n   "
});
Vue.component('modal', {
  props: ['id'],
  methods: {
    close: function close() {
      var _this = this;

      if (!data.modalMoving) {
        data.modalMoving = true;
        document.body.classList.remove("lock");
        document.getElementById(this.id).classList.remove("active");
        setTimeout(function () {
          document.getElementById(_this.id).classList.remove("df");
          data.modalMoving = false;
        }, 301);
      }
    },
    checkContent: function checkContent(event) {
      if (!event.target.closest(".modal__content")) {
        this.close();
      }
    }
  },
  template: "\n      <div class=\"modal\" :id=\"id\" @click=\"checkContent\">\n         <button class=\"modal__btn\"><i class=\"fas fa-times\"></i></button>\n         <div class=\"modal__content\">\n            <slot></slot>\n         </div>\n      </div>\n   "
});
Vue.component('group-select', {
  props: ['text', 'link', 'api-grads', 'api-courses', 'api-specialities', 'api-groups'],
  data: function data() {
    return {
      grads: [],
      courses: [],
      specialities: [],
      groups: [],
      graduation: "",
      course: "",
      speciality: "",
      group: "",
      gradError: false,
      courseError: false,
      specError: false,
      groupError: false,
      changed: false,
      message: "",
      alert: {
        title: "",
        message: "",
        "class": {
          error: true,
          success: false,
          active: false
        }
      }
    };
  },
  computed: {
    isGrads: function isGrads() {
      return this.grads.length > 0;
    },
    isCourses: function isCourses() {
      return this.graduation != "" && this.courses.length > 0;
    },
    isSpecialities: function isSpecialities() {
      return this.course != "" && this.specialities.length > 0;
    },
    isGroups: function isGroups() {
      return this.speciality != "" && this.groups.length > 0;
    },
    csrf: function csrf() {
      return document.querySelector('meta[name="csrf-token"]').content;
    }
  },
  methods: {
    getGrads: function getGrads() {
      var _this2 = this;

      Axios.get(this.apiGrads).then(function (response) {
        var _iterator = _createForOfIteratorHelper(response.data),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var g = _step.value;

            _this2.grads.push({
              id: g.id,
              name: g.name
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
    },
    getCourses: function getCourses() {
      var _this3 = this;

      if (this.graduation != "") {
        Axios.get(this.apiCourses, {
          params: {
            id: this.graduation
          }
        }).then(function (response) {
          var _iterator2 = _createForOfIteratorHelper(response.data),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var c = _step2.value;

              _this3.courses.push(c);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        });
      }
    },
    getSpecialities: function getSpecialities() {
      var _this4 = this;

      if (this.course) {
        Axios.get(this.apiSpecialities, {
          params: {
            course: this.course
          }
        }).then(function (response) {
          var _iterator3 = _createForOfIteratorHelper(response.data),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var s = _step3.value;

              _this4.specialities.push({
                id: s.id,
                name: s.abbr
              });
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        });
      }

      return null;
    },
    getGroups: function getGroups() {
      var _this5 = this;

      if (this.speciality) {
        Axios.get(this.apiGroups, {
          params: {
            id: this.speciality,
            course: this.course
          }
        }).then(function (response) {
          var _iterator4 = _createForOfIteratorHelper(response.data),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var s = _step4.value;

              _this5.groups.push({
                id: s.id,
                name: s.name
              });
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        });
      }

      return null;
    },
    sendForm: function sendForm(event) {
      if (!this.validate()) {
        this.alert.title = "Error";
        this.alert.message = this.message;
        this.alert["class"].success = false;
        this.alert["class"].error = true;
        this.alert["class"].active = true;
        event.preventDefault();
      }
    },
    validate: function validate() {
      this.changed = false;

      if (this.grads && this.graduation == "") {
        this.message = "Please choose Graduation!";
        this.gradError = true;
        return false;
      } else this.gradError = false;

      if (this.courses && this.course == "") {
        this.message = "Please choose Course!";
        this.courseError = true;
        return false;
      } else this.courseError = false;

      if (this.specialities && this.speciality == "") {
        this.message = "Please choose Speciality!";
        this.specError = true;
        return false;
      } else this.specError = false;

      if (this.groups && this.group == "") {
        this.message = "Please choose Group!";
        this.groupError = true;
        return false;
      } else this.groupError = false;

      this.message = "";
      return true;
    }
  },
  created: function created() {
    this.getGrads();
  },
  watch: {
    graduation: function graduation() {
      if (this.graduation == "") {
        this.message = "Please choose Graduation!";
        this.gradError = true;
      } else {
        this.gradError = false;
        this.alert["class"].active = false;
      }

      this.changed = true;
      this.courses = [];
      this.specialities = [];
      this.groups = [];
      this.course = "";
      this.speciality = "";
      this.group = "";
      this.getCourses();
    },
    course: function course() {
      if (!this.changed && this.course == "") {
        this.message = "Please choose Course!";
        this.courseError = true;
      } else {
        this.courseError = false;
        this.alert["class"].active = false;
      }

      this.specialities = [];
      this.groups = [];
      this.speciality = "";
      this.group = "";
      this.changed = true;
      this.getSpecialities();
    },
    speciality: function speciality() {
      if (!this.changed && this.speciality == "") {
        this.message = "Please choose Speciality!";
        this.specError = true;
      } else {
        this.specError = false;
        this.alert["class"].active = false;
      }

      this.groups = [];
      this.group = "";
      this.changed = true;
      this.getGroups();
    },
    group: function group() {
      if (!this.changed && this.group == "") {
        this.message = "Please choose Group!";
        this.groupError = true;
      } else {
        this.groupError = false;
        this.alert["class"].active = false;
      }

      this.changed = true;
    }
  },
  template: "\n      <form class=\"select__form\" method=\"POST\" :action=\"link\">\n         <alert :obj=\"alert\"></alert>\n         <select v-model=\"graduation\" :disabled=\"!isGrads\" :class=\"{error:gradError}\">\n            <option disabled value=\"\">Graduation</option>\n            <option v-for=\"g in grads\" :value=\"g.id\">{{g.name}}</option>\n         </select>\n         <select v-model=\"course\" :disabled=\"!isCourses\" :class=\"{error:courseError}\">\n            <option disabled value=\"\">Course</option>\n            <option v-for=\"c in courses\" :value=\"c\">{{c}}</option>\n         </select>\n         <select v-model=\"speciality\" :disabled=\"!isSpecialities\" :class=\"{error:specError}\">\n            <option disabled value=\"\">Speciality</option>\n            <option v-for=\"s in specialities\" :value=\"s.id\">{{s.name}}</option>\n         </select>\n         <select name=\"group_id\" v-model=\"group\" :disabled=\"!isGroups\" :class=\"{error:groupError}\">\n            <option disabled value=\"\">Group</option>\n            <option v-for=\"g in groups\" :value=\"g.id\">{{g.name}}</option>\n         </select>\n         <input type='hidden' name=\"_token\" v-model=\"csrf\">\n         <button type=\"submit\" class=\"select__form_btn\" @click=\"sendForm($event)\">{{ text }}</button>\n      </form>\n   "
}); // ! PROFILE PAGE

Vue.component('profile-block', {
  props: ['expand'],
  computed: {
    large: function large() {
      return this.expand && this.expand === 'yes';
    }
  },
  template: "\n      <div class=\"block\" :class=\"{expand:large}\">\n         <div class=\"block__content\">\n            <slot></slot>\n         </div>\n      </div>\n   "
});
Vue.component('profile-group', {
  props: ['group-id', 'name', 'link'],
  computed: {
    csrf: function csrf() {
      return document.querySelector('meta[name="csrf-token"]').content;
    }
  },
  template: "\n      <div class=\"group\">\n         <h1 class=\"group__name\">{{ name }}</h1>\n         <button class=\"btn outline error\" :data-modal=\"name\">Delete</button>\n         <modal :id='name'>\n            <div class=\"group__modal\">\n               <h1>Do you want delete {{name}} from group list?</h1>\n               <form :action='link' method='post'>\n                  <input type=\"hidden\" name=\"_token\" v-model=\"csrf\">\n                  <input type=\"hidden\" name=\"id\" v-model=\"groupId\">\n                  <button class=\"btn\">Delete</button>\n               </form>\n            </div>\n         </modal>\n      </div>\n   "
});
Vue.component('profile-exam', {
  props: ['subject-name', 'date', 'duration', 'room', 'students-number', 'exam-form', 'teacher', 'group'],
  computed: {
    when: function when() {
      var text = this.days > 0 ? this.days + " days left" : this.days < 0 ? Math.abs(this.days) + " days passed" : "Today";

      if (this.days == 0) {
        var hour = Math.floor(Math.abs(this.minutes) / 60);
        var minute = Math.abs(this.minutes) - hour * 60;
        var time = "";
        if (hour > 0) time += hour + " hour ";
        if (minute > 0) time += minute + " minutes";
        text = this.minutes > 0 ? time + " left" : this.minutes < 0 ? time + " passed" : "Now";
      }

      return text;
    },
    days: function days() {
      var day = 24 * 3600 * 1000;
      var examsDate = new Date(this.date);
      var nowDate = new Date();
      var days = (examsDate - nowDate) / day;
      return days > 0 ? Math.floor(days) : Math.ceil(days);
    },
    minutes: function minutes() {
      var minute = 60 * 1000;
      var examsTime = new Date(this.date);
      var nowTime = new Date();
      var minutes = (examsTime - nowTime) / minute;
      return minutes > 0 ? Math.floor(minutes) : Math.ceil(minutes);
    },
    classObj: function classObj() {
      return {
        red: this.days < 0,
        green: this.days == 0
      };
    },
    dateComputed: function dateComputed() {
      var date = new Date(this.date);
      var dateStr = "";
      dateStr += ("0" + date.getDate()).slice(-2) + "/";
      dateStr += ("0" + (date.getMonth() + 1)).slice(-2) + "/";
      dateStr += date.getFullYear() + " ";
      dateStr += ("0" + date.getHours()).slice(-2) + ":";
      dateStr += ("0" + date.getMinutes()).slice(-2);
      return dateStr;
    }
  },
  template: "\n      <div class=\"exam\">\n         <h1 :class=\"classObj\">{{when}}</h1>\n         <ul>\n            <li>\n               <i class=\"fas fa-circle\"></i>\n               <span>Subject:</span> {{subjectName}}\n            </li>\n            <li>\n               <i class=\"far fa-calendar-alt\"></i>\n               <span>Date and Time:</span> {{dateComputed}}\n            </li>\n            <li>\n               <i class=\"fas fa-hourglass\"></i>\n               <span>Duration:</span> {{duration}} min\n            </li>\n            <li>\n               <i class=\"fas fa-map-marker-alt\"></i>\n               <span>Room:</span> {{room}}\n            </li>\n            <li>\n               <i class=\"fas fa-users\"></i>\n               <span>Students Number:</span> {{studentsNumber}}\n            </li>\n            <li>\n               <i class=\"fas fa-edit\"></i>\n               <span>Exam Form:</span> {{examForm}}\n            </li>\n            <li v-if=\"teacher\">\n               <i class=\"fas fa-user-tie\"></i>\n               <span>Teacher:</span> {{teacher}}\n            </li>\n            <li>\n               <i class=\"fas fa-users\"></i>\n               <span>Group:</span> {{group}}\n            </li>\n         </ul>\n      </div>\n   "
});
Vue.component('profile-teacher', {
  props: ['name', 'email', 'role', 'degree', 'department'],
  computed: {
    link: function link() {
      return "mailto:" + this.email;
    }
  },
  template: "\n      <div class=\"profile-teacher\">\n         <h1>{{name}}</h1>\n         <p v-if=\"role\">{{role}}</p>\n         <p>{{degree}}</p>\n         <p v-if=\"department\">Department: {{department}}</p>\n         <a :href=\"link\">{{email}}</a>\n      </div>\n   "
});
Vue.component('profile-tab', {
  props: ['title', 'center-block-title'],
  template: "\n      <div class=\"tab\" :class=\"{'center-block-title':centerBlockTitle}\">\n         <h1 class=\"tab__title\">{{ title }}</h1>\n         <slot></slot>\n      </div>\n   "
});
Vue.component('sidebar', {
  props: ['name', 'role', 'email', 'logo-link'],
  computed: {
    roleCap: function roleCap() {
      return this.role.charAt(0).toUpperCase() + this.role.slice(1);
    }
  },
  template: "\n      <div class=\"sidebar\" id=\"sidebar\">\n         <div class=\"sidebar__blank\">\n            <img :src=\"logoLink\" alt=\"Logo\">\n         </div>\n         <div class=\"sidebar__content\">\n            <h1 class=\"sidebar__name\">{{ name }}</h1>\n            <h2 class=\"sidebar__email\">{{ email }}</h2>\n            <p class=\"sidebar__role\">{{ roleCap }}</p>\n            <div class=\"sidebar__links\">\n               <slot></slot>\n            </div>\n         </div>\n      </div>\n   "
}); // ! SEARCH PAGE

Vue.component('search-item', {
  props: ['type', 'name', 'link'],
  computed: {
    typeCap: function typeCap() {
      return this.type.charAt(0).toUpperCase() + this.type.slice(1);
    }
  },
  template: "\n      <a :href=\"link\" class=\"search__item\">\n         <span class=\"search__item_type\">{{ typeCap }}</span>\n         <span class=\"search__item_name\">{{ name }}</span>\n      </a>\n   "
}); // ! SCHEDULE PAGE

Vue.component('schedule', {
  props: ['type', 'name'],
  computed: {
    icon: function icon() {
      return this.type == 'group' ? 'fa-users' : this.type == 'teacher' ? 'fa-user-tie' : this.type == 'room' ? 'fa-map-marker-alt' : "";
    }
  },
  template: "\n      <div class=\"schedule\">\n         <div class=\"schedule__container\">\n            <h1 class=\"schedule__title\"><i class=\"fas\" :class=\"icon\"></i> {{ name }}</h1>\n            <slot></slot>\n         </div>\n      </div>\n   "
});
Vue.component('day-slider', {
  computed: {
    transformIndicator: function transformIndicator() {
      var dayIndex = Math.min(Math.max(new Date().getDay() - 1, 0), 5);
      return {
        transform: "translateX(".concat(dayIndex * 100, "%)")
      };
    }
  },
  template: "\n      <div class=\"schedule__slider\">\n         <div class=\"schedule__slider_indicator\" id=\"schedule-indicator\" :style=\"transformIndicator\"></div>\n         <slot></slot>   \n      </div>\n   "
});
Vue.component('day-slider-btn', {
  props: ['title-lg', 'title-md', 'title-sm', 'day'],
  methods: {
    changeDay: function changeDay() {
      var dayIndex = this.day;
      var indicator = document.getElementById("schedule-indicator");
      indicator.style.transform = "translateX(".concat(dayIndex * 100, "%)");
      document.getElementsByClassName("schedule-day active")[0].classList.remove("active");
      document.querySelector(".schedule-day[data-day=\"".concat(dayIndex, "\"]")).classList.add("active");
    }
  },
  template: "\n      <button class=\"schedule__slider_btn\" :data-day=\"day\" @click=\"changeDay\" disabled>\n         <span class=\"schedule__slider_btn--title--expand\">{{ titleLg }}</span>\n         <span class=\"schedule__slider_btn--title--tablet\">{{ titleMd }}</span>\n         <span class=\"schedule__slider_btn--title--mobile\">{{ titleSm }}</span>\n      </button>\n   "
});
Vue.component('timetable-folder', {
  props: ['count', 'modal-id'],
  data: function data() {
    return {
      soon: false,
      ongoing: false
    };
  },
  computed: {
    id: function id() {
      return "subject-folder-" + this.modalId;
    },
    classObj: function classObj() {
      return {
        soon: this.soon,
        ongoing: this.ongoing
      };
    }
  },
  mounted: function mounted() {
    this.$nextTick(function () {
      if (document.getElementById(this.id).querySelector(".schedule-day__subj_content.schedule-subj.soon")) this.soon = true;
      if (document.getElementById(this.id).querySelector(".schedule-day__subj_content.schedule-subj.ongoing")) this.ongoing = true;
    });
  },
  template: "\n      <div class=\"schedule-day__folder\" :class=\"classObj\">\n         <button class=\"schedule-day__folder_list\" :data-modal=\"id\">\n            <div class=\"schedule-day__folder_elem\" v-for=\"e in Math.min(count, 4)\"></div>\n         </button>\n         <modal :id='id'>\n            <div class=\"schedule-day__folder_modal\">\n               <slot></slot>\n            </div>\n         </modal>\n      </div>\n   "
});
Vue.component('timetable-time', {
  props: ['start', 'end'],
  template: "\n      <div class=\"schedule__time_elem time__elem\">\n         <span class=\"time__elem_start\">{{start}}</span>\n         <span class=\"time__elem_end\">{{end}}</span>\n      </div>\n   "
});
Vue.component('timetable-day', {
  props: ['day'],
  computed: {
    activeDay: function activeDay() {
      return {
        active: +this.day == Math.min(Math.max(new Date().getDay() - 1, 0), 5)
      };
    }
  },
  template: "\n      <div class=\"schedule__column schedule-day\" :class=\"activeDay\" :data-day=\"day\">\n         <slot></slot>\n      </div>\n   "
});
Vue.component('timetable-group', {
  props: ['name'],
  template: "\n      <li class=\"schedule-subj__groups_elem\">{{ name }}</li>\n   "
});
Vue.component('timetable-cell', {
  props: ['start', 'end', 'teacher', 'room', 'subject', 'type', 'degree'],
  computed: {
    isNotEmpty: function isNotEmpty() {
      return this.start && this.end && this.teacher && this.room && this.subject && this.type;
    },
    near: function near() {
      var s = this.startSeconds;
      var e = this.endSeconds;
      var c = this.currentSeconds;
      var isCurrentDay = this.currentDay;
      return {
        'soon': s - c <= 1200 && s - c >= 0 && isCurrentDay,
        'ongoing': c >= s && c < e && isCurrentDay
      };
    },
    startSeconds: function startSeconds() {
      var date = new Date();
      var hours = +this.start[0] * 10 + +this.start[1];
      var min = +this.start[3] * 10 + +this.start[4];
      date.setHours(hours, min, 0);
      return date.getTime() / 1000;
    },
    endSeconds: function endSeconds() {
      var date = new Date();
      var hours = +this.end[0] * 10 + +this.end[1];
      var min = +this.end[3] * 10 + +this.end[4];
      date.setHours(hours, min, 0);
      return date.getTime() / 1000;
    },
    currentSeconds: function currentSeconds() {
      return new Date().getTime() / 1000;
    },
    currentDay: function currentDay() {
      var todayDay = new Date().getDay() - 1;
      var subjDay = this.$parent.day || this.$parent.$parent.$parent.day;
      return todayDay == subjDay;
    }
  },
  template: "\n      <div class=\"schedule-day__subj\" :data-start=\"start\" :data-end=\"end\">\n         <button class=\"schedule-day__subj_content schedule-subj\" :class=\"near\" v-if=\"isNotEmpty\">\n            <span class=\"schedule-subj__teacher\">{{ teacher }}</span>\n            <span class=\"schedule-subj__class\">{{ room }}</span>\n            <span class=\"schedule-subj__name\">{{ subject }}</span>\n            <span class=\"schedule-subj__type\">{{ type }}</span>\n            <span class=\"schedule-subj__time\">{{ start }} - {{ end }}</span>\n            <span class=\"schedule-subj__degree\">{{degree}}</span>\n            <ul class=\"schedule-subj__groups\">\n               <slot></slot>\n            </ul>\n         </button>\n      </div>\n   "
});
var data = {
  loaderActive: true,
  modalMoving: false
};
var app = new Vue({
  el: "#app",
  data: data,
  mounted: function mounted() {
    this.$nextTick(function () {
      setTimeout(function () {
        data.loaderActive = false;
        setTimeout(function () {
          document.body.classList.remove("lock");
        }, 10);
      }, 300);
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".lang")) {
      app.$children[0].dropDown = false;
    }
  });
  document.querySelectorAll("*[data-modal]").forEach(function (item) {
    item.addEventListener('click', function () {
      if (!data.modalMoving) {
        data.modalMoving = true;
        document.body.classList.add("lock");
        document.getElementById(item.dataset.modal).classList.add("df");
        setTimeout(function () {
          document.getElementById(item.dataset.modal).classList.add("active");
        }, 10);
        setTimeout(function () {
          data.modalMoving = false;
        }, 311);
      }
    });
  });
  var sModal = document.getElementById("schedule-modal");

  if (sModal != null) {
    sModal.addEventListener("click", function (event) {
      if (!event.target.closest(".modal-content")) {
        subjModalClose();
      }
    });
  }

  var sliderBtn = document.getElementsByClassName("schedule__slider_btn");
  var indicator = document.getElementById("schedule-indicator");

  if (sliderBtn != null && indicator != null) {
    if (window.getComputedStyle(indicator, null).getPropertyValue("display") === "block") {
      btnStateChange(false);
    }

    window.onresize = function () {
      if (window.getComputedStyle(indicator, null).getPropertyValue("display") === "block") {
        btnStateChange(false);
      } else {
        btnStateChange(true);
      }
    };
  }

  var subjList = document.getElementsByClassName("schedule-day__subj_content");

  if (subjList != null) {
    var _loop = function _loop(i) {
      subjList[i].addEventListener("click", function () {
        var subjName = subjList[i].getElementsByClassName("schedule-subj__name")[0].textContent;
        var teacherName = subjList[i].getElementsByClassName("schedule-subj__teacher")[0].textContent;
        var subjType = subjList[i].getElementsByClassName("schedule-subj__type")[0].textContent;
        var classroom = subjList[i].getElementsByClassName("schedule-subj__class")[0].textContent;
        var degree = subjList[i].getElementsByClassName("schedule-subj__degree")[0].textContent;
        var time = subjList[i].getElementsByClassName("schedule-subj__time")[0].textContent.split(" - ");
        var groups = subjList[i].getElementsByClassName("schedule-subj__groups_elem");
        console.log(time);
        var modal = document.getElementById("schedule-modal");
        document.getElementById("modal-subj-name").textContent = subjName;
        document.getElementById("modal-teacher-name").textContent = teacherName;
        document.getElementById("modal-teacher-degree").textContent = degree;
        document.getElementById("modal-subj-type").textContent = subjType;
        document.getElementById("modal-classroom").textContent = classroom;
        document.getElementById("modal-time").getElementsByClassName("modal-content__time_start")[0].textContent = time[0];
        document.getElementById("modal-time").getElementsByClassName("modal-content__time_end")[0].textContent = time[1];
        var groupsModal = document.getElementById("modal-groups");

        if (groups.length > 1) {
          document.getElementById("modal-groups-title").textContent = "Groups";
        } else {
          document.getElementById("modal-groups-title").textContent = "Group";
        }

        for (var j = 0; j < groups.length; j++) {
          var g = document.createElement("li");
          g.classList.add("modal-content__block_elem");
          g.textContent = groups[j].textContent;
          groupsModal.appendChild(g);
        }

        if (subjList[i].classList.contains("ongoing")) {
          modal.getElementsByClassName("modal-content")[0].classList.add("ongoing");
        } else if (subjList[i].classList.contains("soon")) {
          modal.getElementsByClassName("modal-content")[0].classList.add("soon");
        }

        modal.style.display = "block";
        document.body.classList.add("lock");
        setTimeout(function () {
          modal.classList.add("active");
        }, 20);
      }, false);
    };

    for (var i = 0; i < subjList.length; i++) {
      _loop(i);
    }
  }
});

window.bgAnimate = function () {
  var bg = document.getElementById("homeBG");

  if (bg != null) {
    bg.classList.toggle("active");
  }
};

window.btnStateChange = function (state) {
  var btns = document.getElementsByClassName("schedule__slider_btn");

  if (btns != null) {
    for (var i = 0; i < btns.length; i++) {
      btns.item(i).disabled = state;
    }
  }
};

window.menuOpen = function () {
  document.getElementById("menu-open").classList.toggle("active");
  document.getElementById("sidebar").classList.toggle("active");
};

window.subjModalClose = function () {
  var modal = document.getElementById("schedule-modal");
  var modalContent = modal.getElementsByClassName("modal-content")[0];
  modal.classList.remove("active");
  document.body.classList.remove("lock");
  setTimeout(function () {
    modal.style.display = "none";
    document.getElementById("modal-subj-name").textContent = "";
    document.getElementById("modal-teacher-name").textContent = "";
    document.getElementById("modal-teacher-degree").textContent = "";
    document.getElementById("modal-subj-type").textContent = "";
    document.getElementById("modal-classroom").textContent = "";
    document.getElementById("modal-time").getElementsByClassName("modal-content__time_start")[0].textContent = "";
    document.getElementById("modal-time").getElementsByClassName("modal-content__time_end")[0].textContent = "";
    document.getElementById("modal-groups").innerHTML = "";

    if (modalContent.classList.contains("ongoing")) {
      modalContent.classList.remove("ongoing");
    } else if (modalContent.classList.contains("soon")) {
      modalContent.classList.remove("soon");
    }
  }, 320);
};

/***/ }),

/***/ "./resources/scss/style.scss":
/*!***********************************!*\
  !*** ./resources/scss/style.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/scss/style.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\xampp\htdocs\schedule-iitu\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\xampp\htdocs\schedule-iitu\resources\scss\style.scss */"./resources/scss/style.scss");


/***/ })

/******/ });