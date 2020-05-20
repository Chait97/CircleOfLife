# CircleOfLife
Inspired by Conway's Game of Life and Max Cooper's Order from Chaos


# The Basics
### Overview
The idea is that this is more of a simulation than an animation - i.e. interactions between objects take place via well defined rules, but at the same time the focus is on making it visually exciting, by giving the elements extra colors, motion and also making the camera/point of view an active participant in the journey.

### Elements and their Behaviour
1. Fluid - The entire canvas should be filled with a visible/transparent fluid
    - Moves around the canvas
    - Everything else floats around the fluid
    - Swishes, rotates and swirls
    - Moves around the things inside the fluid - cells, fluids, and other stuff floating around
1. Cells - the basic element, every other element must inherit some basic properties of a cell
    - Cells should grow
    - Cells should reproduce
    - Cells should feed
    - Cells should excrete
    - Cells should die
1. Food - particles or other liquids in the form on nutrients floating around in the fluid
    - Nutrients can help cells to grow
    - Psychedelics can cause the cells to exhibit strange, and colourful patters and create heightened movement
    - Other types of food can cause the cells to mutate into other species  
1. Types of Cells (names to be revised to be more interesting)
    - Feeders: eat other cells to grow
    - Runners: these cells move fast and try to go far away from other cells
    - Shamans: other cells coming in contact with Shamans experience psychedelic effects
    - Colonisers: reach a certain threshold and explode into many children cells
    - ... (add more)

### Program Architecture
1. Reproduction can be sexual or asexual
1. Cells can have multiple "types", not necessarily be of a single type
2. The behaviour of a *type of cell* should be programmed, and the types should not interfere with one another
3. Types of Cells should not be hardcoded, instead, cells inherit the characteristics of their parents
3. Random mutations may occur, or that can be given as a parameter for the viewer to play around with
4. Camera speed (going in or out) should be available as a parameter
4. Simulation speed should be available as a parameter


### Music
The aim is to generate music randomly and programmatically, and that the entire simulation be synced with the beats of the generated music.  
That means that any major changes or events happening on the canvas should always take place on a beat, and ideally, with every beat, or every 4th beat, some small events should occur, and with every 16th beat (a measure), a major event should occur.  
 
