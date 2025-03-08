import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ExerciseTable from '../components/ExerciseTable';

function HomePage({ setExerciseToEdit }) {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    };

    const handleEdit = (exercise) => {
        setExerciseToEdit(exercise);
        navigate("/edit-exercise");
    }

    const deleteExercise = async (exercise) => {
        const response = await fetch(`/exercises/${exercise._id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setExercises(exercises.filter(other => other._id !== exercise._id));
        } else {
            alert(`Failed to delete exercise: ${response.status} ${response.statusText}`);
        }
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseTable exercises={exercises} onEdit={handleEdit} onDelete={deleteExercise} />
            <p>
                <Link to="/create-exercise">Create an exercise</Link>
            </p>
        </>
    );
}

export default HomePage;
