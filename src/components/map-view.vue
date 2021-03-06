<template>
  <div class="container" style="height: 500px; width: 100%">
    <!-- Debug list
    <ul>
      <li
        v-for="marker in markers.red"
        :key="marker.id"
      >
        {{ marker.id + "\t" + marker.position.lat + "," + marker.position.lng }}
      </li>
    </ul>

    <ul>
      <li
        v-for="marker in markers.blue"
        :key="marker.id"
      >
        {{ marker.id + "\t" + marker.position.lat + "," + marker.position.lng }}
      </li>
    </ul> -->

    <l-map :zoom="zoom" :center="center">
      <l-image-overlay :bounds="rect.bounds" :url="rect.url"></l-image-overlay>

      <!-- lStyle is deprecated and is going to be removed in the next major version -->
      <!-- Overlay on map. Don't think it's necessary -->
      <!-- <l-rectangle :bounds="rect.bounds" :l-style="rect.style"></l-rectangle> -->
      <!-- Do not use OpenStreetMap Online tile -->
      <!-- <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer> -->

      <!-- marker for red -->
      <l-marker
        v-for="marker in markers.red"
        :key="marker.id"
        :lat-lng="marker.position"
      >
        <l-icon class-name="red-icon">
          <div class-name="icon-caption">{{ marker.id }}</div>
        </l-icon>
        <l-tooltip :content="positionToString(marker.position)" />
      </l-marker>

      <!-- marker for blue -->
      <l-marker
        v-for="marker in markers.blue"
        :key="marker.id"
        :lat-lng="marker.position"
      >
        <l-icon class-name="blue-icon">
          <div class-name="icon-caption">{{ marker.id }}</div>
        </l-icon>
        <l-tooltip :content="positionToString(marker.position)" />
      </l-marker>
    </l-map>
  </div>
</template>

<script lang="ts">
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LPopup,
  LRectangle,
  LImageOverlay,
  LIcon,
} from "vue2-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete L.Icon.Default.prototype._getIconUrl

// fix icon display
// from https://github.com/Leaflet/Leaflet/issues/6822
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
//   iconUrl: require("leaflet/dist/images/marker-icon.png"),
//   shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// })

interface Marker {
  id: number
  position: { lat: number; lng: number }
  color: string
}

// "id": "123",
// "name": "liu",
// "gender": "男",
// "age": "-30",
// "unit": "test",
// "equipment": "6c60d6c41c5b144c",
// "hp": 100,
// "ammo": 128,
// "lastReportTime": "2021-07-30 23:31:52",
// "lat": 24.563537,
// "lng": 118.381233,
// "team": "red"
interface Solider {
  id: number
  name: string
  gender: string
  age: number
  hp: number
  lastReportTime: string
  lat: number
  lng: number
  team: string
}

const conversion = (solider: Solider): Marker => ({
  id: solider.id,
  color: solider.team,
  position: {
    lat: solider.lat,
    lng: solider.lng,
  },
})

export default {
  name: "MapView",
  components: {
    "l-map": LMap,
    "l-tile-layer": LTileLayer,
    "l-marker": LMarker,
    "l-tooltip": LTooltip,
    "l-popup": LPopup,
    "l-rectangle": LRectangle,
    "l-image-overlay": LImageOverlay,
    "l-icon": LIcon,
  },
  data() {
    return {
      // these icons init in mounted method
      defaultIcon: null,
      redIcon: null,
      blueIcon: null,
      zoom: 15,
      center: {
        lat: (this.leftTopLat + this.rightDownLat) / 2,
        lng: (this.leftTopLng + this.rightDownLng) / 2,
      },
      rect: {
        bounds: [
          [this.leftTopLat, this.leftTopLng],
          [this.rightDownLat, this.rightDownLng],
        ],
        style: { color: "red", weight: 2 },
        url: this.mapUrl,
      },
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors",
      markers: {
        red: this.redList.map(conversion),
        blue: this.blueList.map(conversion),
      },
      // markerObjects: null
    }
  },
  props: {
    leftTopLat: {
      type: Number,
    },
    leftTopLng: {
      type: Number,
    },
    rightDownLat: {
      type: Number,
    },
    rightDownLng: {
      type: Number,
    },
    redList: {
      type: Array,
    },
    blueList: {
      type: Array,
    },
    mapUrl: {
      type: String,
    },
  },
  mounted() {
    // this.defaultIcon = L.divIcon({ className: "default-div-icon" })
    // this.blueIcon = L.divIcon({ className: "blue-icon" })
    // this.redIcon = L.divIcon({ className: "red-icon" })
  },

  methods: {
    updateMarkers(redList: Solider[], blueList: Solider[]) {
      console.log("this.marker", this.markers)
      this.markers.red = redList.map(conversion)
      this.markers.blue = blueList.map(conversion)
    },
    positionToString(position: { lat: number; lng: number }) {
      return `${position.lat.toFixed(4)},${position.lng.toFixed(4)}`
    },
  },
}
</script>

<style>
/* I know I should use SCSS but I'm lazy */

.red-icon {
  /* red is #F56C6C */
  padding: 10px;
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #f56c6c;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  color: white;
  clip-path: circle(18px at center);
}

.blue-icon {
  /*#409EFF*/
  padding: 10px;
  box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #409eff;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  color: white;
  clip-path: circle(18px at center);
}
</style>
