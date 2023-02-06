const Expense = require('../model/expense');

const path = require('path');

const rootDir = require('../util/path');


exports.gethtml = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'view','expenses.html'));
}

exports.premium = (req,res,next)=>{
  res.sendFile(path.join(rootDir,'view','expensepremium.html'));
}

function isstringinvalid(string) {
    if(string == undefined || string.length === 0) {
        return true
    } else {
        return false
    }
}
// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { expenseamount, description, category } = req.body;
    
    if(isstringinvalid(expenseamount)) {
        return res.status(400).json({err: "Bad parameters . Something is missing"})
        
    }
    await Expense.create({ expenseamount, description, category ,userId:req.user.id}).then((expense) => {
        return res.status(201).json({ expense, success: true, message: "Expense Added to DB" });
        
      }
    );
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
    
  }
};
// Get Expense
exports.getExpense = (req, res) => {
  try{
  Expense.findAll({where:{userId:req.user.id}}).then(expenses => {
    return res.status(200).json({expenses, success:true})
  })
  }catch(err) {
    return res.status(500).json({ error: err, success: false})
  }
}

// Delete
exports.deleteExpense = (req, res) => {
  const expenseid = req.params.expenseid;

  
  if(isstringinvalid(expenseid)) {
    return res.status(400).json({success: false, message: 'Error Expense Id'});

  }
  Expense.destroy({ where: { id: expenseid ,userId:req.user.id}}).then(() => {
    return res.status(200).json({ success: true, message: 'Deleted Successfully'})
  }).catch(err => {
    console.log(err);
    return res.status(500).json({ success: true, message: 'Failed'})
  })
}