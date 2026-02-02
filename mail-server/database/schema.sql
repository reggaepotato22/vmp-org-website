CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS missions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  description TEXT,
  content TEXT,
  status VARCHAR(50) DEFAULT 'upcoming',
  start_date VARCHAR(50),
  end_date VARCHAR(50),
  cover_image VARCHAR(255),
  images JSON,
  stats JSON,
  report_file VARCHAR(255),
  report_summary TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  category VARCHAR(50) DEFAULT 'general',
  image_url VARCHAR(255) NOT NULL,
  description TEXT,
  mission_id INT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  image_url VARCHAR(255),
  category VARCHAR(50) DEFAULT 'news',
  date VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100),
  content TEXT,
  image_url VARCHAR(255),
  rating INT DEFAULT 5,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hero_slides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  description TEXT,
  image VARCHAR(255),
  order_index INT DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO users (email, password_hash) VALUES 
('admin@kenyavetsmission.org', '$2a$10$X7.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X'); 
