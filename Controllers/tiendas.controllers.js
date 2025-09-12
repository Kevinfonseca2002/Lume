import store from "../models/Tiendas.js";


export const buscarTienda= async(req,res)=>{
    try {
        const nombre= req.params.nombre.toLowerCase();
        const nombreABuscar= await store.findOne({nombre: new RegExp(`^${nombre}$`, 'i')});

        if (!nombreABuscar)return res.status(404).json({error: "Tienda no encontrada"});

        return res.status(200).json(nombreABuscar);

    }
    catch(err){
        return res.status(500).json({err: err.message});
    }
};

export const crearTienda= async(req,res)=>{
    try{
        const {nombre, correo, address, categoria}=req.body;

        if(!nombre || !correo || !address || !categoria) return res.status(400).json({mensaje: "Diligencie todos los campos requeridos"});

        const existencia= await store.findOne({correo});

        if (existencia) return res.status(409).json({message: "Tienda existente"});

        const nuevaTienda= await store.createOne({nombre, correo, address, categoria});

        return res.status(201).json(nuevaTienda);


    }
    catch(err){
        return res.status(500).json({err: err.message})
    }
};

export const actualizarTienda= async(req,res)=>{

    try{
    const tienda= req.params.nombre.toLowerCase();
    const {nombre, correo, address, categoria}=req.body;

    if (nombre || correo || address || categoria !== undefined){
        return res.status(400).json({message: "Todos los campos deben estar diligenciados"})};
    
    const actualizacion= {};
    if (nombre) actualizacion.nombre= nombre;
    if (correo) actualizacion.correo= correo;
    if (address) actualizacion.address= address;
    if (categoria) actualizacion.categoria= categoria;

    const tiendaActualizada= await store.findOneAndUpdate({nombre: new RegExp(`^${tienda}$`, "i")},
    actualizacion,
    {new:true});

    if (!tiendaActualizada) return res.status(404).json({message: "Tienda no encontrada"});

    return res.status(200).json(tiendaActualizada)}
    catch(err){return res.status(500).json({error: err.message})}
    
};

export const borrarTienda= async (req,res)=>{
    try{
        const tiendaBuscada= req.params.nombre.toLowerCase()
        const tiendaBorrada= await store.findOneAndDelete({nombre: new RegExp(`^${tiendaBuscada}$`,"i")});

        if(!tiendaBorrada) return res.status(404).json({message:"Tienda no encontrada"});

        return res.json({message:"Tienda Eliminada", tienda: tiendaBorrada})

    }
    catch(err){
        return res.status(500).json({message:err.message})
    }

};