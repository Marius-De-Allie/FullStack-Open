const calculateBmi = (height: number, weigth: number): string =>  {
    const bmi = weigth / (height * height) * 10000;
    let message;
    if(bmi < 18.5) {
        message = 'Under weight (un-healthy weight)';
    } else if(bmi >= 18.5) {
        message = 'Normal (healthy weight)';
    } else if(bmi > 25) {
        message = 'Overweight (un-healthy weight)';
    } else if(bmi > 30){
        message = 'Obese (un-healthy weight)';
    }

    return message;
};

console.log(calculateBmi(180, 74))