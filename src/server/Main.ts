/**
 * Test function
 */
function showSidebar(){
    const html = HtmlService.createHtmlOutputFromFile("ui/Sidebar")
        .setTitle('Barcode Generator')
        .setWidth(300)
    DocumentApp.getUi().showSidebar(html);

}

// @ts-ignore
global.showSidebar = showSidebar;


function onOpen(){
    DocumentApp.getUi().createMenu("Barcode generator")
        .addItem("Start", "showSidebar")
        .addToUi();
}
// @ts-ignore
global.onOpen = onOpen;


function insertBarcode(url, text){
   insertImage(url, text);
}
//@ts-ignore
global.insertBarcode = insertBarcode;

function getBlobFromString(img) {
    img = img.replace("data:image/png;base64,", "");
    var decoded = Utilities.base64Decode(img);
    //@ts-ignore
    var blob = Utilities.newBlob(decoded, MimeType.PNG);
    return blob;
}

function insertImage(img, text) {
    var blob = getBlobFromString(img);
    var cursor = DocumentApp.getActiveDocument().getCursor();
    var image;
    if (cursor) {
        // @ts-ignore
        image = cursor.insertInlineImage(blob);
    }
    else {
        // @ts-ignore
        image = DocumentApp.getActiveDocument().getBody().appendImage(blob);
    }

    const newHeight = image.getHeight() * 0.8;
    const newWidth = image.getWidth() * 0.8;

    image.setHeight(newHeight);
    image.setWidth(newWidth);

    image.setAltDescription(text);
}
