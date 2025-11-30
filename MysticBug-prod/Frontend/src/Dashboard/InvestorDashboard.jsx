import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAuth } from "../Context/AuthContext"

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState("Monthly");
  const [investorData, setInvestorData] = useState([]);
  const { uid, user } = useAuth()
  const now = new Date();
  const hour = now.getHours();
  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 16) {
    greeting = "Good Afternoon";
  } else if (hour >= 16 && hour < 20) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/investors/${uid}`)
        if (!response.ok) throw new Error("error while getting investor data")
        const investordata = await response.json()
        setInvestorData(investordata.investorData?.[0] || [])
      } catch (error) {
        console.log("error while fetching investor data", error)
      }
    }
    if (uid) fetchInvestorData()
  }, [BASE_URL])

  const workforceData = [
    { name: "Doctors", value: 45, color: "#115a4c" },
    { name: "Patients", value: 30, color: "#75cac2" },
    { name: "Clinics", value: 25, color: "#1a7a68" }
  ];

  const totalWorkforce = workforceData.reduce((sum, item) => sum + item.value, 0);

  const patientsData = [
    {
      existing: -40,
      new: 30,
      referred: 45
    },
    {
      existing: 50,
      new: -25,
      referred: 35
    },
    {
      existing: -45,
      new: 40,
      referred: 50
    },
    {
      existing: 55,
      new: -30,
      referred: 40
    },
    {
      existing: -35,
      new: 45,
      referred: 55
    },
    {
      existing: 60,
      new: -20,
      referred: 45
    },
    {
      existing: -50,
      new: 50,
      referred: 60
    },
    {
      existing: 65,
      new: -35,
      referred: 50
    }
  ];

  return (
    <div className="bg-[#e0f5f5] pt-24 w-full min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 px-4 sm:p-0">
          {greeting}, <span className="text-gray-800">{user}</span>
        </h1>

        <div className="flex justify-center sm:justify-start gap-4 mb-6">
          {["Monthly", "Quarterly", "Yearly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 border rounded-lg font-semibold transition-all ${activeTab === tab
                ? "bg-[#115a4c] text-white border-[#115a4c]"
                : "border-[#115a4c] text-black hover:bg-[#115a4c] hover:text-white"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h1 className="text-lg font-semibold text-gray-700">Income</h1>
            <h2 className="text-3xl font-bold mt-2">₹{investorData.income}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h1 className="text-lg font-semibold text-gray-700">Expenses</h1>
            <h2 className="text-3xl font-bold mt-2">₹{investorData.expense}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center">
            <h1 className="text-lg font-semibold text-gray-700">Profits</h1>
            <h2 className="text-3xl font-bold mt-2">₹{investorData.profits}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-6 rounded-2xl shadow text-center h-auto">
            <h1 className="text-lg font-semibold text-gray-700">Return on Investment</h1>
            <h2 className="text-3xl font-bold mt-2">{investorData.roi}%</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow text-center h-auto">
            <h1 className="text-lg font-semibold text-gray-700">Equity Valuation</h1>
            <h2 className="text-3xl font-bold mt-2">₹{investorData.equityValuation}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow h-auto">
            <div className="flex justify-between items-center gap-6">
              <div className="text-center flex-1">
                <h1 className="text-lg font-semibold text-gray-700">Profitability</h1>
                <h2 className="text-3xl font-bold mt-2">{investorData.profitability}%</h2>
              </div>
              <div className="bg-gray-100 rounded-lg h-24 w-16 flex items-end p-1.5">
                <div
                  className="bg-[#75cac2] w-full rounded-t-lg transition-all duration-300"
                  style={{ height: `${investorData.profitability}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Workforce Card */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-sm font-semibold text-gray-600 mb-1">WORKFORCE</h2>
            <h1 className="text-3xl font-bold mb-4">{totalWorkforce.toLocaleString()}</h1>

            <div className="flex items-center justify-around">
              <div className="w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workforceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {workforceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-3 ml-4">
                {workforceData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-lg font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-sm font-semibold text-gray-600 mb-1">PATIENTS</h2>
            <h1 className="text-3xl font-bold mb-4">5,000,000</h1>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={patientsData} barGap={0} barCategoryGap="15%">
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey={null}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  domain={[-80, 80]}
                  ticks={[-60, -20, 20, 60]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="existing" fill="#2d2d2d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="new" fill="#4d4d4d" radius={[4, 4, 0, 0]} />
                <Bar dataKey="referred" fill="#75cac2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2d2d2d]"></div>
                <span>Existing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4d4d4d]"></div>
                <span>New</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#75cac2]"></div>
                <span>Referred</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;