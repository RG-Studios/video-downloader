const BACKEND_URL = "https://video-downloader-backend.onrender.com"; // Replace with your actual backend URL

async function fetchDownloadOptions() {
  const url = document.getElementById("videoUrl").value;
  if (!url.trim()) return alert("Paste a valid video URL!");

  const res = await fetch(`${BACKEND_URL}/api/info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  const data = await res.json();
  if (data.error) {
    alert("❌ " + data.error);
    return;
  }

  const videoSel = document.getElementById("videoQuality");
  const audioSel = document.getElementById("audioQuality");

  videoSel.innerHTML = "";
  audioSel.innerHTML = "";

  data.video.forEach(v =>
    videoSel.innerHTML += `<option value="${v.url}" data-ext="${v.ext}">${v.quality}</option>`
  );

  data.audio.forEach(a =>
    audioSel.innerHTML += `<option value="${a.url}" data-ext="${a.ext}">${a.quality}</option>`
  );

  document.getElementById("options").classList.remove("hidden");
}

function startDownload() {
  const fileName = document.getElementById("fileName").value || "video";

  const videoOption = document.getElementById("videoQuality").selectedOptions[0];
  const audioOption = document.getElementById("audioQuality").selectedOptions[0];

  const videoUrl = videoOption.value;
  const videoExt = videoOption.dataset.ext;

  const a = document.createElement("a");
  a.href = videoUrl;
  a.download = `${fileName}.${videoExt}`;
  a.click();
}
