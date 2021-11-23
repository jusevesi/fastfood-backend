require('colors');

const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

console.clear();

let completadas ='';

const main = async() =>{

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){//cargar tareas
        tareas.cargarTareasFromArrays( tareasDB );
    }

    do{
        //Imprimir el menu
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                //crear opcion
                const desc = await leerInput( 'Descripcion: ');
                tareas.crearTarea(desc);
            break;
            
            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listadPendienteCompleto(true);
            break;

            case '4':
                tareas.listadPendienteCompleto(false);
            break;

            case '5': //Completado / pendiente
                const ids =  await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoTareasBorrar (tareas.listadoArr);
                if (id !== 0 ){
                    const ok = await confirmar('Esta seguro?');
                    //TODO = preguntar si esta seguro
                    if(ok) {
                        tareas.borrarTarea( id );
                        console.log( 'Tarea borrada' )
                    }
                }
             
            break;
        }

        guardarDB( tareas.listadoArr);


        // const tareas = new Tareas();
        // const tarea = new Tarea('Comprar comida');
        // tareas._listado[tarea.id] = tarea;
        // console.log(tareas);   


        await pausa();
               
    }while(opt !== '0' );

    // pausa();  

}
main();