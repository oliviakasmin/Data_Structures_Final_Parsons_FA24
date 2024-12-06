import "./style.css";
import * as d3 from "d3";
import "leaflet";
import "leaflet.markercluster";

const getGeojson = async () => {
	try {
		return await d3.json("data/sites_geojson.json");
	} catch (err) {
		console.error("Error loading geojson", err);
	}
};

const geoJson = await getGeojson();

const mapElement = d3.select("#map");
const siteInfoElement = d3.select("#site-info");

// Create leaflet map
const centerUS = [45, -110];
const initialZoom = 3;
const map = L.map(mapElement.node()).setView(centerUS, initialZoom);

const Stadia_AlidadeSmooth = L.tileLayer(
	"https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}",
	{
		attribution:
			'&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		ext: "png",
	}
);

// Add tile layer to the map
Stadia_AlidadeSmooth.addTo(map);

// Create a layer group for the circles
const markers = L.layerGroup();

// Create a tooltip element
const tooltip = d3.select("body").append("div").attr("class", "tooltip");

// Add a control with radio buttons to the map
const statusControl = L.control({ position: "topright" });

const nplStatus = "NPL";
const naiStatus = "NAI";

let selectedStatus = "NPL"; // Variable to track the selected status

statusControl.onAdd = function (map) {
	const div = L.DomUtil.create("div", "info status-control");
	div.innerHTML = `
        <div>Select Status</div>
        <label>
            <input type="radio" name="status" value=${nplStatus} checked> National Priorities List
        </label><br>
        <label>
            <input type="radio" name="status" value=${naiStatus}> Native American Entity
        </label>
    `;

	div.addEventListener("change", (event) => {
		if (event.target.name === "status") {
			selectedStatus = event.target.value;
			console.log("Selected Status:", selectedStatus);
			drawMarkers(); // Redraw markers based on the selected status
			updateLegend();
		}
	});

	return div;
};

statusControl.addTo(map);

const finalNpl = "Final NPL";
const deletedNpl = "Deleted NPL";
const proposedNpl = "Proposed NPL";
const naiN = "N";
const naiY = "Y";

const nplStatues = [finalNpl, deletedNpl, proposedNpl];
const naiStatues = [naiN, naiY];
const colors = ["#16a2c7", "#688E26", "#FA824C"];

const getMarkerColor = (status) => {
	if (selectedStatus === naiStatus) {
		console.log("status", status);
		console.log("selectedStatus", selectedStatus);

		if (status === naiN) {
			return colors[0];
		} else if (status === naiY) {
			return colors[1];
		}
	} else if (selectedStatus === nplStatus) {
		if (status === nplStatues[0]) {
			return colors[0];
		} else if (status === nplStatues[1]) {
			return colors[1];
		} else if (status === nplStatues[2]) {
			return colors[2];
		}
	} else {
		console.log("in else");
		return "#000000";
	}
};

const drawMarkers = () => {
	markers.clearLayers(); // Clear existing markers

	// Add circles to the layer group
	geoJson.features.forEach((feature) => {
		const siteName = feature.properties["Site Name"];
		const siteNPLStatus = feature.properties["National Priorities List Status"];
		const siteNAIStatus = feature.properties["NAI"];
		const markerColor = getMarkerColor(
			selectedStatus === nplStatus ? siteNPLStatus : siteNAIStatus
		);

		const marker = L.circleMarker(
			[feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
			{
				radius: 4,
				color: markerColor,
				fillColor: markerColor,
				fillOpacity: 0.5,
			}
		);
		markers.addLayer(marker);

		marker.on("click", () => {
			console.log(feature.properties);
			let infoHtml = `<h2>${siteName}</h2><ul>`;
			for (const [key, value] of Object.entries(feature.properties)) {
				if (key === "site_link") {
					infoHtml += `<li><strong>${key}:</strong> <a href="${value}" target="_blank">${value}</a></li>`;
				} else {
					infoHtml += `<li><strong>${key}:</strong> ${value}</li>`;
				}
			}
			infoHtml += "</ul>";
			siteInfoElement.html(infoHtml);
		});

		marker.on("mouseover", (event) => {
			tooltip
				.style("display", "block")
				.text(`${siteName}`)
				.style("left", `${event.originalEvent.pageX + 10}px`)
				.style("top", `${event.originalEvent.pageY}px`);
		});
		marker.on("mouseout", () => {
			tooltip.style("display", "none");
		});
	});

	// Add the layer group to the map
	map.addLayer(markers);
};

drawMarkers();

// Function to update the legend
const updateLegend = () => {
	const legendDiv = document.querySelector(".info.legend");
	if (legendDiv) {
		const NPLCategories = [
			{ label: nplStatues[0], color: colors[0] },
			{ label: nplStatues[1], color: colors[1] },
			{ label: nplStatues[2], color: colors[2] },
		];

		const NAICategories = [
			{ label: naiStatues[0], color: colors[0] },
			{ label: naiStatues[1], color: colors[1] },
		];

		const categories =
			selectedStatus === nplStatus ? NPLCategories : NAICategories;

		legendDiv.innerHTML = "";
		categories.forEach((category) => {
			legendDiv.innerHTML += `<i style="background:${category.color}"></i> ${category.label}<br>`;
		});
	}
};

// Add a legend to the map
const legend = L.control({ position: "topright" });

legend.onAdd = function (map) {
	const div = L.DomUtil.create("div", "info legend");
	updateLegend();
	return div;
};

legend.addTo(map);

updateLegend();
