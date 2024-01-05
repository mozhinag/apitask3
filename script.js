document.addEventListener("DOMContentLoaded", function () {
    fetch("https://coronavirus.m.pipedream.net/")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            displayDataInTable(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});

function displayDataInTable(data) {
    var rawDataArray = Array.isArray(data.rawData) ? data.rawData : [];

    var tableContainer = document.getElementById("dataCards");

    var table = document.createElement("table");
    table.className = "table";

    var tableHeader = document.createElement("thead");
    tableHeader.innerHTML = `
        <tr>
            <th>Country Region</th>
            <th>Confirmed</th>
            <th>Deaths</th>
            <th>Recovered</th>
            <th>Case Fatality Ratio</th>
            <th>Incident Rate</th>
            <th>Last Update</th>
            <th>Latitude</th>
            <th>Longitude</th>
        </tr>
    `;
    table.appendChild(tableHeader);

    var tableBody = document.createElement("tbody");

    // Keep track of unique places
    var uniquePlaces = {};

    for (var i = 0; i < rawDataArray.length; i++) {
        var place = rawDataArray[i].Country_Region;

        // Display only the first occurrence for each place
        if (!uniquePlaces[place]) {
            var row = tableBody.insertRow();

            var cellCountryRegion = row.insertCell(0);
            cellCountryRegion.innerHTML = rawDataArray[i].Country_Region;

            var cellConfirmed = row.insertCell(1);
            cellConfirmed.innerHTML = rawDataArray[i].Confirmed;

            var cellDeaths = row.insertCell(2);
            cellDeaths.innerHTML = rawDataArray[i].Deaths;

            var cellRecovered = row.insertCell(3);
            cellRecovered.innerHTML = rawDataArray[i].Recovered;

            var cellCaseFatalityRatio = row.insertCell(4);
            cellCaseFatalityRatio.innerHTML = rawDataArray[i].Case_Fatality_Ratio;

            var cellIncidentRate = row.insertCell(5);
            cellIncidentRate.innerHTML = rawDataArray[i].Incident_Rate;

            var cellLastUpdate = row.insertCell(6);
            cellLastUpdate.innerHTML = rawDataArray[i].Last_Update;

            var cellLatitude = row.insertCell(7);
            cellLatitude.innerHTML = rawDataArray[i].Lat;

            var cellLongitude = row.insertCell(8);
            cellLongitude.innerHTML = rawDataArray[i].Long_;

            // Mark the place as displayed
            uniquePlaces[place] = true;
        }
    }

    table.appendChild(tableBody);
    tableContainer.appendChild(table);
}
