const {Plugin} = require("powercord/entities");

const replaceable = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}";
const replacements = {
    smallcaps: " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ{|}",
    superscript: " !\"#$%&'⁽⁾*⁺,⁻./⁰¹²³⁴⁵⁶⁷⁸⁹:;<⁼>?@ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁνᵂˣʸᶻ[\\]^_`ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ{|}",
    upsidedown: " ¡\"#$%℘,)(*+'-˙/0ƖᄅƐㄣϛ9ㄥ86:;>=<¿@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMXλZ]\\[^‾,ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz}|{",
    fullwidth: "　！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝",
    leet: " !\"#$%&'()*+,-./0123456789:;<=>?@48CD3FG#IJK1MN0PQЯ57UVWXY2[\\]^_`48cd3fg#ijk1mn0pqЯ57uvwxy2{|}",
    thicc: "　!\"#$%&'()*+,-./0123456789:;<=>?@卂乃匚刀乇下厶卄工丁长乚从ん口尸㔿尺丂丅凵リ山乂丫乙[\\]^_`卂乃匚刀乇下厶卄工丁长乚从ん口尸㔿尺丂丅凵リ山乂丫乙{|}",
    varied: ""
};

module.exports = class RoleColorEverywhere extends Plugin {
    startPlugin() {
        for (const category in replacements) {
            powercord.api.commands.registerCommand({
                command: category,
                description: `Makes text ${this.doReplacement(category, category)}`,
                usage: "{c} any text here",
                showTyping: true,
                executor: (args) => ({send: true, result: this.doReplacement(args.join(" "), category)})
            });
        }
    }

    pluginWillUnload() {
        for (const category in replacements) {
            powercord.api.commands.unregisterCommand(category);
        }
    }

    makeVaried(text) {
        text = text.split("");
        for (let c = 0; c < text.length; c++) {
            const character = text[c];
            text[c] = c % 2 === 0 ? character.toUpperCase() : character.toLowerCase();
        }
        return text.join("");
    }

    doReplacement(text, category) {
        if (category === "varied") return this.makeVaried(text);
        const replacementList = replacements[category];
        text = text.split("");
        for (let c = 0; c < text.length; c++) {
            const index = replaceable.indexOf(text[c]);
            if (index < 0) continue; // not a replaceable character
            text[c] = replacementList[index];
        }
        return text.join("");
    }
};
