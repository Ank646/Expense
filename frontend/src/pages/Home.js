import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Items from "../components/Items";
import { Chartss } from "../components/Chartss";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from "react-top-loading-bar";
import {
  getTotalExpenses,
  createExpense,
  filterExpensesByCategory,
  getUserExpenses,
} from "../utils/renders";
import NavBar from "../components/NavBar";

function Home() {
  const navigate = useNavigate();
  const ref = useRef(null);

  
  const [selectDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem("User")));
  const [userexp, setUserexp] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");

  document.title = "Home";

  
  const fetchExpenses = async () => {
    const data = await getUserExpenses(userdata._id);
    setUserexp([...data]);
  };

  
  const filterByCategory = async (category) => {
    if (!category && !startDate && !endDate) {
      fetchExpenses();
      return;
    }

    let filteredData = [];

    if (startDate && endDate) {
      const dateFilteredExpenses = await getTotalExpenses(startDate, endDate);
      const dateFilteredExpense = dateFilteredExpenses.message;

      filteredData = category
        ? dateFilteredExpense.filter((exp) => exp.category === category)
        : dateFilteredExpense;
    } else if (category) {
      const categoryFiltered = await filterExpensesByCategory(
        category,
        userdata._id
      );
      filteredData = categoryFiltered.data;
    }

    setUserexp(filteredData);
  };

  
  useEffect(() => {
    if (startDate && endDate) {
      filterByCategory(filteredCategory);
    }
  }, [startDate, endDate]);

  
  const getTotal = () => userexp.reduce((sum, item) => sum + item.amount, 0);

  
  useEffect(() => {
    if (!localStorage.getItem("User")) {
      navigate("/login");
    }
    fetchExpenses();
  }, [userdata._id, navigate]);

  return (
    <div className="min-h-screen w-full bg-gray-600 font-mont text-white">
      <LoadingBar color="#FF9800" ref={ref} />
      <NavBar data={userexp} />

      {}
      <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-8">

        {}
        <div className="lg:w-1/2 w-full">
          <div className="p-6 bg-gray-900 rounded-3xl shadow-lg">
            <Chartss exdata={userexp} />
          </div>
        </div>

        {}
        <div className="lg:w-2/3 w-full flex flex-col gap-6">

          {}
          <div className="bg-gray-800 rounded-3xl p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-orange-400 to-yellow-500 text-transparent bg-clip-text">Add Expense</h2>

            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="number" 
                placeholder="Amount" 
                onChange={(e) => setAmount(e.target.value)} 
                className="w-full md:w-1/2 p-3 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <select 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full md:w-1/2 p-3 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">--Select Category--</option>
                {["Grocery", "Vehicle", "Shopping", "Travel", "Food", "Fun", "Other"].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <DatePicker
                selected={selectDate ? new Date(selectDate) : null}
                onChange={(date) => setSelectedDate(date?.toISOString().split("T")[0])}
                className="p-3 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholderText="Date"
              />
              <button
                onClick={() => {
                  const expInfo = { usersid: userdata._id, category, date: selectDate, amount };
                  ref.current.staticStart();
                  createExpense(expInfo);
                  ref.current.complete();
                }}
                className="p-3 w-full bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-transform transform hover:scale-105"
              >
                + Add Expense
              </button>
            </div>
          </div>

          {}
          <div className="bg-gray-800 rounded-3xl p-4 flex flex-wrap gap-4 justify-center shadow-lg">
            <DatePicker
              selected={startDate ? new Date(startDate) : null}
              onChange={(date) => setStartDate(date?.toISOString().split("T")[0])}
              className="p-3 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate ? new Date(endDate) : null}
              onChange={(date) => setEndDate(date?.toISOString().split("T")[0])}
              className="p-3 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholderText="End Date"
            />
            <select 
              onChange={(e) => {
                setFilteredCategory(e.target.value);
                filterByCategory(e.target.value);
              }} 
              className="w-full md:w-1/3 p-3 rounded-xl bg-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Categories</option>
              {["Grocery", "Vehicle", "Shopping", "Travel", "Food", "Fun", "Other"].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {}
          <div className="bg-gray-800 rounded-3xl p-6 overflow-y-auto max-h-96 shadow-lg">
            <h2 className="text-3xl font-bold mb-4">Total Expense: ₹ {getTotal()}</h2>
            {userexp.length === 0 ? (
              <p className="text-center text-gray-300">No expenses found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userexp.map((item, index) => (
                  <Items key={item?._id || `expense-${index}`} data={item} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
