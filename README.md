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
            background: url('photo') no-repeat center center fixed;
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
        #time {
            font-size: 1.8em;
            font-weight: bold;
            color: gold;
        }
        .slogan {
            font-size: 1.5em;
            color: #fff;
            background-color: #FFCC00; /* Dark yellow background */
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            font-weight: bold;
        }
        .enter-btn {
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
        .enter-btn:hover {
            background: #ffcc00;
        }
    </style>
</head>
<body>
    <div class="overlay"></div>
    <div class="content">
        <h1>Kabiraj Bhatt</h1>
        <h2>Age: 27 years, 328 days</h2>
        <div id="time"></div>
        <div class="slogan">एक सकारात्मक सोच तपाईको जीवन बदल्न सक्छ।</div>
        <button class="enter-btn" onclick="enterSite()">Enter</button>
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
        window.location.href = "krb wrb.html";}
        function sign upSite() {
        window.location.href = "kabiraj form.html";}
    </script>
</body>
</html>
