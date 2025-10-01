    // 🎶 Playlist - Add your music file names here
    const playlist = [
      "song1.mp3",
      "song2.mp3",
      "song3.mp3",
      "song4.mp3",
      "song5.mp3",
      "song6.mp3",
      "song7.mp3",
      "song8.mp3"
    ];

    let currentTrack = 0;
    const audio = document.getElementById("audioPlayer");
    const trackName = document.getElementById("trackName");
    const songList = document.getElementById("songList");
    const searchInput = document.getElementById("searchInput");

    // Extract names without ".mp3"
    const getDisplayName = (filename) => filename.replace(".mp3", "");

    // Load a specific track
    function loadTrack(index) {
      audio.src = playlist[index];
      trackName.textContent = "Track: " + getDisplayName(playlist[index]);
      audio.load();
    }

    function playTrack() {
      audio.play();
    }

    function togglePlayPause() {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    function nextSong() {
      currentTrack = (currentTrack + 1) % playlist.length;
      loadTrack(currentTrack);
      playTrack();
    }

    function prevSong() {
      currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
      loadTrack(currentTrack);
      playTrack();
    }

    // Handle search/filter
    function filterSongs() {
      const query = searchInput.value.toLowerCase();
      songList.innerHTML = "";

      playlist.forEach((song, index) => {
        const displayName = getDisplayName(song);
        if (displayName.toLowerCase().includes(query)) {
          const li = document.createElement("li");
          li.textContent = displayName;
          li.onclick = () => {
            currentTrack = index;
            loadTrack(index);
            playTrack();
          };
          songList.appendChild(li);
        }
      });
    }

    // Initial setup
    function init() {
      loadTrack(currentTrack);
      filterSongs(); // Show full list initially
    }

    audio.addEventListener("ended", () => {
      nextSong();
    });

    init();
