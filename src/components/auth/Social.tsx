"use client"
import { Button } from "@/components/ui/button";
export default function Social() {
  const googleClientId = "11171866817-27irv6kp4bf54pdogq5mh497ao65psn6.apps.googleusercontent.com"; // Replace with your actual Google Client ID
  const redirectUri = "https://chatapp-coral-one.vercel.app"; // Your frontend callback URI

  const handleLogin = () => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=openid%20email%20profile`;
    window.location.href = googleAuthURL;
  };

  return (
    
      <Button onClick={handleLogin} variant="outline" className="w-full">
            Login with Google
        </Button>
  );
}
