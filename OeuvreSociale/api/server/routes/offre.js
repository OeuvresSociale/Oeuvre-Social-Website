const Router = require("express");
const router=Router();
// const cntrl = require('../controllers/offreController.js');
 const {getOffre,getOffres,addOffre,deleteOffre,updateOffre}=require('../controllers/offreController');

router.get("/offres",getOffres);
router.get("/offre/:id",getOffre);
router.post("/offre",addOffre);
router.put("/offre/:id",updateOffre);
router.delete("/offre/:id",deleteOffre);
 
module.exports=router; 
// {
//     "title":"deuxiemme offre",
//     "desc":"welcome ",
//     "dateDebut":"2024-04-30T08:50:33.673+00:00",
//     "dateFin":"2024-05-30T08:50:33.673+00:00"
//   }
  