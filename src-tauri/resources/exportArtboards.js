var doc = app.activeDocument;
var docPath = doc.path + '/';
var docArtboards = doc.artboards;

for (var i = 0; i < docArtboards.length; i++) {
	doc.artboards.setActiveArtboardIndex(i);
	var saveOptions = new IllustratorSaveOptions();

	var rectBounds = docArtboards[i].artboardRect;
	var width = Math.round(rectBounds[2] - rectBounds[0]);
	var nameModifier = docArtboards[i].name;

	if (width < 400){
		nameModifier = "mobile";
	}
	var newFile = new File(docPath + "ai2html-output/fallback_"+(nameModifier).toString());
	saveOptions.saveMultipleArtboards = true;
	saveOptions.artboardRange = (i+1).toString();
	// doc.saveAs(newFile, saveOptions);

	var exportOptions = new ExportOptionsPNG24();
    exportOptions.artBoardClipping = true;
    exportOptions.transparency = false;
	var type = ExportType.PNG24;

	doc.exportFile(newFile, type, exportOptions);
}
