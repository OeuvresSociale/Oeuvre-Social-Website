const typeLoan= require('../models/LaonType');

/**to test : http://localhost:8000/api/typeLaon
 * {
  "maxPourcentage":"30",
  "maxMonth":"12",
  "maxAmount":"50000",
  "desc":"this is a loan type"
}
*/
//Get all request
const getTypeLaon = async (req, res) => {
    try {
      const typesRequest = await typeLoan.find();
      res.status(200).json(typesRequest);
    } catch (error) {
      res.status(404).json({ message: error.message });
    } 
  };

//create new type of request : laon by admin
const addTypeLaon = async (req, res) => {
        try {
          const newTypeRequest = new typeLoan(req.body);
          const saveTypeRequest = await newTypeRequest.save();
          res.status(200).json(saveTypeRequest);
          console.log("TypeRequest has been created");
        } catch (error) {
          // Handle other errors
          console.error(error);
          res.status(500).json({ error: "Internal server error" });
        }
  };
  
  //update
  const updateTypeLaon = async (req, res) => {
    try {
        const updatedtypeRequest = await typeLoan.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        ); 
        res.status(200).json(updatedtypeRequest);
        console.log("typeRequest has been updated");
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
  };
 

module.exports={
    getTypeLaon,
    addTypeLaon,
    updateTypeLaon
}