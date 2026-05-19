/* Classic Mac OS (System 1-6) cursor — self-contained, no deps.
 * Drop in via <script src="/mac-cursor.js"></script>. Hides the native cursor
 * site-wide on pointer-capable devices and renders a pixel-art replacement
 * that mirrors the current hover state.
 *
 * Pixel grids: '1' = black, '0' = white outline, '.' = transparent.
 * Hotspot coordinates are in original grid pixels (pre-scale).
 */
(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__macCursorLoaded) return;
  window.__macCursorLoaded = true;

  // Skip touch / non-hover devices.
  if (!window.matchMedia("(hover: hover)").matches) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  var SCALE = 2;

  /* ---------- pixel grids ---------- */
  var ARROW = [
    "1...........",
    "11..........",
    "101.........",
    "1001........",
    "10001.......",
    "100001......",
    "1000001.....",
    "10000001....",
    "100000001...",
    "1000000001..",
    "10000010001.",
    "1000110001..",
    "1001.10001..",
    "101...10001.",
    "11.....1001.",
    "........101.",
    ".........11.",
  ];

  var POINTER = [
    "....11......",
    "...1001.....",
    "...1001.....",
    "...1001.....",
    "...1001.....",
    "...10011....",
    "...100110011",
    ".11100110011",
    "10011001100*",
    "1001110011001",
    "1001100110001",
    ".1000000100001",
    "..100000000001",
    "..100000000001",
    "...1000000001.",
    "....11111111..",
  ];

  var TEXT = [
    "111.111",
    ".101.0.",
    "..101..",
    "..101..",
    "..101..",
    "..101..",
    "..101..",
    "..101..",
    "..101..",
    "..101..",
    "..101..",
    "..101..",
    "..101..",
    "..101..",
    ".101.0.",
    "111.111",
  ];

  var CROSSHAIR = [
    "......11.....",
    "......101....",
    "......101....",
    "......101....",
    "......101....",
    "......101....",
    "11111101011111",
    "10000000000001",
    "11111101011111",
    "......101....",
    "......101....",
    "......101....",
    "......101....",
    "......101....",
    "......11.....",
  ];

  var NOT_ALLOWED = [
    "....11111....",
    "..111000011..",
    ".110000010011",
    ".1000001100011",
    "10000110000011",
    "10001100100011",
    "10011001000011",
    "10110010000011",
    "11100100000011",
    "11001000000011",
    "1100100000001",
    ".11001000011.",
    ".1100100011..",
    "..11001011...",
    "...11111.....",
  ];

  var RESIZE_NS = [
    "......11......",
    ".....1001.....",
    "....100001....",
    "...10000001...",
    "..1000000001..",
    ".100000000001.",
    "10000000000001",
    "10000000000001",
    "10000000000001",
    "10000000000001",
    ".100000000001.",
    "..1000000001..",
    "...10000001...",
    "....100001....",
    ".....1001.....",
    "......11......",
  ];

  var RESIZE_EW = [
    "................",
    "................",
    "......1....1....",
    ".....11....11...",
    "....101....101..",
    "...1001....1001.",
    "..10001....10001",
    ".100001....10001",
    ".100001....10001",
    "..10001....10001",
    "...1001....1001.",
    "....101....101..",
    ".....11....11...",
    "......1....1....",
  ];

  var GRAB = [
    "....11..11..11..",
    "...1001100110...",
    "...10010010111..",
    ".11.1001001100..",
    "1001110010010001",
    "10010100100110011",
    "100100100100100",
    "100100100100100",
    "1000010000100010",
    ".10000000000001",
    "..100000000001",
    "..100000000001",
    "...10000000001",
    "....1000000001",
    ".....10000001",
    ".....11111111",
  ];

  var GRABBING = [
    "................",
    ".....111111.....",
    "....10100011....",
    "..1101010100111.",
    ".10010101010011.",
    ".10001010101001.",
    "..1001010100011.",
    "...100000000011.",
    "...100000000001.",
    "....1000000001..",
    "....1000000001..",
    ".....10000001...",
    ".....11111111...",
  ];

  // Wait / wristwatch — 4 frames with rotating hand.
  function watchFrame(handGrid) {
    var rows = [
      "....1111111.....",
      "....1000001.....",
      "...100000001....",
      "..10000000001...",
      ".1000000000001..",
    ];
    var bezel = [
      ".1000000000001..",
      "..10000000001...",
      "...100000001....",
      "....1000001.....",
      "....1111111.....",
    ];
    // handGrid: 5x5 inner clock face (rows 5-9, cols 5-11)
    // We'll just splice it in.
    return rows.concat(handGrid).concat(bezel);
  }

  var WATCH_HAND = {
    up: [
      "1000010000001",
      "1000010000001",
      "1000010000001",
      "1000000000001",
      "1000000000001",
    ],
    right: [
      "1000000000001",
      "1000000011101",
      "1000000010001",
      "1000000000001",
      "1000000000001",
    ],
    down: [
      "1000000000001",
      "1000000000001",
      "1000000010001",
      "1000000010001",
      "1000000010001",
    ],
    left: [
      "1000000000001",
      "1000111000001",
      "1000010000001",
      "1000000000001",
      "1000000000001",
    ],
  };

  var WATCH_FRAMES = [
    watchFrame(WATCH_HAND.up),
    watchFrame(WATCH_HAND.right),
    watchFrame(WATCH_HAND.down),
    watchFrame(WATCH_HAND.left),
  ];

  var cursors = {
    default: { frames: [ARROW], hotX: 0, hotY: 0 },
    pointer: { frames: [POINTER], hotX: 5, hotY: 0 },
    text: { frames: [TEXT], hotX: 3, hotY: 8 },
    crosshair: { frames: [CROSSHAIR], hotX: 7, hotY: 7 },
    "not-allowed": { frames: [NOT_ALLOWED], hotX: 7, hotY: 7 },
    "resize-ns": { frames: [RESIZE_NS], hotX: 7, hotY: 8 },
    "resize-ew": { frames: [RESIZE_EW], hotX: 7, hotY: 7 },
    grab: { frames: [GRAB], hotX: 7, hotY: 7 },
    grabbing: { frames: [GRABBING], hotX: 7, hotY: 7 },
    wait: { frames: WATCH_FRAMES, hotX: 7, hotY: 7, frameDuration: 180 },
    progress: { frames: WATCH_FRAMES, hotX: 7, hotY: 7, frameDuration: 180 },
  };

  /* ---------- SVG render ---------- */
  function gridToSvg(grid) {
    var h = grid.length;
    var w = 0;
    for (var i = 0; i < h; i++) if (grid[i].length > w) w = grid[i].length;
    var rects = "";
    for (var y = 0; y < h; y++) {
      var row = grid[y];
      for (var x = 0; x < row.length; x++) {
        var c = row.charAt(x);
        if (c === "1") {
          rects +=
            '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="#000"/>';
        } else if (c === "0") {
          rects +=
            '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="#fff"/>';
        }
      }
    }
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      w * SCALE +
      '" height="' +
      h * SCALE +
      '" viewBox="0 0 ' +
      w +
      " " +
      h +
      '" shape-rendering="crispEdges" style="display:block">' +
      rects +
      "</svg>"
    );
  }

  /* ---------- cursor element ---------- */
  var cursorEl = document.createElement("div");
  cursorEl.setAttribute("aria-hidden", "true");
  cursorEl.id = "__mac-cursor";
  cursorEl.style.cssText =
    "position:fixed;top:0;left:0;width:0;height:0;pointer-events:none;" +
    "z-index:2147483647;transform:translate3d(-100px,-100px,0);" +
    "transition:opacity 120ms ease;opacity:0;will-change:transform";
  var inner = document.createElement("div");
  inner.style.cssText = "position:absolute;top:0;left:0";
  cursorEl.appendChild(inner);

  var styleEl = document.createElement("style");
  styleEl.textContent =
    "*,*::before,*::after{cursor:none!important}" +
    "#__mac-cursor *{pointer-events:none}";

  function attach() {
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", attach, { once: true });
      return;
    }
    document.head.appendChild(styleEl);
    document.body.appendChild(cursorEl);
    bindEvents();
    setState("default");
  }

  /* ---------- state ---------- */
  var currentName = "default";
  var frameIdx = 0;
  var frameTimer = null;
  var hotX = 0;
  var hotY = 0;
  var mouseX = -100;
  var mouseY = -100;

  function renderCurrent() {
    var c = cursors[currentName] || cursors.default;
    var frame = c.frames[frameIdx % c.frames.length];
    inner.innerHTML = gridToSvg(frame);
    hotX = c.hotX * SCALE;
    hotY = c.hotY * SCALE;
    positionEl();
  }

  function positionEl() {
    cursorEl.style.transform =
      "translate3d(" +
      (mouseX - hotX) +
      "px," +
      (mouseY - hotY) +
      "px,0)";
  }

  function setState(name) {
    if (name === currentName) return;
    currentName = name;
    frameIdx = 0;
    if (frameTimer) {
      clearInterval(frameTimer);
      frameTimer = null;
    }
    var c = cursors[currentName] || cursors.default;
    if (c.frames.length > 1) {
      var dur = c.frameDuration || 150;
      frameTimer = setInterval(function () {
        frameIdx = (frameIdx + 1) % c.frames.length;
        renderCurrent();
      }, dur);
    }
    renderCurrent();
  }

  /* ---------- event detection ---------- */
  function detectState(el) {
    if (!el || el.nodeType !== 1) return "default";

    var override = el.closest && el.closest("[data-cursor]");
    if (override && override.dataset && override.dataset.cursor) {
      return override.dataset.cursor;
    }

    if (
      el.closest &&
      el.closest(':disabled,[aria-disabled="true"],[disabled]')
    ) {
      return "not-allowed";
    }

    if (
      el.closest &&
      el.closest(
        'a[href],button,[role="button"],[role="link"],[role="tab"],' +
          'summary,label[for],select,[onclick]'
      )
    ) {
      return "pointer";
    }

    if (
      el.closest &&
      el.closest(
        "input:not([type=button]):not([type=submit]):not([type=reset]):" +
          "not([type=checkbox]):not([type=radio]):not([type=file]):" +
          "not([type=image]):not([type=color]):not([type=range])," +
          'textarea,[contenteditable="true"],[contenteditable=""]'
      )
    ) {
      return "text";
    }

    return "default";
  }

  function bindEvents() {
    document.addEventListener(
      "mousemove",
      function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        positionEl();
        cursorEl.style.opacity = "1";
      },
      { passive: true }
    );

    document.addEventListener(
      "mouseover",
      function (e) {
        setState(detectState(e.target));
      },
      { passive: true }
    );

    document.addEventListener("mousedown", function () {
      if (currentName === "grab") setState("grabbing");
    });

    document.addEventListener("mouseup", function (e) {
      if (currentName === "grabbing") {
        setState(detectState(e.target));
      }
    });

    window.addEventListener("blur", function () {
      cursorEl.style.opacity = "0";
    });
    window.addEventListener("focus", function () {
      cursorEl.style.opacity = "1";
    });

    document.addEventListener("mouseleave", function () {
      cursorEl.style.opacity = "0";
    });
    document.addEventListener("mouseenter", function () {
      cursorEl.style.opacity = "1";
    });
  }

  attach();
})();
