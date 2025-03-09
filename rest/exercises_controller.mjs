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

function validateRequestBody(req, res, next) {
    const permitted = ['name', 'reps', 'weight', 'unit', 'date'];
    const paramsValid = Object.keys(req.body).every(param => permitted.includes(param));

    if (paramsValid && validators.isExerciseValid(req.body)) {
        next();
    } else {
        invalidRequest(res);
    }
}

app.post('/exercises', validateRequestBody, asyncHandler(async (req, res) => {
    const exercise = await exercises.create(req.body);
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

app.put('/exercises/:id', validateRequestBody, asyncHandler(async (req, res) => {
    const exercise = await exercises.updateById(req.params.id, req.body);
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

app.listen(PORT, async () => {
    await exercises.connect(false);
    console.log(`Server listening on port: ${PORT}`)
});
