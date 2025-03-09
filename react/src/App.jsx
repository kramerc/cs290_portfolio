import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {
    const [exerciseToEdit, setExerciseToEdit] = useState({});

    return (
        <div className="app">
            <Router>
                <header>
                    <h1>Kramer's Exercises</h1>
                    <p>My log of workouts.</p>

                    <Navigation />
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
                        <Route path="/create-exercise" element={<CreateExercisePage />} />
                        <Route path="/edit-exercise" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />} />
                    </Routes>
                </main>

                <footer>
                    &copy; 2025 Kramer Campbell
                </footer>
            </Router>
        </div>
    );
}

export default App;
