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
console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      $('#test4').append('<h5 >' + response.articles[0].title + '.</h5> <p id="testtitle">' + response.articles[0].description +  '</p>' + '<a href ="' + response.articles[0].url +'">Read more...</a>' );
      $('#test4').append('<h5 >' + response.articles[1].title + '.</h5> <p id="testtitle">' + response.articles[1].description +  '</p>' + '<a href ="' + response.articles[1].url +'">Read more...</a>');
      $('#test4').append('<h5 >' + response.articles[2].title + '.</h5> <p id="testtitle">' + response.articles[2].description +  '</p>' + '<a href ="' + response.articles[2].url +'">Read more...</a>');
    });

    $.ajax({
      url: 'https://restcountries.eu/rest/v2/name/'+ countrySelected ,
      method: "GET",
    }).then(function (data) {
      console.log(data[0].alpha2Code);
      
      var cc = data[0].alpha2Code;



      $.ajax({
        url: 'https://api.tugo.com/v1/travelsafe/countries/' + cc,
        method: "GET",
        headers: {
          'X-Auth-API-Key': 'wjmegnu9q3afgcrkhjbkxgpx',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (health) {
        console.log(health);

        $('#advisor').text(health.advisoryText + '!');
        $('#test3').append('<p>'+health.advisories.description+'</p>');
        $('#test2').append('<h3 class="title-font center">'+health.health.diseasesAndVaccinesInfo.Vaccines[0].category+'</h3><p>'+health.health.diseasesAndVaccinesInfo.Vaccines[0].description+
        '</p><h3 class="center">'+health.health.diseasesAndVaccinesInfo.Vaccines[1].category+'</h3><ul class="centering-ul"><li>'+health.health.diseasesAndVaccinesInfo.Vaccines[2].category+'</li><li>'+health.health.diseasesAndVaccinesInfo.Vaccines[3].category+'</li><li>'
        +health.health.diseasesAndVaccinesInfo.Vaccines[4].category+'</li><li>'+health.health.diseasesAndVaccinesInfo.Vaccines[5].category+'</li><li>'+health.health.diseasesAndVaccinesInfo.Vaccines[6].category+'</li><li>'+health.health.diseasesAndVaccinesInfo.Vaccines[7].category+'</li><li>'+health.health.diseasesAndVaccinesInfo.Vaccines[8].category+'</li><li>'+health.health.diseasesAndVaccinesInfo.Vaccines[9].category+'</li></ul>');

        console.log(health.health.diseasesAndVaccinesInfo.Vaccines[0].category);  
        console.log(health.health.diseasesAndVaccinesInfo.Vaccines[0].description);  

      });
      
    });


  });

});




