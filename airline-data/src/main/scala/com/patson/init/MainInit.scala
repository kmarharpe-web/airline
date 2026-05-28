package com.patson.init

import com.patson.data._
import com.patson.model._
import java.util.logging.Logger

object MainInit {
  val logger = Logger.getLogger(MainInit.getClass.getName)

  def main(args: Array[String]): Unit = {
    logger.info("Initializing Sandbox Database Tables...")
    
    // 1. Re-create core database structural schemas
    DBCreator.createTables()
    
    // 2. Populate world airports, cities, and country records
    GeoDataGenerator.generateGeoData()
    
    // 3. Populate base airplane models and engine options
    AircraftDataGenerator.generateAircraftData()

    // 4. Create your single player airline sandbox profile (ID: 1)
    val soloPlayer = Airline.fromId(1).copy(
      name = "Sandbox Airlines", 
      balance = 500000000, // Starting capital: 500M
      isDigital = false
    )
    AirlineSource.saveAirline(soloPlayer)
    
    logger.info("Database initialized with 0 AI competitors. Solo player sandbox ready.")
  }
}
