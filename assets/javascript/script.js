  function loader() {
    $('.loading-screen').hide();
    // $('.info').hide();
  }

  function info() {
    $('.info').fadeIn(800);
  }


  
  
  $(document).ready(function(){

    $('.tabs').tabs();

    $('select').formSelect();

    $('.loading-screen').hide();
    $('.info').hide();

    $('.submit-button').on('click', function(){
      $('.welcome-screen').fadeOut(600);
      $('.loading-screen').fadeIn(600);
      setTimeout(loader, 4000);
      setInterval(info, 4000);
    });

  });



