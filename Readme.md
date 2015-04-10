# record-shortcuts

records shortcuts on browser.

# usage

```js
record.start()
  .on('end', function (arr) { })
  .on('cancel', function () { });
```

# api

# .start()

Starts a new recording session, cancelling previous one.

This returns an `EventEmitter` singleton that emits either an `end` or a `cancel`.

# .cancel()

Cancels current recording session and emits `cancel`.

# validation

Works pretty much like how osx does.

### valid combinations

* `command+s`
* `command+alt+ctrl+s`
* `command+alt+ctrl+shift+s`
* `alt+s`
* `ctrl+s`

### invalid combinations

* `s`
* `shift+s`
* `s+a`
* `command+shift`

# license

mit