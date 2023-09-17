var property = new Array();
var unit = new Array();
var factor = new Array();

property[1] = "Length";
unit[1] = new Array("Meter (m)", "Angstrom (A')", "Centimeter (cm)", "Kilometer (km)", "Foot (ft)", "Inch (in)", "Micrometer (mu-m)", "Millimeter (mm)", "Nanometer (nm)");
factor[1] = new Array(1, 1E-10, .01, 1000, .3048, .0254, .000001, .001, 1E-9);



property[2] = "Mass";
unit[2] = new Array("Kilogram (kgr)", "Gram (gr)", "Milligram (mgr)", "Microgram (mu-gr)");
factor[2] = new Array(1, .001, 1e-6, .000000001);

property[3] = "Temperature";
unit[3] = new Array("Degrees Celsius ('C)", "Degrees Fahrenheit ('F)", "Degrees Kelvin ('K)", "Degrees Rankine ('R)");
factor[3] = new Array(1, 0.555555555555, 1, 0.555555555555);
tempIncrement = new Array(0, -32, -273.15, -491.67);

property[4] = "Time";
unit[4] = new Array("Second (sec)", "Day (mean solar)",  "Hour (mean solar)", "Minute (mean solar)", "Month (mean calendar)");
factor[4] = new Array(1, 8.640E4, 3600, 60, 2628000);

function UpdateUnitMenu(propMenu, unitMenu) {
    var i;
    i = propMenu.selectedIndex;
    FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
   
    var i;
    myMenu.length = myArray.length;
    for (i = 0; i < myArray.length; i++) {
        myMenu.options[i].text = myArray[i];
    }
}

function CalculateUnit(sourceForm, targetForm) {
    
    var sourceValue = sourceForm.unit_input.value;
    sourceValue = parseFloat(sourceValue);
    if (!isNaN(sourceValue) || sourceValue == 0) {
        
        sourceForm.unit_input.value = sourceValue;
        ConvertFromTo(sourceForm, targetForm);
    }
}

function ConvertFromTo(sourceForm, targetForm) {

    var propIndex;
    var sourceIndex;
    var sourceFactor;
    var targetIndex;
    var targetFactor;
    var result;

    propIndex = document.property_form.the_menu.selectedIndex;

    
    sourceIndex = sourceForm.unit_menu.selectedIndex;
    sourceFactor = factor[propIndex][sourceIndex];

  
    targetIndex = targetForm.unit_menu.selectedIndex;
    targetFactor = factor[propIndex][targetIndex];

    
    result = sourceForm.unit_input.value;
    
    if (property[propIndex] == "Temperature") {
        result = parseFloat(result) + tempIncrement[sourceIndex];
    }
    result = result * sourceFactor;

    result = result / targetFactor;
    
    if (property[propIndex] == "Temperature") {
        result = parseFloat(result) - tempIncrement[targetIndex];
    }

    targetForm.unit_input.value = result;
}

window.onload = function (e) {
    FillMenuWithArray(document.property_form.the_menu, property);
    UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
    UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu)
}
document.getElementByClass('numbersonly').addEventListener('keydown', function (e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
        (key == 65 && (e.ctrlKey || e.metaKey)) || // Select All 
        (key == 67 && (e.ctrlKey || e.metaKey)) || // Copy
        (key == 86 && (e.ctrlKey || e.metaKey)) || // Paste
        (key >= 35 && key <= 40) || // End, Home, Arrows
        (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || // Numeric Keys
        (key >= 96 && key <= 105) // Numpad
            (key == 190) // Numpad
    )) e.preventDefault();
});