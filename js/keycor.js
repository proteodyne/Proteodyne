var frequencies = {
A0: 27.5,
A1: 55,
A2: 110,
A3: 220,
A4: 440,
A5: 880,
A6: 1760,
A7: 3520,
A8: 7040,
A9: 14080,
Ab0: 25.956543598746574,
Ab1: 51.91308719749314,
Ab2: 103.82617439498628,
Ab3: 207.65234878997256,
Ab4: 415.3046975799451,
Ab5: 830.6093951598903,
Ab6: 1661.2187903197805,
Ab7: 3322.437580639561,
Ab8: 6644.875161279122,
Ab9: 13289.750322558246,
B0: 30.86770632850775,
B1: 61.7354126570155,
B2: 123.47082531403103,
B3: 246.94165062806206,
B4: 493.8833012561241,
B5: 987.7666025122483,
B6: 1975.533205024496,
B7: 3951.066410048992,
B8: 7902.132820097988,
B9: 15804.265640195976,
Bb0: 29.13523509488062,
Bb1: 58.27047018976124,
Bb2: 116.54094037952248,
Bb3: 233.08188075904496,
Bb4: 466.1637615180899,
Bb5: 932.3275230361799,
Bb6: 1864.6550460723597,
Bb7: 3729.3100921447194,
Bb8: 7458.620184289437,
Bb9: 14917.240368578874,
C0: 16.351597831287414,
C1: 32.70319566257483,
C2: 65.40639132514966,
C3: 130.8127826502993,
C4: 261.6255653005986,
C5: 523.2511306011972,
C6: 1046.5022612023945,
C7: 2093.004522404789,
C8: 4186.009044809578,
C9: 8372.018089619156,
D0: 18.354047994837977,
D1: 36.70809598967594,
D2: 73.41619197935188,
D3: 146.8323839587038,
D4: 293.6647679174076,
D5: 587.3295358348151,
D6: 1174.6590716696303,
D7: 2349.31814333926,
D8: 4698.63628667852,
D9: 9397.272573357044,
Db0: 17.323914436054505,
Db1: 34.64782887210901,
Db2: 69.29565774421802,
Db3: 138.59131548843604,
Db4: 277.1826309768721,
Db5: 554.3652619537442,
Db6: 1108.7305239074883,
Db7: 2217.4610478149766,
Db8: 4434.922095629953,
Db9: 8869.844191259906,
E0: 20.601722307054366,
E1: 41.20344461410875,
E2: 82.4068892282175,
E3: 164.81377845643496,
E4: 329.6275569128699,
E5: 659.2551138257398,
E6: 1318.5102276514797,
E7: 2637.02045530296,
E8: 5274.04091060592,
E9: 10548.081821211836,
Eb0: 19.445436482630058,
Eb1: 38.890872965260115,
Eb2: 77.78174593052023,
Eb3: 155.56349186104046,
Eb4: 311.12698372208087,
Eb5: 622.2539674441618,
Eb6: 1244.5079348883237,
Eb7: 2489.0158697766474,
Eb8: 4978.031739553295,
Eb9: 9956.06347910659,
F0: 21.826764464562746,
F1: 43.653528929125486,
F2: 87.30705785825097,
F3: 174.61411571650194,
F4: 349.2282314330039,
F5: 698.4564628660078,
F6: 1396.9129257320155,
F7: 2793.825851464031,
F8: 5587.651702928062,
F9: 11175.303405856126,
G0: 24.499714748859326,
G1: 48.999429497718666,
G2: 97.99885899543733,
G3: 195.99771799087463,
G4: 391.99543598174927,
G5: 783.9908719634985,
G6: 1567.981743926997,
G7: 3135.9634878539946,
G8: 6271.926975707989,
G9: 12543.853951415975,
Gb0: 23.12465141947715,
Gb1: 46.2493028389543,
Gb2: 92.4986056779086,
Gb3: 184.9972113558172,
Gb4: 369.9944227116344,
Gb5: 739.9888454232688,
Gb6: 1479.9776908465376,
Gb7: 2959.955381693075,
Gb8: 5919.91076338615,
Gb9: 11839.8215267723
};

