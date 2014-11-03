#pragma strict

var demonPowerNames: String[] = ["Hell Flame", "Fiery Soul", "Eternal Damnation", "Generic Demon Power 4", "Generic Demon Power 5", "Generic Demon Power 6", 
	"Generic Demon Power 7", "Generic Demon Power 8", "Generic Demon Power 9", "Generic Demon Power 10"];
	
var demonPowerImgs: Texture2D[];
 
var ability1Names: String[] = ["Upgrade 1", "Upgrade 2", "Upgrade 3", "Upgrade 4", "Upgrade 5"];
var ability1Descs: String[] = ["Blah, Blah, Blah: Upgrade 1 Desc", "Blah, Blah, Blah: Upgrade 2 Desc", "Blah, Blah, Blah: Upgrade 3 Desc", 
"Blah, Blah, Blah: Upgrade 4 Desc", "Blah, Blah, Blah: Upgrade 5 Desc"];

var ability2Names: String[] = ["Upgrade 1", "Upgrade 2", "Upgrade 3", "Upgrade 4", "Upgrade 5"];
var ability2Descs: String[] = ["Blah, Blah, Blah: Upgrade 1 Desc", "Blah, Blah, Blah: Upgrade 2 Desc", "Blah, Blah, Blah: Upgrade 3 Desc", 
"Blah, Blah, Blah: Upgrade 4 Desc", "Blah, Blah, Blah: Upgrade 5 Desc"];

var ability3Names: String[] = ["Upgrade 1", "Upgrade 2", "Upgrade 3", "Upgrade 4", "Upgrade 5"];
var ability3Descs: String[] = ["Blah, Blah, Blah: Upgrade 1 Desc", "Blah, Blah, Blah: Upgrade 2 Desc", "Blah, Blah, Blah: Upgrade 3 Desc", 
"Blah, Blah, Blah: Upgrade 4 Desc", "Blah, Blah, Blah: Upgrade 5 Desc"];

var ability4Names: String[] = ["Upgrade 1", "Upgrade 2", "Upgrade 3", "Upgrade 4", "Upgrade 5"];
var ability4Descs: String[] = ["Blah, Blah, Blah: Upgrade 1 Desc", "Blah, Blah, Blah: Upgrade 2 Desc", "Blah, Blah, Blah: Upgrade 3 Desc", 
"Blah, Blah, Blah: Upgrade 4 Desc", "Blah, Blah, Blah: Upgrade 5 Desc"];

var ability5Names: String[] = ["Upgrade 1", "Upgrade 2", "Upgrade 3", "Upgrade 4", "Upgrade 5"];
var ability5Descs: String[] = ["Blah, Blah, Blah: Upgrade 1 Desc", "Blah, Blah, Blah: Upgrade 2 Desc", "Blah, Blah, Blah: Upgrade 3 Desc", 
"Blah, Blah, Blah: Upgrade 4 Desc", "Blah, Blah, Blah: Upgrade 5 Desc"];

var ability6Names: String[] = ["Upgrade 1", "Upgrade 2", "Upgrade 3", "Upgrade 4", "Upgrade 5"];
var ability6Descs: String[] = ["Blah, Blah, Blah: Upgrade 1 Desc", "Blah, Blah, Blah: Upgrade 2 Desc", "Blah, Blah, Blah: Upgrade 3 Desc", 
"Blah, Blah, Blah: Upgrade 4 Desc", "Blah, Blah, Blah: Upgrade 5 Desc"];

var ability7Names: String[] = ["Upgrade 1", "Upgrade 2", "Upgrade 3", "Upgrade 4", "Upgrade 5"];
var ability7Descs: String[] = ["Blah, Blah, Blah: Upgrade 1 Desc", "Blah, Blah, Blah: Upgrade 2 Desc", "Blah, Blah, Blah: Upgrade 3 Desc", 
"Blah, Blah, Blah: Upgrade 4 Desc", "Blah, Blah, Blah: Upgrade 5 Desc"];

var ability8Names: String[] = ["Upgrade 1", "Upgrade 2", "Upgrade 3", "Upgrade 4", "Upgrade 5"];
var ability8Descs: String[] = ["Blah, Blah, Blah: Upgrade 1 Desc", "Blah, Blah, Blah: Upgrade 2 Desc", "Blah, Blah, Blah: Upgrade 3 Desc", 
"Blah, Blah, Blah: Upgrade 4 Desc", "Blah, Blah, Blah: Upgrade 5 Desc"];

var ability9Names: String[] = ["Upgrade 1", "Upgrade 2", "Upgrade 3", "Upgrade 4", "Upgrade 5"];
var ability9Descs: String[] = ["Blah, Blah, Blah: Upgrade 1 Desc", "Blah, Blah, Blah: Upgrade 2 Desc", "Blah, Blah, Blah: Upgrade 3 Desc", 
"Blah, Blah, Blah: Upgrade 4 Desc", "Blah, Blah, Blah: Upgrade 5 Desc"];

var ability10Names: String[] = ["Upgrade 1", "Upgrade 2", "Upgrade 3", "Upgrade 4", "Upgrade 5"];
var ability10Descs: String[] = ["Blah, Blah, Blah: Upgrade 1 Desc", "Blah, Blah, Blah: Upgrade 2 Desc", "Blah, Blah, Blah: Upgrade 3 Desc", 
"Blah, Blah, Blah: Upgrade 4 Desc", "Blah, Blah, Blah: Upgrade 5 Desc"];