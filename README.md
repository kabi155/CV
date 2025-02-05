<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kabiraj Bhatt - VIP</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: url('kabiraj (13).jpg') no-repeat center center fixed;
            background-size: cover;
            color: #fff;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            position: relative;
        }
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1;
        }
        .content {
            position: relative;
            z-index: 2;
            padding: 20px;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        }
        h1 {
            font-size: 3em;
            margin: 0;
        }
        h2 {
            font-size: 2em;
            margin: 10px 0;
        }
        #age {
            font-size: 1.5em;
            font-weight: bold;
            color: gold;
        }
        #time {
            font-size: 1.8em;
            font-weight: bold;
            color: gold;
        }
        .slogan {
            font-size: 1.5em;
            color: #fff;
            background-color: #FFCC00;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-weight: bold;
        }
        .enter-btn, .signup-btn, .photo-btn, .back-btn {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 1.5em;
            background: gold;
            border: none;
            color: black;
            font-weight: bold;
            cursor: pointer;
            border-radius: 8px;
        }
        .enter-btn:hover, .signup-btn:hover, .back-btn:hover {
            background: #ffcc00;
        }
        .photo-btn {
            background: green;
            color: white;
        }
        .photo-btn:hover {
            background: #4CAF50;
        }
    </style>
</head>
<body>
    <div class="overlay"></div>
    <div class="content">
        <h1>Kabiraj Bhatt</h1>
        <h2 id="age">Calculating...</h2>
        <div id="time"></div>
        <div class="slogan">एक सकारात्मक सोच तपाईको जीवन बदल्न सक्छ।</div>
        <button class="enter-btn" onclick="enterSite()">Enter</button>
        <button class="signup-btn" onclick="signupSite()">Sign Up</button>
        <button class="photo-btn" onclick="goToPhotoPage()">View Photo Gallery</button>
        <button class="back-btn" onclick="goBack()">Back to Home</button>
    </div>

    <script>
        function updateTime() {
            let now = new Date();
            let hours = now.getHours().toString().padStart(2, '0');
            let minutes = now.getMinutes().toString().padStart(2, '0');
            let seconds = now.getSeconds().toString().padStart(2, '0');
            document.getElementById("time").innerText = `${hours}:${minutes}:${seconds}`;
        }
        setInterval(updateTime, 1000);

        function enterSite() {
            window.location.href = "krb wrb.html";
        }

        function signupSite() {
            window.location.href = "kabiraj form.html";
        }

        function goToPhotoPage() {
            window.location.href = "photos.html"; 
        }

        function goBack() {
            window.history.back();
        }

        function calculateAge(birthDate) {
            let now = new Date();
            let birth = new Date(birthDate);

            let years = now.getFullYear() - birth.getFullYear();
            let months = now.getMonth() - birth.getMonth();
            let days = now.getDate() - birth.getDate();
            let hours = now.getHours() - birth.getHours();
            let minutes = now.getMinutes() - birth.getMinutes();
            let seconds = now.getSeconds() - birth.getSeconds();

            if (seconds < 0) {
                seconds += 60;
                minutes -= 1;
            }
            if (minutes < 0) {
                minutes += 60;
                hours -= 1;
            }
            if (hours < 0) {
                hours += 24;
                days -= 1;
            }
            if (days < 0) {
                months -= 1;
                let lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += lastMonth.getDate();
            }
            if (months < 0) {
                months += 12;
                years -= 1;
            }

            document.getElementById("age").innerText = `Age: ${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        }

        setInterval(() => calculateAge("1997-03-17T04:00:00"), 1000);
    </script>
</body>
</html>
