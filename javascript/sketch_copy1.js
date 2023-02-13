//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded

let breakfast, links;
let theta = 0;
let counterTtheta = 0;

let angleStart;

const sentence = 'EXPLORATION';
// The radius of a circle
let r = 100;

// The width and height of the boxes
let w = 40;
let h = 40;

function setup() {
  createCanvas(500, 500);
  angleStart = TWO_PI*0.75; 

  //no animation / interaction chart
  noLoop();

  fetch("./json/DataRetrieval.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    //breakfast = data.breakfast;
    links = data.content.links;
    console.log(links.length);


    //using no Loop? you can just call your function once the data is loaded
    drawChart();
    loop();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);
  
  drawChart();
  theta+= 0.012;
  counterTtheta -= 0.01;
  /* stroke(255);
  text (theta, 20, 20, 100, 100); */
  console.log(theta);

  // We must keep track of our position along the curve
  let arclength = 0;

  // For every box
  for (let i = 0; i < sentence.length; i++) {
    textSize(w);
    // Each box is centered so we move half the width
    arclength += w / 2;

    // Angle in radians is the arclength divided by the radius
    let theta = arclength / r;

    push();
    translate(width / 2, height / 2);
    // Polar to cartesian coordinate conversion
    translate(r * cos(theta), r * sin(theta));

    // Rotate the box
    rotate(theta+counterTtheta);

    // Display the box
    fill(0, 100);

    rectMode(CENTER);
    textAlign(CENTER);
    //rect(0, 0, w, h);
    text(sentence.charAt(i), w, h);
    pop();

    // Move halfway again
    arclength += w / 2;
  }
}

function drawChart(){

  let total = 0; 
  for (let i= 0 ; i<links.length; i++) {
    total += links[i].images.length;
  }
  console.log(total);

  let centreX = width/2;
  let centreY = height/2; 
  let diam = width/8;
  angleStart = TWO_PI*0.75+theta; 

  for (let i=0; i<links.length; i++) {

    let item = links[i];

    let itemFraction = item.images.length/total;
    let itemAngle = itemFraction * TWO_PI; 
    let angleEnd = angleStart + itemAngle;

    //normal pie
    // fill(item.color);
/*     fill(random(255), 0, 130);
    stroke(0, 0, 0); 
    strokeWeight(1); 
    strokeJoin(ROUND); 
    arc(centreX, centreY, diam, diam, angleStart, angleEnd, PIE); //PIE creates closed slices the the center
 */

    noStroke();

    fill(0, random(255));
    push();
    translate(centreX, centreY); 
    rotate(angleEnd+theta); 
    textAlign(LEFT, BOTTOM); 
    textSize(width/50);
    //normal pie
    text(links[i].text /* + itemAngle */, diam/2/* diam/2 - 20 */, -8); 

    pop();

    //update the angle start before the next iteration
    angleStart += (itemAngle);
  }

}