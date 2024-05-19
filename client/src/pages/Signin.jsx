import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Signin = () => {
  const { getQRCode } = useContext(AuthContext);
  return (
    <section className="container py-4 px-3 mx-auto">
      <h1>Sign in</h1>
      <div className="container-md p-2 p-lg-4">
        <div className="row">
          <form className="col-md-12 col-lg-4">
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                aria-describedby="emailHelp"
                placeholder="example@example.com"
              />
              <label htmlFor="floatingInput">Email address</label>
              <div id="emailHelp" className="form-text">
                We&apos;ll never share your email with anyone else.
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="***************"
              />
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="row py-2">
          <div className="w-100 d-inline-flex justify-content-center align-items-center flex-nowrap">
            <div className="border border-secondary-subtle w-100"></div>
            <span className="px-2">OR</span>
            <div className="border border-secondary-subtle w-100"></div>
          </div>
        </div>
        <div className="row">
          <div className="w-100 d-inline-flex justify-content-center align-items-center flex-nowrap">
            <GoogleLogin
              text="signin_with"
              cancel_on_tap_outside={true}
              useOneTap={true}
              auto_select={false}
              context="signin"
              use_fedcm_for_prompt={true}
              onSuccess={(credentialResponse) => {
                getQRCode(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Signin;
