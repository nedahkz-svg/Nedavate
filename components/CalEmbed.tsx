"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/**
 * Inline Cal.com embed. `calLink` is the path after cal.com/ — e.g.
 * "neda/free-strategy-call". Styled to match the Nedavate palette.
 *
 * Paid bookings: enable the Stripe app on the paid event type inside Cal.com,
 * and the payment step appears automatically inside this same embed.
 */
export function CalEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#0F9E78" }, // Catalyst Teal
          dark: { "cal-brand": "#0F9E78" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
