var product_list = [{
    "id": 1,
    "name": "Apple",
    "color": "Green",
    "price": "100",
    "date": "12/1/2018"
}, {
    "id": 2,
    "name": "Pomegrenate",
    "color": "Red",
    "price": "90",
    "date": "01/11/2011"
}, {
    "id": 3,
    "name": "Banana",
    "color": "Yellow",
    "price": "50",
    "date": "20/6/2019"
}, {
    "id": 4,
    "name": "Mango",
    "color": "Orange",
    "price": "100",
    "date": "12/10/2011"
}, {
    "id": 5,
    "name": "Jackfruit",
    "color": "Green",
    "price": "100",
    "date": "2/5/2017"
}, {
    "id": 6,
    "name": "Watermelon",
    "color": "Green",
    "price": "100",
    "date": "26/3/2010"
}, {
    "id": 7,
    "name": "Pineapple",
    "color": "Yellow",
    "price": "110",
    "date": "12/08/2019"
}];

var custom_list = product_list;

var current_product;
var table_head = '<tr>';
table_head += '<th class="js-id hidden" id="js-id" value="id">id</th>';
table_head += '<th class="js-name downarrow" id="js-name" value="name">Name</th>';
table_head += '<th class="js-color downarrow" id="js-color" value="color">Color</th>';
table_head += '<th class="js-price downarrow" id="js-price" value="price">Price per Kg</th>';
table_head += '<th class="js-date downarrow" id="js-date" value="date">Created at</th>';
table_head += '<th>Actions</th>';
table_head += '</tr>';

var column_sort_direction = { "name": -1, "color": -1, "price": -1, "date": -1 };

var column_names = ["", "name", "color", "price", "date"];

var old_name;

function capitalise(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}


function sort_reset() {
    column_sort_direction = { "name": -1, "color": -1, "price": -1, "date": -1 };
}

function sort_event() {
    var column_heads = document.getElementsByTagName("th");
    var column_heads_count = column_heads.length;

    for (i = 1; i < column_heads_count - 1; i++) {
        // console.log(column_names[i]);
        column_heads[i].addEventListener("click", function() {
            // console.log(this.getAttribute("value"));
            mysort(this, this.getAttribute("value"));
        });
    }
}



function mysort(column_head, j) {
    column_head.classList.remove("hide");
    // console.log("sort");
    custom_list.sort(function(a, b) {
        // console.log(column_names);
        // console.log(j);
        var x = a[j].toLowerCase();
        var y = b[j].toLowerCase();

        if (x.indexOf('/') >= 0 && y.indexOf('/') >= 0) {
            x = x.split('/');
            x[0] = ('0' + x[0]).slice(-2);
            x[1] = ('0' + x[1]).slice(-2);
            x = x[2] + x[1] + x[0];
            // console.log(x);
            y = y.split('/');
            y[0] = ('0' + y[0]).slice(-2);
            y[1] = ('0' + y[1]).slice(-2);
            y = y[2] + y[1] + y[0];
            // console.log(y);
        } else if (parseInt(x) && parseInt(y)) {
            x = parseInt(x);
            y = parseInt(y);
        }
        // console.log(x);
        // console.log(y);
        // else {
        //     x = a[j].toLowerCase();
        //     y = b[j].toLowerCase();
        // }
        if (!column_sort_direction[j] || column_sort_direction[j] == -1) {
            // console.log("1st");
            if (x < y) { return -1; }
            if (x > y) { return 1; }
        } else {
            // console.log("2nd");
            // sort_reset();
            // column_sort_direction[j] = 0;
            if (x < y) { return 1; }
            if (x > y) { return -1; }
        }
        return 0;
    });
    if (!column_sort_direction[j]) {
        sort_reset();
        column_sort_direction[j] = 1;
        column_head.classList.remove("uparrow");
        column_head.classList.add("downarrow");
    } else {
        sort_reset();
        column_sort_direction[j] = 0;
        column_head.classList.remove("downarrow");
        column_head.classList.add("uparrow");
    }
    load_products(custom_list, document.getElementById("search-color").value);
    // console.log(column_sort_direction);
}

function get_colors() {
    var item, colors = [];
    for (item in product_list) {
        var color = product_list[item]["color"].toLowerCase();
        if (colors.indexOf(color) == -1) {
            colors.push(color);
        }
    }
    var color_search = document.getElementById("search-color");
    color_search.innerHTML = '<option value="" selected>Select</option>'
    for (item of colors) {
        item = capitalise(item);
        color_search.innerHTML += '<option value = ' + item + '>' + item + '</option>'
    }

    return colors;
}

