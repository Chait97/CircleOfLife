import Point2D from "./Point2D";

export interface renderable{
    render: () => void;
}

export default class SimObject{
    static simObjIdMax = 0;
    static simObjMap = new Map();
    static distanceMap = new Map();
    size: number;
    position: Point2D;
    boundingRadius: number;
    simObjId: number;
    protected _velocity: Point2D;
    protected speed: number
    isColliding: boolean;
    protected _canvas!: HTMLCanvasElement;
    ctx: any;
    mass: number;

    static reset() {
        this.simObjMap.clear()
        this.simObjMap = new Map();
        this.simObjIdMax = 0;
        this.distanceMap.clear();
        this.distanceMap = new Map();
    }

    constructor(size:number, position:Point2D, boundingRadius?:number) {
        this.size = size;
        this.position = position;
        console.log(this.position, position)
        if(boundingRadius){
            this.boundingRadius = boundingRadius;
        } else this.boundingRadius = size;
        this.simObjId = SimObject.register(this);
        this.isColliding = false;
        this.mass = this.size*this.size
        console.log(this.position, position)
    };

    set velocity(v){
        this._velocity = v;
        this.speed = v.magnitude;
    }

    get velocity(){
        return this._velocity;
    }

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

            let distancesToA:Map<number,number>;
            if(this.distanceMap.has(simObj_i))
                distancesToA = this.distanceMap.get(simObj_i)
            else
                distancesToA = new Map()

            // if A isn't already in a collided state,
            // check with every other simObj [B]
            for (let simObj_j = simObj_i + 1; simObj_j < simObjIds.length; simObj_j += 1){
                let b = this.simObjMap.get(simObjIds[simObj_j]);
                let dist = (a.position).distanceTo(b.position);

                // if distance is less than size then the cells are INSIDE or overlapping
                if(dist < a.size + b.size){
                    let overlap = 1 -  dist / (a.size + b.size)
                    // a.position.interpolate()

                }
                // if distance is less than size + threshold extra margin
                if(dist <= a.boundingRadius + b.boundingRadius){
                    a.onCollide(b);
                    collisions.add(a.simObjId);
                    collisions.add(b.simObjId);
                    // since A has collided with B, we don't care what else it's
                    // colliding with in this update
                    distancesToA.set(simObj_j, -1);
                    break;
                }
                // if A and B haven't collided then they have some distance > 0
                if(simObj_i === undefined ||  simObj_j === undefined ||  dist === undefined)
                    console.log(this.distanceMap, simObj_i, simObj_j, dist)
                distancesToA.set(simObj_j, dist);
            }
            // if no collision has occurred between A and all other possible simObjs,
            // it means it has not collided in this update;
            if (!collisions.has(a.simObjId)){
                a.offCollide();
            }

            this.distanceMap.set(simObj_i, distancesToA);
        }
    }

    onCollide(that:SimObject):void{
        this.isColliding = true;
        that.isColliding = true
        // console.log(this.simObjId, " is Colliding!")
    }

    offCollide():void{
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
