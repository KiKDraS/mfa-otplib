import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const Mfa = () => {
  const [token, setToken] = useState("");
  const { qrCode, verifyOTP } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOTP(token);
  };

  return (
    <section className="container-fluid">
      <h1>Two-Factor Authentication Setup</h1>
      <p>Scan the QR code with your authenticator app:</p>
      <div className="container-fluid">
        <img src={qrCode} alt="QR code" />
        <div className="row">
          <form onSubmit={handleSubmit} className="col-12 col-md-6 col-lg-4">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="token"
                aria-describedby="emailHelp"
                placeholder="example@example.com"
                name="token"
                onChange={(e) => setToken(() => e.target.value)}
                required
              />
              <label htmlFor="token" id="token">
                OTP code
              </label>
            </div>
            <input
              type="submit"
              value="Verify OTP"
              className="btn btn-primary"
            />
          </form>
        </div>
      </div>
    </section>
  );
};
export default Mfa;
