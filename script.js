const pages = [
  `<h1>Introduction</h1>
    <p>Hello world!</p>
    <hr/>
    <p>Use the scroller to the right</p>
    <p class="indented"> - down to reveal</p> 
    <p class="indented"> - all the way up to go to the next page</p>`,

  `<h1>Richard Couzens</h1>
    <p>Education</p>
    <hr/>
    <p>I'm 28 years old.</p>
    <p>I have the usual GCSE's (including maths and English)</p>
    <p>and A-levels in: </p>
    <ul>
        <li>Psychology</li>
        <li>Economics</li>
        <li>Biology</li>
        <li>Geography</li>
    </ul>`,

  `<h1>Richard Couzens</h1>
   <p>Work</p>
   <hr/>
    <p>I've worked as:</p>
    <ul>
        <li>Gardener</li>
        <li>Tree Surgeon</li>
        <li>Delivery Driver</li>
        <li>and in retail</li>
    </ul>
    <p>But I became a little bored and a little stuck, and wanted a challenge.</p>`,

  `<h1>Richard Couzens</h1>
    <p>Computer Science</p>
    <hr/>
    <p>I've always loved puzzles and was drawn to programming by the endless possibilities that can be made from it.</p>
    <p>Where before I felt stuck, programming was vast and scary, but mainly exciting.</p>
    <p>I used open source online materials:</p>
    <ul>
        <li>Open Source Society University (computer science)</li>
        <li>Full Stack Open (react and restful API's)</li>
    </ul>`,

  `<h1>Richard Couzens</h1>
    <p>Why Founders and Coders?</p>
    <hr/>
    <p>Self-teaching is inherently an isolated experience.
    But in reality, everything is built through collaboration, and that's primarily why I would love to be a part of Founders and Coders.</p>
    <p>I want to work with other people, collaborate and learn.</p>
    <p>The connections to companies through apprenticeships would also be invaluable.</p>`,

  `<h1>Richard Couzens</h1>
    <p>Conclusion</p>
    <hr/>
    <p>I am highly motivated</p>
    <p>I have the prerequisite skills</p>
    <p>I want to code with others</p>
    <p>Thank you for your consideration :)</p>
    <p>richardcouzens96@gmail.com</p>`,
];

const scrollBox = document.querySelector('.scroll-box');
const initalAdjutment = 225;
scrollBox.style.transform = `translateY(${initalAdjutment}px)`;
const scrollBoxEnd = 450;
const scrollBoxStart = 0;

const textArea = document.querySelector('.text-area');

let pageCount = 0;
const pageTotal = 5;
let canTurnPageBackwards = true;
let canTurnPageForwards = true;

let isDragging = false;
let startY;
let boxX = 0,
  boxY = initalAdjutment;

const pageTurnBackwards = () => {
  if (!canTurnPageBackwards) return;
  if (pageCount === 0) {
    console.log('page count trying to be negative');
    canTurnPageBackwards = false;
    textArea.classList.add('wiggle');
    setTimeout(() => {
      textArea.classList.remove('wiggle');
    }, 250);
    return;
  }
  pageCount--;
  scrollBox.textContent = `${pageCount}/${pageTotal}`;
  textArea.innerHTML = pages[pageCount];
  canTurnPageBackwards = false;
};

const pageTurnForwards = () => {
  if (!canTurnPageForwards) return;
  if (pageCount >= pageTotal) {
    console.log(`page count trying to go above ${pageTotal}`);
    canTurnPageForwards = false;
    textArea.classList.add('wiggle');
    setTimeout(() => {
      textArea.classList.remove('wiggle');
    }, 250);
    return;
  }
  pageCount++;
  scrollBox.textContent = `${pageCount}/${pageTotal}`;
  textArea.innerHTML = pages[pageCount];
  canTurnPageForwards = false;
};

// Handle mouse and touch move
const handleMove = (clientY) => {
  if (!isDragging) return;
  boxY = clientY - startY;
  if (boxY < 0) {
    boxY = 0;
    pageTurnBackwards();
  }
  if (boxY > 1) {
    canTurnPageBackwards = true;
  }
  if (boxY >= scrollBoxEnd) {
    boxY = scrollBoxEnd;
    pageTurnForwards();
  }
  if (boxY < scrollBoxEnd) {
    canTurnPageForwards = true;
  }
  scrollBox.style.transform = `translate(${boxX}px, ${boxY}px)`;
};

// Handle mouse and touch drag
const startDrag = (clientY) => {
  isDragging = true;
  startY = clientY - boxY;
  scrollBox.style.cursor = 'grabbing';
};

// Mouse events
scrollBox.addEventListener('mousedown', (e) => {
  startDrag(e.clientY);
});
document.addEventListener('mousemove', (e) => {
  handleMove(e.clientY);
});
document.addEventListener('mouseup', () => {
  isDragging = false;
  scrollBox.style.cursor = 'grab';
});

// Touch events
scrollBox.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  startDrag(touch.clientY);
  // Prevent default to stop scrolling while dragging
  e.preventDefault();
});
document.addEventListener(
  'touchmove',
  (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientY);
    e.preventDefault();
  },
  { passive: false }
);

document.addEventListener('touchend', () => {
  isDragging = false;
});
