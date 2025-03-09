import React, { useState } from 'react';

function ExerciseForm(props) {
    const [name, setName] = useState(props.name || '');
    const [reps, setReps] = useState(props.reps || 1);
    const [weight, setWeight] = useState(props.weight || 1);
    const [unit, setUnit] = useState(props.unit || 'kgs');
    const [date, setDate] = useState(props.date || '');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit({ name, reps, weight, unit, date });
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Exercise</legend>
                <div className="fields">
                    <label>
                        <span>Name:</span>
                        <input
                            type="text"
                            value={name}
                            required
                            onChange={event => setName(event.target.value)} />
                    </label>
                    <label>
                        <span>Reps:</span>
                        <input
                            type="number"
                            value={reps}
                            min={1}
                            required
                            onChange={event => setReps(Number(event.target.value))} />
                    </label>
                    <label>
                        <span>Weight:</span>
                        <input
                            type="number"
                            value={weight}
                            min={1}
                            required
                            onChange={event => setWeight(Number(event.target.value))} />
                    </label>
                    <label>
                        <span>Unit:</span>
                        <select defaultValue={unit} required onChange={event => setUnit(event.target.value)}>
                            <option value="kgs">kgs</option>
                            <option value="lbs">lbs</option>
                        </select>
                    </label>
                    <label>
                        <span>Date:</span>
                        <input
                            type="text"
                            value={date}
                            placeholder="MM-DD-YY"
                            required
                            pattern='\d\d-\d\d-\d\d'
                            onChange={event => setDate(event.target.value)} />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </fieldset>
        </form>
    )
}

export default ExerciseForm;
