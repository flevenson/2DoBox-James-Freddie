var title = $('.title-input').val();
var body = $('.body-input').val();
var numCards = 0;
var quality = "swill";

$('.save-btn').on('click', saveCard);

function saveCard(event) {
  event.preventDefault();
  if ($('.title-input').val() === "" || $('.body-input').val() === "") {
    return;
  };  
  var card = new Card($('.title-input').val(), $('.body-input').val());
  // numCards++;
  addToPage(card);
  localStoreCard(card);
  $('form')[0].reset();
};

function addToPage(card) {
    $(".bottom-box").prepend(`<div id="${card.id}"class="card-container">
                                <h2 class="title-of-card">${card.title}</h2>
                                <button class="delete-button"></button>
                                <p class="body-of-card">${card.body}</p>
                                <button class="upvote"></button>
                                <button class="downvote"></button>
                                <p class="quality">quality: <span class="quality">${card.quality}</span></p>
                              </div>`);
};

function Card(title, body) {
        this.id = $.now();
        this.title = title;
        this.body = body;
        this.quality = quality || 'swill';
        this.contents = (`<div id="${card.id}"class="card-container">
                                <h2 class="title-of-card">${card.title}</h2>
                                <button class="delete-button"></button>
                                <p class="body-of-card">${card.body}</p>
                                <button class="upvote"></button>
                                <button class="downvote"></button>
                                <p class="quality">quality: <span class="quality">${card.quality}</span></p>
                              </div>`)
    };

Card.prototype.updateLocalStorage = function(){
  $(".bottom-box").prepend(`<div id="${card.id}"class="card-container">
                                <h2 class="title-of-card">${card.title}</h2>
                                <button class="delete-button"></button>
                                <p class="body-of-card">${card.body}</p>
                                <button class="upvote"></button>
                                <button class="downvote"></button>
                                <p class="quality">quality: <span class="quality">${card.quality}</span></p>
                              </div>`);
}
// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     numCards++;
//     $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
// });

function localStoreCard(card) {
    var cardString = JSON.stringify(card);
    localStorage.setItem(card.id, cardString);
}

$(".bottom-box").on('click', function(event){
  var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
  var quality;

  if (event.target.className === "upvote" || event.target.className === "downvote"){
    if (event.target.className === "upvote"){
      upvoteFunctionality(currentQuality);
      updateLocalStorage();
      localStoreCard(card);
    } else if (event.target.className === "downvote") {
      downvoteFunctionality(currentQuality);
      updateLocalStorage();
      localStoreCard(card);
    }
  }
});

function downvoteFunctionality(currentQuality) {
  if (currentQuality === "plausible") {
    quality = "swill"
    $($(event.target).siblings('p.quality').children()[0]).text(quality);
  } else if (currentQuality === "genius") {
    quality = "plausible"
    $($(event.target).siblings('p.quality').children()[0]).text(quality);
  } else if (currentQuality === "swill") {
    quality = "swill";
    $($(event.target).siblings('p.quality').children()[0]).text(quality);
}
};

function upvoteFunctionality(currentQuality) {
  if (currentQuality === "plausible"){
      quality = "genius";
      $($(event.target).siblings('p.quality').children()[0]).text(quality);         
    } else if (currentQuality === "swill") {
        quality = "plausible";
        $($(event.target).siblings('p.quality').children()[0]).text(quality);         
    } else if (currentQuality === "genius") {
        quality = "genius";
      $($(event.target).siblings('p.quality').children()[0]).text(quality); 
}
};








// var cardHTML = $(event.target).closest('.card-container');
// var cardHTMLId = cardHTML[0].id;
// var cardObjectInJSON = localStorage.getItem(cardHTMLId);
// var cardObjectInJS = JSON.parse(cardObjectInJSON);

// cardObjectInJS.quality = qualityVariable;

// var newCardJSON = JSON.stringify(cardObjectInJS);
// localStorage.setItem(cardHTMLId, newCardJSON);
// //     }
   
// // //     else if (event.target.className === "delete-button") {
// // //         var cardHTML = $(event.target).closest('.card-container').remove();
// // //         var cardHTMLId = cardHTML[0].id;
// // //   localStoreCard(card);
// // //         localStorage.removeItem(cardHTMLId);
// // //     }
// // // };
      










