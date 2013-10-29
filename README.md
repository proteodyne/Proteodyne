Proteodyne
==========

Proteodyne is a proteody generator based on Joël Sternheimer patent : ["Method for the epigenetic regulation of protein biosynthesis by scale resonance"](http://www.google.com/patents/EP0648275B1?cl=en&hl=en).

Use a protein amino acid sequence in UniProt FASTA format to generate stimulation and inhibition scores.

This software is provided "as is", without any warranty. You can use, modify and redistribute the code freely.
Please use Proteodyne with caution and wisdom. It can be health damaging if poorly used.


User guide
----------

To run Proteodyne you only need a recent version of Google Chrome or Firefox web browser.
Open index.html file in your browser and you're done.
Google Chrome needs to be started with --allow-file-access-from-files option.
On Mac OSX use the provided launch_chrome_osx.sh to start Proteodyne on Google Chrome.

Note that if you need to modify the rythmic pattern of the resulting score, the period should match the exact numbers of elements in the pattern.

If you want to make changes on the score, use the Advanced tab option, and refer to [VexTab tutorial](http://www.vexflow.com/vextab/tutorial.html).
You can also download the MIDI file and use an external software.

Generating animated GIF of a big protein can freeze your browser if your computer is not powerful enough.


Developer guide
---------------

Sorry for the poor quality of the source. At the begining it was a quick'n'dirty test to see if it was doable in Javascript then became a software written in this horrible language in an horrible manner. A complete rewrite with backbone is planned.

Note that I modified some externals libraries (Vextab, jsmidgen, ...) and didn't push the changes.


Screenshot
----------

![Proteodyne screenshot](/screenshot.png "Proteodyne screenshot")