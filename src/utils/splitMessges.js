function splitMessage(message, maxLength = 2000) {
    const parts = [];
    let currentPart = '';

    const words = message.split(' ');
    for (const word of words) {
        if ((currentPart + word).length > maxLength) {
            parts.push(currentPart.trim());
            currentPart = '';
        }
        currentPart += word + ' ';
    }

    if (currentPart.trim().length > 0) {
        parts.push(currentPart.trim());
    }

    return parts;
}

export { splitMessage };