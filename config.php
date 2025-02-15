<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'ancestors_db');
define('DB_USER', 'root');
define('DB_PASS', '');

// Site configuration
define('BASE_URL', 'http://localhost/project-root');
define('SITE_NAME', 'Our Ancestors');
define('ADMIN_EMAIL', 'bhattkabiraj255@gmail.com');

// SMTP Configuration
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your-email@gmail.com');
define('SMTP_PASS', 'your-email-password');
define('SMTP_FROM', 'noreply@yourdomain.com');

// Security
define('TOKEN_EXPIRY', 300); // 5 minute in seconds