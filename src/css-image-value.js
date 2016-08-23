(function(internal, scope) {

  function CSSImageValue(image) {
    if (!(image instanceof Image)) {
      throw new TypeError("image must be an Image object");
    }
    this._image = image;


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

    this.state = "unloaded";
    this.intrinsicWidth = null;
    this.intrinsicHeight = null;
    this.intrinsicRatio = null;

    this._image.onload = onLoad.bind(this);
    this._image.onprogress = onProgress.bind(this);
    this._image.onerror = onError.bind(this);
  }

  internal.inherit(CSSImageValue, CSSResourceValue);

  internal.CSSImageValue = CSSImageValue;

  (function() {
    function CSSImageValue() {
      throw new TypeError('Can\'t instantiate CSSImageValue');
    }
    scope.CSSImageValue = CSSImageValue;
  })();

})(typedOM.internal, window);
