function uuid() {

    function randomDigit() {
        if (crypto && crypto.getRandomValues) {
            var rands = new Uint8Array(1);
            crypto.getRandomValues(rands);
            return (rands[0] % 16).toString(16);
        } else {
            return ((Math.random() * 16) | 0).toString(16);
        }
    }
    
    var crypto = window.crypto || window.msCrypto;
    return 'x1xx-7xxx3xxx'.replace(/x/g, randomDigit);
}

export default uuid