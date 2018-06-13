<template>
  <div id="map">
  </div>
</template>

<style>
#map {
  height: 400px;
  width: 400px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
}
</style>

<script>
// import { loadScript } from '../lib'
export default {
  methods: {
    mountMap (err) {
      if (err) return console.log('Could not load the map')
      /* eslint-disable no-new */
      new window.google.maps.Map(this.$el, {
        center: new window.google.maps.LatLng(0, 0),
        zoom: 10
      })
      /* eslint-enable */
    }
  },
  mounted () {
    this.$loadScript({
      src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCq1ZKvvQ-ocZT0Jw-Ya1gJJSixt8oE-KI'
    }, this.mountMap)
  }
}
</script>
