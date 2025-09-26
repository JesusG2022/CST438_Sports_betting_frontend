import * as SQLite from 'expo-sqlite';
import { getUserID } from './userDB';

let db;

async function initializeDatabase() {
    db = await SQLite.openDatabaseAsync('database.db');
}

await initializeDatabase();

// Insert a team manually
async function insertTeamManually(team_id, team_name, nickname, logo_url) {
    await db.runAsync(
        `INSERT INTO team (team_id, team_name, nickname, logo_url) VALUES (?, ?, ?, ?);`,
        team_id,
        team_name,
        nickname,
        logo_url
    );
}

// Insert a team using an array
async function insertTeam([team_id, team_name, nickname, logo_url]) {
    await db.runAsync(
        `INSERT INTO team (team_id, team_name, nickname, logo_url) VALUES (?, ?, ?, ?);`,
        team_id,
        team_name,
        nickname,
        logo_url
    );
}

// Add a team to a user's favorites
async function addTeamToFavs(username, team_name) {
    const userID = await getUserID(username);
    const teamID = await getTeamID(team_name);

    if (userID && teamID) {
        await db.runAsync(
            `INSERT INTO favorite (team_id, user_id) VALUES (?, ?);`,
            teamID,
            userID
        );
    }
}

// Get all favorite team IDs of a user
async function getFavTeamID(username) {
    const userID = await getUserID(username);
    const teams = await db.getAllAsync(
        `SELECT team_id FROM favorite WHERE user_id = ?;`,
        userID
    );
    return teams.map(team => team.team_id);
}

// Get favorite team names of a user
async function getFavTeamNames(username) {
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
async function getAllFavTeamInfo(username) {
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
async function getTeamID(team_name) {
    const team = await db.getFirstAsync(
        `SELECT team_id FROM team WHERE team_name = ?;`,
        team_name
    );
    return team ? team.team_id : null;
}

// Remove selected team from favorites 
async function removeTeamFromFav(username, team_name) {
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

export {
    insertTeamManually,
    insertTeam,
    addTeamToFavs,
    getFavTeamID,
    getFavTeamNames,
    getAllFavTeamInfo,
    getTeamID,
    removeTeamFromFav
};
