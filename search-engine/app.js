const encodeParameters = function(params) {
    const strArray = [];
    for(const key in params) {
        if(params.hasOwnProperty(key)) {
            const paramString = encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
            strArray.push(paramString);
        }
    };
    return strArray.join("&");
};

function getInfo(keyword) {
    const query = keyword;
    const parameters = {
        format: "json",
        formatversion: 2,
        action: "query",
        prop: "extracts",
        titles: query,
        indexpageids: "",
        redirects: "",
    };

    const base_url = "https://en.wikipedia.org/w/api.php";
    const query_url = base_url + '?' + encodeParameters(parameters);

    $('#mask').show();
    $.getJSON(query_url+"&callback=?",function(json) {

        $('#search_tip').html('Search word: ' + keyword);

        if (json.query && json.query.pages && json.query.pages[0] && json.query.pages[0].extract) {
            $('#search_result').html(json.query.pages[0].extract);
        } else {
            $('#search_result').html('No data in wikipedia about ' + keyword);
        };

        $('#mask').hide();
    });
};

$(function() {
    $('#search_button').click(function() {
        const query = $.trim($('#search_word').val());
        getInfo(query);
    });
});