const { white } = require('colors');
const Tarea = require('./tarea');



/**
 * _listado:
 *  {'uuid -123712-123123-2: { id:12, desc:asd,completadoEn:92231}},
 */

//JavaScript en el backend - Primero creo una clase
class Tareas {
    
    //propiedad llamada listado 
    _listado = {};
    //uso un getter para retornar un nuevo arreglo
    get listadoArr() {
        //arreglo listado se llena a traves del object.keys (retornando todas las llaves)
        const listado = [];
        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
            //todo esto es sincrono porque no hay que poner AWAIT
        } );

        return listado;
    }

    constructor() {
        this._listado= {};
    }

    borrarTarea ( id = ''){
        
        if (this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArrays( tareas = []) {
        
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = ''){

        const tarea = new Tarea(desc);  
        this._listado[tarea.id] = tarea;
        // si fuera un arreglo se insertaria con push
        //this._listado.push
    }

    listadoCompleto() {

        console.log(this.listadoArr);
        this.listadoArr.forEach((tarea, i) =>{
            const idx = `${i + 1}.`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            
            console.log(`${idx} ${desc} :: ${estado}`);
        })
        //1. Alma :: Completada -verde / Pendiente-rojo
    }
     
    listadPendienteCompleto(completadas = true) {
        
        console.log();
        let contador = 0;
        this.listadoArr.forEach((tarea) =>{

            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) 
                                ? 'Completada'.green 
                                : 'Pendiente'.red;
            
            if(completadas) {
                if(completadoEn) {
                    contador += 1;
                    console.log(`${(contador+'.').green} ${desc} :: ${completadoEn.green }`)};
            }else{
                if(!completadoEn) {
                    contador += 1;
                    console.log(`${(contador+'.').green} ${desc} :: ${estado}`)};
            }
            //if(completadoEn==null && completadas ==false) {console.log(`${idx} ${desc} :: ${estado}`)};
        })
        //1. Alma :: Completada -verde / Pendiente-rojo
    }
    
    toggleCompletadas( ids = [] ) {

        ids.forEach( id=>{

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }
        });
        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas; 