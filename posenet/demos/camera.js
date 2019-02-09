/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as posenet from '@tensorflow-models/posenet';
import dat from 'dat.gui';
import Stats from 'stats.js';

import {drawBoundingBox, drawKeypoints, drawSkeleton} from './demo_util';

const videoWidth = 600;
const videoHeight = 500;
const stats = new Stats();

// DETECT CORRECT POSTURE CODE

var first=null;
var current_pose;

var dictionary_exercise={"leftBicepCurl":{
    "keypoints":[
       {
           "position":{
            "y":1.643798828125,
            "x":3.930267333984375
         },
          "part":"leftShoulder",
          "score":0.6475105285644531
       },
       {
          "position":{
             "y":7.259033203125,
             "x":0.528228759765625
          },
          "part":"leftElbow",
          "score":0.9196733236312866
       },
       {
          "position":{
             "y":171.65548706054688,
             "x":23.766448974609375
          },
          "part":"leftWrist",
          "score":0.7181068062782288
       }
    ],
  "nonKeypoints":[
    {
      "position":{
         "y":4.9232940673828125,
         "x":2.3838958740234375
      },
      "part":"nose",
      "score":0.9885231256484985
   },
   {
      "position":{
         "y":3.2984085083007812,
         "x":0.9009552001953125
      },
      "part":"leftEye",
      "score":0.9641891717910767
   },
   {
      "position":{
         "y":6.085788726806641,
         "x":3.1581573486328125
      },
      "part":"rightEye",
      "score":0.42074042558670044
   },
   {
      "position":{
         "y":1.3904228210449219,
         "x":1.564910888671875
      },
      "part":"leftEar",
      "score":0.975070595741272
   },
   {
      "position":{
         "y":0.4381103515625,
         "x":0.69158935546875
      },
      "part":"rightEar",
      "score":0.0389944463968277
   },
      {
         "position":{
            "y":4.306732177734375,
            "x":0.6163330078125
         },
         "part":"rightShoulder",
         "score":0.5469438433647156
      },
      {
         "position":{
            "y":153.63037109375,
            "x":228.32159423828125
         },
         "part":"rightElbow",
         "score":0.25836053490638733
      },
      {
         "position":{
            "y":226.4029083251953,
            "x":300.0487823486328
         },
         "part":"rightWrist",
         "score":0.6676919460296631
      },
      {
         "position":{
            "y":2.00286865234375,
            "x":2.19110107421875
         },
         "part":"leftHip",
         "score":0.720788836479187
      },
      {
         "position":{
            "y":3.127288818359375,
            "x":31.20745849609375
         },
         "part":"rightHip",
         "score":0.740676999092102
      },
      {
         "position":{
            "y":4.687744140625,
            "x":7.0390625
         },
         "part":"leftKnee",
         "score":0.4901758134365082
      },
      {
         "position":{
            "y":5.490081787109375,
            "x":12.263519287109375
         },
         "part":"rightKnee",
         "score":0.5357720255851746
      },
      {
         "position":{
            "y":65.50869750976562,
            "x":274.5025329589844
         },
         "part":"leftAnkle",
         "score":0.20094335079193115
      },
      {
         "position":{
            "y":65.75234985351562,
            "x":275.61224365234375
         },
         "part":"rightAnkle",
         "score":0.2153695523738861
      }
  ],
   "score":0.5911489015116411
},
"squat": {
    "keypoints":[
     {
        "position":{
           "y":67.3824352403505,
           "x":0.20961502565284348
        },
        "part":"nose",
        "score":0.9976366758346558
     },
     {
        "position":{
           "y":70.44173030086999,
           "x":0.08300812550776247
        },
        "part":"leftEye",
        "score":0.9938685894012451
     },
     {
        "position":{
           "y":70.38356098010125,
           "x":0.3358842525648007
        },
        "part":"rightEye",
        "score":0.9921466708183289
     },
     {
        "position":{
           "y":65.80319468403896,
           "x":0.31327815094147854
        },
        "part":"leftEar",
        "score":0.5727534890174866
     },
     {
        "position":{
           "y":65.50867163527165,
           "x":0.6343584441735075
        },
        "part":"rightEar",
        "score":0.8362635374069214
     },
     {
        "position":{
           "y":51.98647985360984,
           "x":1.4282069448524517
        },
        "part":"leftShoulder",
        "score":0.9777547717094421
     },
     {
        "position":{
           "y":51.00035716148814,
           "x":0.1540432468892539
        },
        "part":"rightShoulder",
        "score":0.9231982827186584
     },
     {
        "position":{
           "y":48.201119643966685,
           "x":0.25845667281945095
        },
        "part":"leftElbow",
        "score":0.893851637840271
     },
     {
        "position":{
           "y":51.940029823294964,
           "x":1.3160722626707404
        },
        "part":"rightElbow",
        "score":0.7963579893112183
     },
     {
        "position":{
           "y":58.8990803800219,
           "x":3.0621276538242603
        },
        "part":"leftWrist",
        "score":0.8453335762023926
     },
     {
        "position":{
           "y":60.63550324713919,
           "x":0.6630044236975656
        },
        "part":"rightWrist",
        "score":0.545620322227478
     },
     {
        "position":{
           "y":26.976186638038957,
           "x":1.6616839694184957
        },
        "part":"leftHip",
        "score":0.8066504597663879
     },
     {
        "position":{
           "y":26.824804901615714,
           "x":0.9788568769739339
        },
        "part":"rightHip",
        "score":0.8861343860626221
     },
     {
        "position":{
           "y":3.6289375232743293,
           "x":6.491027870931297
        },
        "part":"leftKnee",
        "score":0.9791066646575928
     },
     {
        "position":{
           "y":3.885076409892267,
           "x":15.870061209650164
        },
        "part":"rightKnee",
        "score":0.961054265499115
     },
  ],
  "nonKeypoints":[
      {
         "position":{
            "y":0.3497318549874139,
            "x":1.1172291684635414
         },
         "part":"leftAnkle",
         "score":0.8044183254241943
      },
      {
         "position":{
            "y":0.025096124602460065,
            "x":0.6624222065597116
         },
         "part":"rightAnkle",
         "score":0.8691182732582092
      }
  ]
}
}

