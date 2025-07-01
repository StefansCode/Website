# Fish Animation Website

This is a simple website that features an animated fish swimming in the background.
The fish can be fed by clicking on the background.
To get a better view, the foreground can be collapsed by clicking the button in the bottom right corner.
It can be viewed at https://stefanscode.github.io/Website.

## Project Structure

```mermaid
flowchart TD;
		
		subgraph Background
    Vector --> Bodypart --> Body;
    Body --> Fish;
    Body --> Food;
    
	BodypartDrawer  --> Draw;
    Draw -.-> Main
		Fish -.-> Main;
		Food -.-> Main;
		Circularwave -.-> Main
		end

		subgraph sg1[Websiteinteraction]
		Collapse;
		end

		Style;
		
		Background ---> Index;
		Style --> Index
		sg1 ---> Index;

click Vector "https://github.com/StefansCode/Website/blob/main/Fishbackground/vector.js"
click Bodypart "https://github.com/StefansCode/Website/blob/main/Fishbackground/bodypart.js"
click BodypartDrawer "https://github.com/StefansCode/Website/blob/main/Fishbackground/BodypartDrawer.js"
click Body "https://github.com/StefansCode/Website/blob/main/Fishbackground/body.js"
click Fish "https://github.com/StefansCode/Website/blob/main/Fishbackground/fish.js"
click Food "https://github.com/StefansCode/Website/blob/main/Fishbackground/food.js"
click Draw "https://github.com/StefansCode/Website/blob/main/Fishbackground/draw.js"
click Circularwave "https://github.com/StefansCode/Website/blob/main/Fishbackground/circularwave.js"
click Main "https://github.com/StefansCode/Website/blob/main/Fishbackground/main.js"

click Collapse "https://github.com/StefansCode/Website/blob/main/collapse.js"

click Style "https://github.com/StefansCode/Website/blob/main/styles.css"

click Index "https://github.com/StefansCode/Website/blob/main/index.html"
```

## Development
The project uses vanilla JavaScript with no external dependencies. Each file has a specific responsibility:
- `vector.js`:      Handles vector calculations
- `bodypart.js`:    Handles individual body parts
- `body.js`:        Controls the fish body structure
- `fish.js`:        Implements fish behavior
- `food.js`:        Implements food behavior
- `circularwave.js`:A wave when tossing food   
- `draw.js`:        Handles rendering
- `main.js`:        Main application logic
-`collaps.js`:      Handles collapsing foreground