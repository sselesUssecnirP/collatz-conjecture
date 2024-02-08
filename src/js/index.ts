let numbers = ``;
let shouldDoLoop = false;
const loopButton = document.getElementById("loop") as HTMLButtonElement;

function runCollatz(num: number, looped: boolean = false) {
    const div = document.getElementById("result") as HTMLDivElement;
    numbers = `${num}`;

    if (isNaN(num)) {
        console.log("Invalid input. Please enter a valid number.");
        return;
    }

    console.log(`Running Collatz Conjecture for number: ${num}`);

    while (num !== 1) {
        if (num % 2 === 0) {
            num /= 2;
            numbers += ` • ½ = ${num}`
        } else {
            num = num * 3 + 1;
            numbers += ` • 3 + 1 = ${num}`
        }
        console.log(num);
    }

    console.log(`Numbers: ${numbers}`);
    div.innerHTML = numbers;
    div.hidden = false;

    if (looped) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(num);
            }, 50);
        })
    }
}

function doLoop() {
    shouldDoLoop = !shouldDoLoop;
    loopButton.innerHTML = shouldDoLoop ? "Stop" : "Loop";
    if (shouldDoLoop) {
        loopCollatz();
    }
}

async function loopCollatz() {
    // Allowed users to pick a number to start from and loop from there.
    // Instead of originally starting at 2.
    let init = parseInt((document.getElementById('numberInput')! as HTMLInputElement).value);
    while (shouldDoLoop) {
        await runCollatz(init++, true)?.then((result) => {
            if (result !== 1) {
                shouldDoLoop = !shouldDoLoop;
                loopButton.innerHTML = shouldDoLoop ? "Stop" : "Loop";
                console.log("Loop stopped.");
                runCollatz(init - 1);
            }
        });
    }
}