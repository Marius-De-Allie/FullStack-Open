import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if((req.query.height && req.query.weight) && (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight)))) {
        const bmi: string = calculateBmi(Number(req.query.height), Number(req.query.weight));
        res.send({
            height: Number(req.query.height),
            weight: Number(req.query.weight),
            bmi,
        });
    } else {
        res.status(404);
        res.send({
            statusCode: res.statusCode,
            error: 'malformatted parameters'
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}.`);
});