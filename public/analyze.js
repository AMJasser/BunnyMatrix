var minTime;
var finalResult;
var myChart;

function structureData() {
    var finalData = [];

    jsonData.forEach(function (entry) {
        var newObject = {};
        newObject.x = new Date(entry.Date);
        newObject.y = parseFloat(entry.Weekly_Sales);
        finalData.push(newObject);
    });

    return finalData;
}

function manipulateTime(time, minTime) {
    return (time - minTime) / 86400000000;
}

function revManTime(time, minTime) {
    return time * 86400000000 + minTime;
}

function startRegression(data) {
    var fullData = [];

    data.forEach(function (entry) {
        var arr = [manipulateTime(entry.x.getTime(), minTime), entry.y];
        fullData.push(arr);
    });

    const result = regression.polynomial(fullData, { order: 7 });
    return result;
}

function fixDataAndConfig(finalData, result) {
    const firstXPoint = manipulateTime(finalData[0].x.getTime(), minTime);
    const lastXPoint = manipulateTime(
        finalData[finalData.length - 1].x.getTime(),
        minTime
    );

    const firstYPredict = result.predict(firstXPoint);
    const lastYPredict = result.predict(lastXPoint);

    const lineOfFitOriginal = [
        {
            x: revManTime(firstXPoint, minTime),
            y: firstYPredict[1],
        },
        {
            x: revManTime(lastXPoint, minTime),
            y: lastYPredict[1],
        },
    ];

    const lineOfFit = [];
    const divisions = 100;
    let time_div = (lastXPoint - firstXPoint) / divisions;

    for (let i = 0; i < divisions; i++) {
        let specific_x = firstXPoint + time_div * i;
        let best_fit_point_dict = {};
        best_fit_point_dict["x"] = revManTime(specific_x, minTime);
        best_fit_point_dict["y"] = result.predict(specific_x)[1];
        lineOfFit.push(best_fit_point_dict);
    }

    data = {
        datasets: [
            {
                type: "scatter",
                label: "Scatter Dataset",
                data: finalData,
                backgroundColor: "rgb(255, 99, 132)",
            },
            {
                type: "line",
                label: "Line of Best Fit",
                data: lineOfFit,
                backgroundColor: "rgb(255, 255, 132)",
                borderColor: "rgb(255, 255, 132)",
            },
        ],
    };

    config = {
        data: data,
        options: {
            responsive: false,
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
                    /*min: new Date("08/01/2010").getTime(),
                    max: new Date("01/01/2011").getTime()*/
                },
            },
        },
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    Chart.defaults.color = "#FFF";
    myChart = new Chart(ctx, config);
}

function run() {
    finalData = structureData();
    minTime = finalData[0].x.getTime();
    finalResult = startRegression(finalData);
    fixDataAndConfig(finalData, finalResult);
}

function userXInput() {
    var input = document.getElementById("xinput");
    var output = document.getElementById("youtput");

    xValue = new Date(input.value).getTime();

    yValue = finalResult.predict(manipulateTime(xValue, minTime));

    output.value = yValue[1];
}

function restrictChart(chart, startDate, endDate) {
    chart.options.scales.x.min = new Date(startDate).getTime();
    chart.options.scales.x.max =  new Date(endDate).getTime();
    chart.update();
}