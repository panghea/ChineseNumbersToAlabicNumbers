function ChnNumConverter() {}

// 半角数値文字に変換
ChnNumConverter.prototype.toNumStr = function toNumStr(obj) {
    var han = '12345678901234567890';
    var zen = '一二三四五六七八九零１２３４５６７８９０';
    var word = obj;
    for (i = 0; i < zen.length; i++) {
        var regex = new RegExp(zen[i], "gm");
        word = word.replace(regex, han[i]);
    }
    return word;
};
// 桁ごとの数を返却
ChnNumConverter.prototype.getFigureNum = function getFigureNum(figure) {
    switch (figure) {
        case "十":
            return 10;
        case "百":
            return 100;
        case "千":
            return 1000;
        case "万":
            return 10000;
        case "億":
            return 100000000;
        case "兆":
            return 1000000000000;
    }
};

// 兆までの漢数字をアラビア数値文字列に変換
ChnNumConverter.prototype.convertToAlabic = function convertToAlabic(nm) {
    var self = this;
    var figure = "十百千万億兆";
    if (!new RegExp("[" + figure + "]").test(nm)) {
        return self.toNumStr(nm);
    }
    // 下の単位から数値へ変換して加算していく
    for (var i = 0; i < figure.length; i++) {
        var r = new RegExp("([一二三四五六七八九零0-9]*)" + figure[i] + "([一二三四五六七八九零0-9]*)", "");
        while (r.test(nm)) {
            var gp = r.exec(nm);
            var value = 0;
            var kakeruValue = 1;
            if (gp != null) {
                if (gp[1]) {
                    // 単位にかける数を出す
                    kakeruValue = parseInt(self.toNumStr(gp[1]));
                }
                // 掛ける
                value = kakeruValue * self.getFigureNum(figure[i]); // 9 * 十(10)
                if (gp[2]) {
                    // 下の数値を加算する
                    value = value + parseInt(self.toNumStr(gp[2])); // 90 + 1
                }
                nm = nm.replace(gp[0], value);
            } else {
                break;
            }
        }
    }
    return nm;
};
