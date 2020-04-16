/**
 * light wrapper of xmlHttpRequest with Promise.
 * The import reason we need to use this instead of using node-fetch is documented here
 * https://w.amazon.com/index.php/Sentry/Regionalized_Identity/Migration/JavaScript#Using_the_new_fetch.28.29_API.
 *
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
 **/

import _xhr from 'xhr';
import _ from 'lodash';
import Promise from 'bluebird';

const promisifiedXhr = Promise.promisify(_xhr);

Promise.config({
  // Enable warnings
  warnings:        true,
  // Enable long stack traces
  longStackTraces: true,
  // Enable cancellation
  cancellation:    true,
  // Enable monitoring
  monitoring:      true
});

/**
 * @description send a http request
 * @param {String} uri - the uri of the request
 * @param {Object} options - @link https://www.npmjs.com/package/xhr
 * @param {String} method - 'GET', 'POST' ...
 * @return {Promise} the Promise representing the request
 **/
const xmlHttpRequest = (uri, options, method) => {
  const defaultOptions = {
    withCredentials: true,
    method:          method
  };
  const destOptions = _.merge(defaultOptions, options);
  return promisifiedXhr(uri, destOptions).then((response) => {
    if (response.statusCode >= 400) {
      throw Error(response.body);
    }
    const contentType = _.get(response.headers, 'content-type', '');
    if (_.isString(response.body) && contentType.includes('json')) {
      response.body = JSON.parse(response.body);
    }
    return response;
  });
};

/**
 * @description GET @see xmlHttpRequest
 * @param {String} uri - @see xmlHttpRequest
 * @param {Object} options - @see xmlHttpRequest
 * @return {Promise} @see xmlHttpRequest
 **/
const get = (uri, options) => {
  return xmlHttpRequest(uri, options, 'GET');
};


/**
 * @description POST @see xmlHttpRequest
 * @param {String} uri - @see xmlHttpRequest
 * @param {Object} options - @see xmlHttpRequest
 * @return {Promise} @see xmlHttpRequest
 **/
const post = (uri, options) => {
  return xmlHttpRequest(uri, options, 'POST');
};

/**
 * @description PUT @see xmlHttpRequest
 * @param {String} uri - @see xmlHttpRequest
 * @param {Object} options - @see xmlHttpRequest
 * @return {Promise} @see xmlHttpRequest
 **/
const put = (uri, options) => {
  return xmlHttpRequest(uri, options, 'PUT');
};

/**
 * @description DELETE @see xmlHttpRequest
 * @param {String} uri - @see xmlHttpRequest
 * @param {Object} options - @see xmlHttpRequest
 * @return {Promise} @see xmlHttpRequest
 **/
const del = (uri, options) => {
  return xmlHttpRequest(uri, options, 'DELETE');
};

const createXmlHttpRequest = () => {
  return new _xhr.XMLHttpRequest();
};

export {xmlHttpRequest, get, post, put, del, createXmlHttpRequest};