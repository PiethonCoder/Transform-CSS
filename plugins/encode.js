var quot = "'"


function Encrypt(code,fullenc) {
    if (fullenc) {
        return EncryptAll(code)
    } else {
        return EncryptBasic(code)
    }
}

function EncryptBasic(code) {
    var NewCode = escape(code)
    NewCode = '<' + 'script language=javascript>document.write(unescape(' + quot +
        NewCode + quot + '))<' + '/script>\n'
    return NewCode
}

function EncryptAll(code) {
    NewCode = ""
    var OldCode = code
    for (var i = 0; i < OldCode.length; i++) {
        NewCode = NewCode + Hex(OldCode.charCodeAt(i))
    }
    NewCode = '<' + 'script language=javascript>document.write(unescape(' + quot +
        NewCode + quot + '))<' + '/script>\n'
    return NewCode
    //--adds linebreak after encoded block.
    // the added linebreaks prevent preview in interim decoding, 
    //  but will view in final decoding 
}

function Decrypt(code) {
    var NewCode = unescape(code)
    NewCode = NewCode.replace("<script language=javascript>document.write(unescape('", "")
    NewCode = NewCode.replace("'))<" + "/script>", "")
    return NewCode
}

function Hex(dec) {
    var hexbase = "0123456789ABCDEF"
    hx_hi = dec / 16;
    hx_lo = dec % 16;
    hx = hexbase.substr(hx_hi, 1) + hexbase.substr(hx_lo, 1)
    hexval = '%' + hx
    return hexval;
}



