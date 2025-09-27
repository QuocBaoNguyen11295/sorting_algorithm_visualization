const arrayContainer = document.getElementById("array");

function generateArray(size = 8) {
    arrayContainer.innerHTML = "";
    for (let i = 0; i < size; i++) {
        let val = Math.floor(Math.random() * 99) + 1;
        const box = document.createElement("div");
        box.classList.add("box");
        box.textContent = val;
        arrayContainer.appendChild(box);
    }
}

async function swapBoxes(box1, box2) {
    const box1Rect = box1.getBoundingClientRect();
    const box2Rect = box2.getBoundingClientRect();

    const distance = box2Rect.left - box1Rect.left;

    box1.style.transform = `translateX(${distance}px)`;
    box2.style.transform = `translateX(${-distance}px)`;

    setTimeout(() => {
        box1.style.transform = "";
        box2.style.transform = "";
        arrayContainer.insertBefore(box2, box1);
    }, 500);
}



async function bubbleSort() {
    const boxes = arrayContainer.children;
    for (let i = 0; i < boxes.length; i++) {
        for (let j = 0; j < boxes.length - i - 1; j++) {
            let box1 = boxes[j];
            let box2 = boxes[j + 1];
            box1.classList.add("active");
            box2.classList.add("active");

            await new Promise((r) => setTimeout(r, 300));

            if (parseInt(box1.textContent) > parseInt(box2.textContent)) {
                await swapBoxes(box1, box2);
            }

            box1.classList.remove("active");
            box2.classList.remove("active");
        }
    }
}

async function insertionSort() {
    const boxes = arrayContainer.children;
    for (let i = 1; i < boxes.length; i++) {
        let j = i;
        while (j > 0 && parseInt(boxes[j - 1].textContent) > parseInt(boxes[j].textContent)) {
            boxes[j - 1].classList.add("active");
            boxes[j].classList.add("active");

            await swapBoxes(boxes[j - 1], boxes[j]);

            boxes[j - 1].classList.remove("active");
            boxes[j].classList.remove("active");
            j--;
        }
    }
}

async function selectionSort() {
    const boxes = arrayContainer.children;
    for (let i = 0; i < boxes.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < boxes.length; j++) {
            boxes[minIndex].classList.add("active");
            boxes[j].classList.add("active");

            await new Promise((r) => setTimeout(r, 200));

            if (parseInt(boxes[j].textContent) < parseInt(boxes[minIndex].textContent)) {
                boxes[minIndex].classList.remove("active");
                minIndex = j;
            }
            boxes[j].classList.remove("active");
        }
        if (minIndex !== i) {
            await swapBoxes(boxes[i], boxes[minIndex]);
        }
        boxes[minIndex].classList.remove("active");
    }
}

async function partition(low, high) {
    const boxes = arrayContainer.children;
    let pivot = parseInt(boxes[high].textContent);
    let i = low - 1;

    for (let j = low; j < high; j++) {
        boxes[j].classList.add("active");
        boxes[high].classList.add("active");

        await new Promise((r) => setTimeout(r, 200));

        if (parseInt(boxes[j].textContent) < pivot) {
            i++;
            await swapBoxes(boxes[i], boxes[j]);
        }

        boxes[j].classList.remove("active");
        boxes[high].classList.remove("active");
    }
    await swapBoxes(boxes[i + 1], boxes[high]);
    return i + 1;
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function interchangeSort() {
    const boxes = arrayContainer.children;
    for (let i = 0; i < boxes.length - 1; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            boxes[i].classList.add("active");
            boxes[j].classList.add("active");
            await new Promise((r) => setTimeout(r, 300));
            if (parseInt(boxes[i].textContent) > parseInt(boxes[j].textContent)) {
                await swapBoxes(boxes[i], boxes[j]);
            }
            boxes[i].classList.remove("active");
            boxes[j].classList.remove("active");
        }
    }
}

async function startSort() {
    const algo = document.getElementById("algorithm").value;
    if (algo === "bubble") {
        await bubbleSort();
    } else if (algo === "insertion") {
        await insertionSort();
    } else if (algo === "selection") {
        await selectionSort();
    } else if (algo === "quick") {
        await quickSort(0, arrayContainer.children.length - 1);
    } else if (algo === "interchange") {
        await interchangeSort();
    } else if (algo === "none") {
        alert("Please select a sorting algorithm.");
    }
}

generateArray();
