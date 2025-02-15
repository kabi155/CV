<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    try {
        $db = new Database();
        $conn = $db->getConnection();

        // Validate passwords match
        if ($password !== $confirm_password) {
            $_SESSION['error'] = "Passwords do not match";
            header("Location: reset_password_form.php?token=$token");
            exit();
        }

        // Validate token
        $stmt = $conn->prepare("SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()");
        $stmt->execute([$token]);
        $reset_request = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$reset_request) {
            $_SESSION['error'] = "Invalid or expired reset link";
            header("Location: socialmidia.html");
            exit();
        }

        // Update password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET password_hash = ? WHERE email = ?");
        $stmt->execute([$hashed_password, $reset_request['email']]);

        // Delete used token
        $stmt = $conn->prepare("DELETE FROM password_resets WHERE id = ?");
        $stmt->execute([$reset_request['id']]);

        $_SESSION['message'] = "Password updated successfully!";
        header("Location: socialmidia.html");
        exit();

    } catch(PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        $_SESSION['error'] = "An error occurred. Please try again later.";
        header("Location: socialmidia.html");
        exit();
    }
}