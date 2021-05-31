/*1. Search */
// seach
var x=0;
var UI = {};

/* event click */

UI.submitClick = function(){

 document.querySelector('.js-submit').addEventListener('click',function(){

 var inputSearch = document.querySelector('.js-search').value;

 SoundCloudAPI.getTrack(inputSearch);

 // debugger;

  });

};

UI.submitClick();

/** event keyup */

UI.enterPress = function(){

 document.querySelector('.js-search').addEventListener('keyup',function(e){

 var inputSearch = document.querySelector('.js-search').value;

 if(e.code === 'Enter')

    {

 // debugger;

 SoundCloudAPI.getTrack(inputSearch);

    }

  });

};

UI.enterPress();
/*2. Query SoundCloud API*/
var SoundCloudAPI={};//created an object.

SoundCloudAPI.init=function(){
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
      
      });

}
SoundCloudAPI.init();

SoundCloudAPI.getTrack=function(inputValue){
// find all sounds of buskers licensed under 'creative commons share alike'
SC.get('/tracks', {
  q: inputValue
}).then(function(tracks) {
  console.log(tracks);
  SoundCloudAPI.renderTracks(tracks);
});
}

// SoundCloudAPI.getTrack("Rilo Kiley");
/*3.Display the cards */
SoundCloudAPI.renderTracks = function(tracks){
  
  document.querySelector('.js-search-results').innerHTML = ''
    tracks.forEach(function(track) {
      
    
        //card 
      var card=document.createElement('div');
    card.classList.add("card");
    
    //IMAGE
    var imageDiv=document.createElement('div');
    imageDiv.classList.add('image')
   
    //adding image
    var image_img=document.createElement('img');
    image_img.classList.add('image_img');
    image_img.src=track.artwork_url || 'https://i.picsum.photos/id/876/100/100.jpg?hmac=7SQFRooJrqSBMhZjrRXhcqkyUN9hrd0e1sRYfucF7r0';

    imageDiv.appendChild(image_img);


    // content
    var content= document.createElement('div');
    content.classList.add('content');

    //header
    var header=document.createElement('div');
    content.classList.add('header');
    
    header.innerHTML='<a href="'+ track.permalink_url + '" target="_blank">'+ track.title +'</a>';

    //button
    var button=document.createElement('div');
    button.classList.add('ui','bottom','attached','button','js-button')

    var icon = document.createElement('i');
    icon.classList.add('add','icon');

    var buttonText = document.createElement('span');
    buttonText.innerHTML='Add to playlist';

    //appendChild
    content.appendChild(header);
    
    button.appendChild(icon);
    button.appendChild(buttonText);

    button.addEventListener('click',function(){
      if(buttonText.innerHTML=='Add to playlist'){
      SoundCloudAPI.getEmbed(track.permalink_url);        
      buttonText.innerHTML='Remove from playlist';
      
    }

    else if(buttonText.innerHTML=='Remove from playlist'){
      SoundCloudAPI.getEmbed(track.permalink_url);        
      buttonText.innerHTML='Add to playlist';
    
    }
    });
    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    var searchResults = document.querySelector(".js-search-results")
    searchResults.appendChild(card);

    });

    

}




SoundCloudAPI.getEmbed = function(trackURL){
 
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then(function(embed){
    console.log('oEmbed response: ', embed);
    var sideBar=document.querySelector('.js-playlist');
    // sideBar.innerHTML=embed.html;
    
    var box=document.createElement('div');
    box.innerHTML=embed.html;

    sideBar.insertBefore(box, sideBar.firstChild);
    localStorage.setItem("key",sideBar.innerHTML);
    x++;
  
    // sideBar.insertAfter(box, sideBar.lastChild);

  });
}
var sideBar =document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("key");
console.log(localStorage);
// var Reset=document.createElement('button');
// Reset.classList.add('reset');
// Reset.addEventListener('click', function(){
//   alert('Click');
// });
function myFunction(){
  localStorage.clear();
  sideBar.innerHTML = localStorage.getItem("key");
}