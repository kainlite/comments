(function () {
  document.addEventListener("DOMContentLoaded", function () {
    contentBody = document.getElementById("contentBody");
    contentBody.addEventListener("load", function () {
      rawContent = contentBody.contentDocument.getElementById("rawContent");
      if (rawContent) {
        var s = document.createElement("script");
        s.src = chrome.extension.getURL('injected.js');
        s.onload = function() {
          this.parentNode.removeChild(this);
        };

        (document.head||document.documentElement).appendChild(s);
      }
    });
  });
})();
