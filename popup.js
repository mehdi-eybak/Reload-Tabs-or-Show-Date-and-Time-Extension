document.getElementById('reload').addEventListener('click', () => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const currentTab = tabs.find(tab => tab.active);
    const isIncognito = currentTab.incognito;

    tabs.forEach((tab) => {
      if (tab.incognito === isIncognito) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
});

document.getElementById('showDateTime').addEventListener('click', () => {
  const now = new Date();
  const utcString = now.toISOString().replace('T', ' ').substr(0, 19);

  const options = { timeZone: 'Asia/Tehran', hour12: false };
  const iranDate = new Intl.DateTimeFormat('fa-IR', options).format(now);
  const iranTime = new Intl.DateTimeFormat('fa-IR', { ...options, timeStyle: 'medium' }).format(now);
  const iranDateTime = `${iranDate.replace(/\//g, '-')} ${iranTime}`;

  const popupDiv = document.createElement('div');
  popupDiv.className = 'popup-container';
  popupDiv.innerHTML = `
    <div class="popup">
      <span class="close-btn">&times;</span>
      <p>Global : ${utcString}</p>
      <p>Iran : ${iranDateTime}</p>
    </div>
  `;
  
  document.body.appendChild(popupDiv);

  document.querySelector('.close-btn').addEventListener('click', () => {
    document.body.removeChild(popupDiv);
  });
});
