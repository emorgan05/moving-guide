
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
        'q': cityStr,
        'fl': "web_url,snippet,headline"
    });

    $.getJSON( nytUrl, function( data ) {
        results = data.response.docs;

        for(var i in results) {
            var result = results[i];
            $('.article-list').append("<li class='article'><a href='" + result.web_url + "'>" + result.headline.main + "</a>" + "<p>" + result.snippet + "</p></li>");
        };
    }).error(function(e) {
            $nytHeaderElem.text("New York Times articles could not be loaded");
    });

    
    

    return false;
};

$('#form-container').submit(loadData);
