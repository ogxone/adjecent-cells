$(document).ready(function () {
  $("#generate-cells-btn").click(function () {
    $.ajax({
      type: "POST",
      url: "/api/generate-board/",
      data: JSON.stringify({
        xDim: parseInt($("#x-dim-input").val()),
        yDim: parseInt($("#y-dim-input").val()),
      }),
      dataType: "json",
      contentType: "application/json",
      success: (data) => {
        $("#generate-cells-modal").modal("hide");
        drawBoard(data);
      },
      error: (err) => {
        alert(JSON.stringify(err));
      },
    });
  });

  $("#find-biggest-contiguous-area-btn").click(function () {
    $.ajax({
      type: "POST",
      url: "/api/find-adjecent-cells/",
      data: $("#content-pane > table").first().attr("data-board"),
      dataType: "json",
      contentType: "application/json",
      success: (data) => {
        drawBiggestAdjacentArea(data);
      },
      error: (err) => {
        alert(JSON.stringify(err));
      },
    });
  });
});

function drawBoard(data) {
  $("#find-biggest-contiguous-area-btn").removeClass("disabled");

  let contentPane = $("#content-pane");
  contentPane.empty();

  let board = $("<table></table>");
  board.attr("data-board", JSON.stringify(data));

  for (let row of data?.["cells"] ?? []) {
    let boardRow = $("<tr></tr>");
    for (let cell of row) {
      let boardCell = $("<td></td>");
      boardCell.attr("data-position", `${cell.position.x}_${cell.position.y}`);
      boardCell.css({
        "background-color": cell.color,
        width: "30px",
        height: "30px",
      });
      boardRow.append(boardCell);
    }
    board.append(boardRow);
  }

  contentPane.append(board);
}

function drawBiggestAdjacentArea(adjecentCells) {
  $("#content-pane td").css('opacity', 0.2);

  let cells = adjecentCells?.cells ?? []

  for (let cell of cells) {
      let td = $(`#content-pane td[data-position=${cell.position.x}_${cell.position.y}]`).first()
      td.css('opacity', 1.0)
  }
}
