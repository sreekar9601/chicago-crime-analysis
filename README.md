# Chicago Crime Analysis

## Overview
The **Chicago Crime Analysis** project is a data visualization and analysis tool for understanding crime patterns in Chicago. It leverages a tech stack designed for efficient data processing, interactive frontend development, and geographic visualizations.

### Tech Stack
- **Scala**: For data cleaning and preprocessing.
- **ReactJS**: For building a dynamic and responsive frontend.
- **Leaflet.js**: For map-based visualizations of crime data.
- **Node.js**: For creating a robust backend API.
- **PostgreSQL**: For data storage and management.

---

## Features
- Interactive crime data visualization on maps.
- Year-wise filtering and analysis of crime types.
- Lightweight and scalable architecture.

---

## Prerequisites
1. **PostgreSQL** installed and configured.
2. **Node.js** and **npm** installed.
3. Clone this repository to your local machine.

---

## Setup Instructions


### Step 1: Database Setup
1. Create a PostgreSQL database named `crime`:
  
   CREATE DATABASE crime;


The specifications of the table are as follows:
id: BIGINT (Primary Key)
primary_type: VARCHAR(100)
latitude: DOUBLE PRECISION
longitude: DOUBLE PRECISION
year: INT

In addition to the `crime` database, another database table needs to be created in PostgreSQL for storing neighborhood-related data. Use the following schema:

- **Table Name**: `neighborhoods`
- **Columns**:
  - `id`: INTEGER (Primary Key)
  - `pri_neigh`: VARCHAR(255) - Primary neighborhood name
  - `sec_neigh`: VARCHAR(255) - Secondary neighborhood name
  - `shape_area`: DOUBLE PRECISION - Area of the neighborhood
  - `shape_len`: DOUBLE PRECISION - Perimeter length of the neighborhood
  - `geom`: GEOMETRY - Geometric data for spatial analysis

### Database Population
To populate the databases with the required data:

1. **Fill the `crime` database**:  
   Run the following Scala file:  
   `chicago-crime-analysis\src\main\scala\com\example\spark\CrimeAnalysis.scala`

2. **Fill the `neighborhoods` table**:  
   Run the following Scala file:  
   `src\main\scala\com\example\spark\NeighborhoodsToPostgres.scala`



### Step 2: Backend Setup
1. Navigate to the backend folder of the project.
2. Start the backend server by running:
   ```bash
   node index.js
### Step 3: Frontend Setup
1. Navigate to the `web-app` folder of the project.
2. Install dependencies:
   ```bash
   npm install


3. Run the frontend using the command
   ```bash
   npm start

### Step 4: Access the Application
1. Open your browser and navigate to `http://localhost:3000`.
2. Explore the Chicago Crime Analysis tool.



---

## Group Information

**Group Name**: Interactive Crime Analytics Dashboard Team  
**Group Number**: 7  

### Members:
1. **Huy Tran**  
   - Computer Science and Engineering, University of California, Riverside  
   - Student ID: 862465460  
   - Email: qtran050@ucr.edu  

2. **Vidit Naik**  
   - Computer Science and Engineering, University of California, Riverside  
   - Student ID: 862466760  
   - Email: vnaik007@ucr.edu  

3. **Sai Sreekar Sarvepalli**  
   - Computer Science and Engineering, University of California, Riverside  
   - Student ID: 862466297  
   - Email: ssarv003@ucr.edu  

4. **Vatsal Abhani**  
   - Computer Science and Engineering, University of California, Riverside  
   - Student ID: 862468321  
   - Email: vabha001@ucr.edu  

5. **Sruthi Suresh**  
   - Computer Science and Engineering, University of California, Riverside  
   - Student ID: 862465895  
   - Email: ssure040@ucr.edu  

---

## Author Contributions

### General Contributions
All team members actively participated in brainstorming, discussions, and decision-making throughout the project. Here is a summary of major contributions for specific milestones:

1. **Data Collection and Exploration**  
   - All team members explored public crime datasets, selecting the UCR STAR Chicago Crimes dataset and Chicago Data Portal - Boundaries - Neighborhoods dataset.  
   - **Sai Sreekar Sarvepalli**: Led data preparation for ingestion into PostgreSQL and ensured compatibility with Apache Spark.

2. **Literature Survey**  
   - Reviewed research papers and investigated tools.  
   - **Sruthi Suresh**: Organized and formatted the final literature survey document.

3. **Database Setup and Backend Development**  
   - **Vidit Naik**: Configured PostgreSQL with PostGIS for spatial data storage and querying.  
   - **Vatsal Abhani**: Set up the Node.js backend, built APIs, and ensured seamless integration between SparkSQL and PostgreSQL.

4. **Data Cleaning and Preprocessing**  
   - **Huy Tran**: Led data cleaning using Apache Spark, removing duplicates, handling missing values, and structuring data.

5. **Geospatial Visualization and Analysis**  
   - **Sai Sreekar Sarvepalli**: Integrated Leaflet.js with React for geospatial visualizations, such as crime hotspot maps.  
   - **Huy Tran**: Set up spatial queries in PostgreSQL using PostGIS for real-time data filtering.

6. **Frontend Development**  
   - **Vidit Naik**: Led React.js frontend development for an intuitive user interface.  
   - **Sruthi Suresh**: Designed custom CSS for styling and integrated interactive components using React.js and Leaflet.js.  
   - All members contributed to designing and testing UI components, including filters, maps, and panels.

7. **Documentation and Report**  
   - **Vatsal Abhani**: Led report formatting, ensuring adherence to guidelines and the inclusion of diagrams and results.  
   - All members summarized their work and insights for the final documentation.

---

