<?php
require '../db.php';
require '../mailer.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    
    $db = new Database();
    $conn = $db->getConnection();

    // Check if user exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        // Generate token
        $token = bin2hex(random_bytes(50));
        $expires = date('Y-m-d H:i:s', time() + TOKEN_EXPIRY);

        // Store token
        $stmt = $conn->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");
        $stmt->execute([$email, password_hash($token, PASSWORD_DEFAULT), $expires]);

        // Send email
        Mailer::sendResetEmail($email, $token);
    }

    // Always return success message to prevent email enumeration
    header("Location: ../kabiraj login.html?reset_sent=1");
    exit();
}