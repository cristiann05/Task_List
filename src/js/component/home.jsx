import React, { useState, useEffect } from 'react';
import '../../styles/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import myImage from '../../img/task.png';

const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [tasks, setTasks] = useState([]);

    // Función para obtener las tareas desde la API
    const fetchTasks = () => {
        fetch('https://playground.4geeks.com/todo/users/cristian05')
            .then(response => response.json())
            .then(data => {
                console.log('Tareas obtenidas:', data.todos || []);
                setTasks(data.todos || []);
            })
            .catch(error => console.error('Error al obtener tareas:', error));
    };

    // Función para agregar una tarea a la API
    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            const newTask = { label: inputValue, is_done: false };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            };

            fetch('https://playground.4geeks.com/todo/todos/cristian05', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Tarea agregada:', data);
                    // Actualiza la lista local con la nueva tarea
                    setTasks(prevTasks => [...prevTasks, data]);
                    setInputValue('');
                })
                .catch(error => {
                    console.error('Error al agregar la tarea:', error);
                });
        }
    };

    // Función para manejar cambios en el campo de entrada
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // Función para eliminar una tarea por ID
    const handleDelete = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const newTasks = tasks.filter(task => task.id !== id);
                setTasks(newTasks);
            })
            .catch(error => console.error('Error al eliminar la tarea:', error));
    };

    // Función para eliminar todas las tareas
    const handleDeleteAll = () => {
        // Crear un array de IDs de las tareas a eliminar
        const idsToDelete = tasks.map(task => task.id);

        // Crear una función para eliminar una tarea por ID
        const deleteTask = (id) => {
            return fetch(`https://playground.4geeks.com/todo/todos/${id}`, { method: 'DELETE' });
        };

        // Eliminar todas las tareas
        Promise.all(idsToDelete.map(id => deleteTask(id)))
            .then(() => {
                // Actualizar el estado para eliminar todas las tareas
                setTasks([]);
            })
            .catch(error => {
                console.error('Error al eliminar todas las tareas:', error);
            });
    };

    // Mensaje para el número de tareas restantes
    let itemsLeftMessage;
    if (tasks.length === 1) {
        itemsLeftMessage = '1 item left';
    } else {
        itemsLeftMessage = `${tasks.length} items left`;
    }

    // Obtener las tareas cuando el componente se monta
    useEffect(() => {
        fetchTasks();
    }, []); // El array vacío significa que esto se ejecutará solo una vez, cuando el componente se monta

    return (
        <div>
            <img
                className='photo1'
                src={myImage}
                alt="Descripción de la imagen"
                style={{
                    width: '350px',
                    maxWidth: '200px',
                    height: 'auto',
                    marginLeft: '60px',
                    marginBottom: '20px',
                    marginTop: '-600px'
                }}
            />
            <h1>To-Do List 🎉🚀</h1>
            <input
                type="text"
                className="form-control"
                placeholder="✍️ Add item..."
                aria-label="task"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleEnterPress}
            />
            <ul>
                {tasks.length === 0 ? (
                    <div className="alert alert-danger" role="alert">
                        <i class="fa-solid fa-triangle-exclamation"></i> No tasks, add tasks
                    </div>
                ) : (
                    tasks.map(task => (
                        <li key={task.id}>
                            {task.label}
                            <i
                                className="fa-solid fa-trash-can"
                                onClick={() => handleDelete(task.id)}
                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                            ></i>
                        </li>
                    ))
                )}
            </ul>
            <p>{itemsLeftMessage}</p>
            <button onClick={handleDeleteAll} >Delete All Tasks</button>
        </div>
    );
};

export default Home;
