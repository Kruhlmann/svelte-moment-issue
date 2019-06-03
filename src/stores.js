import { writable } from 'svelte/store';

export const side_nav_items = writable([
    {name: "files", icon: "copy", solid: true, active: false},
    {name: "explore", icon: "globe-europe", solid: true, active: false},
    {name: "favorites", icon: "star", solid: true, active: false},
]);

export const user_files = writable([
    {
        id: "dqwnbjk-dwqdqw-fgewg-gewh-rehhrehre",
        name: "bshout",
        description: "Shows icon when buff is missing",
        owner: "gasolinebased",
        icon: "Ability_Warrior_BattleShout",
        favorite: false,
        aura: {
            "beginsound": 1,
            "usebeginsound": false,
            "isdynamicgroup": false,
            "flashanimstart": 5,
            "targetduration": 0,
            "animduration": 0.5,
            "useendsound": false,
            "size": 1,
            "buffname": "Fear Ward",
            "translateoffsety": 50,
            "fontoffsety": 0,
            "dynamicsorted": false,
            "timerfont": 1,
            "y": 486,
            "x": -232,
            "test": false,
            "icon_r": 1,
            "translateoffsetx": 50,
            "hundredth": false,
            "fontcolor_b": 1,
            "groupnumber": 0,
            "secondspecifiertext": "",
            "dynamicspacing": 5,
            "stacks": ">=0",
            "fontsize": 1.5,
            "texture": "Interface\\Icons\\Spell_Holy_Excorcism",
            "fontcolor_r": 1,
            "inraid": 0,
            "alpha": 1,
            "friendlytarget": false,
            "timerfontsize": 1,
            "raidgroupmember": false,
            "rgmname": "",
            "fontcolor_g": 1,
            "icon_g": 1,
            "inraidinstance": 0,
            "fadealpha": 0.99,
            "secsleftdur": 0,
            "inbattleground": 0,
            "hidestacks": false,
            "enemytarget": false,
            "usefontcolor": false,
            "inparty": 0,
            "used": true,
            "endsound": 1,
            "dynamicorientation": 1,
            "fontoffsetx": 0,
            "icon_b": 1,
            "alive": 0,
            "secsleft": false,
            "timer": false,
            "fontalpha": 1,
            "secondspecifier": false,
            "blendmode": 1,
            "incombat": 0,
            "mounted": 0,
            "cpstacks": ">=0",
            "minutes": false,
            "isdebuff": false,
            "inverse": false,
            "exactname": false,
            "dynamiccenter": false,
            "flashanim": false,
            "cooldown": false,
            "scalefactor": 0.8,
        },
    },
]);
export const open_files = writable([]);