$(document).ready(function () {
    $("#numForm").validate({
        rules: {
            "start-row": {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            "end-row": {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            "start-column": {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            "end-column": {
                required: true,
                number: true,
                min: -50,
                max: 50
            }
        },
        messages: {
            "start-row": {
                required: "Please enter a start row value",
                number: "Please enter a valid number",
                min: "Value must be at least -50",
                max: "Value must be at most 50"
            },
            "end-row": {
                required: "Please enter an end row value",
                number: "Please enter a valid number",
                min: "Value must be at least -50",
                max: "Value must be at most 50"
            },
            "start-column": {
                required: "Please enter a start column value",
                number: "Please enter a valid number",
                min: "Value must be at least -50",
                max: "Value must be at most 50"
            },
            "end-column": {
                required: "Please enter an end column value",
                number: "Please enter a valid number",
                min: "Value must be at least -50",
                max: "Value must be at most 50"
            }
        },
        submitHandler: function (form) {
            console.log("submitHandler triggered");
            generateTable();
            return false;
        }
    });
});


function generateTable() {

    console.log("generateTable called");

    //Values for the start and end of rows and columns
    const startRow = parseInt(document.getElementById("start-row").value);
    const endRow = parseInt(document.getElementById("end-row").value);
    const startColumn = parseInt(document.getElementById("start-column").value);
    const endColumn = parseInt(document.getElementById("end-column").value);
    const container = document.getElementById("table-container");

    //Clear previous table
    container.innerHTML = "";

    //Validate inputs
    if ((isNaN(startRow) || isNaN(endRow) || isNaN(startColumn) || isNaN(endColumn)) 
        || startColumn > 50 || startColumn < -50 || endColumn > 50 || endColumn < -50
                || startRow > 50 || startRow < -50 || endRow > 50 || endRow < -50) {
        container.innerHTML = "<p>Please enter valid numbers for all fields.</p>";
        return;
    }

    //Adjust the ranges to ensure they go from lower to higher regardless of input order
    const rowMin = Math.min(startRow, endRow);
    const rowMax = Math.max(startRow, endRow);
    const columnMin = Math.min(startColumn, endColumn);
    const columnMax = Math.max(startColumn, endColumn);

    //Create a table element
    const table = document.createElement("table");

    //Create table header row
    const headerRow = document.createElement("tr");
    const emptyHeader = document.createElement("th");
    headerRow.appendChild(emptyHeader); //Empty top-left corner cell

    for (let j = columnMin; j <= columnMax; j++) {
        const th = document.createElement("th");
        th.textContent = j;
        headerRow.appendChild(th); 
    }
    table.appendChild(headerRow);

    //Create table rows
    for (let i = rowMin; i <= rowMax; i++) {
        const row = document.createElement("tr");

        //Create the first cell for row labels
        const rowHeader = document.createElement("th");
        rowHeader.textContent = i;
        row.appendChild(rowHeader);

        //Create cells for multiplication results
        for (let j = columnMin; j <= columnMax; j++) {
            const cell = document.createElement("td");
            cell.textContent = i * j; //Multiplication done here
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    //Append the table to the container
    container.appendChild(table);
}

