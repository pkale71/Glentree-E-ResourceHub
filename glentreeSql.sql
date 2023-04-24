-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: glentree_eresoucehub_data
-- ------------------------------------------------------
-- Server version	5.6.43-log

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
-- Table structure for table `auth_data`
--

DROP TABLE IF EXISTS `auth_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_data` (
  `auth_token` text NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `auth_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_data`
--

LOCK TABLES `auth_data` WRITE;
/*!40000 ALTER TABLE `auth_data` DISABLE KEYS */;
INSERT INTO `auth_data` VALUES ('bbzI2l0Lwrm48YBln22LOoVqtYrFGycBefwQUGg4ROkN2AZElbSvrLXH','1','2023-04-22 12:47:35'),('Df26KEH261gEUN6KqqbnSQXNEB8zt8rybXnQK5Y9ekM7nEJEaeWhefbs','1','2023-04-22 14:17:31'),('MxIXZeICuL7vfpVV5qv4imzSaebH13Z8pJN95hV1bLsHNUcin3nwkWA7','1','2023-04-22 14:18:26'),('f4KhPf7wDGmoXkFT9vsVtF17PTsvXdYN9qDNDV4QbRoIqMqYOVtrWyXQ','1','2023-04-22 14:19:33'),('N7x0VfhXNIMXPFt92cMRo6xvoSFXSbEPhruvb5C8htuU7HZ49hZnktUq','1','2023-04-22 14:20:09'),('d969XnRSGcMP6qlg7S5tPdIIBO7ahG9g0BvjvULE2zwQt2KHVRjgg0dP','1','2023-04-22 14:27:08'),('2CTQwVYHcPsRhdh7i5PmuuPBUrT5JCC5X18Y6CfvZKGLeAhnwSkMSII3','1','2023-04-22 14:27:31'),('QYM8QBUDKWi8lUtByYSnqbdFUh8yKMLPVm5Q7ExNLuSQW1Qr1qfwkACu','1','2023-04-22 14:28:05'),('Wjz1RV38dNBf3j2uBIvyBTuSj4ZUITaDCuszpdRb35zDDqeHMt6QfCzG','1','2023-04-22 14:28:25'),('Ty1HTZU9eqPRiww9sNnJFxKL2ihRnxojHOZpnjYSjIAmVWl1c4KuotD8','1','2023-04-22 14:29:09'),('bNCVHU3jSCCyiTuHDLybqDUtBA3c6LWGHThiv15NEQeldcZGjqzDKG3O','1','2023-04-22 14:29:55'),('Z9AYr4gTIYLHJ9DX3Qg4xAHBqmPuS1WH3HXWM76d83BnRdhj1nNXVpcv','1','2023-04-22 14:34:04'),('uzjKrHbO52I8SYms9vm3MXTzTdg5HYDdQ2VbtrEMiiNK8CiGs9knQund','1','2023-04-22 14:34:37'),('GBYERRqWsXG1b3bAMoyehELKp5qVLQ3PqDfDb72DM0BHFTHWsHKwet35','1','2023-04-22 14:41:19'),('xiFJWYeBQzwRFzILQGYACLR6hmlKejuhcEKFT6xmhHxTD8HS5EoTKnN7','1','2023-04-22 14:43:41'),('DmLdW3sjGwOehUtop4yD3jisMh4NsCac6BhrB3cfBJTRkjDcMXDHxNON','1','2023-04-22 14:46:59'),('69u8ncfJhVynS5MXPOmMY4ITa0yRpJoUrDA7cduYRTHC2zO12sfdxcNS','1','2023-04-22 14:48:14'),('xl52V2nlvKIgtCeKLnsygoNpgYNIWMV5ZsEjYtq0pzEmt8eaVtn1eaUD','1','2023-04-22 17:02:07'),('MW1VnoMFIY34GsMjfDkmWzAKdm8jykxdzv8dmoYJxlHj7IPaAEqrNbAA','1','2023-04-22 17:23:59'),('wgfJ5dov1wWTnYQOKhlcLPkRoJKKH5FT97JRddYSUwzPZnoO8hLEUxAb','1','2023-04-22 17:25:31'),('vGnP3Zm1Thutyv3RVPcRpHrhWxaQMMIvzpu5TmAdRv8fIl7CQp5qqx4X','1','2023-04-22 17:26:00'),('9aOV49QIkqJgI4jyVVT3R3mpgVvIqcJ4IEMLPEgpkdDRwRQqkKEjXkqx','1','2023-04-22 17:26:35'),('LXEZMHKs2e454KYp5U2TfREGMH4u3O4epEcIijE62ODg7rnpoqfvwmqK','27','2023-04-22 17:29:54'),('8fDtVfuoe8Jr2Ke2tGOKwtWN6zKArCagwKtETH8AXWJ13ZU6alODsX4k','27','2023-04-23 10:21:26'),('2Pb2bPHSnEvCI8lRy0zkRFKDUIeh6BGpUF2xKtV1D0QSMU3YAoxoYU3K','27','2023-04-23 10:56:40'),('UfcvtM3r0NrLCuhEbXsZpo1pJuuF8Y13k7FGp3jiwFWKRGIB5mZB6m4R','27','2023-04-23 10:58:13'),('ClDZZPtvbB3uZbI1ZpUX67oCMjB2NO4a1s8gHpLspTHqbLNAA6kDDkxS','27','2023-04-23 10:58:45'),('TOohjTC8DJdWgEU4hT7FQhelXupfAUcsFABiUjQNnDLn2r6vB0FEKTS9','27','2023-04-23 10:59:34'),('iIFes6gPqhDDQmx8oBmPzJBwgqw1MayIfFRURoH3RC3CmOLuvUsdCrl7','27','2023-04-23 11:00:03'),('ZrChFcBQkfo3f4IXFqwYyvAVDSw2l6fPspPVjed5pQqLWg1hJnA1x9el','27','2023-04-23 11:05:31'),('vvb5bclTZ2sXBHZ6yh46Y42Nhm7xYSrOHUAyuZYXF18ZQ8HQLRCH6MGu','27','2023-04-23 11:09:20'),('9Ky8GXIwXcpwhKVw89oFPDbkbrTt3N1Cvsx3bA2wyZGNBeRjdIQp4RQz','27','2023-04-23 13:26:51'),('ESwZDhdgXsKCheVFNOi9BRLL0rkGcVuDA3YJJeFxyUBixZxrgrS1226Y','27','2023-04-23 14:55:16'),('dHB318JKjYf29T0VKVV1o5yi1xUObc6SwcVwATAnWAEuriQSCcWm2Div','31','2023-04-24 04:15:00');
/*!40000 ALTER TABLE `auth_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `grade_category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
/*!40000 ALTER TABLE `grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grade_category`
--

DROP TABLE IF EXISTS `grade_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grade_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade_category`
--

LOCK TABLES `grade_category` WRITE;
/*!40000 ALTER TABLE `grade_category` DISABLE KEYS */;
INSERT INTO `grade_category` VALUES (3,'Middle'),(1,'Pre-primary'),(2,'Primary'),(4,'Secondary'),(5,'Toddler');
/*!40000 ALTER TABLE `grade_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Head'),(2,'School');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(40) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `location` varchar(200) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `contact1` varchar(11) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `contact2` varchar(11) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `email` varchar(90) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `curriculum_upload` varchar(60) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `syllabus_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_grade_category`
--

DROP TABLE IF EXISTS `school_grade_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_grade_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `grade_category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_grade_category`
--

LOCK TABLES `school_grade_category` WRITE;
/*!40000 ALTER TABLE `school_grade_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `school_grade_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_user_setting`
--

DROP TABLE IF EXISTS `school_user_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_user_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `can_upload` tinyint(1) DEFAULT NULL,
  `can_verify` tinyint(1) DEFAULT NULL,
  `can_publish` tinyint(1) DEFAULT NULL,
  `user_type_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_user_setting`
--

LOCK TABLES `school_user_setting` WRITE;
/*!40000 ALTER TABLE `school_user_setting` DISABLE KEYS */;
/*!40000 ALTER TABLE `school_user_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `syllabus`
--

DROP TABLE IF EXISTS `syllabus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `syllabus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syllabus`
--

LOCK TABLES `syllabus` WRITE;
/*!40000 ALTER TABLE `syllabus` DISABLE KEYS */;
INSERT INTO `syllabus` VALUES (1,'CBSE');
/*!40000 ALTER TABLE `syllabus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `email` varchar(90) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `school_id` int(11) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by_id` int(11) DEFAULT NULL,
  `deleted_on` datetime DEFAULT NULL,
  `deleted_by_id` int(11) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `mobile_UNIQUE` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'607d4f61-ddc3-11ed-a14c-54ee753f9eea','Admin','',1,1,'9874563210','testoauth80@gmail.com','Male',NULL,'admin1234',1,'2023-04-18 14:01:10',NULL,NULL,NULL,'2023-04-23 10:12:07'),(2,'8322deb0-e041-11ed-982c-f3b23528fe48','Rajesh Kumar','Mishra',1,3,'7885858585','rajesh11@gmail.com','Male',NULL,'123456',0,'2023-04-21 12:39:09',1,'2023-04-22 10:46:55',1,'2023-04-21 14:30:47'),(24,'686039f0-e047-11ed-88b8-ada5f0b069c0','Mukesh','Singh',1,2,'9885958585','mukesh@gmail.com','Male',NULL,'123456',1,'2023-04-21 13:21:21',1,NULL,NULL,NULL),(25,'2136f6e0-e04c-11ed-84ec-b317f4ed79be','Harish',NULL,1,2,'9685858858','harish@gmail.com','Male',NULL,'123456',1,'2023-04-21 13:55:09',1,NULL,NULL,NULL),(26,'ec903210-e04d-11ed-84ec-b317f4ed79be','Kamlesh',NULL,1,2,'8979898797','kamlesh@gmail.com','Male',NULL,'123456',1,'2023-04-21 14:08:00',1,NULL,NULL,NULL),(27,'407f49d0-e051-11ed-84ec-b317f4ed79be','Test',NULL,1,3,'9585875858','test80@gmail.com','Female',NULL,'123456',1,'2023-04-21 14:31:49',1,NULL,NULL,'2023-04-24 04:09:56'),(28,'56b90dd0-e0c9-11ed-b0bf-83f8dac544b7','Rohit','Mishra',1,2,'9858585858','rohit@gmail.com','Male',NULL,'123456',1,'2023-04-22 04:51:26',1,NULL,NULL,'2023-04-23 10:21:02'),(31,'8b00e570-e256-11ed-b7a3-4334051c71c0','Prashant','Kale',1,3,'9857887484','pkk@gmail.com','Male',NULL,'admin123',1,'2023-04-24 04:14:44',27,NULL,NULL,'2023-04-24 04:15:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `code` varchar(5) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_type`
--

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,1,'Administrator','SUADM',1),(2,1,'Curriculum Head','CURHD',1),(3,1,'Head Office Admin','HDOFA',1),(4,2,'Principal','SCHPL',1),(5,2,'Vice Principal','SCHVP',1),(6,2,'Coordinator','SCHCD',1),(7,2,'Subject Head','SUBHD',1),(8,2,'Teacher','TECHR',1);
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-24 11:34:43
