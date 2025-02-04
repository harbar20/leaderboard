"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ClientRefresh({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            router.refresh();
        }, 500); // 10 seconds

        return () => clearInterval(interval);
    }, [router]);

    return <>{children}</>;
}
