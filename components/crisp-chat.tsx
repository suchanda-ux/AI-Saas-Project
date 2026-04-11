"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("4812f0f2-b695-49b7-a0f5-901bf6a9f3f0");
  }, []);

  return null;
}