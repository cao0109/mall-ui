"use client";

import { QueryClient } from "@tanstack/react-query";
import { CartProvider, MedusaProvider } from "medusa-react";
import React from "react";

const queryClient = new QueryClient();

interface MedusaProviderProps {
  children: React.ReactNode;
}

export function MedusaWrapper({ children }: MedusaProviderProps) {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={
        process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
      }
      maxRetries={3}
    >
      <CartProvider>{children}</CartProvider>
    </MedusaProvider>
  );
}
