import axios from "axios";
import { useState, useEffect } from "react";

export const Balance = () => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(
        "https://paystream-1.onrender.com/api/v1/account",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const formattedBalance = response.data.balance.toFixed(1);
      setBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="flex">
      <div className="font-semibold text-lg">Your balance :</div>
      <div className="font-medium ml-4 text-lg">$ {balance}</div>
    </div>
  );
};
