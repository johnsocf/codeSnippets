  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var player;
  var secondp;

  function onYouTubeIframeAPIReady() {
     $('#overlay').click(function(){
        imgSrc = $('#overlay img')[0].src;
          player = new YT.Player('player', {
          height: '100%',
          width: '100%',
          videoId: 'ds2kHxStKKs',
          playerVars: { autoplay: 0, autohide: 1, showinfo: 0 },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      });            
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function onPlayerReady(event) {

    $('#overlay').on("click", function(){
      videoStart(event.target);
    });
  }

  function videoStart(video) {
    $('#overlay').hide();
    video.playVideo();
  }

  var done = false;

   function onPlayerStateChange(event) {
    console.log(event);
    if (event.data == YT.PlayerState.ENDED) {
      $('#overlay').show();
      $('#player').remove();
      $('body').append('<div id="player"></div>'); 
      player = new YT.Player('player', {
          height: '315',
          width: '560',
          videoId: 'ds2kHxStKKs',
          playerVars: { autoplay: 0, autohide: 1, showinfo: 0 },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
      });
    }
  }

