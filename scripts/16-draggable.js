$(function () {

//    iframe resizeable
    $(".resizable").resizable({
		handles: {
        'nw': '#nwgrip',
        'ne': '#negrip',
        'sw': '#swgrip',
        'se': '#segrip',
        'n': '#ngrip',
        'e': '#egrip',
        's': '#sgrip',
        'w': '#wgrip'
    }
    });
       $(".draggable").draggable({ snap: "#text-area" , containment: "#text-area", scroll: false, handle: "#dragHandle"  });
})
