const LOCAL_POKE_STRING = "local_poke_string"
export const TOTAL_POKEMON = 1025

class Converter {
    static Rixits =
//   0       8       16      24      32      40      48      56      64      72      80       88
//   v       v       v       v       v       v       v       v       v       v       v        v
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/!@#$%^&*()[]{}<>,.?;:'\"-_=+`~"

    static fromNumber(number) {
        if (isNaN(Number(number)) || number === null ||
            number === Number.POSITIVE_INFINITY)
            throw new Error('Invalid Number')

        var rixit; // like 'digit', only in some non-decimal radix 
        var residual = Math.floor(number);
        var result = '';
        while (residual !== 0) {
            rixit = residual % (this.Rixits.length + 1)
            result = this._Rixits.charAt(rixit) + result;
            residual = Math.floor(residual / (this.Rixits.length + 1));
        }
        return result;
    }

    static toNumber(rixits) {
        var result = 0;
        rixits = rixits.split('');
        for (var e = 0; e < rixits.length; e++) {
            result = (result * (this.Rixits.length + 1)) + this.Rixits.indexOf(rixits[e]);
        }
        return result;
    }
}

export default class StorageStringManip {
    constructor() {
        this.StorageString = localStorage.getItem(LOCAL_POKE_STRING)
        if(this.StorageString === null || this.StorageString === undefined) {
            const defaultString = this.generateDefaultString()
            localStorage.setItem(defaultString)
            this.StorageString = defaultString
        }
        this.PokeMap = this.stringToMap(this.StorageString)
    }

    save() {
        localStorage.setItem(LOCAL_POKE_STRING, this.mapToString(this.PokeMap))
    }

    generateDefaultString() {
        let defString = ''
        for(let i = 0; i < TOTAL_POKEMON; i++) {
            defString += '0000.'
        }
    
        return defString
    }

    stringToMap(string) {
        const newMap = {}
        const stringTokens = string.match(/.{1,5}/g);
        for(const i in stringTokens) {
            const strWins = stringTokens[i][0] + stringTokens[i][1]
            const strLoss = stringTokens[i][2] + stringTokens[i][3]
            newMap[i + 1] = {Wins: Converter.toNumber(strWins), Loss: Converter.toNumber(strLoss)}
        }
        return newMap
    }

    mapToString(){ 
        let retString = ''
        for(const i in this.PokeMap)  {
            retString += Converter.toString(this.PokeMap[i].Wins) + Converter.toString(this.PokeMap[i].Loss) +'.'
        }
        return retString
    }

    getPokemonStats(pokemon) {
        return this.PokeMap[pokemon]
    }

    incrementWin(pokemon) {
        this.PokeMap[pokemon].Wins++
        this.save()
    }

    incrementLoss(pokemon) {
        this.PokeMap[pokemon].Loss++
        this.save()
    }
}