import User from "../models/Usuarios.js"

export const buscarUsuario= async(req,res)=>{
    try {
        const nombre= req.params.nombre.toLowerCase();
        const nombreABuscar= await User.findOne({name: new RegExp(`^${nombre}$`, 'i')});

        if (!nombreABuscar)return res.status(404).json({error: "Usuario no encontrado"});

        return res.status(200).json(nombreABuscar);

    }
    catch(err){
        return res.status(500).json({err: err.message});
    }
};

export const crearUsuario= async(req,res)=>{
    try{
        const {name, age, email, phone, address}=req.body;

        if(!name || !age || !email || !phone ||!address) return res.status(400).json({mensaje: "Diligencie todos los campos requeridos"});

        const existencia= await User.findOne({email});

        if (existencia) return res.status(409).json({message: "Usuario existente"});

        const nuevoUsuario= await User.createOne({name, age, email, phone, address});

        return res.status(201).json(nuevoUsuario);

    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
};

export const actualizarUsuario= async(req,res)=>{

    try{
    const nombreBuscado= req.params.nombre.toLowerCase();
    const {name, age, email, phone, address}=req.body;

    if (name || age || address || phone || email !== undefined){
        return res.status(400).json({message: "Todos los campos deben estar diligenciados"})};
    
    const actualizacion= {};
    if (name) actualizacion.name= name;
    if (email) actualizacion.email= email;
    if (address) actualizacion.address= address;
    if (phone) actualizacion.phone= phone;
    if (age) actualizacion.age= age;

    const usuarioActualizado= await User.findOneAndUpdate({name: new RegExp(`^${nombreBuscado}$`, "i")},
    actualizacion,
    {new:true});

    if (!usuarioActualizado) return res.status(404).json({message: "Usuario no encontrado"});

    return res.status(200).json(usuarioActualizado)}
    catch(err){return res.status(500).json({error: err.message})}
    
};

export const borrarUsuario= async (req,res)=>{
    try{
        const usuarioBuscado= req.params.nombre.toLowerCase();
        const usuarioBorrado= await User.findOneAndDelete({name: new RegExp(`^${usuarioBuscado}$`,"i")});

        if(!usuarioBorrado) return res.status(404).json({message:"Usuario no encontrado"});

        return res.json({message:"Usuario Eliminado", Usuario: usuarioBorrado})

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }

};