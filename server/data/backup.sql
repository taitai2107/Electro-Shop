-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: db_store
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Brands`
--

DROP TABLE IF EXISTS `Brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Brands` (
  `brandId` int(11) NOT NULL AUTO_INCREMENT,
  `brandName` varchar(255) DEFAULT NULL,
  `desciption` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`brandId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Brands`
--

LOCK TABLES `Brands` WRITE;
/*!40000 ALTER TABLE `Brands` DISABLE KEYS */;
INSERT INTO `Brands` VALUES (1,'toshiba','none','2024-05-24 03:33:26','2024-05-24 03:33:26'),(2,'sony','none','2024-05-24 03:33:26','2024-05-24 03:33:26'),(3,'Daikin','none','2024-05-24 03:33:46','2024-05-24 03:33:46'),(4,'samsung','none','2024-05-24 03:33:46','2024-05-24 03:33:46'),(5,'nikon','none','2024-05-24 03:34:26','2024-05-24 03:34:26'),(6,'lg','none','2024-05-24 03:34:26','2024-05-24 03:34:26'),(7,'oppo',NULL,'2024-06-06 16:36:49','2024-06-06 16:36:49');
/*!40000 ALTER TABLE `Brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Categories` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(255) DEFAULT NULL,
  `desciption` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'Tai Nghe','none','2024-05-24 03:28:18','2024-05-24 03:28:18'),(2,'điện thoại','none','2024-05-24 03:28:18','2024-05-24 03:28:18'),(3,'ti vi','none','2024-05-24 03:30:28','2024-05-24 03:30:28'),(4,'máy giặt','none','2024-05-24 03:30:28','2024-05-24 03:30:28'),(5,'tủ lạnh','none','2024-05-24 03:30:46','2024-05-24 03:30:46'),(6,'máy nổ',NULL,'2024-06-06 16:19:11','2024-06-06 16:19:11'),(8,'laptop',NULL,'2024-06-06 16:24:12','2024-06-06 16:24:12');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orderdetails`
--

