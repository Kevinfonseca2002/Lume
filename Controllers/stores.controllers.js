import store from "../models/Stores.js";


export const findStore = async(req,res)=>{
    try {
        const name= req.params.name.trim();
        const foundName= await store.findOne({name: new RegExp(`^${name}$`, 'i')});

        if (!foundName)return res.status(404).json({error: "Store not found"});

        res.status(200).json(foundName);

    }
    catch(err){
         res.status(500).json({err: err.message});
    }
};

export const createStore= async(req,res)=>{
    try{
        const {name, email, address, category}=req.body;

        if(!name || !email || !address || !category) return res.status(400).json({error: "Please fill in all required fields"});

        const existence= await store.findOne({email});

        if (existence) return res.status(409).json({error: "Store already exists"});

        const newStore= await store.createOne({name, email, address, category});

        return res.status(201).json(newStore);


    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
};

export const updateStore= async(req,res)=>{

    try{
    const store= req.params.name.toLowerCase();
    const {name, email, address, category}=req.body;

    if (name || email || address || category !== undefined){
        return res.status(400).json({message: "Please fill in all empty fields"})};
    
    const updating= {};
    if (name) updating.name= name;
    if (email) updating.email= email;
    if (address) updating.address= address;
    if (category) updating.category= category;

    const updatedStore= await store.findOneAndUpdate({name: new RegExp(`^${store}$`, "i")},
    updating,
    {new:true});

    if (!updatedStore) return res.status(404).json({message: "Store not found"});

    return res.status(200).json(updatedStore)}
    catch(err){return res.status(500).json({error: err.message})}
    
};

export const deleteStore= async (req,res)=>{
    try{
        const requestedStore= req.params.name.toLowerCase()
        const deletedStore= await store.findOneAndDelete({name: new RegExp(`^${requestedStore}$`,"i")});

        if(!deletedStore) return res.status(404).json({error:"Store not found"});

        return res.json({message:"Store deleted", Store: deletedStore})

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }

};