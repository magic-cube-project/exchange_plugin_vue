class tool {
  constructor () {
    let upColor = "#F5484C"
    let downColor = "#29D548"
  }
  
  //格式化价格
  formatPrice (price) {
    price = Number(price);
    return Number(price.toFixed(4));
}
/**
 * 格式化当前的price为Int格式
 */
formatPriceInt (price)  {
    price = Number(price);
    return parseInt(price);
}
formatPercent (percent) {
    percent = Number(percent).toFixed(2);
    
    if (percent === 'Infinity') {
        return 0
    } else {
        return percent;
    }
    
}
formatPriceTwo (price) {
    price = Number(price);
    return Number(price.toFixed(2));
}
formatPercentBycolor (percent) {
    percent = Number(percent).toFixed(2);
    let font_color;
    if (percent >= 0) {
        percent = "+" + percent;
        font_color = upColor;
    } else {
        font_color = downColor;
    }
    percent += "%";
    return `<span style="color:${font_color}">${percent}</span>`
}
formatPriceBycolor (price) {
    price = Number(price).toFixed(4);
    let font_color;
    if (price >= 0) {
        font_color = upColor;
    } else {
        font_color = downColor;
    }
    return `<span style="color:${font_color}">${price}</span>`
}
formatPriceByCompare (price, oprice) {
    price = Number(price).toFixed(4);
    oprice = Number(oprice).toFixed(4);
    let font_color;
    if (price >= oprice) {
        font_color = upColor;
    } else {
        font_color = downColor;
    }
    price = app.number.formatAmount(price);
    return `<span style="color:${font_color}">${price}</span>`
}
formatPriceBySigin (price) {
    price = Number(price).toFixed(4);
    let font_color;
    if (price >= 0) {
        price = "+" + price;
        font_color = upColor;
    } else {
        font_color = downColor;
    }
    return `<span style="color:${font_color}">${price}</span>`
}
formatAmount (num) {
    try {
        if (num < 10000) {
            return Number(num).toFixed(4);
        } else if (num >= 10000 && num <= 9999999) {
            return (num / 10000).toFixed(2) + "w";
        } else if (num > 9999999 && num < 100000000) {
            return parseInt(num / 10000) + "w";
        } else {
            return (num / 100000000).toFixed(2) + "e";
        }
    } catch (error) {

    }

}
formatAmountInt (num) {
    try {
        if (num < 10000) {
            return Number(num).toFixed(0);
        } else if (num >= 10000 && num <= 9999999) {
            return parseInt(num / 10000) + "w";
        } else if (num > 9999999 && num < 100000000) {
            return parseInt(num / 10000) + "w";
        } else {
            return (num / 100000000).toFixed(0) + "e";
        }
    } catch (error) {

    }

}

}

export default new tool()