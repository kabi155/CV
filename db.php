<?php
session_start();
require '../includes/db.php';
require '../includes/mailer.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize inputs
    $firstName = filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_STRING);
    $lastName = filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    try {
        // Check if email exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        
        if ($stmt->rowCount() > 0) {
            $_SESSION['error'] = "Email already registered!";
            header("Location: ../signup.html");
            exit();
        }

        // Insert new user
        $stmt = $pdo->prepare("INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)");
        $stmt->execute([$firstName, $lastName, $email, $password]);

        // Send welcome email
        $mail = new PHPMailer(true);
        $mail->setFrom(SMTP_FROM, SITE_NAME);
        $mail->addAddress($email);
        $mail->Subject = 'Welcome to Our Ancestors';
        $mail->Body    = "Hi $firstName,\n\nWelcome to our community!";
        $mail->send();

        $_SESSION['success'] = "Registration successful! Please login.";
        header("Location: ../login.html");
        
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        $_SESSION['error'] = "Registration failed. Please try again.";
        header("Location: ../signup.html");
    } catch (Exception $e) {
        error_log("Mail Error: " . $e->getMessage());
        $_SESSION['error'] = "Registration completed but welcome email failed to send.";
        header("Location: ../login.html");
    }
    exit();
}
