db.games.remove({});
db.users.remove({});

const gamesDB = [
  { gid: "1", name: "Chrome Dino", genre: "Arcade", posterPath: "images/chrome_dino.png", caption: "Take your dino for a ride in this browser based game!", path: "/services/dino" },
  { gid: "2", name: "Splintercell Blacklist", genre: "Stealth", posterPath: "images/splintercell.jpg", caption: "You are blacklisted, but are you loyal to your country? (Coming soon)", path: "#" },
  { gid: "3", name: "Arkham City", genre: "Action", posterPath: "images/arkhamcity.jpg", caption: "Joker has taken control of Arkham city, will Batman save the night? (Coming soon)", path: "#" },
  { gid: "4", name: "The Witcher 3", genre: "Fantasy", posterPath: "images/witcher3.jpg", caption: "Save your protege, will you? (Coming soon)", path: "#" },
  { gid: "5", name: "Age of Empires 4", genre: "Strategy", posterPath: "images/aoe4.jpg", caption: "Build your civilization, preserve it, conquer others in AOE IV (Coming soon)", path: "#" },
  { gid: "6", name: "Fifa 22", genre: "Sports", posterPath: "images/fifa22.jpeg", caption: "Experience Football with FIFA 22 (Coming soon)", path: "#" },
  { gid: "7", name: "NFSMW", genre: "Racing", posterPath: "images/nfsmw.jpg", caption: "Welcome to Rockport City, the speed has no limit here! (Coming soon)", path: "#" },
  { gid: "8", name: "GTA 5", genre: "Open World Sandbox", posterPath: "images/gta5.jpg", caption: "Master the sandbox world in GTA V (Coming soon)", path: "#" },
];

const usersDB = [
  { uid: "1", name: "Varun", games:"1,8,7,6,5" }
]

db.games.insertMany(gamesDB);
const countGames = db.games.count();
print('Inserted', countGames, 'games');

db.users.insertMany(usersDB);
const countUsers = db.users.count();
print('Inserted', countUsers, 'users');