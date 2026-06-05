desc:utility

// Sliders
slider1:0<-60,12,0.1>Input Trim (dB)
slider2:0<-60,12,0.1>Output Trim (dB)
slider3:0<0,1,1{Normal,Flip}>Phase
slider4:0<0,1,1{Stereo,Mono}>Mono Sum

@init
// DC blocker coefficient (simple high-pass)
dc_coeff = 0.995;
dcL = dcR = 0;

@slider
in_gain  = 10^(slider1/20);
out_gain = 10^(slider2/20);
phase    = slider3 ? -1 : 1;
mono     = slider4;

@sample
// Apply input trim
spl0 *= in_gain;
spl1 *= in_gain;

// Phase flip
spl0 *= phase;
spl1 *= phase;

// Mono sum if enabled
mono ? (
    m = (spl0 + spl1) * 0.5;
    spl0 = m;
    spl1 = m;
);

// DC blocker (per channel)
dcL = spl0 + dc_coeff * dcL - dc_coeff * spl0_prev;
dcR = spl1 + dc_coeff * dcR - dc_coeff * spl1_prev;

spl0_prev = spl0;
spl1_prev = spl1;

spl0 = dcL;
spl1 = dcR;

// Output trim
spl0 *= out_gain;
spl1 *= out_gain;