function mysearch() {
    const color = document.getElementById("search-color").value;

    var name = document.getElementById("search-name").value.toLowerCase();

    custom_list = [...product_list];

    var i;
    var prod_len = custom_list.length;
    for (i = 0; i < prod_len; i++) {

        var name_index = custom_list[i]["name"].toLowerCase().indexOf(name);
        var color_index = custom_list[i]["color"].indexOf(color);

        if ((name_index == -1) || (color_index == -1)) {
            custom_list.splice(i, 1);

            i--;
            prod_len--;
        }
    }

    load_products(custom_list, color);

}

function get_last_id(product_list) {
    var item;
    var ids = [];
    for (item of product_list) {
        ids.push(item.id);
    }
    return Math.max(...ids);

}

function get_index(id) {
    var i = 0;
    var product_list_length = product_list.length;
    for (i = 0; i < product_list_length; i++) {
        if (product_list[i]["id"] == id) {
            return i;
        }
    }
    return -1;
}

function load_products(product_list, color = "") {
    var table = document.querySelector("#table tbody");
    table.innerHTML = table_head;
    theads = document.getElementsByTagName("th");
    var i = 1;
    for (titles in column_sort_direction) {
        theads[i].classList.remove("uparrow");
        theads[i].classList.remove("downarrow");
        // console.log(column_sort_direction[titles]);
        // console.log(theads[i].getAttribute("value"));
        if (titles == theads[i].getAttribute("value")) {
            if (column_sort_direction[titles]) {
                // console.log("down");
                theads[i].classList.remove("uparrow");
                theads[i].classList.add("downarrow");
            } else {
                theads[i].classList.remove("downarrow");
                theads[i].classList.add("uparrow");
            }

            if (column_sort_direction[titles] == -1) {
                theads[i].classList.add("hide");
            }

        }


        i++;
    }

    for (item of product_list) {
        item.color = capitalise(item.color.toLowerCase());
        // console.log(item.price);
        var new_product = '';
        new_product += "<tr>";
        new_product += "<td class='js-id hidden'>" + item["id"] + "</td>";
        new_product += "<td class='js-name'>" + item["name"] + "</td>";
        new_product += "<td class='js-color'>" + item.color + "</td>";
        new_product += "<td class='js-price'>" + item.price + "</td>";
        new_product += "<td class='js-date'>" + item.date + "</td>";
        new_product += '<td><button type="button" class="js-edit">Edit</button>'
        new_product += '<button type="button" class="js-delete btn-red">Delete</button></td></tr>';
        table.innerHTML += new_product;
    }
    // console.log(color);
    document.getElementById("search-color").value = color;
    add_edit_event();
    sort_event();

}



function add_edit_event() {
    var products = document.getElementsByClassName("js-edit");

    var product_count = products.length,
        i;
    for (i = 0; i < product_count; i++) {

        var delete_button = products[i].nextElementSibling;
        delete_button.addEventListener("click", function() {

            var popup = document.getElementById("popup-delete");
            popup.classList.remove("hidden");

            current_product = this.closest("tr");
            document.querySelector("#popup-delete p").innerHTML = 'Are you Sure you want to delete the Product ' + current_product.children[1].innerHTML + "?";

        });


        products[i].addEventListener("click", function() {
            current_product = this.closest("tr");
            show_popup(1, current_product);

        });
    }
}

function edit_event() {
    var name = document.getElementById("new-name").value;
    var price = document.getElementById("new-price").value;

    var product_to_edit = current_product.children[0].innerHTML;
    var current_id = get_index(product_to_edit);
    var is_unique = true;
    if (product_list.map(function(item) {
            if (old_name.localeCompare(item["name"]) != 0)
                if (item["name"].localeCompare(name) == 0) {
                    document.getElementById("warning").innerHTML = "Product Name must Be unique";
                    is_unique = false;
                }
            if (name.indexOf("-") == 0) {
                document.getElementById("warning").innerHTML = "Product Name must start with an Alphabet or Number";
                is_unique = false;
            }

        }));
    if (!price.match(/^(\d+\.?\d*|\.\d+)$/g)) {
        document.getElementById("warning").innerHTML = "Price must be a positive numeric value";
        return 0;
    }
    if (!is_unique) {
        return 0;
    } else {
        document.getElementById("warning").innerHTML = "";
    }
    if (price < 0) {
        document.getElementById("warning").innerHTML = "Price must not be a Negative Value";
        return 0;
    } else {
        document.getElementById("warning").innerHTML = "";
    }

    product_list[current_id].name = capitalise(name);
    product_list[current_id].color = capitalise(document.getElementById("new-color").value);
    product_list[current_id].price = price;

    // current_product.children[0].innerHTML = document.getElementById("new-name").value;
    // current_product.children[1].innerHTML = document.getElementById("new-color").value;
    // current_product.children[2].innerHTML = document.getElementById("new-price").value;
    document.getElementsByTagName("form")[0].reset();
    document.getElementById("popup-add").classList.add("hidden");

    load_products(product_list);
    get_colors();
}

