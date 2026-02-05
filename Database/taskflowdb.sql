-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: taskflowdb
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `domain`
--

DROP TABLE IF EXISTS `domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domain` (
  `domain_id` int NOT NULL AUTO_INCREMENT,
  `dname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`domain_id`),
  UNIQUE KEY `dname_UNIQUE` (`dname`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domain`
--

LOCK TABLES `domain` WRITE;
/*!40000 ALTER TABLE `domain` DISABLE KEYS */;
INSERT INTO `domain` VALUES (8,'Backend'),(1,'Backend Dev'),(2,'Development'),(6,'DevOps'),(5,'DS&Analytics'),(7,'HR'),(4,'UI/UX');
/*!40000 ALTER TABLE `domain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `pname` varchar(255) DEFAULT NULL,
  `pdescription` varchar(255) DEFAULT NULL,
  `uid` int NOT NULL,
  `domain_id` int NOT NULL,
  `client` varchar(255) DEFAULT NULL,
  `deadline` date NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `as_date` date NOT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `pid_UNIQUE` (`pid`),
  UNIQUE KEY `pname_UNIQUE` (`pname`),
  KEY `uid_idx` (`uid`),
  KEY `domain_id_idx` (`domain_id`),
  CONSTRAINT `domain_id` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`domain_id`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (2,'TaskFlow App','Management system',1,1,'ABC Corp','2026-02-15','Initial project','2026-01-30'),(3,'TaskFlow Admin Panel','Admin dashboard project',1,1,'Internal','2026-03-01','Initial Phase','2026-01-01'),(4,'TaskFlow Mobile App','Android + iOS app',1,1,'Client A','2026-04-15','UI Pending','2026-01-10'),(5,'TaskFlow Website','Marketing website',1,1,'Client B','2026-02-28','SEO Required','2026-01-15');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `query`
--

DROP TABLE IF EXISTS `query`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `query` (
  `qid` bigint NOT NULL AUTO_INCREMENT,
  `query` varchar(255) DEFAULT NULL,
  `teamid_fk` int NOT NULL,
  `fk_pid` int NOT NULL,
  `mgruid` int NOT NULL,
  `response` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `qname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`qid`),
  UNIQUE KEY `qid_UNIQUE` (`qid`),
  KEY `teamid_fk_idx` (`teamid_fk`),
  KEY `fk_pid_idx` (`fk_pid`),
  KEY `mgruid_idx` (`mgruid`),
  CONSTRAINT `fk_pid` FOREIGN KEY (`fk_pid`) REFERENCES `project` (`pid`),
  CONSTRAINT `mgruid` FOREIGN KEY (`mgruid`) REFERENCES `user` (`uid`),
  CONSTRAINT `teamid_fk` FOREIGN KEY (`teamid_fk`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `query`
--

LOCK TABLES `query` WRITE;
/*!40000 ALTER TABLE `query` DISABLE KEYS */;
INSERT INTO `query` VALUES (4,'Login API failing',1,2,1,'Issue fixed','RESPONDED','Backend Issue'),(5,'Login API failing intermittently',3,2,1,NULL,'OPEN',NULL),(6,'UI not matching design',1,2,34,NULL,'OPEN',NULL);
/*!40000 ALTER TABLE `query` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rid`),
  UNIQUE KEY `rname_UNIQUE` (`rname`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(4,'Employee'),(2,'Manager'),(3,'Team Leader');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `task_id` bigint NOT NULL AUTO_INCREMENT,
  `tname` varchar(255) NOT NULL,
  `tdescription` varchar(255) NOT NULL,
  `pid` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `uid` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `domain_id` int DEFAULT NULL,
  `priority` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  UNIQUE KEY `tname_UNIQUE` (`tname`),
  KEY `uid_idx` (`uid`),
  KEY `fk_task_domain` (`domain_id`),
  KEY `fk_task_project` (`pid`),
  CONSTRAINT `fk_task_domain` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`domain_id`),
  CONSTRAINT `fk_task_project` FOREIGN KEY (`pid`) REFERENCES `project` (`pid`),
  CONSTRAINT `fk_task_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Login API','Create login API with JWT security',2,'TODO',5,'2026-01-30','2026-02-20',NULL,NULL),(5,'Login UI','Design login screen',3,'Pending',7,'2026-01-30','2026-02-10',NULL,NULL),(6,'Design Dashboard','Create admin dashboard UI',2,'Pending',1,'2026-01-30','2026-02-15',NULL,NULL),(10,'Create Login API','JWT Authentication',2,'Pending',5,'2026-02-01','2026-02-20',1,'High'),(12,'Auth Module','Implement JWT authentication',2,'REJECTED',1,'2026-02-01','2026-02-10',NULL,'High'),(13,'JWT Filter','Create JWT filter',2,'TODO',5,'2026-02-03','2026-02-06',NULL,NULL),(14,'API Documentation','Write documentation for employee service APIs',2,'TODO',21,'2026-02-05','2026-02-15',1,'Medium');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `team_id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `pid` int NOT NULL,
  PRIMARY KEY (`team_id`),
  KEY `pid_idx` (`pid`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `pid` FOREIGN KEY (`pid`) REFERENCES `project` (`pid`),
  CONSTRAINT `uid_fk` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (1,5,2),(3,1,2);
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL,
  `domain_id` int DEFAULT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uname_UNIQUE` (`uname`),
  KEY `fk_user_role` (`role_id`),
  KEY `FKk1hsftp46a7obygffmevl2g3s` (`domain_id`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`rid`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `FKk1hsftp46a7obygffmevl2g3s` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`domain_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'JellyJain','Jelly','Jain','jj1510','jj1510@gmail.com','9999999999','Pune',1,2),(3,'anisham','Anisha','Mitra','am2606','ac2606@gmail.com','1236548790','Maharastra',3,NULL),(5,'RohitS','Rohit','Sharma','admin123','rohit@taskflow.com','9876543210','Jaipur',2,NULL),(7,'dev2','Neha','Patel','neha123','neha@taskflow.com','9876543212','Mumbai',2,NULL),(8,'srishtij','Srishti','Sharma','sris123','sris13@taskflow.com','9876543210','noida',3,NULL),(11,'ManaswiG','Manu','Jain','manu123','manuj@gmail.com','9876543210','dsertsvjdzf',3,NULL),(16,'RitvikS','ritvik','shaiwala','rs@123','rs1234@gmail.com','4533231548','Pune',3,NULL),(20,'Rani','Harsh','Sharma','jbhjbbdh','AJjbdj@gmail.com','7927972053','Mumbai',4,NULL),(21,'MaheshBabu','Mahesh','Babu','mb123','maheshbabu@gmail.com','9982839594','bankora',4,NULL),(24,'amit123','Amit','Sharma','password123','amit.sharma@test.com','9876543210','Mumbai',4,NULL),(32,'PratigyaJ','System','User','123456','Pj123@gmail.com','9999999999','N/A',4,NULL),(33,'SantoshiG','Santoshi','Ganga','123456','sg123@gmail.com','1234567891','Dungarpur',4,NULL),(34,'manager1','Raj','Sharma','123456','raj@test.com','9876543210','Mumbai',2,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-02 14:45:09
