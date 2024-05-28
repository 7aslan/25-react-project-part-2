import { useState } from "react";
import {
  auth,
  loginUsingEmailAndPassword,
  registerUsingEmailAndPassword,
} from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import FirebaseTodo from "../firebase-todo";
import './firebase-auth.css'
function Registeration({ formData, setFormData, handleRegister }) {
  return (
    <div className="register">
      <div className="input-wrapper">
        <label htmlFor="name">Full name: </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(event) =>
            setFormData({
              ...formData,
              name: event.target.value,
            })
          }
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
function Login({ formData, setFormData, handleLogin }) {
  return (
    <div className="login">
      <div className="input-wrapper">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />
      </div>

      <div className="input-wrapper">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

function UnauthPage() {
  const [isLoginView, setIsLoginView] = useState(false);
  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [user, loading, error] = useAuthState(auth);

  function handleRegister() {
    const { name, email, password } = registerFormData;
    registerUsingEmailAndPassword(name, email, password);
  }
  function handleLogin() {
    const { email, password } = loginFormData;
    loginUsingEmailAndPassword(email, password);
  }

  return (
    <div className="unauth-page-container">
      <div className="unauth-tab-view-container">
        <button onClick={() => setIsLoginView(false)}>Register View</button>
        <button onClick={() => setIsLoginView(true)}>Login View</button>
      </div>
      {isLoginView ? (
        <Login
          formData={loginFormData}
          setFormData={setLoginFormData}
          handleLogin={handleLogin}
        />
      ) : (
        <Registeration
          formData={registerFormData}
          setFormData={setRegisterFormData}
          handleRegister={handleRegister}
        />
      )}
      
      {!user ? <FirebaseTodo /> : null}
    </div>
  );
}

export default UnauthPage;
