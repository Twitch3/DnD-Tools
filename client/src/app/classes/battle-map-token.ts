import { DragCoords } from '../directives/drag-to-move.directive';

export class BattleMapToken {
    public static FACTIONS = {
        HOSTILE: 0,
        ALLIED: 1,
        NEUTRAL: 2
    };

    public static FACTION_COLORS = [
        'red',
        'cornflowerblue',
        'limegreen'
    ];

    public static TYPE = {
        CREATURE: 0,
        EFFECT: 1
    };

    public name: string;
    public abbreviatedName: string;
    public faction: number;
    public tokenColor: string;
    public type: number;
    public tokenCoords: DragCoords = {
        x: 0,
        y: 0
    };

    constructor(name: string, abbreviation?: string, faction?: number, type?: number) {
        this.name = name;
        if (!abbreviation) {
            this.abbreviatedName = name.substr(0, 3);
        } else {
            this.abbreviatedName = abbreviation;
        }

        this.faction = faction ? faction : 0;
        this.tokenColor = BattleMapToken.FACTION_COLORS[this.faction];
        this.type = type ? type : 0;
    }
}
