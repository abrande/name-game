export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomSelection(data, max) {
    let shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, max);
}