(function(internal, scope) {

  (function() {
    function CSSImageValue() {
      throw new TypeError("Can\'t instantiate CSSImageValue");
    }
    internal.inherit(CSSImageValue, CSSResourceValue);

    scope.CSSImageValue = CSSImageValue;
  })();

  var CSSImageValue = function(image) {
    if (!(image instanceof Image)) {
      throw new TypeError("image must be an Image object");
    }
    this._image = image;
    this.state = "unloaded";
    this.intrinsicWidth = null;
    this.intrinsicHeight = null;
    this.intrinsicRatio = null;
    this._image.onload = function() {
      this.state = "loaded";
      this.intrinsicWidth = this._image.naturalWidth;
      this.intrinsicHeight = this._image.naturalHeight;
      if (this.intrinsicHeight != 0)
        this.intrinsicRatio = this.intrinsicWidth / this.intrinsicHeight;
    }
    this._image.onerror = function() {
      this.state = "error";
    }
    this._image.onprogess = function() {
      this.state = "loading";
    }
  }

  CSSImageValue.prototype = Object.create(scope.CSSImageValue.prototype);

  internal.CSSImageValue = CSSImageValue;

})(typedOM.internal, window);
