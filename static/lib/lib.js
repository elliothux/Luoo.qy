function Lib (selector) {
    this.o = document.querySelectorAll(selector);
    if (this.o.length == 1)
        this.o = this.o[0]
}


Object.defineProperty(Lib, 'deepCopyFrom', {
    writable: false,
    configurable: false,
    enumerable: true,
    value: function (o) {
        let newObj = {};
        let names = Object.getOwnPropertyNames(o);              // 得到所有的包括不可枚举属性在内的自有属性
        for (let i = 0; i < names.length; i++) {
            let desc = Object.getOwnPropertyDescriptor(o, names[i]);
            Object.defineProperty(newObj, names[i], desc);
        }
        return newObj
    }
});

Object.defineProperty(Lib, 'getData', {
    writable: false,
    configurable: false,
    enumerable: true,
    value: function (url) {
        return new Promise(function (resolve, reject) {
            let req = new XMLHttpRequest();
            req.open('GET', url);
            req.addEventListener('readystatechange', function () {
                if (req.readyState != 4) return;
                if (req.readyState == 4 && req.status == 200) {
                    let type = req.getResponseHeader('Content-Type');
                    if (type.indexOf('xml') !== -1 && req.responseXML) {
                        resolve(req.responseXML);
                    }
                    else if (type == 'application/json')
                        resolve(JSON.parse(req.responseText));
                    else
                        resolve(req.responseText);
                }
                else
                    reject(req.response)
            });
            req.send();
        })
    }
});

Object.defineProperty(Lib, 'isElementInViewport', {
    writable: false,
    configurable: false,
    enumerable: true,
    value: function (el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }
});


module.export = Lib;
