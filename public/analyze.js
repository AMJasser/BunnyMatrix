function structureData() {
    var finalData = [];

    jsonData.forEach(function(entry) {
        var newObject = {};
        newObject.x = new Date(entry.Date);
        newObject.y = parseFloat(entry.Weekly_Sales);
        finalData.push(newObject);
    });

    return finalData;
}

function fixDataAndConfig(finalData, result) {
    var minTime = finalData[0].x.getTime();

    const firstXPoint = (finalData[0].x.getTime() - minTime) / 86400000000;
    const lastXPoint = (finalData[finalData.length - 1].x.getTime() - minTime) / 86400000000;

    const firstYPredict = result.predict(firstXPoint);
    const lastYPredict = result.predict(lastXPoint);

    const lineOfFit = [{
        x: (firstXPoint * 86400000000) + minTime,
        y: firstYPredict[1]
    }, {
        x: (lastXPoint * 86400000000) + minTime,
        y: lastYPredict[1]
    }];

    data = {
        datasets: [
            {
                type: "scatter",
                label: "Scatter Dataset",
                data: finalData,
                backgroundColor: "rgb(255, 99, 132)"
            },
            {
                type: "line",
                label: "Line of Best Fit",
                data: lineOfFit
            }
        ],
    };

    config = {
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        callback: (value, index, values) => {
                            date = new Date(value);
                            return (
                                (date.getMonth() > 8
                                    ? date.getMonth() + 1
                                    : "0" + (date.getMonth() + 1)) +
                                "/" +
                                (date.getDate() > 9
                                    ? date.getDate()
                                    : "0" + date.getDate()) +
                                "/" +
                                date.getFullYear()
                            );
                        },
                    },
                },
            },
        },
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    Chart.defaults.color = "#FFF"
    var myChart = new Chart(ctx, config);
}

function startRegression(data) {
    var fullData = [];
    var minTime = data[0].x.getTime();

    data.forEach(function(entry) {
        var arr = [(entry.x.getTime() - minTime) / 86400000000, entry.y];
        fullData.push(arr);
    });

    console.log(fullData);

    const result = regression.linear(fullData);
    return result;
}

function run() {
    finalData = structureData();
    result = startRegression(finalData);
    fixDataAndConfig(finalData, result);
}