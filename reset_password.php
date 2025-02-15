<?php
session_start();
require 'includes/db.php';
require 'includes/mailer.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    
    try {
        $db = new Database();
        $conn = $db->getConnection();

        // Check if user exists
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Generate unique token
            $token = bin2hex(random_bytes(50));
            $expires_at = date("Y-m-d H:i:s", time() + 300); // 5 minutes expiration

            // Store hashed token in database
            $hashed_token = password_hash($token, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)");
            $stmt->execute([$email, $hashed_token, $expires_at]);

            // Send reset email
            $reset_link = "https://yourdomain.com/reset_password_form.php?token=$token";
            Mailer::sendResetEmail($email, $reset_link);
        }

        // Always show success message to prevent email enumeration
        $_SESSION['message'] = "If an account exists with that email, a reset link has been sent.";
        header("Location: socialmidia.html");
        exit();

    } catch(PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        $_SESSION['error'] = "An error occurred. Please try again later.";
        header("Location: socialmidia.html");
        exit();
    }
}