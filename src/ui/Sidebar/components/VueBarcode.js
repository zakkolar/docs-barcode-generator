/*

https://github.com/lindell/vue-barcode

MIT License

Copyright (c) 2017 Johan Lindell

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

var JsBarcode = require('jsbarcode');

var VueBarcode = {
    render: function (createElement) {
        this.canvas = createElement('canvas', {
            style: { display: this.valid ? undefined : 'none' },
            'class': ['vue-barcode-element']
        });



        return createElement('div', [
            this.canvas,
            createElement('div', {
                style: { display: this.valid ? 'none' : undefined }
            }, this.$slots.default),
        ]);
    },
    props: {
        value: [String, Number],
        format: [String],
        width: [String, Number],
        height: [String, Number],
        text: [String, Number],
        fontOptions : [String],
        font: [String],
        textAlign: [String],
        textPosition: [String],
        textMargin: [String, Number],
        fontSize: [String, Number],
        background: [String],
        lineColor: [String],
        margin: [String, Number],
        marginTop: [String, Number],
        marginBottom: [String, Number],
        marginLeft: [String, Number],
        marginRight: [String, Number],
        displayValue: {
            type:  [String, Boolean],
            default: true
        },

    },
    mounted: function(){
        this.$watch('$props', render, { deep: true, immediate: true });
        render.call(this);
    },
    data: function(){
        return {
            valid: true,
            canvas: null,
        };
    }
};

function render(){
    var that = this;

    var settings = {
        format: this.format,
        height: this.height,
        width: this.width,
        text: this.text,
        fontOptions: this.fontOptions,
        font: this.font,
        textAlign: this.textAlign,
        textPosition: this.textPosition,
        textMargin: this.textMargin,
        fontSize: this.fontSize,
        background: this.background,
        lineColor: this.lineColor,
        margin: this.margin,
        marginTop: this.marginTop,
        marginBottom: this.marginBottom,
        marginLeft: this.marginLeft,
        marginRight: this.marginRight,
        valid: function (valid) {
            that.valid = valid;
        },
        displayValue: this.displayValue,

    };

    removeUndefinedProps(settings);

    JsBarcode(this.$el.querySelector('.vue-barcode-element'), String(this.value), settings);

    this.$emit('barcodeDataUrlChanged',this.canvas.elm.toDataURL("image/png"));
}

function removeUndefinedProps(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && obj[prop] === undefined) {
            delete obj[prop];
        }
    }
}

module.exports = VueBarcode;
