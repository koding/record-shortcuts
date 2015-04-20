var cancel, emitter, events, isMozilla, keycode, keydown, keyup, os, pfx, rec, reset;

events = require('events');

keycode = require('keycode');

os = require('component-os');

isMozilla = window.navigator.userAgent.slice(0, 3) === 'Moz';

rec = false;

pfx = {
  ctrl: false,
  alt: false,
  shift: false
};

if (os === 'mac') {
  pfx.command = false;
}

emitter = new events.EventEmitter;

reset = function() {
  var k;
  emitter.removeAllListeners();
  document.removeEventListener('keydown', keydown);
  document.removeEventListener('keyup', keyup);
  for (k in pfx) {
    pfx[k] = false;
  }
  rec = false;
};

exports.cancel = cancel = function() {
  emitter.emit('cancel');
  reset();
};

exports.start = function() {
  if (rec) {
    cancel();
  }
  rec = true;
  document.addEventListener('keydown', keydown);
  document.addEventListener('keyup', keyup);
  return emitter;
};

keydown = function(e) {
  var code, key, meta, ready, result, val;
  e.preventDefault();
  e.stopPropagation();
  code = e.which || e.keyCode;
  if (code === 224 && isMozilla) {
    code = 91;
  }
  key = keycode(code);
  if (!key) {
    return;
  }
  if (key in pfx) {
    for (meta in pfx) {
      if (key === meta) {
        pfx[meta] = true;
      }
    }
  } else {
    ready = Object.keys(pfx).some(function(key) {
      return key !== 'shift' && pfx[key] === true;
    });
    if (ready) {
      result = ((function() {
        var results;
        results = [];
        for (meta in pfx) {
          val = pfx[meta];
          if (val) {
            results.push(meta);
          }
        }
        return results;
      })()).concat([key]);
      emitter.emit('end', result);
      reset();
    } else {
      if (key === 'esc') {
        return cancel();
      }
    }
  }
};

keyup = function(e) {
  var key, meta;
  e.preventDefault();
  e.stopPropagation();
  key = keycode(e.which || e.keyCode);
  for (meta in pfx) {
    if (key === meta) {
      pfx[meta] = false;
    }
  }
};
