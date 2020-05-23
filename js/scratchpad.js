static computeDistances(){
    // this compuptation occurs after every update before painting the screen

    let cellIds = [...this.cellMap.keys()];

    // track the ids of the cells which are in a colliding state for this update
    let collisions = new Set();

    // A and B represent a pair of Cells
    // A.cellId == cellIds[cell_i]
    for (let cell_i = 0; cell_i < cellIds.length; cell_i += 1){

        let a = this.cellMap.get(cellIds[cell_i]);

        // if A has already collided with something in this frame, don't
        // check for any other collisions
        if (collisions.has(a.cellId)){
            continue;
        }

        // if A isn't already in a collided state,
        // check with every other cell [B]
        for (let cell_j = cell_i; cell_j < cellIds.length; cell_j += 1){
            let b = this.cellMap.get(cellIds[cell_j]);
            let dist = (a.position).distanceTo(b.position);

            // if distance is less than size + threshold extra margin
            if(dist <= a.size + b.size + a.bound + b.bound){
                a.onCollide();
                b.onCollide();
                collisions.add(a.cellId);
                collisions.add(b.cellId);
                this.distanceMap.set([cell_i, cell_j], -1);
                // since A has collided with B, we don't care what else it's
                // colliding with in this update
                break;
            }
            // if A and B haven't collided then they have some distance > 0
            this.distanceMap.set([cell_i, cell_j], dist)
        }
        // if no collision has occurred between A and all other possible cells,
        // it means it has not collided in this update;
        if (!collisions.has(a.cellId)){
            a.offCollide();
        }
    }
    console.log(collisions);
}
