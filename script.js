document.getElementById('numerology-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const birthdate = document.getElementById('birthdate').value.trim();

    // Normalize the date input
    const normalizedDate = normalizeDate(birthdate);

    // Validate the date format
    if (!normalizedDate) {
        alert('Please enter a valid date in the format dd/mm/yyyy.');
        return;
    }

    const birthNumber = calculateBirthNumber(normalizedDate);
    const destinyNumber = calculateDestinyNumber(normalizedDate);
    const zodiacNumber = getZodiacNumber(normalizedDate);

    if (!zodiacNumber) {
        alert('Please enter a valid date within the zodiac range.');
        return;
    }

    const missingNumber = findMissingNumber(birthNumber, destinyNumber, zodiacNumber);

    document.getElementById('result').innerText = `Birth Number: ${birthNumber}, Destiny Number: ${destinyNumber}, Zodiac Number: ${zodiacNumber}, Missing Number: ${missingNumber}`;
});

function normalizeDate(dateStr) {
    const parts = dateStr.split(/[-/.]/);
    if (parts.length !== 3) {
        return null;
    }
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2].padStart(4, '20');
    if (isValidDate(day, month, year)) {
        return `${day}/${month}/${year}`;
    } else {
        return null;
    }
}

function isValidDate(day, month, year) {
    const date = new Date(`${year}-${month}-${day}`);
    return date && date.getDate() == day && date.getMonth() + 1 == month && date.getFullYear() == year;
}

function calculateBirthNumber(dateStr) {
    const day = dateStr.split('/')[0];
    return reduceToOneDigit(day);
}

function calculateDestinyNumber(dateStr) {
    const parts = dateStr.split('/');
    const sum = parts.join('').split('').reduce((acc, num) => acc + parseInt(num), 0);
    return reduceToOneDigit(sum);
}

function reduceToOneDigit(number) {
    while (number > 9) {
        number = number.toString().split('').reduce((acc, num) => acc + parseInt(num), 0);
    }
    return number;
}

function getZodiacNumber(dateStr) {
    const parts = dateStr.split('/');
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]);

        const zodiacRanges = [
        { start: { day: 21, month: 3 }, end: { day: 19, month: 4 }, number: 9 },   // Aries
        { start: { day: 20, month: 4 }, end: { day: 20, month: 5 }, number: 6 },   // Taurus
        { start: { day: 21, month: 5 }, end: { day: 20, month: 6 }, number: 5 },   // Gemini
        { start: { day: 21, month: 6 }, end: { day: 22, month: 7 }, number: 2 },   // Cancer
        { start: { day: 23, month: 7 }, end: { day: 22, month: 8 }, number: 1 },   // Leo
        { start: { day: 23, month: 8 }, end: { day: 22, month: 9 }, number: 5 },   // Virgo
        { start: { day: 23, month: 9 }, end: { day: 22, month: 10 }, number: 6 },  // Libra
        { start: { day: 23, month: 10 }, end: { day: 21, month: 11 }, number: 22 }, // Scorpio
        { start: { day: 22, month: 11 }, end: { day: 21, month: 12 }, number: 3 }, // Sagittarius
        { start: { day: 22, month: 12 }, end: { day: 19, month: 1 }, number: 8 },  // Capricorn
        { start: { day: 20, month: 1 }, end: { day: 18, month: 2 }, number: 4 },   // Aquarius
        { start: { day: 19, month: 2 }, end: { day: 20, month: 3 }, number: 7 }    // Pisces
    ];


    for (let range of zodiacRanges) {
        if (
            (month === range.start.month && day >= range.start.day) ||
            (month === range.end.month && day <= range.end.day)
        ) {
            return range.number;
        }
    }

    return null;
}

function findMissingNumber(birthNumber, destinyNumber, zodiacNumber) {
    const total = birthNumber + destinyNumber + zodiacNumber;
    const singleDigitTotal = reduceToOneDigit(total);
    return Math.abs(9 - singleDigitTotal);
}
