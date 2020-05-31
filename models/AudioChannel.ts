import * as Tone from "tone";

export interface AudioVisual {
    beatResponse:() => void;
    bassResponse?:() => void;
    trebleResponse?:() => void;
}

export default class AudioController {

    elements:AudioVisual[];

    constructor(){
        this.elements = []
    }
    subscribe(Cell:AudioVisual){
        this.elements.push(Cell);
    }

    kick(time){
        var kick = new Tone.MembraneSynth({
            'envelope' : {
                'sustain' : 0,
                'attack' : 0.02,
                'decay' : 0.8
            },
            'octaves' : 10
        }).toMaster();

        var kickPart = new Tone.Loop(function(time){
        	kick.triggerAttackRelease('C2', '8n', time);
        }, '2n').start(0);
    }



    beat(interval: number) {
        this.kick(interval)
        const f = () => {
            this.elements.forEach(element => {
                element.beatResponse();
            });
        }
        setInterval(f,interval);
    }

}
