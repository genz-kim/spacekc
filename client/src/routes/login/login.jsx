import "./login.scss";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useSignIn } from "@clerk/clerk-react"; // Import Clerk SignIn hook

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { signIn, isLoaded } = useSignIn(); // Clerk sign-in

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      updateUser(res.data);
      navigate("/list");
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In with Clerk
  const handleGoogleLogin = async () => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/list", // Redirect after login
      });
    } catch (err) {
      console.error("Google Sign-in Error:", err);
      setError("Failed to sign in with Google.");
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={15} type="text" placeholder="Username" />
          <input name="password" required minLength={3} maxLength={15} type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <button className="google-btn" onClick={handleGoogleLogin}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGHQ31PQmO35YNg3EL8HUhyIJXjBX2YigTFjj9roeDLYN2XexiCj4Hq2MZ3Gyu-dmyN84&usqp=CAU" alt="Google" width="20" height="20" />
          Sign In with Google
        </button>
          <Link to="/register">{"Don't"} have an account?</Link>
        </form>
        
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
