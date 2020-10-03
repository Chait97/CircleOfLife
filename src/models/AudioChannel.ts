import * as Tone from "tone";

export interface AudioVisual {
    beatResponse?:() => void;
    bassResponse?:() => void;
    trebleResponse?:() => void;
}

export default class AudioController {

    elements:AudioVisual[];
    kick: any;
    synth: any;
    arp: any;
    arpFilter: any;

    constructor(){
        this.elements = []
         this.kick = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 5,
            oscillator: {
              type: "sine"
            },
            envelope: {
              attack: 0.001,
              decay: 0.4,
              sustain: 0.01,
              release: 1.4,
              attackCurve: "exponential"
            }
          })

        const filter = new Tone.Filter(200, 'lowpass').toDestination();
        // this.synth = new Tone.PolySynth(Tone.Synth);
        this.synth = this.fmSynth();
        this.kick.connect(filter);
        
        this.arp = new Tone.MonoSynth({
            oscillator: {
                type: "square"
            },
            envelope: {
                attack: 0.1
            }
        })
        this.arp.volume.value = -6;
        this.arpFilter = new Tone.Filter(1000, 'lowpass').toDestination();

        window.addEventListener("mousemove", (e) => {
            this.arpFilter.frequency.rampTo(1000 * (window.outerHeight - e.clientY)/ window.outerHeight, 1);
        })
        this.arp.connect(this.arpFilter);
    }

    subscribe(Cell:AudioVisual){
        this.elements.push(Cell);
    }

    kickPlay(time){
        new Tone.Loop((time) => {
            this.kick.triggerAttackRelease('C2', '8n', time);
            this.bassResponse();
        }, '4n').start(0);
    }
    
    synthPlay(time){
        this.synth.triggerAttackRelease("G1", '2n');
    }

    arpPlay(time) {
        let pattern = new Tone.Pattern((time, note) => {
            this.arp.triggerAttackRelease(note, 0.125);
        }, ["C3", "G3", "E4", "A3", "B4"])
        pattern.playbackRate = 4;
        pattern.start(0);
    }


    beat(interval: number) {
        this.kickPlay(interval)
        this.synthPlay(interval)
        this.arpPlay(interval);
        Tone.Transport.start();
    }

    bassResponse() {
        this.elements.forEach(e => e.bassResponse())
    }

    fmArp() {
        var fmSynth = new Tone.FMSynth({
            harmonicity: 5,
            modulationIndex: 5,
            detune: 0, //alter, 100 per half step
            oscillator: {
              type: "fatsawtooth"
            },
            envelope: {
              attack: 0.1,
              decay: 5,
              sustain: 1,
              release: 1
            },
            modulation: {
              type: "sine"
            },
            modulationEnvelope: {
              attack: 0.5,
              decay: 10,
              sustain: 0.7,
              release: 1
            }
          });
          
          // var waveform = new Tone.Waveform(1024);
          // // waveform.connect(fmSynth);
          // var waveValue = waveform.getValue();
          // console.log(waveValue);
          
          fmSynth.toDestination();
        //   let value = fmSynth.envelope.value
        return fmSynth;
    }

    fmSynth () {
        var fmSynth = new Tone.FMSynth({
            harmonicity: 5,
            modulationIndex: 20,
            detune: 0, //alter, 100 per half step
            oscillator: {
              type: "sine"
            },
            envelope: {
              attack: 0.1,
              decay: 5,
              sustain: 1,
              release: 1
            },
            modulation: {
              type: "square"
            },
            modulationEnvelope: {
              attack: 0.5,
              decay: 10,
              sustain: 0.7,
              release: 1
            }
          });
          
          // var waveform = new Tone.Waveform(1024);
          // // waveform.connect(fmSynth);
          // var waveValue = waveform.getValue();
          // console.log(waveValue);
          
          fmSynth.toDestination();
        //   let value = fmSynth.envelope.value
        return fmSynth;
    }

}
