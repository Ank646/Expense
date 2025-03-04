import { axiosClient } from "./axiosClient";
import {toast} from 'react-hot-toast'
export const getTotalExpenses = async (start, end) => {
    try {
        const response = await axiosClient.get(`/expenses/expenses/total`, {
            params: { start, end }
        });
        console.log("Fetched Expenses:", response.data);
        return response.data; 
    } catch (error) {
        console.error("Error fetching total expenses:", error);
        return 0;
    }
};
export const filterExpensesByCategory = async (category, userId) => {
    try {
       
        const response = await axiosClient.post(`/expenses/categoryExpense?category=${category}`, { userId });
 console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error filtering expenses:", error);
        return [];
    }
};

export const getUserExpenses = async (userId)=>{
    try {
        
        const response = await axiosClient.post('/expenses/allExpenses',{
            userId
        });
        const exp = response.data.message.sort((a,b)=>{
            return new Date(b.date) - new Date(a.date);
        });
        return exp;
    } catch (error) {
        console.log(error.message);
    }
}

export const createExpense = async (expInfo)=>{
    try {
        console.log(expInfo)
        const response = await axiosClient.post('/expenses/addExpense',
            expInfo
        )
        console.log(response.data)
        if(response.data.statusCode !== 200)
        {
            toast.error(`${response.data.message}`);
            return;
        }
        window.location.reload();

        return;

    } catch (e) {
        console.log(e.message);
    }
}

export const deleteExpense = async (data)=>{
    try {
        const {expenseId,userId} = data ;
        const response = await axiosClient.post('/expenses/deleteExpense',{
            expenseId ,
            userId 
        });
        if(response.data.statusCode !== 201)
        {
            toast.error(`${response.data.message}`);
            return;
        }
        window.location.reload();

        console.log(response.data)
        return;
    } catch (error) {
        console.log(error.message)   
    }
}

export const sendEmail = async (sender , data)=>{
        try {
            const response = await axiosClient.post('/expenses/sendEmail',{
                recipient : sender , 
                body : data
            })
            toast.success("Email Sent");
            return response;
        } catch (e) {
            console.log(e.message)
            return e.message ;
        }
}