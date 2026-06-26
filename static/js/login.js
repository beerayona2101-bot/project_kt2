let emailMode = false;
let otpCode = "";

function switchLogin() {
    const card = document.getElementById("loginCard");
    const identity = document.getElementById("identity");

    emailMode = !emailMode;
    card.classList.toggle("email");

    if (emailMode) {
        identity.placeholder = "Email Address";
        document.getElementById("formTitle").innerText = "Email Login";
        document.getElementById("leftTitle").innerText = "Email Login";
        document.getElementById("leftText").innerText = "Login using your email";
    } else {
        identity.placeholder = "Mobile Number";
        document.getElementById("formTitle").innerText = "Mobile Login";
        document.getElementById("leftTitle").innerText = "Mobile Login";
        document.getElementById("leftText").innerText = "Login using your mobile";
    }
}

function sendOTP() {
    otpCode = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP (Demo):", otpCode);

    document.getElementById("loginForm").style.display = "none";
    document.getElementById("otpForm").style.display = "block";
    document.getElementById("loginMsg").innerText = "OTP sent successfully";
}

function verifyOTP() {
    const otp = document.getElementById("otp").value;

    if (otp == otpCode) {
        document.getElementById("loginMsg").innerText = "Login Successful ✅";
    } else {
        document.getElementById("loginMsg").innerText = "Invalid OTP ❌";
    }
}
