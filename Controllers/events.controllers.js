import Events from "../models/Events.js";

export const findEvents= async (req,res)=>{
    try{
        const requestedEvent=req.params.eventName.toLowerCase();
        const findEvent= await Events.findOne({name: new RegExp(`^${requestedEvent}$`,"i")});

        if (!findEvent) return res.status(404).json({error: "User not found"})

        return res.status(200).json(findEvent)

    }
    catch(err){
        return res.status(500).json({error: err.message})
    }


};

export const createEvents= async (req,res)=>{
    try{
        const {storeName, eventName, date}=req.body
        if(!storeName || !eventName || !date) return res.status(400).json({error:"Please fill in all empty fields"})
        const existence= await Events.findOne({eventName: new RegExp(`^${eventName}$`,"i"), storeName: new RegExp(`^${storeName}$`,"i")}); //Soft Delete para tiendas el cual pueda mostrar eventos pasados
        if(existence) return res.status(409).json({error:"Event already Exist"})
        const newEvent= Events.createOne({storeName, eventName, date});
        return res.status(200).json(newEvent)

    }
    catch(err){
        return res.status(500).json({error: err.message})
    }

};

export const updateEvents= async (req,res)=>{
    try{
        const requestedEvent= req.params.eventName.toLowerCase();
        const {storeName,eventName,date}=req.body;

        if(!storeName || !eventName || !date) return res.status(400).json({error:"Please fill in all empty fields"});

        const update={};
        if(storeName)update.storeName=storeName;
        if(eventName)update.eventName=eventName;
        if(date)update.date=date

        const updateEvent= await Events.findOneAndUpdate({eventName: new RegExp(`^${eventName}$`,"i"), storeName: new RegExp(`^${storeName}$`,"i")},update,{new:true});
        if(!currentEvent) return res.status(404).json({error:"User not found"});

        return res.status(200).json(updateEvent)

    }
    catch(err){
        return res.status(500).json({error:err.message})
    }

};

export const deleteEvents= async (req,res)=>{
    try{
        const event= req.params.eventName.toLowerCase();
        const eventDeleted= await Events.findOneAndDelete({eventName: new RegExp(`^${event}$`,"i"), storeName: new RegExp(`^${storeName}$`,"i")});
        if (!eventDeleted) return res.status(404).json({error:"Event not found"});
        
        return res.status(200).json({message: "User deleted", event: eventDeleted});

    }
    catch(err){
        return res.status(500).json({error:err.message})
    }



}