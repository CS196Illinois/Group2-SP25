'use client';
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";

const CLIENT_ID = "101841710148-alq2u6o6ehs3cqs044br74dhr8a8nk2u.apps.googleusercontent.com"

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] text-center px-4">
      {/* App Logo */}
      <Image
        src="/quadquesticon.png" // place the logo in public/
        alt="Quad Quest Logo"
        width={450}
        height={450}
        className="mb-6"
      />

      {/* App Title */}
      <h1 className="text-5xl font-extrabold text-blue-950 mb-2">Quad Quest</h1>

      {/* Welcome Message */}
      <p className="text-lg text-gray-700 mb-5 max-w-md">
        Welcome to Quad Quest – gamify your university life and assignments with coins and campus exploration!
      </p>
      <p className="text-lg text-gray-700 mb-5 max-w-md">
        Log In with your university account and have fun exploring your favorite place in the world ! </p>


      {/* Google Login */}
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div className="scale-150">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("✅ Login Success:", credentialResponse);
              router.push("/tasktracker");
            }}
            onError={() => {
              console.log("❌ Login Failed");
            }}
            size="large"
          />
        </div>
      </GoogleOAuthProvider>
    </main>
  );
}