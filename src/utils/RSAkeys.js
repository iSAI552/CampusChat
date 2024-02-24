import { generateKeyPairSync } from 'crypto';
import fs from 'fs';

// Function to generate RSA key pair
export function generateRSAKeyPair() {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048, 
        publicKeyEncoding: {
            type: 'spki', 
            format: 'pem' 
        },
        privateKeyEncoding: {
            type: 'pkcs8', 
            format: 'pem', 
        }
    });

    fs.writeFileSync('private_key.pem', privateKey);
    fs.writeFileSync('public_key.pem', publicKey);

    console.log('RSA key pair generated successfully.');
}

