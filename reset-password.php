<?php
require '../includes/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];
    $newPassword = password_hash($_POST['new_password'], PASSWORD_DEFAULT);
    $email = $_POST['email'];

    // Validate token
    $stmt = $pdo->prepare("SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()");
    $stmt->execute([$token]);
    $resetRequest = $stmt->fetch();

    if ($resetRequest) {
        // Update password
        $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE email = ?");
        $stmt->execute([$newPassword, $email]);

        // Delete used token
        $pdo->prepare("DELETE FROM password_resets WHERE token = ?")->execute([$token]);

        header("Location: ../auth/login.html?password_reset=1");
    } else {
        header("Location: ../auth/reset-password.html?error=invalid_token");
    }
    exit();
}
