$(document).ready(function () {
  $("#generate-cells-btn").click(() => {
    $.ajax({
      type: "POST",
      url: "/api/generate-board/",
      data: {xDim: 5, yDim: 5},
      dataType: "json",
      success: (data) => {
        alert(data);
      },
    });
  });
});
