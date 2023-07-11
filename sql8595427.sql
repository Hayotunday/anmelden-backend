-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql8.freemysqlhosting.net
-- Generation Time: Feb 04, 2023 at 09:17 PM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql8595427`
--

-- --------------------------------------------------------

--
-- Table structure for table `EntryFormTable`
--

CREATE TABLE `EntryFormTable` (
  `id` int(11) NOT NULL,
  `salutation` varchar(10) NOT NULL,
  `employment` varchar(20) NOT NULL,
  `title` varchar(50) NOT NULL,
  `practice` varchar(50) DEFAULT NULL,
  `eduTitle` varchar(50) DEFAULT NULL,
  `street` varchar(150) DEFAULT NULL,
  `profession` varchar(50) NOT NULL,
  `postcode` int(20) DEFAULT NULL,
  `firstname` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `diplomaCountry` varchar(50) NOT NULL,
  `privateAddress` varchar(50) DEFAULT NULL,
  `diplomayear` date DEFAULT NULL,
  `privatezip` varchar(20) NOT NULL,
  `gln` varchar(50) DEFAULT NULL,
  `privatelocation` varchar(150) NOT NULL,
  `uid` varchar(100) DEFAULT NULL,
  `privatephone` varchar(50) DEFAULT NULL
) 

-- --------------------------------------------------------

--
-- Table structure for table `Registration`
--

CREATE TABLE `Registration` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `profession` varchar(50) NOT NULL
) 

--
-- Indexes for dumped tables
--

--
-- Indexes for table `EntryFormTable`
--
ALTER TABLE `EntryFormTable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Registration`
--
ALTER TABLE `Registration`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `EntryFormTable`
--
ALTER TABLE `EntryFormTable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `Registration`
--
ALTER TABLE `Registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