DROP TABLE IF EXISTS `Orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orderdetails` (
  `orderDetailId` int(11) NOT NULL AUTO_INCREMENT,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`orderDetailId`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`),
  CONSTRAINT `Orderdetails_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`orderId`),
  CONSTRAINT `Orderdetails_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Products` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orderdetails`
--

LOCK TABLES `Orderdetails` WRITE;
/*!40000 ALTER TABLE `Orderdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Orders` (
  `orderId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `oderDate` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`orderId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Products` (
  `productId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `desciption` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `brandId` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `categoryId` (`categoryId`),
  KEY `brandId` (`brandId`),
  CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`categoryId`),
  CONSTRAINT `Products_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `Brands` (`brandId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'samsung a15','new',3000000,15,2,4,'https://res.cloudinary.com/doivdewue/image/upload/v1703822454/qgejmzdcwwxi0gl40ds6.png','2024-05-24 03:54:10','2024-05-24 03:54:10'),(5,'máy giặt','new',902390,14,1,1,NULL,'2024-06-06 13:18:00','2024-06-06 13:18:00'),(8,NULL,NULL,NULL,NULL,NULL,NULL,'https://res.cloudinary.com/doivdewue/image/upload/v1717685205/temp_nodejs/loyw47wenouu7j0ab0nc.jpg','2024-06-06 14:46:46','2024-06-06 14:46:46'),(9,'1','',1,1,1,1,'https://res.cloudinary.com/doivdewue/image/upload/v1717687318/temp_nodejs/ehisztyp8o260wq3uteu.png','2024-06-06 15:21:59','2024-06-06 15:21:59'),(14,'áo giáp','<p>new</p>',90209,19,4,4,'https://res.cloudinary.com/doivdewue/image/upload/v1717687471/temp_nodejs/tgvporpwqwpp40qc1ree.png','2024-06-06 15:24:32','2024-06-06 15:24:32'),(17,'i9 11000K','',11000000,12,6,6,'https://res.cloudinary.com/doivdewue/image/upload/v1717690864/temp_nodejs/gfnisadxbffjromjc3d0.png','2024-06-06 16:21:04','2024-06-06 16:21:04'),(18,'con gà','<p>none</p>',39203329,12,6,6,'https://res.cloudinary.com/doivdewue/image/upload/v1717723351/temp_nodejs/yelfi9fqnris5htvi00i.png','2024-06-07 01:22:32','2024-06-07 01:22:32');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('001-User_mgr.js'),('002-Brands_mgr.js'),('003-Categories_mgr.js'),('004-Products_mgr.js'),('005-Ordes_mgr.js'),('006-Orderdetails_mgr.js'),('fixError.mgr.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `unique_userName_constraint` (`userName`),
  UNIQUE KEY `unique_email_constraint` (`email`),
  UNIQUE KEY `unique_phone_constraint` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (32,'taingsuyen111','$2b$10$3/C2oaBIn.D.oFnx4dL/futk6QuEe9C05nhEGTBAkLrNH5Fwticua','nguyen21@gmail.com','tainguyencongkhanh','0943748392',NULL,'2024-05-17 16:39:37','2024-06-05 16:06:55'),(34,'taingsuyen1111','$2b$10$lNDSz4SkzSllRwJcU/jBMequXQrOD13PoeY.u/w3W6T6iKmKEOso6','nguyen211@gmail.com','tainguyencongkhanh','0923749503',NULL,'2024-05-17 16:39:49','2024-06-05 16:06:38'),(43,NULL,'$2b$10$LwFoFJlriRlPDjNzCtjZnudeU9tyYUUh5VNm1SoEt.7oyUvBUJRaW','nguyen2292113@gmail.com','tainguyencongkhanh','0923129833',2,'2024-05-18 14:14:11','2024-05-18 14:14:11'),(45,'taonguyen4','$2b$10$3t37OB8XrSb0Ul8W4ADl1u6H8BVRCpZmaOJ3.wUPQZW3GXP2XVeDS','nguyen22942113@gmail.com','tainguyencongkhanh','0923129834',NULL,'2024-05-18 14:15:44','2024-05-18 14:15:44'),(47,'taonguyen42','$2b$10$I6UMJ/SYeHCNgJXCgWi3tuYzmXUU55oo0aQOCEr0xWsKXRMbpthdy','nguyen2292433221313@gmail.com','tainguyencongkhanh','0923129893',2,'2024-05-19 16:41:09','2024-05-27 09:14:25'),(48,'taonguyen423','$2b$10$ewesv3.Z2MLnVRHHiLfZwuUZZ0BupAZc.p0iB6fP/RtYHim3Yx/1e','nguyen22924322113@gmail.com','tainguyencongkhanh','0923129835',1,'2024-05-20 06:58:41','2024-06-05 15:58:00'),(52,'congacon','$2b$10$hOawPxeWNErS.m3C6bItFunxbvTVqi/ZPi1GUiGOtyGSwUVRp3Rue','congacon@gmail.com','nguyendat','0832597839',2,'2024-06-05 11:12:43','2024-06-05 15:57:01'),(53,'123123','$2b$10$kTP1p5hoA/jkb2K1RrvMQOjGbG7Ox6QBmyLkLgpZ21Fy9iP9w9ov.','conga@gmail.com','nguyendat','0832597838',2,'2024-06-05 11:13:36','2024-06-06 15:04:27'),(57,NULL,'$2b$10$kTP1p5hoA/jkb2K1RrvMQOjGbG7Ox6QBmyLkLgpZ21Fy9iP9w9ov.','nguyen22924332321313@gmail.com','tainguyencongkhanh3','0923129823',2,'2024-06-05 15:37:33','2024-06-06 15:05:32'),(58,NULL,'$2b$10$3/C2oaBIn.D.oFnx4dL/fuseLqgJX0APscahOyrBKH2f44IHT9bpK','NGUYENCONG@GMAIL.COM',NULL,'0932738283',2,'2024-06-05 15:38:57','2024-06-05 15:38:57'),(59,'nguyencongkhanhtai','$2b$10$3/C2oaBIn.D.oFnx4dL/futk6QuEe9C05nhEGTBAkLrNH5Fwticua','conga3@gmail.com','123123','0947839290',2,'2024-06-05 15:43:17','2024-06-05 15:49:51'),(60,'1231232','$2b$10$3/C2oaBIn.D.oFnx4dL/futk6QuEe9C05nhEGTBAkLrNH5Fwticua','123123@gmail.com','123123','0932739403',2,'2024-06-05 15:59:29','2024-06-05 15:59:57'),(62,'nguyencongkhanhtai123','$2b$10$UQDc/zpPV1l/lUzv7S9HUu2gQKH33Rf224SCC0KRVdgGOGtKBfa4u','1231234@gmail.com','tainguyen','0943743829',2,'2024-06-06 10:04:29','2024-06-06 10:08:17'),(63,'tainguye123','$2b$10$L4tDJR8j/jzK58sZvyk37u39pSJIskAionZaYwna3V/9zuGGaca0C','nguyennguyen@mail.com','nguyentai','0839384752',2,'2024-06-07 01:31:53','2024-06-07 01:31:53'),(67,'nguyencongkhanhtai3','$2b$10$L4tDJR8j/jzK58sZvyk37u39pSJIskAionZaYwna3V/9zuGGaca0C','nguyennguyen@gmail.com','nguyentai2','0832592833',2,'2024-06-07 01:35:08','2024-06-07 01:35:08'),(72,'taitai2107','$2b$10$ySNrF4u9JNlCWC85ouwCYuAhoxKw/nh56IwzZEaZyH0JkslpBNO2G','nguyendat7.1998@gmail.com','none','0832648392',2,'2024-07-12 10:06:26','2024-07-12 10:06:26');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-19 19:10:14
