/* eslint-disable */
var doc = app.activeDocument;
var docPath = doc.path + '/';
var docArtboards = doc.artboards;

main();


function main() {
  progressBar = new ProgressBar({name: 'Export Fallbacks', steps: 4});
  progressBar.setTitle('Generating Fallbacks...');

  var mobileArtboardIdx = getSmallestArtboardIdx()

  progressBar.step(); 
  generateFallbackForArtboard(mobileArtboardIdx, progressBar)
  
  doc.saved = true;

  if (progressBar) {
    progressBar.close();
  }

  alert('Finished generating fallbacks!')
}

function getArtboardWidth(artboard) {
  var rectBounds = artboard.artboardRect;
  return Math.round(rectBounds[2] - rectBounds[0]);
}

function getSmallestArtboardIdx() {
  var smallestArtboardIdx = null;
  var smallestArtboardWidth = null;
  for (var i = 0; i < docArtboards.length; i++) {
    doc.artboards.setActiveArtboardIndex(i);
    var artboardWidth = getArtboardWidth(docArtboards[i])

    if(!smallestArtboardWidth || smallestArtboardWidth > artboardWidth){
      smallestArtboardIdx = i
      smallestArtboardWidth = artboardWidth
    }
  }

  return smallestArtboardIdx;
}

function generateFallbackForArtboard(idx, prog, nameModifier){
  doc.artboards.setActiveArtboardIndex(idx);
  var saveOptions = new IllustratorSaveOptions();

  prog.step();
  if(!nameModifier){
    nameModifier = "";
  }

  var newFile = new File(docPath + "ai2html-output/fallback"+(nameModifier).toString());
  saveOptions.saveMultipleArtboards = true;
  saveOptions.artboardRange = (idx+1).toString();

  prog.step();
  var exportOptions = new ExportOptionsPNG24();
    exportOptions.artBoardClipping = true;
    exportOptions.transparency = false;
  var type = ExportType.PNG24;

  prog.step();
  doc.exportFile(newFile, type, exportOptions);
}

function ProgressBar(opts) {
  opts = opts || {};
  var steps = opts.steps || 0;
  var step = 0;
  var win = new Window("palette", opts.name || "Progress", [150, 150, 600, 260]);
  win.pnl = win.add("panel", [10, 10, 440, 100], "Progress");
  win.pnl.progBar      = win.pnl.add("progressbar", [20, 35, 410, 60], 0, 100);
  win.pnl.progBarLabel = win.pnl.add("statictext", [20, 20, 320, 35], "0%");
  win.show();

  function update() {
    win.update();
  }

  this.step = function() {
    step = Math.min(step + 1, steps);
    this.setProgress(step / steps);
  };

  this.setProgress = function(progress) {
    var max = win.pnl.progBar.maxvalue;
    // progress is always 0.0 to 1.0
    var pct = progress * max;
    win.pnl.progBar.value = pct;
    win.pnl.progBarLabel.text = Math.round(pct) + "%";
    update();
  };

  this.setTitle = function(title) {
    win.pnl.text = title;
    update();
  };

  this.close = function() {
    win.close();
  };
}