"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import Button from "@/components/Button";

type ClassSession = {
  id: string;
  start_time: string;
  day_of_week: number;
  capacity: number;
  class_types: { name: string; description: string };
};

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function getThisWeeksDates() {
  const today = new Date();
  const currentDay = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((currentDay + 6) % 7));

  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function BookClassPage() {
  const [sessions, setSessions] = useState<ClassSession[]>([]);
  const [booked, setBooked] = useState<Record<string, boolean>>({});
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFreePlan, setIsFreePlan] = useState(false);

  useEffect(() => {
    const checkMembershipAndLoad = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login"; // simple redirect if not logged in
        return;
      }

      const { data: membershipData, error: membershipError } = await supabase
        .from("user_memberships")
        .select("memberships ( name )")
        .eq("user_id", user.id);

      if (membershipError) {
        console.error(membershipError);
        return;
      }

      const planName = (membershipData?.[0] as any)?.memberships?.name;

      if (!planName || planName === "Free Member") {
        setIsFreePlan(true);
        setLoading(false);
        return;
      }

      const { data: sessionsData, error } = await supabase
        .from("class_sessions")
        .select("id, start_time, day_of_week, capacity, class_types(name, description)")
        .order("day_of_week, start_time");

      if (error) {
        console.error(error);
      } else {
        setSessions(sessionsData as unknown as ClassSession[]);
        setWeekDates(getThisWeeksDates());
      }

      setLoading(false);
    };

    checkMembershipAndLoad();
  }, []);

  async function handleBook(session: ClassSession, date: Date) {
    const key = `${session.id}-${date.toDateString()}`;
    if (booked[key]) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Check if already booked
    const { data: existing } = await supabase
      .from("bookings")
      .select("id")
      .eq("user_id", user.id)
      .eq("session_id", session.id)
      .eq("scheduled_date", date.toISOString().split("T")[0]);

    if (existing && existing.length > 0) {
      alert("You've already booked this class.");
      setBooked((prev) => ({ ...prev, [key]: true }));
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      session_id: session.id,
      scheduled_date: date.toISOString().split("T")[0],
    });

    if (error) {
      alert("Booking failed: " + error.message);
    } else {
      setBooked((prev) => ({ ...prev, [key]: true }));
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Checking membership...
      </div>
    );
  }

  if (isFreePlan) {
    return (
      <div className="p-10 max-w-xl mx-auto mt-10 text-center border rounded-lg shadow bg-white">
        <h1 className="text-xl font-bold mb-4">🚫 Booking Locked</h1>
        <p className="text-gray-600 text-md mb-6">
          You’re currently on the <strong>Free Plan</strong>. Upgrade to unlock unlimited class bookings and access exclusive sessions.
        </p>
        <a
          href="/"
          className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded text-sm font-medium transition"
        >
          Upgrade Membership
        </a>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📅 Book a Class</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {weekDays.map((day, idx) => {
          const date = weekDates[idx];
          const daySessions = sessions.filter((s) => s.day_of_week === idx + 1);

          return (
            <div
              key={day}
              className="bg-gray-100 p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{day}</h2>
              <p className="text-sm text-gray-500 mb-4">
                {date?.toLocaleDateString()}
              </p>

              {daySessions.length === 0 && (
                <p className="text-gray-400">No classes</p>
              )}

              {daySessions.map((cls) => {
                const key = `${cls.id}-${date.toDateString()}`;
                return (
                  <div key={cls.id} className="mb-4 border-b pb-3">
                    <p className="text-lg font-medium">{cls.class_types.name}</p>
                    <p className="text-sm text-gray-600">
                      {cls.start_time.slice(0, 5)} hrs
                    </p>
                    <Button
                      className={`mt-2 ${booked[key]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                      disabled={booked[key]}
                      onClick={() => handleBook(cls, date)}
                    >
                      {booked[key] ? "Booked ✅" : "Book Class"}
                    </Button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