function add_event() {
    var name = document.getElementById("new-name").value;
    var is_unique = true;
    if (product_list.map(function(item) {
            console.log(item["name"]);
            if (item["name"].localeCompare(name) == 0) {
                document.getElementById("warning").innerHTML = "Product Name must Be unique";
                is_unique = false;
            }
            if (name.indexOf("-") == 0) {
                document.getElementById("warning").innerHTML = "Product Name must start with an Alphabet or Number";
                is_unique = false;
            }

        }));
    if (!is_unique) {
        return 0;
    } else {
        document.getElementById("warning").innerHTML = "";
    }
    var color = document.getElementById("new-color").value;
    var price = document.getElementById("new-price").value;
    if (price < 0) {
        document.getElementById("warning").innerHTML = "Price must not be a Negative Value";
        return 0;
    } else {
        document.getElementById("warning").innerHTML = "";
    }
    if (!price.match(/^(\d+\.?\d*|\.\d+)$/g)) {
        document.getElementById("warning").innerHTML = "Price must be a positive numeric value";
        return 0;
    }
    if (name != '' && color != '' && price != '' && price >= 0 && is_unique) {
        document.getElementById("warning").innerHTML = '';
        var new_product = {};
        new_product.id = get_last_id(product_list) + 1;
        new_product.name = capitalise(name);
        new_product.color = capitalise(color);
        new_product.price = price;
        var d = new Date();
        new_product.date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
        product_list.push(new_product);

        document.getElementsByTagName("form")[0].reset();
        document.getElementById("popup-add").classList.add("hidden");
        load_products(product_list);
        get_colors();
    } else {
        document.getElementById("warning").innerHTML = 'Please Fill all the values';
    }

}

function show_popup(add_edit = 0, that) {
    document.getElementById("popup-add").classList.remove("hidden");
    document.getElementById("new-name").focus();
    if (add_edit) {
        document.getElementById("new-name").value = that.children[1].innerHTML;
        old_name = that.children[1].innerHTML;
        document.getElementById("new-color").value = that.children[2].innerHTML;
        document.getElementById("new-price").value = that.children[3].innerHTML;
        document.getElementById("js-popup-update").removeEventListener("click", add_event);
        document.getElementById("js-popup-update").addEventListener("click", edit_event);
        document.getElementById("js-popup-update").innerHTML = "Update";
    } else {
        document.getElementById("js-popup-update").removeEventListener("click", edit_event);
        document.getElementById("js-popup-update").addEventListener("click", add_event);
        document.getElementById("js-popup-update").innerHTML = "Add";
    }
}



document.addEventListener('DOMContentLoaded', function() {

    load_products(product_list);
    get_colors();
    th = document.getElementsByTagName("th");
    for (i = 1; i < 4; i++) {
        th[i].classList.add("hide");
    }

    document.getElementById("js-popup-cancel").addEventListener("click", function() {
        document.getElementById("popup-add").classList.add("hidden");
        document.getElementById("warning").innerHTML = '';
    });



    var cancel_delete = document.getElementById("js-cancel-delete");
    cancel_delete.addEventListener("click", function() {
        document.getElementById("popup-delete").classList.add("hidden");
    });



    document.getElementById("js-confirm-delete").addEventListener("click", function() {
        document.getElementById("popup-delete").classList.add("hidden");
        var product_to_delete = current_product.children[0].innerHTML;
        product_list.splice(get_index(product_to_delete), 1);
        load_products(product_list);
    });



    document.getElementById("js-add").addEventListener("click", function() {
        show_popup(0);
    });

    document.getElementById("search-color").addEventListener("change", mysearch);
    document.getElementById("search-name").addEventListener("keyup", mysearch);

}, false);