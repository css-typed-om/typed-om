(function(internal, scope) {

  CSSResourceState = {
    UNLOADED: 'unloaded',
    LOADING: 'loading',
    LOADED: 'loaded',
    ERROR: 'error'
  };

  function isValidResourceState(str) {
    return internal.objects.any(CSSResourceState, function(type) {
      return str == type;
    });
  };

  function CSSResourceValue(state) {
    if (!isValidResourceState(state)) {
      throw new TypeError('State of a CSSResourceValue must be one of CSSResourceState');
    }
    this._state = state;
  }
  internal.inherit(CSSResourceValue, CSSStyleValue);

  scope.CSSResourceValue = CSSResourceValue;

})(typedOM.internal, window);
