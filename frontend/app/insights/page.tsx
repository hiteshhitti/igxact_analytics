"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSmoothRouter } from "@/components/UseSmoothRouter";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Line,
  ResponsiveContainer, LabelList, PieChart, Pie, Cell
} from "recharts";

export default function InsightsPage() {
  const [data, setData] = useState<any>(null);
  const { push, isExiting } = useSmoothRouter();

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/data")
      .then(res => res.json())
      .then(res => setData(res));
  }, []);

const isLoading = !data;
const insights = data?.insights || {};
const extra = data?.extra_insights || {};


  const card =
    "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:scale-[1.03] transition";

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-black via-[#020617] to-[#0f172a] text-white p-10">
        {isLoading && (
  <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
    <p className="animate-pulse text-white text-lg">Loading Insights...</p>
  </div>
)}
      <button onClick={() => push("/")}>
        🏠 Dashboard
      </button>
      <h1 className="text-4xl font-bold mb-8">🔥 AI Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


    <div className={card}>
            <h2 className="mb-4">💰 Vehicle Revenue</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={extra.vehicle_deal}>
                <XAxis dataKey="vehicle" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
    </div>


        <div className={card}>
            <h2 className="mb-4">🚛 Profit Per Day</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={extra.vehicle_profit_per_day}>
                <XAxis dataKey="vehicle" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#22c55e" />
                </BarChart>
            </ResponsiveContainer>
        </div>



        <div className={card}>
            <h2 className="mb-4">🅿️ Parking / Day</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={extra.parking_per_day}>
                <XAxis dataKey="vehicle" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f97316" />
                </BarChart>
            </ResponsiveContainer>
        </div>

      </div>
    </div>
    
  );
}