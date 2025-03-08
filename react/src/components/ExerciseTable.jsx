import ExerciseRow from './ExerciseRow';

function ExerciseTable({ exercises, onEdit, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, index) => (
                    <ExerciseRow key={index} exercise={exercise} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </table>

    );
}

export default ExerciseTable;
