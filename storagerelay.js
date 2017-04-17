(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define([], factory);
  } else {
    // Browser.
    root.OAuth || (root.OAuth = {});
    root.OAuth.StorageRelay || (root.OAuth.StorageRelay = {});
    root.OAuth.StorageRelay.relay = factory();
  }
}(this, function() {
  
  return function relay(ares, rid, clientID, origin, cb) {
    var key = [ 'tmp/oauth/r',
                encodeURIComponent(origin),
                encodeURIComponent(clientID),
                encodeURIComponent(rid)
              ].join('/');
    
    // TODO: try/catch
    localStorage.setItem(key, JSON.stringify(ares));
    window.setTimeout(function() {
      localStorage.removeItem(key);
      cb();
    }, 200);// TODO: In some cases, Google set's this to 750.
  };

}));
