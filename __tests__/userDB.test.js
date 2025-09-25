const {
    insertUser,
    verifyUserLogin,
    updatePassword,
    isUsernameAvailable,
    getUserID
} = require('../database/userDB');

describe('Testing userDB functions', () => {
    test('isUsernameAvailable should return false for existing user', async () => {
        const userExists = await isUsernameAvailable('testUser1');
        expect(userExists).toBe(false);
    });

    test('verifyUserLogin should return true for correct credentials', async () => {
        const result = await verifyUserLogin('testUser1', '1234');
        expect(result).toBe(true);
    });

    test('verifyUserLogin should return false for incorrect credentials', async () => {
        const result = await verifyUserLogin('testUser1', '1233');
        expect(result).toBe(false);
    });

    test('isUsernameAvailable should return true for non-existing user', async () => {
        const result = await isUsernameAvailable('testUser2');
        expect(result).toBe(true);
    });

    test('getUserID should return a valid ID for an existing user', async () => {
        const userID = await getUserID('testUser1');
        expect(userID).toBe(1);
    });

    test('getUserID should return null for a non-existent user', async () => {
        const userID = await getUserID('fakeUser');
        expect(userID).toBeNull();
    });

    test('updatePassword should change the password', async () => {
        await updatePassword('testUser1', '1234', 'newPass');
        const result = await verifyUserLogin('testUser1', '1234');
        expect(result).toBe(false);
    });

    test('verifyUserLogin should return true for updated password', async () => {
        const result = await verifyUserLogin('testUser1', 'newPass');
        expect(result).toBe(true);
    });

    test('updatePassword should revert to original password', async () => {
        await updatePassword('testUser1', 'newPass', '1234');
        const result = await verifyUserLogin('testUser1', '1234');
        expect(result).toBe(true);
    });
});
