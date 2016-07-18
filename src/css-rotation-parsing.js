// Copyright 2016 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function(internal) {
  var parsing = internal.parsing;

  function parseRotate(string) {
    var params = parsing.consumeAngleValue(string);
    if (!params || params[1].length) {
      return null;
    }
    return new CSSRotation(params[0]);
  }

  function parseRotate3D(string) {
    var params = parsing.consumeRepeated(parsing.consumeNumber, /^,/, string, 3 /* opt_max */);
    if (!params) {
      return null;
    }
    var xyz = params[0]; // Array of numbers
    if (xyz.length != 3) {
      return null;
    }
    params = parsing.consumeAngleValue(params[1]);
    if (!params || params[1].length) {
      return null;
    }
    return new CSSRotation(xyz[0], xyz[1], xyz[2], params[0]);
  }

  function parseRotateXYZ(xyOrZ, string) {
    var params = parsing.consumeAngleValue(string);
    if (!params || params[1].length) {
      return null;
    }
    switch (xyOrZ) {
      case 'x':
        return new CSSRotation(1, 0, 0, params[0]);
      case 'y':
        return new CSSRotation(0, 1, 0, params[0]);
      case 'z':
        return new CSSRotation(0, 0, 1, params[0]);
    }
    return null;
  }

  function consumeRotation(string) {
    var parts = string.toLowerCase().split('(', 2);
    if (parts.length != 2) {
      return null;
    }
    var keyword = parts[0];
    parts = parts[1].split(')', 2);
    if (parts.length != 2) {
      return null;
    }
    var rotateArgs = parts[0];
    var remaining = parts[1];

    var result = null;
    switch (keyword) {
      case 'rotate':
        result = parseRotate(rotateArgs);
        break;
      case 'rotate3d':
        result = parseRotate3D(rotateArgs);
        break;
      case 'rotatex':
      case 'rotatey':
      case 'rotatez':
        result = parseRotateXYZ(keyword[keyword.length - 1], rotateArgs)
    }

    return result ? [result, remaining.trim()] : null;
  }

  internal.parsing.consumeRotation = consumeRotation;

})(typedOM.internal);