var notesWeightings = {
krumhansl: { 
major: [
   6.35,    // C
   2.23,    // C#
   3.48,    // D
   2.33,    // D#
   4.38,    // E
   4.09,    // F
   2.52,    // F#
   5.19,    // G
   2.39,    // G#
   3.66,    // A
   2.29,    // A#
   2.88],   // B

minor: [
   6.33,    // C
   2.68,    // C#
   3.52,    // D
   5.38,    // D#
   2.60,    // E
   3.53,    // F
   2.54,    // F#
   4.75,    // G
   3.98,    // G#
   2.69,    // A
   3.34,    // A#
   3.17]   // B
},

// page 85 of Temperley: Music and Probability
kostkaPayne: {
major: [
   0.748,    // C
   0.060,    // C#
   0.488,    // D
   0.082,    // D#
   0.670,    // E
   0.460,    // F
   0.096,    // F#
   0.715,    // G
   0.104,    // G#
   0.366,    // A
   0.057,    // A#
   0.400],   // B

minor: [
   0.712,    // C
   0.084,    // C#
   0.474,    // D
   0.618,    // D#
   0.049,    // E
   0.460,    // F
   0.105,    // F#
   0.747,    // G
   0.404,    // G#
   0.067,    // A
   0.133,    // A#
   0.330],   // B
},

// from Aarden's dissertation, also displayed graphically in
// Huron: Sweet Anticipation
aarden: {
major: [
   17.7661,      // C
    0.145624,    // C#
   14.9265,      // D
    0.160186,    // D#
   19.8049,      // E
   11.3587,      // F
    0.291248,    // F#
   22.062,       // G
    0.145624,    // G#
    8.15494,     // A
    0.232998,    // A#
    4.95122],    // B

minor: [
   18.2648,      // C
    0.737619,    // C#
   14.0499,      // D
   16.8599,      // D#
    0.702494,    // E
   14.4362,      // F
    0.702494,    // F#
   18.6161,      // G
    4.56621,     // G#
    1.93186,     // A
    7.37619,     // A#
    1.75623] // B
},
// from Bellman's CMMR 2005 paper
bellman: {
major: [
   16.80,	// C
    0.86,	// C#
   12.95,	// D
    1.41,	// D#
   13.49,	// E
   11.93,	// F
    1.25,	// F#
   20.28,	// G
    1.80,	// G#
    8.04,	// A
    0.62,	// A#
   10.57 ],	// B

minor: [
   18.16,	// C
    0.69,	// C#
   12.99,	// D
   13.34,	// D#
    1.07,	// E
   11.15,	// F
    1.38,	// F#
   21.07,	// G
    7.49,	// G#
    1.53,	// A
    0.92,	// A#
   10.21 ]	// B
},

// Made up by Craig Sapp (see ICMPC10 paper)
simple: {
major: [
   2.0,    // C
   0.0,    // C#
   1.0,    // D
   0.0,    // D#
   1.0,    // E
   1.0,    // F
   0.0,    // F#
   2.0,    // G
   0.0,    // G#
   1.0,    // A
   0.0,    // A#
   1.0],   // B
minor: [
   2.0,    // C
   0.0,    // C#
   1.0,    // D
   1.0,    // D#
   0.0,    // E
   1.0,    // F
   0.0,    // F#
   2.0,    // G
   1.0,    // G#
   0.0,    // A
   1.0,    // A#
   0.0]   // B
}};

var latinNoteByIndex = function(i) {
	var ln = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
	return ln[i];
}

var getIndexByNote = function(n) {
	var ln = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
	return ln.indexOf(n);
}

var computeKey = function(notes) {
	var statsNotes = _.groupBy(notes, function(e) { return e });
	var sn = [0,0,0,0,0,0,0,0,0,0,0,0]
	_.each(Object.keys(statsNotes), function(el) { sn[getIndexByNote(el.slice(0,-1))] += statsNotes[el].length; });

	var keys = {};
	var fk = [];

	_.each(notesWeightings, function(nw, nwname){
		_.each(nw, function(weights, mode) {
			for (var i=0; i > (0 - weights.length); --i) {
				var w = weights.slice(i, weights.length).concat(weights.slice(0, i));
				if (keys[nwname] == undefined) {
					keys[nwname] = {};
				}
				if (keys[nwname][mode] == undefined) {
					keys[nwname][mode] = [];
				}
				keys[nwname][mode][Math.abs(i)] = getPearsonsCorrelation(sn, w);
			}
		});
		var k = keys[nwname];
		var maj = _.max(k.major);
		var min = _.max(k.minor);
		if (maj > min) {
			fk.push(latinNoteByIndex(k.major.indexOf(maj)) + "  ");
		} else {
			fk.push(latinNoteByIndex(k.minor.indexOf(min)) + " m");
		}
	});

	var statsKey = _.groupBy(fk, function(e) { return e });
	_.each(Object.keys(statsKey), function(el) { statsKey[el] = statsKey[el].length; });
	/*var mk = _.max(statsKey);
	var key = null;
	_.each(Object.keys(statsKey), function(e) { if (statsKey[e] == mk) key = e; });
	console.log(statsKey, mk, key);
	*/
	return statsKey;
}

var getPearsonsCorrelation = function(x, y) 
{
	var shortestArrayLength = 0;
	if(x.length == y.length)
	{
		shortestArrayLength = x.length;
	}
	else if(x.length > y.length)
	{
		shortestArrayLength = y.length;
		console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
	}
	else
	{
		shortestArrayLength = x.length;
		console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
	}
 
	var xy = [];
	var x2 = [];
	var y2 = [];
 
	for(var i=0; i<shortestArrayLength; i++)
	{
		xy.push(x[i] * y[i]);
		x2.push(x[i] * x[i]);
		y2.push(y[i] * y[i]);
	}
 
	var sum_x = 0;
	var sum_y = 0;
	var sum_xy = 0;
	var sum_x2 = 0;
	var sum_y2 = 0;
 
	for(var i=0; i<shortestArrayLength; i++)
	{
		sum_x += x[i];
		sum_y += y[i];
		sum_xy += xy[i];
		sum_x2 += x2[i];
		sum_y2 += y2[i];
	}
 
	var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
	var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
	var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
	var step4 = Math.sqrt(step2 * step3);
	var answer = step1 / step4;
 
	return answer;
}