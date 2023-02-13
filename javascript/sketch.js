//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded
let dataset;
let images = [];
let positions = [];
let cols, rows;
let wImg, hImg;
let sum;

let breakfast, links;
let theta = 0;
let counterTheta = 0;

let angleStart;

let indexVisible = 0;

const sentence = 'EXPLORATION';
// The radius of a circle
let r = 100;

// The width and height of the boxes
let w = 40;
let h = 40;

let a;

function preload(){
  fetch("./json/DataRetrieval.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    //breakfast = data.breakfast;
    links = data.content.links;
    console.log(links.length);

    for (let i = 0; i < links.length; i++) {
      let currentImgSet = [];
      let currentPosSet = [];
      for (let j = 0; j < links[i].images.length; j++) {
        if(links[i].images[j].indexOf("https:/w/extensions/") === -1){
          let temp = loadImage(links[i].images[j]);
          let currPos = createVector(random(1000), random(600));
          currentImgSet.push(temp);
          currentPosSet.push(currPos);
        }
      }
      images.push(currentImgSet);
      positions.push(currentPosSet);
    }

    sum = 0;
    for (let i = 0; i < links.length; i++) {
      //console.log(links[i].text, images[i].length);
      sum+=images[i].length;
    } 
    wImg = hImg = 10;


    //using no Loop? you can just call your function once the data is loaded
    
    loop();
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function setup() {
  createCanvas(1000, 600);
  angleStart = TWO_PI*0.75; 

  //no animation / interaction chart
  noLoop();

  
}

function draw() {
  background(20);
  if (frameCount % 60 == 0 ){
    indexVisible = (indexVisible+1) % images.length;
    console.log(indexVisible);
  }

  
  for (let i = 0; i < images.length; i++) {
    for(let j = 0; j < images[i].length; j++){
      //image(images[i][j],random(width), random(height), wImg, hImg);
      tint(255, 50);
     
      if(i === indexVisible){
        a = 255;
      }else {
        a = 20;
      }

      tint(255, a);
      image(images[i][j], positions[i][j].x, positions[i][j].y, wImg, hImg);
    }

  }
  
  drawChart();
  theta+= 0.012;
  counterTheta -= 0.01;

  //console.log(theta);

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
    rotate(theta+counterTheta);

    // Display the box
    fill(0, 100);

    rectMode(CENTER);
    textAlign(CENTER);
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

  let centreX = width/2;
  let centreY = height/2; 
  let diam = width/8;
  angleStart = TWO_PI*0.75+theta; 

  for (let i=0; i<links.length; i++) {

    let item = links[i];

    let itemFraction = item.images.length/total;
    let itemAngle = itemFraction * TWO_PI; 
    let angleEnd = angleStart + itemAngle;

    noStroke();
    
    push();
    translate(centreX, centreY); 
    rotate(angleEnd+theta); 
    textAlign(LEFT, BOTTOM); 
    textSize(width/50);
    //normal pie
    if(i === indexVisible){
      a = 255;
    }else {
      a = random(20);
    }
    fill(100, a);
    text(links[i].text , diam/2, -8); 

    pop();

    //update the angle start before the next iteration
    angleStart += (itemAngle);
  }

}