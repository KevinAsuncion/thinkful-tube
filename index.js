'use strict';

function handleSubmitButton(){
  $('#search-form').submit(function(e){
    e.preventDefault(); 
    let value = $('#search-term').val();
    $('#search-term').val('');
    getDataFromAPI(value);
  });
}

function getDataFromAPI(value){
  let url = 'https://www.googleapis.com/youtube/v3/search';
  let key = 'AIzaSyA7uNoxluosry1d0tqTGZWlsjDe-dzkA54'; 
  let query = {
    part: 'snippet',
    key: key, 
    q: value
  };
  $.getJSON(url, query, function(data){
    let items = data.items;
    createAndRenderResultsList(items);
  });
}

function createAndRenderResultsList(items){
  let imgURLS = items.map(item => item.snippet.thumbnails.medium.url);
  let videoIds = items.map(item => item.id.videoId);
  let channelIds = items.map(item => item.snippet.channelId)
  let videoTitles = items.map(item => item.snippet.title)
  let channelTitle = items.map(item => item.snippet.channelTitle)
  let results = imgURLS.map((url,index) => 
    `<div>
      <a class="title" href="https://www.youtube.com/watch?v=${videoIds[index]}">${videoTitles[index]}<img src= ${url} alt="video"${index}></a>
     <a class="more" href="https://www.youtube.com/channel/${channelIds[index]}">More From ${channelTitle[index]}</a>
    </div>
    `);
  $('#results').prop('hidden', false).html(results).prepend(`<p>Here are your top five results</p>`);
}


$(handleSubmitButton);







