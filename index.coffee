events = require 'events'
keycode = require 'keycode'
os = require 'component-os'

rec = no
pfx =
  ctrl  : no
  alt   : no
  shift : no

if os is 'mac' then pfx.command = no

emitter = new events.EventEmitter


reset = ->

  emitter.removeAllListeners()
  document.removeEventListener 'keydown', keydown
  document.removeEventListener 'keyup', keyup

  pfx[k] = no for k of pfx

  rec = no

  return


exports.cancel = cancel = ->

  emitter.emit 'cancel'
  reset()

  return


exports.start = ->

  if rec then cancel()
  rec = yes

  document.addEventListener 'keydown', keydown
  document.addEventListener 'keyup', keyup

  return emitter


keydown = (e) ->

  e.preventDefault()
  e.stopPropagation()

  key = keycode e.which or e.keyCode

  if key of pfx
  then pfx[meta] = yes for meta of pfx when key is meta
  else
    ready = Object.keys(pfx).some (key) ->
      key isnt 'shift' and pfx[key] is true

    if ready
      result = (meta for meta, val of pfx when val).concat [key]
      emitter.emit 'end', result
      reset()
    else
      if key is 'esc' then return cancel()

  return


keyup = (e) ->

  e.preventDefault()
  e.stopPropagation()

  key = keycode e.which or e.keyCode
  pfx[meta] = no for meta of pfx when key is meta

  return
