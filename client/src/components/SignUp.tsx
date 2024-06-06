import React from "react";
import { Card, CardContent, CardFooter, CardTitle, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { useUser } from "@/context/UserProvider";
import { CheckboxDemo } from "./CheckboxDemo";

function Signup() {
  const { registerUser, loading, user } = useUser();
  const navigate = useNavigate();
  const [creds, setCreds] = React.useState({ fullName: "", email: "", password: "", confirmPassword: "" });
  const [showPwd, setShowPwd] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (user?._id) {
      if (user.isAdmin) {
        navigate("/admin/teachersabsent");
      } else {
        navigate("/bookroom");
      }
    }
  }, [user, navigate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (creds.password !== creds.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    await registerUser(creds.fullName, creds.email, creds.password);
  }

  return (
    <section className="min-h-screen min-w-screen">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Card className="lg:w-2/5 sm:w-3/5 w-4/5 mx-auto dark:bg-card bg-zinc-100 mt-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="fullName">Name</Label>
              <Input
                id="fullName"
                placeholder="Name"
                type="text"
                value={creds.fullName}
                autoComplete="name"
                onChange={(e) => setCreds({ ...creds, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={creds.email}
                autoComplete="email"
                onChange={(e) => setCreds({ ...creds, email: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type={showPwd ? "text" : "password"}
                value={creds.password}
                onChange={(e) => setCreds({ ...creds, password: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                placeholder="Confirm Password"
                type={showPwd ? "text" : "password"}
                value={creds.confirmPassword}
                onChange={(e) => setCreds({ ...creds, confirmPassword: e.target.value })}
              />
               <div>
              <p>Already have a Account?<Link to='/signin' style={{color:"blue"}}>&nbsp; Sign In</Link></p>
            </div>
              <CheckboxDemo
                text="Show Password"
                value={"showpwd"}
                name="show-password"
                handleChange={() => setShowPwd(!showPwd)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </CardContent>
          <CardFooter className="flex justify-evenly">
            <Button
              type="submit"
              size="lg"
              disabled={
                loading || !creds.email || !creds.password || !creds.confirmPassword
              }
            >
              Sign Up
            </Button>
            <Button
              variant="outline"
              type="reset"
              size="lg"
              disabled={loading}
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}

export default Signup;
