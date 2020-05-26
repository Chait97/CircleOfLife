import Point2D from "./Point2D";

 export default class SimObject {
    static simObjIdMax = 0;
    static simObjMap = new Map();
    static distanceMap = new Map();
    size: number;
    position: Point2D;
    boundingRadius: number;
    protected simObjId: number;
    isColliding: boolean;
    protected _canvas!: HTMLCanvasElement;
    ctx: any;

    constructor(size:number, position:Point2D, boundingRadius?:number) {
        this.size = size;
        this.position = position;
        if(boundingRadius){
            this.boundingRadius = boundingRadius;
        } else this.boundingRadius = size;
        this.simObjId = SimObject.register(this);
        this.isColliding = false;
    };


    static register(c:SimObject){
        this.simObjMap.set(this.simObjIdMax, c);
        this.simObjIdMax += 1;
        return this.simObjIdMax - 1;
    }

    static computeDistances(){
        // this compuptation occurs after every update before painting the screen

        let simObjIds = [...this.simObjMap.keys()];

        // track the ids of the simObjs which are in a colliding state for this update
        let collisions = new Set();

        // A and B represent a pair of SimObjects
        // A.simObjId == simObjIds[simObj_i]
        for (let simObj_i = 0; simObj_i < simObjIds.length; simObj_i += 1){

            let a = this.simObjMap.get(simObjIds[simObj_i]);

            // if A has already collided with something in this frame, don't
            // check for any other collisions
            if (collisions.has(a.simObjId)){
                continue;
            }

            // if A isn't already in a collided state,
            // check with every other simObj [B]
            for (let simObj_j = simObj_i + 1; simObj_j < simObjIds.length; simObj_j += 1){
                let b = this.simObjMap.get(simObjIds[simObj_j]);
                let dist = (a.position).distanceTo(b.position);

                // if distance is less than size + threshold extra margin
                if(dist <= a.boundingRadius + b.boundingRadius){
                    a.onCollide();
                    b.onCollide();
                    collisions.add(a.simObjId);
                    collisions.add(b.simObjId);
                    this.distanceMap.set([simObj_i, simObj_j], -1);
                    // since A has collided with B, we don't care what else it's
                    // colliding with in this update
                    break;
                }
                // if A and B haven't collided then they have some distance > 0
                if(simObj_i === undefined ||  simObj_j === undefined ||  dist === undefined)
                    console.log(this.distanceMap,simObj_i,simObj_j,dist)
                this.distanceMap.set([simObj_i, simObj_j], dist)
            }
            // if no collision has occurred between A and all other possible simObjs,
            // it means it has not collided in this update;
            if (!collisions.has(a.simObjId)){
                a.offCollide();
            }
        }
    }

    onCollide(){
        this.isColliding = true;
        // console.log(this.simObjId, " is Colliding!")
    }

    offCollide(){
        this.isColliding = false;
    }

    set canvas(value) {
        if(value instanceof HTMLElement && value.tagName.toLowerCase() === 'canvas') {
            this._canvas = value;
            this.ctx = this._canvas.getContext('2d');
        }
    }

    get canvas() {
        return this._canvas;
    }
}
