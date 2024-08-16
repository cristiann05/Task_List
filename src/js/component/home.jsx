import React, { useState } from 'react';
import '../../styles/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import myImage from '../../img/task.png';



const Home = () => {

  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  // Función para manejar la tecla Enter
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      if (inputValue.trim() !== '') {

        // Añadir la nueva tarea a la lista
        setTasks([...tasks, inputValue]);
        setInputValue('');
      }
    }
  };

  // Función para obtener el nombre del día de la semana
  const getDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    return days[today.getDay()];
  };

  const dayName = getDayName();


  // Función para manejar cambios en el campo de entrada
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  // Función para eliminar una tarea por índice
  const handleDelete = (index) => {
    const newTasks = [
      ...tasks.slice(0, index),
      ...tasks.slice(index + 1)
    ];

    setTasks(newTasks);
  };

  
  let itemsLeftMessage;

  if (tasks.length === 1) {
    itemsLeftMessage = '1 item left';
  } else {
    itemsLeftMessage = `${tasks.length} items left`;
  }

  return (
    <div>
        <img  className='photo1' src={myImage} alt="Descripción de la imagen"
        style={{ 
          width: '350px',
          maxWidth: '200px',
          height: 'auto',
          marginLeft: '60px',
          marginBottom: '20px',
          marginTop: '-600px'
        }}  />
        <h1>Whoop, it's {dayName} 🎉🚀</h1>
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
            No tasks, add tasks
          </div>
        ) : (
          tasks.map((task, index) => (
            <li key={index}>
              {task}
              <i            
                class="fa-solid fa-trash-can"
    onClick={() => handleDelete(index)}
    style={{ marginLeft: '10px' }}>
    </i>
            </li>
          ))
        )}
      </ul>
      <p>{itemsLeftMessage}</p>
    </div>
  );
};

export default Home;
