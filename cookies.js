function allowCookies() {
  localStorage.setItem("cookieAllowed", "yes");
  sendLocation();
}

function sendLocation() {
  const status = document.getElementById("status");

  if (!navigator.geolocation) {
    status.innerText = "Standort wird vom Browser nicht unterstützt.";
    return;
  }

  status.innerText = "Standort wird übermittelt …";

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      fetch("/location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        })
      });

      status.innerText = "Standort wurde gesendet.";
    },
    () => {
      status.innerText = "Standortfreigabe wurde abgelehnt.";
    }
  );
}
