interface BmiValues {
    value1: number;
    value2: number;
};

const parseArguments = (args: Array<string>): BmiValues => {
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = (height: number, weight: number): string =>  {
    const bmi = weight / (height * height) * 10000;
    let message;
    if(bmi < 18.5) {
        message = 'Under weight (un-healthy weight)';
    } else if(bmi >= 18.5 && bmi <= 25) {
        message = 'Normal (healthy weight)';
    } else if(bmi > 25 && bmi <= 30) {
        message = 'Overweight (un-healthy weight)';
    } else if(bmi > 30){
        message = 'Obese (un-healthy weight)';
    }
    return message;
};

// const height: number = Number(process.argv[2])
// const weight: number = Number(process.argv[3])
try {
    const {value1, value2} = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch(e) {
    console.log('Error, something bad happened, message:', e.message)
};

