import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';
import * as validators from './validators.mjs';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

function invalidRequest(res) {
    res.status(400).send({"Error": "Invalid request"});
}

function notFound(res) {
    res.status(404).send({"Error": "Not found"});
}

/**
 * Takes in a raw set of parameters, such as req.query or req.body, looks for
 * parameters of an exercise, validates, and returns them.
 * 
 * @param {object} params A object of raw parameters.
 * @returns {object} Parameters of an exercise.
 * @throws {TypeError} If parameters are invalid.
 */
function exerciseParams({ name, reps, weight, unit, date }) {
    const params = { name, reps, weight, unit, date };
    if (!validators.isExerciseValid(params)) {
        throw TypeError("Exercise parameters are not valid");
    }

    return params;
}

app.post('/exercises', asyncHandler(async (req, res) => {
    const exercise = await exercises.create(exerciseParams(req.body));
    res.status(201).send(exercise);
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const exerciseList = await exercises.find();
    res.send(exerciseList);
}));

app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const exercise = await exercises.getById(req.params.id);
    if (!exercise) {
        return notFound(res);
    }

    res.send(exercise);
}))

app.put('/exercises/:id', asyncHandler(async (req, res) => {
    const exercise = await exercises.updateById(req.params.id, exerciseParams(req.body));
    if (!exercise) {
        return notFound(res);
    }

    res.send(exercise);
}));

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const exercise = await exercises.deleteById(req.params.id);
    if (!exercise) {
        return notFound(res);
    }

    res.status(204).send();
}));

app.use((err, req, res, next) => {
    if (err instanceof TypeError) {
        invalidRequest(res);
    } else {
        next(err);
    }
});

app.listen(PORT, async () => {
    await exercises.connect(false);
    console.log(`Server listening on port: ${PORT}`)
});
