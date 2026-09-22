"use client";

import Logo from "@/assets/svg/Logo";
import { Button } from "@/components/ui/button";
import { useGetMe, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Tata", {
          description: "Logged out successfully",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: () => {
        toast.error("Logout failed", {
          description: "Something Went Wrong",
        });
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Logo />
          <span>PH Healthcare</span>
        </div>

        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
          {!isLoading && !data && (
            <Button variant={"outline"} asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogout} variant={"destructive"}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
