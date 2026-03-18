chrome.storage.sync.get(["blocked"], (data) => {
  const sites = data.blocked || [];
  if (sites.some(site => window.location.href.includes(site))) {
    document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>Blocked for Focus 😤</h1>";
  }
});
