var title = $('.title-input').val();
var body = $('.body-input').val();
var numCards = 0;
var quality = "swill";


var newCard = function(id , title , body , quality) {
    $(".bottom-box").prepend('<div id="' + id + '"class="card-container"><h2 class="title-of-card">'  
            + title +  '</h2>'
            + '<button class="delete-button"></button>'
            +'<p class="body-of-card">'
            + body + '</p>'
            + '<button class="upvote"></button>' 
            + '<button class="downvote"></button>' 
            + '<p class="quality">' + 'quality:' + '<span class="quality">' + quality + '</span>' + '</p>'
            + '<hr>' 
            + '</div>');
};

function cardObject(id, title, body, quality) {
        this.id = $.now();
        this.title = $('.title-input').val();
        this.body = $('.body-input').val();
        this.quality = quality || 'swill';
    };

$.each(localStorage, function(key) {
    var cardData = JSON.parse(this);
    numCards++;
    $( ".bottom-box" ).prepend(newCard(key, cardData.title, cardData.body, cardData.quality));
});

var localStoreCard = function() {
    var cardString = JSON.stringify(cardObject());
    localStorage.setItem('card' + numCards  , cardString);
}

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if ($('.title-input').val() === "" || $('.body-input').val() === "") {
       $('save-btn').disabled = true;
    };  

    numCards++;
    $( ".bottom-box" ).prepend(newCard('card' + numCards, $('.title-input').val(), $('.body-input').val(), quality)); 
    localStoreCard();
    $('form')[0].reset();
});

$(".bottom-box").on('click', function(event){
    var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
    var quality;

    if (event.target.className === "upvote" || event.target.className === "downvote"){

        if (event.target.className === "upvote" && currentQuality === "plausible"){
            quality = "genius";
            $($(event.target).siblings('p.quality').children()[0]).text(quality);
               
        } else if (event.target.className === "upvote" && currentQuality === "swill") {
            quality = "plausible";
            $($(event.target).siblings('p.quality').children()[0]).text(quality);
               
        } else if (event.target.className === "downvote" && currentQuality === "plausible") {
            quality = "swill"
            $($(event.target).siblings('p.quality').children()[0]).text(quality);

        } else if (event.target.className === "downvote" && currentQuality === "genius") {
            quality = "plausible"
            $($(event.target).siblings('p.quality').children()[0]).text(quality);

        } else if (event.target.className === "downvote" && currentQuality === "swill") {
            quality = "swill";
        
        } else if (event.target.className === "upvote" && currentQuality === "genius") {
            quality = "genius";
        }

    var cardHTML = $(event.target).closest('.card-container');
    var cardHTMLId = cardHTML[0].id;
    var cardObjectInJSON = localStorage.getItem(cardHTMLId);
    var cardObjectInJS = JSON.parse(cardObjectInJSON);

    cardObjectInJS.quality = qualityVariable;

    var newCardJSON = JSON.stringify(cardObjectInJS);
    localStorage.setItem(cardHTMLId, newCardJSON);
    }
   
    else if (event.target.className === "delete-button") {
        var cardHTML = $(event.target).closest('.card-container').remove();
        var cardHTMLId = cardHTML[0].id;
        localStorage.removeItem(cardHTMLId);
    }
});
      










