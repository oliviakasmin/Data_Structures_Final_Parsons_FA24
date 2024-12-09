# Data Structures - Parsons Fall 2024 - Final Project

Data Visualization MS at Parsons School of Design

### Building a Database: EPA Superfund Site Data

The EPA makes Superfund data publicly available on their website, but it’s spread across multiple formats so it difficult to analyze the data holistically. The aim of this project is to connect all of the data in a central dataset to make it more accessible. Many articles and visualizations map the location of the superfund sites and the status of the site, but usually not the media and contaminants of that site, possibly since the data is separate. Additionally, a number of sites are classified as a Native American Entity, but that field is also difficult to retrieve and seemingly less discussed.

**Method:**

1. Scraped table data from the EPA Superfund website using Playwright and Pandas in Python [source](https://cumulis.epa.gov/supercpad/Cursites/srchsites.cfm)
2. Converted PDF table data from the EPA Superfund website to CSVs using Adobe and cleaned the data in Pandas [source](https://www.epa.gov/superfund/superfund-data-and-reports)
3. Sourced additional CSV data from the EPA Superfund website and joined and cleaned all of the data in Pandas [source](https://www.epa.gov/superfund/superfund-data-and-reports)
4. Created basic visualizations of the data using Pandas and Matplotlib
5. Created a basic map visualization of the data in JS using Leaflet
<br>  
  
**Basic Map using Leaflet**
<br> 
[Deployed interactive map](https://oliviakasmin.github.io/Data_Structures_Final_Parsons_FA24/)
<br> 
<img width="1495" alt="Screenshot 2024-12-06 at 2 56 30 PM" src="https://github.com/user-attachments/assets/82ee4cd9-9298-41dd-98e4-a2a3b8aa0db2">
<br>  

**Basic Visualizations using Matplotlib**
<br>  
![Screenshot 2024-12-06 at 1 48 17 PM](https://github.com/user-attachments/assets/6ba4c13f-74db-48bb-b9ff-1519f1d540e6)
<br>  
![Screenshot 2024-12-06 at 1 48 27 PM](https://github.com/user-attachments/assets/4d98e983-ef60-489c-9d81-0facc2259985)
<br>  
![Screenshot 2024-12-06 at 1 48 43 PM](https://github.com/user-attachments/assets/85747eb2-e2ba-4bdf-9ff8-9cf7acdb5c63)
<br>  
![Screenshot 2024-12-06 at 1 48 54 PM](https://github.com/user-attachments/assets/78246924-b924-4ca0-b9aa-8291d9bd60eb)
<br>  
![Screenshot 2024-12-06 at 1 49 11 PM](https://github.com/user-attachments/assets/1d0999f2-3687-49ab-bb56-ff53afe3b812)
<br>  
![Screenshot 2024-12-06 at 1 49 21 PM](https://github.com/user-attachments/assets/c56f771f-5e3e-4429-865e-24f5e4596d6c)
