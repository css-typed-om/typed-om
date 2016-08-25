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

    function onLoad() {
      this.state = "loaded";
      this.intrinsicWidth = this._image.naturalWidth;
      this.intrinsicHeight = this._image.naturalHeight;
      if (this.intrinsicHeight != 0)
        this.intrinsicRatio = this.intrinsicWidth / this.intrinsicHeight;
    }

    function onError() {
      this.state = "error";
    }

    function onProgress() {
      this.state = "loading";
    }

    this._image = image;
    this.state = "unloaded";
    this.intrinsicWidth = null;
    this.intrinsicHeight = null;
    this.intrinsicRatio = null;
    this._image.onload = onLoad.bind(this);
    this._image.onerror = onError.bind(this);
    this._image.onprogess = onProgress.bind(this);
  }

  CSSImageValue.prototype = Object.create(scope.CSSImageValue.prototype);

  internal.CSSImageValue = CSSImageValue;

})(typedOM.internal, window);
