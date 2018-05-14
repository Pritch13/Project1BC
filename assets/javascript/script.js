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
    
    // News API
    var queryURL = 'https://newsapi.org/v2/everything?q=' + countrySelected + '+health&apiKey=a02ec7dfecc14603a47ac925d2dd0335';

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      

      $('#test4').append('<h5 >' + response.articles[0].title + '.</h5> <p>' + response.articles[0].description +  '</p>' + '<a href ="' + response.articles[0].url +'">Learn more...</a><hr>' );
      $('#test4').append('<h5 >' + response.articles[1].title + '.</h5> <p>' + response.articles[1].description +  '</p>'+ '<a href ="' + response.articles[1].url +'">Learn more...</a><hr>' );
      $('#test4').append('<h5 >' + response.articles[2].title + '.</h5> <p>' + response.articles[2].description +  '</p>'+ '<a href ="' + response.articles[2].url +'">Learn more...</a><hr>' );

      
    });

  
    // Convert Country Names to Country Code API
    $.ajax({
      url: 'https://restcountries.eu/rest/v2/name/'+ countrySelected ,
      method: "GET",
    }).then(function (data) {
      console.log(data[0].alpha2Code);
      
      var cc = data[0].alpha2Code;

      // Safety/Health API
      $.ajax({
        url: 'https://api.tugo.com/v1/travelsafe/countries/' + cc,
        method: "GET",
        headers: {
          'X-Auth-API-Key': 'wjmegnu9q3afgcrkhjbkxgpx',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (health) {
        console.log(health);

        //Health
        $('#test2').append('<h5 class="title-font">'+health.health.diseasesAndVaccinesInfo.Vaccines[0].category+'</h5><p>'+health.health.diseasesAndVaccinesInfo.Vaccines[0].description+
        '</p><hr><h5>'+health.health.diseasesAndVaccinesInfo.Vaccines[1].category+'</h5>');

        for (i = 2; i < health.health.diseasesAndVaccinesInfo.Vaccines.length; i++){
          console.log(health.health.diseasesAndVaccinesInfo.Vaccines[i].category);
          $('#test2').append('<p>'+health.health.diseasesAndVaccinesInfo.Vaccines[i].category+'</p>')
        }

        

        $('#test2').append('<hr><h5>'+health.health.diseasesAndVaccinesInfo.Insects[0].category+'</h5><p>'+health.health.diseasesAndVaccinesInfo.Insects[0].description+'</p><hr>')
        $('#test2').append('<h5>'+health.health.diseasesAndVaccinesInfo.Malaria[0].category+'</h5><p>'+health.health.diseasesAndVaccinesInfo.Malaria[0].description+'</p><hr>')
        $('#test2').append('<h5>'+health.health.healthInfo[0].category+'</h5> <p>'+health.health.healthInfo[0].description+'</p><hr>')
        

        //Explore
          //Climate Info
        if (health.climate.description == null) {
          $('#test1').append('<h4>Climate Description: </h4>');
          console.log(health.climate.description);
          console.log("hello there, this is null!");
          } else  {
           $('#test1').append('<h4>Climate Description: </h4><p>' + health.climate.description + '</p>');
           console.log("hello there, there is NOT null");
           console.log(health.climate.description)
        }

        for (var i = 0; i < health.climate.climateInfo.length; i++) {
          $('#test1').append('<h5>' + health.climate.climateInfo[i].category + '</h5>');
          $('#test1').append('<p>' + health.climate.climateInfo[i].description + '</p>');
        }

          //Law and Culture Info
        $('#test1').append('<h4>Law and Culture Information: </h4>');

        for (var i = 0; i < health.lawAndCulture.lawAndCultureInfo.length; i++) {
          $('#test1').append('<h5>' + health.lawAndCulture.lawAndCultureInfo[i].category + '</h5>');
          $('#test1').append('<p>' + health.lawAndCulture.lawAndCultureInfo[i].description + '</p>');          
          console.log("hi");
        }

      
        console.log(health.climate.climateInfo);
        console.log(health.lawAndCulture.lawAndCultureInfo);

        

        //Risks
        if (health.hasAdvisoryWarning==false && health.hasRegionalAdvisory==false) {

          $('#advisorClear').text(health.advisoryText + '!');
          $("#advisorWarning").hide();
          $("#advisorCaution").hide();
          $('#test3').append('<p>'+health.advisories.description+'</p>');
          

        }

        else if (health.hasAdvisoryWarning==true && health.hasRegionalAdvisory==true) {
          $('#advisorCaution').text(health.advisoryText + '!');
          $("#advisorClear").hide();
          $("#advisorWarning").hide();
          $('#test3').append('<p>'+health.advisories.description+'</p>');
          
        }

        else  {
          $('#advisorWarning').text(health.advisoryText + '!');
          $("#advisorCaution").hide();
          $("#advisorClear").hide();
          $('#test3').append('<p>'+health.advisories.description+'</p>');
         
        }


        
        

      });
      
    });

  });

});