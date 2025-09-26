
INSERT INTO user (username, password)
VALUES ("testUser1", "1234"),
("testUser2","1234");

INSERT INTO team(team_id, team_name, nickname, logo_url)
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




INSERT INTO favorite (team_id, user_id)
VALUES (1, 1);