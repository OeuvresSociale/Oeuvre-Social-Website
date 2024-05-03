const outcome=require("../models/transaction");
const budget = require('../models/budget');
 
// add initila budjet
const initBudget=async (req,res)=>{ 
    try{
        const init = new budget({initialAmount});
        const saveinit = await init.save();
        res.status(201).json(saveinit);
    }catch(error){
        console.error("Error initialize budget:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//update budget
const updateBudget=async (req,res)=>{
    try {
        const updatedbudget = await outcome.findByIdAndUpdate(req.params.id,{$set: req.body},{ new: true });
        if (!updatedbudget) {
          return res.status(404).json({ error: "budget not found" });
        }
        // Send success response
        return res.status(200).json({ message: "budget updated and moved successfully"});
      } catch (error) {
        console.error("Error updating budget:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    };

module.exports={
    initBudget,
    updateBudget
}