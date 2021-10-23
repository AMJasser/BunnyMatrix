var csvParsed = [];

// data processing to make referecing values in dataset easier
function dataPreprocessor(row) {
    // function to convert string to date
    //var parseTime = d3.timeParse("%B %d, %Y");
    //parseTime("June 30, 2015"); // Tue Jun 30 2015 00:00:00 GMT-0700 (PDT)

    //Citation: https://github.com/d3/d3-time-format

    var parseDate = d3.timeParse("%m/%d/%Y");

    return {
        date: parseDate(row["Date"]),
        weekly_sales: +row["Weekly_Sales"],
        isHoliday: row["IsHoliday"],
    };
}

var data;

var config;

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content)], {
        type: contentType,
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
//download(dummyData, "json.txt", "text/plain");

window.onload = function () {
    d3.csv("./datasets/walmart/short_walmart.csv", dataPreprocessor).then(
        function (dataset) {
            for (let i = 0; i < dataset.length; i++) {
                dict = {};
                dict["x"] = dataset[i].date;
                dict["y"] = dataset[i].weekly_sales;
                csvParsed.push(dict);
            }
            run();
        }
    );
};

function fixDataAndConfig() {
    data = {
        datasets: [
            {
                label: "Scatter Dataset",
                data: csvParsed,
                backgroundColor: "rgb(255, 99, 132)",
            },
        ],
    };

    config = {
        type: "scatter",
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
} 

function run() {
    console.log("Hello");
    fixDataAndConfig();

    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, config);
}
