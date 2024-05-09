
const generateMail = (req,res) =>{
    const {name} = req.body;
    console.log(name);
    const formattedName = name.toLowerCase().replace(/\s/g, '');
    const randomNumber = Math.floor(Math.random() * 10000);
    const email = `${formattedName}${randomNumber}@skillpool.in`;
    return res.status(200).json({email});
}

const send = (req, res) => {
    res.json({ message: 'Message received' })
}

module.exports = {
    generateMail,
    send
}