import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._

object CrimeAnalysis {
  def main(args: Array[String]): Unit = {
    // Create Spark Session
    val spark = SparkSession.builder
      .appName("Chicago Crime Data Analysis")
      .master("local[*]")
      .config("spark.sql.legacy.timeParserPolicy", "LEGACY")
      .getOrCreate()

    // Load the data
    val crimeData = spark.read
      .option("header", "true")
      .option("inferSchema", "true")
      .csv("src/resources/Chicago_Crimes.csv")

    // Print schema and preview data
    crimeData.printSchema()
    crimeData.show(10)
    val cleanedData = crimeData
      .withColumnRenamed("x", "Longitude")
      .withColumnRenamed("y", "Latitude")
      .withColumn("Date", to_timestamp(col("Date"), "yyyy-MM-dd HH:mm:ss"))
      .withColumn("Month", month(col("Date"))) // Extract month
      .withColumn("Updated_On", to_date(col("Updated On"), "MM/dd/yyyy HH:mm:ss"))
      .filter(col("Longitude").isNotNull && col("Latitude").isNotNull)
      .cache()

    cleanedData.show(10)


//    val validData = cleanedData.filter(col("Year").isNotNull && col("Year").between(1900, 2100))
//
//    // Debug: Check unique values in the Year column
//    validData.select("Year").distinct().orderBy("Year").show(50)
//
//    // Compute yearly trends
//    val yearlyTrends = validData.groupBy("Year")
//      .count()
//      .orderBy("Year")
//
//    yearlyTrends.show(50)


    // Group by Month to calculate crime counts
    val seasonalTrend = cleanedData.groupBy("Month")
      .count()
      .orderBy("Month")

    // Show results
    seasonalTrend.show(12)
    spark.stop()
  }


}

