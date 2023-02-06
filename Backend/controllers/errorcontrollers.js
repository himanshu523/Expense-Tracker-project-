exports.err404 = async (req,res,next)=>{
    res.status(404).send('<h1>page doesnt exists</h1>')
}