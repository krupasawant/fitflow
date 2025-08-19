// app/upcoming/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type ClassType = {
  name: string;
  description: string;
};

type ClassSession = {
  start_time: string;
  class_types: ClassType;
};

type UpcomingBooking = {
  id: string;
  scheduled_date: string;
  class_sessions: ClassSession[];
};

export default function UpcomingBookingsPage() {
  const [bookings, setBookings] = useState<UpcomingBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadBookings = async () => {
      // 1. Check if logged in
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // 2. Check membership
      const { data: membershipData, error: membershipError } = await supabase
        .from("user_memberships")
        .select("memberships ( name )")
        .eq("user_id", user.id);

      if (membershipError) {
        console.error(membershipError);
        return;
      }

      const planName = (membershipData?.[0] as any)?.memberships?.name;
      if (!planName || planName === "free") {
        router.push("/"); // redirect non-paying users
        return;
      }

      // 3. Fetch upcoming bookings
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          id,
          scheduled_date,
          class_sessions (
            start_time,
            class_types ( name, description )
          )
        `
        )
        .eq("user_id", user.id)
        .gte("scheduled_date", new Date().toISOString().split("T")[0])
        .order("scheduled_date", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        // Normalize class_sessions and class_types
        const normalized = (data || []).map((b: any) => ({
          ...b,
          class_sessions: Array.isArray(b.class_sessions)
            ? b.class_sessions.map((s: any) => ({
                ...s,
                class_types: Array.isArray(s.class_types)
                  ? s.class_types[0]
                  : s.class_types,
              }))
            : b.class_sessions
            ? [
                {
                  ...b.class_sessions,
                  class_types: Array.isArray(b.class_sessions.class_types)
                    ? b.class_sessions.class_types[0]
                    : b.class_sessions.class_types,
                },
              ]
            : [],
        }));

        setBookings(normalized as UpcomingBooking[]);
      }

      setLoading(false);
    };

    loadBookings();
  }, [router]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🗓 Upcoming Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">
          No upcoming classes booked yet.
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="p-4 border rounded-lg shadow bg-white">
              {/* Booking Header */}
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold">
                  {new Date(b.scheduled_date).toDateString()}
                </p>
                <button
                  className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50"
                  onClick={async () => {
                    await supabase.from("bookings").delete().eq("id", b.id);
                    setBookings((prev) =>
                      prev.filter((bk) => bk.id !== b.id)
                    );
                  }}
                >
                  Cancel
                </button>
              </div>

              {/* Sessions inside a booking */}
              <div className="space-y-2">
                {b.class_sessions.length === 0 ? (
                  <p className="text-sm text-gray-500">No sessions found</p>
                ) : (
                  b.class_sessions.map((session, idx) => {
                    const classType = session.class_types;
                    const startTime = session.start_time
                      ? new Date(
                          `1970-01-01T${session.start_time}Z`
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "";

                    return (
                      <div
                        key={idx}
                        className="p-3 border rounded bg-gray-50"
                      >
                        <p className="text-lg font-semibold">
                          {classType?.name || "Unnamed Class"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {classType?.description || ""}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          at {startTime}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
