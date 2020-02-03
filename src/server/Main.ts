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


function insertBarcode(url, text, scale){
   insertImage(url, text, scale);
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

function insertImage(img, text, scale) {
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

    const newHeight = image.getHeight() * scale;
    const newWidth = image.getWidth() * scale;

    image.setHeight(newHeight);
    image.setWidth(newWidth);

    image.setAltDescription(text);
}
