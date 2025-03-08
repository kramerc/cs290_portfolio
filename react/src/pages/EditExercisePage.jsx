import React from 'react';
import { useNavigate } from 'react-router-dom';

import ExerciseForm from '../components/ExerciseForm';

function EditExercisePage({ exerciseToEdit }) {
    const navigate = useNavigate();

    const editExercise = async (data) => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 200) {
            alert("Exercise has been successfully updated!");
        } else {
            alert(`Failed to edit exercise: ${response.status} ${response.statusText}`);
        }

        navigate("/");
    };

    return (
        <div>
            <h2>Edit Exercise</h2>
            <ExerciseForm {...exerciseToEdit} onSubmit={editExercise} />
        </div>
    );
}

export default EditExercisePage;
