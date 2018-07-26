// var title = $(".title-input").val();
// var task = $(".task-input").val();
// var importance = "Normal";

$(".save-btn").on("click", saveCard);
$('.bottom-box').on('click', '.delete-button', deleteTask);
$(window).on("load", retrieveLocalStorage);
$('.bottom-box').on('keyup', '.title-of-card', changeContent)
$('.bottom-box').on('keyup', '.task-of-card', changeContent)

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
                                <h2 class="title-of-card" contenteditable="true">${card.title}</h2>
                                <button class="delete-button"></button>
                                <p class="task-of-card" contenteditable="true">${card.task}</p>
                                <button class="upvote"></button>
                                <button class="downvote"></button>
                                <p class="importance">Importance: <span class="importance">${card.importance}</span>
                                </p>
                              </div>`);
}

function Card(title, task, importance) {
  this.id = $.now();
  this.title = $(".title-input").val();
  this.task = $(".task-input").val();
  this.importance = importance || "Normal";
}

function localStoreCard(card) {
  var cardString = JSON.stringify(card);
  localStorage.setItem(card.id, cardString);
}

function changeContent(e){
  var cardID = $(e.target).parent().attr("id");
  var parsedCard = JSON.parse(localStorage.getItem(cardID));
  if($(e.target).is('.title-of-card')){
    parsedCard.title = $(e.target).text();
  } else if($(e.target).is('.task-of-card')){
    parsedCard.task = $(e.target).text();
  };
  localStorage.setItem(cardID, JSON.stringify(parsedCard))
};

function retrieveLocalStorage() {
  Object.keys(localStorage).forEach(function(key) {
    var retrievedKey = localStorage.getItem(key);
    var storedCard = JSON.parse(retrievedKey);
    addToPage(storedCard);
  });
}

$(".bottom-box").on("click", function(event) {
  var currentImportance = $($(event.target).siblings("p.importance").children()[0]).text().trim();
  // var card = Card(title, task, importance);
  if (event.target.className === "upvote") {
    upvoteFunctionality(currentImportance);
    localStoreCard(card);
  } else if (event.target.className === "downvote") {
    downvoteFunctionality(currentImportance);
    localStoreCard(card);
  }
});

function downvoteFunctionality(currentImportance) {
  if (currentImportance === "High") {
    importance = "Normal";
    $($(event.target).siblings("p.importance").children()[0]).text(importance);
  } else if (currentImportance === "Critical") {
    importance = "High";
    $($(event.target).siblings("p.importance").children()[0]).text(importance);
  } else if (currentImportance === "Normal") {
    importance = "Normal";$($(event.target).siblings("p.importance").children()[0]).text(importance);
  }
}

function upvoteFunctionality(currentImportance) {
  if (currentImportance === "High") {
    importance = "Critical";$($(event.target).siblings("p.importance").children()[0]).text(importance);
  } else if (currentImportance === "Normal") {
    importance = "High";
    $($(event.target).siblings("p.importance").children()[0]).text(importance);
  } else if (currentImportance === "Critical") {
    importance = "Critical";$($(event.target).siblings("p.importance").children()[0]).text(importance);
  }
}

function deleteTask(e) {
  $(e.target).parent().remove();
  var currentTaskId = $(e.target).parent().attr('id');
  localStorage.removeItem(currentTaskId);
}

// var cardHTML = $(event.target).closest('.card-container');
// var cardHTMLId = cardHTML[0].id;
// var cardObjectInJSON = localStorage.getItem(cardHTMLId);
// var cardObjectInJS = JSON.parse(cardObjectInJSON);

// cardObjectInJS.importance = importanceVariable;

// var newCardJSON = JSON.stringify(cardObjectInJS);
// localStorage.setItem(cardHTMLId, newCardJSON);
// cardObjectInJS.importance = importanceVariable;

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
