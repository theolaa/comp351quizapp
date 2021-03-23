-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: us-cdbr-east-03.cleardb.com
-- Generation Time: Mar 23, 2021 at 03:15 AM
-- Server version: 5.6.50-log
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heroku_3b482e602de5856`
--

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `quiz_id` int(11) NOT NULL,
  `display_name` tinytext NOT NULL,
  `quiz_data` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`quiz_id`, `display_name`, `quiz_data`) VALUES
(1, 'QUIZ 1', '{\"questionText\":\"What is 2 + 5\",\"code\":\"\",\"options\":[\"5\",\"6\",\"7\",\"8\"],\"answer\":\"c\"},{\"questionText\":\"What is 21 ÷ 7\",\"code\":\"\",\"options\":[\"8\",\"4\",\"3\",\"14\"],\"answer\":\"c\"},{\"questionText\":\"The capital of The United States is New York City\",\"code\":\"\",\"options\":[\"True\",\"False\"],\"answer\":\"b\"},{\"questionText\":\"In x86 assembly, which instruction copies the value of one register or memory location into another?\",\"code\":\"\",\"options\":[\"MOV\",\"CPY\",\"NEG\",\"RET\"],\"answer\":\"a\"},{\"questionText\":\"Can you use a microphone as a speaker?\",\"code\":\"\",\"options\":[\"Yes, but you risk damaging the microphone\",\"Yes, and it\'s perfectly safe to do so.\",\"No, it is not physically possible.\"],\"answer\":\"a\"}');

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `name` varchar(64) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`name`, `score`) VALUES
('Theo', 256),
('Priti', 101),
('Alexios Komnenos', 1096);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`quiz_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `quiz_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
