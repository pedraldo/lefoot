"use client";

import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import FormError from "../form/form-error";
import FormSuccess from "../form/form-success";
import CardWrapper from "./card-wrapper";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const mounted = useRef(false);

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("Missing token !");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong !");
      });
  }, [token]);

  useEffect(() => {
    if (mounted.current) {
      return;
    } else {
      mounted.current = true;
      onSubmit();
    }
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
