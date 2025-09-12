import User from "../models/Users.js"

export const findUser= async(req,res)=>{
    try {
        const name= req.params.name.toLowerCase();
        const findName= await User.findOne({name: new RegExp(`^${name}}$`, 'i')});

        if (!findName)return res.status(404).json({error: "User not found"});

        return res.status(200).json(findName);

    }
    catch(err){
        return res.status(500).json({err: err.message});
    }
};

export const createUser= async(req,res)=>{
    try{
        const {name, age, email, phone, address}=req.body;

        if(!name || !age || !email || !phone ||!address) return res.status(400).json({message: "Please fill in all empty fields"});

        const existence= await User.findOne({email});

        if (existence) return res.status(409).json({message: "User already exists"});

        const newUser= await User.createOne({name, age, email, phone, address});

        return res.status(201).json(newUser);

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
};

export const updateUser= async(req,res)=>{

    try{
    const nameRequested= req.params.name.toLowerCase();
    const {name, age, email, phone, address}=req.body;

    if (name || age || address || phone || email === undefined){
        return res.status(400).json({message: "Please fill inn al empty fields"})};
    
    const updating= {};
    if (name) updating.name= name;
    if (email) updating.email= email;
    if (address) updating.address= address;
    if (phone) updating.phone= phone;
    if (age) updating.age= age;

    const updatedUser= await User.findOneAndUpdate({name: new RegExp(`^${nameRequested}$`, "i")},
    updating,
    {new:true});

    if (!updatedUser) return res.status(404).json({message: "User not found"});

    return res.status(200).json(updatedUser)}
    catch(err){return res.status(500).json({error: err.message})}
    
};

export const deleteUser= async (req,res)=>{
    try{
        const userFound= req.params.name.toLowerCase();
        const userDeleted= await User.findOneAndDelete({name: new RegExp(`^${userFound}$`,"i")});

        if(!userDeleted) return res.status(404).json({error:"User not found"});

        return res.json({message:"User deleted", User: userDeleted})

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }

};