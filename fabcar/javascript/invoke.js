/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'first-network', 'connection-org1.json');

exports.storeProduct = async (data) => {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('faizan');
        if (!userExists) {
            console.log('An identity for the user "faizan" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'faizan', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        // console.log(data);
        const result = await contract.submitTransaction('createCar', `ID${data.id}`, data.name, data.description, data.color, data.make, data.price, data.quantity, 'FAIZAN12', data.image, data.type);

        // const result = await contract.submitTransaction('createCar',JSON.stringify(data));
        console.log(`Transaction has been submitted ${result.toString()}`);
        // //Purchase car function call;
        // //Purchase car requires to arguments , card ID and new Owner name
        // const result = await contract.submitTransaction('purchaseCar', `ID${data.id}`, );
        // Disconnect from the gateway.
        await gateway.disconnect();

        return { message: 'Product has been successfully added.' };

    } catch (error) {
        // throw error;
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
};

exports.storeUser = async (data) => {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('faizan');
        if (!userExists) {
            console.log('An identity for the user "faizan" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'faizan', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        // console.log(data);
        const result = await contract.submitTransaction('createUser', data.firstName, data.lastName, data.email, data.email);
        // const result = await contract.submitTransaction('createCar',JSON.stringify(data));
        console.log(`Transaction has been submitted ${result.toString()}`);
        // //Purchase car func
        // //Purchase car requires to arguments , card ID and new Owner name
        // const result = await contract.submitTransaction('purchaseCar', `ID${data.id}`, );
        // Disconnect from the gateway.
        await gateway.disconnect();

        return { message: 'User has been successfully added.' };

    } catch (error) {
        // throw error;
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
};
/*
 * This function is for purchase product
 * @param {data}
 * @return JSON
 */
exports.buyProduct = async (data) => {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('faizan');
        if (!userExists) {
            console.log('An identity for the user "faizan" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'faizan', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        //Purchase car function call;
        //Purchase car requires to arguments , card ID and new Owner name
        const result = await contract.submitTransaction('purchaseCar', data.product_id, data.user_id);
        // Disconnect from the gateway.
        await gateway.disconnect();

        return { message: 'Product has been purchased successfully.' };

    } catch (error) {
        // throw error;
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
};


this.storeProduct({
    id: 2,
    name: 'Black Casual Coat',
    description: 'Black Casual Coat desc',
    color: 'Black',
    make: 'Levis',
    price: '5000',
    quantity: '5',
    owner: 'FAIZAN23',
    image: 'data:image/jpeg;base64,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',
    type: 'clothes'
});
