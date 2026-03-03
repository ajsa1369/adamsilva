(function() {
  'use strict';

  // Find the script tag to read data-client-id and data-site-url
  var scripts = document.querySelectorAll('script[data-client-id]');
  var scriptTag = scripts[scripts.length - 1];
  var clientId = scriptTag ? scriptTag.getAttribute('data-client-id') : 'default';
  var siteUrl = scriptTag ? (scriptTag.getAttribute('data-site-url') || 'https://www.adamsilvaconsulting.com') : 'https://www.adamsilvaconsulting.com';

  // Don't initialize twice
  if (document.getElementById('asc-chatbot-root')) return;

  // Create root container
  var root = document.createElement('div');
  root.id = 'asc-chatbot-root';
  root.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:999999;font-family:system-ui,sans-serif;';
  document.body.appendChild(root);

  // State
  var isOpen = false;
  var iframe = null;

  // Toggle button
  var btn = document.createElement('button');
  btn.id = 'asc-chat-toggle';
  btn.setAttribute('aria-label', 'Open chat');
  btn.style.cssText = 'width:56px;height:56px;border-radius:50%;background:#4D8EC0;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;transition:background 0.2s;';
  btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  root.appendChild(btn);

  // Chat panel (iframe)
  function createPanel() {
    var panel = document.createElement('div');
    panel.id = 'asc-chat-panel';
    panel.style.cssText = 'position:absolute;bottom:68px;right:0;width:360px;height:500px;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.15);display:none;';

    iframe = document.createElement('iframe');
    iframe.src = siteUrl + '/chatbot-widget?clientId=' + encodeURIComponent(clientId);
    iframe.style.cssText = 'width:100%;height:100%;border:none;';
    iframe.title = 'ASC Chat Widget';
    panel.appendChild(iframe);

    // Mobile: full-width panel
    if (window.innerWidth < 480) {
      panel.style.width = '100vw';
      panel.style.right = '-24px';
      panel.style.height = '70vh';
      panel.style.borderRadius = '16px 16px 0 0';
    }

    root.appendChild(panel);
    return panel;
  }

  var panel = createPanel();

  btn.addEventListener('click', function() {
    isOpen = !isOpen;
    panel.style.display = isOpen ? 'block' : 'none';
    btn.setAttribute('aria-label', isOpen ? 'Close chat' : 'Open chat');
    btn.style.background = isOpen ? '#1B2E4B' : '#4D8EC0';
  });

  // Keyboard: close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) {
      isOpen = false;
      panel.style.display = 'none';
      btn.style.background = '#4D8EC0';
    }
  });
})();
