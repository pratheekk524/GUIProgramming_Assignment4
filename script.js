$(document).ready(function () {
    //Function to update slider labels and generate the table
    function updateTable() {
        //Update displayed slider values
        $("#start-row-value").text($("#start-row").val());
        $("#end-row-value").text($("#end-row").val());
        $("#start-column-value").text($("#start-column").val());
        $("#end-column-value").text($("#end-column").val());

        //Generate the table
        generateTable();
    }

    //Attach event listeners to all sliders
    $("#start-row, #end-row, #start-column, #end-column").on("input", updateTable);

});

function generateTable() {
    //Get slider values
    const startRow = parseInt($("#start-row").val());
    const endRow = parseInt($("#end-row").val());
    const startColumn = parseInt($("#start-column").val());
    const endColumn = parseInt($("#end-column").val());
    const $container = $("#table-container");

    //Clear previous table
    $container.empty();

    //Adjust the ranges
    const rowMin = Math.min(startRow, endRow);
    const rowMax = Math.max(startRow, endRow);
    const columnMin = Math.min(startColumn, endColumn);
    const columnMax = Math.max(startColumn, endColumn);

    //Create the table
    const $table = $("<table></table>");

    //Create header row
    const $headerRow = $("<tr></tr>");
    $headerRow.append("<th></th>"); //Empty top-left corner cell
    for (let j = columnMin; j <= columnMax; j++) {
        $headerRow.append($("<th></th>").text(j));
    }
    $table.append($headerRow);

    //Create table rows
    for (let i = rowMin; i <= rowMax; i++) {
        const $row = $("<tr></tr>");
        $row.append($("<th></th>").text(i)); //Row label
        for (let j = columnMin; j <= columnMax; j++) {
            $row.append($("<td></td>").text(i * j));
        }
        $table.append($row);
    }

    //Append table to container
    $container.append($table);
}
