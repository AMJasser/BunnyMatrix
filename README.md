# BunnyMatrix
BunnyMatrix is a visualization and ML tool for business KPIs. It extracts and visualizes data from a CSV file, then uses polynomial regression analysis to predict future KPI metrics.

Devpost link: https://devpost.com/software/bunnymatrix

## How to Run

This application uses nodejs. Please install it at: [download nodejs](https://nodejs.org/en/download/)

The following steps are done in Command Line.

1.  Clone the Repo
```
git clone https://github.com/AMJasser/BunnyMatrix.git
```

2.  Head Inside the Directory
```
cd BunnyMatrix/
```

3.  Install Packages
```
npm install
```

4.  Make Uploads Folder
> Open the project directory and go inside the "public" directory.
> Make a folder inside public called "uploads"

5.  Run the Server
```
node app.js
```
you should see:
```
Server running in undefined mode on port 5000
```

6.  Open the Website
> head to [localhost:5000](http://localhost:5000/)

7.  Using the Website
> The website will ask you to upload a CSV file. We conveniently provided a CSV file, called "new_walmart.csv", to use in the website. It is in the project directory.

## References
Those interested to emulate this may consult https://www.kaggle.com/c/walmart-recruiting-store-sales-forecasting for an example Walmart sales dataset
