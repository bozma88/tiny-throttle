/**
 * Super-tiny but powerful callback wrapper and throttler.
 * Ensures that the last occurred event is always called, even if it falls between the throttling threshold.
 * It can apply the original scope to the fn.
 * It’s able to distinguish timeslot position in which the fn has been called {'head'|'body'|'tail'}
 *
 * @author: Marco Bozzola <marco@basili.co>
 *
 * @param  {Function} fn        original callback to be throttled
 * @param  {int}      threshold throttling threshold
 * @param  {scope}    scope     scope to be applied to the callback
 * @param  {bool}     forceTail whether to force a second fn call (with position='tail') even if the callback fired only once (in one timeslot)
 * @return {Function} throttled function, with an added parameter to distinguish timeslot position in which the fn has been called {'head'|'body'|'tail'}
 */
var tinyThrottle = function(fn, threshold, scope, forceTail) {
  var threshold = threshold || 250, tick = 0, deferTimer, tailed = true;
  return function() {
    var context = scope || this, args = Array.prototype.slice.call(arguments), now = +new Date, truncate;
    if (now > tick+threshold) {
      fn.apply(context, args.concat(tailed ? 'head':'body'));
      truncate = !forceTail && tailed;
      tick = now; tailed = false;
    }
    clearTimeout(deferTimer);
    deferTimer = setTimeout(function() {
      !truncate && fn.apply(context, args.concat('tail'));
      tick = now; tailed = true;
    }, threshold);
  };
};