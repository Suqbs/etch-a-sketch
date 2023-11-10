//#region Handling DOM Elements
const container = document.createElement('div');
const gridContainer = document.createElement('div');
const gridScreen = document.createElement('div');
const gridSizeAdjustmentButton = document.createElement('button');

container.classList = 'container';
gridContainer.classList = 'grid-container';
gridScreen.classList = 'grid-screen';
gridSizeAdjustmentButton.classList = 'grid-size-adjusment-button';

gridSizeAdjustmentButton.textContent = 'Enter Grid Size';

gridContainer.appendChild(gridSizeAdjustmentButton);
gridContainer.appendChild(gridScreen);
container.appendChild(gridContainer);
document.body.appendChild(container);
//#endregion

//#region Code and Event Listeners
//Initial value for gridSize
let gridSize = 16;
CreateGrid(gridSize);

gridSizeAdjustmentButton.addEventListener('click',
    () => {
        // will remove grid and assign new value to gridSize
        const columns = document.querySelectorAll('.column');
        columns.forEach(e => e.remove());
        gridSize = parseInt(prompt('Enter a Value (Max: 100)', '16'), 10);

        CreateGrid(gridSize);
    });
//#endregion

//#region Function for Creating Grid
function CreateGrid(gridSize) {
    //Will protect computer against 
    if (gridSize > 100) return 0;

    for (let i = 0; i < gridSize; i++) {
        const column = document.createElement('div');
        column.classList.add('column');
        for (let j = 1; j <= gridSize; j++) {
            const row = document.createElement('div');
            row.classList.add('row');
            row.setAttribute('id', 'row');
            row.style.border = '1px solid black';
            column.appendChild(row);
        }
        gridScreen.appendChild(column);
    }
    // will trace the mouse and blacken the areas.
    const row = Array.from(document.querySelectorAll('.row'));


    // Progressive Darkening Effect
    const darkenSquare = e => {
        let currentBrightness = e.dataset.brightness || 100;
        currentBrightness = parseFloat(currentBrightness) - 10;
        console.log(currentBrightness);

        if (currentBrightness > 0) {
            e.style.filter = `brightness(${currentBrightness}%)`;
            const a = e.style.filter;
            console.log(e.style.filter);
            e.dataset.brightness = currentBrightness;
        }
    };

    row.forEach(e => {
        e.addEventListener('mouseover', () => darkenSquare(e));
    });
}
//#endregion

