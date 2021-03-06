CREATE DATABASE IF NOT EXISTS netflex
    COLLATE utf8mb4_unicode_ci;

USE netflex;

CREATE TABLE IF NOT EXISTS user
(
    id BIGINT unsigned NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    create_at DATETIME NOT NULL DEFAULT current_timestamp,
    image_url TEXT NOT NULL DEFAULT "https://cdn-icons-png.flaticon.com/512/5089/5089983.png",
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS films
(
    id BIGINT unsigned NOT NULL AUTO_INCREMENT,
    show_id VARCHAR(255) UNIQUE,
    type VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255),
    cast text,
    country VARCHAR(100) NOT NULL,
    date_added DATETIME NOT NULL,
    release_year VARCHAR(4) NOT NULL,
    rating VARCHAR(5) NOT NULL,
    duration VARCHAR(10) NOT NULL,
    listed_in VARCHAR(100) NOT NULL,
    description text NOT NULL,
    picture text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS logs
(
    id BIGINT unsigned NOT NULL AUTO_INCREMENT,
    user_email VARCHAR(255) NOT NULL,
    connected_at DATETIME NOT NULL DEFAULT current_timestamp,
    user_agent VARCHAR(255),
    navigateur VARCHAR(255),
    platform VARCHAR(255),
    language VARCHAR(255),
    encoding VARCHAR(255),
    is_on_mobile BOOLEAN  DEFAULT false,
    ip_address VARCHAR(255),
    country VARCHAR(255),
    PRIMARY KEY (id)
);