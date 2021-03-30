require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer"
], function (Map, MapView, FeatureLayer) {
  const map = new Map({
    basemap: "hybrid",
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-118, 36],
    zoom: 6,
  });

  var year = 2000;
  const template = {
    title: "Name: {incidentname}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "gisacres",
            label: "Acres",
            format: {
              digitSeparator: true,
              places: 0,
            },
          },
        ],
      },
    ],
  };

  const firePerimeterLayer = new FeatureLayer({
    url:
      "https://services3.arcgis.com/T4QMspbfLg3qTGWY/ArcGIS/rest/services/Historic_Geomac_Perimeters_Combined_2000_2018/FeatureServer/0",
    popupTemplate: template,
    definitionExpression: `state='CA' AND fireyear = ${year}`,
    renderer:{
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [252, 90, 10, 0.5],
        outline: {
          width: 2,
          color: [255,0,0]
        }
      }
    }
  });

  const Buttons = document.getElementById("buttons");
  const NextBtn = document.getElementById("next");
  const PrevBtn = document.getElementById("prev");
  PrevBtn.disabled = true;
  NextBtn.addEventListener("click", () => {
    if (PrevBtn.disabled) {
      PrevBtn.disabled = false;
    }
    console.log(year);
    if (year === 2018) {
      NextBtn.disabled = true;
    } else {
      year++;
      firePerimeterLayer.definitionExpression = `state='CA' AND fireyear = ${year}`;
    }
  });

  PrevBtn.addEventListener("click", () => {
    if (NextBtn.disabled) {
      NextBtn.disabled = false;
    }
    console.log(year);
    if (year === 2000) {
      PrevBtn.disabled = true;
    } else {
      year--;
      firePerimeterLayer.definitionExpression = `state='CA' AND fireyear = ${year}`;
    }
  });
  view.when(() => {
    map.add(firePerimeterLayer, 0);
    //view.ui.add(Buttons, "bottom-left");
    console.log(firePerimeterLayer);
    test("thisis a test")
  });
});
