desc:hardclip

// Sliders
slider1:0<0,6,0.1>Input Gain (dB)
slider2:0<-12,0,0.1>Clip Threshold (dB)
slider3:0<-12,12,0.1>Output Trim (dB)

// Initialization
@init
two = 2;

// Slider updates
@slider
pregain = 10^(slider1/20);
threshold = 10^(slider2/20);
outgain = 10^(slider3/20);

// Audio processing
@sample
spl0 *= pregain;
spl1 *= pregain;

// Hard clip
spl0 = min(max(spl0, -threshold), threshold);
spl1 = min(max(spl1, -threshold), threshold);

// Output gain
spl0 *= outgain;
spl1 *= outgain;
