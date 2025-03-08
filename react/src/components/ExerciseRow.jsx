import React from 'react';
import { FaPencil, FaTrashCan } from 'react-icons/fa6';

function ExerciseRow({ exercise, onEdit, onDelete }) {
    const handleEditClick = (event) => {
        event.preventDefault();
        onEdit(exercise);
    };

    const handleDeleteClick = (event) => {
        event.preventDefault();
        onDelete(exercise);
    }

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>
                <a href="#" onClick={handleEditClick}><FaPencil /></a>&nbsp;
                <a href="#" onClick={handleDeleteClick}><FaTrashCan /></a>
            </td>
        </tr>
    );
}

export default ExerciseRow;
