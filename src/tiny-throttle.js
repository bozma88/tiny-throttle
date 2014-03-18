/**
 * Super-tiny callback wrapper + throttler.
 * Ensures that the last occurred event is always called, even if it falls between throttling threshold.
 * Optionally, it can call the function only once, at the end of a throttling timeframe.
 *
 * @author: Marco Bozzola <marco@basili.co>
 *
 * @param  {Function} fn        original callback to be throttled
 * @param  {int}      threshold throttling threshold
 * @param  {scope}    scope     scope to be applied to the callback
 * @param  {bool}     tail      whether to call the callback only once, at the end of a throttling timeframe
 * @return {Function} throttled function
 */
var tinyThrottle = function(fn, threshold, scope, tail) {
  var threshold = threshold || 250;
  var tick, deferTimer;
  return function() {
    var context = scope || this;
    var now = +new Date, args = arguments;
    if (tail || (tick && now<tick+threshold)) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function ) {
        tick = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      tick = now;
      fn.apply(context, args);
    }
  };
};
