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
-- Table structure for table `basic_details`
--

DROP TABLE IF EXISTS `basic_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basic_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `designation` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `mobile_number` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `zip_code` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `relationship_status` varchar(45) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_details`
--

LOCK TABLES `basic_details` WRITE;
/*!40000 ALTER TABLE `basic_details` DISABLE KEYS */;
INSERT INTO `basic_details` VALUES (1,'rijvans','juneja','Software developer','rijvan.juneja@esparkbizmail.com','TALAJ','BHAVNAGAR','9586404030','up','bhavnagar','365214','male','Married','2024-05-04'),(2,'','','','','','','','','','','','',''),(3,'','','','','','','','','','','','',''),(4,'','','','','','','','','','','','',''),(5,'','','','','','','','','','','','',''),(6,'','','','','','','','','','','','',''),(7,'','','','','','','','','','','','',''),(8,'','','','','','','','','','','','',''),(9,'','','','','','','','up','bhavnagar','','','Single',''),(10,'','','','','','','','up','bhavnagar','','','Single',''),(11,'','','','','','','','','','','','',''),(12,'rijvan','juneja','Software developer','rijvan.juneja@esparkbizmail.com','sdfgsdg','dsgsd','1234567894','gujarat','ahemdabad','365214','male','Single','2024-03-20'),(13,'rijvan','juneja','Software developer','rijvan.juneja@esparkbizmail.com','sdfgsdg','dsgsd','1234567894','gujarat','ahemdabad','365214','male','Single','2024-03-20'),(14,'etwet','sdas','safas','asfas@gsd.vgrf','asfsa','asfas','1234567891','gujarat','bhavnagar','234234','male','Single','2024-03-15');
/*!40000 ALTER TABLE `basic_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-28 18:53:23
