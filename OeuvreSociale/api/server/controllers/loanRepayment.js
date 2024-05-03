const laonRepaymen= require('../models/loanRepaymen');

const getRepayment =async(req,res)=>{
    try {
        const request = await laonRepaymen.findById(req.params.id,)
        res.status(200).json(request);
      } catch (err) {
          // Handle errors
          res.status(500).json(err);
      }
};

const getallRepayment = async (req, res) => {
    // current page
    const page = req.query.page || 1;
    const RequestPerPage = 10;
    const skipRequests = (page - 1) * RequestPerPage;
    const filter = req.query.filter || "";
    try {
      const Requests = await laonRepaymen.find()
        .skip(skipRequests)
        .limit(RequestPerPage);
      res.status(200).json(Requests);
      if (!Requests) {
        res.status(401).json("there is no info here");
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
   };




module.exports={ 
  getallRepayment,
  getRepayment,

}