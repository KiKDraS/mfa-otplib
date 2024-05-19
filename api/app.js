require("dotenv").config();
const express = require("express");
const { authenticator } = require("otplib");
const qrcode = require("qrcode");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Generar secret key (vincula la app con el authenticator)
const generateSecret = () => authenticator.generateSecret();

//Generar OTP
// const generateOTP = (secret) => authenticator.generate(secret);

//Verificar OTP del usuario
const verifyOTP = (secret, token) => authenticator.verify({ secret, token });

//Generar QR Code
const generateQRCode = async (secret, email) => {
  const otpauthURL = authenticator.keyuri(email, "MyApp", secret);

  try {
    const qrImage = await qrcode.toDataURL(otpauthURL);
    return qrImage;
  } catch (error) {
    console.log("Error generating QR code:", error);
    return null;
  }
};

//Get QR Code
app.post("/mfa-setup", async (req, res) => {
  const { email } = req.body;
  if (email) {
    const secret = generateSecret();
    //Almacenar el secret con los datos de usuario. Caso contrario debe scannear el QR todas las veces
    const qrCode = await generateQRCode(secret, email);
    res.status(200).json({ secret, qrCode });
  } else {
    res.status(401).json("Unauthorized access");
  }
});

app.post("/verify", (req, res) => {
  const { secret, token } = req.body;
  const isValid = verifyOTP(secret, token);

  if (isValid) res.status(200).json({ isValid });
  else res.status(401).json("Unauthorized access");
});

//Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
