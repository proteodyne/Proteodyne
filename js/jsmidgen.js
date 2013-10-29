var Midi = {};

var instrumentsTable = {
      "accordion": 21,
      "acoustic_bass": 32,
      "acoustic_grand_piano": 0,
      "acoustic_guitar_nylon": 24,
      "acoustic_guitar_steel": 25,
      "agogo": 113,
      "alto_sax": 65,
      "applause": 126,
      "bagpipe": 109,
      "banjo": 105,
      "baritone_sax": 67,
      "bassoon": 70,
      "bird_tweet": 123,
      "blown_bottle": 76,
      "brass_section": 61,
      "breath_noise": 121,
      "bright_acoustic_piano": 1,
      "celesta": 8,
      "cello": 42,
      "choir_aahs": 52,
      "church_organ": 19,
      "clarinet": 71,
      "clavinet": 7,
      "contrabass": 43,
      "distortion_guitar": 30,
      "drawbar_organ": 16,
      "dulcimer": 15,
      "electric_bass_finger": 33,
      "electric_bass_pick": 34,
      "electric_grand_piano": 2,
      "electric_guitar_clean": 27,
      "electric_guitar_jazz": 26,
      "electric_guitar_muted": 28,
      "electric_piano_1": 4,
      "electric_piano_2": 5,
      "english_horn": 69,
      "fiddle": 110,
      "flute": 73,
      "french_horn": 60,
      "fretless_bass": 35,
      "fx_1_rain": 96,
      "fx_2_soundtrack": 97,
      "fx_3_crystal": 98,
      "fx_4_atmosphere": 99,
      "fx_5_brightness": 100,
      "fx_6_goblins": 101,
      "fx_7_echoes": 102,
      "fx_8_scifi": 103,
      "glockenspiel": 9,
      "guitar_fret_noise": 120,
      "guitar_harmonics": 31,
      "gunshot": 127,
      "harmonica": 22,
      "harpsichord": 6,
      "helicopter": 125,
      "honkytonk_piano": 3,
      "kalimba": 108,
      "koto": 107,
      "lead_1_square": 80,
      "lead_2_sawtooth": 81,
      "lead_3_calliope": 82,
      "lead_4_chiff": 83,
      "lead_5_charang": 84,
      "lead_6_voice": 85,
      "lead_7_fifths": 86,
      "lead_8_bass__lead": 87,
      "marimba": 12,
      "melodic_tom": 117,
      "music_box": 10,
      "muted_trumpet": 59,
      "oboe": 68,
      "ocarina": 79,
      "orchestra_hit": 55,
      "orchestral_harp": 46,
      "overdriven_guitar": 29,
      "pad_1_new_age": 88,
      "pad_2_warm": 89,
      "pad_3_polysynth": 90,
      "pad_4_choir": 91,
      "pad_5_bowed": 92,
      "pad_6_metallic": 93,
      "pad_7_halo": 94,
      "pad_8_sweep": 95,
      "pan_flute": 75,
      "percussive_organ": 17,
      "piccolo": 72,
      "pizzicato_strings": 45,
      "recorder": 74,
      "reed_organ": 20,
      "reverse_cymbal": 119,
      "rock_organ": 18,
      "seashore": 122,
      "shakuhachi": 77,
      "shamisen": 106,
      "shanai": 111,
      "sitar": 104,
      "slap_bass_1": 36,
      "slap_bass_2": 37,
      "soprano_sax": 64,
      "steel_drums": 114,
      "string_ensemble_1": 48,
      "string_ensemble_2": 49,
      "synth_bass_1": 38,
      "synth_bass_2": 39,
      "synth_brass_1": 62,
      "synth_brass_2": 63,
      "synth_choir": 54,
      "synth_drum": 118,
      "synth_strings_1": 50,
      "synth_strings_2": 51,
      "taiko_drum": 116,
      "tango_accordion": 23,
      "telephone_ring": 124,
      "tenor_sax": 66,
      "timpani": 47,
      "tinkle_bell": 112,
      "tremolo_strings": 44,
      "trombone": 57,
      "trumpet": 56,
      "tuba": 58,
      "tubular_bells": 14,
      "vibraphone": 11,
      "viola": 41,
      "violin": 40,
      "voice_oohs": 53,
      "whistle": 78,
      "woodblock": 115,
      "xylophone": 13
    };

