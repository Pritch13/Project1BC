function loader() {
  $('.loading-screen').hide();
}

function info() {
  $('.info').fadeIn(900);
}




$(document).ready(function () {

  $('.tabs').tabs();

  $('select').formSelect();

  $('.loading-screen').hide();
  $('.info').hide();

  $('.submit-button').on('click', function () {
    $('.welcome-screen').fadeOut(600);
    $('.loading-screen').fadeIn(600);
    setTimeout(loader, 4000);
    setInterval(info, 4000);
    var countrySelected = $('#options').val();

    $('.country-selection').text(countrySelected + '.');


    var queryURL = 'https://newsapi.org/v2/everything?q=' + countrySelected + '+health&apiKey=a02ec7dfecc14603a47ac925d2dd0335';

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
        $('#test4').append('<h3 >'+response.articles[0].title+'.</h3> <br> <p id="testtitle">'+response.articles[0].description+'</p>');
        $('#test4').append('<h3 >'+response.articles[1].title+'.</h3> <br> <p id="testtitle">'+response.articles[1].description+'</p>');
        $('#test4').append('<h3 >'+response.articles[2].title+'.</h3> <br> <p id="testtitle">'+response.articles[2].description+'</p>');
      });

      var secondURL = 'https://www.reisewarnung.net/api?country=';

      $.ajax({
        url: secondURL,
        method: "GET"
      }).then(function(response){
        console.log(response);
        });


  });

});




