import * as Tone from "tone";

export interface AudioVisual {
    beatResponse:() => void;
    bassResponse?:() => void;
    trebleResponse?:() => void;
}

export default class AudioController {

    elements:AudioVisual[];
    kick: any;
    synth: any;

    constructor(){
        this.elements = []
        
    }

    subscribe(Cell:AudioVisual){
        this.elements.push(Cell);
    }

    kickPlay(time){
        var kickPart = new Tone.Loop((time) => {
        	this.kick.triggerAttackRelease('C2', '8n', time);
        }, '2n').start(0);
        Tone.Transport.start();
    }
    
    synthPlay(time){
        let synth = this.synth;
        const now = Tone.now()
        synth.triggerAttack("D4", now);
        synth.triggerAttack("F4", now + 0.5);
        synth.triggerAttack("A4", now + 1);
        synth.triggerAttack("C5", now + 1.5);
        synth.triggerAttack("E5", now + 2);
        synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
    }


    beat(interval: number) {
        this.kick = new Tone.MembraneSynth({
            'envelope' : {
                'sustain' : 0,
                'attack' : 0.02,
                'decay' : 0.8
            },
            'octaves' : 10
        }).toDestination();
        this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
        this.kickPlay(interval);
        this.synthPlay(interval);
    }

}
