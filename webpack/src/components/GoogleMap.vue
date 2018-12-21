<template>
    <gmap-map
      :center="center"
      :zoom="zoom"
      style="margin:13px; width:100%;  height: 450px;"
      ref="mapRef"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        ref="markersRef"
        :draggable="true"
        :clickable="true"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
</template>

<script>
  export default {
    name: "GoogleMap",
    props:['coords','markers_array'],
    data() {
      return {
        // default to Montreal to keep it simple
        // change this to whatever makes sense

        latitud:0,
        longitud:0,
        center: { lat : 0, lng : 0},
        markers: [],
        places: [],
        currentPlace: null,
        zoom:15
      };
    },

    mounted() {
      this.geolocate();
    },
    created(){
    },
    watch:{
      coords: function(latlong){
        this.latitud = latlong.latitud;
        this.longitud = latlong.longitud;
        this.geolocateCenter();
      },
      markers_array:function(){

        this.addStaticMarker();

      },
      markers(markers){
        if (markers.length > 2) {
          const bounds = new google.maps.LatLngBounds();
          for (let m of markers) {
            let latitud = m.position.lat;
            let longitud = m.position.lng;
            let pos = [parseFloat(latitud),parseFloat(longitud)];
            console.log(pos);
            bounds.extend(m.position)
          }
          this.$refs.mapRef.fitBounds(bounds)
        }
      }
    },

    methods: {
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.currentPlace = place;
      },
      addStaticMarker() {
        this.markers = this.markers_array;
      },
      geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      },
      geolocateCenter: function() {
        const marker = {
          lat: this.latitud,
          lng: this.longitud
        };
        // this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        console.log(this.zoom);
        this.zoom = 16;
        console.log(this.zoom);
      }
    }
  };
</script>
