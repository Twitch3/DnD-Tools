import { BattleMapToken } from './battle-map-token';

export class PlayerToken extends BattleMapToken {

    public playerName: string;

    constructor(name: string, color: string, playerName?: string, abbreviation?: string, faction?: number) {
        super(name, abbreviation, faction);

        this.tokenColor = color;
    }
}
