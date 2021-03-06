window.onload = function () {
    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();
    
    if(mes <= 9) {
      mes = `0${mes}`;
    }
    if(dia <= 9) {
      dia = `0${dia}`;
    }
    
    let calendario = `${ano}-${mes}-${dia}`;
    $('#data').val(calendario);
    apod();
  }
  
  $('#submit').click(function (event) {
    event.preventDefault();
    apod();
  })
  
  function apod () {
      const data = $('#data').val();
      const titulo = $('#titulo-img-video');
      const img = $('#img');
      const video = $('#video');
      const descricao = $('#descricao');
      const copy = $('#copy');
  
      $.ajax({url:`https://api.nasa.gov/planetary/apod?api_key=fbsykoUkJoV39rRlbPttDGaynD06twqc86wYSQK1&date=${data}`,
  
        success: function (pesquisa) {
  
          titulo.text(pesquisa.title);
          
          descricao.text(pesquisa.explanation);
  
          if (pesquisa.copyright !== undefined) {
            copy.text(`Copyright © ${pesquisa.copyright}`);
          } else {
            copy.text('No author');
          }
  
          if (pesquisa.media_type == "image") {
            img.attr("src", pesquisa.url);
            img.css("display", "block");
            video.css("display", "none");
            descricao.css("display", "block");
            copy.css("display", "block");
          } else {
            video.attr("src", pesquisa.url);
            img.css("display", "none");
            video.css("display", "block");
            descricao.css("display", "block");
            copy.css("display", "block");
          }
  
          return pesquisa;
        },
  
        error: function () {
          titulo.text(`Invalid Date`);
          img.css("display", "none");
          video.css("display", "none");
          descricao.css("display", "none");
          copy.css("display", "none");
        },
      });
    };