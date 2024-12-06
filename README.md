# Data Visualization & Information Aesthetics - Fall 2024 - Final Project

Data Visualization MS at Parsons School of Design

### Building a Database: EPA Superfund Site Data

The EPA makes Superfund data publicly available on their website, but it’s spread across multiple formats so it difficult to analyze the data holistically. The aim of this project is to connect all of the data in a central dataset to make it more accessible. Many articles and visualizations map the location of the superfund sites and the status of the site, but usually not the media and contaminants of that site, possibly since the data is separate. Additionally, a number of sites are classified as a Native American Entity, but that field is also difficult to retrieve and seemingly less discussed.

**Method:**

- Scraped table data from the EPA Superfund website using Playwright and Pandas in Python [source](https://cumulis.epa.gov/supercpad/Cursites/srchsites.cfm)
- Converted PDF table data from the EPA Superfund website to CSVs using Adobe and cleaned the data in Pandas [source](https://www.epa.gov/superfund/superfund-data-and-reports)
- Sourced CSV data from the EPA Superfund website and joined and cleaned the data in Pandas [source](https://www.epa.gov/superfund/superfund-data-and-reports)
- Created basic visualizations of the data using Pandas and Matplotlib
- Created a basic map visualization of the data in JS using Leaflet
