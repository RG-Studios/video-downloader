function fetchDownloadOptions() {
  const url = document.getElementById('videoUrl').value;
  if (!url.trim()) {
    alert("Please paste a video URL.");
    return;
  }

  // Fake delay to simulate API
  setTimeout(() => {
    document.getElementById('options').classList.remove('hidden');
  }, 500);
}

function startDownload() {
  const url = document.getElementById('videoUrl').value;
  const quality = document.getElementById('videoQuality').value;
  const audio = document.getElementById('audioQuality').value;
  const name = document.getElementById('fileName').value;

  alert(`🔻 Starting download:\nURL: ${url}\nVideo: ${quality}\nAudio: ${audio}\nFile Name: ${name}`);

  // This is where you would call a backend API like:
  // fetch(`/api/download?url=${url}&video=${quality}&audio=${audio}&name=${name}`)
}
