let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]

//  var selects = document.querySelectorAll("select");
//  var selectWrapper = document.querySelector("#select-wrapper");
var tableWrapper = document.querySelector("#table-wrapper");

var ratioWrapper = document.querySelector('#ratio-wrapper');
var regionWrapper = document.querySelector('#region-radio-wrapper');
var productWrapper = document.querySelector('#product-radio-wrapper');


function generateCheckBox(wrapper, arr) {
    //生成全选checkbox的html，给一个自定义属性表示为全选checkbox，比如checkbox - type="all"
    var a = '<input type="checkbox" id="all" >全选</input>'
    var checkboxHtml = a;
    for (var i = 0; i < arr.length; i++) {//遍历参数对象 
        checkboxHtml += '<input type="checkbox" id="item" value="' + arr[i].value + '">' + arr[i].text + '</input>';
    }
    wrapper.innerHTML = checkboxHtml;


    wrapper.onclick = function (e) {
        var checkedflag = 0;
        var checkAll = document.querySelector("#" + e.path[1].id + " input[id='all']");
        var items = document.querySelectorAll("#" + e.path[1].id + " input[id='item']");//当前点击复选框所在组的所有复选框
        if (e.target.type == 'checkbox') {//是checkbox
            //读取自定义属性
            if (e.target.id == 'all') {//全选
                //做全选对应的逻辑
                for (var i = 0; i < items.length; i++) {
                    items[i].checked = true;
                }
            }
            for (var i = 0; i < items.length; i++) {
                if (items[i].checked == true) {
                    checkedflag++;
                }
            }

            if (e.target.id == 'item') {
                //做子选项对应的逻辑
                if (checkedflag == 3) {
                    checkAll.checked = true;
                }
                if (checkedflag < 3) {
                    checkAll.checked = false;
                }
                if (checkedflag == 0) {
                    checkedflag = 1;
                    e.target.checked = true;
                }
            }
        }
    }
}

// 对象或数组自己根据喜好实现均可
generateCheckBox(regionWrapper, [{
    value: "华东",
    text: "华东"
}, {
    value: "华北",
    text: "华北"
}, {
    value: "华南",
    text: "华南"
}]);
generateCheckBox(productWrapper, [{
    value: "手机",
    text: "手机"
}, {
    value: "笔记本",
    text: "笔记本"
}, {
    value: "智能音箱",
    text: "智能音箱"
}]);


var itemChecked = function (wrapper) {
    var items = wrapper.querySelectorAll('input[id="item"]');
    var checkedItems = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].checked) {
            checkedItems.push(items[i]);
        }
    }
    // console.log(checkedItems.length);
    return checkedItems;
}

ratioWrapper.onchange = function (e) {
    //渲染新的表格(根据ratio选项获取数据)
    var a = itemChecked(regionWrapper);
    var b = itemChecked(productWrapper);
    getTable(a, b);
}


function getTable(a, b) {//渲染新的表格
    //根据select选项获取数据
    // console.log(a.length,b.length);
    var data = [];
    for (var i = 0; i < sourceData.length; i++) {
        for (var j = 0; j < a.length; j++) {
            for (var k = 0; k < b.length; k++) {
                if (sourceData[i].region == a[j].value && sourceData[i].product == b[k].value) {
                    data.push(sourceData[i])
                }
            }
        }
    }
    console.log(data);
    tableWrapper.innerHTML = '';//置空表格

    //输出表头：商品、地区、1月、2月、…… 12月
    var table = document.createElement('table');
    var tableHead = ['商品', '地区', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    var tr = document.createElement('tr');
    console.log(a.length, b.length);
    if (a.length == 1 && b.length > 1) {
        tableHead = ['地区', '商品', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    }
    for (var i = 0; i < tableHead.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = tableHead[i];
        tr.appendChild(th);
    }
    table.appendChild(tr);

    if (a.length == 1 && b.length == 1) {
        for (var i = 1; i < data.length; i++) {
            var row = table.insertRow();
            row.insertCell(0).innerHTML = data[i].product;
            row.insertCell(1).innerHTML = data[i].region;
            for (var j = 0; j < data[i].sale.length; j++) {
                row.insertCell(j + 2).innerHTML = data[i].sale[j];
            }
        }
        tableWrapper.appendChild(table);
    }
    if (a.length == 1 && b.length > 1) {
        var row = table.insertRow();
        var aaa = row.insertCell(0);
        aaa.innerHTML = data[0].region;
        aaa.setAttribute("rowspan", b.length);
        row.insertCell(1).innerHTML = data[0].product;
        for (var j = 0; j < data[0].sale.length; j++) {
            row.insertCell(j + 2).innerHTML = data[0].sale[j];
        }
        for (var i = 1; i < data.length; i++) {
            let row = table.insertRow();
            // row.insertCell(0).innerHTML = data[i].region;
            row.insertCell(0).innerHTML = data[i].product;
            for (var j = 0; j < data[i].sale.length; j++) {
                row.insertCell(j + 1).innerHTML = data[i].sale[j];
            }
        }
        tableWrapper.appendChild(table);
    }
    if (a.length > 1 && b.length == 1) {
        var row = table.insertRow();
        var aaa = row.insertCell(0);
        aaa.innerHTML = data[0].product;
        aaa.setAttribute("rowspan", a.length);
        row.insertCell(1).innerHTML = data[0].region;
        for (var j = 0; j < data[0].sale.length; j++) {
            row.insertCell(j + 2).innerHTML = data[0].sale[j];
        }
        for (var i = 1; i < data.length; i++) {
            let row = table.insertRow();
            // row.insertCell(0).innerHTML = data[i].region;
            row.insertCell(0).innerHTML = data[i].region;
            for (var j = 0; j < data[i].sale.length; j++) {
                row.insertCell(j + 1).innerHTML = data[i].sale[j];
            }
        }
        tableWrapper.appendChild(table);
    }
    if (a.length > 1 && b.length > 1) {
        for (let i in data) {
            var tr = table.insertRow();
            for (let j in data[i]) {
                if (j == 'product' && !(i % a.length)) {
                    var td = tr.insertCell();
                    td.setAttribute('rowspan', a.length);
                    td.appendChild(document.createTextNode(data[i][j]));
                }
                if (j == 'region') {
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(data[i][j]));
                }
                if (j == 'sale') {
                    for (let k in data[i][j]) {
                        var td = tr.insertCell();
                        td.appendChild(document.createTextNode(data[i][j][k]));
                    }
                }
            }
        }
        tableWrapper.appendChild(table);
    }
}