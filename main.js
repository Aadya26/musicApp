song = "";
LeftwristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload()
{
    song = loadSound("music.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' ,gotPoses);
}
function modelLoaded()
{
    console.log('poseNet Is Initialized')
}
function draw()
{
image(video, 0, 0, 400, 500);
fill("#FF0000");
stroke("#ff0000");
circle(LeftwristX,leftWristY,20);
if(scoreLeftWrist > 0.2)
{
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
volume = remove_decimals/500;
document.getElementById("volume").innerHTML = "volume = " + volume;
song.setVolume(volume);
}
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(result)
{
    if(result.length > 0)
    {
        console.log(result);
        scoreLeftWrist = result[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist)
        LeftwristX = result[0].pose.leftWrist.x
        leftwristY= result[0].pose.leftWrist.y
        console.log("LeftwristX = " + LeftwristX + "leftWristY = " + leftWristY );
        rightwristY= result[0].pose.rightWrist.y;
        rightWristX= result[0].pose.rightWrist.x;
        console.log("RightwristX = " + rightWristX + "RightWristY = " + rightWristY );

    }
}