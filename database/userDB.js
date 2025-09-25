import * as SQLite from 'expo-sqlite';

// Open the database and assign it to a `db` variable
const db = await SQLite.openDatabaseAsync('database.db');



// Insert a new user into the database
async function insertUser(username, password) {
    await db.runAsync(
        `INSERT INTO user (username, password) VALUES (?, ?);`,
        username,
        password
    );
}

// Verify login info
// Verify login info
async function verifyUserLogin(username, password) {
    try {
        // First, check if the user exists with the provided username
        const user = await db.getFirstAsync(
            'SELECT password FROM user WHERE username = $username', 
            { $username: username }
        );

        // Log the user details to check the result
        console.log('User from verifyUserLogin:', user);

        if (user) {
            // Check if the password matches
            if (user.password === password) {
                console.log('Login successful');
                return true;
            } else {
                console.log('Invalid password');
                return false;
            }
        } else {
            console.log('User not found');
            return false;
        }
    } catch (error) {
        console.error("Login verification failed:", error);
        return false;  // Return false in case of error
    }
}
  

// For account recovery
async function updatePassword(username, oldPassword, newPassword) {
    await db.runAsync(
        `UPDATE user SET password = ? WHERE username = ? AND password = ?;`,
        newPassword,
        username,
        oldPassword
    );
}

// For ensuring usernames are unique
async function isUsernameAvailable(username) {
    const user = await db.getFirstAsync(
        `SELECT username FROM user WHERE username = ?;`,
        username
    );
    return !user;
}

// Remove a user from the database
async function removeUser(username) {
    await db.runAsync(`DELETE FROM user WHERE username = ?;`, username);
}

// Get user ID based on username
async function getUserID(username) {
    const user = await db.getFirstAsync(
        `SELECT id FROM user WHERE username = ?;`,
        username
    );
    return user ? user.id : null;
}

export {
    insertUser,
    verifyUserLogin,
    updatePassword,
    isUsernameAvailable,
    removeUser,
    getUserID
};

