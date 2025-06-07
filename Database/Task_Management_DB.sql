CREATE DATABASE `task_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- USERS TABLE
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password_hash` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- PROJECTS TABLE
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT 'Untitled',
  `description` varchar(45) DEFAULT 'No description',
  `created_by` int NOT NULL,
  `is_archived` tinyint NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `created_by_fk_idx` (`created_by`),
  CONSTRAINT `created_by_fk` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- USER / PROJECT RELATIONSHIPS TABLE
CREATE TABLE `user_projects` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'This table shows relationships between multiple projects and users. One user can own many projects. One project can be owned by many users.\n',
  `user_id` int NOT NULL,
  `project_id` int NOT NULL,
  `role` int NOT NULL,
  `joined_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_fk_idx` (`user_id`),
  KEY `project_id_fk_idx` (`project_id`),
  KEY `role_fk_idx` (`role`),
  CONSTRAINT `project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `role_fk` FOREIGN KEY (`role`) REFERENCES `roles` (`id`),
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- PRIORITIES TABLE
CREATE TABLE `priority` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL COMMENT 'Low, medium, high, urgent',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `task_management`.`priority` (`name`)
VALUES ("Low"), ("Medium"), ("High"), ("Urgent");

-- STATUSES TABLE
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL COMMENT 'Not Started\nIn Progress\nComplete',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idstatus_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `task_management`.`status` (`name`)
VALUES ("Not Started"), ("In Progress"), ("Complete");

-- ROLES TABLE
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL COMMENT 'Owner, editor, viewer',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `owner_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `task_management`.`roles` (`name`)
VALUES ("Owner"), ("Editor"), ("Viewer");

-- TASKS TABLE
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` varchar(45) DEFAULT 'None',
  `project_id` int NOT NULL,
  `assigned_to` int DEFAULT NULL,
  `status` int NOT NULL,
  `due_datee` datetime DEFAULT NULL,
  `priority` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `completed` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `project_id_fk1_idx` (`project_id`),
  KEY `assigned_to_fk1_idx` (`assigned_to`),
  KEY `status_fk1_idx` (`status`),
  KEY `priority_fk1_idx` (`priority`),
  CONSTRAINT `assigned_to_fk1` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`),
  CONSTRAINT `priority_fk1` FOREIGN KEY (`priority`) REFERENCES `priority` (`id`),
  CONSTRAINT `project_id_fk1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  CONSTRAINT `status_fk1` FOREIGN KEY (`status`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
