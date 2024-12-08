import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.functions._
import org.apache.spark.sql.types.IntegerType
object CrimeDataPreprocessing {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder
      .appName("CrimeDataPreprocessing")
      .master("local[*]")
      .getOrCreate()

    val rawDF = spark.read
      .option("header", "true")
      .option("inferSchema", "true")
      .csv("src/resources/Chicago_Crimes.csv")

    val cleanedDF = rawDF
      .withColumnRenamed("x", "Longitude")
      .withColumnRenamed("y", "Latitude")
      .withColumn("Date", to_timestamp(col("Date"), "MM/dd/yyyy HH:mm:ss"))
      .filter(col("Longitude").isNotNull && col("Latitude").isNotNull && col("Primary Type").isNotNull)

    // Example: Select only the columns we need for the API
    val simplifiedDF = cleanedDF.select(
      col("ID"),
      col("Primary Type").as("primary_type"),
      col("Latitude"),
      col("Longitude"),
      col("Year")
    )
    val correctedDF = simplifiedDF
      .withColumn("Year", col("Year").cast(IntegerType))
    val lastDF = correctedDF.filter(col("Year").isNotNull)


//    simplifiedDF.write.parquet("output/crimes_cleaned.parquet")
    val jdbcUrl = "jdbc:postgresql://localhost:5432/crimes"
    val jdbcProperties = new java.util.Properties()
    jdbcProperties.setProperty("user", "postgres")
    jdbcProperties.setProperty("password", "password")

    lastDF.write
      .mode("append")
      .jdbc(jdbcUrl, "crime", jdbcProperties)
    spark.stop()
  }
}
