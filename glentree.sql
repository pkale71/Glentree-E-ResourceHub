-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: glentree_eresoucehub_data
-- ------------------------------------------------------
-- Server version	8.0.13

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
-- Table structure for table `academic_year`
--

DROP TABLE IF EXISTS `academic_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_year` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `year` varchar(20) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_current` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `year_UNIQUE` (`year`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_year`
--

LOCK TABLES `academic_year` WRITE;
/*!40000 ALTER TABLE `academic_year` DISABLE KEYS */;
INSERT INTO `academic_year` VALUES (1,'56ffab7b-e33b-11ed-9f9d-c4346b527e08','2023','2023-04-25','2024-04-25',1),(3,'e1d2207f-e33b-11ed-9f9d-c4346b527e08','2022','2023-04-25','2022-04-25',0),(6,'7ee0e140-e34c-11ed-afdd-35d2a226fdbf','2021-2022','2021-01-25','2022-04-25',0),(9,'2926a6f0-ebcf-11ed-8bc3-4932d2b135ea','2020-2022','2021-01-25','2022-04-25',0);
/*!40000 ALTER TABLE `academic_year` ENABLE KEYS */;
UNLOCK TABLES;

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
INSERT INTO `auth_data` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1dWlkIjoiNjA3ZDRmNjEtZGRjMy0xMWVkLWExNGMtNTRlZTc1M2Y5ZWVhIiwiZnVsbE5hbWUiOiJBZG1pbiAiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJIZWFkIiwidXNlcl90eXBlX2lkIjoxLCJsYXN0X2xvZ2luIjoiMjAyMy0wNC0xOVQwMTozMTo0NC4wMDBaIiwicGFzc3dvcmQiOiJhZG1pbiIsImlkIjoxLCJ1c2VyX3R5cGVfbmFtZSI6IkFkbWluaXN0cmF0b3IiLCJ1c2VyX3R5cGVfY29kZSI6IlNVQURNIiwidGltZSI6IldlZCBBcHIgMTkgMjAyMyAxMjo0MDowOCBHTVQrMDUzMCAoSW5kaWEgU3RhbmRhcmQgVGltZSkifV0sImlhdCI6MTY4MTg4ODIwOCwiZXhwIjoxNjgxODg4MjE4fQ.WvWZ3UnfjVA145CedNP21Aqqeg42uq2Sc7aqX9Wlcs0','1','2023-04-19 07:10:08'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1dWlkIjoiNjA3ZDRmNjEtZGRjMy0xMWVkLWExNGMtNTRlZTc1M2Y5ZWVhIiwiZnVsbE5hbWUiOiJBZG1pbiAiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJIZWFkIiwidXNlcl90eXBlX2lkIjoxLCJsYXN0X2xvZ2luIjoiMjAyMy0wNC0xOVQwMTo0MDowOC4wMDBaIiwicGFzc3dvcmQiOiJhZG1pbiIsImlkIjoxLCJ1c2VyX3R5cGVfbmFtZSI6IkFkbWluaXN0cmF0b3IiLCJ1c2VyX3R5cGVfY29kZSI6IlNVQURNIiwidGltZSI6IldlZCBBcHIgMTkgMjAyMyAxMjo0MTowOCBHTVQrMDUzMCAoSW5kaWEgU3RhbmRhcmQgVGltZSkifV0sImlhdCI6MTY4MTg4ODI2OCwiZXhwIjoxNjgxODg4Mjc4fQ.2hEDSh9unBIYPo_htrEMpAzhE96cbw_-m4Mkh29iD84','1','2023-04-19 07:11:08'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1dWlkIjoiNjA3ZDRmNjEtZGRjMy0xMWVkLWExNGMtNTRlZTc1M2Y5ZWVhIiwiZnVsbE5hbWUiOiJBZG1pbiAiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJIZWFkIiwidXNlcl90eXBlX2lkIjoxLCJsYXN0X2xvZ2luIjoiMjAyMy0wNC0xOVQwMTo0MjozNi4wMDBaIiwicGFzc3dvcmQiOiJhZG1pbiIsImlkIjoxLCJ1c2VyX3R5cGVfbmFtZSI6IkFkbWluaXN0cmF0b3IiLCJ1c2VyX3R5cGVfY29kZSI6IlNVQURNIiwidGltZSI6IldlZCBBcHIgMTkgMjAyMyAxMjo0MzowNSBHTVQrMDUzMCAoSW5kaWEgU3RhbmRhcmQgVGltZSkifV0sImlhdCI6MTY4MTg4ODM4NSwiZXhwIjoxNjgxODg4Mzk1fQ.5LwZPpjjCI8jkF81EWW7ZgAjjKXzlG--Q_3RxofSp8k','1','2023-04-19 07:13:05'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1dWlkIjoiNjA3ZDRmNjEtZGRjMy0xMWVkLWExNGMtNTRlZTc1M2Y5ZWVhIiwiZnVsbE5hbWUiOiJBZG1pbiAiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJIZWFkIiwidXNlcl90eXBlX2lkIjoxLCJsYXN0X2xvZ2luIjoiMjAyMy0wNC0xOVQwMTo0MzowNS4wMDBaIiwicGFzc3dvcmQiOiJhZG1pbiIsImlkIjoxLCJ1c2VyX3R5cGVfbmFtZSI6IkFkbWluaXN0cmF0b3IiLCJ1c2VyX3R5cGVfY29kZSI6IlNVQURNIiwidGltZSI6IldlZCBBcHIgMTkgMjAyMyAxMjo1NzowOSBHTVQrMDUzMCAoSW5kaWEgU3RhbmRhcmQgVGltZSkifV0sImlhdCI6MTY4MTg4OTIyOSwiZXhwIjoxNjgxODg5MjM5fQ.833P99CKakVGm3Kvf6M9I_0mDe9olE1fbA_Lb_OReLE','1','2023-04-19 07:27:09'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1dWlkIjoiNjA3ZDRmNjEtZGRjMy0xMWVkLWExNGMtNTRlZTc1M2Y5ZWVhIiwiZnVsbE5hbWUiOiJBZG1pbiAiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJIZWFkIiwidXNlcl90eXBlX2lkIjoxLCJsYXN0X2xvZ2luIjoiMjAyMy0wNC0xOVQwMjoxMjozMy4wMDBaIiwicGFzc3dvcmQiOiJhZG1pbiIsImlkIjoxLCJ1c2VyX3R5cGVfbmFtZSI6IkFkbWluaXN0cmF0b3IiLCJ1c2VyX3R5cGVfY29kZSI6IlNVQURNIiwidGltZSI6IldlZCBBcHIgMTkgMjAyMyAxNToyOToyMyBHTVQrMDUzMCAoSW5kaWEgU3RhbmRhcmQgVGltZSkifV0sImlhdCI6MTY4MTg5ODM2MywiZXhwIjoxNjgxOTAwMTYzfQ.HDEP_00qsfWbvGPoFyW6Mlvcf9Vh5L2d_9EIHoBlWiY','1','2023-04-19 09:59:23'),('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpbeyJ1dWlkIjoiNjA3ZDRmNjEtZGRjMy0xMWVkLWExNGMtNTRlZTc1M2Y5ZWVhIiwiZnVsbE5hbWUiOiJBZG1pbiAiLCJyb2xlX2lkIjoxLCJyb2xlX25hbWUiOiJIZWFkIiwidXNlcl90eXBlX2lkIjoxLCJsYXN0X2xvZ2luIjoiMjAyMy0wNC0xOVQwNDoyOToyMy4wMDBaIiwicGFzc3dvcmQiOiJhZG1pbiIsImlkIjoxLCJ1c2VyX3R5cGVfbmFtZSI6IkFkbWluaXN0cmF0b3IiLCJ1c2VyX3R5cGVfY29kZSI6IlNVQURNIiwidGltZSI6IldlZCBBcHIgMTkgMjAyMyAxNTo1OTozNSBHTVQrMDUzMCAoSW5kaWEgU3RhbmRhcmQgVGltZSkifV0sImlhdCI6MTY4MTkwMDE3NSwiZXhwIjoxNjgxOTAxOTc1fQ.Fb64ScWSdiPN-7J_XMK1TlpzUCoCC5fjSQFZRfJicUQ','1','2023-04-19 10:29:35'),('CeT3msYo0z76nI9XyXJg88HNGSjELVvIgQu5r5GN44tDJOIEpUXxkNs2','1','2023-04-19 14:24:19'),('01ukg9YozTw5E9dfWePOWd6FKCgCbrD7pwXfgJbl9MbJQzJ1SXXNjtoA','1','2023-04-20 05:29:38'),('wDMAKntuiXXcVCEaBwUEjqzY9RtQUdA85zQJLWarkxyZTxkhVBWrY3XI','1','2023-04-20 07:54:55'),('i87SFHybSWEfgOxMP9ZvE53MdXqGqRjjvgzjjMEiFXFqk2CyjyvcU3nY','1','2023-04-20 07:56:45'),('tSaOHoKSlWKYu5A6pHclz9B2SvJV77E37DF0zUnscytnJdmLWZpxbwGv','1','2023-04-20 07:56:54'),('IQeJFm5G2wNrlwa7gBbQd6tZRoqhtXyHvK2yh2MynisYqUYL8zfu68Y8','1','2023-04-20 08:41:01'),('2FImlh29l3IG94lg1jbAbUaWvknc5XgVNNFjx2JBAWlPwJY4SosBL7b1','1','2023-04-20 09:26:26'),('QDZDkpR0fvbqdHXiJNnueQXktA8iWGKdY4PoF6ti4ZblSiUis2ls5kiS','1','2023-04-20 12:58:06'),('lrBRcfAYVzC9SZnvmrkfscBM06iFi2fzDhRQBxnmGoU8lkw1gDnES21r','1','2023-04-21 04:53:38'),('ohhd44mohA7whl2pU8zsnJ1pqggYo5qAsUNcRBCbQgrqWAcyBKehVHYW','16','2023-04-22 11:01:11'),('1N8GBPFlz9STEkI81bK2XWmWWdfBa7byIuXh1xfUwUOO3aovBD4BJKmK','1','2023-05-05 14:12:40'),('3Q5kj1Bdun7NsQmoNnjbBtXFy71s0D3sDNxnu9EGm1ZxwK6Kx8cg628o','1','2023-05-05 14:13:44'),('BxpljGpIzVjglKHCch5lYXm9dsIwnGN6ZlhJzuTwUkg8K5Tmo5LSGCYz','1','2023-05-05 14:16:15'),('RcnRyv60hfnbSsjv21rJPvsBrBVUmAtZ7dtz924jrPgwZlTGwq5rzFFn','1','2023-05-05 14:17:08'),('kD8zjsQ4c8v5B2F2Zg5iRsjMHyl9zn1U3RST264jBn3jSPCGVm1lmIkE','1','2023-05-05 14:19:44'),('q2FvgfVjxAJPadu439Sqx0Z8EoyWRpqcJF9hyiHfqrgzm8TZmFkL5SNb','1','2023-05-05 14:20:19'),('2pCGALgOToTuwKihq331rFVRP6mTPyKmTTQwW69Oq09UrGVA7OYbp5Uh','1','2023-05-05 14:20:46'),('dSU7R3uGlBWRYC9TuS1o7msT0OH0jOFo7UZfX7zYz3bLbM1bfhaDJubl','1','2023-05-05 14:21:42'),('EYtIYOgJTuUmhCBQWgHtddn5Ab6sd5dqZS1XEI7NBbNyx0OTvQFL6yZU','1','2023-05-05 14:22:47'),('dMHj6HFS083sbvN11dpx2PXluzBCdZzQo53h6DYzC1tDU9tQ2vC8Wj3f','1','2023-05-05 14:24:13'),('Ar2iix9tnQG7QPeKcAcJmnmMJxscEAqr5SZfuyivtxZO7IpDgrXp1uie','1','2023-05-05 14:25:26'),('1P3XnWoqMoo8nkP2Ve66OEDqWJAxzThqlc5QMOhZBNgTyAgghSiDCVIA','1','2023-05-06 04:52:49'),('OfSqcZTcbvc2qiSoTf6HJ7L9mW0ICGYZAwDbKeFswpjujbfYYmSyBAC8','1','2023-05-06 04:53:18'),('xYjucQRI6svH3GtSFytHeOtNXpGWjWMChGGl0O9RU8nN6JIRv51oFzbx','1','2023-05-06 07:43:00'),('8uzAsNl1O4DUhInRvgm0qCDMnnDaEhLaLY8p24A413bpmngg6plS1HIY','1','2023-05-15 06:18:52'),('8MbFQQbWb7B1ZFPEogPf5itClHFIZi7JVuu6EMRd1peWXCwkq3ok8Tdy','2','2023-05-15 06:19:17'),('fcloQngP99nkeBnQu4ahcvkWQe7IulOYdpCu7XXPYjhvepyljtHLoxTT','1','2023-05-15 06:19:25'),('ishavy9XJV5IBsTP6eOvGsafH85cvBMhU2gGSTRHiNAs4XYk2mPVeDVS','1','2023-05-15 06:20:21'),('d8LJUWAFxWCDdyeoSmRsnGMCxxtTLoPeP1qdFCwp7ZkrdAKuqvEBWyEY','1','2023-05-15 06:20:24'),('oqXbVfuMidVjSPbcPQ1b6cDQv7fKRS4fozIRSZswwokDRonymAhRpgIq','1','2023-05-15 06:20:44'),('Q6DDCva3ctqZlZZpB8BBw6DiUlOqsN74mdhzrLCGhVJHdcZqj31N28P4','1','2023-05-15 06:21:39'),('4xtaHuKNQV8q7kQbULx7zqtmN1OmKHD9SjfAY3LW2Yfyg6GP1gy1ziQT','1','2023-05-15 06:22:59'),('qvbu2OlSnPdqUOO3ze7LBR7xXTMd2sXY0SiDmWySEMO2IKHMTAln8oMB','1','2023-05-15 06:23:13'),('dBv1GCFsuHWSb8vnCGvkCSrJCjiGPTsil9nY6OLFBWzsBdevFU9StfsL','1','2023-05-15 06:23:43'),('PGR2mOOvzfb7nSCLvc3n4L1j1MWvrG38T91gdnF34ZHNrSx3zYe8t6Yq','1','2023-05-15 06:31:12'),('mtig72VPdPRr2h0i2B3UiLTHF5y9vy9wAvKnAln9qhgHL9iwq2JY1s2z','1','2023-05-15 06:32:15'),('UV0ZPujuwbpmc02P9SZbVKlOkim8uwIqEzD4Rblx7XPK93jJfgRcUtHf','1','2023-05-15 06:32:49'),('brJZHNz6zzNfbeCybJ5FzWp6pceNVmcUIHVzd6zW3l5HLHOUBx5NIq32','1','2023-05-15 06:33:21'),('Ik1DeuxFqD23uxFnppd6JNRzF8xT6PWLafZGHjYDf47ltg1BMIg17Cd5','2','2023-05-15 06:33:40'),('nq73SVEyAMDsKB6DJVv0TAAHn6xaX06ItRzEbnq5AOHKPV9PfrfX2wPo','2','2023-05-15 06:36:07'),('JTq77zvbZJnUNQo57uYt7cJe8yGS8xC63lQYR8HJuTRMv0j54U43TkZG','1','2023-05-15 06:36:17'),('toUUe1L4GAZ1XlPXdKURczghzAiZiMEVvB8NyKvcelp1KOnSiAhxnW5t','1','2023-05-15 06:42:06'),('JwBocb6XPwkvfrq28QJjKMUUotVchA4KLFZI1qwu3OoMbbO6l24dzFOL','1','2023-05-15 06:42:20'),('DxYpnhl7JselTIRXgZyrdeUV5wdUrUJLE0ReGkip7YiEBP5JlzVkuvkk','2','2023-05-15 06:42:33'),('nJBVzDuP3v5rjZpreMHNcAVgA4jo4gcFaKfK3LMirWTSEhGgwFtogeuQ','2','2023-05-15 08:27:46');
/*!40000 ALTER TABLE `auth_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum_master`
--

DROP TABLE IF EXISTS `curriculum_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculum_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE latin1_bin NOT NULL,
  `academic_year_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `grade_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum_master`
--

LOCK TABLES `curriculum_master` WRITE;
/*!40000 ALTER TABLE `curriculum_master` DISABLE KEYS */;
INSERT INTO `curriculum_master` VALUES (1,'',1,8,0,1,1,2,'0000-00-00 00:00:00',0),(2,'',1,1,0,1,6,0,'0000-00-00 00:00:00',0);
/*!40000 ALTER TABLE `curriculum_master` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grade`
--

LOCK TABLES `grade` WRITE;
/*!40000 ALTER TABLE `grade` DISABLE KEYS */;
INSERT INTO `grade` VALUES (1,'7th',3),(2,'class 10',4),(4,'Nursury',1),(5,'LKG',1),(6,'UKG',1),(7,'class 6',3),(8,'class 7',3),(9,'class 8',3),(11,'class 1',2),(12,'class 2',2),(13,'class 3',2),(14,'class 4',2),(15,'class 5',2),(16,'class 9',4);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Head'),(2,'School'),(3,'k');
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
  `name` varchar(30) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `location` varchar(200) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `contact1` varchar(11) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `contact2` varchar(11) CHARACTER SET latin1 COLLATE latin1_bin DEFAULT NULL,
  `email` varchar(90) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `curriculum_upload` varchar(60) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `syllabus_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (1,'04a14e9f-dfb5-11ed-a234-c4346b527e08','St. Xavies','Bhilai','9698954852',NULL,'school@gmail.com','Chapterwise',1,'2023-04-21 13:48:11',1,1),(3,'5cfbfa40-e272-11ed-88ec-c94f69aa09e5','kv2','bhili','9512634870',NULL,'school1@gmail.com','',1,'2023-04-24 07:33:53',1,1),(5,'aaa5b8d0-e272-11ed-9e54-83aed0538965','kv3','bhili','9512634870',NULL,'school1@gmail.com','',2,'2023-04-24 07:36:03',1,1),(9,'188186e0-e2a0-11ed-a2f3-8b10e9657b22','kv5','bhili','9512634870',NULL,'school1@gmail.com','Topic-wise',2,'2023-04-24 13:01:15',1,1),(11,'9223d520-e2a0-11ed-bddf-1f6cf9a61aa0','kv1','bhili','9512634870',NULL,'school1@gmail.com','Topic-wise',2,'2023-04-24 13:04:39',1,1),(15,'4a873890-e32e-11ed-9114-3d431958d46f','kv','bhili','9512634870',NULL,'school1@gmail.com','Topic-wise',2,'2023-04-25 05:59:07',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_grade_category`
