import "./register.scss";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react"; // Import Clerk SignUp hook

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, isLoaded } = useSignUp(); // Clerk sign-up

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-Up with Clerk
  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/list", // Redirect after sign-up
      });
    } catch (err) {
      console.error("Google Sign-up Error:", err);
      setError("Failed to sign up with Google.");
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" required />
          <input name="email" type="text" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <button className="google-btn" onClick={handleGoogleSignUp}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHQ31PQmO35YNg3EL8HUhyIJXjBX2YigTFjj9roeDLYN2XexiCj4Hq2MZ3Gyu-dmyN84&usqp=CAU" alt="Google" width="20" height="20" />
          Sign up with Google
        </button>
          <Link to="/login">Already have an account?</Link>
        </form>

      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
