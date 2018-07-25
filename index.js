var title = $(".title-input").val();
var task = $(".task-input").val();
var numCards = 0;
var quality = "swill";

$(".save-btn").on("click", saveCard);
$(".bottom-box").on("click", deleteTask);

$(window).on("load", retrieveLocalStorage);

function saveCard(event) {
  event.preventDefault();
  if ($(".title-input").val() === "" || $(".task-input").val() === "") {
    return;
  }
  var card = new Card($(".title-input").val(), $(".task-input").val());
  addToPage(card);
  localStoreCard(card);
  $("form")[0].reset();
}

function addToPage(card) {
  $(".bottom-box").prepend(`<div id="${card.id}"class="card-container">
                                <h2 class="title-of-card">${card.title}</h2>
                                <button class="delete-button"></button>
                                <p class="task-of-card">${card.task}</p>
                                <button class="upvote"></button>
                                <button class="downvote"></button>
                                <p class="quality">quality: <span class="quality">${
                                  card.quality
                                }</span></p>
                              </div>`);
}

function Card(title, task) {
  this.id = $.now();
  this.title = title;
  this.task = task;
  this.quality = quality || "swill";
}

function localStoreCard(card) {
  var cardString = JSON.stringify(card);
  localStorage.setItem(card.id, cardString);
}

function retrieveLocalStorage() {
  Object.keys(localStorage).forEach(function(key) {
    var retrievedKey = localStorage.getItem(key);
    var storedCard = JSON.parse(retrievedKey);
    addToPage(storedCard);
  });
}

$(".bottom-box").on("click", function(event) {
  var currentQuality = $($(event.target).siblings("p.quality").children()[0]).text().trim();
  var quality;
  var card = Card(title, task, quality);
  if (event.target.className === "upvote") {
    upvoteFunctionality(currentQuality);
    localStoreCard(card);
  } else if (event.target.className === "downvote") {
    downvoteFunctionality(currentQuality);
    localStoreCard(card);
  }
});

function downvoteFunctionality(currentQuality) {
  if (currentQuality === "plausible") {
    quality = "swill";
    $($(event.target).siblings("p.quality").children()[0]).text(quality);
  } else if (currentQuality === "genius") {
    quality = "plausible";
    $($(event.target).siblings("p.quality").children()[0]).text(quality);
  } else if (currentQuality === "swill") {
    quality = "swill";$($(event.target).siblings("p.quality").children()[0]).text(quality);
  }
}

function upvoteFunctionality(currentQuality) {
  if (currentQuality === "plausible") {
    quality = "genius";$($(event.target).siblings("p.quality").children()[0]).text(quality);
  } else if (currentQuality === "swill") {
    quality = "plausible";
    $($(event.target).siblings("p.quality").children()[0]).text(quality);
  } else if (currentQuality === "genius") {
    quality = "genius";$($(event.target).siblings("p.quality").children()[0]).text(quality);
  }
}

function deleteTask(e) {
  console.log(e)
  if ($(e.target).hasClass('.delete-button')) {
    $(e.target).parentElement().remove();
    removeFromStorage(e);
  }
}

function removeFromStorage(obj) {
  console.log(currentTarget.childNodes[0])
    cardId = obj.currentTarget.childNodes[0]
    for(var key in localStorage) {
      if(key === cardId) {
        localStorage.removeItem(key)
      }
    }
}

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
