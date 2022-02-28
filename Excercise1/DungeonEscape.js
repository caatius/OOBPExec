const prompts = require('prompts');

let presentRoom = 0;

class Vault{
    constructor() {
        this.roomArr = new Array();
}
    getPlayerLocationRoom() {
        for (let i = 0; i <= this.roomArr.length -1; i++) {
            if (this.roomArr[i].playerLocation == true) {
                return this.roomArr[i];
            }
        }
    }
    getPlayerLocationRoomIndex() {
        for (let i = 0; i <= this.roomArr.length -1; i++) {
            if (this.roomArr[i].playerLocation == true) {
                return i;
            }
        }
    }
}

class Room{
    constructor(id, name, info, enemies, door)
        {
        this.name = name;
        this.info = info;
        this.playerLocation = false;
        this.enemies = new Array();
        this.door = new Array();
        }
    lookAround() {
        console.log("You are in "+ playerRoom.name + ", " + playerRoom.info);
        console.log();
        console.log("There are doorways leading to: ");
        console.log(playerRoom._door);
}
    set door(x) {
        this._door = x;
}
    get door() {
        return this._door;
}
    setGameStartLocation() {
        this.playerLocation = true;
    }
    setMoveLocation() {
        this.playerLocation = false;
        response.value.playerLocation = true;
    }
    enemiesInRoom() {
        if (this.playerLocation.enemies.length < 1);
        return false;
    }
    kill() {
        if (enemies.hp <= 0) {
        this.playerLocation.enemies.pop();
        }
    }
    killPlayer() {
        if (player.hp <= 0) {
        console.log("You are dead! Game over, man, game over!")
        continueGame = false;
        }
    }
}

class Characters{
    constructor(name, hp, ap, acc, weapon)
    {
        this.name = name;
        this.hp = hp;
        this.ap = ap;
        this.acc = acc;
        this.weapon = weapon;
    }
    attack() {

    }
}

class Player extends Characters{
}

class Enemy extends Characters{
}

let player = new Player("Player", 10, 2, 75, "worn 'Baseball Bat Boy' bat");

let molerat = new Enemy("Wounded Mole rat", 2, 1, 50, "tunneling maw & claws");
let irrghoul = new Enemy("Irradiated Ghoul", 4, 8, 90, "irradiated claws and teeth");

let vault = new Vault();

let room1 = new Room(
    1,
    'The Vault Enterance', 
    "a mine shaft with a huge vault door cranked open leading to the Vault itself.",
    null
    );

let room2 = new Room(
    2, 
    "a Hallway", 
    "a long hallway leading onwards. The walls are worn and the lights barely function.",
    molerat
    );

let room3 = new Room(
    3, 
    "a Chamber", 
    "a huge chamber with a leaking plasma conduit.", 
    irrghoul
    );

let room4 = new Room(
    4, 
    "the Portal room", 
    "a room with a mysterious portal. The portal is pulling you in...",
    null
    );

let portal = new Room(
    5,
    "Portal", 
    "Mysterius glimmering portal of PWNAge",
    null
);

vault.roomArr.push(room1);
vault.roomArr.push(room2);
vault.roomArr.push(room3);
vault.roomArr.push(room4);
vault.roomArr.push(portal);

room1.door.push(room2.name);
room2.door.push(room1.name, room2.name)
room3.door.push(room2.name, room4.name)
room4.door.push(room3.name, portal.name);

/*choices = [];
for (let i = 0; i <= this.door.length -1; i++) {
    choices.push(vault.roomArr[presentRoom]._door[i])
}
*/
const roomMoveChoice = [
    { title: room1.name, value: room1.door},
    { title: room2.name, value: room2.door},
    { title: room3.name, value: room3.door},
    { title: room4.name, value: portal}
];

function moveLocation() {
    setPlayerLocation(response.value);

}

async function gameLoop() {
    let continueGame = true;

    // Example set of UI options for the user to select
    const initialActionChoices = [
        { title: 'Look around', value: 'look around' },
        { title: 'Go to Room', value: 'go to room' },
        { title: 'Attack', value: 'attack'},
        { title: 'Exit game', value: 'exit the game.'}
    ];

    // Show the list of options for the user.
    // The execution does not proceed from here until the user selects an option.
    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices
    });
    
    // Deal with the selected value
    console.log('You ' + response.value);
    switch(response.value) {
      case 'look around':
        console.log("You are in "+ vault.roomArr[presentRoom].name + ", " + vault.roomArr[presentRoom].info);
        console.log();
        console.log("There are doorways leading to: ");
        console.log(vault.roomArr[presentRoom].door);
        if (vault.roomArr[presentRoom].enemies == true) {
            console.log("You see a " + vault.roomArr[presentRoom].enemies + " gazing at you! Oh no, it's striking!");
        };
        break;
      
      case 'go to room':
        const response = await prompts({
            type: 'select',
            name: 'value',
            message: 'Choose your action',
            choices: roomMoveChoice[presentRoom]
          });
        console.log('You go to room ' + response.title);
        if (presentRoom = 4) {
            console.log('You step into the portal...')
            continueGame = false;
        }
        break;
      
      case 'attack':
        break;
      
      case 'exit the game.':
        continueGame = false;
        break;
    }
    
    if(continueGame) {
      gameLoop();
    }    
}

process.stdout.write('\033c'); // clear screen on windows

console.log('WELCOME TO THE VAULT-TEC VAULT #324!')
console.log('================================================')
console.log('You walk down the stairs to the vault')
gameLoop();