var mapper = {"nose":0,
              "leftEye":1,
              "rightEye":2,
              "leftEar":3,
              "rightEar":4,
              "leftShoulder":5,
              "rightShoulder":6,
              "leftElbow":7,
              "rightElbow":8,
              "leftWrist":9,
              "rightWrist":10,
              "leftHip":11,
              "rightHip":12,
              "leftKnee":13,
              "rightKnee":14,
              "leftAnkle":15,
              "rightAnkle":16
             }

function asliMaal (pose, exercise){
    current_pose = JSON.parse(JSON.stringify(pose));
    if(first==null){
        first = (pose);
        console.log("Start flexing");
        return;
    }
    else{
        var threshold = current_pose;
        for (var i=0; i<threshold["keypoints"].length; i++){
            var change_x = threshold["keypoints"][i]["position"]["x"]-first["keypoints"][i]["position"]["x"];
            var change_y = threshold["keypoints"][i]["position"]["y"]-first["keypoints"][i]["position"]["y"];
            change_x = (change_x < 0) ? change_x * -1 : change_x;

            // threshold["keypoints"][i]["position"]["x"]=(change_x*100)/first["keypoints"][i]["position"]["x"];
            threshold["keypoints"][i]["position"]["x"]=(change_x);


            change_y = (change_y < 0) ? change_y * -1 : change_y;
            // console.log('Math.sign(change_y)',Math.sign(change_y));
            // threshold["keypoints"][i]["position"]["y"]=(change_y*100)/first["keypoints"][i]["position"]["y"];
            threshold["keypoints"][i]["position"]["y"]=(change_y);
            if(threshold["keypoints"][i]["part"]=="leftShoulder"){
                // console.log('first["keypoints"][i]["position"]["x"]: ' + first["keypoints"][i]["position"]["x"]);
                // console.log('first["keypoints"][i]["position"]["y"]: ' + first["keypoints"][i]["position"]["y"]);
                // console.log("change_x " + change_x);
                // console.log("change_y " + change_y);
            }
        }

        var len_parameter = exercise["keypoints"].length;
        var count = 0;

        for (var i=0; i<len_parameter; i++){
            var map = exercise["keypoints"][i]["part"];
            var current_change_x = threshold["keypoints"][mapper[map]]["position"]["x"];
            var current_change_y = threshold["keypoints"][mapper[map]]["position"]["y"];
            var threshold_change_x = exercise["keypoints"][i]["position"]["x"];
            var threshold_change_y = exercise["keypoints"][i]["position"]["y"];
            if(exercise["keypoints"][i]["part"] == "leftShoulder"){
                // console.log(threshold_change_x);
                // console.log(threshold_change_y);
            }
            if( current_change_x <= threshold_change_x + 10 && current_change_y <= threshold_change_y + 10 ){
                if (Math.abs(current_change_y - threshold_change_y) <= 10){
                    count++;
                    console.log(count);
                }
                console.log('ALL GOOD');
                var box=document.getElementById('status')
                box.innerText='OK'
                box.style.backgroundColor='#28a745';
            }
            else{
                console.log("You are not doing this right");
                var box=document.getElementById('status')
                box.innerText='Incorrect form';
                box.style.backgroundColor='#dc3545';
            }
        }

        // for (var i=0; i<exercise["nonKeypoints"].length; i++){
        //     var threshold_change_x = exercise["nonKeypoints"][i]["position"]["x"];
        //     var threshold_change_y = exercise["nonKeypoints"][i]["position"]["y"];
        //     var current_change_x = threshold["keypoints"][mapper[map]]["position"]["x"];
        //     var current_change_y = threshold["keypoints"][mapper[map]]["position"]["y"];
        //     if( current_change_x > threshold_change_x + 10 && current_change_y > threshold_change_y + 10 ){
        //         console.log("Please Restart");
        //
        //         first = null;
        //         return;
        //     }
        // }

        if(count  == len_parameter){
            console.log("Rep done");
            first = current_pose;

            return;
        }

        else{
            // console.log("Go the distance");
        }
    }
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isMobile() {
  return isAndroid() || isiOS();
}

/**
 * Loads a the camera to be used in the demo
 *
 */
async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;

  const mobile = isMobile();
  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: mobile ? undefined : videoWidth,
      height: mobile ? undefined : videoHeight,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo() {
  const video = await setupCamera();
  video.play();

  return video;
}

const guiState = {
  algorithm: 'single-pose',
  input: {
    mobileNetArchitecture: isMobile() ? '0.50' : '0.75',
    outputStride: 16,
    imageScaleFactor: 0.5,
  },
  singlePoseDetection: {
    minPoseConfidence: 0.1,
    minPartConfidence: 0.5,
  },
  multiPoseDetection: {
    maxPoseDetections: 5,
    minPoseConfidence: 0.15,
    minPartConfidence: 0.1,
    nmsRadius: 30.0,
  },
  output: {
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    showBoundingBox: false,
  },
  net: null,
};

/**
 * Sets up dat.gui controller on the top-right of the window
 */
function setupGui(cameras, net) {
  guiState.net = net;

  if (cameras.length > 0) {
    guiState.camera = cameras[0].deviceId;
  }

  const gui = new dat.GUI({width: 300});

  // The single-pose algorithm is faster and simpler but requires only one
  // person to be in the frame or results will be innaccurate. Multi-pose works
  // for more than 1 person
  const algorithmController =
      gui.add(guiState, 'algorithm', ['single-pose', 'multi-pose']);

  // The input parameters have the most effect on accuracy and speed of the
  // network
  let input = gui.addFolder('Input');
  // Architecture: there are a few PoseNet models varying in size and
  // accuracy. 1.01 is the largest, but will be the slowest. 0.50 is the
  // fastest, but least accurate.
  const architectureController = input.add(
      guiState.input, 'mobileNetArchitecture',
      ['1.01', '1.00', '0.75', '0.50']);
  // Output stride:  Internally, this parameter affects the height and width of
  // the layers in the neural network. The lower the value of the output stride
  // the higher the accuracy but slower the speed, the higher the value the
  // faster the speed but lower the accuracy.
  input.add(guiState.input, 'outputStride', [8, 16, 32]);
  // Image scale factor: What to scale the image by before feeding it through
  // the network.
  input.add(guiState.input, 'imageScaleFactor').min(0.2).max(1.0);
  input.open();

  // Pose confidence: the overall confidence in the estimation of a person's
  // pose (i.e. a person detected in a frame)
  // Min part confidence: the confidence that a particular estimated keypoint
  // position is accurate (i.e. the elbow's position)
  let single = gui.addFolder('Single Pose Detection');
  single.add(guiState.singlePoseDetection, 'minPoseConfidence', 0.0, 1.0);
  single.add(guiState.singlePoseDetection, 'minPartConfidence', 0.0, 1.0);

  let multi = gui.addFolder('Multi Pose Detection');
  multi.add(guiState.multiPoseDetection, 'maxPoseDetections')
      .min(1)
      .max(20)
      .step(1);
  multi.add(guiState.multiPoseDetection, 'minPoseConfidence', 0.0, 1.0);
  multi.add(guiState.multiPoseDetection, 'minPartConfidence', 0.0, 1.0);
  // nms Radius: controls the minimum distance between poses that are returned
  // defaults to 20, which is probably fine for most use cases
  multi.add(guiState.multiPoseDetection, 'nmsRadius').min(0.0).max(40.0);
  multi.open();

  let output = gui.addFolder('Output');
  output.add(guiState.output, 'showVideo');
  output.add(guiState.output, 'showSkeleton');
  output.add(guiState.output, 'showPoints');
  output.add(guiState.output, 'showBoundingBox');
  output.open();


  architectureController.onChange(function(architecture) {
    guiState.changeToArchitecture = architecture;
  });

  algorithmController.onChange(function(value) {
    switch (guiState.algorithm) {
      case 'single-pose':
        multi.close();
        single.open();
        break;
      case 'multi-pose':
        single.close();
        multi.open();
        break;
    }
  });
}

/**
 * Sets up a frames per second panel on the top-left of the window
 */
function setupFPS() {
  stats.showPanel(0);  // 0: fps, 1: ms, 2: mb, 3+: custom
  // document.body.appendChild(stats.dom);
}

/**
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
 */
 var ctr=0;
function detectPoseInRealTime(video, net) {
  const canvas = document.getElementById('output');
  const ctx = canvas.getContext('2d');
  // since images are being fed from a webcam
  const flipHorizontal = true;

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  async function poseDetectionFrame() {
    if (guiState.changeToArchitecture) {
      // Important to purge variables and free up GPU memory
      guiState.net.dispose();

      // Load the PoseNet model weights for either the 0.50, 0.75, 1.00, or 1.01
      // version
      guiState.net = await posenet.load(+guiState.changeToArchitecture);

      guiState.changeToArchitecture = null;
    }

    // Begin monitoring code for frames per second
    stats.begin();

    // Scale an image down to a certain factor. Too large of an image will slow
    // down the GPU
    const imageScaleFactor = guiState.input.imageScaleFactor;
    const outputStride = +guiState.input.outputStride;

    let poses = [];
    let minPoseConfidence;
    let minPartConfidence;
    var pose;
    switch (guiState.algorithm) {
      case 'single-pose':
        pose = await guiState.net.estimateSinglePose(
            video, imageScaleFactor, flipHorizontal, outputStride);
        poses.push(pose);

        // console.log(pose);
        minPoseConfidence = +guiState.singlePoseDetection.minPoseConfidence;
        minPartConfidence = +guiState.singlePoseDetection.minPartConfidence;
        break;
      case 'multi-pose':
        poses = await guiState.net.estimateMultiplePoses(
            video, imageScaleFactor, flipHorizontal, outputStride,
            guiState.multiPoseDetection.maxPoseDetections,
            guiState.multiPoseDetection.minPartConfidence,
            guiState.multiPoseDetection.nmsRadius);
        console.log(poses)
        minPoseConfidence = +guiState.multiPoseDetection.minPoseConfidence;
        minPartConfidence = +guiState.multiPoseDetection.minPartConfidence;
        break;
    }

    ctx.clearRect(0, 0, videoWidth, videoHeight);

    if (guiState.output.showVideo) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      ctx.restore();
    }

    // For each pose (i.e. person) detected in an image, loop through the poses
    // and draw the resulting skeleton and keypoints if over certain confidence
    // scores

    poses.forEach(({score, keypoints}) => {
      if (score >= minPoseConfidence) {
        if (guiState.output.showPoints) {
            drawKeypoints(keypoints, minPartConfidence, ctx);
        }
        if (guiState.output.showSkeleton && ctr <= 20) {
            ctr++;
            console.log(ctr);
          drawSkeleton(keypoints, minPartConfidence, ctx,ctr);
        }

        else if (guiState.output.showSkeleton) {
            // console.log(pose);
            asliMaal(pose,dictionary_exercise["leftBicepCurl"]);
          drawSkeleton(keypoints, minPartConfidence, ctx,ctr);
        }
        if (guiState.output.showBoundingBox) {
          drawBoundingBox(keypoints, ctx);
        }
      }
    });
    // End monitoring code for frames per second
    stats.end();

    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
}

/**
 * Kicks off by loading the posenet model, finding and loading
 * available camera devices, and setting off the detectPoseInRealTime function.
 */
export async function bindPage() {
  // Load the PoseNet model weights with architecture 0.75
  const net = await posenet.load(0.75);

  document.getElementById('loading').style.display = 'none';
  document.getElementById('main').style.display = 'block';

  let video;

  try {
    video = await loadVideo();
  } catch (e) {
    let info = document.getElementById('info');
    info.textContent = 'this browser does not support video capture,' +
        'or this device does not have a camera';
    info.style.display = 'block';
    throw e;
  }

  setupGui([], net);
  setupFPS();
  detectPoseInRealTime(video, net);

  document.querySelector('.main').setAttribute('hidden',true);

}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// kick off the demo
bindPage();
