const Expense = require('../model/expense');
const User = require('../model/user')
const Download = require('../model/download');

const path = require('path');

const rootDir = require('../util/path');

const AWS = require('aws-sdk')

require('dotenv').config();


function uploadToS3(data,filename)
{
  console.log('uploaded')
  const BUCKET_NAME =process.env.A_BUCKET_NAME;
  const KEY_ID=process.env.A_KEY_ID;
  const SECRET_KEY=process.env.A_SECRET_KEY;

  let s3bucket =new AWS.S3({
    accessKeyId : KEY_ID,
    secretAccessKey:SECRET_KEY,
  })

  
    var params = {
      Bucket:BUCKET_NAME,
      Key:filename,
      Body:data,
      ACL:'public-read',
    }

    return new Promise((resolve,reject)=>{
      s3bucket.upload(params,(err,s3response)=>{
        if(err)
        {
          reject(err);
          console.log('something went wrong',err);
        }
        else{
         // console.log('successfully uploaded',s3response);
          resolve(s3response.Location);
        }
      })
    })
   
  


}


exports.downloadexpense = async(req,res,next)=>{
  try{
    const expenses = await req.user.getExpenses();
    console.log(expenses);
    const stringfyexpenses =JSON.stringify(expenses);
    const userID = req.user.id;
    const fileName =`Expense${userID}/${new Date()}.txt`;
    const fileUrl = await uploadToS3(stringfyexpenses,fileName);

    await req.user.createDownload({fileUrl: fileUrl, date: new Date()});

    res.status(201).json({fileUrl,success:true});
  }
  catch(err)
  {
    console.log(err)
    res.status(500).json({fileUrl,success:false,err:err});
  }
  
}



exports.getDownloads = async (req, res) => {
  if(req.user.ispremium) {
      try {
          const downloads = await req.user.getDownloads();
          console.log(downloads);
          res.status(200).json({downloads: downloads, success: true});
      } catch (error) {
          res.status(500).json({error: error, success: false});
      }
  } else {
      res.status(400).json({message: 'user does not have Premium Membership'});
  }
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
         const totalexpense =Number(req.user.totalExpenses) + Number(expenseamount);
         User.update({totalExpenses:totalexpense},{where:{id:req.user.id}}).then(async()=>{
            res.status(200)
         })
        return res.status(201).json({ expense, success: true, message: "Expense Added to DB" });
        
      }
    );
  } catch (err) {;
    console.log(err)
    return res.status(500).json({ success: false, error: err });
    
  }
};
// Get Expense

const ITEMS_PER_PAGE = 4;

exports.getExpenses = async (req, res,next) => {
  var totalExpenses;
  let positive=0.00, negative=0.00;
  const page = +req.params.pageNo || 1;
  let totalItems=Expense.findAll({where: {userId: req.user.id}}).then(response=>{
      totalExpenses=response.length
      response.map(i=>{
          (i.amount>0)?positive+=i.amount:negative+=i.amount;
      })
  }).catch(err=>console.log(err))

  await totalItems;

  Expense.findAll({where: {userId: req.user.id}, offset: (page-1)*ITEMS_PER_PAGE, limit: ITEMS_PER_PAGE})
  .then(response=>{
      res.status(200).send({
          response: response,
          currentPage: page,
          hasNextPage: ITEMS_PER_PAGE * page < totalExpenses,
          hasPreviousPage: page > 1,
          nextPage:page+1,
          previousPage:page-1,
          positive:positive,
          negative:negative,
          lastPage:Math.ceil(totalExpenses/ITEMS_PER_PAGE),
          totalItems: totalExpenses
      });
  })
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



