// const bigInt = require('big-integer'); // Library for big integer arithmetic

// // Generate a large prime number (p) and a generator (g) for the cyclic group
// const p = bigInt(23); // Example prime number
// const g = bigInt(5); // Example generator

// // Prover's side
// const x = bigInt.randBetween(2, p.minus(1)); // Secret exponent, 1 < x < p-1
// const r = bigInt.randBetween(1, p.minus(1)); // Random number, 1 < r < p-1
// const v = g.modPow(r, p); // v = g^r mod p

// // Verifier's side
// const c = bigInt.randBetween(0, 1); // Random challenge, 0 or 1

// // Prover computes response based on challenge
// let z;
// if (c.equals(0)) {
//     z = r; // Prover reveals r when challenge is 0
// } else {
//     z = r.add(x).mod(p.minus(1)); // Prover reveals r + x when challenge is 1
// }

// // Verifier checks if v^c * g^z equals g^x
// const v_prime = g.modPow(z, p).times(v.modPow(c, p)).mod(p); // v' = g^z * v^c mod p
// const isValid = v_prime.equals(g.modPow(x, p)); // Check if v' equals g^x

// console.log('Is the proof valid?', isValid);




// // ===== Create a ZKP for anonymous payment in javascript  
// const bigInt = require('big-integer'); // Library for big integer arithmetic

// // Parameters for the cyclic group
// const p = bigInt(23); // Example prime number
// const g = bigInt(5); // Example generator

// // Alice's secret key
// const secretKey = bigInt(90); // Example secret key

// // Payment amount
// const paymentAmount = bigInt(10); // Example payment amount

// // Step 1: Alice generates a commitment
// const r = bigInt.randBetween(1, p.minus(1)); // Random number, 1 < r < p-1
// const commitment = g.modPow(r, p); // Commitment: C = g^r mod p

// // Step 2: Encrypt the payment amount using the commitment
// const maskedPayment = paymentAmount.add(commitment).mod(p); // Masked payment: Enc = paymentAmount + C mod p

// // Step 3: Alice sends maskedPayment and commitment to Bob
// const dataToSendToBob = {
//     maskedPayment: maskedPayment,
//     commitment: commitment
// };

// // Step 4: Bob verifies the proof
// const leftSide = g.modPow(dataToSendToBob.maskedPayment, p); // g^Enc mod p
// const rightSide = dataToSendToBob.commitment.modPow(secretKey, p); // C^secretKey mod p
// const isValid = leftSide.equals(rightSide);

// console.log('Is the proof valid?', isValid);


const crypto = require('crypto')

function createHash(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input);
    const hashedData = hash.digest('hex');
    return hashedData;
}

function proveKnowledge(input) {
    return createHash(input)
}

function verifyKnowledge(hashedSecret, expectedSecret) {
   const hashExpectedSecret = createHash(expectedSecret)
    if(hashExpectedSecret == hashedSecret){
        return true
    }else return false
}


const secret = "treasure location is xyz"   //Amit Prover
const hashedSecret = proveKnowledge(secret)


const expectedSecret = "treasure location is xyz"   //Sumit Verifier
if(verifyKnowledge(hashedSecret, expectedSecret)) { 
    console.log("Treasure Location are Same")
}else{
    console.log("Treasure Location are Not Same")
}