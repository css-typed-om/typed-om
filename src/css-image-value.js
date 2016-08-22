(function(internal, scope) {

  function CSSImageValue(image) {
    if (!(image instanceof Image)) {
      throw new TypeError("image must be an Image object");
    }
    this._image = image;

    var imagesEventsHandler = {
      onload: function() {
        this.state = "loaded";
        this.intrinsicWidth = this._image.naturalWidth;
        this.intrinsicHeight = this._image.naturalHeight;
        if (this.intrinsicHeight != 0)
          this.intrinsicRatio = this.intrinsicWidth / this.intrinsicHeight;
      },
      onerror: function() {
        this.state = "error";
      },
      onprogress: function() {
        this.state = "loading";
      }
    };

    this.state = "unloaded";
    this.intrinsicWidth = null;
    this.intrinsicHeight = null;
    this.intrinsicRatio = null;

    this._image.onload = imagesEventsHandler.onload.bind(this);
    this._image.onprogress = imagesEventsHandler.onprogress.bind(this);
    this._image.onerror = imagesEventsHandler.onerror.bind(this);
  }

  internal.inherit(CSSImageValue, CSSResourceValue);

  scope.CSSImageValue = CSSImageValue;

})(typedOM.internal, window);
