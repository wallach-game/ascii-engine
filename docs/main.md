# Game Development Classes Documentation

This documentation covers several classes used in game development, including [GameObject](#gameobject-class), [Game](#game-class), [LevelEditor](#leveleditor-class), [UserObjects](#userobjects-class), [EditorObject](#editorobject-class), and [Wall](#wall-class).

## GameObject Class

The `GameObject` class represents a basic game object with properties such as position, symbol, and collision behavior.

### Constructor

#### [`constructor(x, y, symbol, collision)`](#constructor)

- `x`: X-coordinate of the game object.
- `y`: Y-coordinate of the game object.
- `symbol`: Symbol representing the game object.
- `collision`: Boolean indicating whether the object can collide with other objects.

### Properties

- `x`: X-coordinate of the game object.
- `y`: Y-coordinate of the game object.
- `symbol`: Symbol representing the game object.
- `collision`: Boolean indicating whether the object can collide with other objects.
- `id`: Unique identifier assigned to the game object.
- `ltInit`: Boolean indicating whether late initialization has been performed.

### Methods

#### [`update()`](#update)

- Placeholder method for updating the game object's state. Override this method to implement custom update logic.

#### [`render()`](#render)

- Renders the game object on the game screen.

## Game Class

The `Game` class manages the game environment, including rendering, updating, and controlling game objects.

### Properties

- `MAX_X`: Maximum X-coordinate of the game screen.
- `MAX_Y`: Maximum Y-coordinate of the game screen.
- `screen`: Reference to the HTML element representing the game window.
- `pixels`: Array representing the game screen pixels.
- `gameObjects`: Array containing all game objects.
- `prevTime`: Previous time recorded for game loop.
- `deltaTime`: Time difference between frames.
- `fpscounter`: Reference to the HTML element displaying the frames per second.
- `levelEditor`: Instance of the `LevelEditor` class for managing level editing.
- `gameObjectIdCounter`: Counter for generating unique IDs for game objects.
- `pause`: Boolean indicating whether the game is paused.
- `selectedId`: ID of the currently selected object.

### Methods

#### [`renderInit()`](#renderinit)

- Initializes the game screen pixels.

#### [`clearScreen()`](#clearscreen)

- Clears the game screen pixels.

#### [`renderSymbol(x, y, symbol)`](#rendersymbol)

- Renders a symbol at the specified coordinates on the game screen.

#### [`updateScreen()`](#updatescreen)

- Updates the game screen with current game state.


#### [`gameLoop()`](#gameloop)

- Main game loop responsible for updating and rendering game objects.

#### [`gameStart()`](#gamestart)

- Starts the game loop and initializes the level editor.

#### [`addGameObject(gameObject)`](#addgameobject)

- Adds a game object to the game environment.

## LevelEditor Class

The `LevelEditor` class provides functionality for editing the game level, including placing objects and displaying mouse coordinates.

### Constructor

#### [`constructor()`](#constructor-1)

- Initializes the level editor.
- Sets up event listeners for key presses.
- Creates a `UserObjects` instance for managing user-defined objects.
- Initializes `mouseCoords` object to track mouse coordinates.
- Initializes `placedObjects` array to store placed objects.

### Properties

- `mouseCoordsElem`: Reference to the HTML element displaying mouse coordinates. [See here](#setmousecoords)
- `mouseCoords`: Object containing the current mouse coordinates.
- `userObjects`: Instance of the `UserObjects` class for managing user-defined objects.
- `placedObjects`: Array to store placed objects.

### Methods

#### [`setMouseCoords(coords)`](#setmousecoords)

- Updates the HTML element displaying mouse coordinates with the given coordinates.

#### [`placeObject(coords)`](#placeobject)

- Places an object at the specified coordinates.

#### [`init()`](#init)

- Initializes the level editor.

### Event Listeners

- Listens for keydown events to place objects.

## UserObjects Class

The `UserObjects` class manages user-defined objects that can be placed in the game level.

### Constructor

#### [`constructor()`](#constructor-2)

- Initializes the `UserObjects` instance.
- Creates an empty array to store user-defined objects.
- Sets up a reference to the HTML element representing the object selector.
- Creates a default object and adds it to the list of user objects.
- Sets the selected object to the default object.

### Properties

- `userObjects`: Array containing user-defined objects.
- `objectSelector`: Reference to the HTML element representing the object selector dropdown.
- `selectedObject`: Currently selected user-defined object.

### Methods

#### [`createNewObject(objSettings)`](#createnewobject)

- Creates a new user-defined object with the specified settings.

## EditorObject Class

The `EditorObject` class represents objects specifically designed for the level editor. It extends the `GameObject` class.

### Constructor

#### [`constructor(x, y, symbol, collision)`](#constructor-3)

- `x`: X-coordinate of the editor object.
- `y`: Y-coordinate of the editor object.
- `symbol`: Symbol representing the editor object.
- `collision`: Boolean indicating whether the editor object can collide with other objects.

### Properties

- Inherits properties from the `GameObject` class.

### Methods

#### [`init()`](#init-1)

- Initializes the editor object.

#### [`lateInit()`](#lateinit)

- Performs late initialization tasks for the editor object.

## Wall Class

The `Wall` class represents a specific type of game object, which is a wall. It extends the `GameObject` class.

### Constructor

#### [`constructor(x, y, symbol, collision)`](#constructor-4)

- `x`: X-coordinate of the wall object.
- `y`: Y-coordinate of the wall object.
- `symbol`: Symbol representing the wall object.
- `collision`: Boolean indicating whether the wall object can collide with other objects.

### Properties

- Inherits properties from the `GameObject` class.
- `health`: Health points of the wall object.

## Example Usage

```javascript
// Create a new game object
const gameObject = new GameObject(10, 5, 'A', true);

// Create a new level editor instance
const levelEditor = new LevelEditor();

// Create a new user objects instance
const userObjects = new UserObjects();

// Create a new editor object
const editorObject = new EditorObject(10, 5, '■', true);

// Create a new wall object
const wall = new Wall(10, 5, '■', true);

// Start the game loop
Game.gameStart();
