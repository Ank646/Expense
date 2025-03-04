const expenseModel = require('../db/expenseModel');
const userModel = require('../db/userModel');
const sendEmailWithAttachment = require('../utils/emailSend');
const { error, success } = require('../utils/handler');
const filterExpenses = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }

        
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0); 

        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999); 

        
        const expenses = await expenseModel.find({
            
        });

        return res.status(200).json(expenses);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getTotalExpenses = async (req, res) => {
    try {
        const { start, end } = req.query;
        
        if (!start || !end) {
            return res.send(error(400, "Start and end date are required"));
        }
console.log(start); 
console.log(end);
        const total = await expenseModel.find(
            {
    
                    date: { $gte: start, $lte: end },
                })
        return res.send(success(200, total));
    } catch (e) {
        return res.send(error(500, e.message));
    }
};

const createExpense =async (req,res)=>{
    try {
        const {amount , category , date , usersid} = req.body;
        if(!amount || !category || !date || !usersid)
        {
            return res.send(error(401,"All Details Are Required"));
        }
        const newExpense = await expenseModel.create(req.body);
        const userToUse = await userModel.findById(usersid).populate('expense_id');
        console.log(date)
        userToUse.expense_id.push(newExpense._id);
        newExpense.save();
        userToUse.save();
        return res.send(success(200,newExpense))
        
    } catch (e) {
        return res.send(error(401,e.message))
    }
}

const deleteExpense = async (req,res)=>{
    try {
        const {expenseId , userId} = req.body;

        const expense = await expenseModel.findById(expenseId)
        const user = await userModel.findById(userId);
        
        
        if(!expense || !user)
        {
            return res.send(error(401,`Invalid ${!expense } + ${!user}`))
        }
        
        if(user.expense_id.includes(expenseId))
        {
            
            await expenseModel.findByIdAndDelete(expenseId);
            console.log(user.expense_id);
            const index =  user.expense_id.indexOf(expenseId);
            console.log("here " + index);
            user.expense_id.splice(index,1);
        }
        await user.save();
       return res.send(success(201,{respo : 'Successfully Deleted' , user}));
    } catch (e) {
       return res.send(error(401,e.message))
    }
}

const getAllExpenses = async (req,res)=>{
    try {
        
        const {userId} = req.body;
        const user = await userModel.findById(userId).populate('expense_id');
        
        return res.send(success(200,user.expense_id.sort()));
    } catch (e) {
        return res.send(error(401,e.message))   
    }
}
const getCategoryExpense = async (req, res) => {
    try {
        const { category } = req.query;
        const {userId}=req.body;
console.log(category);
console.log(userId);
        if (!category || !userId) {
            return res.status(400).json({ success: false, message: "Category and userId are required" });
        }

        const expenses = await expenseModel.find({ category:category, usersid:userId });
        return res.status(200).json({ success: true, data: expenses });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const emailSender = (req,res)=>{
    try {
        const {recipient , body} = req.body;
        sendEmailWithAttachment(recipient,body);
        return res.send(success(201,"Email Sent"))
    } catch (error) {
        return res.send(error(401,"Email Is Wrong"))
    }
}


module.exports = {
    createExpense ,
    deleteExpense , 
    getCategoryExpense ,
    getAllExpenses,
    emailSender, filterExpenses,
    getTotalExpenses
}