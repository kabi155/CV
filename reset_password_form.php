<?php
session_start();
require 'db.php';

$token = $_GET['token'] ?? '';

try {
    $db = new Database();
    $conn = $db->getConnection();

    // Validate token
    $stmt = $conn->prepare("SELECT * FROM password_resets WHERE token = ? AND expires_at > NOW()");
    $stmt->execute([$token]);
    $reset_request = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$reset_request) {
        $_SESSION['error'] = "Invalid or expired reset link";
        header("Location: socialmidia.html");
        exit();
    }

} catch(PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    $_SESSION['error'] = "An error occurred. Please try again later.";
    header("Location: socialmidia.html");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Reset Password</title>
    <style>
        /* Add your existing styles here */
        .reset-container {
            max-width: 500px;
            margin: 50px auto;
            padding: 30px;
            background: rgba(255,255,255,0.9);
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .reset-form input {
            width: 100%;
            padding: 12px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 25px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="reset-container">
            <h2>Reset Your Password</h2>
            <?php if(isset($_SESSION['error'])): ?>
                <div class="error"><?= $_SESSION['error']; unset($_SESSION['error']); ?></div>
            <?php endif; ?>
            
            <form class="reset-form" action="update_password.php" method="POST">
                <input type="hidden" name="token" value="<?= htmlspecialchars($token) ?>">
                
                <label>New Password:</label>
                <input type="password" name="password" required minlength="8">
                
                <label>Confirm New Password:</label>
                <input type="password" name="confirm_password" required minlength="8">
                
                <button type="submit" class="action-button">Reset Password</button>
            </form>
        </div>
    </div>
</body>
</html>