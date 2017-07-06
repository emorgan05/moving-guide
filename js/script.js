
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ", " + cityStr;
    $greeting.text = "So you want to live at " + address + "?";

    var streetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+ address +'&fov=110&heading=90&pitch=0&key=AIzaSyBCUxEmIDnG2aQzwyJbu8d5qsP7BRU74Mk';

    $body.append('<img class="bgimg" src="'+streetViewUrl+'"/>');

    // load New York Times Articles
    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytUrl += '?' + $.param({
        'api-key': "c95058c8a60a42c5b9c063e4901717a2",
        'q': address
    });

    $.getJSON( nytUrl, function( data ) {
        var articles = [];
        $.each(data, function())
        console.log(data);
        /*
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
        });
 
        $( "<ul/>", {
            "class": "article-list",
            html: items.join( "" )
        }).appendTo( "$nytElem" );
*/
    });

    return false;
};

$('#form-container').submit(loadData);