--

LOCK TABLES `school_grade_category` WRITE;
/*!40000 ALTER TABLE `school_grade_category` DISABLE KEYS */;
INSERT INTO `school_grade_category` VALUES (1,1,1),(2,1,3),(3,1,2),(4,1,4),(5,3,3),(6,5,1),(7,5,3),(16,9,2),(17,9,1),(18,9,3),(19,11,2),(20,11,3),(21,11,1),(22,15,2),(23,15,3),(24,15,1);
/*!40000 ALTER TABLE `school_grade_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_grade_section`
--

DROP TABLE IF EXISTS `school_grade_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_grade_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `academic_year_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `grade_id` int(11) NOT NULL,
  `section` varchar(15) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_grade_section`
--

LOCK TABLES `school_grade_section` WRITE;
/*!40000 ALTER TABLE `school_grade_section` DISABLE KEYS */;
INSERT INTO `school_grade_section` VALUES (1,'bce33d20-efc8-11ed-b5d4-13be946f0e1f',1,1,1,'A'),(2,'bcebc8a0-efc8-11ed-b5d4-13be946f0e1f',1,1,1,'B');
/*!40000 ALTER TABLE `school_grade_section` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_user_setting`
--

LOCK TABLES `school_user_setting` WRITE;
/*!40000 ALTER TABLE `school_user_setting` DISABLE KEYS */;
INSERT INTO `school_user_setting` VALUES (1,'819b07cc-dfb5-11ed-a234-c4346b527e08',1,0,0,1,1),(2,'057e22c7-e0ef-11ed-bc60-c4346b527e08',1,1,1,2,1),(3,'108b3b69-e0ef-11ed-bc60-c4346b527e08',1,1,1,2,1),(4,'aaa5b8d1-e272-11ed-9e54-83aed0538965',1,1,1,3,5),(6,'953d0ef0-e293-11ed-9678-89505a9a3e35',0,0,NULL,0,3),(16,'188641d0-e2a0-11ed-a2f3-8b10e9657b22',1,1,1,3,9),(17,'188668e0-e2a0-11ed-a2f3-8b10e9657b22',0,1,1,1,9),(18,'92264620-e2a0-11ed-bddf-1f6cf9a61aa0',1,1,1,3,11),(19,'92264621-e2a0-11ed-bddf-1f6cf9a61aa0',0,1,1,1,11),(23,'4a893460-e32e-11ed-9114-3d431958d46f',0,1,1,1,15),(24,'4a890d50-e32e-11ed-9114-3d431958d46f',1,1,1,3,15);
/*!40000 ALTER TABLE `school_user_setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_user_setting_history`
--

DROP TABLE IF EXISTS `school_user_setting_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_user_setting_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `can_upload` tinyint(1) DEFAULT NULL,
  `can_verify` tinyint(1) DEFAULT NULL,
  `can_publish` tinyint(1) DEFAULT NULL,
  `action` varchar(25) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `created_on` datetime NOT NULL,
  `created_by_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_user_setting_history`
--

LOCK TABLES `school_user_setting_history` WRITE;
/*!40000 ALTER TABLE `school_user_setting_history` DISABLE KEYS */;
INSERT INTO `school_user_setting_history` VALUES (1,8,2,1,0,1,'update','2023-04-25 04:07:54',1),(2,8,1,0,1,0,'add','2023-04-25 04:07:54',1),(3,8,2,1,0,1,'update','2023-04-25 04:08:39',1),(4,8,1,0,1,0,'delete','2023-04-25 04:08:39',1),(5,8,1,0,1,0,'add','2023-04-25 04:08:39',1),(6,8,2,1,0,1,'delete','2023-04-25 04:53:45',1),(7,8,1,0,1,0,'delete','2023-04-25 04:53:45',1),(8,15,1,0,1,1,'add','2023-04-25 05:59:07',1),(9,15,3,1,1,1,'add','2023-04-25 05:59:07',1);
/*!40000 ALTER TABLE `school_user_setting_history` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
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
-- Table structure for table `syllabus_grade_subject`
--

DROP TABLE IF EXISTS `syllabus_grade_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `syllabus_grade_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `syllabus_id` int(11) NOT NULL,
  `grade_id` int(11) NOT NULL,
  `subject_name` varchar(50) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syllabus_grade_subject`
--

LOCK TABLES `syllabus_grade_subject` WRITE;
/*!40000 ALTER TABLE `syllabus_grade_subject` DISABLE KEYS */;
INSERT INTO `syllabus_grade_subject` VALUES (1,'55b21ee1-e331-11ed-9f9d-c4346b527e08',1,1,'Hindi',1),(2,'aa3f0170-e417-11ed-b74b-6f7650aff17f',1,1,'Science',1),(4,'gdgdfg',1,1,'EVS',1);
/*!40000 ALTER TABLE `syllabus_grade_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `syllabus_grade_subject_chapter`
--

DROP TABLE IF EXISTS `syllabus_grade_subject_chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `syllabus_grade_subject_chapter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `syllabus_grade_subject_id` int(11) NOT NULL,
  `chapter_name` varchar(200) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syllabus_grade_subject_chapter`
--

LOCK TABLES `syllabus_grade_subject_chapter` WRITE;
/*!40000 ALTER TABLE `syllabus_grade_subject_chapter` DISABLE KEYS */;
INSERT INTO `syllabus_grade_subject_chapter` VALUES (1,'d2f51ba4-e422-11ed-9f9d-c4346b527e08',1,'BHUMI',1),(5,'53c95e60-ea81-11ed-8444-3f213c3cd1f7',2,'EARTH',1),(6,'7f147a90-ea82-11ed-b77d-77befc8b390d',2,'EARTH2',1);
/*!40000 ALTER TABLE `syllabus_grade_subject_chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `syllabus_grade_subject_chapter_topic`
--

DROP TABLE IF EXISTS `syllabus_grade_subject_chapter_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `syllabus_grade_subject_chapter_topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `syllabus_grade_subject_chapter_id` int(11) NOT NULL,
  `topic_name` varchar(200) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `syllabus_grade_subject_chapter_topic`
--

LOCK TABLES `syllabus_grade_subject_chapter_topic` WRITE;
/*!40000 ALTER TABLE `syllabus_grade_subject_chapter_topic` DISABLE KEYS */;
INSERT INTO `syllabus_grade_subject_chapter_topic` VALUES (2,'6a18f0fc-ea79-11ed-8dfa-c4346b527e08',1,'kahani',1),(3,'7f1c69d0-ea82-11ed-b77d-77befc8b390d',6,'All-Topics',0),(4,'82e88d00-ea82-11ed-b77d-77befc8b390d',7,'All-Topics',1),(5,'9f34a930-ea82-11ed-bf59-f5ef3efb5af1',8,'All-Topics',1),(6,'cb466f50-eb08-11ed-8d50-c71d40b320d8',1,'EARTH',1),(7,'efe5e480-eb08-11ed-be8b-d3bbbf003e99',1,'KAVITA',1),(8,'4f0e9730-eb0a-11ed-84da-8b1c432de4e1',1,'KAVITA',1),(9,'63f7bdc0-eb1e-11ed-870f-b572c3a55e86',5,'KAVITA',1);
/*!40000 ALTER TABLE `syllabus_grade_subject_chapter_topic` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'607d4f61-ddc3-11ed-a14c-54ee753f9eea','Admin','',1,1,'9874563210','testoauth80@gmail.com','Male',NULL,'admin',1,'2023-04-18 14:01:10',NULL,NULL,NULL,'2023-05-15 06:42:20'),(2,'4c7f1510-de1d-11ed-a234-c4346b527e08','rani','singh',1,3,'1236549870','rani8014@gmail.com','female',1,'admin',1,'2023-04-19 13:10:12',1,NULL,NULL,'2023-05-15 08:27:46'),(6,'839b4c80-dea0-11ed-8bc6-d7814a68136d','test','user',1,6,'9512633789','test@gmail.com','Male',NULL,'admin',1,'2023-04-19 10:54:10',1,NULL,NULL,NULL),(7,'ec5fa7f0-dea7-11ed-b84a-e1cb5546788f','test','test',1,1,'9512635789','test1@gmail.com','Male',NULL,'admin',1,'2023-04-19 11:47:12',1,NULL,NULL,NULL),(15,'18a77280-e03c-11ed-a24a-1384e27579ac','test','test',2,1,'6512635789','test52@gmail.com','Male',8,'admin',0,'2023-04-21 12:00:23',1,'2023-04-21 12:26:49',1,NULL),(16,'747c5790-e043-11ed-a39b-d53fbb8e0b8f','test','test',1,1,'9658685','test2@gmail.com','Male',3,'admin',1,'2023-04-21 12:53:04',1,NULL,NULL,'2023-04-22 11:01:11');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_chapter_complete_status`
--

DROP TABLE IF EXISTS `user_chapter_complete_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_chapter_complete_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE latin1_bin NOT NULL,
  `academic_year_id` int(11) NOT NULL,
  `grade_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `completed_on` datetime NOT NULL,
  `completed_by` int(11) NOT NULL,
  `created_on` datetime NOT NULL,
  `is_completed` tinyint(1) NOT NULL,
  `section_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_chapter_complete_status`
--

LOCK TABLES `user_chapter_complete_status` WRITE;
/*!40000 ALTER TABLE `user_chapter_complete_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_chapter_complete_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_supervise_grade`
--

DROP TABLE IF EXISTS `user_supervise_grade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_supervise_grade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE latin1_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  `grade_id` int(11) NOT NULL,
  `academic_year_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_supervise_grade`
--

LOCK TABLES `user_supervise_grade` WRITE;
/*!40000 ALTER TABLE `user_supervise_grade` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_supervise_grade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_supervise_grade_subject`
--

DROP TABLE IF EXISTS `user_supervise_grade_subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_supervise_grade_subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE latin1_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  `grade_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `academic_year_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_supervise_grade_subject`
--

LOCK TABLES `user_supervise_grade_subject` WRITE;
/*!40000 ALTER TABLE `user_supervise_grade_subject` DISABLE KEYS */;
INSERT INTO `user_supervise_grade_subject` VALUES (1,'vgbcfg',2,1,1,1,1),(2,'cvgnjbhjjmg',2,2,1,1,1),(3,'fhfgh',3,1,1,1,1),(4,'dfgdgdg',2,4,2,1,1);
/*!40000 ALTER TABLE `user_supervise_grade_subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_teach_subject_section`
--

DROP TABLE IF EXISTS `user_teach_subject_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_teach_subject_section` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) COLLATE latin1_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `section_id` int(11) NOT NULL,
  `academic_year_id` int(11) NOT NULL,
  `grade_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_teach_subject_section`
--

LOCK TABLES `user_teach_subject_section` WRITE;
/*!40000 ALTER TABLE `user_teach_subject_section` DISABLE KEYS */;
INSERT INTO `user_teach_subject_section` VALUES (1,'etret',2,1,1,1,1,1),(3,'trtrty',2,2,2,1,1,1);
/*!40000 ALTER TABLE `user_teach_subject_section` ENABLE KEYS */;
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

-- Dump completed on 2023-05-15 19:27:15
