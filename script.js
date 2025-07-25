const backendURL = "https://video-downloader-backend-emmt.onrender.com"; // replace this

async function fetchInfo() {
  const url = document.getElementById("url").value;
  if (!url) return alert("Paste a URL");

  const res = await fetch(`${backendURL}/api/info?url=${encodeURIComponent(url)}`);
  const data = await res.json();

  if (data.error) return alert(data.error);

  document.getElementById("videoTitle").innerText = data.title;
  const select = document.getElementById("qualitySelect");
  select.innerHTML = "";

  data.streams.forEach(stream => {
    const opt = document.createElement("option");
    opt.value = stream.itag;
    opt.innerText = stream.resolution;
    select.appendChild(opt);
  });

  document.getElementById("options").classList.remove("hidden");
}

function download() {
  const url = document.getElementById("url").value;
  const itag = document.getElementById("qualitySelect").value;
  const name = document.getElementById("fileName").value || "video.mp4";

  const link = `${backendURL}/api/download?url=${encodeURIComponent(url)}&quality=${itag}&name=${encodeURIComponent(name)}`;
  window.open(link, "_blank");
}
