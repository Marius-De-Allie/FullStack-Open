interface ExerciseValues {
    value1: number;
    value2: Array<number>;
};

const parseArgs = (args: Array<string>): ExerciseValues => {
    let val1;
    let val2: Array<number> = [];
    if(args.length < 4) throw new Error('Not enough arguments');

    const valueArgs = args.slice(2);

    // console.log(valueArgs[0])

    // valueArgs.forEach(el => console.log(!isNaN(Number(el) )));

    

    valueArgs.forEach(el => {
        if(!isNaN(Number(el))) {
            val1 = Number(valueArgs[0]);
            val2.push(Number(el))
        }
        else {
            throw new Error('Provided values were not numbers!')
        }
    });
    return {
        value1: val1,
        value2: val2
    }
}



interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
const calculateExercises = (target: number, hours: Array<number>): Result => {

    const trainingDaysArray = hours.filter(el => el > 0);
    let avg: number;
    let userRating: number;
    let ratingMessage: string;

    const calcAverage = () => {
        let total: number;
        total = hours.reduce((sum, el) => sum + el, 0);
        return Math.round(total / hours.length);
    }

    avg = calcAverage();
    // Calculate rating property value based on average and target argument passed into function.
    if(avg >= target) {
        userRating = 3;
    } else if(avg >= target - 3) {
        userRating = 2;
    } else if(avg <= target - 5) {
        userRating = 1;
    }

    // Rating description log.

    if(userRating >= 3) {
        ratingMessage = 'Excellent job, keep it up!'
    }else if (userRating === 2) {
        ratingMessage = 'Good effort, but you can do better.'
    } else if(userRating === 1) {
        ratingMessage = 'Disappointing performance, you must do better.'
    }

   

    return {
        periodLength: hours.length,
        trainingDays: hours.filter(h => h > 0).length,
        success: avg >= target,
        rating: userRating,
        ratingDescription: ratingMessage,
        target: target,
        average: avg
    }
};

try {
    const {value1, value2} = parseArgs(process.argv);
    console.log(calculateExercises(value1, value2));
} catch(e) {
    console.log('Error, something bad happened, message:', e.message)
};


// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));