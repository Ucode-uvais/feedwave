"use client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating...
        </>
      ) : (
        "Create Project"
      )}
    </Button>
  );
};

export default SubmitBtn;
