var tabCount = 0;

$(document).ready(function () {
    //Function to update slider labels and generate the table
    function updateTable() {
        $("#start-row-value").text($("#start-row").val());
        $("#end-row-value").text($("#end-row").val());
        $("#start-column-value").text($("#start-column").val());
        $("#end-column-value").text($("#end-column").val());

        //Generate the table for the active tab
        generateTable();
    }

    //Initialize tabs
    $("#tabs").tabs();

    //Create the first tab
    createTab();

    //Attach slider listeners
    $("#start-row, #end-row, #start-column, #end-column").on("input", updateTable);

    //Add event listener for "Add Tab" button
    $("#add-tab").on("click", function () {
        createTab();
    });

    //Event listener for deleting tabs
    $("#tabs-ul").on("click", ".delete-tab", function () {
        const tabId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + tabId).remove();
        $("#tabs").tabs("refresh");
    });
});

function createTab() {
    tabCount++;
    const tabId = `tab-${tabCount}`;
    const tabTitle = `Table ${tabCount}`;

    //Add new tab header
    $("#tabs-ul").append(`
        <li>
            <a href="#${tabId}">${tabTitle}</a>
            <button class="delete-tab">x</button>
        </li>
    `);

    //Add new tab content container
    $("#tabs").append(`<div id="${tabId}" class="table-container"></div>`);

    //Refresh tabs
    $("#tabs").tabs("refresh");

    //Switch to the new tab
    $("#tabs").tabs("option", "active", $("#tabs-ul li").length - 1);

    //Generate initial table
    generateTable();
}

function generateTable() {
    const startRow = parseInt($("#start-row").val());
    const endRow = parseInt($("#end-row").val());
    const startColumn = parseInt($("#start-column").val());
    const endColumn = parseInt($("#end-column").val());

    const activeTabId = $("#tabs").tabs("option", "active");
    const $container = $(`#tabs > div`).eq(activeTabId);

    $container.empty(); //Clear previous content

    //Create a scrollable container for the table
    const $scrollContainer = $("<div></div>").addClass("scroll-container");

    const rowMin = Math.min(startRow, endRow);
    const rowMax = Math.max(startRow, endRow);
    const columnMin = Math.min(startColumn, endColumn);
    const columnMax = Math.max(startColumn, endColumn);

    const $table = $("<table></table>");
    const $headerRow = $("<tr></tr>").append("<th></th>");

    for (let j = columnMin; j <= columnMax; j++) {
        $headerRow.append($("<th></th>").text(j));
    }
    $table.append($headerRow);

    for (let i = rowMin; i <= rowMax; i++) {
        const $row = $("<tr></tr>");
        $row.append($("<th></th>").text(i));
        for (let j = columnMin; j <= columnMax; j++) {
            $row.append($("<td></td>").text(i * j));
        }
        $table.append($row);
    }

    $scrollContainer.append($table); //Add table to the scrollable container
    $container.append($scrollContainer); //Add the container to the tab
}

