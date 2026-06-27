(function () {
  var currentScript = document.currentScript;
  if (!currentScript) return;
  var origin = new URL(currentScript.src).origin;

  var host = document.createElement("div");
  host.id = "nedavate-chat-widget-host";
  host.style.position = "fixed";
  host.style.bottom = "20px";
  host.style.right = "20px";
  host.style.zIndex = "2147483647";
  document.body.appendChild(host);

  var shadow = host.attachShadow({ mode: "open" });

  var style = document.createElement("style");
  style.textContent =
    ".wrapper{position:relative;font-family:system-ui,sans-serif;}" +
    ".launcher{width:56px;height:56px;border-radius:9999px;background:#0F9E78;" +
    "color:#fff;border:none;cursor:pointer;display:flex;align-items:center;" +
    "justify-content:center;box-shadow:0 16px 40px rgba(45,42,110,0.18);font-size:24px;" +
    "line-height:1;}" +
    ".panel{position:absolute;bottom:72px;right:0;width:360px;height:480px;" +
    "max-width:calc(100vw - 40px);max-height:calc(100vh - 120px);border-radius:16px;" +
    "overflow:hidden;box-shadow:0 16px 40px rgba(45,42,110,0.18);border:none;display:none;}" +
    ".panel.open{display:block;}";
  shadow.appendChild(style);

  var wrapper = document.createElement("div");
  wrapper.className = "wrapper";

  var iframe = document.createElement("iframe");
  iframe.className = "panel";
  iframe.src = origin + "/widget";
  iframe.title = "Chat";

  var launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "launcher";
  launcher.setAttribute("aria-label", "Open chat");
  launcher.textContent = "💬";

  var isOpen = false;
  launcher.addEventListener("click", function () {
    isOpen = !isOpen;
    iframe.classList.toggle("open", isOpen);
    launcher.setAttribute("aria-label", isOpen ? "Close chat" : "Open chat");
  });

  wrapper.appendChild(iframe);
  wrapper.appendChild(launcher);
  shadow.appendChild(wrapper);
})();
