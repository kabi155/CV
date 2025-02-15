<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// SMTP Configuration
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your@gmail.com');
define('SMTP_PASS', 'your-app-password'); // Use App Password for Gmail
define('SMTP_FROM', 'noreply@yourdomain.com');
