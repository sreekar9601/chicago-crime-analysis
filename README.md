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




