export function getFinalScore (gameLevel, correctGuesses, incorrectGuesses) {
    let correctScorePoint, incorrectScoreNeg;
    switch (gameLevel) {
        case 1:
            correctScorePoint = 30;
            incorrectScoreNeg = 5;
            break;
        case 2:
            correctScorePoint = 50;
            incorrectScoreNeg = 50;
            break;
        case 3:
            correctScorePoint = 70;
            incorrectScoreNeg = 100;
            break;
        case 4:
            correctScorePoint = 90;
            incorrectScoreNeg = 1000;
            break;
        default:
            break;
    }
    return (correctGuesses * correctScorePoint) - (incorrectGuesses * incorrectScoreNeg);
}