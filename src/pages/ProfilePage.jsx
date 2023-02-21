import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);
  return user ? <h1>{user.displayName}</h1> : "Not logged in";
}
export default ProfilePage;
