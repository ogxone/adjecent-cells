$(document).ready(function () {
  $("#generate-cells-btn").click(function () {
    let btn = this;
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
});

function drawBoard(data) {
  let contentPane = $("#content-pane");
  contentPane.empty();

  let board = $("<table></table>");

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
