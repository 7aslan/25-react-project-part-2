import { auth } from "../../firebase-config";
import AuthPage from "./auth-page";
import UnauthPage from "./unauth-page";
import { useAuthState } from "react-firebase-hooks/auth";
import './firebase-auth.css'

function FirebaseAuth() {
  const [user, loading, error] = useAuthState(auth);


  if (loading) {
    return <h1>Loading Please Wait...</h1>;
  }

  const content = loading ? (
    <h1>Loading Please Wait...</h1>
  ) : user ? (
    <AuthPage />
  ) : (
    <div>
      <UnauthPage />
    </div>
  );

  return (
    <div className="firebase-auth-container">
      <h1>Firebase Auth</h1>
      {content}
    </div>
  );
}

export default FirebaseAuth;
