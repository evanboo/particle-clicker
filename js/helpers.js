/** @module Helpers
 * Define some useful helpers that are used throughout the game.
 */
var Helpers = (function () {
  'use strict';
  /** Load a file (usually JSON).
   */
  var loadFile = function (filename) {
    var res;
    $.ajax({
      async: false,
      url : filename,
      success : function(data) {
        res = data;
      }
    });
    return res;
  };

  /** Format a number with proper postfix.
   */
  var formatNumberPostfix = function (number) {
    if (typeof number !== "number") {
      return 0;
    }

    var prefixes = [
      { magnitude: 1e24, label: 'Y' },
      { magnitude: 1e21, label: 'Z' },
      { magnitude: 1e18, label: 'E' },
      { magnitude: 1e15, label: 'P' },
      { magnitude: 1e12, label: 'T' },
      { magnitude:  1e9, label: 'B' },
      { magnitude:  1e6, label: 'M' },
      { magnitude:  1e3, label: 'k' }
    ];

    var abs = Math.abs(number);
    for (var prefix in prefixes) {
      if (abs >= prefix.magnitude) {
        return (number / prefix.magnitude).toFixed(1) + prefix.label;
      }
    }
    return number; 
  }

  var formatTime = function (msec) {
    var totals = Math.ceil(msec / 1000);
    var days = Math.floor(totals / (24 * 60 * 60));
    var hours = Math.floor((totals % (24 * 60 * 60)) / (60 * 60));
    var totalmin = (totals % (24 * 60 * 60)) % (60 * 60);
    var mins = Math.floor(totalmin / 60);
    var secs = totalmin % 60;

    var str = [];
    if (days > 0) {
      str.push(days + ' day' + (days % 100 == 1 ? '' : 's'));
    }
    if (hours > 0) {
      str.push(hours + ' h');
    }
    if (mins > 0) {
      str.push(mins + ' min');
    }
    if (secs > 0) {
      str.push(secs + ' s');
    }

    return str.join(', ');
  };
 
  return {
    loadFile: loadFile,
    formatNumberPostfix: formatNumberPostfix,
    formatTime: formatTime,
    version: '0.9',
    analytics: ''
  };
})();
