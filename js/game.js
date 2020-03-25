const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let count = 0;

$("#button-reload").hide();


function round() {
    // FIXME: надо бы убрать "target" прежде чем искать новый
    $('.target').removeClass("target");

    let divSelector = randomDivId();
    $(divSelector).addClass("target");
    // TODO: помечать target текущим номером
    $(divSelector).text(hits + 1);
    // FIXME: тут надо определять при первом клике firstHitTime
    if (hits === 0) {
        firstHitTime = getTimestamp();
    }
    if (hits === maxHits) {
        $('.target').text("");
        $('.target').removeClass("target");
        endGame();
    }
}

function endGame() {
    // FIXME: спрятать игровое поле сначала
    $('.game-field').hide(2000);
    $("#button-reload").show();
    $("#button-start").hide();
    
    let totalPlayedMiss = Number(count);
    $("#total-count-click").text(totalPlayedMiss);

    
    let totalPlayedMillis = getTimestamp() - firstHitTime;
    let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
    $("#total-time-played").text(totalPlayedSeconds);
    $("#win-message").removeClass("d-none");
}

function handleClick(event) {
    // FIXME: убирать текст со старых таргетов. Кажется есть .text?
    $(event.target).text("");
    $('.miss').removeClass("miss");

    if ($(event.target).hasClass("target")) {
        hits = hits + 1;
        
        round();
    } else {

        ($(event.target).addClass("miss"));
         count = count + 1;
        // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss

    }
}

$('#button-start').bind('click', init);
    function init() {
    // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
    round();
    $(".game-field").click(handleClick);
    $("#button-reload").hide();
    $("#button-reload").click(function () {
        location.reload()
    });
    $("#button-start").click(function () {
        location.reload();
    });
}

$(document).ready()
