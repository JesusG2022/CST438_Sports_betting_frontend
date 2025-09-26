import * as SQLite from 'expo-sqlite';

let db; // Declare db variable

// Reference Documentation = https://docs.expo.dev/versions/latest/sdk/sqlite/

// I was having issues when all the files were separated so I put everything in one
// Willing to separate out again
// Initialize database and create tables
export async function initializeDatabase() {
    // Prevent opening the database multiple times (THIS WAS A PROBLEM)
    if (!db) {
        db = await SQLite.openDatabaseAsync('database.db');

        // This part can be commented out. Was to test to see if users were being added
        // SQLite extension can't see the contents of a database stored on the emulator in react
        // try {
        //     const users = await db.getAllAsync('SELECT * FROM user');
        //     console.log('Current users in database:', users);
        // } catch (error) {
        //     console.error('Error fetching users:', error);
        // }

        // Create tables if not exist
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS team (
                team_id INTEGER PRIMARY KEY,
                team_name TEXT NOT NULL,
                nickname TEXT NOT NULL,
                logo_url TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS favorite (
                team_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                PRIMARY KEY (user_id, team_id),
                FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
                FOREIGN KEY (team_id) REFERENCES team(team_id) ON DELETE CASCADE
            );
        `);

        // Insert test data into user table
        await db.execAsync(`
            INSERT OR IGNORE INTO user (username, password)
            VALUES 
            ("testUser1", "1234"),
            ("testUser2", "1234");
        `);

        // Insert test data into team table
        await db.execAsync(`
            INSERT OR IGNORE INTO team (team_id, team_name, nickname, logo_url)
            VALUES 
            (1, "Atlanta Hawks", "Hawks", "https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg"),  
            (2, "Boston Celtics", "Celtics", "https://upload.wikimedia.org/wikipedia/fr/6/65/Celtics_de_Boston_logo.svg"),  
            (4, "Brooklyn Nets", "Nets", "https://upload.wikimedia.org/wikipedia/en/4/44/Brooklyn_Nets_newlogo.svg"),  
            (5, "Charlotte Hornets", "Hornets", "https://upload.wikimedia.org/wikipedia/en/c/c4/Charlotte_Hornets_%282014%29.svg"),  
            (6, "Chicago Bulls", "Bulls", "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg"),  
            (7, "Cleveland Cavaliers", "Cavaliers", "https://upload.wikimedia.org/wikipedia/en/4/4b/Cleveland_Cavaliers_logo.svg"),  
            (8, "Dallas Mavericks", "Mavericks", "https://upload.wikimedia.org/wikipedia/en/9/97/Dallas_Mavericks_logo.svg"),  
            (9, "Denver Nuggets", "Nuggets", "https://upload.wikimedia.org/wikipedia/en/7/76/Denver_Nuggets.svg"),  
            (10, "Detroit Pistons", "Pistons", "https://upload.wikimedia.org/wikipedia/en/7/7c/Detroit_Pistons_logo.svg"),  
            (11, "Golden State Warriors", "Warriors", "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg"),  
            (14, "Houston Rockets", "Rockets", "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Rockets.svg"),  
            (15, "Indiana Pacers", "Pacers", "https://upload.wikimedia.org/wikipedia/en/1/1b/Indiana_Pacers.svg"),  
            (16, "Los Angeles Clippers", "Clippers", "https://upload.wikimedia.org/wikipedia/en/b/bb/Los_Angeles_Clippers_logo.svg"),  
            (17, "Los Angeles Lakers", "Lakers", "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg"),  
            (19, "Memphis Grizzlies", "Grizzlies", "https://upload.wikimedia.org/wikipedia/en/f/f1/Memphis_Grizzlies.svg"),  
            (20, "Miami Heat", "Heat", "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg"),  
            (21, "Milwaukee Bucks", "Bucks", "https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg"),  
            (22, "Minnesota Timberwolves", "Timberwolves", "https://upload.wikimedia.org/wikipedia/en/c/c2/Minnesota_Timberwolves_logo.svg"),  
            (23, "New Orleans Pelicans", "Pelicans", "https://upload.wikimedia.org/wikipedia/en/0/0d/New_Orleans_Pelicans_logo.svg"),  
            (24, "New York Knicks", "Knicks", "https://upload.wikimedia.org/wikipedia/en/2/25/New_York_Knicks_logo.svg"),  
            (25, "Oklahoma City Thunder", "Thunder", "https://upload.wikimedia.org/wikipedia/en/5/5d/Oklahoma_City_Thunder.svg"),  
            (26, "Orlando Magic", "Magic", "https://upload.wikimedia.org/wikipedia/en/1/10/Orlando_Magic_logo.svg"),  
            (27, "Philadelphia 76ers", "76ers", "https://upload.wikimedia.org/wikipedia/en/0/0e/Philadelphia_76ers_logo.svg"),  
            (28, "Phoenix Suns", "Suns", "https://upload.wikimedia.org/wikipedia/en/d/dc/Phoenix_Suns_logo.svg"),  
            (29, "Portland Trail Blazers", "Trail Blazers", "https://upload.wikimedia.org/wikipedia/en/2/21/Portland_Trail_Blazers_logo.svg"),  
            (30, "Sacramento Kings", "Kings", "https://upload.wikimedia.org/wikipedia/en/c/c7/SacramentoKings.svg"),  
            (31, "San Antonio Spurs", "Spurs", "https://upload.wikimedia.org/wikipedia/en/a/a2/San_Antonio_Spurs.svg"),  
            (38, "Toronto Raptors", "Raptors", "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg"),  
            (40, "Utah Jazz", "Jazz", "https://upload.wikimedia.org/wikipedia/en/c/c7/Utah_Jazz_logo.svg"),  
            (41, "Washington Wizards", "Wizards", "https://upload.wikimedia.org/wikipedia/en/0/02/Washington_Wizards_logo.svg");
        `);
    }
}
// -------------------------------- userTableFunctions ------------------------------------------

// logging function
export async function logDatabaseContents() {
    await initializeDatabase();  // Ensure the database is initialized

    try {
       // Fetch data from each table and log to console
        // const users = await db.getAllAsync('SELECT * FROM user;');
        // console.log('Users:', users);

        // const teams = await db.getAllAsync('SELECT * FROM team;');
        // console.log('Teams:', teams);

        const favorites = await db.getAllAsync('SELECT * FROM favorite;');
        console.log('Favorites:', favorites);

    } catch (error) {
        console.error('Error fetching data from database:', error);
    }
}


// Insert a new user into the database
export async function insertUser(username, password) {
    await initializeDatabase();  
    await db.runAsync(
        `INSERT INTO user (username, password) VALUES (?, ?);`,
        username,
        password
    );
}

// Verify login info
export async function verifyUserLogin(username, password) {
    await initializeDatabase();  // Ensure database is initialized
    try {
        const user = await db.getFirstAsync(
            'SELECT password FROM user WHERE username = $username', 
            { $username: username }
        );

        console.log('User from verifyUserLogin:', user);

        if (user) {
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
        return false;
    }
}

// For account recovery
export async function updatePassword(username, oldPassword, newPassword) {
    await initializeDatabase();  // Ensure database is initialized
    await db.runAsync(
        `UPDATE user SET password = ? WHERE username = ? AND password = ?;`,
        newPassword,
        username,
        oldPassword
    );
}

// For ensuring usernames are unique
export async function isUsernameAvailable(username) {
    await initializeDatabase();  // Ensure database is initialized
    const user = await db.getFirstAsync(
        `SELECT username FROM user WHERE username = ?;`,
        username
    );
    return !user;
}

// Remove a user from the database
export async function removeUser(username) {
    await initializeDatabase();  // Ensure database is initialized
    await db.runAsync(`DELETE FROM user WHERE username = ?;`, username);
}

// Get user ID based on username
export async function getUserID(username) {
    await initializeDatabase();  // Ensure database is initialized
    const user = await db.getFirstAsync(
        `SELECT id FROM user WHERE username = ?;`,
        username
    );
    return user ? user.id : null;
}

// Call initializeDatabase() when app is loaded
initializeDatabase();

// -------------------------------- userTableFunctions END ------------------------------------------

// ---------------------------------- Team DB Functions ---------------------------------------------
// Insert a team manually

export async function insertTeamManually(team_id, team_name, nickname, logo_url) {
    await db.runAsync(
        `INSERT INTO team (team_id, team_name, nickname, logo_url) VALUES (?, ?, ?, ?);`,
        team_id,
        team_name,
        nickname,
        logo_url
    );
}

export async function getAllTeams() {
    await initializeDatabase();  // Ensure the database is initialized
    try {
        const teams = await db.getAllAsync('SELECT * FROM team;');
        return teams;
    } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
    }
}

// Insert a team using an array
export async function insertTeam([team_id, team_name, nickname, logo_url]) {
    await db.runAsync(
        `INSERT INTO team (team_id, team_name, nickname, logo_url) VALUES (?, ?, ?, ?);`,
        team_id,
        team_name,
        nickname,
        logo_url
    );
}

// Add a team to a user's favorites
export async function addTeamToFavs(username, team_name) {
    const userID = await getUserID(username);
    const teamID = await getTeamID(team_name);

    console.log(userID);

    if (userID && teamID) {
        await db.runAsync(
            `INSERT INTO favorite (team_id, user_id) VALUES (?, ?);`,
            teamID,
            userID
        );
    }
}

// Get all favorite team IDs of a user
export async function getFavTeamID(username) {
    const userID = await getUserID(username);
    const teams = await db.getAllAsync(
        `SELECT team_id FROM favorite WHERE user_id = ?;`,
        userID
    );
    return teams.map(team => team.team_id);
}

// Get favorite team names of a user
export async function getFavTeamNames(username) {
    const team_ids = await getFavTeamID(username);
    let names = [];

    for (const team_id of team_ids) {
        const team = await db.getFirstAsync(
            `SELECT team_name FROM team WHERE team_id = ?;`,
            team_id
        );
        if (team) {
            names.push(team.team_name);
        }
    }
    return names;
}

// Get all favorite team information of a user
export async function getAllFavTeamInfo(username) {
    const team_ids = await getFavTeamID(username);
    let teamInfo = [];

    for (const team_id of team_ids) {
        const team = await db.getFirstAsync(
            `SELECT team_id, team_name, nickname, logo_url FROM team WHERE team_id = ?;`,
            team_id
        );
        if (team) {
            teamInfo.push([team.team_id, team.team_name, team.nickname, team.logo_url]);
        }
    }
    return teamInfo;
}

// Get a team's ID 
export async function getTeamID(team_name) {
    const team = await db.getFirstAsync(
        `SELECT team_id FROM team WHERE team_name = ?;`,
        team_name
    );
    return team ? team.team_id : null;
}

// Remove selected team from favorites 
export async function removeTeamFromFav(username, team_name) {
    const user_id = await getUserID(username);
    const team_id = await getTeamID(team_name);

    if (user_id && team_id) {
        await db.runAsync(
            `DELETE FROM favorite WHERE user_id = ? AND team_id = ?;`,
            user_id,
            team_id
        );
    }
}
// Wipe user favorites
export async function wipeUserFavorites(username) {
    const userID = await getUserID(username);

    if (userID) {
        await db.runAsync(
            `DELETE FROM favorite WHERE user_id = ?;`,
            userID
        );
     //   console.log(`All favorites for user ${username} have been deleted.`);
    } else {
        console.log(`User ${username} not found.`);
    }
}

// ---------------------------------- Team DB Functions END ---------------------------------------------