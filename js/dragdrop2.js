var key = {
    "def1": "6",
    "def2" : "4",
    "def3" : "0",
    "def4" : "2",
    "def5" : "5",
    "def6" : "1",
    "def7" : "3"
};

$(window).on('load', function(){
    $("#nav-placeholder").load("navbar.html");
})  

$(document).ready(function () {

    var box = $(".draggable");
    var mainCanvas = $(".section");

    box.draggable({
        containment: mainCanvas,
        helper: "clone",

        start: function () {
            $(this).css({
                opacity: 0
            });

            $(".draggable").css("z-index", "0");
        },

        stop: function () {
            $(this).css({
                opacity: 1
            });
        }
    });

    box.droppable({
        accept: ".draggable",

        drop: function (event, ui) {
            var draggable = ui.draggable;
            var droppable = $(this);
            
            let dragOffset = draggable.offset().top;
            let dropOffset = droppable.offset().top;

            let dragVal= draggable.attr('val');
            let dropVal = droppable.attr('val');


            droppable.offset({top: dragOffset});
            draggable.offset({top: dropOffset});

            draggable.attr('val', dropVal);
            droppable.attr('val', dragVal);

            sleep(500).then(()=>{

            
                
            if(key[draggable.attr('id')] == draggable.attr('val')){
                draggable.toggleClass('match');
                draggable.draggable('disable');
            }

            if(key[droppable.attr('id')] == droppable.attr('val')){
                droppable.draggable('disable');
                droppable.toggleClass('match');
            }

            sleep(100).then(checkOrder());

            });
        }
    });

});

function checkOrder(){
    let a = $('.def').toArray().map(function (el) {
        console.log(el);
        return $(el).attr('val');
    });
    console.log(a);

    if (arraysEqual(a, ["6","4","0","2","5","1","3"])) $('#popup').modal();
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }