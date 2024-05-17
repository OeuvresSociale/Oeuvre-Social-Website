const Router = require("express"); 
const router=Router();
// const cntrl = require('../controllers/offreController.js');
 const {getOffres,addOffre,deleteOffre,updateOffre,validOffre}=require('../controllers/offreController');

router.get("/offres",getOffres);
router.post("/offre",addOffre);  
router.put("/offre/:id",updateOffre);
router.delete("/offre/:id",deleteOffre);
router.put("/validOffre/:id",validOffre);

module.exports=router; 
// { 
//     "title":"deuxiemme offre",
//     "desc":"welcome ", 
//     "dateDebut":"2024-04-30T08:50:33.673+00:00",
//     "dateFin":"2024-05-30T08:50:33.673+00:00"
//   }
  