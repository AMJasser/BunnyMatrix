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

function manipulateTime(time, minTime) {
    return (time - minTime) / 86400000000;
}

function revManTime(time, minTime) {
    return (time * 86400000000) + minTime;
}

function startRegression(data) {
    var fullData = [];
    var minTime = data[0].x.getTime();

    data.forEach(function(entry) {
        var arr = [manipulateTime(entry.x.getTime(), minTime), entry.y];
        fullData.push(arr);
    });

    const result = regression.polynomial(fullData, {order: 7});
    return result;
}

function fixDataAndConfig(finalData, result) {
    var minTime = finalData[0].x.getTime();

    const firstXPoint = manipulateTime(finalData[0].x.getTime(), minTime);
    const lastXPoint = manipulateTime(finalData[finalData.length - 1].x.getTime(), minTime);

    console.log(lastXPoint);

    const firstYPredict = result.predict(firstXPoint);
    const lastYPredict = result.predict(lastXPoint);

    const lineOfFitOriginal = [{
        x: revManTime(firstXPoint, minTime),
        y: firstYPredict[1]
    }, {
        x: revManTime(lastXPoint, minTime),
        y: lastYPredict[1]
    }];

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
                backgroundColor: "rgb(255, 99, 132)"
            },
            {
                type: "line",
                label: "Line of Best Fit",
                data: lineOfFit,
                backgroundColor: "rgb(255, 255, 132)",
                borderColor: "rgb(255, 255, 132)"
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

function run() {
    finalData = structureData();
    result = startRegression(finalData);
    fixDataAndConfig(finalData, result);
}