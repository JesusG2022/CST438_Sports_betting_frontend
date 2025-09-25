const {
    getAllFavTeamInfo,
    removeTeamFromFav,
    addTeamToFavs,
    getFavTeamNames,
    getTeamID,
    getFavTeamID
} = require('../database/teamDB');

describe('Testing teamDB functions', () => {

    test('getAllFavTeamInfo should return correct favorite team info for testUser1', async () => {
        const result = await getAllFavTeamInfo('testUser1');
        expect(result).toEqual([
            [1, 'Atlanta Hawks', 'Hawks', 'https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg']
        ]);
    });

    test('removeTeamFromFav should remove the team from favorites for testUser1', async () => {
        await removeTeamFromFav('testUser1', 'Atlanta Hawks');
        const result = await getAllFavTeamInfo('testUser1');
        expect(result).toEqual([]);
    });

    test('addTeamToFavs should add teams to favorites for testUser1', async () => {
        await addTeamToFavs('testUser1', 'Atlanta Hawks');
        await addTeamToFavs('testUser1', 'Boston Celtics');
        const result = await getAllFavTeamInfo('testUser1');
        expect(result).toEqual([
            [1, 'Atlanta Hawks', 'Hawks', 'https://upload.wikimedia.org/wikipedia/en/2/24/Atlanta_Hawks_logo.svg'],
            [2, 'Boston Celtics', 'Celtics', 'https://upload.wikimedia.org/wikipedia/fr/6/65/Celtics_de_Boston_logo.svg']
        ]);
    });

    test('removeTeamFromFav should remove Boston Celtics from favorites for testUser1', async () => {
        await removeTeamFromFav('testUser1', 'Boston Celtics');
        const result = await getFavTeamNames('testUser1');
        expect(result).toEqual(['Atlanta Hawks']);
    });

    test('getFavTeamID should return correct team IDs for testUser1', async () => {
        const teamIDs = await getFavTeamID('testUser1');
        expect(teamIDs).toEqual([1]);
    });

    test('getTeamID should return correct team ID for Denver Nuggets', async () => {
        const teamID = await getTeamID('Denver Nuggets');
        expect(teamID).toBe(9);
    });

    test('getTeamID should return correct team ID for Miami Heat', async () => {
        const teamID = await getTeamID('Miami Heat');
        expect(teamID).toBe(20);
    });

    test('getTeamID should return correct team ID for New York Knicks', async () => {
        const teamID = await getTeamID('New York Knicks');
        expect(teamID).toBe(24);
    });

});
