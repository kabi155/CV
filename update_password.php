<?php
require '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];
    $password = $_POST['password'];
    
    $db = new Database();
    $conn = $db->getConnection();

    // Validate token
    $stmt = $conn->prepare("SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()");
    $stmt->execute([password_hash($token, PASSWORD_DEFAULT)]);
    $reset = $stmt->fetch();

    if ($reset) {
        // Update password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET password_hash = ? WHERE email = ?");
        $stmt->execute([$hashed_password, $reset['email']]);

        // Delete used token
        $conn->prepare("DELETE FROM password_resets WHERE id = ?")->execute([$reset['id']]);

        header("Location: ../kabiraj login.html?password_updated=1");
    } else {
        header("Location: ../reset_password.html?error=invalid_token");
    }
    exit();
}