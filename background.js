chrome.action.onClicked.addListener((currentTab) => {
  const isIncognito = currentTab.incognito;
  
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.incognito === isIncognito) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
});
