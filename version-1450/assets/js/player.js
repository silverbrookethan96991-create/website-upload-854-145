function setupMoviePlayer(url) {
  const video = document.getElementById("moviePlayer");
  const cover = document.getElementById("playCover");
  let prepared = false;
  let hlsInstance = null;

  if (!video || !cover || !url) {
    return;
  }

  function prepare() {
    if (prepared) {
      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else if (window.Hls && window.Hls.isSupported()) {
      hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      hlsInstance.loadSource(url);
      hlsInstance.attachMedia(video);
    } else {
      video.src = url;
    }

    prepared = true;
  }

  function play() {
    cover.classList.add("is-hidden");
    prepare();
    const promise = video.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(function () {});
    }
  }

  cover.addEventListener("click", play);
  video.addEventListener("click", function () {
    if (video.paused) {
      play();
    }
  });

  window.addEventListener("pagehide", function () {
    if (hlsInstance) {
      hlsInstance.destroy();
      hlsInstance = null;
    }
  });
}
