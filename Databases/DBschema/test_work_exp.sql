-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `work_exp`
--

DROP TABLE IF EXISTS `work_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_exp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `designation` varchar(45) DEFAULT NULL,
  `fromdate` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_exp`
--

LOCK TABLES `work_exp` WRITE;
/*!40000 ALTER TABLE `work_exp` DISABLE KEYS */;
INSERT INTO `work_exp` VALUES (1,1,'FSWE','WEF','2024-03-05','2024-03-20'),(2,3,'r','gh',NULL,NULL),(3,3,'i','fgh',NULL,NULL),(4,3,'j','fgh',NULL,NULL),(5,3,'v',NULL,NULL,NULL),(6,4,'r','gh',NULL,NULL),(7,4,'i','fgh',NULL,NULL),(8,4,'j','fgh',NULL,NULL),(9,4,'v',NULL,NULL,NULL),(10,5,'DDTHH',NULL,NULL,NULL),(11,7,'sdfa',NULL,NULL,NULL),(12,12,'edsf','assistant professor','2024-03-04','2024-03-06'),(13,13,'edsf','assistant professor','2024-03-04','2024-03-06'),(14,14,'ccccc','cccc','2024-03-01','2024-03-18'),(15,14,'cccc','cccc','2024-03-05','2024-03-12');
/*!40000 ALTER TABLE `work_exp` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-28 18:53:24
