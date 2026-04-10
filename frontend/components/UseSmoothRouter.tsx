"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function useSmoothRouter() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const push = useCallback(
    (href: string) => {
      setIsExiting(true);
      document.body.classList.add("page-exit");
      
      setTimeout(() => {
        router.push(href);
      }, 400);
    },
    [router]
  );

  return { push, isExiting };
}
