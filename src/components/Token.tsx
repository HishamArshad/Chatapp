"use client";
import { observer } from "@legendapp/state/react";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { handleGoogleAuth } from '@/actions/serverActions'; // update path as needed

const Token = observer(() => {
  const searchParams = useSearchParams();
  const authCode = searchParams.get('code');
  const called = useRef(false);
 const router = useRouter();
  useEffect(() => {
    if (authCode && !called.current) {
      called.current = true;

      handleGoogleAuth(authCode)
          .then(() => {
          // ✅ Clear the code from the URL and navigate to protected page
          router.replace("/chat"); // or just "/" if you want homepage
        })
        .catch((err) => {
          console.error("Auth error:", err);
          router.replace("/login");
        });
 
    }
  }, [authCode]);

  return null;
});

export default Token;