(function(exported) {

	var DEFAULT_VOLUME   = exported.DEFAULT_VOLUME   = 90;
	var DEFAULT_DURATION = exported.DEFAULT_DURATION = 128;
	var DEFAULT_CHANNEL  = exported.DEFAULT_CHANNEL  = 0;

	/* ******************************************************************
	 * Utility functions
	 ****************************************************************** */

	var Util = {

		midi_letter_pitches: { a:21, b:23, c:12, d:14, e:16, f:17, g:19 },

		midiPitchFromNote: function(n) {
			var matches = /([a-g])(#+|b+)?([0-9]+)$/i.exec(n);
			var note = matches[1].toLowerCase(), accidental = matches[2] || '', octave = parseInt(matches[3], 10);
			return (12 * octave) + Util.midi_letter_pitches[note] + (accidental.substr(0,1)=='#'?1:-1) * accidental.length;
		},

		ensureMidiPitch: function(p) {
			if (typeof p == 'number' || !/[^0-9]/.test(p)) {
				// numeric pitch
				return parseInt(p, 10);
			} else {
				// assume it's a note name
				return Util.midiPitchFromNote(p);
			}
		},

/* TODO:
		noteFromMidiPitch: function(n) {
		},
*/

		mpqnFromBpm: function(bpm) {
			var mpqn = Math.floor(60000000 / bpm);
			var ret=[];
			do {
				ret.unshift(mpqn & 0xFF);
				mpqn >>= 8;
			} while (mpqn);
			while (ret.length < 3) {
				ret.push(0);
			}
			return ret;
		},

		bpmFromMpqn: function(mpqn) {
			var m = mpqn;
			if (typeof mpqn[0] != 'undefined') {
				m = 0;
				for (var i=0, l=mpqn.length-1; l >= 0; ++i, --l) {
					m |= mpqn[i] << l;
				}
			}
			return Math.floor(60000000 / mpqn);
		},

		/*
		 * Converts an array of bytes to a string of hexadecimal characters. Prepares
		 * it to be converted into a base64 string.
		 *
		 * @param byteArray {Array} array of bytes that will be converted to a string
		 * @returns hexadecimal string
		 */
		codes2Str: function(byteArray) {
			return String.fromCharCode.apply(null, byteArray);
		},

		/*
		 * Converts a String of hexadecimal values to an array of bytes. It can also
		 * add remaining "0" nibbles in order to have enough bytes in the array as the
		 * |finalBytes| parameter.
		 *
		 * @param str {String} string of hexadecimal values e.g. "097B8A"
		 * @param finalBytes {Integer} Optional. The desired number of bytes that the returned array should contain
		 * @returns array of nibbles.
		 */

		str2Bytes: function (str, finalBytes) {
			if (finalBytes) {
				while ((str.length / 2) < finalBytes) { str = "0" + str; }
			}

			var bytes = [];
			for (var i=str.length-1; i>=0; i = i-2) {
				var chars = i === 0 ? str[i] : str[i-1] + str[i];
				bytes.unshift(parseInt(chars, 16));
			}

			return bytes;
		},

		/**
		 * Translates number of ticks to MIDI timestamp format, returning an array of
		 * bytes with the time values. Midi has a very particular time to express time,
		 * take a good look at the spec before ever touching this function.
		 *
		 * @param ticks {Integer} Number of ticks to be translated
		 * @returns Array of bytes that form the MIDI time value
		 */
		translateTickTime: function(ticks) {
			var buffer = ticks & 0x7F;
		
			while (ticks = ticks >> 7) {
				buffer <<= 8;
				buffer |= ((ticks & 0x7F) | 0x80);
			}
		
			var bList = [];
			while (true) {
				bList.push(buffer & 0xff);
		
				if (buffer & 0x80) { buffer >>= 8; }
				else { break; }
			}
			return bList;
		},

	};

	/* ******************************************************************
	 * Event class
	 ****************************************************************** */

	var MidiEvent = function(params) {
		if (!this) return new MidiEvent(params);
		if (params &&
				(params.type    !== null || params.type    !== undefined) &&
				(params.channel !== null || params.channel !== undefined) &&
				(params.param1  !== null || params.param1  !== undefined)) {
			this.setTime(params.time);
			this.setType(params.type);
			this.setChannel(params.channel);
			this.setParam1(params.param1);
			this.setParam2(params.param2);
		}
	};

	// event codes
	MidiEvent.NOTE_OFF           = 0x80;
	MidiEvent.NOTE_ON            = 0x90;
	MidiEvent.AFTER_TOUCH        = 0xA0;
	MidiEvent.CONTROLLER         = 0xB0;
	MidiEvent.PROGRAM_CHANGE     = 0xC0;
	MidiEvent.CHANNEL_AFTERTOUCH = 0xD0;
	MidiEvent.PITCH_BEND         = 0xE0;


	MidiEvent.prototype.setTime = function(ticks) {
		this.time = Util.translateTickTime(ticks || 0);
	};

	MidiEvent.prototype.setType = function(type) {
		if (type < MidiEvent.NOTE_OFF || type > MidiEvent.PITCH_BEND) {
			throw new Error("Trying to set an unknown event: " + type);
		}

		this.type = type;
	};

	MidiEvent.prototype.setChannel = function(channel) {
		if (channel < 0 || channel > 15) {
			throw new Error("Channel is out of bounds.");
		}

		this.channel = channel;
	};

	MidiEvent.prototype.setParam1 = function(p) {
		this.param1 = p;
	};

	MidiEvent.prototype.setParam2 = function(p) {
		this.param2 = p;
	};

	MidiEvent.prototype.toBytes = function() {
		var byteArray = [];

		var typeChannelByte = this.type | (this.channel & 0xF);

		byteArray.push.apply(byteArray, this.time);
		byteArray.push(typeChannelByte);
		byteArray.push(this.param1);

		// Some events don't have a second parameter
		if (this.param2 !== undefined && this.param2 !== null) {
			byteArray.push(this.param2);
		}
		return byteArray;
	};

	/* ******************************************************************
	 * MetaEvent class
	 ****************************************************************** */

	var MetaEvent = function(params) {
		if (!this) return new MetaEvent(params);
		var p = params || {};
		this.setTime(params.time);
		this.setType(params.type);
		this.setData(params.data);
	};

	MetaEvent.SEQUENCE   = 0x00;
	MetaEvent.TEXT       = 0x01;
	MetaEvent.COPYRIGHT  = 0x02;
	MetaEvent.TRACK_NAME = 0x03;
	MetaEvent.INSTRUMENT = 0x04;
	MetaEvent.LYRIC      = 0x05;
	MetaEvent.MARKER     = 0x06;
	MetaEvent.CUE_POINT  = 0x07;
	MetaEvent.CHANNEL_PREFIX = 0x20;
	MetaEvent.END_OF_TRACK   = 0x2f;
	MetaEvent.TEMPO      = 0x51;
	MetaEvent.SMPTE      = 0x54;
	MetaEvent.TIME_SIG   = 0x58;
	MetaEvent.KEY_SIG    = 0x59;
	MetaEvent.SEQ_EVENT  = 0x7f;

	MetaEvent.prototype.setTime = function(ticks) {
		this.time = Util.translateTickTime(ticks || 0);
	};

	MetaEvent.prototype.setType = function(t) {
		this.type = t;
	};

	MetaEvent.prototype.setData = function(d) {
		this.data = d;
	};

	MetaEvent.prototype.toBytes = function() {
		if (!this.type || !this.data || !this.time) {
			throw new Error("Type or data for meta-event not specified.");
		}

		var byteArray = [];
		byteArray.push.apply(byteArray, this.time);
		byteArray.push(0xFF, this.type);

		// If data is an array, we assume that it contains several bytes. We
		// apend them to byteArray.
		if (Array.isArray(this.data)) {
			byteArray.push(this.data.length);
			byteArray.push.apply(byteArray, this.data);
		} else if (this.data !== null && this.data !== undefined) {
			byteArray.push(1, this.data);
		}

		return byteArray;
	};

	/* ******************************************************************
	 * Track class
	 ****************************************************************** */

	var Track = function(config) {
		if (!this) return new Track(config);
		var c = config || {};
		this.events = c.events || [];
	};

	Track.START_BYTES = [0x4d, 0x54, 0x72, 0x6b];
	Track.END_BYTES   = [0x00, 0xFF, 0x2F, 0x00];

	Track.prototype.addEvent = function(event) {
		this.events.push(event);
	};

	Track.prototype.addNoteOn = Track.prototype.noteOn = function(channel, pitch, time, velocity) {
		this.events.push(new MidiEvent({
			type: MidiEvent.NOTE_ON,
			channel: channel,
			param1: Util.ensureMidiPitch(pitch),
			param2: velocity || DEFAULT_VOLUME,
			time: time || 0,
		}));
		return this;
	};

	Track.prototype.addNoteOff = Track.prototype.noteOff = function(channel, pitch, time, velocity) {
		this.events.push(new MidiEvent({
			type: MidiEvent.NOTE_OFF,
			channel: channel,
			param1: Util.ensureMidiPitch(pitch),
			param2: velocity || DEFAULT_VOLUME,
			time: time || 0,
		}));
		return this;
	};

	Track.prototype.addNote = Track.prototype.note = function(channel, pitch, dur, time) {
		this.noteOn(channel, pitch, time, DEFAULT_VOLUME);
		if (dur) {
			this.noteOff(channel, pitch, dur, DEFAULT_VOLUME);
		}
		return this;
	};

	Track.prototype.setInstrument = Track.prototype.instrument = function(channel, instrument, time) {
		this.events.push(new MidiEvent({
			type: MidiEvent.PROGRAM_CHANGE,
			channel: channel,
			param1: instrument,
			time: time || 0,
		}));
		return this;
	};

	Track.prototype.setTempo = Track.prototype.tempo = function(bpm, time) {
		this.events.push(new MetaEvent({
			type: MetaEvent.TEMPO,
			data: Util.mpqnFromBpm(bpm),
			time: time || 0,
		}));
		return this;
	};

	Track.prototype.setTimeSig = Track.prototype.timeSig = function(nn,dd) {
		var pows = {"1":0,"2":1,"4":2,"8":3,"16":4,"32":5};
		this.events.push(new MetaEvent({
			type: MetaEvent.TIME_SIG,
			data: [Number(nn).toString(16), Number(pows[dd]).toString(16), 0x18, 0x08],
			time: 0,
		}));
		return this;
	}

	Track.prototype.toBytes = function() {
		var trackLength = 0;
		var eventBytes = [];
		var startBytes = Track.START_BYTES;
		var endBytes   = Track.END_BYTES;

		var addEventBytes = function(event) {
			var bytes = event.toBytes();
			trackLength += bytes.length;
			eventBytes.push.apply(eventBytes, bytes);
		};

		this.events.forEach(addEventBytes);

		// Add the end-of-track bytes to the sum of bytes for the track, since
		// they are counted (unlike the start-of-track ones).
		trackLength += endBytes.length;

		// Makes sure that track length will fill up 4 bytes with 0s in case
		// the length is less than that (the usual case).
		var lengthBytes = Util.str2Bytes(trackLength.toString(16), 4);

		return startBytes.concat(lengthBytes, eventBytes, endBytes);
	};

	/* ******************************************************************
	 * File class
	 ****************************************************************** */

	var File = function(config){
		if (!this) return new File(config);
		var c = config || {};
		this.tracks = c.tracks || [];
	};

	File.HDR_CHUNKID     = "MThd";             // File magic cookie
	File.HDR_CHUNK_SIZE  = "\x00\x00\x00\x06"; // Header length for SMF
	File.HDR_TYPE0       = "\x00\x00";         // Midi Type 0 id
	File.HDR_TYPE1       = "\x00\x01";         // Midi Type 1 id
	File.HDR_SPEED       = "\x00\x80";         // Defaults to 128 ticks per beat

	File.prototype.addTrack = function(track) {
		if (track) {
			this.tracks.push(track);
			return this;
		} else {
			track = new Track();
			this.tracks.push(track);
			return track;
		}
	};

	File.prototype.toBytes = function() {
		var trackCount = this.tracks.length.toString(16);

		// prepare the file header
		var bytes = File.HDR_CHUNKID + File.HDR_CHUNK_SIZE + File.HDR_TYPE0;

		// add the number of tracks (2 bytes)
		bytes += Util.codes2Str(Util.str2Bytes(trackCount, 2));
		// add the number of ticks per beat (currently hardcoded)
		bytes += File.HDR_SPEED;

		// iterate over the tracks, converting to bytes too
		this.tracks.forEach(function(track) {
			bytes += Util.codes2Str(track.toBytes());
		});

		return bytes;
	};

	/* ******************************************************************
	 * Exports
	 ****************************************************************** */

	exported.Util = Util;
	exported.File = File;
	exported.Track = Track;
	exported.Event = MidiEvent;
	exported.MetaEvent = MetaEvent;

})( Midi );

if (typeof exports != 'undefined' && exports !== null) {
	exports = Midi;
} else if (typeof module != 'undefined' && module !== null) {
	module.exports = Midi;
} else {
	this.Midi = Midi;
}
