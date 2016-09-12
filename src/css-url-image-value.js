(function(internal, scope) {

  function CSSURLImageValue(url) {
    if (typeof(url) != 'string') {
      throw new TypeError("URL must be a string");
    }
    internal.CSSImageValue.call(this, new Image());
    this._image.src = url;
    this.url = url;
    this.cssText = 'url(' + this.url + ')';
  }

  internal.inherit(CSSURLImageValue, internal.CSSImageValue);

  scope.CSSURLImageValue = CSSURLImageValue;

})(typedOM.internal, window);
