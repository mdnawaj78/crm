-- Create database
CREATE DATABASE crm;

-- Create users table
CREATE TABLE `crm`.`newleads`
(
    `id` int NOT NULL auto_increment,
    `status` varchar(255)
    `name` varchar(50),
    `email` varchar(60),
    `phone` bigint(10),
    `created_at` timestamp,
    `remarks`  varchar(500)
    `interest`  varchar(500)
);