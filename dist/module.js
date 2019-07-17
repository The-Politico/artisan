import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState, useEffect } from 'react';
import { sendFrameHeight, initFrame } from '@newswire/frames';
import debounce from 'lodash/debounce';

var NULL_COMPONENT = function NULL_COMPONENT() {
  return null;
};

var getWidth = function getWidth() {
  return window.innerWidth;
};

var useLayoutBreakpoint = function useLayoutBreakpoint(LAYOUTS) {
  var _useState = useState(NULL_COMPONENT),
      _useState2 = _slicedToArray(_useState, 2),
      layout = _useState2[0],
      updateLayout = _useState2[1];

  var findLayout = function findLayout() {
    var layoutKeys = Object.keys(LAYOUTS).sort(function (a, b) {
      return LAYOUTS[b].breakpoint - LAYOUTS[a].breakpoint;
    });
    var width = getWidth();

    if (width > LAYOUTS[layoutKeys[0]].breakpoint) {
      return LAYOUTS[layoutKeys[0]].component;
    }

    var lastIndex = layoutKeys.length - 1;

    if (width < LAYOUTS[layoutKeys[lastIndex]].breakpoint) {
      return LAYOUTS[layoutKeys[lastIndex]].component;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = layoutKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;
        var layoutConfig = LAYOUTS[key];

        if (width >= layoutConfig.breakpoint) {
          return layoutConfig.component;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return NULL_COMPONENT;
  };

  useEffect(function () {
    var handleResize = function handleResize() {
      var newLayout = findLayout();

      if (newLayout !== layout) {
        updateLayout(newLayout);
      }
    };

    handleResize();
    window.addEventListener('resize', debounce(handleResize, 100));
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(function () {
    sendFrameHeight();
  }, [layout]);
  return layout;
};

var useInitFrame = function useInitFrame(LAYOUTS) {
  useEffect(function () {
    initFrame();
  }, []);
};

export { useInitFrame, useLayoutBreakpoint as useLayoutBreakpoints };
