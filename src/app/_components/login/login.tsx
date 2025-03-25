import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from "./auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      setAuthError("");
      await signInWithGoogle();
    } catch (error) {
      setAuthError("Failed to sign in with Google");
      console.error(error);
    }
  };

  const handleEmailAuth = async () => {
    try {
      setAuthError("");
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      setAuthError(isSignUp ? "Failed to create account" : "Failed to sign in");
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-white p-0">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 border rounded-xl border-zinc-900 text-zinc-400">
        <DialogHeader>
          <DialogTitle className="text-zinc-400 font-bold">
            {" "}
            {isSignUp ? "Criar Conta" : "Login"}
          </DialogTitle>
          <DialogDescription>
            {isSignUp
              ? "Insira seu e-mail abaixo para fazer login em sua conta"
              : "Insira seu e-mail abaixo para Cadastrar uma nova conta"}
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-zinc-400 font-bold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-zinc-400 "
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-zinc-400">
                  Password
                </Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-zinc-400"
              />
            </div>
            {authError && <p className="text-red-500 mb-2">{authError}</p>}
            <Button type="submit" className="w-full" onClick={handleEmailAuth}>
              {isSignUp ? "Criar Conta" : "Entrar"}
            </Button>
            <Button
              variant="outline"
              className="w-full bg-red-400/10 hover:bg-red-400/5 hover:text-red-500 px-1 text-sm rounded-sm border border-red-500 text-red-500"
              onClick={handleGoogleSignIn}
            >
             <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 50 50"
                fill="currentColor"
              >
                <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"></path>
              </svg>
             
              Login com Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              className="underline underline-offset-4 text-zinc-400 hover:text-zinc-400/80 hover:bg-transparent"
              variant={"ghost"}
            >
              {isSignUp
                ? "Já tem uma conta? Faça login"
                : "Não tem uma conta? Cadastre-se"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
