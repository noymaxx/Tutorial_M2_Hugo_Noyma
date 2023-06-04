$(document).ready(function () {
  $(".slider").slick();
});

$(document).ready(function () {
  $(".card").animate(
    {
      width: "350px",
      height: "220px",
    },
    1000
  );
});

$(document).ready(function() {
  $(".fullScreen").click(function() {
    $.ajax({
      url: "foto_perfil.png",
      type: "GET",
      dataType: "text",
      success: function (data) {
        openFullscreen(data);
      },
      error: function (xhr, status, error) {
        console.log("Erro ao carregar a imagem: " + error);
      },
    });
  });
});

function openFullscreen(imageData) {
  console.log("function")
  var imgElement = document.createElement("img");
  imgElement.src = "data:image/png;base64," + imageData;

  document.body.appendChild(imgElement);

  imgElement.style.position = "fixed";
  imgElement.style.top = "0";
  imgElement.style.left = "0";
  imgElement.style.width = "100%";
  imgElement.style.height = "100%";

  imgElement.addEventListener("click", function () {
    console.log("function2");
    document.body.removeChild(imgElement);
  });
}

