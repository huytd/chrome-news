var cachedAllNews = JSON.parse(window.localStorage.getItem("allNews"));

function displayData(data) {
  if (data != null) {
    for (var i = 0; i < data.length; i++) {
      $("#lstNews").append("<li><a target='_blank' href='" + data[i]["url"] + "'>" + data[i]["title"] + "</a></li>");
    }
  }
}

function load_news(opt) {
  // This is just the wrapper service to call Reader.one API
  var url = "http://codedaily.vn:4000/all";
  if (opt != "all") {
    url = "http://codedaily.vn:4000/get/" + opt;
  }
  $.ajax({
    url: url,
    method: "GET",
    beforeSend: function() {
      $(".loading").show();
    },
    success: function(data) {
      $("#lstNews li").remove();
      if (opt == "all") {
        window.localStorage.setItem("allNews", JSON.stringify(data));
        cachedAllNews = JSON.parse(window.localStorage.getItem("allNews"));
      } else {
        cachedAllNews = data;
      }
      $(".loading").hide();
      displayData(cachedAllNews);
    }
  })
}

$(function(){
  $(document).ready(function() {
    displayData(cachedAllNews);
    load_news("all");
  });

  $(".nav li").click(function(){
    var opt = $(this).attr("rel");
    load_news(opt);
    $(".nav li").removeClass("active");
    $(".nav li[rel='" + opt + "']").addClass("active");
  });
});
