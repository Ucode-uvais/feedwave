import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import HeaderMenu from "./Header-menu";

const PageHeader = () => {
  return (
    <>
      <header className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-white/20 backdrop-blur-md">
        <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-b">
          <div className="flex h-14 items-center justify-between">
            <Image
              src="/feedwave_logo.png"
              alt="Logo"
              width={100}
              height={40}
            />
            <div>
              <SignedOut>
                <SignInButton>
                  <Button type="button" className="bg-black">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button type="button" className="bg-black ml-2">
                    Sign Up
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <HeaderMenu />
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default PageHeader;
