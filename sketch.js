let radius = 60;
let cellWidth = 120;
let cellHeight = 120;
let xOffset = 80;
let yOffset = 65;
let horCircles = [];
let verCircles = [];
let spacing = 8;
let angle = 0;
let curves = [];

function setup() {
    createCanvas(700, 700);
    for (let i = 0; i < 4; i++) {
        let horCircle = [140 + xOffset + i * 2 * (radius + spacing), yOffset];
        let verCircle = [xOffset, 140 + yOffset + i * 2 * (radius + spacing)];
        horCircles[i] = horCircle;
        verCircles[i] = verCircle;
    }

    for (let i = 0; i < 4; i++) {
        curves[i] = [];
        for (let j = 0; j < 4; j++) {
            curves[i][j] = [];
        }
    }
}

function draw() {
    background(0);
    noFill();

    stroke(215, 225, 147);
    for (let i = 0; i < 4; i++) {
        ellipse(horCircles[i][0], horCircles[i][1], 2 * radius);
        ellipse(verCircles[i][0], verCircles[i][1], 2 * radius);
    }

    stroke(0, 220, 110);

    for (let i = 0; i < 4; i++) {
        let cx1 = horCircles[i][0] + radius * cos((i + 1) * (angle - HALF_PI));
        let cy1 = horCircles[i][1] + radius * sin((i + 1) * (angle - HALF_PI));
        drawPoint(cx1, cy1, 10);
        
        for(let j=0;j<4;j++){
        	let cx2 = verCircles[j][0] + radius * cos((j + 1) * (angle - HALF_PI));
        	let cy2 = verCircles[j][1] + radius * sin((j + 1) * (angle - HALF_PI));
            drawPoint(cx2, cy2, 10);
            drawPoint(cx1, cy2, 10);
            
            strokeWeight(1);
            stroke(111);
            line(cx1, cy1, cx1, cy2);
            line(cx2, cy2, cx1, cy2);
            
            curves[i][j].push([cx1, cy2]);
        }
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            showCurve(curves[i][j]);
        }
    }

    angle -= 0.01;

    if (angle < -TWO_PI) {
        angle = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                curves[i][j] = [];
            }
        }
    }
}

function showCurve(cur) {
    stroke(0, 220, 110);
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < cur.length; i++) {
        const v = cur[i];
        vertex(v[0], v[1]);
    }
    endShape();
}

function drawPoint(x, y, weight) {
    stroke(0, 220, 110);
    strokeWeight(weight);
    point(x, y);
    strokeWeight(1);
}
