'use client'
import { Button } from "@/components/ui/button";
import { Languages, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebaseConfig";
import Login from "../login/login";


export default function Header() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="flex gap-4">
      <div className="flex gap-4 flex-1 justify-center">
        {!user ? (
          <Login />
        ) : (
          <Button 
            variant="link" 
            className="text-white p-0"
            onClick={handleSignOut}
          >
            Logout
          </Button>
        )}
        <Button variant="link" className="text-white p-0">
          Planos
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 bg-zinc-800 border-none hover:bg-zinc-800 hover:opacity-90"
        >
          <Sun className="text-zinc-500" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 bg-zinc-800 border-none hover:bg-zinc-800 hover:opacity-90 p-1"
        >
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub</title>
            <path
              fill="#71717a"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 bg-zinc-800 border-none hover:bg-zinc-800 hover:opacity-90"
        >
          <Languages className="text-zinc-500" />
        </Button>
      </div>
    </div>
  );
}
