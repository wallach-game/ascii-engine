// Assuming you have a GameObject class representing game objects
// Assuming your classes are in files named "GameObject.js" and "Game.js"
// Assuming your classes are in files named "GameObject.js" and "Game.js"
function loadClass(className) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `${className}.js`; // Assuming classes are in separate files
        script.onload = () => {
            resolve(window[className]); // Access the loaded class through the global window object
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

var loaded = false;

var classList = ["GameObject"];

var userClasses = [
    // "testclass",
    // "testclass2",
];

userClasses.forEach(element => {
    classList.push(element);
});

classList.push("Game");

var classLoadIndex = 0;

startLoading();

function startLoading(){
    console.log("Loading: " + classList[classLoadIndex]);
    if(classLoadIndex == classList.length-1)
    {
        loadClass(classList[classLoadIndex]).then(() => {
            console.log("Loaded: " + classList[classLoadIndex]);
            execution();
        });
        return 0;
    }
    
    loadClass(classList[classLoadIndex]).then(() => {
        console.log("Loaded: " + classList[classLoadIndex]);
        classLoadIndex++;
        startLoading();
        });
}




function execution() {
    Game.gameStart();
}