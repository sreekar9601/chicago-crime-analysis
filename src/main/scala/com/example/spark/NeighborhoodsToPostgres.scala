import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.types._
import org.apache.spark.sql.functions._

object NeighborhoodsToPostgres {
  def main(args: Array[String]): Unit = {
    val spark = SparkSession.builder
      .appName("NeighborhoodsToPostgres")
      .master("local[*]")
      .getOrCreate()

    val schema = StructType(Seq(
      StructField("the_geom", StringType, true),
      StructField("PRI_NEIGH", StringType, true),
      StructField("SEC_NEIGH", StringType, true),
      StructField("SHAPE_AREA", DoubleType, true),
      StructField("SHAPE_LEN", DoubleType, true)
    ))

    // Load the CSV
    val neighborhoodsDF = spark.read
      .option("header", "true")
      .schema(schema)
      .csv("src/resources/chicago_neighborhoods.csv")


    val jdbcUrl = "jdbc:postgresql://localhost:5432/crimes"
    val jdbcProperties = new java.util.Properties()
    jdbcProperties.setProperty("user", "postgres")
    jdbcProperties.setProperty("password", "password")

    // Select columns and rename the_geom to wkt_text
    val toWriteDF = neighborhoodsDF.select(
      col("PRI_NEIGH"),
      col("SEC_NEIGH"),
      col("SHAPE_AREA"),
      col("SHAPE_LEN"),
      col("the_geom").alias("wkt_text")
    )

    toWriteDF.write
      .mode("append")
      .jdbc(jdbcUrl, "neighborhoods", jdbcProperties)

    spark.stop()
  }
}
