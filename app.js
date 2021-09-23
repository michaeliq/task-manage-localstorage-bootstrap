//variables
const form_task = document.querySelector("#form-task");
const task_in = document.querySelector("[name=task]");
const task_list = document.querySelector('#task-list');
let fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded',()=>{
    if(loadDataLocalStorage('tasks')){
        let serials = loadDataLocalStorage().map((task) => {
            createTaskContainer(task.serial);
            task_list.appendChild(fragment);
            return [task.serial,task.task]
        })
        serials.forEach(task => {
            storeTask(task[0],task[1])
        })
    }
});

/**
 * este evento permite la captura de los datos que son enviados a través del formulario
 * @returns void 
 */
form_task.addEventListener('submit',(e)=>{
    e.preventDefault();
    let serial = createSerial()
    createTaskContainer(serial);
    let task = task_in.value
    task_list.appendChild(fragment);
    storeTask(serial,task);
    task_in.value = ""
    task_in.focus()
    saveDataLocalStorage(serial,task)
});

/**
 * Se escucha el evento click de cada contenedor, se ubica el serial en el parrafo y se dispara removeTask pasando dicho serial
 */
task_list.addEventListener('click',(e)=>{
    removeTask(e)
})

/**
 * Borra del localStoage un registro basado en el serial que recibe
 * @param {String} e -Recibe una cadena que representa el serial que identfica la tarea
 * @returns void
 */
function removeTask(e) {
    classButton = e.target.className
    if(classButton.indexOf('remove') > 0){
        let arrayData = loadDataLocalStorage()
        let newArrayData = arrayData.filter((task) =>{
            return task.serial !== e.target.parentNode.parentNode.parentNode.childNodes[0].getAttribute('id')
        })
        localStorage.setItem('tasks',JSON.stringify(newArrayData))
    }
}

/**
 * Crea un contenedor HTML en la lista mostrada al usuario, se definen los estilos CSS tomando los facilitados por bootstrap. También se definen los elementos responsables de la desaparición de la caja a dar click en el icono "trash"
 * @param {String} serial cadena de caracteres creada con createSerial
 */
function createTaskContainer(serial) {
    let list_element = document.createElement('li')
    list_element.setAttribute('role','alert')
    list_element.classList.add('alert','list-group-item','dismissible')

    let element_container = document.createElement('div')
    element_container.classList.add('alertbox', 'd-flex', 'justify-content-between', 'align-items-center')

    let p = document.createElement('p')
    p.setAttribute('id',serial)
    p.textContent = "example text"

    let button_container = document.createElement('div')

    let button_edit = document.createElement('button')
    let button_remove = document.createElement('button')

    button_edit.classList.add('task-btn', 'bg-transparent', 'border-0')
    button_remove.classList.add('task-btn', 'bg-transparent', 'border-0')
    button_remove.setAttribute('data-bs-dismiss','alert')
    button_remove.setAttribute('arial-label','Close')
    button_edit.innerHTML= "<i class='fas fa-edit'></i>"
    button_remove.innerHTML= "<i class='fas fa-trash remove'></i>"

    button_container.appendChild(button_edit)
    button_container.appendChild(button_remove)
    element_container.appendChild(p)
    element_container.appendChild(button_container)
    list_element.appendChild(element_container)

    fragment.appendChild(list_element)
}
/**
 * Setea el valor de parrafo que se aloja en el contenedor de la listacreado con createTaskContainer
 * @param {String} serial cadena de carcteres creada con función createSerial
 * @param {String} task tarea recibida desde formulario
 */
function storeTask(serial, task) {
    document.getElementById(serial).textContent = task
    console.log('add task')
}

/**
 * Se encarga de cargar la data almacenada en el localStorage, se invoca a JSON.parse para convertirlo en un objeto javascript
 * @returns {Array} 
 */
function loadDataLocalStorage() {
    let dataJson = localStorage.getItem('tasks')
    let objArray = JSON.parse(dataJson)
    return objArray
}

/**
 * Almacena las tasks en el localStorage, verifica si existe en el almacenamiento la llave "tasks" y si no es asi inicializa un array. Se crea un objeto javascrip con un serial y la task para luego pushear el objeto y finalmente aplicar JSON.stringify al array para almacenarlo dentro del localStorage
 * @param {String} serial cadena de carcteres creada con función createSerial
 * @param {String} task tarea recibida desde formulario
 */
function saveDataLocalStorage(serial,task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    let newTask = {serial:serial,task:task}
    tasks.push(newTask)
    dataJson = JSON.stringify(tasks)
    localStorage.setItem('tasks',dataJson)
}

/**
 * Devuelve una cadena de caracteres de longitud variante
 * @returns {String}
 */
function createSerial(){
    return Math.random().toString(36).substr(2)
}