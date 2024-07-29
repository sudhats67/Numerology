const zodiacSigns = [
    { name: "Aries", startDate: "03-21", endDate: "04-19", planetNumber: 9 },
    { name: "Taurus", startDate: "04-20", endDate: "05-20", planetNumber: 6 },
    { name: "Gemini", startDate: "05-21", endDate: "06-20", planetNumber: 5 },
    { name: "Cancer", startDate: "06-21", endDate: "07-22", planetNumber: 2 },
    { name: "Leo", startDate: "07-23", endDate: "08-22", planetNumber: 1 },
    { name: "Virgo", startDate: "08-23", endDate: "09-22", planetNumber: 5 },
    { name: "Libra", startDate: "09-23", endDate: "10-22", planetNumber: 6 },
    { name: "Scorpio", startDate: "10-23", endDate: "11-21", planetNumber:9 }, // Choosing Mars for simplicity
    { name: "Sagittarius", startDate: "11-22", endDate: "12-21", planetNumber: 3 },
    { name: "Capricorn", startDate: "12-22", endDate: "01-19", planetNumber: 8 },
    { name: "Aquarius", startDate: "01-20", endDate: "02-18", planetNumber: 4 }, // Choosing Uranus for simplicity
    { name: "Pisces", startDate: "02-19", endDate: "03-20", planetNumber: 7},
];

function sumOfDigits(number) {
    let sum = number.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    while (sum > 9) {
        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return sum;
}

function calculateBirthNumber(day) {
    return sumOfDigits(day);0
}

function calculateDestinyNumber(dateOfBirth) {
    const dateParts = dateOfBirth.split('-');
    const dateSum = dateParts.reduce((acc, part) => acc + sumOfDigits(parseInt(part)), 0);
    return sumOfDigits(dateSum);
}

function getZodiacNumber(dateOfBirth) {
    const [day, month] = dateOfBirth.split('-').map(part => parseInt(part));
    const birthDate = new Date(2000, month - 1, day); // Year is irrelevant here
    for (const sign of zodiacSigns) {
        const [startMonth, startDay] = sign.startDate.split('-').map(part => parseInt(part));
        const [endMonth, endDay] = sign.endDate.split('-').map(part => parseInt(part));
        const startDate = new Date(2000, startMonth - 1, startDay);
        const endDate = new Date(2000, endMonth - 1, endDay);
        if (birthDate >= startDate && birthDate <= endDate) {
            return sign.planetNumber;
        }
    }
    return null;
}

function normalizeDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) return null; // Invalid date
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function calculateMissingNumber(birthNumber, destinyNumber, zodiacNumber) {
    const sum = birthNumber + destinyNumber + zodiacNumber;
    return 9 - sumOfDigits(sum);
}

function calculateNumerology() {
    let dateOfBirth = document.getElementById('dateOfBirth').value;
    dateOfBirth = normalizeDate(dateOfBirth);
    if (!dateOfBirth) {
        alert('Please enter a valid date.');
        return;
    }

    const [day, month, year] = dateOfBirth.split('-').map(part => parseInt(part));
    const birthNumber = calculateBirthNumber(day);
    const destinyNumber = calculateDestinyNumber(dateOfBirth);
    const zodiacNumber = getZodiacNumber(dateOfBirth);
    const missingNumber = calculateMissingNumber(birthNumber, destinyNumber, zodiacNumber);

    document.getElementById('birthNumber').textContent = birthNumber;
    document.getElementById('destinyNumber').textContent = destinyNumber;
    document.getElementById('zodiacNumber').textContent = zodiacNumber;
    document.getElementById('missingNumber').textContent = missingNumber;
}
