const backendUrl = "https://video-downloader-backend-291i.onrender.com"; // Your Render backend URL

async function fetchDownloadOptions() {
  const videoUrl = document.getElementById("videoUrl").value.trim();
  if (!videoUrl) {
    alert("Please enter a video URL.");
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/fetch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch download options");
    }

    const data = await response.json();
    populateOptions(data);
    document.getElementById("options").classList.remove("hidden");
  } catch (error) {
    alert("Error fetching download options. Check the URL or try again later.");
    console.error(error);
  }
}

function populateOptions(data) {
  const videoSelect = document.getElementById("videoQuality");
  const audioSelect = document.getElementById("audioQuality");

  videoSelect.innerHTML = "";
  audioSelect.innerHTML = "";

  if (data.video && data.video.length > 0) {
    data.video.forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v.itag;
      opt.textContent = `${v.resolution} - ${v.mime}`;
      videoSelect.appendChild(opt);
    });
  }

  if (data.audio && data.audio.length > 0) {
    data.audio.forEach((a) => {
      const opt = document.createElement("option");
      opt.value = a.itag;
      opt.textContent = `${a.bitrate}kbps - ${a.mime}`;
      audioSelect.appendChild(opt);
    });
  }
}

async function startDownload() {
  const videoUrl = document.getElementById("videoUrl").value.trim();
  const videoItag = document.getElementById("videoQuality").value;
  const audioItag = document.getElementById("audioQuality").value;
  const fileName = document.getElementById("fileName").value.trim();

  if (!videoUrl || !videoItag || !audioItag || !fileName) {
    alert("Please fill all the fields.");
    return;
  }

  if (!fileName.endsWith(".mp4")) {
    alert("Filename must end with .mp4");
    return;
  }

  const url = `${backendUrl}/download?url=${encodeURIComponent(videoUrl)}&video_itag=${videoItag}&audio_itag=${audioItag}&filename=${encodeURIComponent(fileName)}`;

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
