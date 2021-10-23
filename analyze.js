var revenue_CI = [13700, 18100]
var profit_CI = [1060, 1620]
var employees_CI = [28900, 40300]
var market_cap_CI = [26300, 42700]

function analyze() {
    var revenue = document.getElementById("revenue").value;
    var profit = document.getElementById("profit").value;
    var employees = document.getElementById("employees").value;
    var market_cap = document.getElementById("market_cap").value;

    var success = 0;
    if (revenue != "" && withinRange(revenue, revenue_CI)) {
        success += 25;
    }
    if (revenue != "" && withinRange(profit, profit_CI)) {
        success += 25;
    }
    if (withinRange(employees, employees_CI)) {
        success += 25;
    }
    if (withinRange(market_cap, market_cap_CI)) {
        success += 25;
    }

    console.log("bob");
}

function withinRange(value, list) {
    if (value >= list[0] && value <= list[1]) {
        return true;
    } else {
        return false;
    }
}