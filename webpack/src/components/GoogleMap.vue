<template>
    <gmap-map
      :center="center"
      :zoom="zoom"
      style="margin:13px; width:100%;  height: 450px;"
      ref="mapRef"
    >
      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <div v-html="infoContent"></div>
      </gmap-info-window>
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :draggable="true"
        :clickable="true"
        @click="showCenterInfo(m,index)"
      ></gmap-marker>
    </gmap-map>

    
</template>

<script>
  export default {
    name: "GoogleMap",
    props:['coords','markers_array'],
    data() {
      return {
        latitud:0,
        longitud:0,
        center: { lat : 0, lng : 0},
        markers: [],
        places: [],
        currentPlace: null,
        zoom:15,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        infoWindowPos: null,
        infoWinOpen: false,
        infoContent:'',
        currentMidx: null
      };
    },

    mounted() {
      this.geolocate();
    },
    created(){
    },
    watch:{
      coords: function(latlong){
        console.log(latlong);
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

        let _marker = {
          lat: this.latitud,
          lng: this.longitud
        };
        // this.markers.push({ position: marker });
        this.places.push(_marker);
        this.center = _marker;
        this.currentPlace = null;
        this.zoom = this.zoom === 15 ? 16 : 15;
      },
      showCenterInfo: function(m,index) {
        this.center = m.position;
        this.infoWindowPos = m.position;
        this.infoContent =
        '<div style="text-align:left;"><strong>CUE:</strong> '+m.data.cue+'</div>'+
        '<div style="text-align:left;"><strong>Nombre:</strong> '+m.data.nombre+'</div>'+
        '<div style="text-align:left;"><strong>Dirección:</strong> '+m.data.direccion+'</div>'+
        '<div style="text-align:left;"><strong>Barrio:</strong> '+m.data.barrio.nombre+'</div>'+
        '<div style="text-align:left;"><strong>Código Postal:</strong> '+m.data.cp+'</div>'+
        '<div style="text-align:left;"><strong>Código Localidad:</strong> '+m.data.codigo_localidad+'</div>'+
        '<div style="text-align:left;"><strong>Ciudad:</strong> '+m.data.ciudad.nombre+'</div>'+
        '<div style="text-align:left;"><strong>Teléfono:</strong> '+m.data.telefono+'</div>'+
        '<div style="text-align:left;"><strong>Email:</strong> '+m.data.email+'</div>'+
        '<div style="text-align:left;"><strong>URL:</strong> '+m.data.url+'</div>';

        //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == index) {
              this.infoWinOpen = !this.infoWinOpen;
            }
            //if different marker set infowindow to open and reset current marker index
            else {
              this.infoWinOpen = true;
              this.currentMidx = index;
            }
            
        this.zoom = this.zoom === 15 ? 16 : 15;
      }
    }
  };
</script>
