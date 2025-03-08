import React from 'react';
import { useNavigate } from 'react-router-dom';

import ExerciseForm from '../components/ExerciseForm';

function CreateExercisePage() {
    const navigate = useNavigate();

    const createExercise = async (data) => {
        const response = await fetch('/exercises/', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 201) {
            alert("Exercise has been successfully created!");
        } else {
            alert(`Failed to create exercise: ${response.status} ${response.statusText}`);
        }

        navigate("/");
    };

    return (
        <div>
            <h2>Create Exercise</h2>
            <ExerciseForm onSubmit={createExercise} />
        </div>
    );
}

export default CreateExercisePage;
