var first;
var current_pose;

var dictionary_exercise;
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
    current_pose = pose;
    if(first){
        first = current_pose;
        console.log("Start flexing");
        return;
    }
    else{
        var threshold = current_pose;
        for (var i=0; i<len(threshold["keypoints"]); i++){
            var change_x = threshold["keypoints"][i]["position"]["x"]-first["keypoints"][i]["position"]["x"];
            var change_y = threshold["keypoints"][i]["position"]["y"]-first["keypoints"][i]["position"]["y"];
            threshold["keypoints"][i]["position"]["x"]=((Math.sign(change_x))*change_x*100)/first["keypoints"][i]["position"]["x"];
            threshold["keypoints"][i]["position"]["y"]=((Math.sign(change_y))*change_y*100)/first["keypoints"][i]["position"]["y"];
        }

        var len_parameter = len(exercise["keypoints"]);
        var count = 0;

        for (var i=0; i<len_parameter; i++){
            var map = exercise[i]
            var current_change_x = threshold["keypoints"][mapper[map]]["position"]["x"];
            var current_change_y = threshold["keypoints"][mapper[map]]["position"]["y"];
            var threshold_change_x = exercise["keypoints"][i]["x"];
            var threshold_change_y = exercise["keypoints"][i]["y"];
            if( current_change_x <= threshold_change_x + 2 && current_change_y <= threshold_change_y + 2 ){
                if (Math.abs(current_change_x - threshold_change_x) <= 2) && (Math.abs(current_change_y - threshold_change_y) <= 2)
                    count++;
            }
            else{
                console.log("You are not doing this right");
            }
        }

        for (var i=0; i<len(exercise["nonKeypoints"]); i++){
            var threshold_change_x = exercise["nonKeypoints"][i]["x"];
            var threshold_change_y = exercise["nonKeypoints"][i]["y"];
            if(threshold_change_x >= 1 || threshold_change_y >= 1){
                console.log("Please Start again or stand still");
                return;
            }
        }

        if(count == len_parameter){
            console.log("Rep done");
            first = current_pose;
            return;
        }

        else{
            console.log("Go the distance");
        }


    }

}
